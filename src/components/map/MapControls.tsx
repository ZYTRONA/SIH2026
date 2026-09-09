import React, { useState, useRef, useEffect } from 'react';
import {
  Layers,
  Snowflake,
  Mountain,
  ShieldAlert,
  CloudRain,
  Compass,
  Anchor,
  Route,
  Plus,
  Minus,
  Maximize2,
  Crosshair,
  Check,
  ChevronDown,
  Navigation,
  Map as MapIcon,
  Radio,
  Ship,
  MapPin,
  Ruler,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapLayerVisibility } from '@/types/map';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export type BasemapMode = 'voyager' | 'openseamap' | 'esriOcean' | 'satellite' | 'polar' | 'osm';

export interface MapControlsProps {
  layers: MapLayerVisibility;
  onToggleLayer: (layerKey: keyof MapLayerVisibility) => void;
  zoomLevel: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetView: () => void;
  onCenterVessel: () => void;
  engineMode?: 'mapbox' | 'tactical-fallback';
  basemapMode?: BasemapMode;
  onSelectBasemap?: (mode: BasemapMode) => void;
  isMeasuring?: boolean;
  onToggleMeasure?: () => void;
  isSimulating?: boolean;
  onToggleSimulation?: () => void;
  simulationSpeed?: 1 | 5 | 20;
  onChangeSimulationSpeed?: (speed: 1 | 5 | 20) => void;
  onResetSimulation?: () => void;
  vesselLat?: number;
  vesselLng?: number;
  vesselSpeedKts?: number;
  vesselHeadingDeg?: number;
  vesselName?: string;
  onFocusIcebergs?: () => void;
  icebergsCount?: number;
  criticalIcebergsCount?: number;
}

