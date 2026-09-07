import React from 'react';
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
} from 'lucide-react';
import { MapLayerVisibility } from '@/types/map';

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
      color: 'text-cyan-400',
      activeBg: 'bg-cyan-500/15',
      activeBorder: 'border-cyan-500/30',
    },
    {
      key: 'icebergs',
      label: 'Icebergs',
      icon: Mountain,
      color: 'text-amber-400',
      activeBg: 'bg-amber-500/15',
      activeBorder: 'border-amber-500/30',
    },
    {
      key: 'risk',
      label: 'Risk Zones',
      icon: ShieldAlert,
      color: 'text-rose-400',
      activeBg: 'bg-rose-500/15',
      activeBorder: 'border-rose-500/30',
    },
    {
      key: 'routes',
      label: 'Routes',
      icon: Route,
      color: 'text-ice-400',
      activeBg: 'bg-ice-500/15',
      activeBorder: 'border-ice-500/30',
    },
    {
      key: 'weather',
      label: 'Weather',
      icon: CloudRain,
      color: 'text-sky-400',
      activeBg: 'bg-sky-500/15',
      activeBorder: 'border-sky-500/30',
    },
    {
      key: 'oceanCurrents',
      label: 'Ocean Currents',
      icon: Compass,
      color: 'text-emerald-400',
      activeBg: 'bg-emerald-500/15',
      activeBorder: 'border-emerald-500/30',
    },
    {
      key: 'bathymetry',
      label: 'Bathymetry',
      icon: Anchor,
      color: 'text-indigo-400',
      activeBg: 'bg-indigo-500/15',
      activeBorder: 'border-indigo-500/30',
    },
  ];

  return (
    <div className="flex flex-col gap-2 pointer-events-auto">
      {/* 1. Layers Panel */}
      <div className="bg-polar-900/95 border border-polar-700/80 p-2.5 rounded-lg shadow-xl backdrop-blur-md w-48 sm:w-52">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-polar-700/60">
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-200">
            <Layers className="w-3.5 h-3.5 text-ice-400" />
            <span>MAP LAYERS</span>
          </div>
          <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-polar-800 text-slate-400 border border-polar-700">
            {Object.values(layers).filter(Boolean).length}/7 ON
          </span>
        </div>

        <div className="space-y-1">
          {layerItems.map((item) => {
            const Icon = item.icon;
            const isVisible = layers[item.key];

            return (
              <button
                key={item.key}
                onClick={() => onToggleLayer(item.key)}
                className={`w-full flex items-center justify-between px-2 py-1.5 rounded text-[11px] font-mono transition-all ${
                  isVisible
                    ? `${item.activeBg} ${item.color} ${item.activeBorder} border font-semibold shadow-sm`
                    : 'text-slate-400 hover:text-slate-200 hover:bg-polar-800/80 border border-transparent'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Icon className={`w-3.5 h-3.5 ${item.color}`} />
                  <span>{item.label}</span>
                </span>
                <span
                  className={`w-3.5 h-3.5 rounded flex items-center justify-center border text-[9px] ${
                    isVisible
                      ? 'bg-polar-900 border-current'
                      : 'border-polar-700 bg-polar-950/60 opacity-40'
                  }`}
                >
                  {isVisible && <Check className="w-2.5 h-2.5" />}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Map Viewport Actions (Zoom & Focus) */}
      <div className="bg-polar-900/95 border border-polar-700/80 p-1.5 rounded-lg shadow-xl backdrop-blur-md flex items-center justify-between gap-1 w-48 sm:w-52">
        <button
          onClick={onZoomIn}
          className="p-1.5 rounded bg-polar-800 hover:bg-polar-750 text-slate-200 border border-polar-700/60"
          title="Zoom In"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>

        <span className="text-[10px] font-mono text-slate-300 font-semibold px-1">
          {Math.round(zoomLevel * 100)}%
        </span>

        <button
          onClick={onZoomOut}
          className="p-1.5 rounded bg-polar-800 hover:bg-polar-750 text-slate-200 border border-polar-700/60"
          title="Zoom Out"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={onCenterVessel}
          className="p-1.5 rounded bg-polar-800 hover:bg-polar-750 text-cyan-400 border border-polar-700/60"
          title="Center on Vessel (R/V Polar Sentinel)"
        >
          <Crosshair className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={onResetView}
          className="p-1.5 rounded bg-polar-800 hover:bg-polar-750 text-slate-200 border border-polar-700/60"
          title="Reset View"
        >
          {zoomLevel === 1 ? (
            <Maximize2 className="w-3.5 h-3.5" />
          ) : (
            <Minimize2 className="w-3.5 h-3.5" />
          )}
        </button>
      </div>

      {/* Engine Mode Pill */}
      <div className="px-2.5 py-1 rounded bg-polar-950/90 border border-polar-700/70 text-[9px] font-mono text-slate-400 flex items-center justify-between w-48 sm:w-52">
        <span>ENGINE:</span>
        <span
          className={`font-semibold uppercase ${
            engineMode === 'mapbox' ? 'text-emerald-400' : 'text-ice-400'
          }`}
        >
          {engineMode === 'mapbox' ? 'MAPBOX GL' : 'POLAR PROJECTION'}
        </span>
      </div>
    </div>
  );
};
