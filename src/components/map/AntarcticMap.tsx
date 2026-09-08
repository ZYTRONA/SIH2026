import React, { useState, useEffect, useRef, useCallback } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  MapLayerVisibility,
  IcebergFeature,
  RiskZoneFeature,
  RoutePath,
  VesselState,
  SeaIceConcentrationFeature,
  AisVesselFeature,
  AntarcticStationFeature,
  NavigationalAidFeature,
} from '@/types/map';
import {
  ICEBERGS_DATA,
  VESSEL_STATE_DATA,
  ROUTE_PATHS_DATA,
  SEA_ICE_LAYERS_DATA,
  RISK_ZONES_DATA,
  OCEAN_CURRENTS_DATA,
  BATHYMETRY_CONTOURS_DATA,
  AIS_VESSELS_DATA,
  ANTARCTIC_STATIONS_DATA,
  NAVIGATIONAL_AIDS_DATA,
  WEATHER_POINTS_DATA,
} from '@/data/mapData';
import { MapControls, BasemapMode } from './MapControls';
import { MapLegend } from './MapLegend';
import { VesselMarker } from './VesselMarker';
import { IcebergMarker } from './IcebergMarker';
import { RouteLayer } from './RouteLayer';
import { RiskLayer } from './RiskLayer';
import { SeaIceLayer } from './SeaIceLayer';
import {
  Radio,
  Crosshair,
  Mountain,
  AlertTriangle,
  X,
  Radar,
  ShieldCheck,
  Zap,
  Ship,
  Sparkles,
  Ruler,
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

// LatLng polygon definitions for Risk Zones
const RISK_ZONE_COORDS: Record<string, L.LatLngExpression[]> = {
  'risk-critical': [
    [-67.5, 66.0],
    [-67.8, 71.5],
    [-68.8, 70.0],
    [-68.5, 65.0],
  ],
  'risk-high': [
    [-68.5, 70.0],
    [-68.7, 75.0],
    [-70.2, 74.0],
    [-69.8, 68.5],
  ],
  'risk-moderate': [
    [-65.5, 63.0],
    [-66.0, 69.0],
    [-67.5, 68.0],
    [-67.0, 62.0],
  ],
  'risk-low': [
    [-68.8, 74.5],
    [-69.1, 78.0],
    [-70.0, 77.5],
    [-69.8, 73.5],
  ],
  'risk-safe': [
    [-60.0, 56.0],
    [-60.2, 68.0],
    [-63.0, 67.0],
    [-62.8, 55.0],
  ],
};

// LatLng polygon definitions for Sea Ice Concentration Heatmap
const SEA_ICE_TIER_COORDS: Record<string, L.LatLngExpression[]> = {
  'ice-tier-1': [
    [-59.8, 50.0],
    [-60.1, 84.0],
    [-64.5, 83.0],
    [-64.2, 51.0],
  ],
  'ice-tier-2': [
    [-64.2, 53.0],
    [-64.5, 83.0],
    [-67.2, 81.0],
    [-67.0, 55.0],
  ],
  'ice-tier-3': [
    [-67.0, 57.0],
    [-67.2, 80.0],
    [-69.3, 78.8],
    [-69.0, 59.0],
  ],
  'ice-tier-4': [
    [-69.0, 61.0],
    [-69.3, 78.5],
    [-71.5, 77.5],
    [-71.2, 63.0],
  ],
};

// Great Circle Haversine Distance Helper (Nautical Miles)
function calculateDistanceNm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 3440.065; // Earth radius in nautical miles
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Initial True Bearing Helper (Degrees °T)
function calculateInitialBearing(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const phi1 = (lat1 * Math.PI) / 180;
  const phi2 = (lat2 * Math.PI) / 180;
  const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;
  const y = Math.sin(deltaLambda) * Math.cos(phi2);
  const x =
    Math.cos(phi1) * Math.sin(phi2) -
    Math.sin(phi1) * Math.cos(phi2) * Math.cos(deltaLambda);
  const theta = Math.atan2(y, x);
  return (Math.round((theta * 180) / Math.PI) + 360) % 360;
}

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
  const mapInstanceRef = useRef<L.Map | null>(null);
  const layersGroupRef = useRef<L.LayerGroup | null>(null);
  const measureLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const tileLayersRef = useRef<{ base?: L.TileLayer; seamarks?: L.TileLayer; ref?: L.TileLayer }>({});

  const [basemapMode, setBasemapMode] = useState<BasemapMode>('openseamap');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [hudMessage, setHudMessage] = useState<string | null>(null);

  // Selected Item Inspectors
  const [selectedIceberg, setSelectedIceberg] = useState<IcebergFeature | null>(null);
  const [selectedZone, setSelectedZone] = useState<RiskZoneFeature | null>(null);
  const [selectedAisVessel, setSelectedAisVessel] = useState<AisVesselFeature | null>(null);
  const [selectedStation, setSelectedStation] = useState<AntarcticStationFeature | null>(null);
  const [selectedNavAid, setSelectedNavAid] = useState<NavigationalAidFeature | null>(null);
  const [selectedVesselDetail, setSelectedVesselDetail] = useState<VesselState | null>(null);

  // Measurement Tool State
  const [isMeasuring, setIsMeasuring] = useState<boolean>(false);
  const [measurePoints, setMeasurePoints] = useState<Array<{ lat: number; lng: number }>>([]);
  const [measureResult, setMeasureResult] = useState<{
    distanceNm: number;
    bearingDeg: number;
    transitTimeHours: number;
  } | null>(null);

  // Live Voyage Simulation State
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulationSpeed, setSimulationSpeed] = useState<1 | 5 | 20>(5);
  const [simVesselPos, setSimVesselPos] = useState<{ lat: number; lng: number; heading: number } | null>(null);
  const simProgressRef = useRef<number>(0);

  // 10 Independent Layer Toggles
  const [internalLayers, setInternalLayers] = useState<MapLayerVisibility>({
    seaIce: true,
    icebergs: true,
    risk: true,
    routes: true,
    aisTargets: true,
    stations: true,
    navAids: true,
    oceanCurrents: true,
    bathymetry: false,
    weather: false,
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

  const initialVessel = customVessel || VESSEL_STATE_DATA;
  const currentVessel = {
    ...initialVessel,
    lat: simVesselPos ? simVesselPos.lat : initialVessel.lat,
    lng: simVesselPos ? simVesselPos.lng : initialVessel.lng,
    headingDeg: simVesselPos ? simVesselPos.heading : initialVessel.headingDeg,
  };

  const seaIceTiers = customSeaIce || SEA_ICE_LAYERS_DATA;
  const riskZones = customRiskZones || RISK_ZONES_DATA;
  const icebergs = customIcebergs || ICEBERGS_DATA;
  const routes = customRoutes || ROUTE_PATHS_DATA;
  const activeRoute = routes.find((r) => r.id === selectedRouteId) || routes[0];

  // --------------------------------------------------------------------------
  // 1. Live Simulation Engine: Interpolate Vessel Along Route Waypoints
  // --------------------------------------------------------------------------
  useEffect(() => {
    if (!isSimulating || !activeRoute || activeRoute.waypoints.length < 2) return;

    const interval = setInterval(() => {
      simProgressRef.current += 0.003 * simulationSpeed;
      if (simProgressRef.current >= activeRoute.waypoints.length - 1) {
        simProgressRef.current = 0; // Loop or reach destination
      }

      const totalLegs = activeRoute.waypoints.length - 1;
      const progress = simProgressRef.current;
      const currentLeg = Math.min(Math.floor(progress), totalLegs - 1);
      const legRatio = progress - currentLeg;

      const wpStart = activeRoute.waypoints[currentLeg];
      const wpEnd = activeRoute.waypoints[currentLeg + 1];

      const lat = wpStart.lat + (wpEnd.lat - wpStart.lat) * legRatio;
      const lng = wpStart.lng + (wpEnd.lng - wpStart.lng) * legRatio;
      const heading = calculateInitialBearing(wpStart.lat, wpStart.lng, wpEnd.lat, wpEnd.lng);

      setSimVesselPos({ lat, lng, heading });
    }, 100);

    return () => clearInterval(interval);
  }, [isSimulating, simulationSpeed, activeRoute]);

  const handleResetSimulation = () => {
    setIsSimulating(false);
    simProgressRef.current = 0;
    setSimVesselPos(null);
    setHudMessage('Voyage simulation reset to original coordinates');
  };

  // --------------------------------------------------------------------------
  // 2. Initialize Leaflet Map Instance with OpenSeaMap Nautical Chart
  // --------------------------------------------------------------------------
  useEffect(() => {
    if (basemapMode === 'polar') {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        layersGroupRef.current = null;
        measureLayerGroupRef.current = null;
      }
      return;
    }

    if (!mapContainerRef.current) return;

    // If map instance already exists, switch tile layers
    if (mapInstanceRef.current) {
      updateBasemapTiles(basemapMode);
      return;
    }

    const map = L.map(mapContainerRef.current, {
      center: [currentVessel.lat, currentVessel.lng],
      zoom: 5,
      zoomControl: false,
      attributionControl: true,
      minZoom: 2,
      maxZoom: 18,
      worldCopyJump: false,
    });

    const layerGroup = L.layerGroup().addTo(map);
    const measureGroup = L.layerGroup().addTo(map);
    layersGroupRef.current = layerGroup;
    measureLayerGroupRef.current = measureGroup;
    mapInstanceRef.current = map;

    // Scale bar
    L.control.scale({ imperial: true, position: 'bottomright' }).addTo(map);

    // Initial base tiles
    updateBasemapTiles(basemapMode);

    // Initial bounding box to view complete Antarctic voyage corridor
    map.fitBounds([[-70.8, 54.0], [-59.5, 79.5]], { padding: [50, 50], animate: false });

    // Direct click on map background clears all active inspector cards
    const handleMapClick = () => {
      setSelectedIceberg(null);
      setSelectedAisVessel(null);
      setSelectedStation(null);
      setSelectedNavAid(null);
      setSelectedZone(null);
      setSelectedVesselDetail(null);
    };
    map.on('click', handleMapClick);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedIceberg(null);
        setSelectedAisVessel(null);
        setSelectedStation(null);
        setSelectedNavAid(null);
        setSelectedZone(null);
        setSelectedVesselDetail(null);
        setIsMeasuring(false);
      }
    };
    const handleResize = () => {
      map.invalidateSize();
    };
    window.addEventListener('resize', handleResize);
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 250);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.off('click', handleMapClick);
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        layersGroupRef.current = null;
        measureLayerGroupRef.current = null;
      }
    };
  }, [basemapMode]);

  // Helper to switch base tiles
  const updateBasemapTiles = (mode: BasemapMode) => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (tileLayersRef.current.base) map.removeLayer(tileLayersRef.current.base);
    if (tileLayersRef.current.seamarks) map.removeLayer(tileLayersRef.current.seamarks);
    if (tileLayersRef.current.ref) map.removeLayer(tileLayersRef.current.ref);
    tileLayersRef.current = {};

    if (mode === 'esriOcean') {
      const base = L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}',
        {
          attribution: 'Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS',
          maxZoom: 13,
        }
      ).addTo(map);

      const ref = L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Reference/MapServer/tile/{z}/{y}/{x}',
        { maxZoom: 13 }
      ).addTo(map);

      const seamarks = L.tileLayer(
        'https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png',
        {
          attribution: 'Nautical data &copy; <a href="https://www.openseamap.org">OpenSeaMap</a>',
          maxZoom: 18,
        }
      ).addTo(map);

      tileLayersRef.current = { base, ref, seamarks };
    } else if (mode === 'osm') {
      const base = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        subdomains: 'abc',
        maxZoom: 19,
      }).addTo(map);

      const seamarks = L.tileLayer(
        'https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png',
        {
          attribution: 'Nautical data &copy; <a href="https://www.openseamap.org">OpenSeaMap</a>',
          maxZoom: 18,
        }
      ).addTo(map);

      tileLayersRef.current = { base, seamarks };
    } else {
      // Default: OpenSeaMap Nautical Chart (openseamap.org)
      const base = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        subdomains: 'abc',
        maxZoom: 19,
      }).addTo(map);

      const seamarks = L.tileLayer(
        'https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png',
        {
          attribution: 'Nautical data &copy; <a href="https://www.openseamap.org">OpenSeaMap</a> contributors',
          maxZoom: 18,
        }
      ).addTo(map);

      tileLayersRef.current = { base, seamarks };
    }
  };

  // --------------------------------------------------------------------------
  // 3. Handle Interactive Distance Measuring Tool Clicks
  // --------------------------------------------------------------------------
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || basemapMode === 'polar') return;

    if (!isMeasuring) {
      if (measureLayerGroupRef.current) measureLayerGroupRef.current.clearLayers();
      setMeasurePoints([]);
      setMeasureResult(null);
      return;
    }

    const handleMapClick = (e: L.LeafletMouseEvent) => {
      const newPt = { lat: e.latlng.lat, lng: e.latlng.lng };

      setMeasurePoints((prev) => {
        const next = prev.length >= 2 ? [newPt] : [...prev, newPt];
        return next;
      });
    };

    map.on('click', handleMapClick);
    return () => {
      map.off('click', handleMapClick);
    };
  }, [isMeasuring, basemapMode]);

  // Render Measurement Lines & Markers
  useEffect(() => {
    const group = measureLayerGroupRef.current;
    if (!group) return;

    group.clearLayers();

    if (measurePoints.length === 1) {
      const p1 = measurePoints[0];
      const m1 = L.circleMarker([p1.lat, p1.lng], {
        radius: 6,
        color: '#0066cc',
        fillColor: '#FFFFFF',
        fillOpacity: 1,
        weight: 3,
      });
      group.addLayer(m1);
      setMeasureResult(null);
    } else if (measurePoints.length === 2) {
      const [p1, p2] = measurePoints;

      const dist = calculateDistanceNm(p1.lat, p1.lng, p2.lat, p2.lng);
      const bearing = calculateInitialBearing(p1.lat, p1.lng, p2.lat, p2.lng);
      const speed = currentVessel.speedKts || 12.4;
      const transitHours = dist / speed;

      setMeasureResult({
        distanceNm: Math.round(dist * 10) / 10,
        bearingDeg: bearing,
        transitTimeHours: Math.round(transitHours * 10) / 10,
      });

      const line = L.polyline([[p1.lat, p1.lng], [p2.lat, p2.lng]], {
        color: '#0066cc',
        weight: 3.5,
        dashArray: '6,6',
      });
      group.addLayer(line);

      const m1 = L.circleMarker([p1.lat, p1.lng], {
        radius: 6,
        color: '#0066cc',
        fillColor: '#FFFFFF',
        fillOpacity: 1,
        weight: 3,
      });
      const m2 = L.circleMarker([p2.lat, p2.lng], {
        radius: 6,
        color: '#10B981',
        fillColor: '#FFFFFF',
        fillOpacity: 1,
        weight: 3,
      });

      group.addLayer(m1);
      group.addLayer(m2);
    }
  }, [measurePoints, currentVessel.speedKts]);

  // --------------------------------------------------------------------------
  // 4. Render and Synchronize All 10 Leaflet Layers
  // --------------------------------------------------------------------------
  const syncLeafletLayers = useCallback(() => {
    const group = layersGroupRef.current;
    if (!group) return;

    group.clearLayers();

    // 1. Sea-Ice Concentration Heatmap Layer (Sentinel-1 SAR & WMO Egg Code)
    if (activeLayers.seaIce) {
      seaIceTiers.forEach((tier) => {
        const coords = SEA_ICE_TIER_COORDS[tier.id];
        if (!coords) return;

        const polygon = L.polygon(coords, {
          color: tier.color || '#0284C7',
          weight: 1.5,
          opacity: 0.7,
          fillColor: tier.color || '#0284C7',
          fillOpacity: tier.fillOpacity || 0.28,
        });

        polygon.on('click', () => {
          setHudMessage(`Sea-Ice Zone: ${tier.zoneName} (${tier.concentrationTier} - ${tier.eggCodeNotation || tier.iceStage})`);
        });

        group.addLayer(polygon);
      });
    }

    // 2. Bathymetry Isobaths & Depth Contours
    if (activeLayers.bathymetry) {
      const bathyContourCoords: Array<{ label: string; coords: L.LatLngExpression[]; danger?: boolean }> = [
        { label: '-100m Coastal Shoal Sounding', coords: [[-67.8, 74.0], [-68.2, 75.5], [-68.9, 76.5]], danger: true },
        { label: '-200m Shallow Coastal Shelf', coords: [[-66.8, 68.0], [-67.4, 72.0], [-68.1, 76.0]], danger: true },
        { label: '-500m Continental Shelf Break', coords: [[-65.8, 60.0], [-66.4, 68.0], [-67.0, 75.0]] },
        { label: '-1000m Continental Slope Margin', coords: [[-64.8, 55.0], [-65.5, 65.0], [-66.2, 74.0], [-65.8, 81.0]] },
        { label: '-2000m Continental Rise', coords: [[-62.5, 52.0], [-63.5, 63.0], [-64.2, 73.0], [-63.8, 80.0]] },
        { label: '-3000m Abyssal Plain', coords: [[-60.5, 50.0], [-61.2, 60.0], [-61.8, 70.0], [-61.5, 78.0]] },
      ];

      bathyContourCoords.forEach((bathy) => {
        const polyline = L.polyline(bathy.coords, {
          color: bathy.danger ? '#F43F5E' : '#6366F1',
          weight: bathy.danger ? 2 : 1.5,
          dashArray: bathy.danger ? '5,5' : '4,4',
          opacity: 0.7,
        });
        polyline.on('click', () => {
          setHudMessage(`Isobath: ${bathy.label}`);
        });
        group.addLayer(polyline);
      });
    }

    // 3. Ocean Currents Streamlines & Gyres
    if (activeLayers.oceanCurrents) {
      const currentVectors: Array<{ start: [number, number]; end: [number, number]; label: string; speed: number; temp: string }> = [
        { start: [-61.0, 56.0], end: [-61.5, 64.0], label: 'Antarctic Circumpolar Current', speed: 2.2, temp: '+1.4°C' },
        { start: [-63.5, 66.0], end: [-64.2, 74.0], label: 'Southern Ocean Eastward Drift', speed: 1.8, temp: '+0.6°C' },
        { start: [-67.8, 72.0], end: [-68.8, 69.5], label: 'Prydz Bay Coastal Gyre', speed: 1.1, temp: '-1.6°C' },
        { start: [-67.0, 72.0], end: [-67.8, 64.0], label: 'Antarctic Coastal Current (East Wind Drift)', speed: 0.9, temp: '-1.8°C' },
      ];

      currentVectors.forEach((vec) => {
        const line = L.polyline([vec.start, vec.end], {
          color: '#10B981',
          weight: 2.5,
          dashArray: '6,4',
          opacity: 0.8,
        });
        line.on('click', () => {
          setHudMessage(`Ocean Current: ${vec.label} (${vec.speed} kts, Temp: ${vec.temp})`);
        });
        group.addLayer(line);
      });
    }

    // 4. Weather Points & Wind Vector Grid
    if (activeLayers.weather) {
      WEATHER_POINTS_DATA.forEach((wx) => {
        const wxIcon = L.divIcon({
          className: 'custom-wx-icon',
          html: `
            <div style="cursor: pointer; display: flex; align-items: center; gap: 4px; padding: 2px 6px; border-radius: 6px; font-family: monospace; font-size: 9px; font-weight: 800; background-color: rgba(255,255,255,0.95); border: 1.5px solid #3B82F6; color: #1E40AF; box-shadow: 0 2px 5px rgba(0,0,0,0.15); white-space: nowrap;">
              <span>💨 ${wx.windSpeedKts} kts</span>
              <span>🌊 ${wx.swellHeightM}m</span>
            </div>
          `,
          iconSize: [85, 20],
          iconAnchor: [42, 10],
        });

        const marker = L.marker([wx.lat, wx.lng], { icon: wxIcon });
        marker.on('click', () => {
          setHudMessage(`Weather Observation: ${wx.condition} | Wind: ${wx.windSpeedKts} kts @ ${wx.windDirDeg}° | Swell: ${wx.swellHeightM}m | Temp: ${wx.airTempC}°C`);
        });
        group.addLayer(marker);
      });
    }

    // 5. POLARIS Risk Zones Layer
    if (activeLayers.risk) {
      riskZones.forEach((rz) => {
        const coords = RISK_ZONE_COORDS[rz.id];
        if (!coords) return;

        const polygon = L.polygon(coords, {
          color: rz.borderColor || '#EF4444',
          weight: 2,
          dashArray: '5,5',
          fillColor: rz.borderColor || '#EF4444',
          fillOpacity: 0.14,
        });

        polygon.on('click', () => {
          setSelectedZone(rz);
          setHudMessage(`Risk Zone: ${rz.name} (${rz.tier}) - Calculated RIO: ${rz.riskScore}/100`);
        });

        group.addLayer(polygon);
      });
    }

    // 6. Navigation Routes Layer with Waypoint Telemetry
    if (activeLayers.routes) {
      routes.forEach((route) => {
        const isSelected = route.id === (selectedRouteId || routes[0].id);
        const latLngs: L.LatLngExpression[] = route.waypoints.map((wp) => [wp.lat, wp.lng]);

        if (isSelected) {
          const glow = L.polyline(latLngs, {
            color: route.color || '#0066cc',
            weight: 12,
            opacity: 0.22,
            lineCap: 'round',
            lineJoin: 'round',
          });
          group.addLayer(glow);
        }

        const line = L.polyline(latLngs, {
          color: route.color || '#0066cc',
          weight: isSelected ? 5 : 3,
          opacity: isSelected ? 1 : 0.65,
          dashArray: isSelected ? undefined : route.dashArray,
          lineCap: 'round',
          lineJoin: 'round',
        });

        line.on('click', () => {
          if (onSelectRoute) onSelectRoute(route.id);
          setHudMessage(`Corridor Selected: ${route.name} (${route.totalDistanceNm} NM, Safety Score: ${route.safetyScore}%)`);
        });

        group.addLayer(line);

        // Waypoints for selected route
        if (isSelected) {
          route.waypoints.forEach((wp, idx, arr) => {
            if (idx === 0 || idx === arr.length - 1) return;
            const wpIcon = L.divIcon({
              className: 'custom-wp-icon',
              html: `
                <div style="cursor: pointer; width: 12px; height: 12px; border-radius: 9999px; background-color: #FFFFFF; border: 3px solid ${route.color || '#0066cc'}; box-shadow: 0 2px 4px rgba(0,0,0,0.2);"></div>
              `,
              iconSize: [12, 12],
              iconAnchor: [6, 6],
            });

            const marker = L.marker([wp.lat, wp.lng], { icon: wpIcon });
            marker.on('click', () => {
              setHudMessage(`Waypoint ${wp.name}: Ice Conc: ${wp.iceConcentrationPct}% | RIO: ${wp.rioScore ?? '+12'} | Safe Speed: ${wp.safeSpeedKts ?? 12} kts`);
            });
            group.addLayer(marker);
          });
        }
      });
    }

    // 7. Tracked Icebergs Layer with 72h Drift Trajectories
    if (activeLayers.icebergs) {
      icebergs.forEach((ib) => {
        const isSelected = selectedIceberg?.id === ib.id;
        const color =
          ib.riskLevel === 'critical'
            ? '#E11D48'
            : ib.riskLevel === 'warning' || ib.riskLevel === 'high'
            ? '#D97706'
            : '#0284C7';

        // 72h predicted drift trajectory dashed trail
        if (ib.trajectory && ib.trajectory.length > 1) {
          const trailCoords: L.LatLngExpression[] = ib.trajectory.map((t) => [t.lat, t.lng]);
          const trailLine = L.polyline(trailCoords, {
            color: color,
            weight: 2,
            dashArray: '3,3',
            opacity: 0.65,
          });
          group.addLayer(trailLine);
        }

        // 5 NM Alert perimeter circle for critical tabular bergs
        if (ib.riskLevel === 'critical') {
          const alertCircle = L.circle([ib.lat, ib.lng], {
            radius: 5 * 1852, // 5 NM in meters
            color: '#E11D48',
            weight: 1,
            dashArray: '3,3',
            fillColor: '#E11D48',
            fillOpacity: 0.05,
          });
          group.addLayer(alertCircle);
        }

        const ibIcon = L.divIcon({
          className: 'custom-iceberg-icon',
          html: `
            <div style="cursor: pointer; select: none; transform: ${isSelected ? 'scale(1.2)' : 'scale(1)'}; transition: transform 0.15s ease;">
              <div style="display: flex; align-items: center; gap: 4px; padding: 2px 6px; border-radius: 6px; font-family: monospace; font-size: 10px; font-weight: 800; background-color: #FFFFFF; border: 2px solid ${color}; color: ${color}; box-shadow: 0 3px 6px rgba(0,0,0,0.15); white-space: nowrap;">
                <span>▲</span>
                <span>${ib.code}</span>
                <span style="font-size: 8px; opacity: 0.8;">[${ib.driftSpeedKts}k]</span>
              </div>
            </div>
          `,
          iconSize: [75, 24],
          iconAnchor: [37, 12],
        });

        const marker = L.marker([ib.lat, ib.lng], { icon: ibIcon });
        marker.on('click', (e) => {
          L.DomEvent.stopPropagation(e);
          setSelectedIceberg(ib);
          setSelectedAisVessel(null);
          setSelectedStation(null);
          setSelectedNavAid(null);
          setSelectedZone(null);
          setHudMessage(`Iceberg ${ib.code} (${ib.sizeClass}) - Drift: ${ib.driftSpeedKts} kts @ ${ib.driftDirectionDeg}°`);
        });

        group.addLayer(marker);
      });
    }

    // 8. AIS Target Polar Vessels Layer
    if (activeLayers.aisTargets) {
      AIS_VESSELS_DATA.forEach((shipTarget) => {
        const isSelected = selectedAisVessel?.id === shipTarget.id;
        const shipIcon = L.divIcon({
          className: 'custom-ais-icon',
          html: `
            <div style="cursor: pointer; display: flex; align-items: center; gap: 6px; transform: ${isSelected ? 'scale(1.15)' : 'scale(1)'}; transition: transform 0.15s ease;">
              <!-- Mini Top-Down AIS Vessel Hull (Rotated to true heading) -->
              <div style="transform: rotate(${shipTarget.headingDeg}deg); filter: drop-shadow(0 2px 6px rgba(0,0,0,0.25)); flex-shrink: 0;">
                <svg width="18" height="36" viewBox="0 0 18 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <!-- AIS Vessel Hull (Blue Steel PC4 Hull) -->
                  <path d="M9 1C11.5 5 16 12 16 25C16 31 14 34 12 35L6 35C4 34 2 31 2 25C2 12 6.5 5 9 1Z" fill="#FFFFFF" stroke="#2563EB" stroke-width="1.8" />
                  <!-- Foredeck Stem -->
                  <line x1="9" y1="3" x2="9" y2="10" stroke="#2563EB" stroke-width="1.5" stroke-linecap="round" />
                  <!-- Wheelhouse / Bridge -->
                  <rect x="5" y="13" width="8" height="7" rx="1.2" fill="#2563EB" />
                  <rect x="6.2" y="14.5" width="5.6" height="2" rx="0.5" fill="#DBEAFE" />
                  <!-- Aft Helipad -->
                  <circle cx="9" cy="27" r="3" fill="none" stroke="#2563EB" stroke-width="0.8" stroke-dasharray="1.5,1.5" />
                  <!-- Port & Starboard Navigation Lights -->
                  <circle cx="3" cy="13" r="1" fill="#EF4444" />
                  <circle cx="15" cy="13" r="1" fill="#10B981" />
                </svg>
              </div>
              <!-- AIS Label Badge -->
              <div style="padding: 2px 7px; border-radius: 6px; font-family: monospace; font-size: 10px; font-weight: 800; background-color: #FFFFFF; border: 1.5px solid #2563EB; color: #1E40AF; box-shadow: 0 3px 8px rgba(0,0,0,0.14); white-space: nowrap; display: flex; align-items: center; gap: 4px;">
                <span>${shipTarget.name}</span>
                <span style="font-size: 8.5px; color: #2563EB; background: #EFF6FF; padding: 1px 4px; border-radius: 3px; font-weight: 700;">${shipTarget.speedKts}k</span>
              </div>
            </div>
          `,
          iconSize: [140, 36],
          iconAnchor: [9, 18],
        });

        const marker = L.marker([shipTarget.lat, shipTarget.lng], { icon: shipIcon });
        marker.on('click', (e) => {
          L.DomEvent.stopPropagation(e);
          setSelectedAisVessel(shipTarget);
          setSelectedIceberg(null);
          setSelectedStation(null);
          setSelectedNavAid(null);
          setSelectedZone(null);
          setHudMessage(`AIS Target: ${shipTarget.name} (${shipTarget.iceClass}) | Speed: ${shipTarget.speedKts} kts | CPA: ${shipTarget.cpaNm} NM`);
        });

        group.addLayer(marker);
      });
    }

    // 9. Antarctic Scientific Research Stations Layer (12 Bases)
    if (activeLayers.stations) {
      ANTARCTIC_STATIONS_DATA.forEach((st) => {
        const isDest = st.isDest;
        const isOrigin = st.isOrigin;
        const isSelected = selectedStation?.id === st.id;

        const stIcon = L.divIcon({
          className: 'custom-station-icon',
          html: `
            <div style="cursor: pointer; display: flex; align-items: center; gap: 4px; padding: 3px 8px; border-radius: 6px; font-family: monospace; font-size: 10px; font-weight: 800; background-color: ${isDest ? '#0066cc' : isOrigin ? '#10B981' : '#FFFFFF'}; border: 2px solid ${isDest ? '#0066cc' : isOrigin ? '#10B981' : '#0284C7'}; color: ${isDest || isOrigin ? '#FFFFFF' : '#0284C7'}; box-shadow: 0 3px 6px rgba(0,0,0,0.15); white-space: nowrap; transform: ${isSelected ? 'scale(1.15)' : 'scale(1)'}; transition: transform 0.15s ease;">
              <span>${st.flag}</span>
              <span>${st.name}</span>
              ${isDest ? '<span style="font-size: 8px; background: rgba(255,255,255,0.25); padding: 1px 4px; border-radius: 4px;">DEST</span>' : ''}
            </div>
          `,
          iconSize: [130, 26],
          iconAnchor: [65, 13],
        });

        const marker = L.marker([st.lat, st.lng], { icon: stIcon });
        marker.on('click', (e) => {
          L.DomEvent.stopPropagation(e);
          setSelectedStation(st);
          setSelectedIceberg(null);
          setSelectedAisVessel(null);
          setSelectedNavAid(null);
          setSelectedZone(null);
          setHudMessage(`Station: ${st.name} [${st.country}] | Radio: ${st.radioChannel} | Temp: ${st.temperatureC}°C`);
        });

        group.addLayer(marker);
      });
    }

    // 10. Polar Navigational Aids & Buoys Layer
    if (activeLayers.navAids) {
      NAVIGATIONAL_AIDS_DATA.forEach((aton) => {
        const isSelected = selectedNavAid?.id === aton.id;
        const atonIcon = L.divIcon({
          className: 'custom-aton-icon',
          html: `
            <div style="cursor: pointer; display: flex; align-items: center; gap: 4px; padding: 2px 6px; border-radius: 6px; font-family: monospace; font-size: 9px; font-weight: 800; background-color: #FFFFFF; border: 1.5px solid #D97706; color: #B45309; box-shadow: 0 2px 5px rgba(0,0,0,0.15); white-space: nowrap; transform: ${isSelected ? 'scale(1.15)' : 'scale(1)'};">
              <span>⚓</span>
              <span>${aton.name}</span>
              <span style="font-size: 8px; color: #78350F;">[${aton.lightCharacter}]</span>
            </div>
          `,
          iconSize: [140, 22],
          iconAnchor: [70, 11],
        });

        const marker = L.marker([aton.lat, aton.lng], { icon: atonIcon });
        marker.on('click', (e) => {
          L.DomEvent.stopPropagation(e);
          setSelectedNavAid(aton);
          setSelectedIceberg(null);
          setSelectedAisVessel(null);
          setSelectedStation(null);
          setSelectedZone(null);
          setHudMessage(`AtoN: ${aton.name} | Light: ${aton.lightCharacter} | Nominal Range: ${aton.nominalRangeNm} NM`);
        });

        group.addLayer(marker);
      });
    }

    // 11. Flagship Research Vessel (R/V Polar Sentinel), Radar Range Rings & Course Vector
    const radarRangeNm = currentVessel.radarRangeNm || 48;

    // 48 NM Outer Radar Circle
    const radarCircle48 = L.circle([currentVessel.lat, currentVessel.lng], {
      radius: radarRangeNm * 1852,
      color: '#10B981',
      weight: 1.5,
      dashArray: '4,4',
      fillColor: '#10B981',
      fillOpacity: 0.04,
    });
    group.addLayer(radarCircle48);

    // 24 NM Intermediate Radar Circle
    const radarCircle24 = L.circle([currentVessel.lat, currentVessel.lng], {
      radius: 24 * 1852,
      color: '#10B981',
      weight: 1,
      dashArray: '2,4',
      fillColor: 'transparent',
      opacity: 0.45,
    });
    group.addLayer(radarCircle24);

    // 1-Hour Dead-Reckoning Projected Course Line
    const drDistanceNm = currentVessel.speedKts || 12.4;
    const radHeading = (currentVessel.headingDeg * Math.PI) / 180;
    const drEndLat = currentVessel.lat + (drDistanceNm / 60) * Math.cos(radHeading);
    const drEndLng = currentVessel.lng + (drDistanceNm / (60 * Math.cos((currentVessel.lat * Math.PI) / 180))) * Math.sin(radHeading);

    const drLine = L.polyline([[currentVessel.lat, currentVessel.lng], [drEndLat, drEndLng]], {
      color: '#10B981',
      weight: 2.5,
      dashArray: '4,2',
      opacity: 0.9,
    });
    group.addLayer(drLine);

    const vesselIcon = L.divIcon({
      className: 'custom-vessel-icon',
      html: `
        <div style="position: relative; display: flex; align-items: center; justify-content: center; cursor: pointer; width: 64px; height: 64px;">
          <!-- Radar ping pulse ring -->
          <div style="position: absolute; width: 56px; height: 56px; border-radius: 9999px; background-color: rgba(16, 185, 129, 0.22); animation: ping 2.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
          
          <!-- Rotated Realistic Top-Down Polar Icebreaker Ship Hull -->
          <div style="transform: rotate(${currentVessel.headingDeg}deg); filter: drop-shadow(0 4px 10px rgba(0,0,0,0.3)); transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1); flex-shrink: 0;">
            <svg width="30" height="62" viewBox="0 0 30 62" fill="none" xmlns="http://www.w3.org/2000/svg">
              <!-- Reinforced Double Icebreaker Hull (White Polar Finish + Emerald Keel) -->
              <path d="M15 2C19 8 28 19 28 41C28 52 25 57 22 59L8 59C5 57 2 52 2 41C2 19 11 8 15 2Z" fill="#FFFFFF" stroke="#059669" stroke-width="2.2" />
              
              <!-- Ice-Knife Stem Reinforcement Line -->
              <line x1="15" y1="4" x2="15" y2="18" stroke="#10B981" stroke-width="2.5" stroke-linecap="round" />
              <circle cx="15" cy="5" r="1.8" fill="#10B981" />
              
              <!-- Foredeck Acoustic Lab / Cargo Hatch -->
              <rect x="10.5" y="14" width="9" height="6" rx="1.5" fill="#E6F4EA" stroke="#10B981" stroke-width="1" />
              
              <!-- Bridge Superstructure & Wheelhouse -->
              <path d="M7 23H23L22 36H8L7 23Z" fill="#047857" stroke="#065F46" stroke-width="0.8" />
              <!-- Bridge Navigational Windows -->
              <rect x="9.5" y="25" width="11" height="3" rx="0.8" fill="#A7F3D0" />
              
              <!-- Active Radar Mast Beacon -->
              <circle cx="15" cy="31" r="2" fill="#34D399" />
              
              <!-- Engine Exhaust Funnel -->
              <rect x="11.5" y="38" width="7" height="5" rx="1" fill="#E5E7EB" stroke="#9CA3AF" stroke-width="0.8" />
              
              <!-- Aft Helipad Deck with 'H' Insignia -->
              <circle cx="15" cy="50" r="5" fill="#F3F4F6" stroke="#10B981" stroke-width="1" stroke-dasharray="2,1.5" />
              <text x="15" y="52.6" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="6" fill="#047857">H</text>
              
              <!-- Port (Red) and Starboard (Green) Navigation Lights -->
              <circle cx="3.8" cy="23" r="1.3" fill="#EF4444" />
              <circle cx="26.2" cy="23" r="1.3" fill="#10B981" />
            </svg>
          </div>
          
          <!-- Tactical Ship Identification Pill -->
          <div style="position: absolute; left: 54px; top: 16px; white-space: nowrap; padding: 3px 9px; border-radius: 7px; background-color: #FFFFFF; color: #1d1d1f; border: 1.5px solid #10B981; font-family: monospace; font-size: 11px; font-weight: 800; box-shadow: 0 4px 10px rgba(0,0,0,0.14); display: flex; align-items: center; gap: 5px;">
            <span style="display: inline-block; width: 6px; height: 6px; border-radius: 9999px; background-color: #10B981;"></span>
            <span>${currentVessel.name}</span>
            <span style="color: #059669; font-weight: 900;">[${currentVessel.speedKts} kts]</span>
          </div>
        </div>
      `,
      iconSize: [64, 64],
      iconAnchor: [32, 32],
    });

    const vesselMarker = L.marker([currentVessel.lat, currentVessel.lng], { icon: vesselIcon });
    vesselMarker.on('click', () => {
      setSelectedVesselDetail(currentVessel);
      setHudMessage(`${currentVessel.name} | Heading: ${currentVessel.headingDeg}° | Speed: ${currentVessel.speedKts} kts | IMO PC3 Certified`);
    });

    group.addLayer(vesselMarker);
  }, [
    routes,
    icebergs,
    currentVessel,
    selectedIceberg,
    selectedRouteId,
    activeLayers,
    onSelectRoute,
    riskZones,
    seaIceTiers,
    selectedAisVessel,
    selectedStation,
    selectedNavAid,
  ]);

  // Synchronize Leaflet Layers whenever state changes
  useEffect(() => {
    if (mapInstanceRef.current && basemapMode !== 'polar') {
      syncLeafletLayers();
    }
  }, [syncLeafletLayers, basemapMode, activeLayers, selectedRouteId, selectedIceberg, simVesselPos]);

  const toSvg = (pct: number) => pct * 10;

  return (
    <div className={`relative flex flex-col ${heightClass} overflow-hidden rounded-[18px] border border-[#e0e0e0] bg-[#EAF4F9] select-none`}>
      {/* 1. Map Viewport Canvas */}
      <div className="flex-1 relative w-full h-full bg-[#EAF4F9] overflow-hidden">
        {basemapMode !== 'polar' ? (
          <div ref={mapContainerRef} className="absolute inset-0 w-full h-full z-0" />
        ) : (
          /* Tactical Polar Vector Projection Canvas (EPSG:3031 Fallback) */
          <div className="absolute inset-0 w-full h-full flex items-center justify-center p-2 bg-[#EAF4F9] overflow-hidden z-0">
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
                  transform={`translate(${toSvg(currentVessel.destX)}, ${toSvg(currentVessel.destY)})`}
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
                  vessel={currentVessel}
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

        {/* 2. Floating Map Controls (Top-Left Commands, Bottom-Right Zoom Dock) */}
        {!hideControls && (
          <MapControls
            layers={activeLayers}
            onToggleLayer={handleToggleLayer}
            zoomLevel={zoomLevel}
            onZoomIn={() => {
              if (mapInstanceRef.current && basemapMode !== 'polar') {
                mapInstanceRef.current.zoomIn();
              } else {
                setZoomLevel((z) => Math.min(2.0, z + 0.2));
              }
            }}
            onZoomOut={() => {
              if (mapInstanceRef.current && basemapMode !== 'polar') {
                mapInstanceRef.current.zoomOut();
              } else {
                setZoomLevel((z) => Math.max(0.8, z - 0.2));
              }
            }}
            onResetView={() => {
              if (mapInstanceRef.current && basemapMode !== 'polar') {
                mapInstanceRef.current.fitBounds([[-70.8, 54.0], [-59.5, 79.5]], { padding: [50, 50] });
              } else {
                setZoomLevel(1);
              }
            }}
            onCenterVessel={() => {
              if (mapInstanceRef.current && basemapMode !== 'polar') {
                mapInstanceRef.current.flyTo([currentVessel.lat, currentVessel.lng], 6, { duration: 1.2 });
              } else {
                setZoomLevel(1.4);
              }
              setHudMessage(`Centered on ${currentVessel.name} [${Math.abs(currentVessel.lat).toFixed(2)}°S, ${currentVessel.lng.toFixed(2)}°E]`);
            }}
            engineMode={basemapMode !== 'polar' ? 'mapbox' : 'tactical-fallback'}
            basemapMode={basemapMode}
            onSelectBasemap={(mode) => setBasemapMode(mode)}
            isMeasuring={isMeasuring}
            onToggleMeasure={() => {
              setIsMeasuring(!isMeasuring);
              if (!isMeasuring) {
                setHudMessage('Distance Ruler Active: Click two points on chart to measure distance (NM) & bearing (°T)');
              } else {
                setHudMessage(null);
              }
            }}
            isSimulating={isSimulating}
            onToggleSimulation={() => {
              setIsSimulating(!isSimulating);
              setHudMessage(!isSimulating ? 'Live voyage simulation started' : 'Simulation paused');
            }}
            simulationSpeed={simulationSpeed}
            onChangeSimulationSpeed={(spd) => {
              setSimulationSpeed(spd);
              setHudMessage(`Simulation speed set to ${spd}x`);
            }}
            onResetSimulation={handleResetSimulation}
          />
        )}

        {/* 3. Top-Right Floating Telemetry Badges */}
        <div className="absolute top-3 right-3 z-30 hidden sm:flex items-center gap-2 pointer-events-auto select-none">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#e0e0e0] shadow-md text-[11px] font-mono font-semibold text-[#1d1d1f]">
            <Crosshair className="w-3.5 h-3.5 text-[#0066cc]" />
            <span>POS: {Math.abs(currentVessel.lat).toFixed(2)}°S, {currentVessel.lng.toFixed(2)}°E</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50/95 backdrop-blur-md border border-emerald-200 shadow-md text-emerald-800 text-[11px] font-mono font-semibold">
            <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
            <span>RADAR: 48 NM ACTIVE</span>
          </div>
        </div>

        {/* 4. Bottom-Left Map Legend Overlay */}
        <div className="absolute bottom-11 left-3 z-30 pointer-events-auto">
          <MapLegend />
        </div>

        {/* 5. HUD Interactive Notification Bar */}
        {hudMessage && (
          <div className="absolute top-14 right-3 z-40 px-3.5 py-2 rounded-xl bg-white border border-[#e0e0e0] text-xs font-mono text-[#1d1d1f] shadow-xl flex items-center justify-between gap-3 max-w-sm pointer-events-auto animate-in fade-in">
            <div className="flex items-center gap-2 min-w-0">
              <Crosshair className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="font-bold truncate">{hudMessage}</span>
            </div>
            <button
              onClick={() => setHudMessage(null)}
              className="text-neutral-400 hover:text-[#1d1d1f] font-bold text-xs cursor-pointer shrink-0"
            >
              ✕
            </button>
          </div>
        )}

        {/* 6. Distance Measurement Floating Results Card */}
        {isMeasuring && measureResult && (
          <div className="absolute top-14 right-3 z-40 w-72 rounded-2xl bg-white/95 backdrop-blur-md border border-[#0066cc]/40 shadow-2xl p-3.5 space-y-2 pointer-events-auto animate-in fade-in">
            <div className="flex items-center justify-between pb-1.5 border-b border-[#f0f0f0]">
              <div className="flex items-center gap-2 text-[#0066cc] font-semibold text-xs">
                <Ruler className="w-3.5 h-3.5" />
                <span>Ruler Geodesic Measurement</span>
              </div>
              <button
                onClick={() => {
                  setMeasurePoints([]);
                  setMeasureResult(null);
                }}
                className="text-[10px] text-neutral-400 hover:text-[#1d1d1f] font-mono"
              >
                Clear
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
              <div className="p-2 rounded-xl bg-[#f5f5f7] border border-[#e0e0e0]">
                <span className="text-[9px] text-neutral-500 block">DISTANCE</span>
                <span className="font-bold text-[#0066cc] text-[13px]">{measureResult.distanceNm} NM</span>
              </div>
              <div className="p-2 rounded-xl bg-[#f5f5f7] border border-[#e0e0e0]">
                <span className="text-[9px] text-neutral-500 block">BEARING</span>
                <span className="font-bold text-[#1d1d1f] text-[13px]">{measureResult.bearingDeg}°T</span>
              </div>
              <div className="p-2 rounded-xl bg-[#f5f5f7] border border-[#e0e0e0]">
                <span className="text-[9px] text-neutral-500 block">EST. TIME</span>
                <span className="font-bold text-emerald-700 text-[13px]">{measureResult.transitTimeHours}h</span>
              </div>
            </div>
            <p className="text-[10px] text-neutral-500 text-center font-mono">
              Transit calculated at {currentVessel.speedKts} kts SOG
            </p>
          </div>
        )}

        {/* 7. Selected Iceberg Inspection Flyout Modal */}
        {selectedIceberg && (
          <div className="absolute bottom-12 right-14 z-40 w-80 sm:w-96 max-h-[calc(100%-60px)] overflow-y-auto rounded-2xl bg-white/95 backdrop-blur-md border border-[#e0e0e0] shadow-2xl p-4 space-y-3 pointer-events-auto animate-in fade-in slide-in-from-bottom-2">
            <div className="sticky top-0 bg-white/95 backdrop-blur-xs z-10 flex items-start justify-between pb-2 border-b border-[#f0f0f0]">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-[#f5f5f7] border border-[#e0e0e0] text-[#1d1d1f]">
                  <Mountain className="w-4 h-4 text-amber-500" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#1d1d1f] font-mono">
                    {selectedIceberg.name}
                  </h4>
                  <span className="text-[10px] text-neutral-500 font-mono font-normal">
                    CODE: {selectedIceberg.code} | {selectedIceberg.detectionSource}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSelectedIceberg(null)}
                className="flex items-center gap-1 px-2 py-1 rounded-lg bg-[#f5f5f7] hover:bg-[#e0e0e0] text-[#1d1d1f] text-[11px] font-semibold transition-colors cursor-pointer"
                title="Close Inspector (or press Esc / click map)"
              >
                <X className="w-3.5 h-3.5" />
                <span>Close</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
              <div className="p-2 rounded-xl bg-[#f5f5f7] border border-[#e0e0e0]">
                <span className="text-neutral-500 text-[10px] block font-normal">POSITION</span>
                <span className="text-[#1d1d1f] font-bold">
                  {Math.abs(selectedIceberg.lat).toFixed(2)}°S, {selectedIceberg.lng.toFixed(2)}°E
                </span>
              </div>

              <div className="p-2 rounded-xl bg-[#f5f5f7] border border-[#e0e0e0]">
                <span className="text-neutral-500 text-[10px] block font-normal">THREAT LEVEL</span>
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

              <div className="p-2 rounded-xl bg-[#f5f5f7] border border-[#e0e0e0]">
                <span className="text-neutral-500 text-[10px] block font-normal">SIZE & AREA</span>
                <span className="text-[#1d1d1f] font-bold">
                  {selectedIceberg.sizeClass} ({selectedIceberg.areaKm2} km²)
                </span>
              </div>

              <div className="p-2 rounded-xl bg-[#f5f5f7] border border-[#e0e0e0]">
                <span className="text-neutral-500 text-[10px] block font-normal">THICKNESS / DRAFT</span>
                <span className="text-[#1d1d1f] font-bold">
                  {selectedIceberg.thicknessM}m ({selectedIceberg.draftM ?? 180}m draft)
                </span>
              </div>

              <div className="p-2 rounded-xl bg-[#f5f5f7] border border-[#e0e0e0]">
                <span className="text-neutral-500 text-[10px] block font-normal">DRIFT VECTOR</span>
                <span className="text-[#1d1d1f] font-bold">
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

        {/* 8. Selected AIS Target Vessel Inspection Modal */}
        {selectedAisVessel && (
          <div className="absolute bottom-12 right-14 z-40 w-80 sm:w-96 max-h-[calc(100%-60px)] overflow-y-auto rounded-2xl bg-white/95 backdrop-blur-md border border-[#e0e0e0] shadow-2xl p-4 space-y-3 pointer-events-auto animate-in fade-in slide-in-from-bottom-2">
            <div className="sticky top-0 bg-white/95 backdrop-blur-xs z-10 flex items-start justify-between pb-2 border-b border-[#f0f0f0]">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-700">
                  <Ship className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#1d1d1f] font-mono">
                    {selectedAisVessel.name} ({selectedAisVessel.flag})
                  </h4>
                  <span className="text-[10px] text-neutral-500 font-mono">
                    MMSI: {selectedAisVessel.mmsi} | CALL: {selectedAisVessel.callSign}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSelectedAisVessel(null)}
                className="flex items-center gap-1 px-2 py-1 rounded-lg bg-[#f5f5f7] hover:bg-[#e0e0e0] text-[#1d1d1f] text-[11px] font-semibold transition-colors cursor-pointer"
                title="Close Inspector (or press Esc / click map)"
              >
                <X className="w-3.5 h-3.5" />
                <span>Close</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
              <div className="p-2 rounded-xl bg-[#f5f5f7] border border-[#e0e0e0]">
                <span className="text-neutral-500 text-[10px] block">POSITION</span>
                <span className="text-[#1d1d1f] font-bold">
                  {Math.abs(selectedAisVessel.lat).toFixed(2)}°S, {selectedAisVessel.lng.toFixed(2)}°E
                </span>
              </div>

              <div className="p-2 rounded-xl bg-[#f5f5f7] border border-[#e0e0e0]">
                <span className="text-neutral-500 text-[10px] block">ICE CLASS</span>
                <span className="text-[#0066cc] font-bold">{selectedAisVessel.iceClass}</span>
              </div>

              <div className="p-2 rounded-xl bg-[#f5f5f7] border border-[#e0e0e0]">
                <span className="text-neutral-500 text-[10px] block">SOG & COG</span>
                <span className="text-[#1d1d1f] font-bold">
                  {selectedAisVessel.speedKts} kts @ {selectedAisVessel.headingDeg}°
                </span>
              </div>

              <div className="p-2 rounded-xl bg-[#f5f5f7] border border-[#e0e0e0]">
                <span className="text-neutral-500 text-[10px] block">CPA / TCPA</span>
                <span className="text-emerald-700 font-bold">
                  {selectedAisVessel.cpaNm} NM ({selectedAisVessel.tcpaHours}h)
                </span>
              </div>
            </div>

            <div className="text-[11px] font-mono text-neutral-600 bg-[#f5f5f7] p-2 rounded-xl border border-[#e0e0e0]">
              <div>Dest: <span className="font-semibold text-[#1d1d1f]">{selectedAisVessel.destination}</span></div>
              <div className="text-[10px] text-neutral-500">Status: {selectedAisVessel.status}</div>
            </div>
          </div>
        )}

        {/* 9. Selected Antarctic Station Inspection Modal */}
        {selectedStation && (
          <div className="absolute bottom-12 right-14 z-40 w-80 sm:w-96 max-h-[calc(100%-60px)] overflow-y-auto rounded-2xl bg-white/95 backdrop-blur-md border border-[#e0e0e0] shadow-2xl p-4 space-y-3 pointer-events-auto animate-in fade-in slide-in-from-bottom-2">
            <div className="sticky top-0 bg-white/95 backdrop-blur-xs z-10 flex items-start justify-between pb-2 border-b border-[#f0f0f0]">
              <div className="flex items-center gap-2">
                <span className="text-xl">{selectedStation.flag}</span>
                <div>
                  <h4 className="text-xs font-bold text-[#1d1d1f] font-mono">
                    {selectedStation.name} [{selectedStation.country}]
                  </h4>
                  <span className="text-[10px] text-neutral-500 font-mono">
                    {selectedStation.type}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSelectedStation(null)}
                className="flex items-center gap-1 px-2 py-1 rounded-lg bg-[#f5f5f7] hover:bg-[#e0e0e0] text-[#1d1d1f] text-[11px] font-semibold transition-colors cursor-pointer"
                title="Close Inspector (or press Esc / click map)"
              >
                <X className="w-3.5 h-3.5" />
                <span>Close</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
              <div className="p-2 rounded-xl bg-[#f5f5f7] border border-[#e0e0e0]">
                <span className="text-neutral-500 text-[10px] block">COORDINATES</span>
                <span className="text-[#1d1d1f] font-bold">
                  {Math.abs(selectedStation.lat).toFixed(2)}°S, {selectedStation.lng.toFixed(2)}°E
                </span>
              </div>

              <div className="p-2 rounded-xl bg-[#f5f5f7] border border-[#e0e0e0]">
                <span className="text-neutral-500 text-[10px] block">STATION WEATHER</span>
                <span className="text-[#0066cc] font-bold">
                  {selectedStation.temperatureC}°C, {selectedStation.windKts} kts
                </span>
              </div>

              <div className="p-2 rounded-xl bg-[#f5f5f7] border border-[#e0e0e0]">
                <span className="text-neutral-500 text-[10px] block">VHF RADIO</span>
                <span className="text-[#1d1d1f] font-bold">{selectedStation.radioChannel}</span>
              </div>

              <div className="p-2 rounded-xl bg-[#f5f5f7] border border-[#e0e0e0]">
                <span className="text-neutral-500 text-[10px] block">HF CALLING</span>
                <span className="text-[#1d1d1f] font-bold">{selectedStation.hfFrequencyKhz}</span>
              </div>
            </div>

            <div className="text-[11px] font-mono text-neutral-600 bg-[#f5f5f7] p-2 rounded-xl border border-[#e0e0e0]">
              Runway: <span className="font-semibold text-[#1d1d1f]">{selectedStation.runway}</span>
            </div>
          </div>
        )}

        {/* 10. Selected Navigational Aid Modal */}
        {selectedNavAid && (
          <div className="absolute bottom-12 right-14 z-40 w-80 rounded-2xl bg-white border border-[#e0e0e0] shadow-2xl p-4 space-y-2.5 pointer-events-auto animate-in fade-in slide-in-from-bottom-2">
            <div className="sticky top-0 bg-white/95 backdrop-blur-xs z-10 flex items-start justify-between pb-2 border-b border-[#f0f0f0]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <h4 className="text-xs font-bold text-[#1d1d1f] font-mono">
                  {selectedNavAid.name}
                </h4>
              </div>
              <button
                onClick={() => setSelectedNavAid(null)}
                className="flex items-center gap-1 px-2 py-1 rounded-lg bg-[#f5f5f7] hover:bg-[#e0e0e0] text-[#1d1d1f] text-[11px] font-semibold transition-colors cursor-pointer"
                title="Close Inspector (or press Esc / click map)"
              >
                <X className="w-3.5 h-3.5" />
                <span>Close</span>
              </button>
            </div>

            <div className="space-y-1 text-[11px] font-mono">
              <div className="flex justify-between">
                <span className="text-neutral-500">Type:</span>
                <span className="font-semibold">{selectedNavAid.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Light Characteristic:</span>
                <span className="font-semibold text-amber-700">{selectedNavAid.lightCharacter}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Nominal Range:</span>
                <span className="font-semibold">{selectedNavAid.nominalRangeNm} NM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Status:</span>
                <span className="font-semibold text-emerald-700">{selectedNavAid.status}</span>
              </div>
            </div>
          </div>
        )}

        {/* 11. Selected Risk Zone Modal */}
        {selectedZone && (
          <div className="absolute bottom-12 right-14 z-40 w-80 rounded-[18px] bg-white border border-[#e0e0e0] shadow-xl p-4 space-y-2.5 pointer-events-auto animate-in fade-in slide-in-from-bottom-2">
            <div className="sticky top-0 bg-white/95 backdrop-blur-xs z-10 flex items-start justify-between pb-2 border-b border-[#f0f0f0]">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <h4 className="text-[13px] font-semibold text-[#1d1d1f] font-mono">
                  {selectedZone.name}
                </h4>
              </div>
              <button
                onClick={() => setSelectedZone(null)}
                className="flex items-center gap-1 px-2 py-1 rounded-lg bg-[#f5f5f7] hover:bg-[#e0e0e0] text-[#1d1d1f] text-[11px] font-semibold transition-colors cursor-pointer"
                title="Close Inspector (or press Esc / click map)"
              >
                <X className="w-3.5 h-3.5" />
                <span>Close</span>
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

        {/* 12. Flagship Vessel Detail Modal */}
        {selectedVesselDetail && (
          <div className="absolute bottom-12 right-14 z-40 w-80 sm:w-96 max-h-[calc(100%-60px)] overflow-y-auto rounded-2xl bg-white border border-[#e0e0e0] shadow-2xl p-4 space-y-3 pointer-events-auto animate-in fade-in slide-in-from-bottom-2">
            <div className="sticky top-0 bg-white/95 backdrop-blur-xs z-10 flex items-start justify-between pb-2 border-b border-[#f0f0f0]">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700">
                  <Ship className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#1d1d1f] font-mono">
                    {selectedVesselDetail.name}
                  </h4>
                  <span className="text-[10px] text-neutral-500 font-mono">
                    MMSI: {selectedVesselDetail.mmsi || '419001420'} | CALL: {selectedVesselDetail.callSign || 'VUWS'}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSelectedVesselDetail(null)}
                className="flex items-center gap-1 px-2 py-1 rounded-lg bg-[#f5f5f7] hover:bg-[#e0e0e0] text-[#1d1d1f] text-[11px] font-semibold transition-colors cursor-pointer"
                title="Close Inspector (or press Esc / click map)"
              >
                <X className="w-3.5 h-3.5" />
                <span>Close</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
              <div className="p-2 rounded-xl bg-[#f5f5f7] border border-[#e0e0e0]">
                <span className="text-neutral-500 text-[10px] block">POSITION</span>
                <span className="text-[#1d1d1f] font-bold">
                  {Math.abs(selectedVesselDetail.lat).toFixed(3)}°S, {selectedVesselDetail.lng.toFixed(3)}°E
                </span>
              </div>

              <div className="p-2 rounded-xl bg-[#f5f5f7] border border-[#e0e0e0]">
                <span className="text-neutral-500 text-[10px] block">SPEED & HEADING</span>
                <span className="text-emerald-700 font-bold">
                  {selectedVesselDetail.speedKts} kts @ {selectedVesselDetail.headingDeg}°T
                </span>
              </div>

              <div className="p-2 rounded-xl bg-[#f5f5f7] border border-[#e0e0e0]">
                <span className="text-neutral-500 text-[10px] block">UNDER KEEL (UKC)</span>
                <span className="text-[#0066cc] font-bold">
                  {selectedVesselDetail.depthUnderKeelM ?? 42.5}m Sounding
                </span>
              </div>

              <div className="p-2 rounded-xl bg-[#f5f5f7] border border-[#e0e0e0]">
                <span className="text-neutral-500 text-[10px] block">POLAR RIO INDEX</span>
                <span className="text-emerald-700 font-bold">+14 (NOMINAL PC3)</span>
              </div>
            </div>

            <div className="text-[11px] font-mono text-neutral-600 bg-[#f5f5f7] p-2 rounded-xl border border-[#e0e0e0]">
              Destination: <span className="font-semibold text-[#1d1d1f]">{selectedVesselDetail.destination}</span>
            </div>
          </div>
        )}
      </div>

      {/* 13. Bottom Map HUD Footer Bar */}
      <div className="h-8 px-4 bg-white/95 backdrop-blur-xs border-t border-[#e0e0e0] flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-neutral-600 shrink-0 z-20">
        <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span className="font-semibold text-[#1d1d1f]">IMO POLAR CODE: PC3 CERTIFIED</span>
          </div>
          <div className="hidden md:flex items-center gap-1.5 text-neutral-400">
            <span>&bull;</span>
            <Zap className="w-3 h-3 text-[#0066cc]" />
            <span className="text-neutral-700 font-normal">AI CORRIDOR: 418 NM &bull; 94% SAFETY</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-neutral-500 text-[10px] font-normal">
          <span className="text-emerald-700 font-semibold">
            ENGINE: {basemapMode === 'openseamap' ? 'OPENSEAMAP NAUTICAL' : basemapMode === 'esriOcean' ? 'ESRI OCEAN FLOOR' : basemapMode === 'osm' ? 'OPENSTREETMAP MARINE' : 'POLAR STEREOGRAPHIC HUD'}
          </span>
          <span>&bull;</span>
          <span>DATUM: WGS84</span>
        </div>
      </div>
    </div>
  );
};

export default AntarcticMap;

