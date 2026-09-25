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
    <div className="bg-white border border-[#e0e0e0] rounded-[18px] p-3 flex flex-col sm:flex-row items-center justify-between gap-3">
      <div className="flex items-center gap-2 text-[12px] font-semibold text-[#1d1d1f]">
        <div className="p-1 rounded-full bg-[#f5f5f7] text-[#0066cc]">
          <Layers className="w-3.5 h-3.5" />
        </div>
        <span className="tracking-wider uppercase text-[11px] text-neutral-500">RISK HEATMAP LAYERS:</span>
      </div>

      <div className="flex items-center gap-2 flex-wrap justify-center">
        {items.map((it) => {
          const Icon = it.icon;
          const isActive = layers[it.key];

          return (
            <button
              key={it.key}
              onClick={() => onToggle(it.key)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] transition-all cursor-pointer active:scale-95 ${
                isActive
                  ? 'bg-[#0066cc] text-white border border-[#0066cc] font-semibold'
                  : 'bg-[#f5f5f7] hover:bg-[#e0e0e0] text-neutral-700 border border-[#e0e0e0] font-normal'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-neutral-500'}`} />
              <span>{it.label}</span>
              <span
                className={`w-3.5 h-3.5 rounded-full flex items-center justify-center border text-[9px] ml-1 ${
                  isActive ? 'border-white bg-white/20 text-white' : 'border-neutral-300 bg-white text-transparent'
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

