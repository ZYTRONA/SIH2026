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
    <div className="bg-white border border-zinc-200/90 shadow-xs rounded-xl p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-black text-white">
            <AlertTriangle className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-bold font-sans text-zinc-950">
              Active Operational Hazards
            </h3>
            <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider font-semibold">
              {ACTIVE_HAZARDS_DATA.length} Actionable Notices
            </span>
          </div>
        </div>

        <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono bg-zinc-100 text-zinc-900 border border-zinc-300 font-bold">
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
              className={`p-3.5 rounded-xl border space-y-2 transition-all ${
                isHigh
                  ? 'bg-rose-50/90 border-rose-200 shadow-2xs'
                  : isWarning
                  ? 'bg-amber-50/90 border-amber-200 shadow-2xs'
                  : 'bg-zinc-50/90 border-zinc-200 shadow-2xs'
              }`}
            >
              {/* Top Row: Severity Badge, Title, Timestamp */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${
                      isHigh
                        ? 'bg-rose-100 text-rose-900 border-rose-300'
                        : isWarning
                        ? 'bg-amber-100 text-amber-900 border-amber-300'
                        : 'bg-zinc-200 text-zinc-900 border-zinc-300'
                    }`}
                  >
                    {isHigh && <AlertCircle className="w-3 h-3 text-rose-700" />}
                    {isWarning && <AlertTriangle className="w-3 h-3 text-amber-700" />}
                    {!isHigh && !isWarning && <Info className="w-3 h-3 text-zinc-700" />}
                    {hazard.severity}
                  </span>
                  <span className="text-xs font-bold font-sans text-zinc-950">
                    {hazard.title}
                  </span>
                </div>

                <span className="text-[10px] font-mono text-zinc-500 flex items-center gap-1 flex-shrink-0">
                  <Clock className="w-3 h-3" />
                  {hazard.timestamp}
                </span>
              </div>

              {/* Detail & Proximity */}
              <p className="text-xs text-zinc-700 font-sans leading-relaxed font-medium">
                {hazard.detail}
              </p>

              {/* Footer: Proximity Tag & Recommended Mitigation */}
              <div className="pt-2 border-t border-zinc-200/80 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] font-mono gap-1">
                <span className="text-amber-900 font-bold">
                  PROXIMITY: {hazard.proximityInfo}
                </span>
                <span className="text-zinc-700 truncate flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
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

