import React, { useState } from 'react';
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
  Minimize2,
  Crosshair,
  Check,
  ChevronDown,
  ChevronUp,
  Map as MapIcon,
  Navigation,
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

interface MapControlsProps {
  layers: MapLayerVisibility;
  onToggleLayer: (layerKey: keyof MapLayerVisibility) => void;
  zoomLevel: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetView: () => void;
  onCenterVessel: () => void;
  engineMode: 'mapbox' | 'tactical-fallback';
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
  engineMode: _engineMode,
  basemapMode = 'openseamap',
  onSelectBasemap,
}) => {
  const [layersOpen, setLayersOpen] = useState<boolean>(true);
  const [basemapOpen, setBasemapOpen] = useState<boolean>(false);

  const layerItems: Array<{
    key: keyof MapLayerVisibility;
    label: string;
    glyph: string;
    icon: React.ElementType;
    color: string;
    activeBg: string;
    activeBorder: string;
  }> = [
    {
      key: 'seaIce',
      label: 'Sea Ice (SAR)',
      glyph: '●',
      icon: Snowflake,
      color: 'text-text-primary',
      activeBg: 'bg-card-subtle',
      activeBorder: 'border-border',
    },
    {
      key: 'icebergs',
      label: 'Icebergs (32 Targets)',
      glyph: '▲',
      icon: Mountain,
      color: 'text-amber-700 dark:text-amber-300',
      activeBg: 'bg-amber-100 dark:bg-amber-950',
      activeBorder: 'border-amber-300 dark:border-amber-700',
    },
    {
      key: 'risk',
      label: 'Risk Zones (RIO)',
      glyph: '⬢',
      icon: ShieldAlert,
      color: 'text-rose-700 dark:text-rose-300',
      activeBg: 'bg-rose-100 dark:bg-rose-950',
      activeBorder: 'border-rose-300 dark:border-rose-700',
    },
    {
      key: 'routes',
      label: 'Pareto Corridors',
      glyph: '✓',
      icon: Route,
      color: 'text-text-primary',
      activeBg: 'bg-card-subtle',
      activeBorder: 'border-border',
    },
    {
      key: 'weather',
      label: 'Wind & Swell',
      glyph: '●',
      icon: CloudRain,
      color: 'text-sky-700 dark:text-sky-300',
      activeBg: 'bg-sky-100 dark:bg-sky-950',
      activeBorder: 'border-sky-300 dark:border-sky-700',
    },
    {
      key: 'oceanCurrents',
      label: 'Ocean Hydrodynamics',
      glyph: '●',
      icon: Compass,
      color: 'text-emerald-700 dark:text-emerald-300',
      activeBg: 'bg-emerald-100 dark:bg-emerald-950',
      activeBorder: 'border-emerald-300 dark:border-emerald-700',
    },
    {
      key: 'bathymetry',
      label: 'Seabed Bathymetry',
      glyph: '●',
      icon: Anchor,
      color: 'text-text-secondary',
      activeBg: 'bg-card-subtle',
      activeBorder: 'border-border',
    },
  ];

  const basemaps: Array<{
    id: BasemapMode;
    name: string;
    description: string;
    icon: React.ElementType;
    badge?: string;
  }> = [
    {
      id: 'openseamap',
      name: 'OpenSeaMap Nautical',
      description: 'Nautical seamarks, buoys, depth contours & marine chart',
      icon: Navigation,
      badge: 'BEST FOR SAIL',
    },
    {
      id: 'esriOcean',
      name: 'ESRI Ocean Bathymetry',
      description: 'High-definition ocean floor & continental shelf depth',
      icon: Anchor,
    },
    {
      id: 'osm',
      name: 'OpenStreetMap Marine',
      description: 'Standard global coastlines, stations & ports',
      icon: MapIcon,
    },
    {
      id: 'polar',
      name: 'Polar Stereographic HUD',
      description: 'EPSG:3031 tactical radar sweep projection',
      icon: Compass,
    },
  ];

  const activeCount = Object.values(layers).filter(Boolean).length;

  return (
    <TooltipProvider delayDuration={150}>
      <div className="flex flex-col gap-2 pointer-events-auto select-none w-56 sm:w-64">
        {/* 1. Basemap Chart Selector (OpenSeaMap vs Polar HUD) */}
        <div className="bg-white border border-[#e0e0e0] rounded-[18px] shadow-lg overflow-hidden transition-all">
          <button
            onClick={() => {
              setBasemapOpen(!basemapOpen);
              if (!basemapOpen) setLayersOpen(false);
            }}
            className="w-full flex items-center justify-between p-3 min-h-[44px] text-[13px] font-semibold text-[#1d1d1f] hover:bg-[#f5f5f7] transition-colors cursor-pointer group active:scale-95"
            title="Switch Nautical Chart Engine"
          >
            <div className="flex items-center gap-2">
              <Navigation className="w-4 h-4 text-[#0066cc]" />
              <span>Chart: {basemaps.find((b) => b.id === basemapMode)?.name.split(' ')[0]}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#f5f5f7] text-[#1d1d1f] border border-[#e0e0e0]">
                {basemapMode === 'openseamap' ? 'Nautical' : 'Map'}
              </span>
              <div className="p-0.5 rounded text-neutral-400 group-hover:text-[#1d1d1f]">
                {basemapOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </div>
            </div>
          </button>

          <AnimatePresence initial={false}>
            {basemapOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="overflow-hidden border-t border-[#f0f0f0] p-2 bg-white space-y-1"
              >
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
                      className={`w-full flex items-start gap-2.5 p-2 rounded-[12px] text-left transition-all active:scale-95 cursor-pointer ${
                        isSelected
                          ? 'bg-[#0066cc] text-white font-semibold'
                          : 'bg-[#fafafc] hover:bg-[#f5f5f7] text-[#1d1d1f] border border-[#f0f0f0]'
                      }`}
                    >
                      <Icon className="w-4 h-4 mt-0.5 shrink-0" />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[13px] font-semibold truncate">{bm.name}</span>
                          {bm.badge && (
                            <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-white text-[#1d1d1f] font-semibold shrink-0">
                              {bm.badge}
                            </span>
                          )}
                        </div>
                        <p className={`text-[11px] truncate ${isSelected ? 'text-white/80' : 'text-neutral-500 font-normal'}`}>
                          {bm.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 2. Collapsible Map Layers Panel (Open & Close) */}
        <div className="bg-white border border-[#e0e0e0] rounded-[18px] shadow-lg overflow-hidden transition-all">
          <button
            onClick={() => setLayersOpen(!layersOpen)}
            className="w-full flex items-center justify-between p-3 min-h-[44px] text-[13px] font-semibold text-[#1d1d1f] hover:bg-[#f5f5f7] transition-colors cursor-pointer group active:scale-95"
          >
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#0066cc]" />
              <span>Layers ({activeCount})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-mono text-neutral-500 font-normal">
                {layersOpen ? 'Hide' : 'Show'}
              </span>
              <div className="p-0.5 text-neutral-400 group-hover:text-[#1d1d1f]">
                {layersOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </div>
            </div>
          </button>

          <AnimatePresence initial={false}>
            {layersOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="overflow-hidden border-t border-[#f0f0f0] p-2 space-y-1 bg-white"
              >
                {layerItems.map((item) => {
                  const Icon = item.icon;
                  const isVisible = layers[item.key];

                  return (
                    <button
                      key={item.key}
                      onClick={() => onToggleLayer(item.key)}
                      className={`w-full flex items-center justify-between p-2 rounded-[10px] text-[12px] transition-all cursor-pointer select-none active:scale-95 ${
                        isVisible
                          ? 'bg-[#f5f5f7] text-[#1d1d1f] font-semibold border border-[#e0e0e0]'
                          : 'text-neutral-400 hover:bg-[#fafafc] hover:text-neutral-700'
                      }`}
                    >
                      <span className="flex items-center gap-2 truncate">
                        <Icon className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{item.label}</span>
                      </span>
                      <span
                        className={`w-4 h-4 rounded-full flex items-center justify-center border text-[9px] ${
                          isVisible
                            ? 'bg-[#0066cc] border-[#0066cc] text-white'
                            : 'border-[#e0e0e0] bg-white opacity-60'
                        }`}
                      >
                        {isVisible && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                      </span>
                    </button>
                  );
                })}

                <div className="pt-2 border-t border-[#f0f0f0] flex items-center justify-between text-[11px] text-neutral-400 font-normal">
                  <span>Toggle telemetry layers</span>
                  <button
                    onClick={() => setLayersOpen(false)}
                    className="text-[11px] text-[#0066cc] hover:underline cursor-pointer"
                  >
                    Close ✕
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 3. Map Viewport Actions (Zoom & Focus) with 44px Touch Targets */}
        <div className="bg-white border border-[#e0e0e0] p-1.5 rounded-[18px] shadow-lg flex items-center justify-between gap-1 w-full min-h-[44px]">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={onZoomIn}
                className="h-8 w-8 rounded-full bg-[#f5f5f7] hover:bg-[#e0e0e0] text-[#1d1d1f] border border-[#e0e0e0] flex items-center justify-center transition-colors active:scale-95 cursor-pointer"
                aria-label="Zoom In"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-xs bg-white text-[#1d1d1f] border border-[#e0e0e0]">Zoom In</TooltipContent>
          </Tooltip>

          <span className="text-[12px] font-mono text-[#1d1d1f] font-semibold px-1 tabular-nums">
            {Math.round(zoomLevel * 100)}%
          </span>

          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={onZoomOut}
                className="h-8 w-8 rounded-full bg-[#f5f5f7] hover:bg-[#e0e0e0] text-[#1d1d1f] border border-[#e0e0e0] flex items-center justify-center transition-colors active:scale-95 cursor-pointer"
                aria-label="Zoom Out"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-xs bg-white text-[#1d1d1f] border border-[#e0e0e0]">Zoom Out</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={onCenterVessel}
                className="h-8 w-8 rounded-full bg-[#f5f5f7] hover:bg-[#e0e0e0] text-[#1d1d1f] border border-[#e0e0e0] flex items-center justify-center transition-colors active:scale-95 cursor-pointer"
                aria-label="Center on Vessel"
              >
                <Crosshair className="w-3.5 h-3.5" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-xs bg-white text-[#1d1d1f] border border-[#e0e0e0]">Center on Vessel</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={onResetView}
                className="h-8 w-8 rounded-full bg-[#f5f5f7] hover:bg-[#e0e0e0] text-[#1d1d1f] border border-[#e0e0e0] flex items-center justify-center transition-colors active:scale-95 cursor-pointer"
                aria-label="Reset View"
              >
                {zoomLevel === 1 ? (
                  <Maximize2 className="w-3.5 h-3.5" />
                ) : (
                  <Minimize2 className="w-3.5 h-3.5" />
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-xs bg-white text-[#1d1d1f] border border-[#e0e0e0]">Reset View</TooltipContent>
          </Tooltip>
        </div>

        {/* 4. Engine Mode Indicator Pill */}
        <div className="px-3 py-1.5 rounded-full bg-white border border-[#e0e0e0] text-[11px] font-mono text-neutral-500 flex items-center justify-between w-full">
          <span>CHART ENGINE:</span>
          <span className="font-semibold uppercase text-emerald-700">
            {basemapMode === 'openseamap'
              ? 'OPENSEAMAP'
              : basemapMode === 'esriOcean'
              ? 'ESRI OCEAN'
              : basemapMode === 'osm'
              ? 'OSM MARINE'
              : 'POLAR EPSG:3031'}
          </span>
        </div>
      </div>
    </TooltipProvider>
  );
};
