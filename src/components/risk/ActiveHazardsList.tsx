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
    <div className="bg-white border border-[#e0e0e0] rounded-[18px] p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#f0f0f0]">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-full bg-[#f5f5f7] border border-[#e0e0e0] text-[#0066cc]">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-[15px] font-semibold text-[#1d1d1f] tracking-tight">
              Active Operational Hazards
            </h3>
            <span className="text-[11px] text-neutral-500 font-normal">
              {ACTIVE_HAZARDS_DATA.length} Actionable Notices
            </span>
          </div>
        </div>

        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#f0f7ff] text-[#0066cc] border border-[#d0e6ff]">
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
              className={`p-3.5 rounded-[14px] border space-y-2 transition-all ${
                isHigh
                  ? 'bg-rose-50/50 border-rose-200'
                  : isWarning
                  ? 'bg-amber-50/50 border-amber-200'
                  : 'bg-[#fafafc] border-[#e0e0e0]'
              }`}
            >
              {/* Top Row: Severity Badge, Title, Timestamp */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                      isHigh
                        ? 'bg-rose-100 text-rose-800 border-rose-200'
                        : isWarning
                        ? 'bg-amber-100 text-amber-800 border-amber-200'
                        : 'bg-[#f5f5f7] text-[#1d1d1f] border-[#e0e0e0]'
                    }`}
                  >
                    {isHigh && <AlertCircle className="w-3 h-3 text-rose-600" />}
                    {isWarning && <AlertTriangle className="w-3 h-3 text-amber-600" />}
                    {!isHigh && !isWarning && <Info className="w-3 h-3 text-neutral-500" />}
                    {hazard.severity}
                  </span>
                  <span className="text-[13px] font-semibold text-[#1d1d1f]">
                    {hazard.title}
                  </span>
                </div>

                <span className="text-[11px] text-neutral-400 flex items-center gap-1 shrink-0 font-normal">
                  <Clock className="w-3 h-3" />
                  {hazard.timestamp}
                </span>
              </div>

              {/* Detail & Proximity */}
              <p className="text-[13px] text-neutral-600 leading-relaxed font-normal">
                {hazard.detail}
              </p>

              {/* Footer */}
              <div className="pt-2 border-t border-[#f0f0f0] flex flex-col sm:flex-row sm:items-center justify-between text-[11px] gap-1">
                <span className="text-amber-700 font-semibold">
                  PROXIMITY: {hazard.proximityInfo}
                </span>
                <span className="text-neutral-600 truncate flex items-center gap-1 font-normal">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
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

