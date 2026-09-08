import React, { useState } from 'react';
import { Info, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const MapLegend: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white border border-[#e0e0e0] rounded-[18px] shadow-lg overflow-hidden transition-all max-w-[280px] sm:max-w-xs pointer-events-auto select-none">
      {/* Header / Toggle Button — 44px Minimum Touch Target */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-4 py-3 min-h-[44px] text-[13px] font-semibold text-[#1d1d1f] hover:bg-[#f5f5f7] transition-colors cursor-pointer group active:scale-95"
        title={isExpanded ? 'Collapse map legend' : 'Expand map legend'}
      >
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-[#0066cc]" />
          <span>Map Telemetry Legend</span>
        </div>
        <div className="p-0.5 rounded text-neutral-400 group-hover:text-[#1d1d1f] transition-colors">
          {isExpanded ? (
            <ChevronUp className="w-3.5 h-3.5" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5" />
          )}
        </div>
      </button>

      {/* Expanded Legend Content with Motion */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            key="legend-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="overflow-hidden border-t border-[#f0f0f0]"
          >
            <div className="p-4 space-y-3 text-[11px] font-mono max-h-64 overflow-y-auto">
              {/* 1. Sea Ice Concentration */}
              <div className="space-y-1.5">
                <span className="text-neutral-500 font-semibold uppercase tracking-wider block text-[10px]">
                  Sea-Ice Concentration (SAR)
                </span>
                <div className="grid grid-cols-2 gap-1.5 text-[#1d1d1f]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-sky-200 border border-sky-400" />
                    <span>0–20% Open</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-sky-400 border border-sky-500" />
                    <span>20–50% Thin</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#0066cc] border border-[#0071e3]" />
                    <span>50–80% Pack</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-neutral-900 border border-neutral-700" />
                    <span>80–100% Fast</span>
                  </div>
                </div>
              </div>

              {/* 2. Colorblind-Safe Risk Scale */}
              <div className="space-y-1.5 pt-2.5 border-t border-[#f0f0f0]">
                <span className="text-neutral-500 font-semibold uppercase tracking-wider block text-[10px]">
                  Navigation Risk Score (RIO)
                </span>
                <div className="grid grid-cols-5 gap-1 text-[9px] font-semibold text-center">
                  <div className="py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    SAFE
                  </div>
                  <div className="py-1 rounded-full bg-[#f5f5f7] text-[#1d1d1f] border border-[#e0e0e0]">
                    LOW
                  </div>
                  <div className="py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                    MOD
                  </div>
                  <div className="py-1 rounded-full bg-orange-50 text-orange-800 border border-orange-200">
                    HIGH
                  </div>
                  <div className="py-1 rounded-full bg-rose-50 text-rose-800 border border-rose-200">
                    CRIT
                  </div>
                </div>
              </div>

              {/* 3. Tracked Icebergs */}
              <div className="space-y-1.5 pt-2.5 border-t border-[#f0f0f0]">
                <span className="text-neutral-500 font-semibold uppercase tracking-wider block text-[10px]">
                  Tracked Icebergs (Sentinel-1)
                </span>
                <div className="flex items-center justify-between text-[#1d1d1f] font-normal">
                  <span className="flex items-center gap-1 text-rose-700">
                    <span className="w-2 h-2 rounded-full bg-rose-600" /> Critical
                  </span>
                  <span className="flex items-center gap-1 text-amber-700">
                    <span className="w-2 h-2 rounded-full bg-amber-500" /> Advisory
                  </span>
                  <span className="flex items-center gap-1 text-emerald-700">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" /> Nominal
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
