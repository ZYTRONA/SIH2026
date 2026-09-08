import React from 'react';
import { RISK_SCALE_TIERS } from '@/data/riskIntelligenceData';
import { Shield, Info } from 'lucide-react';

interface RiskScaleLegendProps {
  currentScore?: number;
}

export const RiskScaleLegend: React.FC<RiskScaleLegendProps> = ({ currentScore = 24 }) => {
  return (
    <div className="bg-white border border-[#e0e0e0] rounded-[18px] p-4 space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#f0f0f0] pb-2.5">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-[#0066cc]" />
          <h4 className="text-[12px] font-semibold text-[#1d1d1f] uppercase tracking-wider">
            POLARIS Operational Risk Index Scale (IMO POLARIS RIO)
          </h4>
        </div>
        <div className="flex items-center gap-1.5 text-[12px] text-neutral-500 font-normal">
          <Info className="w-3.5 h-3.5 text-[#0066cc]" />
          <span>Current Transit Index:</span>
          <span className="px-2.5 py-0.5 rounded-full bg-[#f0f7ff] border border-[#d0e6ff] text-[#0066cc] font-semibold">
            {currentScore} (LOW RISK)
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
        {RISK_SCALE_TIERS.map((tier) => {
          const isCurrent =
            (tier.tier === 'SAFE' && currentScore <= 20) ||
            (tier.tier === 'LOW' && currentScore > 20 && currentScore <= 40) ||
            (tier.tier === 'MODERATE' && currentScore > 40 && currentScore <= 60) ||
            (tier.tier === 'HIGH' && currentScore > 60 && currentScore <= 80) ||
            (tier.tier === 'CRITICAL' && currentScore > 80);

          return (
            <div
              key={tier.tier}
              className={`p-3 rounded-[12px] border transition-all ${
                isCurrent
                  ? 'bg-[#f0f7ff] border-[#0066cc]'
                  : 'bg-[#fafafc] border-[#e0e0e0]'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[12px] font-semibold text-[#1d1d1f]">
                  {tier.range}
                </span>
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border flex items-center gap-1 ${
                    tier.tier === 'CRITICAL'
                      ? 'bg-rose-50 text-rose-700 border-rose-200'
                      : tier.tier === 'HIGH'
                      ? 'bg-amber-50 text-amber-700 border-amber-200'
                      : tier.tier === 'MODERATE'
                      ? 'bg-amber-50 text-amber-700 border-amber-200'
                      : tier.tier === 'LOW'
                      ? 'bg-[#f0f7ff] text-[#0066cc] border-[#d0e6ff]'
                      : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  }`}
                >
                  <span>{tier.tier}</span>
                </span>
              </div>
              <p className="text-[11px] text-neutral-500 leading-tight font-normal">
                {tier.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
