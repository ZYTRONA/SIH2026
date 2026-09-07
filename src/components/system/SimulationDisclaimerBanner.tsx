import { Info, Terminal } from 'lucide-react';

export const SimulationDisclaimerBanner: React.FC = () => {
  return (
    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono text-slate-500 gap-2 shadow-xs">
      <div className="flex items-center gap-2">
        <Info className="w-4 h-4 text-sky-600 flex-shrink-0" />
        <span className="text-slate-800 font-bold">Architecture Simulation Note:</span>
        <span className="text-slate-600">This is a frontend simulation. Live cloud-edge communications operate in mock demonstration mode.</span>
      </div>
      <div className="flex items-center gap-1.5 text-sky-700 font-semibold flex-shrink-0">
        <Terminal className="w-3.5 h-3.5" />
        <span>POLARIS EDGE v2.8 PROTOTYPE</span>
      </div>
    </div>
  );
};
