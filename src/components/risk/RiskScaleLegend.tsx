import React from 'react';
import { RISK_SCALE_TIERS } from '@/data/riskIntelligenceData';
import { Shield, Info } from 'lucide-react';

interface RiskScaleLegendProps {
  currentScore?: number;
}

export const RiskScaleLegend: React.FC<RiskScaleLegendProps> = ({ currentScore = 24 }) => {
  return (
    <div className="bg-white border border-slate-200/90 shadow-xs rounded-xl p-4 space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-sky-600" />
          <h4 className="text-xs font-bold font-mono text-slate-800 uppercase tracking-wider">
            POLARIS Operational Risk Index Scale (0–100)
          </h4>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500">
          <Info className="w-3.5 h-3.5 text-sky-600" />
          <span>Current Transit Index:</span>
          <span className="px-2 py-0.5 rounded-md bg-sky-50 border border-sky-200 text-sky-700 font-bold">
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
              className={`p-2.5 rounded-lg border transition-all ${
                isCurrent
                  ? 'bg-sky-50/80 border-sky-300 ring-2 ring-sky-400 shadow-xs'
                  : 'bg-slate-50/80 border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-mono font-bold text-slate-800">
                  {tier.range}
                </span>
                <span
                  className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border ${tier.badgeBg} ${tier.badgeBorder} ${tier.textColor}`}
                >
                  {tier.tier}
                </span>
              </div>
              <p className="text-[10px] text-slate-500 line-clamp-2 leading-tight">
                {tier.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
