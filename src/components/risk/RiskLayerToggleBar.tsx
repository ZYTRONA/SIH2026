import React from 'react';
import { Snowflake, Mountain, Wind, Compass, Anchor, Layers, Check } from 'lucide-react';

export interface RiskLayersState {
  seaIceRisk: boolean;
  icebergRisk: boolean;
  weatherRisk: boolean;
  oceanRisk: boolean;
  bathymetryRisk: boolean;
}

interface RiskLayerToggleBarProps {
  layers: RiskLayersState;
  onToggle: (layerKey: keyof RiskLayersState) => void;
}

export const RiskLayerToggleBar: React.FC<RiskLayerToggleBarProps> = ({
  layers,
  onToggle,
}) => {
  const items: Array<{
    key: keyof RiskLayersState;
    label: string;
    icon: React.ElementType;
    color: string;
    activeBg: string;
    activeBorder: string;
  }> = [
    { key: 'seaIceRisk', label: 'Sea-Ice Risk', icon: Snowflake, color: 'text-cyan-400', activeBg: 'bg-cyan-500/15', activeBorder: 'border-cyan-500/30' },
    { key: 'icebergRisk', label: 'Iceberg Risk', icon: Mountain, color: 'text-amber-400', activeBg: 'bg-amber-500/15', activeBorder: 'border-amber-500/30' },
    { key: 'weatherRisk', label: 'Weather Risk', icon: Wind, color: 'text-orange-400', activeBg: 'bg-orange-500/15', activeBorder: 'border-orange-500/30' },
    { key: 'oceanRisk', label: 'Ocean Risk', icon: Compass, color: 'text-emerald-400', activeBg: 'bg-emerald-500/15', activeBorder: 'border-emerald-500/30' },
    { key: 'bathymetryRisk', label: 'Bathymetry Risk', icon: Anchor, color: 'text-indigo-400', activeBg: 'bg-indigo-500/15', activeBorder: 'border-indigo-500/30' },
  ];

  return (
    <div className="polar-panel p-3 flex flex-col sm:flex-row items-center justify-between gap-3">
      <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-200">
        <Layers className="w-4 h-4 text-ice-400" />
        <span>RISK HEATMAP LAYERS:</span>
      </div>

      <div className="flex items-center gap-2 flex-wrap justify-center">
        {items.map((it) => {
          const Icon = it.icon;
          const isActive = layers[it.key];

          return (
            <button
              key={it.key}
              onClick={() => onToggle(it.key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono font-medium transition-all ${
                isActive
                  ? `${it.activeBg} ${it.color} ${it.activeBorder} border font-bold shadow-sm`
                  : 'bg-polar-900 hover:bg-polar-800 text-slate-400 border border-polar-700/60'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{it.label}</span>
              <span
                className={`w-3.5 h-3.5 rounded flex items-center justify-center border text-[9px] ml-1 ${
                  isActive ? 'border-current bg-polar-900' : 'border-polar-700 opacity-40'
                }`}
              >
                {isActive && <Check className="w-2.5 h-2.5" />}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
