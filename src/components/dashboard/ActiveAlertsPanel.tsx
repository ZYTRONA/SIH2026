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
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const ActiveAlertsPanel: React.FC = () => {
  const [filterSeverity, setFilterSeverity] = useState<'ALL' | 'HIGH' | 'WARNING'>('ALL');

  const filteredAlerts = ACTIVE_ALERTS_DATA.filter((alert) => {
    if (filterSeverity === 'ALL') return true;
    return alert.severity === filterSeverity;
  });

  return (
    <div className="rounded-2xl border border-zinc-200/90 bg-white p-5 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-600">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold font-sans text-zinc-950 tracking-tight">
              Active Alerts & Incursions
            </h3>
            <span className="text-[10px] font-mono text-rose-900 font-bold uppercase tracking-wider">
              {ACTIVE_ALERTS_DATA.length} Urgent Notices Active
            </span>
          </div>
        </div>

        <Link
          to="/risk"
          className="text-[11px] font-mono text-zinc-900 hover:text-black font-bold flex items-center gap-1 transition-colors"
        >
          <span>Risk Deck</span>
          <ChevronRight className="w-3 h-3" />
        </Link>
      </div>

      {/* Filter Tabs */}
      <Tabs
        value={filterSeverity}
        onValueChange={(val) => setFilterSeverity(val as 'ALL' | 'HIGH' | 'WARNING')}
        className="w-full"
      >
        <TabsList className="w-full grid grid-cols-3 h-8 p-0.5 bg-zinc-100 border border-zinc-200 rounded-lg">
          <TabsTrigger value="ALL" className="h-7 text-[11px] font-mono font-bold data-[state=active]:bg-black data-[state=active]:text-white">
            All ({ACTIVE_ALERTS_DATA.length})
          </TabsTrigger>
          <TabsTrigger value="HIGH" className="h-7 text-[11px] font-mono font-bold data-[state=active]:bg-black data-[state=active]:text-white">
            High Threat ({ACTIVE_ALERTS_DATA.filter((a) => a.severity === 'HIGH').length})
          </TabsTrigger>
          <TabsTrigger value="WARNING" className="h-7 text-[11px] font-mono font-bold data-[state=active]:bg-black data-[state=active]:text-white">
            Advisory ({ACTIVE_ALERTS_DATA.filter((a) => a.severity === 'WARNING').length})
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Alert List */}
      <div className="space-y-2.5">
        {filteredAlerts.map((alert) => {
          const isHigh = alert.severity === 'HIGH';
          const isWarning = alert.severity === 'WARNING';

          return (
            <div
              key={alert.id}
              className={`p-3.5 rounded-xl border transition-all ${
                isHigh
                  ? 'bg-rose-50/50 border-rose-200 hover:border-rose-300'
                  : isWarning
                  ? 'bg-amber-50/50 border-amber-200 hover:border-amber-300'
                  : 'bg-zinc-50 border-zinc-200 hover:border-zinc-300'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                      isHigh
                        ? 'bg-rose-100 text-rose-900 border border-rose-300'
                        : isWarning
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : 'bg-zinc-200 text-zinc-900 border border-zinc-300'
                    }`}
                  >
                    {isHigh && <AlertCircle className="w-3 h-3 text-rose-600 shrink-0" />}
                    {isWarning && <AlertTriangle className="w-3 h-3 text-amber-600 shrink-0" />}
                    {!isHigh && !isWarning && <Info className="w-3 h-3 text-zinc-700 shrink-0" />}
                    {alert.severity}
                  </span>
                  <span className="text-xs font-bold text-zinc-950 font-sans tracking-tight">
                    {alert.title}
                  </span>
                </div>

                <span className="text-[10px] font-mono text-zinc-500 font-semibold flex-shrink-0">
                  {alert.timestamp}
                </span>
              </div>

              <p className="text-xs text-zinc-700 leading-relaxed pl-1 mt-1 font-sans">
                {alert.description}
              </p>

              <div className="flex items-center justify-between gap-2 mt-2 pt-2 border-t border-zinc-200/60 text-[10px] font-mono">
                <span className="text-zinc-500 font-medium">SECTOR: <strong className="text-zinc-900 font-bold">{alert.sector}</strong></span>
                {alert.actionRequired && (
                  <span className="text-amber-900 font-bold">
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

