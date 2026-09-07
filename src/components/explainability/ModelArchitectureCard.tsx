import React from 'react';
import {
  MODEL_INFORMATION_DATA,
  ModelInfoCard,
} from '@/data/explainabilityData';
import { Cpu, Info, CheckCircle2 } from 'lucide-react';

export const ModelArchitectureCard: React.FC = () => {
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
              AI / ML Model Architecture & Pipeline Specifications
            </h3>
            <span className="text-[10px] font-mono text-sky-700 uppercase tracking-wider font-semibold">
              Ensemble Cryospheric AI & Deterministic Optimization Stack
            </span>
          </div>
        </div>

        <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono bg-sky-50 text-sky-700 border border-sky-200 font-semibold">
          MODELS ACTIVE
        </span>
      </div>

      {/* 4 Core Models Grid requested by Prompt */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {MODEL_INFORMATION_DATA.map((model: ModelInfoCard) => (
          <div
            key={model.subsystem}
            className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5 hover:border-sky-300 transition-all flex flex-col justify-between"
          >
            <div className="space-y-1.5">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block font-semibold">
                    {model.subsystem} Subsystem
                  </span>
                  <h4 className="text-sm font-bold font-mono text-slate-900">
                    {model.modelName}
                  </h4>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white text-sky-700 border border-slate-200 font-semibold shadow-2xs">
                  {model.latency}
                </span>
              </div>

              <p className="text-xs text-slate-700 font-sans leading-relaxed font-medium">
                {model.purpose}
              </p>

              <div className="text-[10px] font-mono text-slate-500">
                <span className="text-slate-500">Architecture: </span>
                <span className="text-slate-900 font-semibold">{model.architecture}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[10px] font-mono text-slate-600">
              <div className="flex items-center gap-1">
                <span>Inputs:</span>
                <span className="text-sky-700 font-semibold">
                  {model.inputs.slice(0, 2).join(', ')}
                </span>
              </div>
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                {model.accuracyMetric.split('/')[0]}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Important Architecture Clarification Callout */}
      <div className="p-3.5 rounded-xl bg-sky-50/70 border border-sky-200/80 space-y-1.5 text-xs font-sans">
        <div className="flex items-center gap-2 text-sky-800 font-mono font-bold text-[11px]">
          <Info className="w-4 h-4 text-sky-600 flex-shrink-0" />
          <span>Explainability & Routing Engine Distinction</span>
        </div>
        <p className="text-slate-700 leading-relaxed text-[11px] font-medium">
          <strong className="text-sky-900">SHAP Attributions</strong> explain feature sensitivities and environmental contributions for the <em>machine learning risk assessment model</em>. Meanwhile, the <em>A* + NSGA-II solver</em> performs deterministic multi-objective optimization across the continuous Pareto front using exact hydrodynamic and polar code cost formulations.
        </p>
      </div>
    </div>
  );
};
