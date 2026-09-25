import React from 'react';
import {
  MODEL_INFORMATION_DATA,
  ModelInfoCard,
} from '@/data/explainabilityData';
import { Cpu, Info, CheckCircle2 } from 'lucide-react';

export const ModelArchitectureCard: React.FC = () => {
  return (
    <div className="bg-white border border-[#e0e0e0] rounded-[18px] p-6 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#f0f0f0]">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-[#0066cc]/10 text-[#0066cc]">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-[15px] font-semibold text-[#1d1d1f] tracking-tight">
              AI / ML Model Architecture & Pipeline Specifications
            </h3>
            <span className="text-[11px] font-mono text-[#86868b] uppercase tracking-wider font-semibold">
              Ensemble Cryospheric AI & Deterministic Optimization Stack
            </span>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full text-[11px] font-mono bg-[#f5f5f7] text-[#1d1d1f] border border-[#e0e0e0] font-semibold">
          MODELS ACTIVE
        </span>
      </div>

      {/* 4 Core Models Grid requested by Prompt */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MODEL_INFORMATION_DATA.map((model: ModelInfoCard) => (
          <div
            key={model.subsystem}
            className="p-4 rounded-xl bg-[#fafafc] border border-[#e0e0e0] space-y-2.5 hover:border-[#0066cc]/40 transition-all flex flex-col justify-between"
          >
            <div className="space-y-1.5">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#86868b] block font-semibold">
                    {model.subsystem} Subsystem
                  </span>
                  <h4 className="text-[13px] font-semibold font-mono text-[#1d1d1f]">
                    {model.modelName}
                  </h4>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-white text-[#1d1d1f] border border-[#e0e0e0] font-semibold">
                  {model.latency}
                </span>
              </div>

              <p className="text-[12px] text-[#424245] leading-relaxed font-normal">
                {model.purpose}
              </p>

              <div className="text-[11px] font-mono text-[#86868b]">
                <span>Architecture: </span>
                <span className="text-[#1d1d1f] font-semibold">{model.architecture}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-[#e0e0e0] flex items-center justify-between text-[11px] font-mono text-[#424245]">
              <div className="flex items-center gap-1">
                <span className="text-[#86868b]">Inputs:</span>
                <span className="text-[#1d1d1f] font-semibold">
                  {model.inputs.slice(0, 2).join(', ')}
                </span>
              </div>
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                {model.accuracyMetric.split('/')[0]}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Important Architecture Clarification Callout */}
      <div className="p-4 rounded-xl bg-[#fafafc] border border-[#e0e0e0] space-y-1.5 text-xs font-sans">
        <div className="flex items-center gap-2 text-[#1d1d1f] font-mono font-semibold text-[12px]">
          <Info className="w-4 h-4 text-[#0066cc] flex-shrink-0" />
          <span>Explainability & Routing Engine Distinction</span>
        </div>
        <p className="text-[#424245] leading-relaxed text-[12px] font-normal">
          <strong className="text-[#1d1d1f] font-semibold">SHAP Attributions</strong> explain feature sensitivities and environmental contributions for the <em>machine learning risk assessment model</em>. Meanwhile, the <em>A* + NSGA-II solver</em> performs deterministic multi-objective optimization across the continuous Pareto front using exact hydrodynamic and polar code cost formulations.
        </p>
      </div>
    </div>
  );
};

