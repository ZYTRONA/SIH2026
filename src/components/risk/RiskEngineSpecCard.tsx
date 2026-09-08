import React from 'react';
import { RISK_ENGINE_SPEC } from '@/data/riskIntelligenceData';
import { Cpu, Shield, Info } from 'lucide-react';

export const RiskEngineSpecCard: React.FC = () => {
  return (
    <div className="bg-white border border-zinc-200/90 shadow-xs rounded-xl p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-black text-white">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold font-sans text-zinc-950">
              Risk Engine Specification
            </h3>
            <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider font-semibold">
              {RISK_ENGINE_SPEC.framework}
            </span>
          </div>
        </div>

        <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono bg-zinc-100 text-zinc-900 border border-zinc-300 font-bold">
          DETERMINISTIC
        </span>
      </div>

      {/* Mandatory Disclaimer */}
      <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 space-y-1 text-xs font-sans">
        <div className="flex items-center gap-1.5 text-zinc-900 font-mono font-bold text-[11px]">
          <Info className="w-3.5 h-3.5 flex-shrink-0 text-zinc-700" />
          <span>Operational Safety Engine Note</span>
        </div>
        <p className="text-zinc-700 leading-relaxed text-[11px] font-medium">
          Calculations are computed using deterministic mathematical formulations defined in the IMO Polar Code Polar Operational Limit Assessment Risk Indexing System (POLARIS).
        </p>
      </div>

      {/* 6 Required Inputs Breakdown */}
      <div className="space-y-2">
        <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-600 font-bold px-1 block">
          Composite Inputs & Safety Weights
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
          {RISK_ENGINE_SPEC.inputs.map((inp) => (
            <div
              key={inp.name}
              className="p-2.5 rounded-xl bg-zinc-50 border border-zinc-200 space-y-0.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-zinc-950 font-bold">{inp.name}</span>
                <span className="text-black font-black">{inp.weight}</span>
              </div>
              <div className="text-[10px] text-zinc-500 truncate">
                Source: {inp.source}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Compliance Badge */}
      <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-[11px] font-mono text-zinc-500">
        <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
          <Shield className="w-3.5 h-3.5 text-emerald-600" />
          <span>POLARIS RIO Compliant</span>
        </div>
        <span className="text-zinc-800 font-medium">PC1 – PC7 Matrix Calibrated</span>
      </div>
    </div>
  );
};

