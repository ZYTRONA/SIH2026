import React from 'react';
import {
  CONFIDENCE_METRICS_DATA,
  ConfidenceMetric,
} from '@/data/explainabilityData';
import { ShieldCheck, Cpu, Database } from 'lucide-react';

export const ConfidenceMetricsGrid: React.FC = () => {
  return (
    <div className="polar-panel p-5 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-polar-700/60">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold font-sans text-slate-100">
              Model Confidence & Uncertainty Margins
            </h3>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
              Ensemble Validation & Cryospheric Ground-Truth Calibration
            </span>
          </div>
        </div>

        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-semibold self-start sm:self-auto">
          HIGH RELIABILITY
        </span>
      </div>

      {/* 3 Core Confidence Cards requested by Prompt */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {CONFIDENCE_METRICS_DATA.map((metric: ConfidenceMetric) => (
          <div
            key={metric.id}
            className="p-4 rounded-xl bg-polar-900/80 border border-polar-700/50 space-y-3 relative overflow-hidden"
          >
            {/* Top Score & Title */}
            <div className="flex items-start justify-between">
              <div className="space-y-0.5">
                <span className="text-xs font-bold font-sans text-slate-100 block">
                  {metric.title}
                </span>
                <span className="text-[10px] font-mono text-cyan-400">
                  {metric.model.split(' ')[0]} Engine
                </span>
              </div>

              <div className="text-right font-mono">
                <span className="text-2xl font-bold font-sans text-emerald-400">
                  {metric.valuePct}%
                </span>
                <span className="text-[9px] text-slate-400 block">CONFIDENCE</span>
              </div>
            </div>

            {/* Circular or Bar Progress Indicator */}
            <div className="w-full h-2 rounded-full bg-polar-950 overflow-hidden border border-polar-700/40">
              <div
                className="h-full rounded-full bg-emerald-400 transition-all duration-500"
                style={{ width: `${metric.valuePct}%` }}
              />
            </div>

            {/* Source & Description Details */}
            <div className="space-y-1 text-[10px] font-mono text-slate-300 pt-1 border-t border-polar-800">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-1">
                  <Database className="w-3 h-3 text-slate-400" />
                  Feed:
                </span>
                <span className="text-slate-200 truncate">{metric.source.split('+')[0]}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-1">
                  <Cpu className="w-3 h-3 text-slate-400" />
                  Horizon:
                </span>
                <span className="text-slate-200">{metric.sampleSize}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
