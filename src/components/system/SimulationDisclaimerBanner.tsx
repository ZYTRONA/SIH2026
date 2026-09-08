import React from 'react';
import { Info, Terminal } from 'lucide-react';

export const SimulationDisclaimerBanner: React.FC = () => {
  return (
    <div className="p-4 rounded-[18px] bg-[#fafafc] border border-[#e0e0e0] flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono text-[#424245] gap-2">
      <div className="flex items-center gap-2">
        <Info className="w-4 h-4 text-[#0066cc] flex-shrink-0" />
        <span className="text-[#1d1d1f] font-semibold">Architecture Simulation Note:</span>
        <span className="text-[#86868b] font-normal">This is a frontend simulation. Live cloud-edge communications operate in mock demonstration mode.</span>
      </div>
      <div className="flex items-center gap-1.5 text-[#1d1d1f] font-semibold flex-shrink-0">
        <Terminal className="w-3.5 h-3.5 text-[#0066cc]" />
        <span>POLARIS EDGE v2.8 PROTOTYPE</span>
      </div>
    </div>
  );
};
