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
      return { bar: 'bg-rose-600', text: 'text-rose-900', badge: 'bg-rose-100 text-rose-900 border-rose-300' };
    case 'HIGH':
      return { bar: 'bg-orange-600', text: 'text-orange-900', badge: 'bg-orange-100 text-orange-900 border-orange-300' };
    case 'MODERATE':
      return { bar: 'bg-amber-600', text: 'text-amber-900', badge: 'bg-amber-100 text-amber-900 border-amber-300' };
    case 'LOW':
      return { bar: 'bg-zinc-800', text: 'text-zinc-900', badge: 'bg-zinc-100 text-zinc-900 border-zinc-300' };
    case 'SAFE':
    default:
      return { bar: 'bg-emerald-600', text: 'text-emerald-900', badge: 'bg-emerald-100 text-emerald-900 border-emerald-300' };
  }
};

export const RiskScoreBreakdown: React.FC = () => {
  const { overallScore, overallTier, rioMargin, vesselCapability, subsystems } =
    MISSION_RISK_SUMMARY;

  const overallColors = getTierColor(overallTier);

  return (
    <div className="bg-white border border-zinc-200/90 shadow-xs rounded-xl p-5 space-y-5">
      {/* 1. Overall Composite Risk Header Block */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-100">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-black text-white">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold font-sans text-zinc-950">
                Mission Risk Summary
              </h3>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${overallColors.badge}`}
              >
                {overallTier} RISK
              </span>
            </div>
            <span className="text-[11px] font-mono text-zinc-600">
              Vessel: {vesselCapability} | Margin: {rioMargin}
            </span>
          </div>
        </div>

        {/* Big Score Readout */}
        <div className="flex items-baseline gap-1.5 self-start sm:self-auto bg-zinc-50 px-3.5 py-1.5 rounded-xl border border-zinc-200">
          <span className="text-2xl font-black font-sans text-zinc-950">
            {overallScore}
          </span>
          <span className="text-xs font-mono text-zinc-600">/ 100</span>
        </div>
      </div>

      {/* 2. Subsystem Clean Horizontal Visualizations */}
      <div className="space-y-3.5">
        <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-600 font-bold px-1 block">
          Composite Risk Breakdown by Hazard Subsystem
        </span>

        <div className="space-y-3">
          {subsystems.map((sub) => {
            const Icon = iconMap[sub.iconName] || Shield;
            const colors = getTierColor(sub.tier);

            return (
              <div
                key={sub.id}
                className="p-3.5 rounded-xl bg-zinc-50/90 border border-zinc-200 space-y-2.5 transition-all hover:border-zinc-300"
              >
                {/* Metric Label and Score */}
                <div className="flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <Icon className="w-3.5 h-3.5 text-zinc-700" />
                    <span className="text-zinc-950 font-bold">{sub.name}</span>
                    <span className="text-[10px] text-zinc-600 font-medium">({sub.weightPct}% weight)</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-zinc-600 flex items-center gap-1 font-medium">
                      {sub.trend === 'increasing' ? (
                        <TrendingUp className="w-3 h-3 text-amber-700" />
                      ) : (
                        <Minus className="w-3 h-3 text-zinc-400" />
                      )}
                      {sub.trendDelta}
                    </span>
                    <span className="text-sm font-black text-zinc-950 font-sans">
                      {sub.score}
                    </span>
                  </div>
                </div>

                {/* Horizontal Progress Bar */}
                <div className="w-full h-2 rounded-full bg-zinc-200 overflow-hidden border border-zinc-300 relative">
                  <div
                    className={`h-full rounded-full ${colors.bar} transition-all duration-500`}
                    style={{ width: `${sub.score}%` }}
                  />
                  {/* Subtle threshold marker at 50% */}
                  <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-zinc-400" />
                </div>

                {/* Detail text */}
                <div className="text-[10px] font-mono text-zinc-600 flex items-center justify-between">
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

