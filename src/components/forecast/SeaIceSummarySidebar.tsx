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
    <div className="polar-panel p-5 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-polar-700/60">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Snowflake className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold font-sans text-slate-100">
              Forecast Summary
            </h3>
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">
              Spatiotemporal Concentration Matrix
            </span>
          </div>
        </div>

        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-ice-500/20 text-ice-300 border border-ice-500/30">
          {activeHorizon}
        </span>
      </div>

      {/* 4 Standard Horizon Progression Cards requested by Prompt */}
      <div className="space-y-2">
        <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold px-1">
          SIC Temporal Progression
        </div>

        <div className="grid grid-cols-2 gap-2">
          {horizonSteps.map((step) => {
            const isSelected = activeHorizon === step.horizon;
            return (
              <div
                key={step.horizon}
                className={`p-2.5 rounded-lg border transition-all ${
                  isSelected
                    ? 'bg-ice-950/40 border-ice-400 shadow-md shadow-ice-500/10'
                    : 'bg-polar-900/80 border-polar-700/50'
                }`}
              >
                <span className="text-[10px] font-mono text-slate-400 block truncate">
                  {step.label}
                </span>
                <div className="flex items-baseline justify-between mt-1">
                  <span className="text-lg font-bold font-sans text-slate-100">
                    {step.value}
                  </span>
                  <span
                    className={`text-[10px] font-mono ${
                      step.trend.startsWith('+')
                        ? 'text-amber-400'
                        : 'text-slate-400'
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
      <div className="p-3.5 rounded-lg bg-polar-900/90 border border-polar-700/60 space-y-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-slate-300 flex items-center gap-1.5 font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Model Confidence
          </span>
          <span className="text-emerald-400 font-bold text-sm">
            {currentSummary.confidencePct}%
          </span>
        </div>
        <div className="w-full h-1.5 rounded-full bg-polar-950 overflow-hidden">
          <div
            className="h-full rounded-full bg-emerald-400 transition-all duration-300"
            style={{ width: `${currentSummary.confidencePct}%` }}
          />
        </div>
        <span className="text-[10px] font-mono text-slate-400 block">
          ResUNet Ensemble Variance: ±3.8% MAE
        </span>
      </div>

      {/* Regional Sector Concentration Breakdown */}
      <div className="space-y-2 pt-1 border-t border-polar-800">
        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold px-1 flex items-center gap-1">
          <Compass className="w-3 h-3 text-ice-400" />
          Sector Breakdown ({activeHorizon})
        </span>

        <div className="space-y-1.5 text-xs font-mono">
          <div className="p-2 rounded bg-polar-900/60 border border-polar-700/40 flex items-center justify-between">
            <span className="text-slate-300">Eastern Approach:</span>
            <span className="text-ice-300 font-bold">{currentSummary.easternApproachPct}%</span>
          </div>

          <div className="p-2 rounded bg-polar-900/60 border border-polar-700/40 flex items-center justify-between">
            <span className="text-slate-300">Amery Shelf Suture:</span>
            <span className="text-cyan-300 font-bold">{currentSummary.amerySectorPct}%</span>
          </div>

          <div className="p-2 rounded bg-polar-900/60 border border-polar-700/40 flex items-center justify-between">
            <span className="text-slate-300">Outer Pack Drift:</span>
            <span className="text-emerald-300 font-bold">{currentSummary.outerDriftPct}%</span>
          </div>
        </div>
      </div>

      {/* Expansion Kinetics */}
      <div className="grid grid-cols-2 gap-2 text-xs font-mono">
        <div className="p-2 rounded bg-polar-900/60 border border-polar-700/40">
          <div className="text-[10px] text-slate-400 flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-amber-400" />
            EXPANSION RATE
          </div>
          <div className="text-slate-200 font-bold mt-0.5">
            +{currentSummary.expansionRatePctPerDay}% / day
          </div>
        </div>

        <div className="p-2 rounded bg-polar-900/60 border border-polar-700/40">
          <div className="text-[10px] text-slate-400 flex items-center gap-1">
            <Layers className="w-3 h-3 text-ice-400" />
            EST. THICKNESS
          </div>
          <div className="text-slate-200 font-bold mt-0.5">
            {currentSummary.estimatedMeanThicknessM} m
          </div>
        </div>
      </div>
    </div>
  );
};
