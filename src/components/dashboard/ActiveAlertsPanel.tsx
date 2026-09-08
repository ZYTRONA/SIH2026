import React, { useState } from 'react';
import {
  AlertTriangle,
  AlertCircle,
  Info,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';
import { ACTIVE_ALERTS_DATA } from '@/data/dashboardData';
import { Link } from 'react-router-dom';

export const ActiveAlertsPanel: React.FC = () => {
  const [filterSeverity, setFilterSeverity] = useState<'ALL' | 'HIGH' | 'WARNING'>('ALL');

  const filteredAlerts = ACTIVE_ALERTS_DATA.filter((alert) => {
    if (filterSeverity === 'ALL') return true;
    return alert.severity === filterSeverity;
  });

  return (
    <div className="apple-card p-0 overflow-hidden select-none">
      {/* Header */}
      <div className="px-5 py-4 flex flex-row items-center justify-between border-b border-[#f0f0f0] bg-[#fafafc]">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-[8px] bg-rose-50 border border-rose-200 text-rose-700">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-[15px] sm:text-[16px] font-semibold text-[#1d1d1f] tracking-tight">
              Active Hazard Incursions
            </h3>
            <span className="text-[12px] text-rose-700 font-normal flex items-center gap-1">
              <span>&bull;</span> {ACTIVE_ALERTS_DATA.length} Active Notices
            </span>
          </div>
        </div>

        <Link
          to="/risk"
          className="text-[12px] text-[#0066cc] hover:underline flex items-center gap-1 font-normal"
        >
          <span>Risk Deck</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="p-5 space-y-3">
        {/* Apple Segmented Pill Filter */}
        <div className="apple-segmented-container w-full grid grid-cols-3">
          <button
            onClick={() => setFilterSeverity('ALL')}
            className={`apple-segmented-item text-center ${
              filterSeverity === 'ALL' ? 'apple-segmented-item-active' : ''
            }`}
          >
            All ({ACTIVE_ALERTS_DATA.length})
          </button>
          <button
            onClick={() => setFilterSeverity('HIGH')}
            className={`apple-segmented-item text-center ${
              filterSeverity === 'HIGH' ? 'apple-segmented-item-active' : ''
            }`}
          >
            High ({ACTIVE_ALERTS_DATA.filter((a) => a.severity === 'HIGH').length})
          </button>
          <button
            onClick={() => setFilterSeverity('WARNING')}
            className={`apple-segmented-item text-center ${
              filterSeverity === 'WARNING' ? 'apple-segmented-item-active' : ''
            }`}
          >
            Advisory ({ACTIVE_ALERTS_DATA.filter((a) => a.severity === 'WARNING').length})
          </button>
        </div>

        {/* Alert List */}
        <div className="space-y-2.5">
          {filteredAlerts.map((alert) => {
            const isHigh = alert.severity === 'HIGH';
            const isWarning = alert.severity === 'WARNING';

            return (
              <div
                key={alert.id}
                className={`p-3.5 rounded-[14px] border transition-all ${
                  isHigh
                    ? 'bg-rose-50/50 border-rose-200'
                    : isWarning
                    ? 'bg-amber-50/50 border-amber-200'
                    : 'bg-[#fafafc] border-[#f0f0f0]'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-normal border ${
                        isHigh
                          ? 'bg-rose-100 text-rose-800 border-rose-200'
                          : isWarning
                          ? 'bg-amber-100 text-amber-800 border-amber-200'
                          : 'bg-white text-neutral-700 border-[#e0e0e0]'
                      }`}
                    >
                      {isHigh && <AlertCircle className="w-3 h-3 text-rose-600 shrink-0" />}
                      {isWarning && <AlertTriangle className="w-3 h-3 text-amber-600 shrink-0" />}
                      {!isHigh && !isWarning && <Info className="w-3 h-3 text-neutral-500 shrink-0" />}
                      <span>{isHigh ? 'HIGH' : isWarning ? 'WARN' : 'INFO'}</span>
                    </span>
                    <span className="text-[14px] font-semibold text-[#1d1d1f] tracking-tight">
                      {alert.title}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-neutral-400">
                    {alert.timestamp}
                  </span>
                </div>

                <p className="text-[13px] text-neutral-600 leading-relaxed pl-1 font-normal mb-2">
                  {alert.description}
                </p>

                <div className="flex items-center justify-between text-[11px] font-mono pt-2 border-t border-[#f0f0f0] text-neutral-500">
                  <span>Sector: <strong className="text-[#1d1d1f] font-semibold">{alert.sector}</strong></span>
                  <span className="text-[#1d1d1f] font-semibold">{alert.actionRequired ? `Action: ${alert.actionRequired}` : 'Status: Monitored'}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

