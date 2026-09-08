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
      return { bar: 'bg-rose-600', text: 'text-rose-700', badge: 'bg-rose-50 text-rose-700 border-rose-200' };
    case 'HIGH':
      return { bar: 'bg-amber-600', text: 'text-amber-700', badge: 'bg-amber-50 text-amber-700 border-amber-200' };
    case 'MODERATE':
      return { bar: 'bg-amber-500', text: 'text-amber-700', badge: 'bg-amber-50 text-amber-700 border-amber-200' };
    case 'LOW':
      return { bar: 'bg-[#0066cc]', text: 'text-[#0066cc]', badge: 'bg-[#f0f7ff] text-[#0066cc] border-[#d0e6ff]' };
    case 'SAFE':
    default:
      return { bar: 'bg-emerald-600', text: 'text-emerald-700', badge: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
  }
};

export const RiskScoreBreakdown: React.FC = () => {
  const { overallScore, overallTier, rioMargin, vesselCapability, subsystems } =
    MISSION_RISK_SUMMARY;

  const overallColors = getTierColor(overallTier);

  return (
    <div className="bg-white border border-[#e0e0e0] rounded-[18px] p-5 space-y-5">
      {/* 1. Overall Composite Risk Header Block */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#f0f0f0]">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-full bg-[#f5f5f7] border border-[#e0e0e0] text-[#0066cc]">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-[17px] font-semibold text-[#1d1d1f] tracking-tight">
                Mission Risk Summary
              </h3>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${overallColors.badge}`}
              >
                {overallTier} RISK
              </span>
            </div>
            <span className="text-[12px] text-neutral-500 font-normal">
              Vessel: {vesselCapability} &bull; Margin: {rioMargin}
            </span>
          </div>
        </div>

        {/* Big Score Readout */}
        <div className="flex items-baseline gap-1.5 self-start sm:self-auto bg-[#fafafc] px-4 py-2 rounded-[14px] border border-[#e0e0e0]">
          <span className="text-[26px] font-semibold text-[#1d1d1f]">
            {overallScore}
          </span>
          <span className="text-[12px] text-neutral-500 font-normal">/ 100</span>
        </div>
      </div>

      {/* 2. Subsystem Clean Horizontal Visualizations */}
      <div className="space-y-3.5">
        <span className="text-[11px] uppercase tracking-wider text-neutral-500 font-semibold px-1 block">
          Composite Risk Breakdown by Hazard Subsystem
        </span>

        <div className="space-y-2.5">
          {subsystems.map((sub) => {
            const Icon = iconMap[sub.iconName] || Shield;
            const colors = getTierColor(sub.tier);

            return (
              <div
                key={sub.id}
                className="p-3.5 rounded-[14px] bg-[#fafafc] border border-[#e0e0e0] space-y-2.5 transition-all"
              >
                {/* Metric Label and Score */}
                <div className="flex items-center justify-between text-[12px]">
                  <div className="flex items-center gap-2">
                    <Icon className="w-3.5 h-3.5 text-[#0066cc]" />
                    <span className="text-[#1d1d1f] font-semibold">{sub.name}</span>
                    <span className="text-[11px] text-neutral-500 font-normal">({sub.weightPct}% weight)</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-neutral-500 flex items-center gap-1 font-normal">
                      {sub.trend === 'increasing' ? (
                        <TrendingUp className="w-3 h-3 text-amber-600" />
                      ) : (
                        <Minus className="w-3 h-3 text-neutral-400" />
                      )}
                      {sub.trendDelta}
                    </span>
                    <span className="text-[15px] font-semibold text-[#1d1d1f]">
                      {sub.score}
                    </span>
                  </div>
                </div>

                {/* Horizontal Progress Bar */}
                <div className="w-full h-1.5 rounded-full bg-[#e0e0e0] overflow-hidden relative">
                  <div
                    className={`h-full rounded-full ${colors.bar} transition-all duration-500`}
                    style={{ width: `${sub.score}%` }}
                  />
                </div>

                {/* Detail text */}
                <div className="text-[11px] text-neutral-500 flex items-center justify-between font-normal">
                  <span className="truncate">{sub.description}</span>
                  <span className={`font-semibold ${colors.text}`}>{sub.tier}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

