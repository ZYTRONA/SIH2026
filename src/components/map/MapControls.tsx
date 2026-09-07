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
      color: 'text-sky-600',
      activeBg: 'bg-sky-50',
      activeBorder: 'border-sky-300',
    },
    {
      key: 'icebergs',
      label: 'Icebergs',
      icon: Mountain,
      color: 'text-amber-600',
      activeBg: 'bg-amber-50',
      activeBorder: 'border-amber-300',
    },
    {
      key: 'risk',
      label: 'Risk Zones',
      icon: ShieldAlert,
      color: 'text-rose-600',
      activeBg: 'bg-rose-50',
      activeBorder: 'border-rose-300',
    },
    {
      key: 'routes',
      label: 'Routes',
      icon: Route,
      color: 'text-sky-700',
      activeBg: 'bg-sky-50',
      activeBorder: 'border-sky-300',
    },
    {
      key: 'weather',
      label: 'Weather',
      icon: CloudRain,
      color: 'text-indigo-600',
      activeBg: 'bg-indigo-50',
      activeBorder: 'border-indigo-300',
    },
    {
      key: 'oceanCurrents',
      label: 'Ocean Currents',
      icon: Compass,
      color: 'text-emerald-600',
      activeBg: 'bg-emerald-50',
      activeBorder: 'border-emerald-300',
    },
    {
      key: 'bathymetry',
      label: 'Bathymetry',
      icon: Anchor,
      color: 'text-slate-700',
      activeBg: 'bg-slate-100',
      activeBorder: 'border-slate-300',
    },
  ];

  return (
    <div className="flex flex-col gap-2 pointer-events-auto">
      {/* 1. Layers Panel */}
      <div className="bg-white/95 border border-slate-200 p-2.5 rounded-xl shadow-lg backdrop-blur-md w-48 sm:w-52">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-900">
            <Layers className="w-3.5 h-3.5 text-sky-600" />
            <span>MAP LAYERS</span>
          </div>
          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 border border-slate-200 font-semibold">
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
                className={`w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-[11px] font-mono transition-all ${
                  isVisible
                    ? `${item.activeBg} ${item.color} ${item.activeBorder} border font-semibold shadow-2xs`
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Icon className={`w-3.5 h-3.5 ${item.color}`} />
                  <span className={isVisible ? 'text-slate-900 font-bold' : 'text-slate-600'}>{item.label}</span>
                </span>
                <span
                  className={`w-3.5 h-3.5 rounded flex items-center justify-center border text-[9px] ${
                    isVisible
                      ? 'bg-white border-current text-sky-600 shadow-2xs'
                      : 'border-slate-300 bg-slate-100 opacity-60'
                  }`}
                >
                  {isVisible && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Map Viewport Actions (Zoom & Focus) */}
      <div className="bg-white/95 border border-slate-200 p-1.5 rounded-xl shadow-lg backdrop-blur-md flex items-center justify-between gap-1 w-48 sm:w-52">
        <button
          onClick={onZoomIn}
          className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors shadow-2xs"
          title="Zoom In"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>

        <span className="text-[10px] font-mono text-slate-800 font-bold px-1">
          {Math.round(zoomLevel * 100)}%
        </span>

        <button
          onClick={onZoomOut}
          className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors shadow-2xs"
          title="Zoom Out"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={onCenterVessel}
          className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-sky-600 border border-slate-200 transition-colors shadow-2xs"
          title="Center on Vessel (R/V Polar Sentinel)"
        >
          <Crosshair className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={onResetView}
          className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors shadow-2xs"
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
      <div className="px-2.5 py-1 rounded-lg bg-white/95 border border-slate-200 shadow-sm text-[9px] font-mono text-slate-500 flex items-center justify-between w-48 sm:w-52">
        <span>ENGINE:</span>
        <span
          className={`font-bold uppercase ${
            engineMode === 'mapbox' ? 'text-emerald-700' : 'text-sky-700'
          }`}
        >
          {engineMode === 'mapbox' ? 'MAPBOX GL' : 'POLAR PROJECTION'}
        </span>
      </div>
    </div>
  );
};
