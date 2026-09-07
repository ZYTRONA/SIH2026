import React from 'react';
import {
  ACTIVE_HAZARDS_DATA,
} from '@/data/riskIntelligenceData';
import {
  AlertTriangle,
  AlertCircle,
  Info,
  Clock,
  ShieldCheck,
} from 'lucide-react';

export const ActiveHazardsList: React.FC = () => {
  return (
    <div className="polar-panel p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-polar-700/60">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded bg-rose-500/10 border border-rose-500/30 text-rose-400">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold font-sans text-slate-100">
              Active Operational Hazards
            </h3>
            <span className="text-[10px] font-mono text-rose-400 uppercase tracking-wider">
              {ACTIVE_HAZARDS_DATA.length} Actionable Notices
            </span>
          </div>
        </div>

        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-rose-500/15 text-rose-300 border border-rose-500/30 font-semibold">
          LIVE QUEUE
        </span>
      </div>

      {/* Hazards List */}
      <div className="space-y-2.5">
        {ACTIVE_HAZARDS_DATA.map((hazard) => {
          const isHigh = hazard.severity === 'HIGH';
          const isWarning = hazard.severity === 'WARNING';

          return (
            <div
              key={hazard.id}
              className={`p-3.5 rounded-lg border space-y-2 transition-all ${
                isHigh
                  ? 'bg-rose-950/20 border-rose-500/40 shadow-sm'
                  : isWarning
                  ? 'bg-amber-950/20 border-amber-500/40 shadow-sm'
                  : 'bg-cyan-950/20 border-cyan-500/40'
              }`}
            >
              {/* Top Row: Severity Badge, Title, Timestamp */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.2 rounded text-[10px] font-mono font-bold border ${
                      isHigh
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                        : isWarning
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                    }`}
                  >
                    {isHigh && <AlertCircle className="w-3 h-3" />}
                    {isWarning && <AlertTriangle className="w-3 h-3" />}
                    {!isHigh && !isWarning && <Info className="w-3 h-3" />}
                    {hazard.severity}
                  </span>
                  <span className="text-xs font-bold font-sans text-slate-100">
                    {hazard.title}
                  </span>
                </div>

                <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1 flex-shrink-0">
                  <Clock className="w-3 h-3" />
                  {hazard.timestamp}
                </span>
              </div>

              {/* Detail & Proximity */}
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                {hazard.detail}
              </p>

              {/* Footer: Proximity Tag & Recommended Mitigation */}
              <div className="pt-2 border-t border-polar-700/40 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] font-mono gap-1">
                <span className="text-amber-300 font-semibold">
                  PROXIMITY: {hazard.proximityInfo}
                </span>
                <span className="text-slate-400 truncate flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                  {hazard.mitigation}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
