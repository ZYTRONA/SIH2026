import React from 'react';
import {
  CONFIDENCE_METRICS_DATA,
  ConfidenceMetric,
} from '@/data/explainabilityData';
import { ShieldCheck, Cpu, Database } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export const ConfidenceMetricsGrid: React.FC = () => {
  return (
    <TooltipProvider delayDuration={200}>
      <div className="bg-white border border-zinc-200/90 shadow-xs rounded-2xl p-5 space-y-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-zinc-100">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-black text-white">
              <ShieldCheck className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-bold font-sans text-zinc-950 tracking-tight">
                Model Confidence & Uncertainty Margins
              </h3>
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider font-semibold">
                Ensemble Validation & Cryospheric Ground-Truth Calibration
              </span>
            </div>
          </div>

          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-zinc-100 text-zinc-900 border border-zinc-300 font-bold self-start sm:self-auto">
            HIGH RELIABILITY
          </span>
        </div>

        {/* 3 Core Confidence Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CONFIDENCE_METRICS_DATA.map((metric: ConfidenceMetric) => (
            <Tooltip key={metric.id}>
              <TooltipTrigger asChild>
                <div className="p-4 rounded-xl bg-zinc-50/90 border border-zinc-200/80 space-y-3 relative overflow-hidden cursor-default hover:border-zinc-300 transition-colors">
                  {/* Top Score & Title */}
                  <div className="flex items-start justify-between">
                    <div className="space-y-0.5">
                      <span className="text-xs font-bold font-sans text-zinc-950 block">
                        {metric.title}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-500 font-semibold">
                        {metric.model.split(' ')[0]} Engine
                      </span>
                    </div>

                    <div className="text-right font-mono">
                      <span className="text-2xl font-black font-sans text-zinc-950 tabular-nums">
                        {metric.valuePct}%
                      </span>
                      <span className="text-[9px] text-zinc-500 block font-bold">CONFIDENCE</span>
                    </div>
                  </div>

                  {/* Radix UI Progress Indicator */}
                  <Progress value={metric.valuePct} className="h-1.5 bg-zinc-200" indicatorClassName="bg-black" />

                  {/* Source & Description Details */}
                  <div className="space-y-1 text-[10px] font-mono text-zinc-600 pt-2 border-t border-zinc-200/80">
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-500 flex items-center gap-1">
                        <Database className="w-3 h-3 text-zinc-400" />
                        Feed:
                      </span>
                      <span className="text-zinc-900 font-bold truncate">{metric.source.split('+')[0]}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-500 flex items-center gap-1">
                        <Cpu className="w-3 h-3 text-zinc-400" />
                        Horizon:
                      </span>
                      <span className="text-zinc-900 font-medium">{metric.sampleSize}</span>
                    </div>
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent side="top" className="text-xs font-mono max-w-xs">
                <p className="font-bold text-white mb-0.5">{metric.title} Validation</p>
                <p className="text-zinc-300 text-[11px] font-sans">{metric.description}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
};


