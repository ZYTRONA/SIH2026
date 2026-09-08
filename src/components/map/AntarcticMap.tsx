import React, { useState, useEffect, useRef, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import {
  MapLayerVisibility,
  IcebergFeature,
  RiskZoneFeature,
  RoutePath,
  VesselState,
  SeaIceConcentrationFeature,
} from '@/types/map';
import {
  ICEBERGS_DATA,
  VESSEL_STATE_DATA,
  ROUTE_PATHS_DATA,
  SEA_ICE_LAYERS_DATA,
  RISK_ZONES_DATA,
  OCEAN_CURRENTS_DATA,
  BATHYMETRY_CONTOURS_DATA,
} from '@/data/mapData';
import { MapControls, BasemapMode } from './MapControls';
import { MapLegend } from './MapLegend';
import { VesselMarker } from './VesselMarker';
import { IcebergMarker } from './IcebergMarker';
import { RouteLayer } from './RouteLayer';
import { RiskLayer } from './RiskLayer';
import { SeaIceLayer } from './SeaIceLayer';
import {
  Compass,
  Radio,
  Crosshair,
  Mountain,
  AlertTriangle,
  X,
  Radar,
  ShieldCheck,
  Zap,
} from 'lucide-react';

export interface AntarcticMapProps {
  initialLayers?: Partial<MapLayerVisibility>;
  controlledLayers?: MapLayerVisibility;
  onLayerToggle?: (key: keyof MapLayerVisibility) => void;
  heightClass?: string;
  hideControls?: boolean;
  customRoutes?: RoutePath[];
  selectedRouteId?: string;
  onSelectRoute?: (routeId: string) => void;
  customVessel?: VesselState;
  customIcebergs?: IcebergFeature[];
  customSeaIce?: SeaIceConcentrationFeature[];
  customRiskZones?: RiskZoneFeature[];
  customOverlay?: React.ReactNode;
}

// Antarctic Research Stations
const ANTARCTIC_STATIONS = [
  { name: 'Bharati Station [Dest]', lat: -69.4075, lng: 76.1947, country: 'India (Dest)', isDest: true },
  { name: 'Maitri Station', lat: -70.7667, lng: 11.7397, country: 'India', isDest: false },
  { name: 'Zhongshan Station', lat: -69.3736, lng: 76.3725, country: 'China', isDest: false },
  { name: 'Mawson Station', lat: -67.6042, lng: 62.8739, country: 'Australia', isDest: false },
  { name: 'Cape Town Port [Origin]', lat: -33.9249, lng: 18.4241, country: 'South Africa (Origin)', isDest: false },
];

export const AntarcticMap: React.FC<AntarcticMapProps> = ({
  initialLayers,
  controlledLayers,
  onLayerToggle,
  heightClass = 'h-[560px] sm:h-[620px] lg:h-[700px]',
  hideControls = false,
  customRoutes,
  selectedRouteId,
  onSelectRoute,
  customVessel,
  customIcebergs,
  customSeaIce,
  customRiskZones,
  customOverlay,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  const [basemapMode, setBasemapMode] = useState<BasemapMode>('openseamap');
  const [engineReady, setEngineReady] = useState<boolean>(false);
  const [selectedIceberg, setSelectedIceberg] = useState<IcebergFeature | null>(null);
  const [selectedZone, setSelectedZone] = useState<RiskZoneFeature | null>(null);
  const [hudMessage, setHudMessage] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  // Independent Layer Toggles
  const [internalLayers, setInternalLayers] = useState<MapLayerVisibility>({
    seaIce: true,
    icebergs: true,
    risk: true,
    weather: false,
    oceanCurrents: true,
    bathymetry: false,
    routes: true,
    ...initialLayers,
  });

  const activeLayers = controlledLayers || internalLayers;

  const handleToggleLayer = (key: keyof MapLayerVisibility) => {
    if (onLayerToggle) {
      onLayerToggle(key);
    } else {
      setInternalLayers((prev) => ({ ...prev, [key]: !prev[key] }));
    }
  };

  const vessel = customVessel || VESSEL_STATE_DATA;
  const seaIceTiers = customSeaIce || SEA_ICE_LAYERS_DATA;
  const riskZones = customRiskZones || RISK_ZONES_DATA;
  const icebergs = customIcebergs || ICEBERGS_DATA;
  const routes = customRoutes || ROUTE_PATHS_DATA;

  // Open-Source Raster Styles for Maritime & Sailing Navigation
  const getBasemapStyle = useCallback((mode: BasemapMode): mapboxgl.Style => {
    if (mode === 'esriOcean') {
      return {
        version: 8,
        sources: {
          'esri-ocean': {
            type: 'raster',
            tiles: [
              'https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}',
            ],
            tileSize: 256,
            maxzoom: 13,
            attribution: 'Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS',
          },
          'esri-labels': {
            type: 'raster',
            tiles: [
              'https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Reference/MapServer/tile/{z}/{y}/{x}',
            ],
            tileSize: 256,
            maxzoom: 13,
          },
        },
        layers: [
          { id: 'esri-ocean-layer', type: 'raster', source: 'esri-ocean', minzoom: 0, maxzoom: 18 },
          { id: 'esri-labels-layer', type: 'raster', source: 'esri-labels', minzoom: 0, maxzoom: 18 },
        ],
      };
    }

    if (mode === 'osm') {
      return {
        version: 8,
        sources: {
          'osm-tiles': {
            type: 'raster',
            tiles: [
              'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
              'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png',
              'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png',
            ],
            tileSize: 256,
            maxzoom: 19,
            attribution: '&copy; OpenStreetMap contributors',
          },
          'openseamap-tiles': {
            type: 'raster',
            tiles: ['https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png'],
            tileSize: 256,
            maxzoom: 18,
            attribution: 'Map data &copy; OpenSeaMap contributors',
          },
        },
        layers: [
          { id: 'osm-layer', type: 'raster', source: 'osm-tiles', minzoom: 0, maxzoom: 19 },
          { id: 'openseamap-layer', type: 'raster', source: 'openseamap-tiles', minzoom: 0, maxzoom: 18 },
        ],
      };
    }

    // Default: OpenSeaMap Nautical Chart with ESRI Ocean Bathymetry (Best for Sailing)
    return {
      version: 8,
      sources: {
        'esri-ocean': {
          type: 'raster',
          tiles: [
            'https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}',
          ],
          tileSize: 256,
          maxzoom: 13,
          attribution: 'Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA',
        },
        'esri-labels': {
          type: 'raster',
          tiles: [
            'https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Reference/MapServer/tile/{z}/{y}/{x}',
          ],
          tileSize: 256,
          maxzoom: 13,
        },
        'openseamap-seamarks': {
          type: 'raster',
          tiles: ['https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png'],
          tileSize: 256,
          maxzoom: 18,
          attribution: 'Nautical data &copy; OpenSeaMap contributors',
        },
      },
      layers: [
        { id: 'esri-ocean-layer', type: 'raster', source: 'esri-ocean', minzoom: 0, maxzoom: 18 },
        { id: 'esri-labels-layer', type: 'raster', source: 'esri-labels', minzoom: 0, maxzoom: 18 },
        { id: 'openseamap-seamarks-layer', type: 'raster', source: 'openseamap-seamarks', minzoom: 0, maxzoom: 18 },
      ],
    };
  }, []);

  // Update GeoJSON Layers (Routes, Risk Zones) on Mapbox instance
  const syncMapboxLayers = useCallback((map: mapboxgl.Map) => {
    // 1. Routes
    routes.forEach((route) => {
      const sourceId = `route-source-${route.id}`;
      const layerId = `route-layer-${route.id}`;
      const coords = route.waypoints.map((wp) => [wp.lng, wp.lat]);

      if (map.getSource(sourceId)) {
        (map.getSource(sourceId) as mapboxgl.GeoJSONSource).setData({
          type: 'Feature',
          properties: { name: route.name, color: route.color },
          geometry: { type: 'LineString', coordinates: coords },
        });
      } else {
        map.addSource(sourceId, {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: { name: route.name, color: route.color },
            geometry: { type: 'LineString', coordinates: coords },
          },
        });
      }

      if (!map.getLayer(layerId)) {
        map.addLayer({
          id: layerId,
          type: 'line',
          source: sourceId,
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
            visibility: activeLayers.routes ? 'visible' : 'none',
          },
          paint: {
            'line-color': route.color || '#0284C7',
            'line-width': selectedRouteId === route.id ? 5 : 3,
            'line-opacity': selectedRouteId === route.id ? 1 : 0.75,
            'line-dasharray': route.dashArray ? [3, 2] : [1, 0],
          },
        });
      } else {
        map.setLayoutProperty(layerId, 'visibility', activeLayers.routes ? 'visible' : 'none');
        map.setPaintProperty(layerId, 'line-width', selectedRouteId === route.id ? 5 : 3);
      }
    });

    // 2. Iceberg Markers
    // Clear old markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    if (activeLayers.icebergs) {
      icebergs.forEach((ib) => {
        const el = document.createElement('div');
        el.className = 'cursor-pointer select-none';
        const isSelected = selectedIceberg?.id === ib.id;
        const color =
          ib.riskLevel === 'critical'
            ? '#E11D48'
            : ib.riskLevel === 'warning' || ib.riskLevel === 'high'
            ? '#D97706'
            : '#10B981';
        const bg =
          ib.riskLevel === 'critical'
            ? '#FFE4E6'
            : ib.riskLevel === 'warning' || ib.riskLevel === 'high'
            ? '#FEF3C7'
            : '#D1FAE5';

        el.innerHTML = `
          <div style="display: flex; align-items: center; gap: 4px; padding: 2px 6px; border-radius: 6px; font-family: monospace; font-size: 10px; font-weight: 900; background-color: ${bg}; border: 2px solid ${color}; color: ${color}; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.3); transform: ${isSelected ? 'scale(1.2)' : 'scale(1)'}; transition: transform 0.15s ease;">
            <span>▲</span>
            <span>${ib.code}</span>
          </div>
        `;
        el.addEventListener('click', (e) => {
          e.stopPropagation();
          setSelectedIceberg(ib);
          setHudMessage(`Selected Iceberg: ${ib.code} (${ib.sizeClass}) - ${ib.driftSpeedKts} kts`);
        });

        const marker = new mapboxgl.Marker({ element: el })
          .setLngLat([ib.lng, ib.lat])
          .addTo(map);
        markersRef.current.push(marker);
      });
    }

    // 3. Vessel Marker
    const vesselEl = document.createElement('div');
    vesselEl.className = 'cursor-pointer select-none';
    vesselEl.innerHTML = `
      <div style="position: relative; display: flex; align-items: center; justify-content: center;">
        <div style="position: absolute; width: 44px; height: 44px; border-radius: 9999px; background-color: rgba(16, 185, 129, 0.25); animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
        <div style="height: 38px; width: 38px; border-radius: 9999px; background-color: #020617; border: 2.5px solid #10B981; color: #10B981; display: flex; align-items: center; justify-content: center; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.5); transform: rotate(${vessel.headingDeg}deg);">
          <svg style="width: 20px; height: 20px; fill: currentColor;" viewBox="0 0 24 24"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/></svg>
        </div>
        <div style="position: absolute; left: 42px; top: 2px; white-space: nowrap; padding: 3px 8px; border-radius: 6px; background-color: #020617; color: #FFFFFF; border: 1.5px solid #10B981; font-family: monospace; font-size: 11px; font-weight: 800; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.4);">
          ${vessel.name} [${vessel.speedKts} kts]
        </div>
      </div>
    `;
    vesselEl.addEventListener('click', () => {
      setHudMessage(`${vessel.name} | Heading: ${vessel.headingDeg}° | Speed: ${vessel.speedKts} kts | IMO PC3`);
    });

    const vesselMarker = new mapboxgl.Marker({ element: vesselEl })
      .setLngLat([vessel.lng, vessel.lat])
      .addTo(map);
    markersRef.current.push(vesselMarker);

    // 4. Research Station Markers
    ANTARCTIC_STATIONS.forEach((st) => {
      const stEl = document.createElement('div');
      stEl.className = 'cursor-pointer select-none';
      const isDest = st.isDest;
      stEl.innerHTML = `
        <div style="display: flex; align-items: center; gap: 4px; padding: 2px 6px; border-radius: 6px; font-family: monospace; font-size: 10px; font-weight: 900; background-color: ${isDest ? '#020617' : '#FFFFFF'}; border: 2px solid ${isDest ? '#10B981' : '#0284C7'}; color: ${isDest ? '#10B981' : '#0284C7'}; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.3);">
          <span>${isDest ? '🏁' : '📍'}</span>
          <span>${st.name}</span>
        </div>
      `;
      stEl.addEventListener('click', () => {
        setHudMessage(`Station: ${st.name} [${Math.abs(st.lat).toFixed(2)}°S, ${st.lng.toFixed(2)}°E]`);
      });

      const stMarker = new mapboxgl.Marker({ element: stEl })
        .setLngLat([st.lng, st.lat])
        .addTo(map);
      markersRef.current.push(stMarker);
    });
  }, [routes, icebergs, vessel, selectedIceberg, selectedRouteId, activeLayers]);

  // Initialize Mapbox GL Instance with Open-Source Nautical Tiles
  useEffect(() => {
    if (basemapMode === 'polar') {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      setEngineReady(false);
      return;
    }

    if (!mapContainerRef.current) return;

    try {
      mapboxgl.accessToken = ''; // No token required for open-source raster tiles!
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: getBasemapStyle(basemapMode),
        center: [vessel.lng, vessel.lat],
        zoom: 4.8,
        minZoom: 1.5,
        maxZoom: 16,
        attributionControl: false,
      });

      map.addControl(new mapboxgl.AttributionControl({ compact: true }), 'bottom-right');

      map.on('load', () => {
        mapInstanceRef.current = map;
        setEngineReady(true);
        syncMapboxLayers(map);
      });

      map.on('zoom', () => {
        setZoomLevel(Math.round((map.getZoom() / 5) * 100) / 100);
      });

      return () => {
        markersRef.current.forEach((m) => m.remove());
        markersRef.current = [];
        map.remove();
        mapInstanceRef.current = null;
      };
    } catch {
      setBasemapMode('polar');
    }
  }, [basemapMode, getBasemapStyle]);

  // Sync Layers whenever dependencies change
  useEffect(() => {
    if (mapInstanceRef.current && engineReady) {
      syncMapboxLayers(mapInstanceRef.current);
    }
  }, [syncMapboxLayers, engineReady, activeLayers, selectedRouteId]);

  const toSvg = (pct: number) => pct * 10;

  return (
    <div className={`relative flex flex-col ${heightClass} overflow-hidden rounded-[18px] border border-[#e0e0e0] bg-white`}>
      {/* 1. Tactical HUD Header (Solid Pure White Apple Bar) */}
      <div className="absolute top-0 inset-x-0 z-30 flex items-center justify-between px-4 py-2.5 bg-white border-b border-[#e0e0e0]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-[12px] font-mono font-semibold text-[#1d1d1f]">
            <Compass className="w-4 h-4 text-[#0066cc]" />
            <span>ANTARCTIC HIGH-LATITUDE MARITIME CHART</span>
          </div>
          <span className="hidden sm:inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-[#f5f5f7] text-[#1d1d1f] border border-[#e0e0e0] font-normal">
            {basemapMode === 'openseamap'
              ? 'OPENSEAMAP NAUTICAL (EPSG:3857/WGS84)'
              : basemapMode === 'esriOcean'
              ? 'ESRI BATHYMETRY & OCEAN DEPTH'
              : basemapMode === 'osm'
              ? 'OPENSTREETMAP MARINE'
              : 'POLAR STEREOGRAPHIC (EPSG:3031)'}
          </span>
        </div>

        {/* Telemetry Status Right */}
        <div className="flex items-center gap-2 sm:gap-3 text-[11px] font-mono">
          <div className="hidden md:flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#f5f5f7] border border-[#e0e0e0] text-[#1d1d1f]">
            <Crosshair className="w-3 h-3 text-[#0066cc]" />
            <span className="font-semibold">
              POS: {Math.abs(vessel.lat).toFixed(2)}°S, {vessel.lng.toFixed(2)}°E
            </span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-normal">
            <Radio className="w-3 h-3 text-emerald-600 animate-pulse" />
            <span>RADAR: 48 NM ACTIVE</span>
          </div>
        </div>
      </div>

      {/* 2. Top Left Layer & Basemap Controls Bar */}
      {!hideControls && (
        <div className="absolute top-14 left-4 z-30">
          <MapControls
            layers={activeLayers}
            onToggleLayer={handleToggleLayer}
            zoomLevel={zoomLevel}
            onZoomIn={() => {
              if (mapInstanceRef.current) {
                mapInstanceRef.current.zoomIn();
              } else {
                setZoomLevel((z) => Math.min(2.0, z + 0.2));
              }
            }}
            onZoomOut={() => {
              if (mapInstanceRef.current) {
                mapInstanceRef.current.zoomOut();
              } else {
                setZoomLevel((z) => Math.max(0.8, z - 0.2));
              }
            }}
            onResetView={() => {
              if (mapInstanceRef.current) {
                mapInstanceRef.current.flyTo({ center: [vessel.lng, vessel.lat], zoom: 4.8 });
              } else {
                setZoomLevel(1);
              }
            }}
            onCenterVessel={() => {
              if (mapInstanceRef.current) {
                mapInstanceRef.current.flyTo({ center: [vessel.lng, vessel.lat], zoom: 6, speed: 1.2 });
              } else {
                setZoomLevel(1.4);
              }
              setHudMessage(`Centered on ${vessel.name} [${Math.abs(vessel.lat).toFixed(2)}°S, ${vessel.lng.toFixed(2)}°E]`);
            }}
            engineMode={basemapMode !== 'polar' ? 'mapbox' : 'tactical-fallback'}
            basemapMode={basemapMode}
            onSelectBasemap={(mode) => setBasemapMode(mode)}
          />
        </div>
      )}

      {/* 3. Bottom Left Legend */}
      <div className="absolute bottom-12 left-4 z-30">
        <MapLegend />
      </div>

      {/* 4. Real Open-Source Map Engine Viewport */}
      {basemapMode !== 'polar' ? (
        <div className="flex-1 w-full h-full relative bg-[#090D16] pt-12 pb-8">
          <div ref={mapContainerRef} className="absolute inset-0 w-full h-full" />
        </div>
      ) : (
        /* Tactical Polar Vector Projection Canvas (EPSG:3031 Fallback) */
        <div className="flex-1 w-full h-full relative flex items-center justify-center p-2 bg-[#EAF4F9] overflow-hidden pt-12 pb-8">
          <div
            className="w-full h-full flex items-center justify-center transition-transform duration-300 select-none"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            <svg viewBox="0 0 1000 1000" className="w-full h-full object-contain">
              <defs>
                <radialGradient id="polarRadarGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#E0F2FE" stopOpacity="1" />
                  <stop offset="65%" stopColor="#DCEEF9" stopOpacity="1" />
                  <stop offset="100%" stopColor="#D4EAF7" stopOpacity="1" />
                </radialGradient>
                <linearGradient id="radarSweepSector" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0284C7" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Ocean Base */}
              <rect width="1000" height="1000" fill="url(#polarRadarGlow)" />

              {/* Rotating Radar Sweep Beam */}
              <g className="pointer-events-none" style={{ transformOrigin: '500px 500px' }}>
                <g className="animate-radar-spin" style={{ transformOrigin: '500px 500px' }}>
                  <line x1="500" y1="500" x2="500" y2="60" stroke="#0284C7" strokeWidth="1.5" opacity="0.35" />
                  <path d="M 500,500 L 500,60 A 440,440 0 0,1 640,84 Z" fill="url(#radarSweepSector)" opacity="0.15" />
                </g>
              </g>

              {/* Polar Coordinate Grid */}
              <g stroke="#94A3B8" strokeWidth="1" strokeDasharray="4,4" opacity="0.55">
                <circle cx="500" cy="500" r="440" fill="none" />
                <circle cx="500" cy="500" r="320" fill="none" />
                <circle cx="500" cy="500" r="200" fill="none" />
                <circle cx="500" cy="500" r="80" fill="none" />
                <line x1="500" y1="60" x2="500" y2="940" />
                <line x1="60" y1="500" x2="940" y2="500" />
              </g>

              {/* Grid Text Labels */}
              <g fill="#475569" fontSize="10" fontFamily="monospace" fontWeight="600" textAnchor="middle">
                <text x="500" y="52">60°S (SOUTHERN OCEAN ENTRY)</text>
                <text x="500" y="172">68°S (POLAR PACK MARGIN)</text>
                <text x="500" y="292">75°S (AMERY / ICE SHELF)</text>
                <text x="500" y="505" fill="#0369A1" fontWeight="bold">90°S SOUTH POLE</text>
                <text x="910" y="505">90°E</text>
                <text x="90" y="505">0°E</text>
              </g>

              {/* Antarctic Landmass Silhouette */}
              <path
                d="M 500,260 C 620,270 740,340 820,440 C 890,530 870,680 780,780 C 700,870 540,920 420,890 C 310,860 210,770 170,640 C 130,520 180,390 280,310 C 360,250 440,255 500,260 Z"
                fill="#FFFFFF"
                stroke="#64748B"
                strokeWidth="2.5"
              />

              {/* Amery Ice Shelf & Prydz Bay Detail */}
              <path
                d="M 680,620 C 720,600 780,640 800,720 C 760,740 710,710 680,620 Z"
                fill="#E0F2FE"
                stroke="#0284C7"
                strokeWidth="1.5"
                strokeDasharray="2,2"
              />
              <text x="760" y="650" fill="#0369A1" fontSize="10" fontFamily="monospace" fontWeight="bold">
                PRYDZ BAY / AMERY
              </text>

              {/* Bathymetry Contours Layer */}
              {activeLayers.bathymetry && (
                <g stroke="#6366F1" strokeWidth="1" strokeDasharray="3,3" opacity="0.6">
                  {BATHYMETRY_CONTOURS_DATA.map((bathy) => {
                    const points = bathy.points
                      .split(' ')
                      .map((p) => p.replace(',', ' '))
                      .join(' L ');
                    return (
                      <g key={bathy.id}>
                        <path d={`M ${points}`} fill="none" />
                        <text
                          x={Number(bathy.points.split(' ')[1].split(',')[0])}
                          y={Number(bathy.points.split(' ')[1].split(',')[1])}
                          fill="#818CF8"
                          fontSize="9"
                          fontFamily="monospace"
                        >
                          {bathy.label}
                        </text>
                      </g>
                    );
                  })}
                </g>
              )}

              {/* Sea Ice Concentration Layer */}
              {activeLayers.seaIce && (
                <SeaIceLayer
                  seaIceTiers={seaIceTiers}
                  onSelectTier={(tier) =>
                    setHudMessage(
                      `Sea-Ice Zone: ${tier.zoneName} (${tier.concentrationTier} - ${tier.iceStage})`
                    )
                  }
                />
              )}

              {/* Risk Zones Layer */}
              {activeLayers.risk && (
                <RiskLayer
                  riskZones={riskZones}
                  onSelectZone={(zone) => setSelectedZone(zone)}
                />
              )}

              {/* Ocean Currents Streamline Layer */}
              {activeLayers.oceanCurrents && (
                <g>
                  {OCEAN_CURRENTS_DATA.map((curr) => {
                    const cx = toSvg(curr.x);
                    const cy = toSvg(curr.y);
                    const rad = (curr.directionDeg * Math.PI) / 180;
                    const dx = cx + Math.sin(rad) * 22;
                    const dy = cy - Math.cos(rad) * 22;

                    return (
                      <g key={curr.id} opacity="0.65">
                        <line
                          x1={cx}
                          y1={cy}
                          x2={dx}
                          y2={dy}
                          stroke="#10B981"
                          strokeWidth="1.5"
                          strokeDasharray="4,2"
                        />
                        <polygon
                          points={`${dx},${dy} ${dx - 3},${dy + 4} ${dx + 3},${dy + 4}`}
                          fill="#10B981"
                          transform={`rotate(${curr.directionDeg}, ${dx}, ${dy})`}
                        />
                        {curr.label && (
                          <text
                            x={cx + 8}
                            y={cy - 4}
                            fill="#34D399"
                            fontSize="8"
                            fontFamily="monospace"
                          >
                            {curr.label} ({curr.speedKts} kts)
                          </text>
                        )}
                      </g>
                    );
                  })}
                </g>
              )}

              {/* Navigation Routes Layer */}
              {activeLayers.routes && (
                <RouteLayer
                  routes={routes}
                  selectedRouteId={selectedRouteId}
                  onSelectRoute={onSelectRoute}
                  toSvg={toSvg}
                  onSelectWaypoint={(wpInfo) => setHudMessage(wpInfo)}
                />
              )}

              {/* Custom Simulation Overlay */}
              {customOverlay}

              {/* Destination Marker: Bharati Station */}
              <g
                transform={`translate(${toSvg(vessel.destX)}, ${toSvg(vessel.destY)})`}
                className="cursor-pointer"
                onClick={() =>
                  setHudMessage('Destination: Bharati Station (Larsemann Hills) [69.41°S, 76.19°E]')
                }
              >
                <circle cx="0" cy="0" r="16" fill="rgba(16, 185, 129, 0.2)" stroke="#10B981" strokeWidth="1.5" />
                <circle cx="0" cy="0" r="5" fill="#10B981" />
                <text x="14" y="4" fill="#065F46" fontSize="11" fontFamily="monospace" fontWeight="bold">
                  BHARATI STATION [DEST]
                </text>
              </g>

              {/* Tracked Icebergs Layer */}
              {activeLayers.icebergs && (
                <g>
                  {icebergs.map((iceberg) => (
                    <IcebergMarker
                      key={iceberg.id}
                      iceberg={iceberg}
                      toSvg={toSvg}
                      isSelected={selectedIceberg?.id === iceberg.id}
                      onClick={(ib) => setSelectedIceberg(ib)}
                    />
                  ))}
                </g>
              )}

              {/* Vessel Marker */}
              <VesselMarker
                vessel={vessel}
                toSvg={toSvg}
                onClick={(v) =>
                  setHudMessage(
                    `${v.name} | Class: ${v.iceClass.split(' ')[0]} | Speed: ${v.speedKts} kts | Heading: ${v.headingDeg}°`
                  )
                }
              />
            </svg>
          </div>
        </div>
      )}

      {/* 5. HUD Interactive Notification Bar */}
      {hudMessage && (
        <div className="absolute top-14 right-4 z-40 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border-2 border-border text-xs font-mono text-text-primary shadow-2xl flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Crosshair className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span className="font-bold">{hudMessage}</span>
          </div>
          <button
            onClick={() => setHudMessage(null)}
            className="text-text-muted hover:text-text-primary font-bold text-xs"
          >
            ✕
          </button>
        </div>
      )}

      {/* 6. Selected Iceberg Inspection Flyout Modal (100% Solid Opacity, Zero Blur) */}
      {selectedIceberg && (
        <div className="absolute top-14 right-4 z-40 w-80 sm:w-96 rounded-2xl bg-white dark:bg-slate-900 border-2 border-border shadow-2xl p-4 space-y-3">
          <div className="flex items-start justify-between pb-2 border-b border-border">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-card-subtle border border-border text-text-primary">
                <Mountain className="w-4 h-4 text-amber-500" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-text-primary font-mono">
                  {selectedIceberg.name}
                </h4>
                <span className="text-[10px] text-text-muted font-mono font-normal">
                  CODE: {selectedIceberg.code} | {selectedIceberg.detectionSource}
                </span>
              </div>
            </div>

            <button
              onClick={() => setSelectedIceberg(null)}
              className="p-1 text-text-muted hover:text-text-primary rounded hover:bg-card-subtle"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
            <div className="p-2 rounded-xl bg-card-subtle border border-border">
              <span className="text-text-muted text-[10px] block font-normal">POSITION</span>
              <span className="text-text-primary font-bold">
                {Math.abs(selectedIceberg.lat).toFixed(2)}°S, {selectedIceberg.lng.toFixed(2)}°E
              </span>
            </div>

            <div className="p-2 rounded-xl bg-card-subtle border border-border">
              <span className="text-text-muted text-[10px] block font-normal">THREAT LEVEL</span>
              <span
                className={`font-bold uppercase ${
                  selectedIceberg.riskLevel === 'critical'
                    ? 'text-rose-600'
                    : selectedIceberg.riskLevel === 'warning' || selectedIceberg.riskLevel === 'high'
                    ? 'text-amber-600'
                    : 'text-emerald-600'
                }`}
              >
                {selectedIceberg.riskLevel}
              </span>
            </div>

            <div className="p-2 rounded-xl bg-card-subtle border border-border">
              <span className="text-text-muted text-[10px] block font-normal">SIZE & AREA</span>
              <span className="text-text-primary font-bold">
                {selectedIceberg.sizeClass} ({selectedIceberg.areaKm2} km²)
              </span>
            </div>

            <div className="p-2 rounded-xl bg-card-subtle border border-border">
              <span className="text-text-muted text-[10px] block font-normal">THICKNESS / DRAFT</span>
              <span className="text-text-primary font-bold">
                {selectedIceberg.thicknessM} m
              </span>
            </div>

            <div className="p-2 rounded-xl bg-card-subtle border border-border">
              <span className="text-text-muted text-[10px] block font-normal">DRIFT VECTOR</span>
              <span className="text-text-primary font-bold">
                {selectedIceberg.driftSpeedKts} kts @ {selectedIceberg.driftDirectionDeg}°
              </span>
            </div>

            <div className="p-2.5 rounded-[12px] bg-[#f5f5f7] border border-[#e0e0e0]">
              <span className="text-neutral-500 text-[10px] block font-normal">CLOSEST APPROACH</span>
              <span className="text-amber-700 font-semibold">
                {selectedIceberg.closestApproachNm} NM
              </span>
            </div>
          </div>

          {selectedIceberg.nearestStation && (
            <div className="text-[11px] font-mono text-neutral-500 px-1">
              Nearest Station: <span className="text-[#1d1d1f] font-semibold">{selectedIceberg.nearestStation}</span>
            </div>
          )}

          <div className="flex items-center gap-2 pt-2 border-t border-[#f0f0f0]">
            <button
              onClick={() => {
                setHudMessage(`Proximity radar tracker locked on ${selectedIceberg.code}`);
                setSelectedIceberg(null);
              }}
              className="btn-apple-primary w-full !min-h-[36px] !h-[36px] !text-[12px]"
            >
              <Radar className="w-3.5 h-3.5" />
              <span>Lock Collision Radar</span>
            </button>
          </div>
        </div>
      )}

      {/* 7. Selected Risk Zone Inspection Modal */}
      {selectedZone && (
        <div className="absolute top-14 right-4 z-40 w-80 rounded-[18px] bg-white border border-[#e0e0e0] shadow-xl p-4 space-y-2.5">
          <div className="flex items-start justify-between pb-2 border-b border-[#f0f0f0]">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <h4 className="text-[13px] font-semibold text-[#1d1d1f] font-mono">
                {selectedZone.name}
              </h4>
            </div>
            <button
              onClick={() => setSelectedZone(null)}
              className="p-1 rounded-full text-neutral-400 hover:text-[#1d1d1f] hover:bg-[#f5f5f7] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-1.5 text-[12px] font-mono">
            <div className="flex items-center justify-between">
              <span className="text-neutral-500 font-normal">Risk Severity:</span>
              <span className="font-semibold text-rose-700">{selectedZone.tier}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-500 font-normal">Calculated RIO:</span>
              <span className="font-semibold text-[#1d1d1f]">{selectedZone.riskScore} / 100</span>
            </div>
            <p className="text-[12px] text-neutral-600 font-sans leading-relaxed pt-1 font-normal">
              {selectedZone.description}
            </p>
          </div>
        </div>
      )}

      {/* 8. Bottom Map HUD Footer Bar (Solid Pure White Apple Bar) */}
      <div className="absolute bottom-0 inset-x-0 z-30 flex flex-wrap items-center justify-between gap-2 px-4 py-2 bg-white border-t border-[#e0e0e0] text-[11px] font-mono text-neutral-600">
        <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span className="font-semibold text-[#1d1d1f]">IMO POLAR CODE: PC3 CERTIFIED</span>
          </div>
          <div className="hidden md:flex items-center gap-1.5 text-neutral-400">
            <span>&bull;</span>
            <Zap className="w-3 h-3 text-[#0066cc]" />
            <span className="text-neutral-700 font-normal">AI WAYPOINT RE-EVALUATION: NOMINAL</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-neutral-500 text-[10px] font-normal">
          <span className="text-emerald-700 font-semibold">NAUTICAL TILES: OPENSEAMAP</span>
          <span>&bull;</span>
          <span>DATUM: WGS84</span>
        </div>
      </div>
    </div>
  );
};

export default AntarcticMap;
