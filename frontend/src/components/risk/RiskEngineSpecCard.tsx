import React from 'react';
import { RISK_ENGINE_SPEC } from '@/data/riskIntelligenceData';
import { Cpu, Shield, Info } from 'lucide-react';

export const RiskEngineSpecCard: React.FC = () => {
  return (
    <div className="bg-white border border-[#e0e0e0] rounded-[18px] p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#f0f0f0]">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-full bg-[#f5f5f7] border border-[#e0e0e0] text-[#0066cc]">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-[15px] font-semibold text-[#1d1d1f] tracking-tight">
              Risk Engine Specification
            </h3>
            <span className="text-[11px] text-neutral-500 font-normal">
              {RISK_ENGINE_SPEC.framework}
            </span>
          </div>
        </div>

        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#f0f7ff] text-[#0066cc] border border-[#d0e6ff]">
          DETERMINISTIC
        </span>
      </div>

      {/* Mandatory Disclaimer */}
      <div className="p-3.5 rounded-[14px] bg-[#fafafc] border border-[#e0e0e0] space-y-1 text-[12px]">
        <div className="flex items-center gap-1.5 text-[#1d1d1f] font-semibold text-[11px]">
          <Info className="w-3.5 h-3.5 shrink-0 text-[#0066cc]" />
          <span>Operational Safety Engine Note</span>
        </div>
        <p className="text-neutral-600 leading-relaxed text-[12px] font-normal">
          Calculations are computed using deterministic mathematical formulations defined in the IMO Polar Code Polar Operational Limit Assessment Risk Indexing System (POLARIS).
        </p>
      </div>

      {/* 6 Required Inputs Breakdown */}
      <div className="space-y-2">
        <span className="text-[11px] uppercase tracking-wider text-neutral-500 font-semibold px-1 block">
          Composite Inputs & Safety Weights
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[12px]">
          {RISK_ENGINE_SPEC.inputs.map((inp) => (
            <div
              key={inp.name}
              className="p-3 rounded-[12px] bg-[#fafafc] border border-[#e0e0e0] space-y-0.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-[#1d1d1f] font-semibold">{inp.name}</span>
                <span className="text-[#0066cc] font-semibold">{inp.weight}</span>
              </div>
              <div className="text-[11px] text-neutral-500 truncate font-normal">
                Source: {inp.source}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Compliance Badge */}
      <div className="pt-2 border-t border-[#f0f0f0] flex items-center justify-between text-[11px] text-neutral-500">
        <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
          <Shield className="w-3.5 h-3.5 text-emerald-600" />
          <span>POLARIS RIO Compliant</span>
        </div>
        <span className="text-neutral-600 font-normal">PC1 – PC7 Matrix Calibrated</span>
      </div>
    </div>
  );
};

