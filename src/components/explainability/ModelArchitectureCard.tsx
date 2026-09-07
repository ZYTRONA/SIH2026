import React from 'react';
import {
  MODEL_INFORMATION_DATA,
  ModelInfoCard,
} from '@/data/explainabilityData';
import { Cpu, Info, CheckCircle2 } from 'lucide-react';

export const ModelArchitectureCard: React.FC = () => {
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
              AI / ML Model Architecture & Pipeline Specifications
            </h3>
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">
              Ensemble Cryospheric AI & Deterministic Optimization Stack
            </span>
          </div>
        </div>

        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-ice-500/15 text-ice-300 border border-ice-500/30 font-semibold">
          MODELS ACTIVE
        </span>
      </div>

      {/* 4 Core Models Grid requested by Prompt */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {MODEL_INFORMATION_DATA.map((model: ModelInfoCard) => (
          <div
            key={model.subsystem}
            className="p-4 rounded-xl bg-polar-900/80 border border-polar-700/50 space-y-2.5 hover:border-cyan-500/40 transition-all flex flex-col justify-between"
          >
            <div className="space-y-1.5">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-semibold">
                    {model.subsystem} Subsystem
                  </span>
                  <h4 className="text-sm font-bold font-mono text-ice-300">
                    {model.modelName}
                  </h4>
                </div>
                <span className="px-2 py-0.2 rounded text-[10px] font-mono bg-polar-950 text-cyan-300 border border-polar-700">
                  {model.latency}
                </span>
              </div>

              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                {model.purpose}
              </p>

              <div className="text-[10px] font-mono text-slate-400">
                <span className="text-slate-400">Architecture: </span>
                <span className="text-slate-200">{model.architecture}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-polar-700/40 flex items-center justify-between text-[10px] font-mono text-slate-400">
              <div className="flex items-center gap-1">
                <span>Inputs:</span>
                <span className="text-cyan-400 font-semibold">
                  {model.inputs.slice(0, 2).join(', ')}
                </span>
              </div>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                {model.accuracyMetric.split('/')[0]}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Important Architecture Clarification Callout as required by Prompt */}
      <div className="p-3.5 rounded-xl bg-polar-900/90 border border-polar-700/60 space-y-1.5 text-xs font-sans">
        <div className="flex items-center gap-2 text-cyan-300 font-mono font-bold text-[11px]">
          <Info className="w-4 h-4 text-cyan-400 flex-shrink-0" />
          <span>Explainability & Routing Engine Distinction</span>
        </div>
        <p className="text-slate-300 leading-relaxed text-[11px]">
          <strong className="text-ice-300">SHAP Attributions</strong> explain feature sensitivities and environmental contributions for the <em>machine learning risk assessment model</em>. Meanwhile, the <em>A* + NSGA-II solver</em> performs deterministic multi-objective optimization across the continuous Pareto front using exact hydrodynamic and polar code cost formulations.
        </p>
      </div>
    </div>
  );
};
