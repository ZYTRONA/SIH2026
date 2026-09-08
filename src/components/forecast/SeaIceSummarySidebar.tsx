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
    { label: 'Current Observation', horizon: 'Current', value: '67%', trend: 'Baseline' },
    { label: '+24h Horizon', horizon: '+24h', value: '70%', trend: '+3.0%' },
    { label: '+48h Horizon', horizon: '+48h', value: '74%', trend: '+4.0%' },
    { label: '+72h Horizon', horizon: '+72h', value: '76%', trend: '+2.0%' },
  ];

  return (
    <div className="bg-white border border-zinc-200/90 rounded-xl p-5 space-y-5 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-zinc-100 border border-zinc-200 text-zinc-900">
            <Snowflake className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold font-sans text-zinc-950">
              Forecast Summary
            </h3>
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider font-bold">
              Spatiotemporal Concentration Matrix
            </span>
          </div>
        </div>

        <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-black text-white shadow-xs">
          {activeHorizon}
        </span>
      </div>

      {/* 4 Standard Horizon Progression Cards */}
      <div className="space-y-2">
        <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-bold px-1">
          SIC Temporal Progression
        </div>

        <div className="grid grid-cols-2 gap-2">
          {horizonSteps.map((step) => {
            const isSelected = activeHorizon === step.horizon;
            return (
              <div
                key={step.horizon}
                className={`p-2.5 rounded-xl border transition-all ${
                  isSelected
                    ? 'bg-zinc-50 border-black shadow-xs ring-1 ring-black'
                    : 'bg-zinc-50/50 border-zinc-200'
                }`}
              >
                <span className="text-[10px] font-mono text-zinc-500 block truncate font-medium">
                  {step.label}
                </span>
                <div className="flex items-baseline justify-between mt-1">
                  <span className="text-lg font-extrabold font-sans text-zinc-950">
                    {step.value}
                  </span>
                  <span
                    className={`text-[10px] font-mono font-bold ${
                      step.trend.startsWith('+')
                        ? 'text-amber-900'
                        : 'text-zinc-500'
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
      <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 space-y-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-zinc-950 flex items-center gap-1.5 font-bold">
            <ShieldCheck className="w-4 h-4 text-black" />
            Model Confidence
          </span>
          <span className="text-zinc-950 font-extrabold text-sm">
            {currentSummary.confidencePct}%
          </span>
        </div>
        <div className="w-full h-1.5 rounded-full bg-zinc-200 overflow-hidden">
          <div
            className="h-full rounded-full bg-black transition-all duration-300"
            style={{ width: `${currentSummary.confidencePct}%` }}
          />
        </div>
        <span className="text-[10px] font-mono text-zinc-500 block font-medium">
          ResUNet Ensemble Variance: ±3.8% MAE
        </span>
      </div>

      {/* Regional Sector Concentration Breakdown */}
      <div className="space-y-2 pt-1 border-t border-zinc-100">
        <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-bold px-1 flex items-center gap-1">
          <Compass className="w-3.5 h-3.5 text-black" />
          Sector Breakdown ({activeHorizon})
        </span>

        <div className="space-y-1.5 text-xs font-mono">
          <div className="p-2 rounded-lg bg-zinc-50 border border-zinc-200 flex items-center justify-between">
            <span className="text-zinc-700 font-medium">Eastern Approach:</span>
            <span className="text-zinc-950 font-bold">{currentSummary.easternApproachPct}%</span>
          </div>

          <div className="p-2 rounded-lg bg-zinc-50 border border-zinc-200 flex items-center justify-between">
            <span className="text-zinc-700 font-medium">Amery Shelf Suture:</span>
            <span className="text-zinc-950 font-bold">{currentSummary.amerySectorPct}%</span>
          </div>

          <div className="p-2 rounded-lg bg-zinc-50 border border-zinc-200 flex items-center justify-between">
            <span className="text-zinc-700 font-medium">Outer Pack Drift:</span>
            <span className="text-zinc-950 font-bold">{currentSummary.outerDriftPct}%</span>
          </div>
        </div>
      </div>

      {/* Expansion Kinetics */}
      <div className="grid grid-cols-2 gap-2 text-xs font-mono">
        <div className="p-2.5 rounded-lg bg-zinc-50 border border-zinc-200">
          <div className="text-[10px] text-zinc-500 flex items-center gap-1 font-medium">
            <TrendingUp className="w-3 h-3 text-amber-600" />
            EXPANSION RATE
          </div>
          <div className="text-zinc-950 font-bold mt-0.5">
            +{currentSummary.expansionRatePctPerDay}% / day
          </div>
        </div>

        <div className="p-2.5 rounded-lg bg-zinc-50 border border-zinc-200">
          <div className="text-[10px] text-zinc-500 flex items-center gap-1 font-medium">
            <Layers className="w-3 h-3 text-zinc-700" />
            EST. THICKNESS
          </div>
          <div className="text-zinc-950 font-bold mt-0.5">
            {currentSummary.estimatedMeanThicknessM} m
          </div>
        </div>
      </div>
    </div>
  );
};
