import React from 'react';
import { Info, Terminal } from 'lucide-react';

export const SimulationDisclaimerBanner: React.FC = () => {
  return (
    <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono text-zinc-500 gap-2 shadow-xs">
      <div className="flex items-center gap-2">
        <Info className="w-4 h-4 text-black flex-shrink-0" />
        <span className="text-zinc-950 font-bold">Architecture Simulation Note:</span>
        <span className="text-zinc-600 font-medium">This is a frontend simulation. Live cloud-edge communications operate in mock demonstration mode.</span>
      </div>
      <div className="flex items-center gap-1.5 text-zinc-950 font-bold flex-shrink-0">
        <Terminal className="w-3.5 h-3.5 text-black" />
        <span>POLARIS EDGE v2.8 PROTOTYPE</span>
      </div>
    </div>
  );
};
