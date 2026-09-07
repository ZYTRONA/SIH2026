import React from 'react';
import { CLOUD_ENGINE_SERVICES, SystemServiceItem } from '@/data/systemStatusData';
import {
  Cloud,
  Cpu,
  Sparkles,
  ShieldCheck,
  GitFork,
  Activity,
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Cpu,
  Sparkles,
  ShieldCheck,
  GitFork,
};

interface CloudEngineStatusCardProps {
  isOffline?: boolean;
}

export const CloudEngineStatusCard: React.FC<CloudEngineStatusCardProps> = ({
  isOffline = false,
}) => {
  return (
    <div className="polar-panel p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-polar-700/60">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Cloud className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold font-sans text-slate-100">
              Cloud Intelligence Engine
            </h3>
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">
              High-Performance Cryospheric Processing Core
            </span>
          </div>
        </div>

        <span
          className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${
            isOffline
              ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
              : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
          }`}
        >
          {isOffline ? 'STANDBY (CACHED)' : 'ONLINE'}
        </span>
      </div>

      {/* 4 Required Services List */}
      <div className="space-y-2.5">
        {CLOUD_ENGINE_SERVICES.map((srv: SystemServiceItem) => {
          const Icon = iconMap[srv.iconName] || Activity;
          const statusText = isOffline ? 'CACHED' : srv.statusText;
          const isOnline = !isOffline && srv.status === 'ONLINE';

          return (
            <div
              key={srv.id}
              className="p-3 rounded-xl bg-polar-900/80 border border-polar-700/50 space-y-1.5 transition-all hover:border-polar-600"
            >
              <div className="flex items-center justify-between font-mono text-xs">
                <div className="flex items-center gap-2">
                  <div className="p-1 rounded bg-polar-950 border border-polar-700 text-cyan-400">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-slate-100 font-bold">{srv.name}:</span>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.2 rounded text-[10px] font-bold border ${
                      isOnline
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    }`}
                  >
                    {statusText}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-0.5">
                <span className="truncate">{srv.description}</span>
                <span className="text-cyan-300 font-semibold flex-shrink-0 ml-2">
                  {srv.metrics}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
