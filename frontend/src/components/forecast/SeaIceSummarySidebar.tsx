import React from 'react';
import {
  ForecastHorizonKey,
  SEA_ICE_SUMMARIES,
} from '@/data/seaIceData';
import {
  Snowflake,
  TrendingUp,
  ShieldCheck,
  Layers,
  Compass,
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface SeaIceSummarySidebarProps {
  activeHorizon: ForecastHorizonKey;
}

export const SeaIceSummarySidebar: React.FC<SeaIceSummarySidebarProps> = ({
  activeHorizon,
}) => {
  const currentSummary = SEA_ICE_SUMMARIES[activeHorizon];

  const horizonSteps: Array<{
    label: string;
    horizon: ForecastHorizonKey;
    value: string;
    trend: string;
  }> = [
    { label: 'Current Obs', horizon: 'Current', value: '67%', trend: 'Baseline' },
    { label: '+24h Horizon', horizon: '+24h', value: '70%', trend: '+3.0%' },
    { label: '+48h Horizon', horizon: '+48h', value: '74%', trend: '+4.0%' },
    { label: '+72h Horizon', horizon: '+72h', value: '76%', trend: '+2.0%' },
  ];

  return (
    <div className="bg-white border border-[#e0e0e0] rounded-[18px] p-5 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#f0f0f0]">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-full bg-[#f5f5f7] border border-[#e0e0e0] text-[#0066cc]">
            <Snowflake className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-[15px] font-semibold text-[#1d1d1f] tracking-tight">
              Forecast Summary
            </h3>
            <span className="text-[11px] text-neutral-500 font-normal">
              Spatiotemporal Concentration Matrix
            </span>
          </div>
        </div>

        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#f0f7ff] text-[#0066cc] border border-[#d0e6ff]">
          {activeHorizon}
        </span>
      </div>

      {/* 4 Standard Horizon Progression Cards */}
      <div className="space-y-2">
        <div className="text-[11px] uppercase tracking-wider text-neutral-500 font-semibold px-1">
          SIC Temporal Progression
        </div>

        <div className="grid grid-cols-2 gap-2">
          {horizonSteps.map((step) => {
            const isSelected = activeHorizon === step.horizon;
            return (
              <div
                key={step.horizon}
                className={`p-3 rounded-[14px] border transition-all ${
                  isSelected
                    ? 'bg-[#f0f7ff] border-[#0066cc]'
                    : 'bg-[#fafafc] border-[#e0e0e0]'
                }`}
              >
                <span className="text-[11px] text-neutral-500 block truncate font-normal">
                  {step.label}
                </span>
                <div className="flex items-baseline justify-between mt-1">
                  <span className={`text-[18px] font-semibold tabular-nums ${isSelected ? 'text-[#0066cc]' : 'text-[#1d1d1f]'}`}>
                    {step.value}
                  </span>
                  <span
                    className={`text-[11px] font-normal ${
                      step.trend.startsWith('+')
                        ? 'text-amber-700'
                        : 'text-neutral-500'
                    }`}
                  >
                    {step.trend}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Model Confidence Metric Card */}
      <div className="p-4 rounded-[14px] bg-[#fafafc] border border-[#e0e0e0] space-y-2">
        <div className="flex items-center justify-between text-[12px]">
          <span className="text-[#1d1d1f] flex items-center gap-1.5 font-semibold">
            <ShieldCheck className="w-4 h-4 text-[#0066cc]" />
            Model Confidence
          </span>
          <span className="text-[#1d1d1f] font-semibold text-[15px] tabular-nums">
            {currentSummary.confidencePct}%
          </span>
        </div>
        <Progress value={currentSummary.confidencePct} className="h-1.5 bg-[#e0e0e0]" indicatorClassName="bg-[#0066cc]" />
        <span className="text-[11px] text-neutral-500 block font-normal">
          ResUNet Ensemble Variance: ±3.8% MAE
        </span>
      </div>

      {/* Regional Sector Concentration Breakdown */}
      <div className="space-y-2 pt-1 border-t border-[#f0f0f0]">
        <span className="text-[11px] uppercase tracking-wider text-neutral-500 font-semibold px-1 flex items-center gap-1">
          <Compass className="w-3.5 h-3.5 text-[#0066cc]" />
          Sector Breakdown ({activeHorizon})
        </span>

        <div className="space-y-1.5 text-[12px]">
          <div className="p-2.5 rounded-[12px] bg-[#fafafc] border border-[#e0e0e0] flex items-center justify-between">
            <span className="text-neutral-600 font-normal">Eastern Approach:</span>
            <span className="text-[#1d1d1f] font-semibold tabular-nums">{currentSummary.easternApproachPct}%</span>
          </div>

          <div className="p-2.5 rounded-[12px] bg-[#fafafc] border border-[#e0e0e0] flex items-center justify-between">
            <span className="text-neutral-600 font-normal">Amery Shelf Suture:</span>
            <span className="text-[#1d1d1f] font-semibold tabular-nums">{currentSummary.amerySectorPct}%</span>
          </div>

          <div className="p-2.5 rounded-[12px] bg-[#fafafc] border border-[#e0e0e0] flex items-center justify-between">
            <span className="text-neutral-600 font-normal">Outer Pack Drift:</span>
            <span className="text-[#1d1d1f] font-semibold tabular-nums">{currentSummary.outerDriftPct}%</span>
          </div>
        </div>
      </div>

      {/* Expansion Kinetics */}
      <div className="grid grid-cols-2 gap-2 text-[12px]">
        <div className="p-3 rounded-[12px] bg-[#fafafc] border border-[#e0e0e0]">
          <div className="text-[11px] text-neutral-500 flex items-center gap-1 font-normal">
            <TrendingUp className="w-3 h-3 text-amber-600" />
            EXPANSION RATE
          </div>
          <div className="text-[#1d1d1f] font-semibold mt-0.5 tabular-nums text-[14px]">
            +{currentSummary.expansionRatePctPerDay}% / day
          </div>
        </div>

        <div className="p-3 rounded-[12px] bg-[#fafafc] border border-[#e0e0e0]">
          <div className="text-[11px] text-neutral-500 flex items-center gap-1 font-normal">
            <Layers className="w-3 h-3 text-[#0066cc]" />
            EST. THICKNESS
          </div>
          <div className="text-[#1d1d1f] font-semibold mt-0.5 tabular-nums text-[14px]">
            {currentSummary.estimatedMeanThicknessM} m
          </div>
        </div>
      </div>
    </div>
  );
};
