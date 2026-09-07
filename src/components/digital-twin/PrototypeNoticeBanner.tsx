import React from 'react';
import { Info, Terminal } from 'lucide-react';

export const PrototypeNoticeBanner: React.FC = () => {
  return (
    <div className="polar-panel p-4 bg-gradient-to-r from-polar-900/95 via-polar-850/90 to-polar-900/95 border border-cyan-500/30 space-y-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-polar-700/50 pb-2">
        <div className="flex items-center gap-2">
          {/* Mandatory Specific Label */}
          <span className="px-2.5 py-1 rounded text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 tracking-wider">
            SIMULATION / DECISION-SUPPORT PROTOTYPE
          </span>
          <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
            Deterministic Kinematic & Cryospheric Testbed
          </span>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
          <Terminal className="w-3.5 h-3.5 text-ice-400" />
          <span>POLARIS Digital Twin Engine v2.8</span>
        </div>
      </div>

      <div className="flex items-start gap-2.5 text-xs text-slate-300 font-sans leading-relaxed">
        <Info className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
        <p className="text-[11px]">
          <strong className="text-ice-300 font-mono">Prototype Notice: </strong>
          This interactive simulation illustrates multi-day Antarctic voyage dynamics, iceberg drift vectors, and contingency waypoint re-planning. It is built as a software decision-support prototype demonstration and does not claim to be a scientifically validated digital twin.
        </p>
      </div>
    </div>
  );
};
