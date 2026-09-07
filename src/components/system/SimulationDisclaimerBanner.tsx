import { Info, Terminal } from 'lucide-react';

export const SimulationDisclaimerBanner: React.FC = () => {
  return (
    <div className="p-3.5 rounded-xl bg-polar-900/80 border border-polar-700/60 flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono text-slate-400 gap-2">
      <div className="flex items-center gap-2">
        <Info className="w-4 h-4 text-cyan-400 flex-shrink-0" />
        <span className="text-slate-300 font-bold">Architecture Simulation Note:</span>
        <span>This is a frontend simulation. Live cloud-edge communications operate in mock demonstration mode.</span>
      </div>
      <div className="flex items-center gap-1.5 text-cyan-400 flex-shrink-0">
        <Terminal className="w-3.5 h-3.5" />
        <span>POLARIS EDGE v2.8 PROTOTYPE</span>
      </div>
    </div>
  );
};
