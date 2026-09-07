import React, { useState, useEffect, useRef } from 'react';
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
import { MapControls } from './MapControls';
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
  const [engineMode, setEngineMode] = useState<'mapbox' | 'tactical-fallback'>('tactical-fallback');
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

  // 1. Attempt Mapbox GL initialization if token is available
  useEffect(() => {
    const token = import.meta.env.VITE_MAPBOX_TOKEN;

    if (token && mapContainerRef.current) {
      try {
        mapboxgl.accessToken = token;
        const map = new mapboxgl.Map({
          container: mapContainerRef.current,
          style: 'mapbox://styles/mapbox/dark-v11',
          center: [VESSEL_STATE_DATA.lng, VESSEL_STATE_DATA.lat],
          zoom: 3.5,
          projection: { name: 'polar' } as unknown as mapboxgl.Projection,
        });

        map.on('load', () => {
          setEngineMode('mapbox');
        });

        map.on('error', () => {
          setEngineMode('tactical-fallback');
        });

        return () => map.remove();
      } catch {
        setEngineMode('tactical-fallback');
      }
    } else {
      setEngineMode('tactical-fallback');
    }
  }, []);

  const toSvg = (pct: number) => pct * 10;
  const vessel = customVessel || VESSEL_STATE_DATA;
  const seaIceTiers = customSeaIce || SEA_ICE_LAYERS_DATA;
  const riskZones = customRiskZones || RISK_ZONES_DATA;
  const icebergs = customIcebergs || ICEBERGS_DATA;

  return (
    <div className={`polar-panel relative flex flex-col ${heightClass} overflow-hidden border-polar-700/80 bg-polar-950`}>
      {/* 1. Tactical HUD Header */}
      <div className="absolute top-0 inset-x-0 z-20 flex items-center justify-between px-4 py-2.5 bg-polar-900/90 border-b border-polar-700/60 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-200">
            <Compass className="w-4 h-4 text-ice-400" />
            <span>ANTARCTIC HIGH-LATITUDE MARITIME CHART</span>
          </div>
          <span className="hidden sm:inline-flex px-2 py-0.5 rounded text-[10px] font-mono bg-ice-500/10 text-ice-300 border border-ice-500/20">
            PROJECTION: POLAR STEREOGRAPHIC EPSG:3031
          </span>
        </div>

        {/* Telemetry Status Right */}
        <div className="flex items-center gap-2 sm:gap-3 text-[11px] font-mono">
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-polar-950/80 border border-polar-700/50 text-slate-300">
            <Crosshair className="w-3.5 h-3.5 text-cyan-400" />
            <span>
              POS: {Math.abs(vessel.lat).toFixed(2)}°S, {vessel.lng.toFixed(2)}°E
            </span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <Radio className="w-3 h-3 animate-pulse" />
            <span>RADAR: 48 NM ACTIVE</span>
          </div>
        </div>
      </div>

      {/* 2. Top Left Layer Controls Bar */}
      {!hideControls && (
        <div className="absolute top-14 left-4 z-20">
          <MapControls
            layers={activeLayers}
            onToggleLayer={handleToggleLayer}
            zoomLevel={zoomLevel}
            onZoomIn={() => setZoomLevel((z) => Math.min(2.0, z + 0.2))}
            onZoomOut={() => setZoomLevel((z) => Math.max(0.8, z - 0.2))}
            onResetView={() => setZoomLevel(1)}
            onCenterVessel={() => {
              setZoomLevel(1.4);
              setHudMessage('Centered on R/V Polar Sentinel [68.45°S, 67.80°E]');
            }}
            engineMode={engineMode}
          />
        </div>
      )}

      {/* 3. Bottom Left Legend */}
      <div className="absolute bottom-12 left-4 z-20">
        <MapLegend />
      </div>

      {/* 4. Map Container: Mapbox GL or Polar Fallback Canvas */}
      <div className="flex-1 w-full h-full relative flex items-center justify-center p-2 bg-[#040810] overflow-hidden">
        {/* Hidden Mapbox Container (used if token is valid) */}
        {engineMode === 'mapbox' && (
          <div ref={mapContainerRef} className="absolute inset-0 w-full h-full" />
        )}

        {/* Tactical Polar Vector Projection Canvas */}
        <div
          className="w-full h-full flex items-center justify-center transition-transform duration-300 select-none"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          <svg viewBox="0 0 1000 1000" className="w-full h-full object-contain">
            <defs>
              {/* Radial Ocean Radar Shader */}
              <radialGradient id="polarRadarGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#0A182D" stopOpacity="0.85" />
                <stop offset="65%" stopColor="#06101E" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#03070E" stopOpacity="1" />
              </radialGradient>

              {/* Pack Ice Pattern */}
              <pattern id="packIceGrid" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M0 15 L15 0 L30 15 L15 30 Z" fill="none" stroke="#38BDF8" strokeWidth="0.5" strokeOpacity="0.25" />
              </pattern>
            </defs>

            {/* Ocean Base */}
            <rect width="1000" height="1000" fill="url(#polarRadarGlow)" />

            {/* Polar Coordinate Grid & Latitude Concentrics */}
            <g stroke="#1E385B" strokeWidth="1" strokeDasharray="4,4" opacity="0.5">
              <circle cx="500" cy="500" r="440" fill="none" />
              <circle cx="500" cy="500" r="320" fill="none" />
              <circle cx="500" cy="500" r="200" fill="none" />
              <circle cx="500" cy="500" r="80" fill="none" />
              <line x1="500" y1="60" x2="500" y2="940" />
              <line x1="60" y1="500" x2="940" y2="500" />
            </g>

            {/* Grid Text Labels */}
            <g fill="#476999" fontSize="10" fontFamily="monospace" textAnchor="middle">
              <text x="500" y="52">60°S (SOUTHERN OCEAN ENTRY)</text>
              <text x="500" y="172">68°S (POLAR PACK MARGIN)</text>
              <text x="500" y="292">75°S (AMERY / ICE SHELF)</text>
              <text x="500" y="505" fill="#38BDF8" fontWeight="bold">90°S SOUTH POLE</text>
              <text x="910" y="505">90°E</text>
              <text x="90" y="505">0°E</text>
            </g>

            {/* Antarctic Landmass Silhouette */}
            <path
              d="M 500,260 
                 C 620,270 740,340 820,440 
                 C 890,530 870,680 780,780 
                 C 700,870 540,920 420,890 
                 C 310,860 210,770 170,640 
                 C 130,520 180,390 280,310 
                 C 360,250 440,255 500,260 Z"
              fill="#0F1F35"
              stroke="#2B4D78"
              strokeWidth="2.5"
            />

            {/* Amery Ice Shelf & Prydz Bay Detail */}
            <path
              d="M 680,620 C 720,600 780,640 800,720 C 760,740 710,710 680,620 Z"
              fill="#162E4E"
              stroke="#38BDF8"
              strokeWidth="1.5"
              strokeDasharray="2,2"
            />
            <text x="760" y="650" fill="#7DD3FC" fontSize="10" fontFamily="monospace">
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
                routes={customRoutes || ROUTE_PATHS_DATA}
                selectedRouteId={selectedRouteId}
                onSelectRoute={onSelectRoute}
                toSvg={toSvg}
                onSelectWaypoint={(wpInfo) => setHudMessage(wpInfo)}
              />
            )}

            {/* Custom Dynamic Simulation Overlay (Hazard markers / animations) */}
            {customOverlay}

            {/* Destination Marker: Bharati Station */}
            <g
              transform={`translate(${toSvg(vessel.destX)}, ${toSvg(vessel.destY)})`}
              className="cursor-pointer"
              onClick={() =>
                setHudMessage('Destination: Bharati Station (Larsemann Hills) [69.41°S, 76.19°E]')
              }
            >
              <circle
                cx="0"
                cy="0"
                r="16"
                fill="rgba(16, 185, 129, 0.2)"
                stroke="#10B981"
                strokeWidth="1.5"
              />
              <circle cx="0" cy="0" r="5" fill="#10B981" />
              <text
                x="14"
                y="4"
                fill="#34D399"
                fontSize="11"
                fontFamily="monospace"
                fontWeight="bold"
              >
                BHARATI STATION [DEST]
              </text>
            </g>

            {/* Start Beacon: Southern Ocean Corridor */}
            <g
              transform={`translate(${toSvg(22)}, ${toSvg(18)})`}
              className="cursor-pointer"
              onClick={() => setHudMessage('Voyage Origin: Southern Ocean Polar Entry [60.10°S, 58.20°E]')}
            >
              <circle cx="0" cy="0" r="10" fill="rgba(56, 189, 248, 0.2)" stroke="#38BDF8" strokeWidth="1" />
              <circle cx="0" cy="0" r="3" fill="#38BDF8" />
              <text x="12" y="3" fill="#93C5FD" fontSize="9" fontFamily="monospace">
                VOYAGE START (60°S)
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

      {/* 5. HUD Interactive Notification Bar */}
      {hudMessage && (
        <div className="absolute top-14 right-4 z-20 px-3 py-2 rounded-lg bg-polar-900/95 border border-polar-700/80 text-xs font-mono text-slate-200 shadow-xl flex items-center justify-between gap-3 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <Crosshair className="w-3.5 h-3.5 text-ice-400" />
            <span>{hudMessage}</span>
          </div>
          <button
            onClick={() => setHudMessage(null)}
            className="text-slate-400 hover:text-slate-100 font-bold text-xs"
          >
            ✕
          </button>
        </div>
      )}

      {/* 6. Selected Iceberg Inspection Flyout Modal */}
      {selectedIceberg && (
        <div className="absolute top-14 right-4 z-30 w-80 sm:w-96 rounded-lg bg-polar-900/95 border border-polar-700 shadow-2xl p-4 backdrop-blur-md space-y-3">
          <div className="flex items-start justify-between pb-2 border-b border-polar-700/60">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400">
                <Mountain className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-100 font-mono">
                  {selectedIceberg.name}
                </h4>
                <span className="text-[10px] text-slate-400 font-mono">
                  CODE: {selectedIceberg.code} | {selectedIceberg.detectionSource}
                </span>
              </div>
            </div>

            <button
              onClick={() => setSelectedIceberg(null)}
              className="p-1 text-slate-400 hover:text-slate-100 rounded hover:bg-polar-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
            <div className="p-2 rounded bg-polar-950/80 border border-polar-700/40">
              <span className="text-slate-400 text-[10px] block">POSITION</span>
              <span className="text-slate-200 font-bold">
                {Math.abs(selectedIceberg.lat).toFixed(2)}°S, {selectedIceberg.lng.toFixed(2)}°E
              </span>
            </div>

            <div className="p-2 rounded bg-polar-950/80 border border-polar-700/40">
              <span className="text-slate-400 text-[10px] block">THREAT LEVEL</span>
              <span
                className={`font-bold uppercase ${
                  selectedIceberg.riskLevel === 'critical'
                    ? 'text-rose-400'
                    : selectedIceberg.riskLevel === 'warning' || selectedIceberg.riskLevel === 'high'
                    ? 'text-amber-400'
                    : 'text-emerald-400'
                }`}
              >
                {selectedIceberg.riskLevel}
              </span>
            </div>

            <div className="p-2 rounded bg-polar-950/80 border border-polar-700/40">
              <span className="text-slate-400 text-[10px] block">SIZE & AREA</span>
              <span className="text-slate-200 font-bold">
                {selectedIceberg.sizeClass} ({selectedIceberg.areaKm2} km²)
              </span>
            </div>

            <div className="p-2 rounded bg-polar-950/80 border border-polar-700/40">
              <span className="text-slate-400 text-[10px] block">THICKNESS / DRAFT</span>
              <span className="text-slate-200 font-bold">
                {selectedIceberg.thicknessM} m
              </span>
            </div>

            <div className="p-2 rounded bg-polar-950/80 border border-polar-700/40">
              <span className="text-slate-400 text-[10px] block">DRIFT VECTOR</span>
              <span className="text-cyan-300 font-bold">
                {selectedIceberg.driftSpeedKts} kts @ {selectedIceberg.driftDirectionDeg}°
              </span>
            </div>

            <div className="p-2 rounded bg-polar-950/80 border border-polar-700/40">
              <span className="text-slate-400 text-[10px] block">CLOSEST APPROACH</span>
              <span className="text-amber-300 font-bold">
                {selectedIceberg.closestApproachNm} NM
              </span>
            </div>
          </div>

          {selectedIceberg.nearestStation && (
            <div className="text-[10px] font-mono text-slate-400 px-1">
              Nearest Station: <span className="text-slate-200">{selectedIceberg.nearestStation}</span>
            </div>
          )}

          <div className="flex items-center gap-2 pt-1 border-t border-polar-700/40">
            <button
              onClick={() => {
                setHudMessage(`Proximity radar tracker locked on ${selectedIceberg.code}`);
                setSelectedIceberg(null);
              }}
              className="flex-1 py-1.5 rounded bg-polar-800 hover:bg-polar-750 text-ice-300 border border-polar-700 text-[10px] font-mono flex items-center justify-center gap-1.5"
            >
              <Radar className="w-3 h-3 text-ice-400" />
              Lock Collision Radar
            </button>
          </div>
        </div>
      )}

      {/* 7. Selected Risk Zone Inspection Modal */}
      {selectedZone && (
        <div className="absolute top-14 right-4 z-30 w-80 rounded-lg bg-polar-900/95 border border-polar-700 shadow-2xl p-4 backdrop-blur-md space-y-2.5">
          <div className="flex items-start justify-between pb-2 border-b border-polar-700/60">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <h4 className="text-xs font-bold text-slate-100 font-mono">
                {selectedZone.name}
              </h4>
            </div>
            <button
              onClick={() => setSelectedZone(null)}
              className="p-1 text-slate-400 hover:text-slate-100"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-1.5 text-xs font-mono">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Risk Severity:</span>
              <span className="font-bold text-rose-400">{selectedZone.tier}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Calculated RIO:</span>
              <span className="font-bold text-slate-200">{selectedZone.riskScore} / 100</span>
            </div>
            <p className="text-[11px] text-slate-300 font-sans leading-relaxed pt-1">
              {selectedZone.description}
            </p>
          </div>
        </div>
      )}

      {/* 8. Bottom Map HUD Footer Bar */}
      <div className="absolute bottom-0 inset-x-0 z-20 flex flex-wrap items-center justify-between gap-2 px-4 py-2 bg-polar-900/90 border-t border-polar-700/60 backdrop-blur-md text-[11px] font-mono text-slate-300">
        <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>IMO POLAR CODE: PC3 CERTIFIED</span>
          </div>
          <div className="hidden md:flex items-center gap-1.5 text-slate-400">
            <span>|</span>
            <Zap className="w-3 h-3 text-ice-400" />
            <span>AI WAYPOINT RE-EVALUATION: NOMINAL</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-slate-400 text-[10px]">
          <span>SCALE: 1:2,500,000</span>
          <span>|</span>
          <span>DATUM: WGS84</span>
        </div>
      </div>
    </div>
  );
};
