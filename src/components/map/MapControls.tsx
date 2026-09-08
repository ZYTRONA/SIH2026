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
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapLayerVisibility } from '@/types/map';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export type BasemapMode = 'openseamap' | 'esriOcean' | 'osm' | 'polar';

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
}

export const MapControls: React.FC<MapControlsProps> = ({
  layers,
  onToggleLayer,
  zoomLevel,
  onZoomIn,
  onZoomOut,
  onResetView,
  onCenterVessel,
  basemapMode = 'openseamap',
  onSelectBasemap,
}) => {
  const [basemapOpen, setBasemapOpen] = useState<boolean>(false);
  const [layersOpen, setLayersOpen] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
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
      label: 'Sea Ice Concentration',
      sublabel: 'Sentinel-1 SAR Radar',
      icon: Snowflake,
      color: 'text-sky-600',
    },
    {
      key: 'icebergs',
      label: 'Iceberg Radar Targets',
      sublabel: '32 Tracked Fragments',
      icon: Mountain,
      color: 'text-amber-600',
      badge: '32 ACTIVE',
    },
    {
      key: 'risk',
      label: 'POLARIS Risk Corridors',
      sublabel: 'RIO Structural Index',
      icon: ShieldAlert,
      color: 'text-rose-600',
    },
    {
      key: 'routes',
      label: 'Pareto Optimal Paths',
      sublabel: 'A* Multi-Objective Solvers',
      icon: Route,
      color: 'text-[#0066cc]',
      badge: 'AI SOLVER',
    },
    {
      key: 'oceanCurrents',
      label: 'Ocean Currents & Gyres',
      sublabel: 'Circumpolar Streamlines',
      icon: Compass,
      color: 'text-emerald-600',
    },
    {
      key: 'bathymetry',
      label: 'Seabed Bathymetry',
      sublabel: 'Isobaths & Shelf Breaks',
      icon: Anchor,
      color: 'text-indigo-600',
    },
    {
      key: 'weather',
      label: 'Wind & Swell Vectors',
      sublabel: '72H ECMWF Ensemble',
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
      id: 'openseamap',
      name: 'OpenSeaMap Nautical',
      subtitle: 'Official nautical seamarks, buoys, beacons & depth contours',
      tag: 'OPENSEAMAP',
      icon: Navigation,
      isPrimary: true,
    },
    {
      id: 'esriOcean',
      name: 'ESRI Ocean Floor',
      subtitle: 'High-definition bathymetric depth & continental shelf relief',
      tag: 'BATHYMETRY',
      icon: Anchor,
    },
    {
      id: 'osm',
      name: 'OpenStreetMap Marine',
      subtitle: 'Global maritime baseline, coastlines, research bases & ports',
      tag: 'OSM BASE',
      icon: MapIcon,
    },
    {
      id: 'polar',
      name: 'Polar Stereographic HUD',
      subtitle: 'Tactical EPSG:3031 radar sweep projection with ice shelf leads',
      tag: 'EPSG:3031',
      icon: Radio,
    },
  ];

  const activeLayersCount = Object.values(layers).filter(Boolean).length;
  const currentBasemap = basemaps.find((b) => b.id === basemapMode) || basemaps[0];

  return (
    <TooltipProvider delayDuration={150}>
      <div ref={containerRef} className="flex items-center gap-2 pointer-events-auto select-none flex-wrap">
        {/* 1. Unique Floating Chart Mode Pill */}
        <div className="relative">
          <button
            onClick={() => {
              setBasemapOpen(!basemapOpen);
              if (!basemapOpen) setLayersOpen(false);
            }}
            className="flex items-center gap-2 h-10 px-3.5 rounded-full bg-white/95 hover:bg-white text-[#1d1d1f] border border-[#e0e0e0] shadow-md transition-all active:scale-95 cursor-pointer group"
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
            <ChevronDown className={`w-3.5 h-3.5 text-neutral-400 group-hover:text-[#1d1d1f] transition-transform ${basemapOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Basemap Selection Popover */}
          <AnimatePresence>
            {basemapOpen && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.96 }}
                transition={{ duration: 0.15 }}
                className="absolute top-12 left-0 z-50 w-72 rounded-[18px] bg-white border border-[#e0e0e0] shadow-2xl p-2 space-y-1.5"
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
                        <div className={`p-1.5 rounded-lg mt-0.5 ${isSelected ? 'bg-white/20 text-white' : 'bg-white border border-[#e0e0e0] text-[#0066cc]'}`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[13px] font-semibold truncate">{bm.name}</span>
                            {bm.isPrimary && (
                              <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold uppercase ${isSelected ? 'bg-white text-[#0066cc]' : 'bg-emerald-100 text-emerald-800'}`}>
                                RECOMMENDED
                              </span>
                            )}
                          </div>
                          <p className={`text-[11px] leading-tight pt-0.5 ${isSelected ? 'text-white/80 font-normal' : 'text-neutral-500 font-normal'}`}>
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

        {/* 2. Unique Floating Telemetry Layers Deck */}
        <div className="relative">
          <button
            onClick={() => {
              setLayersOpen(!layersOpen);
              if (!layersOpen) setBasemapOpen(false);
            }}
            className="flex items-center gap-2 h-10 px-3.5 rounded-full bg-white/95 hover:bg-white text-[#1d1d1f] border border-[#e0e0e0] shadow-md transition-all active:scale-95 cursor-pointer group"
            title="Configure Map Telemetry Layers"
          >
            <div className="p-1 rounded-full bg-emerald-500/10 text-emerald-600">
              <Layers className="w-3.5 h-3.5" />
            </div>
            <span className="text-[12px] font-semibold">Telemetry Layers</span>
            <span className="px-2 py-0.5 rounded-full bg-[#f5f5f7] text-[#1d1d1f] border border-[#e0e0e0] text-[10px] font-mono font-bold">
              {activeLayersCount}/{layerItems.length}
            </span>
            <ChevronDown className={`w-3.5 h-3.5 text-neutral-400 group-hover:text-[#1d1d1f] transition-transform ${layersOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Telemetry Layers Drawer */}
          <AnimatePresence>
            {layersOpen && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.96 }}
                transition={{ duration: 0.15 }}
                className="absolute top-12 left-0 z-50 w-72 rounded-[18px] bg-white border border-[#e0e0e0] shadow-2xl p-2.5 space-y-1.5"
              >
                <div className="px-2 py-1 flex items-center justify-between border-b border-[#f0f0f0] text-[11px] font-mono text-neutral-500 font-semibold uppercase tracking-wider">
                  <span>Overlay Intelligence</span>
                  <span className="text-emerald-700">{activeLayersCount} Visible</span>
                </div>

                <div className="space-y-1 pt-1 max-h-72 overflow-y-auto pr-0.5">
                  {layerItems.map((item) => {
                    const Icon = item.icon;
                    const isVisible = layers[item.key];

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
                          <div className={`p-1.5 rounded-lg ${isVisible ? 'bg-white border border-[#e0e0e0] ' + item.color : 'bg-neutral-100 text-neutral-400'}`}>
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <div className="text-left min-w-0">
                            <span className="text-[12px] font-semibold block truncate">{item.label}</span>
                            <span className="text-[10px] text-neutral-500 font-mono block truncate">{item.sublabel}</span>
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
                  <span>Toggle to show/hide layers</span>
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

        {/* 3. Unique Tactile Viewport Actions Pill (Zoom & Focus) */}
        <div className="flex items-center gap-1 h-10 px-2 rounded-full bg-white/95 border border-[#e0e0e0] shadow-md">
          {/* Zoom In */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={onZoomIn}
                className="h-7 w-7 rounded-full bg-[#f5f5f7] hover:bg-[#e0e0e0] text-[#1d1d1f] flex items-center justify-center transition-colors active:scale-90 cursor-pointer"
                aria-label="Zoom In"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-xs bg-white text-[#1d1d1f] border border-[#e0e0e0]">
              Zoom In
            </TooltipContent>
          </Tooltip>

          {/* Zoom Percentage */}
          <span className="text-[11px] font-mono text-[#1d1d1f] font-bold px-1 min-w-[36px] text-center tabular-nums">
            {Math.round(zoomLevel * 100)}%
          </span>

          {/* Zoom Out */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={onZoomOut}
                className="h-7 w-7 rounded-full bg-[#f5f5f7] hover:bg-[#e0e0e0] text-[#1d1d1f] flex items-center justify-center transition-colors active:scale-90 cursor-pointer"
                aria-label="Zoom Out"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-xs bg-white text-[#1d1d1f] border border-[#e0e0e0]">
              Zoom Out
            </TooltipContent>
          </Tooltip>

          <div className="h-4 w-px bg-[#e0e0e0] mx-0.5" />

          {/* Center on Vessel Action */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={onCenterVessel}
                className="flex items-center gap-1 h-7 px-2.5 rounded-full bg-[#f5f5f7] hover:bg-[#e0e0e0] text-[#1d1d1f] text-[11px] font-semibold transition-colors active:scale-95 cursor-pointer"
                aria-label="Focus Vessel Position"
              >
                <Crosshair className="w-3 h-3 text-[#0066cc]" />
                <span className="hidden sm:inline">Ship</span>
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-xs bg-white text-[#1d1d1f] border border-[#e0e0e0]">
              Center on R/V Polar Sentinel
            </TooltipContent>
          </Tooltip>

          {/* Fit Voyage Route Bounds Action */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={onResetView}
                className="flex items-center gap-1 h-7 px-2.5 rounded-full bg-[#f5f5f7] hover:bg-[#e0e0e0] text-[#1d1d1f] text-[11px] font-semibold transition-colors active:scale-95 cursor-pointer"
                aria-label="Fit Entire Voyage Corridor"
              >
                <Maximize2 className="w-3 h-3 text-neutral-600" />
                <span className="hidden sm:inline">Fit</span>
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-xs bg-white text-[#1d1d1f] border border-[#e0e0e0]">
              Fit Complete Antarctic Voyage Corridor
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default MapControls;

