import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Compass,
  ArrowRight,
  Anchor,
  Flag,
  Radio,
  Check,
} from 'lucide-react';
import { motion } from 'framer-motion';

export const TacticalDecisionBanner: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="apple-tile-dark p-6 relative overflow-hidden select-none"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
        {/* Left: Primary Decision & Status */}
        <div className="flex items-start sm:items-center gap-4 min-w-0">
          <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#2a2a2c] text-white shrink-0 border border-neutral-700">
            <Radio className="w-6 h-6 text-[#2997ff] animate-pulse" />
          </div>

          <div className="space-y-1.5 min-w-0">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-normal bg-emerald-950 text-emerald-300 border border-emerald-800">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                Safe Corridor Active
              </span>
              <span className="text-[12px] font-mono text-[#cccccc]">
                IMO POLARIS RIO: <strong className="text-white">+18 Nominal Clearance</strong>
              </span>
            </div>

            <h2 className="text-[18px] sm:text-[22px] font-semibold text-white tracking-[-0.28px]">
              Primary Transit: North Atlantic Fairway &rarr; St. John's Maritime Base
            </h2>

            {/* Waypoint Stepper */}
            <div className="hidden sm:flex items-center gap-2 text-[12px] font-mono text-[#cccccc] pt-0.5">
              <span className="flex items-center gap-1">
                <Anchor className="w-3.5 h-3.5 text-[#2997ff]" />
                Atlantic Entry
              </span>
              <span className="text-neutral-500">&rarr;</span>
              <span>WP-Alpha</span>
              <span className="text-neutral-500">&rarr;</span>
              <span className="flex items-center gap-1 bg-[#2a2a2c] px-2.5 py-0.5 rounded-full text-white border border-neutral-700 font-semibold">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                WP-Bravo (Current)
              </span>
              <span className="text-neutral-500">&rarr;</span>
              <span className="flex items-center gap-1">
                <Flag className="w-3.5 h-3.5 text-[#2997ff]" />
                St. John's Base
              </span>
            </div>
          </div>
        </div>

        {/* Right: Waypoint Telemetry & Pill Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          <div className="bg-[#2a2a2c] border border-neutral-700 px-4 py-3 rounded-[14px] space-y-1 font-mono text-[12px]">
            <div className="flex items-center justify-between gap-4 text-[#cccccc]">
              <span>NEXT WAYPOINT:</span>
              <strong className="text-white">WP-BRAVO (2.4h)</strong>
            </div>
            <div className="flex items-center justify-between gap-4 text-[#2997ff]">
              <span>IB-023 DISTANCE:</span>
              <span className="text-white font-semibold">4.2 NM CLEAR</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/routes')}
            className="btn-apple-primary"
          >
            <Compass className="w-4 h-4" />
            <span>Inspect Routes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
