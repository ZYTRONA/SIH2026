import React from 'react';
import {
  MISSION_RISK_SUMMARY,
  RiskTier,
} from '@/data/riskIntelligenceData';
import {
  Shield,
  Snowflake,
  Mountain,
  Wind,
  Compass,
  Anchor,
  TrendingUp,
  Minus,
} from 'lucide-react';

const iconMap = {
  Snowflake,
  Mountain,
  Wind,
  Compass,
  Anchor,
  Shield,
};

const getTierColor = (tier: RiskTier) => {
  switch (tier) {
    case 'CRITICAL':
      return { bar: 'bg-rose-500', text: 'text-rose-400', badge: 'bg-rose-500/15 border-rose-500/30' };
    case 'HIGH':
      return { bar: 'bg-orange-500', text: 'text-orange-400', badge: 'bg-orange-500/15 border-orange-500/30' };
    case 'MODERATE':
      return { bar: 'bg-amber-500', text: 'text-amber-400', badge: 'bg-amber-500/15 border-amber-500/30' };
    case 'LOW':
      return { bar: 'bg-cyan-400', text: 'text-cyan-300', badge: 'bg-cyan-500/15 border-cyan-500/30' };
    case 'SAFE':
    default:
      return { bar: 'bg-emerald-400', text: 'text-emerald-300', badge: 'bg-emerald-500/15 border-emerald-500/30' };
  }
};

export const RiskScoreBreakdown: React.FC = () => {
  const { overallScore, overallTier, rioMargin, vesselCapability, subsystems } =
    MISSION_RISK_SUMMARY;

  const overallColors = getTierColor(overallTier);

  return (
    <div className="polar-panel p-5 space-y-5">
      {/* 1. Overall Composite Risk Header Block */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-polar-700/60">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold font-sans text-slate-100">
                Mission Risk Summary
              </h3>
              <span
                className={`px-2 py-0.2 rounded text-[10px] font-mono font-bold border ${overallColors.badge} ${overallColors.text}`}
              >
                {overallTier} RISK
              </span>
            </div>
            <span className="text-[11px] font-mono text-slate-400">
              Vessel: {vesselCapability} | Margin: {rioMargin}
            </span>
          </div>
        </div>

        {/* Big Score Readout */}
        <div className="flex items-baseline gap-1.5 self-start sm:self-auto bg-polar-900/90 px-3.5 py-1.5 rounded-lg border border-polar-700/60">
          <span className="text-2xl font-bold font-sans text-slate-100">
            {overallScore}
          </span>
          <span className="text-xs font-mono text-slate-400">/ 100</span>
        </div>
      </div>

      {/* 2. Subsystem Clean Horizontal Visualizations requested by Prompt */}
      <div className="space-y-3.5">
        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold px-1 block">
          Composite Risk Breakdown by Hazard Subsystem
        </span>

        <div className="space-y-3">
          {subsystems.map((sub) => {
            const Icon = iconMap[sub.iconName] || Shield;
            const colors = getTierColor(sub.tier);

            return (
              <div
                key={sub.id}
                className="p-3 rounded-lg bg-polar-900/70 border border-polar-700/40 space-y-2 transition-all hover:border-polar-600/80"
              >
                {/* Metric Label and Score */}
                <div className="flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <Icon className={`w-3.5 h-3.5 ${colors.text}`} />
                    <span className="text-slate-200 font-semibold">{sub.name}</span>
                    <span className="text-[10px] text-slate-400">({sub.weightPct}% weight)</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-400 flex items-center gap-1">
                      {sub.trend === 'increasing' ? (
                        <TrendingUp className="w-3 h-3 text-amber-400" />
                      ) : (
                        <Minus className="w-3 h-3 text-slate-400" />
                      )}
                      {sub.trendDelta}
                    </span>
                    <span className="text-sm font-bold text-slate-100 font-sans">
                      {sub.score}
                    </span>
                  </div>
                </div>

                {/* Horizontal Progress Bar */}
                <div className="w-full h-2 rounded-full bg-polar-950 overflow-hidden border border-polar-700/40 relative">
                  <div
                    className={`h-full rounded-full ${colors.bar} transition-all duration-500`}
                    style={{ width: `${sub.score}%` }}
                  />
                  {/* Subtle threshold marker at 50% */}
                  <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-polar-700/60" />
                </div>

                {/* Detail text */}
                <div className="text-[10px] font-mono text-slate-400 flex items-center justify-between">
                  <span className="truncate">{sub.description}</span>
                  <span className={`font-bold ${colors.text}`}>{sub.tier}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
