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
    { key: 'seaIceRisk', label: 'Sea-Ice Risk', icon: Snowflake, color: 'text-sky-700', activeBg: 'bg-sky-50', activeBorder: 'border-sky-300' },
    { key: 'icebergRisk', label: 'Iceberg Risk', icon: Mountain, color: 'text-amber-700', activeBg: 'bg-amber-50', activeBorder: 'border-amber-300' },
    { key: 'weatherRisk', label: 'Weather Risk', icon: Wind, color: 'text-orange-700', activeBg: 'bg-orange-50', activeBorder: 'border-orange-300' },
    { key: 'oceanRisk', label: 'Ocean Risk', icon: Compass, color: 'text-emerald-700', activeBg: 'bg-emerald-50', activeBorder: 'border-emerald-300' },
    { key: 'bathymetryRisk', label: 'Bathymetry Risk', icon: Anchor, color: 'text-indigo-700', activeBg: 'bg-indigo-50', activeBorder: 'border-indigo-300' },
  ];

  return (
    <div className="bg-white border border-slate-200/90 shadow-xs rounded-xl p-3 flex flex-col sm:flex-row items-center justify-between gap-3">
      <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-800">
        <Layers className="w-4 h-4 text-sky-600" />
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
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                isActive
                  ? `${it.activeBg} ${it.color} ${it.activeBorder} border font-bold shadow-xs`
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{it.label}</span>
              <span
                className={`w-3.5 h-3.5 rounded flex items-center justify-center border text-[9px] ml-1 ${
                  isActive ? 'border-current bg-white' : 'border-slate-300 opacity-40'
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
