import React from 'react';
import { RISK_SCALE_TIERS } from '@/data/riskIntelligenceData';
import { Shield, Info } from 'lucide-react';

interface RiskScaleLegendProps {
  currentScore?: number;
}

export const RiskScaleLegend: React.FC<RiskScaleLegendProps> = ({ currentScore = 24 }) => {
  return (
    <div className="polar-panel p-4 space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-polar-700/60 pb-2.5">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-cyan-400" />
          <h4 className="text-xs font-bold font-mono text-slate-200 uppercase tracking-wider">
            POLARIS Operational Risk Index Scale (0–100)
          </h4>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
          <Info className="w-3.5 h-3.5 text-ice-400" />
          <span>Current Transit Index:</span>
          <span className="px-2 py-0.5 rounded bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 font-bold">
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
                  ? `${tier.badgeBg} ${tier.badgeBorder} ring-1 ring-cyan-400/50 shadow-md`
                  : 'bg-polar-900/60 border-polar-700/50 opacity-80 hover:opacity-100'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-mono font-bold text-slate-300">
                  {tier.range}
                </span>
                <span
                  className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded border ${tier.badgeBg} ${tier.badgeBorder} ${tier.textColor}`}
                >
                  {tier.tier}
                </span>
              </div>
              <p className="text-[10px] text-slate-400 line-clamp-2 leading-tight">
                {tier.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
