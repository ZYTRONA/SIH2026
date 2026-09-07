import React, { useState } from 'react';
import { Info, ChevronDown, ChevronUp } from 'lucide-react';

export const MapLegend: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white/95 border border-slate-200 rounded-xl shadow-xl backdrop-blur-md overflow-hidden transition-all max-w-[280px] sm:max-w-xs pointer-events-auto">
      {/* Header / Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-3 py-2 text-xs font-mono font-bold text-slate-800 hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-sky-600" />
          <span>MAP TELEMETRY LEGEND</span>
        </div>
        {isExpanded ? (
          <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
        ) : (
          <ChevronUp className="w-3.5 h-3.5 text-slate-500" />
        )}
      </button>

      {/* Expanded Legend Content */}
      {isExpanded && (
        <div className="p-3 pt-1 space-y-3 text-[10px] font-mono border-t border-slate-100 max-h-64 overflow-y-auto">
          {/* 1. Sea Ice Concentration */}
          <div className="space-y-1">
            <span className="text-slate-500 font-bold uppercase tracking-wider block">
              Sea-Ice Concentration
            </span>
            <div className="grid grid-cols-2 gap-1 text-slate-700">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#0284C7]/40 border border-[#0284C7]" />
                <span>0–20% Open Drift</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#0EA5E9]/50 border border-[#0EA5E9]" />
                <span>20–50% Thin Floes</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#38BDF8]/60 border border-[#0284C7]" />
                <span>50–80% Pack Ice</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#BAE6FD] border border-[#0284C7]" />
                <span>80–100% Fast Ice</span>
              </div>
            </div>
          </div>

          {/* 2. Risk Scale */}
          <div className="space-y-1 pt-1 border-t border-slate-100">
            <span className="text-slate-500 font-bold uppercase tracking-wider block">
              Navigation Risk Score
            </span>
            <div className="flex items-center gap-1">
              <div className="flex-1 text-center py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
                0-20 SAFE
              </div>
              <div className="flex-1 text-center py-0.5 rounded bg-sky-50 text-sky-700 border border-sky-200 font-semibold">
                20-40 LOW
              </div>
              <div className="flex-1 text-center py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 font-semibold">
                40-60 MOD
              </div>
              <div className="flex-1 text-center py-0.5 rounded bg-orange-50 text-orange-700 border border-orange-200 font-semibold">
                60-80 HIGH
              </div>
              <div className="flex-1 text-center py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200 font-semibold">
                80+ CRIT
              </div>
            </div>
          </div>

          {/* 3. Icebergs */}
          <div className="space-y-1 pt-1 border-t border-slate-100">
            <span className="text-slate-500 font-bold uppercase tracking-wider block">
              Tracked Icebergs
            </span>
            <div className="flex items-center justify-between text-slate-700">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                Critical Threat
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                Warning Zone
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-sky-500" />
                Low Drift
              </span>
            </div>
          </div>

          {/* 4. Routes */}
          <div className="space-y-1 pt-1 border-t border-slate-100">
            <span className="text-slate-500 font-bold uppercase tracking-wider block">
              Route Corridors
            </span>
            <div className="space-y-1 text-slate-700">
              <div className="flex items-center gap-2">
                <span className="w-4 h-1 bg-[#0284C7] rounded-full inline-block" />
                <span className="font-medium">Recommended (Balanced)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-0.5 bg-[#D97706] border-b border-dashed border-amber-400 inline-block" />
                <span>Alt A (Fastest / Ice Edge)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-0.5 bg-[#059669] border-b border-dotted border-emerald-400 inline-block" />
                <span>Alt B (Max Safety Detour)</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
