import React, { useState } from 'react';
import { Info, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapLayerVisibility } from '@/types/map';

interface MapLegendProps {
  layers?: MapLayerVisibility;
}

export const MapLegend: React.FC<MapLegendProps> = ({ layers }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // If layers are passed, check what is active
  const showRoutes = layers ? layers.routes : true;
  const showIcebergs = layers ? layers.icebergs : true;
  const showSeaIce = layers ? layers.seaIce : true;
  const showRisk = layers ? layers.risk : true;

  const hasAnySection = showRoutes || showIcebergs || showSeaIce || showRisk;

  return (
    <div className="bg-white/95 backdrop-blur-md border border-[#e0e0e0] rounded-[18px] shadow-lg overflow-hidden transition-all max-w-[280px] sm:max-w-xs pointer-events-auto select-none">
      {/* Header / Toggle Button — 44px Minimum Touch Target */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-4 py-2.5 min-h-[40px] text-[12px] font-semibold text-[#1d1d1f] hover:bg-[#f5f5f7] transition-colors cursor-pointer group active:scale-95"
        title={isExpanded ? 'Collapse map legend' : 'Expand map legend'}
      >
        <div className="flex items-center gap-2">
          <Info className="w-3.5 h-3.5 text-[#0066cc]" />
          <span>Active Map Legend</span>
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
            <div className="p-3.5 space-y-3 text-[11px] font-mono max-h-72 overflow-y-auto">
              {/* 1. Navigation Routes */}
              {showRoutes && (
                <div className="space-y-1.5">
                  <span className="text-neutral-500 font-semibold uppercase tracking-wider block text-[10px]">
                    Navigation Routes
                  </span>
                  <div className="space-y-1 text-[#1d1d1f]">
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-1 rounded bg-[#0066cc]" />
                      <span className="font-bold text-[#0066cc]">Safe Corridor (Primary)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-1 rounded bg-[#d97706] border-t border-dashed" />
                      <span>Fastest Rhumb</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-1 rounded bg-[#10b981] border-t border-dotted" />
                      <span>Fuel-Optimal Current</span>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. Tracked Icebergs */}
              {showIcebergs && (
                <div className="space-y-1.5 pt-2 border-t border-[#f0f0f0]">
                  <span className="text-neutral-500 font-semibold uppercase tracking-wider block text-[10px]">
                    Tracked Icebergs (Sentinel-1 SAR)
                  </span>
                  <div className="flex items-center justify-between text-[#1d1d1f] font-normal">
                    <span className="flex items-center gap-1 text-rose-700 font-semibold">
                      <span className="w-2 h-2 rounded-full bg-rose-600" /> Critical
                    </span>
                    <span className="flex items-center gap-1 text-amber-700 font-semibold">
                      <span className="w-2 h-2 rounded-full bg-amber-500" /> Advisory
                    </span>
                    <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" /> Nominal
                    </span>
                  </div>
                </div>
              )}

              {/* 3. Sea Ice Concentration */}
              {showSeaIce && (
                <div className="space-y-1.5 pt-2 border-t border-[#f0f0f0]">
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
                      <span className="w-2.5 h-2.5 rounded-full bg-[#0284C7] border border-[#0369A1]" />
                      <span>50–80% Pack</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-neutral-900 border border-neutral-700" />
                      <span>80–100% Fast</span>
                    </div>
                  </div>
                </div>
              )}

              {/* 4. Colorblind-Safe Risk Scale */}
              {showRisk && (
                <div className="space-y-1.5 pt-2 border-t border-[#f0f0f0]">
                  <span className="text-neutral-500 font-semibold uppercase tracking-wider block text-[10px]">
                    Navigation Risk Score (RIO)
                  </span>
                  <div className="grid grid-cols-4 gap-1 text-[9px] font-semibold text-center">
                    <div className="py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                      SAFE
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
              )}

              {!hasAnySection && (
                <div className="text-neutral-500 text-[11px] py-1 text-center">
                  Enable layers above to view their respective legends.
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MapLegend;
