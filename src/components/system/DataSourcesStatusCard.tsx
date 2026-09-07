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
    <div className="bg-white border border-slate-200/90 shadow-xs rounded-xl p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-sky-50 border border-sky-200 text-sky-700">
            <Database className="w-4 h-4 text-sky-600" />
          </div>
          <div>
            <h3 className="text-sm font-bold font-sans text-slate-900">
              Data Sources
            </h3>
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
              Spaceborne, Atmospheric & Maritime Sensor Feeds
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
              className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 space-y-1.5 transition-all hover:border-slate-300"
            >
              <div className="flex items-center justify-between font-mono text-xs">
                <div className="flex items-center gap-2">
                  <div className="p-1 rounded bg-white border border-slate-200 text-sky-600 shadow-xs">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-slate-900 font-bold">{src.name}:</span>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                      isConnected
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}
                  >
                    {statusText}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-0.5">
                <span className="truncate">{src.description}</span>
                <span className="text-sky-700 font-semibold flex-shrink-0 ml-2">
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
