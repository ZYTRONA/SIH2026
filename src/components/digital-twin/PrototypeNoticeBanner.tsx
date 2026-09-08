import React from 'react';
import { Info, Terminal } from 'lucide-react';

export const PrototypeNoticeBanner: React.FC = () => {
  return (
    <div className="bg-amber-50/90 border border-amber-200 shadow-xs rounded-xl p-4 space-y-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-200/80 pb-2">
        <div className="flex items-center gap-2">
          {/* Mandatory Specific Label */}
          <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-amber-100 text-amber-950 border border-amber-300 tracking-wider shadow-xs">
            SIMULATION / DECISION-SUPPORT PROTOTYPE
          </span>
          <span className="text-[11px] font-mono text-amber-900 hidden sm:inline font-medium">
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
        <p className="text-[11px] font-medium">
          <strong className="text-amber-950 font-mono font-bold">Prototype Notice: </strong>
          This interactive simulation illustrates multi-day Antarctic voyage dynamics, iceberg drift vectors, and contingency waypoint re-planning. It is built as a software decision-support prototype demonstration and does not claim to be a scientifically validated digital twin.
        </p>
      </div>
    </div>
  );
};

