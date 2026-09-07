import React, { useState } from 'react';
import { Info, ChevronDown, ChevronUp } from 'lucide-react';

export const MapLegend: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-polar-900/95 border border-polar-700/80 rounded-lg shadow-xl backdrop-blur-md overflow-hidden transition-all max-w-[280px] sm:max-w-xs pointer-events-auto">
      {/* Header / Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-3 py-2 text-xs font-mono font-bold text-slate-200 hover:bg-polar-800/80 transition-colors"
      >
        <div className="flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-ice-400" />
          <span>MAP TELEMETRY LEGEND</span>
        </div>
        {isExpanded ? (
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        ) : (
          <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
        )}
      </button>

      {/* Expanded Legend Content */}
      {isExpanded && (
        <div className="p-3 pt-1 space-y-3 text-[10px] font-mono border-t border-polar-700/60 max-h-64 overflow-y-auto">
          {/* 1. Sea Ice Concentration */}
          <div className="space-y-1">
            <span className="text-slate-400 font-bold uppercase tracking-wider block">
              Sea-Ice Concentration
            </span>
            <div className="grid grid-cols-2 gap-1 text-slate-300">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#0284C7]/60 border border-[#0284C7]" />
                <span>0–20% Open Drift</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#0EA5E9]/60 border border-[#0EA5E9]" />
                <span>20–50% Thin Floes</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#38BDF8]/60 border border-[#38BDF8]" />
                <span>50–80% Pack Ice</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#BAE6FD]/80 border border-[#BAE6FD]" />
                <span>80–100% Fast Ice</span>
              </div>
            </div>
          </div>

          {/* 2. Risk Scale */}
          <div className="space-y-1 pt-1 border-t border-polar-700/40">
            <span className="text-slate-400 font-bold uppercase tracking-wider block">
              Navigation Risk Score
            </span>
            <div className="flex items-center gap-1">
              <div className="flex-1 text-center py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                0-20 SAFE
              </div>
              <div className="flex-1 text-center py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                20-40 LOW
              </div>
              <div className="flex-1 text-center py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                40-60 MOD
              </div>
              <div className="flex-1 text-center py-0.5 rounded bg-orange-500/20 text-orange-300 border border-orange-500/40">
                60-80 HIGH
              </div>
              <div className="flex-1 text-center py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40">
                80+ CRIT
              </div>
            </div>
          </div>

          {/* 3. Icebergs */}
          <div className="space-y-1 pt-1 border-t border-polar-700/40">
            <span className="text-slate-400 font-bold uppercase tracking-wider block">
              Tracked Icebergs
            </span>
            <div className="flex items-center justify-between text-slate-300">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                Critical Threat
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                Warning Zone
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-sky-400" />
                Low Drift
              </span>
            </div>
          </div>

          {/* 4. Routes */}
          <div className="space-y-1 pt-1 border-t border-polar-700/40">
            <span className="text-slate-400 font-bold uppercase tracking-wider block">
              Route Corridors
            </span>
            <div className="space-y-1 text-slate-300">
              <div className="flex items-center gap-2">
                <span className="w-4 h-1 bg-[#38BDF8] rounded-full inline-block" />
                <span>Recommended Route (Balanced)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-0.5 bg-[#F59E0B] border-b border-dashed border-white inline-block" />
                <span>Alt A (Fastest / Ice Edge)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-0.5 bg-[#10B981] border-b border-dotted border-white inline-block" />
                <span>Alt B (Max Safety Detour)</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
