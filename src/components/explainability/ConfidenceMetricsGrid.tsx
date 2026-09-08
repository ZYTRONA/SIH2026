import React from 'react';
import {
  CONFIDENCE_METRICS_DATA,
  ConfidenceMetric,
} from '@/data/explainabilityData';
import { ShieldCheck, Cpu, Database } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export const ConfidenceMetricsGrid: React.FC = () => {
  return (
    <div className="bg-white border border-[#e0e0e0] rounded-[18px] p-6 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#f0f0f0]">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-[#0066cc]/10 text-[#0066cc]">
            <ShieldCheck className="w-4 h-4 text-[#0066cc]" />
          </div>
          <div>
            <h3 className="text-[15px] font-semibold text-[#1d1d1f] tracking-tight">
              Model Confidence & Uncertainty Margins
            </h3>
            <span className="text-[11px] font-mono text-[#86868b] uppercase tracking-wider font-semibold">
              Ensemble Validation & Cryospheric Ground-Truth Calibration
            </span>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full text-[11px] font-mono bg-emerald-500/10 text-emerald-800 border border-emerald-500/20 font-semibold self-start sm:self-auto">
          HIGH RELIABILITY
        </span>
      </div>

      {/* 3 Core Confidence Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {CONFIDENCE_METRICS_DATA.map((metric: ConfidenceMetric) => (
          <div
            key={metric.id}
            className="p-5 rounded-xl bg-[#fafafc] border border-[#e0e0e0] space-y-3 relative overflow-hidden cursor-default hover:border-[#0066cc]/40 transition-colors"
          >
            {/* Top Score & Title */}
            <div className="flex items-start justify-between">
              <div className="space-y-0.5">
                <span className="text-[13px] font-semibold text-[#1d1d1f] block">
                  {metric.title}
                </span>
                <span className="text-[11px] font-mono text-[#86868b] font-normal">
                  {metric.model.split(' ')[0]} Engine
                </span>
              </div>

              <div className="text-right font-mono">
                <span className="text-[24px] font-semibold text-[#1d1d1f] tabular-nums">
                  {metric.valuePct}%
                </span>
                <span className="text-[10px] text-[#86868b] block font-semibold">CONFIDENCE</span>
              </div>
            </div>

            {/* Radix UI Progress Indicator with Action Blue */}
            <Progress value={metric.valuePct} className="h-1.5 bg-[#e0e0e0]" indicatorClassName="bg-[#0066cc]" />

            {/* Source & Description Details */}
            <div className="space-y-1 text-[11px] font-mono text-[#424245] pt-2 border-t border-[#e0e0e0]">
              <div className="flex items-center justify-between">
                <span className="text-[#86868b] flex items-center gap-1 font-normal">
                  <Database className="w-3 h-3 text-[#86868b]" />
                  Feed:
                </span>
                <span className="text-[#1d1d1f] font-semibold truncate">{metric.source.split('+')[0]}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#86868b] flex items-center gap-1 font-normal">
                  <Cpu className="w-3 h-3 text-[#86868b]" />
                  Horizon:
                </span>
                <span className="text-[#1d1d1f] font-semibold">{metric.sampleSize}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


