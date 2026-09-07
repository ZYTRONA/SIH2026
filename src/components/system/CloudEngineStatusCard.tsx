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
    <div className="bg-white border border-slate-200/90 shadow-xs rounded-xl p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-sky-50 border border-sky-200 text-sky-700">
            <Cloud className="w-4 h-4 text-sky-600" />
          </div>
          <div>
            <h3 className="text-sm font-bold font-sans text-slate-900">
              Cloud Intelligence Engine
            </h3>
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
              High-Performance Cryospheric Processing Core
            </span>
          </div>
        </div>

        <span
          className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${
            isOffline
              ? 'bg-amber-50 text-amber-800 border border-amber-200'
              : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
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
              className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 space-y-1.5 transition-all hover:border-slate-300"
            >
              <div className="flex items-center justify-between font-mono text-xs">
                <div className="flex items-center gap-2">
                  <div className="p-1 rounded bg-white border border-slate-200 text-sky-600 shadow-xs">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-slate-900 font-bold">{srv.name}:</span>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                      isOnline
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : 'bg-amber-50 text-amber-800 border-amber-200'
                    }`}
                  >
                    {statusText}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-0.5">
                <span className="truncate">{srv.description}</span>
                <span className="text-sky-700 font-semibold flex-shrink-0 ml-2">
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
