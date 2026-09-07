import React from 'react';
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
  return (
    <div className="bg-white border border-slate-200/90 rounded-xl p-5 flex flex-col justify-between space-y-4 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-600">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold font-sans text-slate-900">
              Active Alerts & Incursions
            </h3>
            <span className="text-[10px] font-mono text-rose-700 font-semibold uppercase tracking-wider">
              {ACTIVE_ALERTS_DATA.length} Urgent Notices Active
            </span>
          </div>
        </div>

        <Link
          to="/risk"
          className="text-[11px] font-mono text-sky-700 hover:text-sky-900 font-semibold flex items-center gap-1 transition-colors"
        >
          <span>Risk Deck</span>
          <ChevronRight className="w-3 h-3" />
        </Link>
      </div>

      {/* Alert List */}
      <div className="space-y-2.5">
        {ACTIVE_ALERTS_DATA.map((alert) => {
          const isHigh = alert.severity === 'HIGH';
          const isWarning = alert.severity === 'WARNING';

          return (
            <div
              key={alert.id}
              className={`p-3 rounded-xl border transition-all ${
                isHigh
                  ? 'bg-rose-50/70 border-rose-200'
                  : isWarning
                  ? 'bg-amber-50/70 border-amber-200'
                  : 'bg-sky-50/70 border-sky-200'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 px-1.5 py-0.2 rounded text-[10px] font-mono font-bold ${
                      isHigh
                        ? 'bg-rose-100 text-rose-800 border border-rose-300'
                        : isWarning
                        ? 'bg-amber-100 text-amber-800 border border-amber-300'
                        : 'bg-sky-100 text-sky-800 border border-sky-300'
                    }`}
                  >
                    {isHigh && <AlertCircle className="w-3 h-3 text-rose-600" />}
                    {isWarning && <AlertTriangle className="w-3 h-3 text-amber-600" />}
                    {!isHigh && !isWarning && <Info className="w-3 h-3 text-sky-600" />}
                    {alert.severity}
                  </span>
                  <span className="text-xs font-semibold text-slate-900 font-sans">
                    {alert.title}
                  </span>
                </div>

                <span className="text-[10px] font-mono text-slate-500 flex-shrink-0">
                  {alert.timestamp}
                </span>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed pl-1 mt-1 font-sans">
                {alert.description}
              </p>

              <div className="flex items-center justify-between gap-2 mt-2 pt-2 border-t border-slate-200/60 text-[10px] font-mono">
                <span className="text-slate-500 font-medium">SECTOR: <strong className="text-slate-700">{alert.sector}</strong></span>
                {alert.actionRequired && (
                  <span className="text-amber-800 font-semibold">
                    ACTION: {alert.actionRequired}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
