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
    <div className="polar-panel p-5 flex flex-col justify-between space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-polar-700/60">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded bg-rose-500/10 border border-rose-500/30 text-rose-400">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold font-sans text-slate-100">
              Active Alerts & Incursions
            </h3>
            <span className="text-[10px] font-mono text-rose-400 uppercase tracking-wider">
              {ACTIVE_ALERTS_DATA.length} Urgent Notices Active
            </span>
          </div>
        </div>

        <Link
          to="/risk"
          className="text-[11px] font-mono text-ice-400 hover:text-ice-300 flex items-center gap-1"
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
              className={`p-3 rounded-lg border transition-all ${
                isHigh
                  ? 'bg-rose-950/20 border-rose-500/30'
                  : isWarning
                  ? 'bg-amber-950/20 border-amber-500/30'
                  : 'bg-sky-950/20 border-sky-500/30'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 px-1.5 py-0.2 rounded text-[10px] font-mono font-bold ${
                      isHigh
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                        : isWarning
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                    }`}
                  >
                    {isHigh && <AlertCircle className="w-3 h-3" />}
                    {isWarning && <AlertTriangle className="w-3 h-3" />}
                    {!isHigh && !isWarning && <Info className="w-3 h-3" />}
                    {alert.severity}
                  </span>
                  <span className="text-xs font-semibold text-slate-200 font-sans">
                    {alert.title}
                  </span>
                </div>

                <span className="text-[10px] font-mono text-slate-400 flex-shrink-0">
                  {alert.timestamp}
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed pl-1 mt-1">
                {alert.description}
              </p>

              <div className="flex items-center justify-between gap-2 mt-2 pt-2 border-t border-polar-700/40 text-[10px] font-mono">
                <span className="text-slate-400">SECTOR: {alert.sector}</span>
                {alert.actionRequired && (
                  <span className="text-amber-400 font-medium">
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
