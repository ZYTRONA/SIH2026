import React from 'react';
import { RISK_ENGINE_SPEC } from '@/data/riskIntelligenceData';
import { Cpu, Shield, Info } from 'lucide-react';

export const RiskEngineSpecCard: React.FC = () => {
  return (
    <div className="bg-white border border-slate-200/90 shadow-xs rounded-xl p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-sky-50 border border-sky-200 text-sky-700">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold font-sans text-slate-900">
              Risk Engine Specification
            </h3>
            <span className="text-[10px] font-mono text-sky-700 uppercase tracking-wider font-semibold">
              {RISK_ENGINE_SPEC.framework}
            </span>
          </div>
        </div>

        <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono bg-sky-50 text-sky-700 border border-sky-200 font-semibold">
          DETERMINISTIC
        </span>
      </div>

      {/* Mandatory Disclaimer */}
      <div className="p-3.5 rounded-lg bg-sky-50/70 border border-sky-200/80 space-y-1 text-xs font-sans">
        <div className="flex items-center gap-1.5 text-sky-700 font-mono font-bold text-[11px]">
          <Info className="w-3.5 h-3.5 flex-shrink-0" />
          <span>Operational Safety Engine Note</span>
        </div>
        <p className="text-slate-700 leading-relaxed text-[11px] font-medium">
          Calculations are computed using deterministic mathematical formulations defined in the IMO Polar Code Polar Operational Limit Assessment Risk Indexing System (POLARIS).
        </p>
      </div>

      {/* 6 Required Inputs Breakdown */}
      <div className="space-y-2">
        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold px-1 block">
          Composite Inputs & Safety Weights
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
          {RISK_ENGINE_SPEC.inputs.map((inp) => (
            <div
              key={inp.name}
              className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 space-y-0.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-slate-900 font-bold">{inp.name}</span>
                <span className="text-sky-700 font-bold">{inp.weight}</span>
              </div>
              <div className="text-[10px] text-slate-500 truncate">
                Source: {inp.source}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Compliance Badge */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-500">
        <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
          <Shield className="w-3.5 h-3.5" />
          <span>POLARIS RIO Compliant</span>
        </div>
        <span className="text-slate-700 font-medium">PC1 – PC7 Matrix Calibrated</span>
      </div>
    </div>
  );
};
