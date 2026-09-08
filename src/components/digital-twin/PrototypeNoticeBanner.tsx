import React from 'react';
import { Info, Terminal } from 'lucide-react';

export const PrototypeNoticeBanner: React.FC = () => {
  return (
    <div className="bg-amber-500/10 border border-amber-500/20 rounded-[18px] p-5 space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-500/20 pb-3">
        <div className="flex items-center gap-2.5">
          {/* Mandatory Specific Label */}
          <span className="px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-amber-500/20 text-amber-900 border border-amber-500/30 tracking-wider">
            SIMULATION / DECISION-SUPPORT PROTOTYPE
          </span>
          <span className="text-[11px] font-mono text-amber-900 hidden sm:inline font-normal">
            Deterministic Kinematic & Cryospheric Testbed
          </span>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-mono text-amber-900 font-semibold">
          <Terminal className="w-3.5 h-3.5 text-amber-700" />
          <span>POLARIS Digital Twin Engine v2.8</span>
        </div>
      </div>

      <div className="flex items-start gap-2.5 text-xs text-amber-950 font-sans leading-relaxed">
        <Info className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
        <p className="text-[12px] font-normal text-[#424245]">
          <strong className="text-amber-950 font-mono font-semibold">Prototype Notice: </strong>
          This interactive simulation illustrates multi-day Antarctic voyage dynamics, iceberg drift vectors, and contingency waypoint re-planning. It is built as a software decision-support prototype demonstration and does not claim to be a scientifically validated digital twin.
        </p>
      </div>
    </div>
  );
};

