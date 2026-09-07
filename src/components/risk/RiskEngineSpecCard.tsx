import React from 'react';
import { RISK_ENGINE_SPEC } from '@/data/riskIntelligenceData';
import { Cpu, Shield, Info } from 'lucide-react';

export const RiskEngineSpecCard: React.FC = () => {
  return (
    <div className="polar-panel p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-polar-700/60">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded bg-ice-500/10 border border-ice-500/30 text-ice-400">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold font-sans text-slate-100">
              Risk Engine Specification
            </h3>
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">
              {RISK_ENGINE_SPEC.framework}
            </span>
          </div>
        </div>

        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-ice-500/15 text-ice-300 border border-ice-500/30 font-semibold">
          DETERMINISTIC
        </span>
      </div>

      {/* Mandatory Disclaimer requested by Prompt */}
      <div className="p-3 rounded-lg bg-polar-900/90 border border-polar-700/60 space-y-1 text-xs font-sans">
        <div className="flex items-center gap-1.5 text-ice-400 font-mono font-bold text-[11px]">
          <Info className="w-3.5 h-3.5 flex-shrink-0" />
          <span>Operational Safety Engine Note</span>
        </div>
        <p className="text-slate-300 leading-relaxed text-[11px]">
          Calculations are computed using deterministic mathematical formulations defined in the IMO Polar Code Polar Operational Limit Assessment Risk Indexing System (POLARIS).
        </p>
      </div>

      {/* 6 Required Inputs Breakdown */}
      <div className="space-y-2">
        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold px-1 block">
          Composite Inputs & Safety Weights
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
          {RISK_ENGINE_SPEC.inputs.map((inp) => (
            <div
              key={inp.name}
              className="p-2.5 rounded bg-polar-900/60 border border-polar-700/40 space-y-0.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-slate-200 font-bold">{inp.name}</span>
                <span className="text-cyan-400 font-bold">{inp.weight}</span>
              </div>
              <div className="text-[10px] text-slate-400 truncate">
                Source: {inp.source}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Compliance Badge */}
      <div className="pt-2 border-t border-polar-700/50 flex items-center justify-between text-[11px] font-mono text-slate-400">
        <div className="flex items-center gap-1.5 text-emerald-400">
          <Shield className="w-3.5 h-3.5" />
          <span>POLARIS RIO Compliant</span>
        </div>
        <span className="text-slate-300">PC1 – PC7 Matrix Calibrated</span>
      </div>
    </div>
  );
};
