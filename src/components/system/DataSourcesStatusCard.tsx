import React from 'react';
import { DATA_SOURCES_SERVICES, SystemServiceItem } from '@/data/systemStatusData';
import {
  Database,
  Satellite,
  Wind,
  Compass,
  Radio,
  Activity,
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Satellite,
  Wind,
  Compass,
  Radio,
};

interface DataSourcesStatusCardProps {
  isOffline?: boolean;
}

export const DataSourcesStatusCard: React.FC<DataSourcesStatusCardProps> = ({
  isOffline = false,
}) => {
  return (
    <div className="bg-white border border-zinc-200/90 shadow-xs rounded-xl p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-black text-white shadow-xs">
            <Database className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold font-sans text-zinc-950">
              Data Sources
            </h3>
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block font-bold">
              Spaceborne, Atmospheric & Maritime Sensor Feeds
            </span>
          </div>
        </div>

        <span
          className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${
            isOffline
              ? 'bg-amber-50 text-amber-900 border-amber-300'
              : 'bg-emerald-50 text-emerald-900 border-emerald-300'
          }`}
        >
          {isOffline ? 'CACHED (OFFLINE)' : 'ALL CONNECTED'}
        </span>
      </div>

      {/* 4 Required Data Sources List */}
      <div className="space-y-2.5">
        {DATA_SOURCES_SERVICES.map((src: SystemServiceItem) => {
          const Icon = iconMap[src.iconName] || Activity;
          const statusText = isOffline ? 'CACHED' : src.statusText;
          const isConnected = !isOffline && src.status === 'CONNECTED';

          return (
            <div
              key={src.id}
              className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200/90 space-y-1.5 transition-all hover:border-zinc-300 hover:bg-white"
            >
              <div className="flex items-center justify-between font-mono text-xs">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-white border border-zinc-200 text-zinc-900 shadow-2xs">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-zinc-950 font-bold">{src.name}:</span>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${
                      isConnected
                        ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                        : 'bg-amber-50 text-amber-900 border-amber-300'
                    }`}
                  >
                    {statusText}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] font-sans text-zinc-500 pt-0.5 font-medium">
                <span className="truncate">{src.description}</span>
                <span className="text-zinc-900 font-mono font-bold text-[10px] flex-shrink-0 ml-2">
                  {src.metrics}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