export const MapControls: React.FC<MapControlsProps> = ({
  layers,
  onToggleLayer,
  zoomLevel,
  onZoomIn,
  onZoomOut,
  onResetView,
  onCenterVessel,
  basemapMode = 'voyager',
  onSelectBasemap,
  isMeasuring = false,
  onToggleMeasure,
  isSimulating = false,
  onToggleSimulation,
  simulationSpeed = 5,
  onChangeSimulationSpeed,
  onResetSimulation,
  vesselLat,
  vesselLng,
  vesselSpeedKts,
  vesselHeadingDeg,
  vesselName,
  onFocusIcebergs,
  icebergsCount = 37,
  criticalIcebergsCount = 7,
}) => {
  const [basemapOpen, setBasemapOpen] = useState<boolean>(false);
  const [layersOpen, setLayersOpen] = useState<boolean>(false);

  const topControlsRef = useRef<HTMLDivElement>(null);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (topControlsRef.current && !topControlsRef.current.contains(e.target as Node)) {
        setBasemapOpen(false);
        setLayersOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const layerItems: Array<{
    key: keyof MapLayerVisibility;
    label: string;
    sublabel: string;
    icon: React.ElementType;
    color: string;
    badge?: string;
  }> = [
    {
      key: 'seaIce',
      label: 'Labrador & Greenland Sea Ice',
      sublabel: 'Sentinel-1 SAR 0–100% Concentration',
      icon: Snowflake,
      color: 'text-sky-600',
    },
    {
      key: 'icebergs',
      label: 'Atlantic Iceberg Targets',
      sublabel: '37 Tracked + 72h Drift Trajectories',
      icon: Mountain,
      color: 'text-amber-600',
      badge: '37 ACTIVE',
    },
    {
      key: 'risk',
      label: 'POLARIS RIO Hazard Zones',
      sublabel: 'Structural Limit & Ice Incursion Contours',
      icon: ShieldAlert,
      color: 'text-rose-600',
    },
    {
      key: 'routes',
      label: 'Pareto Navigation Corridors',
      sublabel: 'A* Multi-Objective Solvers',
      icon: Route,
      color: 'text-[#0066cc]',
      badge: 'AI SOLVER',
    },
    {
      key: 'aisTargets',
      label: 'AIS Marine Traffic',
      sublabel: '6 Atlantic Vessels & CPA Vectors',
      icon: Ship,
      color: 'text-blue-600',
      badge: '6 SHIPS',
    },
    {
      key: 'stations',
      label: 'Atlantic Ports & Research Bases',
      sublabel: '12 Scientific Stations & CCG Terminals',
      icon: MapPin,
      color: 'text-emerald-700',
      badge: '12 PORTS',
    },
    {
      key: 'navAids',
      label: 'Aids to Navigation (AtoN)',
      sublabel: 'Fairway Buoys, Lighthouses & AIS Virtual',
      icon: Sparkles,
      color: 'text-amber-700',
    },
    {
      key: 'oceanCurrents',
      label: 'Atlantic Ocean Currents',
      sublabel: 'Labrador Current & North Atlantic Drift',
      icon: Compass,
      color: 'text-emerald-600',
    },
    {
      key: 'bathymetry',
      label: 'Seabed Bathymetry',
      sublabel: 'Grand Banks & Flemish Pass Isobaths',
      icon: Anchor,
      color: 'text-indigo-600',
    },
    {
      key: 'weather',
      label: 'Wind & Swell Vectors',
      sublabel: 'NOAA GFS & Transatlantic Wave Vectors',
      icon: CloudRain,
      color: 'text-blue-500',
    },
  ];

  const basemaps: Array<{
    id: BasemapMode;
    name: string;
    subtitle: string;
    tag: string;
    icon: React.ElementType;
    isPrimary?: boolean;
  }> = [
    {
      id: 'voyager',
      name: 'Google-Style Marine Topo',
      subtitle: 'Crisp vector topographic basemap + OpenSeaMap nautical marks (No Watermark)',
      tag: 'GOOGLE-STYLE',
      icon: Navigation,
      isPrimary: true,
    },
    {
      id: 'esriOcean',
      name: 'ESRI Ocean Floor Bathymetry',
      subtitle: 'GEBCO & NOAA oceanic depth contours & continental shelf',
      tag: 'BATHYMETRY',
      icon: Anchor,
    },
    {
      id: 'satellite',
      name: 'Satellite True-Color Marine',
      subtitle: 'High-res true color imagery + OpenSeaMap fairway marks',
      tag: 'SATELLITE',
      icon: MapIcon,
    },
    {
      id: 'openseamap',
      name: 'OpenSeaMap Open Source',
      subtitle: 'OpenStreetMap + OpenSeaMap seamarks, lighthouses & buoys',
      tag: 'OPEN SEA',
      icon: Radio,
    },
    {
      id: 'polar',
      name: 'Tactical Radar HUD',
      subtitle: 'Polar stereographic radar sweep & ice lead scanner',
      tag: 'TACTICAL',
      icon: Sparkles,
    },
  ];

  const activeLayersCount = Object.values(layers).filter(Boolean).length;
  const currentBasemap = basemaps.find((b) => b.id === basemapMode) || basemaps[0];

  return (
    <TooltipProvider delayDuration={150}>
      {/* 1. Unified Top Command Toolbar (Left Action Pills + Right Telemetry) */}
      <div
        ref={topControlsRef}
        className="absolute top-3 left-3 right-3 z-30 flex items-center justify-between gap-2 pointer-events-none select-none"
      >
        {/* Left Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2 pointer-events-auto shrink-0">
        {/* Chart Engine Switcher Pill */}
        <div className="relative">
          <button
            onClick={() => {
              setBasemapOpen(!basemapOpen);
              if (!basemapOpen) {
                setLayersOpen(false);
              }
            }}
            className="flex items-center gap-2 h-9 px-3 rounded-full bg-white/95 backdrop-blur-md hover:bg-white text-[#1d1d1f] border border-[#e0e0e0] shadow-md transition-all active:scale-95 cursor-pointer group"
            title="Switch Nautical Chart Engine"
          >
            <div className="p-1 rounded-full bg-[#0066cc]/10 text-[#0066cc]">
              <currentBasemap.icon className="w-3.5 h-3.5" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[12px] font-semibold leading-none">{currentBasemap.name}</span>
              <span className="text-[9px] font-mono text-emerald-700 font-bold tracking-tight">
                {currentBasemap.tag}
              </span>
            </div>
            <ChevronDown
              className={`w-3.5 h-3.5 text-neutral-400 group-hover:text-[#1d1d1f] transition-transform ${
                basemapOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {/* Basemap Selection Popover */}
          <AnimatePresence>
            {basemapOpen && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.96 }}
                transition={{ duration: 0.15 }}
                className="absolute top-11 left-0 z-50 w-72 rounded-[18px] bg-white border border-[#e0e0e0] shadow-2xl p-2 space-y-1.5"
              >
                <div className="px-2.5 py-1.5 flex items-center justify-between border-b border-[#f0f0f0] text-[11px] font-mono text-neutral-500 font-semibold uppercase tracking-wider">
                  <span>Nautical Chart Engine</span>
                  <span className="text-emerald-700">WGS84 / EPSG</span>
                </div>

                <div className="space-y-1 pt-1">
                  {basemaps.map((bm) => {
                    const Icon = bm.icon;
                    const isSelected = basemapMode === bm.id;

                    return (
                      <button
                        key={bm.id}
                        onClick={() => {
                          if (onSelectBasemap) onSelectBasemap(bm.id);
                          setBasemapOpen(false);
                        }}
                        className={`w-full flex items-start gap-2.5 p-2.5 rounded-[12px] text-left transition-all cursor-pointer active:scale-95 ${
                          isSelected
                            ? 'bg-[#0066cc] text-white shadow-xs'
                            : 'bg-[#fafafc] hover:bg-[#f5f5f7] text-[#1d1d1f] border border-[#f0f0f0]'
                        }`}
                      >
                        <div
                          className={`p-1.5 rounded-lg mt-0.5 ${
                            isSelected
                              ? 'bg-white/20 text-white'
                              : 'bg-white border border-[#e0e0e0] text-[#0066cc]'
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[13px] font-semibold truncate">{bm.name}</span>
                            {bm.isPrimary && (
                              <span
                                className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold uppercase ${
                                  isSelected
                                    ? 'bg-white text-[#0066cc]'
                                    : 'bg-emerald-100 text-emerald-800'
                                }`}
                              >
                                RECOMMENDED
                              </span>
                            )}
                          </div>
                          <p
                            className={`text-[11px] leading-tight pt-0.5 ${
                              isSelected
                                ? 'text-white/80 font-normal'
                                : 'text-neutral-500 font-normal'
                            }`}
                          >
                            {bm.subtitle}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Telemetry Layers Pill */}
        <div className="relative">
          <button
            onClick={() => {
              setLayersOpen(!layersOpen);
              if (!layersOpen) {
                setBasemapOpen(false);
              }
            }}
            className="flex items-center gap-2 h-9 px-3 rounded-full bg-white/95 backdrop-blur-md hover:bg-white text-[#1d1d1f] border border-[#e0e0e0] shadow-md transition-all active:scale-95 cursor-pointer group"
            title="Configure Map Telemetry Layers"
          >
            <div className="p-1 rounded-full bg-emerald-500/10 text-emerald-600">
              <Layers className="w-3.5 h-3.5" />
            </div>
            <span className="text-[12px] font-semibold">Layers</span>
            <span className="px-2 py-0.5 rounded-full bg-[#f5f5f7] text-[#1d1d1f] border border-[#e0e0e0] text-[10px] font-mono font-bold">
              {activeLayersCount}/{layerItems.length}
            </span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-neutral-400 group-hover:text-[#1d1d1f] transition-transform ${
                layersOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {/* Telemetry Layers Drawer */}
          <AnimatePresence>
            {layersOpen && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.96 }}
                transition={{ duration: 0.15 }}
                className="absolute top-11 left-0 z-50 w-80 rounded-[18px] bg-white border border-[#e0e0e0] shadow-2xl p-2.5 space-y-1.5"
              >
                <div className="px-2 py-1 flex items-center justify-between border-b border-[#f0f0f0] text-[11px] font-mono text-neutral-500 font-semibold uppercase tracking-wider">
                  <span>Overlay Intelligence</span>
                  <span className="text-emerald-700">{activeLayersCount} Visible</span>
                </div>

                <div className="space-y-1 pt-1 max-h-80 overflow-y-auto pr-0.5">
                  {layerItems.map((item) => {
                    const Icon = item.icon;
                    const isVisible = Boolean(layers[item.key]);

                    return (
                      <button
                        key={item.key}
                        onClick={() => onToggleLayer(item.key)}
                        className={`w-full flex items-center justify-between p-2 rounded-[12px] transition-all cursor-pointer select-none active:scale-95 ${
                          isVisible
                            ? 'bg-[#f5f5f7] text-[#1d1d1f] border border-[#e0e0e0]'
                            : 'text-neutral-400 hover:bg-[#fafafc] hover:text-neutral-700'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div
                            className={`p-1.5 rounded-lg ${
                              isVisible
                                ? 'bg-white border border-[#e0e0e0] ' + item.color
                                : 'bg-neutral-100 text-neutral-400'
                            }`}
                          >
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <div className="text-left min-w-0">
                            <span className="text-[12px] font-semibold block truncate">
                              {item.label}
                            </span>
                            <span className="text-[10px] text-neutral-500 font-mono block truncate">
                              {item.sublabel}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          {item.badge && (
                            <span className="text-[8px] font-mono font-bold px-1.5 py-0.2 rounded bg-amber-100 text-amber-800">
                              {item.badge}
                            </span>
                          )}
                          <span
                            className={`w-5 h-5 rounded-full flex items-center justify-center border text-[10px] transition-colors ${
                              isVisible
                                ? 'bg-[#0066cc] border-[#0066cc] text-white'
                                : 'border-[#e0e0e0] bg-white opacity-60'
                            }`}
                          >
                            {isVisible && <Check className="w-3 h-3 stroke-[3]" />}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="pt-2 border-t border-[#f0f0f0] flex items-center justify-between text-[11px] px-1 text-neutral-500">
                  <span>10 real-time tactical layers</span>
                  <button
                    onClick={() => setLayersOpen(false)}
                    className="text-[#0066cc] font-semibold hover:underline cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        </div>

        {/* Right Telemetry Badges (Strictly pinned to the Top-Right Header) */}
        <div className="flex items-center gap-1.5 sm:gap-2 pointer-events-auto shrink-0">
          {/* Flagship Vessel Status Pill (R/V Polar Sentinel) */}
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#e0e0e0] shadow-sm text-[11px] font-mono"
            title={vesselName ? `Active AIS Flagship: ${vesselName}` : 'Live Sailing AIS Transponder'}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
            <span className="font-bold text-[#0A2540]">{vesselName || 'R/V Polar Sentinel'}</span>
            <span className="text-neutral-300">•</span>
            <span className="text-neutral-600 font-semibold">{vesselSpeedKts !== undefined ? `${vesselSpeedKts.toFixed(1)} kts` : '13.2 kts'}</span>
            <span className="text-neutral-300">•</span>
            <span className="text-[#0A2540] font-bold">{vesselHeadingDeg !== undefined ? `${vesselHeadingDeg}°T` : '245°T'}</span>
          </div>

          {/* Position Badge (POS) */}
          {vesselLat !== undefined && vesselLng !== undefined && (
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#e0e0e0] shadow-sm text-[11px] font-mono text-[#1d1d1f]">
              <Crosshair className="w-3.5 h-3.5 text-[#0066cc]" />
              <span className="font-semibold">POS:</span>
              <span>
                {Math.abs(vesselLat).toFixed(2)}°{vesselLat >= 0 ? 'N' : 'S'}, {Math.abs(vesselLng).toFixed(2)}°{vesselLng >= 0 ? 'E' : 'W'}
              </span>
            </div>
          )}

          {/* Radar Status Badge (RADAR) */}
          <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50/95 backdrop-blur-md border border-emerald-200 shadow-sm text-emerald-800 text-[11px] font-mono font-semibold">
            <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
            <span>RADAR: 48 NM ACTIVE</span>
          </div>
        </div>
      </div>

      {/* 2. Secondary Tactical Tool Strip (Row 2 on Left: Icebergs, Simulation, Ruler) */}
      <div className="absolute top-14 left-3 z-30 flex items-center gap-1.5 sm:gap-2 pointer-events-auto select-none">
        {/* Icebergs Radar Focus Pill */}
        {onFocusIcebergs && (
          <button
            onClick={onFocusIcebergs}
            className="flex items-center gap-1.5 h-8.5 px-3 rounded-full bg-white/95 backdrop-blur-md hover:bg-rose-50 text-[#1d1d1f] border border-rose-200 hover:border-rose-400 shadow-sm transition-all active:scale-95 cursor-pointer group"
            title="Track 37 Active Atlantic Icebergs & Jump to Collision Risk Cluster"
          >
            <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse"></span>
            <span className="text-[12px] font-semibold text-rose-950">🧊 {icebergsCount} Icebergs</span>
            <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full bg-rose-100 text-rose-800">
              {criticalIcebergsCount} CRITICAL
            </span>
          </button>
        )}

        {/* Live Voyage Simulation Pill */}
        {onToggleSimulation && (
          <div className="relative">
            <div className="flex items-center bg-white/95 backdrop-blur-md rounded-full border border-[#e0e0e0] shadow-sm p-0.5">
              <button
                onClick={onToggleSimulation}
                className={`flex items-center gap-1.5 h-7.5 px-3 rounded-full text-[12px] font-semibold transition-all active:scale-95 cursor-pointer ${
                  isSimulating
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-[#f5f5f7] hover:bg-[#e0e0e0] text-[#1d1d1f]'
                }`}
                title={isSimulating ? 'Pause Real-Time Voyage Simulation' : 'Start Real-Time Voyage Simulation'}
              >
                {isSimulating ? (
                  <>
                    <Pause className="w-3 h-3" />
                    <span>Sim Active</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3 text-emerald-600" />
                    <span>Simulate</span>
                  </>
                )}
              </button>

              {onChangeSimulationSpeed && (
                <button
                  onClick={() => {
                    const nextSpeed = simulationSpeed === 1 ? 5 : simulationSpeed === 5 ? 20 : 1;
                    onChangeSimulationSpeed(nextSpeed);
                  }}
                  className="h-7.5 px-2 text-[11px] font-mono font-bold text-neutral-600 hover:text-[#1d1d1f] transition-colors cursor-pointer"
                  title="Cycle Simulation Speed Multiplier"
                >
                  {simulationSpeed}x
                </button>
              )}

              {onResetSimulation && (
                <button
                  onClick={onResetSimulation}
                  className="h-7.5 w-7.5 rounded-full flex items-center justify-center text-neutral-400 hover:text-[#1d1d1f] hover:bg-[#f5f5f7] transition-colors cursor-pointer"
                  title="Reset Simulation Progress to Origin"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Interactive Measurement Ruler Pill */}
        {onToggleMeasure && (
          <button
            onClick={onToggleMeasure}
            className={`flex items-center gap-1.5 h-8.5 px-3 rounded-full text-[12px] font-semibold border shadow-sm transition-all active:scale-95 cursor-pointer ${
              isMeasuring
                ? 'bg-[#0066cc] text-white border-[#0066cc]'
                : 'bg-white/95 backdrop-blur-md hover:bg-white text-[#1d1d1f] border-[#e0e0e0]'
            }`}
            title="Click any 2 points on the chart to measure distance (NM) and true bearing (°T)"
          >
            <Ruler className="w-3.5 h-3.5" />
            <span className="inline">Ruler</span>
          </button>
        )}
      </div>

      {/* 2. Vertically Centered Floating Tactical Zoom & Viewport Controls Dock */}
      <div className="absolute top-1/2 -translate-y-1/2 right-3.5 z-30 flex flex-col items-center bg-white/95 backdrop-blur-md rounded-[16px] border border-[#d2d2d7] shadow-xl p-1.5 space-y-1 pointer-events-auto select-none">
        {/* Zoom In */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={onZoomIn}
              className="h-8 w-8 rounded-[12px] bg-[#f5f5f7] hover:bg-[#e0e0e0] text-[#1d1d1f] flex items-center justify-center transition-colors active:scale-90 cursor-pointer"
              aria-label="Zoom In"
            >
              <Plus className="w-4 h-4" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="left" className="text-xs bg-white text-[#1d1d1f] border border-[#e0e0e0]">
            Zoom In
          </TooltipContent>
        </Tooltip>

        {/* Zoom Percentage */}
        <span className="text-[10px] font-mono text-neutral-600 font-bold py-0.5 text-center tabular-nums">
          {Math.round(zoomLevel * 100)}%
        </span>

        {/* Zoom Out */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={onZoomOut}
              className="h-8 w-8 rounded-[12px] bg-[#f5f5f7] hover:bg-[#e0e0e0] text-[#1d1d1f] flex items-center justify-center transition-colors active:scale-90 cursor-pointer"
              aria-label="Zoom Out"
            >
              <Minus className="w-4 h-4" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="left" className="text-xs bg-white text-[#1d1d1f] border border-[#e0e0e0]">
            Zoom Out
          </TooltipContent>
        </Tooltip>

        <div className="w-4 h-px bg-[#e0e0e0] my-0.5" />

        {/* Center on Vessel */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={onCenterVessel}
              className="h-8 w-8 rounded-[12px] bg-[#f5f5f7] hover:bg-[#e0e0e0] text-[#0066cc] flex items-center justify-center transition-colors active:scale-90 cursor-pointer"
              aria-label="Center on Vessel"
            >
              <Crosshair className="w-4 h-4" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="left" className="text-xs bg-white text-[#1d1d1f] border border-[#e0e0e0]">
            Center on R/V Polar Sentinel
          </TooltipContent>
        </Tooltip>

        {/* Fit Voyage Route Bounds */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={onResetView}
              className="h-8 w-8 rounded-[12px] bg-[#f5f5f7] hover:bg-[#e0e0e0] text-neutral-600 flex items-center justify-center transition-colors active:scale-90 cursor-pointer"
              aria-label="Fit Corridor Bounds"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="left" className="text-xs bg-white text-[#1d1d1f] border border-[#e0e0e0]">
            Fit Entire Voyage Corridor
          </TooltipContent>
        </Tooltip>

        {/* Ruler Tool shortcut */}
        {onToggleMeasure && (
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={onToggleMeasure}
                className={`h-8 w-8 rounded-[12px] flex items-center justify-center transition-colors active:scale-90 cursor-pointer ${
                  isMeasuring
                    ? 'bg-[#0066cc] text-white'
                    : 'bg-[#f5f5f7] hover:bg-[#e0e0e0] text-neutral-600'
                }`}
                aria-label="Distance Measurement Tool"
              >
                <Ruler className="w-4 h-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="left" className="text-xs bg-white text-[#1d1d1f] border border-[#e0e0e0]">
              {isMeasuring ? 'Exit Distance Ruler' : 'Measure Distance & Bearing (NM)'}
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </TooltipProvider>
  );
};

export default MapControls;

