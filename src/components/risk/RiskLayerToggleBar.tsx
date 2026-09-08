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
  }> = [
    { key: 'seaIceRisk', label: 'Sea-Ice Risk', icon: Snowflake },
    { key: 'icebergRisk', label: 'Iceberg Risk', icon: Mountain },
    { key: 'weatherRisk', label: 'Weather Risk', icon: Wind },
    { key: 'oceanRisk', label: 'Ocean Risk', icon: Compass },
    { key: 'bathymetryRisk', label: 'Bathymetry Risk', icon: Anchor },
  ];

  return (
    <div className="bg-white border border-zinc-200/90 shadow-xs rounded-xl p-3 flex flex-col sm:flex-row items-center justify-between gap-3">
      <div className="flex items-center gap-2 text-xs font-mono font-bold text-zinc-950">
        <Layers className="w-4 h-4 text-black" />
        <span className="tracking-wider">RISK HEATMAP LAYERS:</span>
      </div>

      <div className="flex items-center gap-2 flex-wrap justify-center">
        {items.map((it) => {
          const Icon = it.icon;
          const isActive = layers[it.key];

          return (
            <button
              key={it.key}
              onClick={() => onToggle(it.key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                isActive
                  ? 'bg-black text-white border border-black font-bold shadow-xs'
                  : 'bg-zinc-50 hover:bg-zinc-100 text-zinc-700 border border-zinc-200 font-medium'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-zinc-200' : 'text-zinc-500'}`} />
              <span>{it.label}</span>
              <span
                className={`w-3.5 h-3.5 rounded flex items-center justify-center border text-[9px] ml-1 ${
                  isActive ? 'border-zinc-500 bg-zinc-800 text-white' : 'border-zinc-300 bg-white text-transparent'
                }`}
              >
                {isActive && <Check className="w-2.5 h-2.5 stroke-[3]" />}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

