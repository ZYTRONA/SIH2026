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
  SlidersHorizontal,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapLayerVisibility } from '@/types/map';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface MapControlsProps {
  layers: MapLayerVisibility;
  onToggleLayer: (layerKey: keyof MapLayerVisibility) => void;
  zoomLevel: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetView: () => void;
  onCenterVessel: () => void;
  engineMode: 'mapbox' | 'tactical-fallback';
}

export const MapControls: React.FC<MapControlsProps> = ({
  layers,
  onToggleLayer,
  zoomLevel,
  onZoomIn,
  onZoomOut,
  onResetView,
  onCenterVessel,
  engineMode,
}) => {
  const [layersOpen, setLayersOpen] = useState<boolean>(true);

  const layerItems: Array<{
    key: keyof MapLayerVisibility;
    label: string;
    icon: React.ElementType;
    color: string;
    activeBg: string;
    activeBorder: string;
  }> = [
    {
      key: 'seaIce',
      label: 'Sea Ice',
      icon: Snowflake,
      color: 'text-zinc-900',
      activeBg: 'bg-zinc-100',
      activeBorder: 'border-zinc-300',
    },
    {
      key: 'icebergs',
      label: 'Icebergs',
      icon: Mountain,
      color: 'text-amber-800',
      activeBg: 'bg-amber-50',
      activeBorder: 'border-amber-300',
    },
    {
      key: 'risk',
      label: 'Risk Zones',
      icon: ShieldAlert,
      color: 'text-rose-800',
      activeBg: 'bg-rose-50',
      activeBorder: 'border-rose-300',
    },
    {
      key: 'routes',
      label: 'Routes',
      icon: Route,
      color: 'text-zinc-950',
      activeBg: 'bg-zinc-100',
      activeBorder: 'border-zinc-400',
    },
    {
      key: 'weather',
      label: 'Weather',
      icon: CloudRain,
      color: 'text-indigo-800',
      activeBg: 'bg-indigo-50',
      activeBorder: 'border-indigo-300',
    },
    {
      key: 'oceanCurrents',
      label: 'Ocean Currents',
      icon: Compass,
      color: 'text-emerald-800',
      activeBg: 'bg-emerald-50',
      activeBorder: 'border-emerald-300',
    },
    {
      key: 'bathymetry',
      label: 'Bathymetry',
      icon: Anchor,
      color: 'text-zinc-700',
      activeBg: 'bg-zinc-100',
      activeBorder: 'border-zinc-300',
    },
  ];

  const activeCount = Object.values(layers).filter(Boolean).length;

  return (
    <TooltipProvider delayDuration={200}>
      <div className="flex flex-col gap-2 pointer-events-auto select-none w-48 sm:w-52">
        {/* 1. Collapsible Map Layers Panel (Open & Close) */}
        <div className="bg-white/95 border border-zinc-200/90 rounded-2xl shadow-xl backdrop-blur-md overflow-hidden transition-all">
          {/* Panel Header / Open & Close Button */}
          <button
            onClick={() => setLayersOpen(!layersOpen)}
            className="w-full flex items-center justify-between p-2.5 text-xs font-mono font-bold text-zinc-950 hover:bg-zinc-50 transition-colors cursor-pointer group"
            title={layersOpen ? 'Click to close map layers' : 'Click to open map layers'}
          >
            <div className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-black group-hover:scale-110 transition-transform" />
              <span>MAP LAYERS</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-md bg-zinc-100 text-zinc-900 border border-zinc-200 font-bold tabular-nums">
                {activeCount}/7 ON
              </span>
              <div className="p-0.5 rounded text-zinc-500 group-hover:text-black transition-colors">
                {layersOpen ? (
                  <ChevronUp className="w-3.5 h-3.5" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5" />
                )}
              </div>
            </div>
          </button>

          {/* Animated Expandable Layer Controls List */}
          <AnimatePresence initial={false}>
            {layersOpen && (
              <motion.div
                key="layers-content"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden border-t border-zinc-100 px-2.5 pb-2.5 pt-1 space-y-1"
              >
                {layerItems.map((item) => {
                  const Icon = item.icon;
                  const isVisible = layers[item.key];

                  return (
                    <button
                      key={item.key}
                      onClick={() => onToggleLayer(item.key)}
                      className={`w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-[11px] font-mono transition-all cursor-pointer ${
                        isVisible
                          ? `${item.activeBg} ${item.color} ${item.activeBorder} border font-bold shadow-2xs`
                          : 'text-zinc-600 hover:text-black hover:bg-zinc-50 border border-transparent'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <Icon className={`w-3.5 h-3.5 ${item.color}`} />
                        <span className={isVisible ? 'text-zinc-950 font-bold' : 'text-zinc-600 font-medium'}>
                          {item.label}
                        </span>
                      </span>
                      <span
                        className={`w-3.5 h-3.5 rounded flex items-center justify-center border text-[9px] ${
                          isVisible
                            ? 'bg-black border-black text-white shadow-xs'
                            : 'border-zinc-300 bg-zinc-100 opacity-60'
                        }`}
                      >
                        {isVisible && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                      </span>
                    </button>
                  );
                })}

                {/* Quick Collapse Footer */}
                <div className="pt-1.5 border-t border-zinc-100 flex items-center justify-between text-[10px] font-mono text-zinc-500">
                  <span className="text-[9px]">Click header to hide</span>
                  <button
                    onClick={() => setLayersOpen(false)}
                    className="text-[9px] font-bold text-zinc-800 hover:text-black hover:underline cursor-pointer"
                  >
                    Close Layers ✕
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 2. Map Viewport Actions (Zoom & Focus) with Tooltips */}
        <div className="bg-white/95 border border-zinc-200/90 p-1.5 rounded-2xl shadow-xl backdrop-blur-md flex items-center justify-between gap-1 w-full">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={onZoomIn}
                className="p-1.5 rounded-lg bg-zinc-50 hover:bg-zinc-100 text-zinc-800 border border-zinc-200 transition-colors shadow-2xs cursor-pointer"
                aria-label="Zoom In"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-xs font-mono">Zoom In</TooltipContent>
          </Tooltip>

          <span className="text-[10px] font-mono text-zinc-950 font-bold px-1 tabular-nums">
            {Math.round(zoomLevel * 100)}%
          </span>

          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={onZoomOut}
                className="p-1.5 rounded-lg bg-zinc-50 hover:bg-zinc-100 text-zinc-800 border border-zinc-200 transition-colors shadow-2xs cursor-pointer"
                aria-label="Zoom Out"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-xs font-mono">Zoom Out</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={onCenterVessel}
                className="p-1.5 rounded-lg bg-zinc-50 hover:bg-zinc-100 text-black border border-zinc-200 transition-colors shadow-2xs cursor-pointer"
                aria-label="Center on Vessel"
              >
                <Crosshair className="w-3.5 h-3.5" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-xs font-mono">Center on Vessel</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={onResetView}
                className="p-1.5 rounded-lg bg-zinc-50 hover:bg-zinc-100 text-zinc-800 border border-zinc-200 transition-colors shadow-2xs cursor-pointer"
                aria-label="Reset View"
              >
                {zoomLevel === 1 ? (
                  <Maximize2 className="w-3.5 h-3.5" />
                ) : (
                  <Minimize2 className="w-3.5 h-3.5" />
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-xs font-mono">Reset View</TooltipContent>
          </Tooltip>
        </div>

        {/* Engine Mode Pill */}
        <div className="px-3 py-1 rounded-xl bg-white/95 border border-zinc-200 shadow-xs text-[9px] font-mono text-zinc-500 flex items-center justify-between w-full">
          <span>ENGINE:</span>
          <span
            className={`font-bold uppercase ${
              engineMode === 'mapbox' ? 'text-zinc-900' : 'text-black font-extrabold'
            }`}
          >
            {engineMode === 'mapbox' ? 'MAPBOX GL' : 'POLAR PROJECTION'}
          </span>
        </div>
      </div>
    </TooltipProvider>
  );
};


