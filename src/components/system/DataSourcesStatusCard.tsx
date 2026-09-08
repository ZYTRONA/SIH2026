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
    <div className="bg-white border border-[#e0e0e0] rounded-[18px] p-6 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#f0f0f0]">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-[#0066cc]/10 text-[#0066cc]">
            <Database className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-[15px] font-semibold text-[#1d1d1f] tracking-tight">
              Data Sources
            </h3>
            <span className="text-[11px] font-mono text-[#86868b] uppercase tracking-wider block font-semibold">
              Spaceborne, Atmospheric & Maritime Sensor Feeds
            </span>
          </div>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-[11px] font-mono font-semibold border ${
            isOffline
              ? 'bg-amber-500/10 text-amber-800 border-amber-500/20'
              : 'bg-emerald-500/10 text-emerald-800 border-emerald-500/20'
          }`}
        >
          {isOffline ? 'CACHED (OFFLINE)' : 'ALL CONNECTED'}
        </span>
      </div>

      {/* 4 Required Data Sources List */}
      <div className="space-y-3">
        {DATA_SOURCES_SERVICES.map((src: SystemServiceItem) => {
          const Icon = iconMap[src.iconName] || Activity;
          const statusText = isOffline ? 'CACHED' : src.statusText;
          const isConnected = !isOffline && src.status === 'CONNECTED';

          return (
            <div
              key={src.id}
              className="p-4 rounded-xl bg-[#fafafc] border border-[#e0e0e0] space-y-1.5 transition-all hover:border-[#0066cc]/40 hover:bg-white"
            >
              <div className="flex items-center justify-between font-mono text-xs">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-white border border-[#e0e0e0] text-[#0066cc]">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[#1d1d1f] font-semibold text-[12px]">{src.name}:</span>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold border ${
                      isConnected
                        ? 'bg-emerald-500/10 text-emerald-800 border-emerald-500/30'
                        : 'bg-amber-500/10 text-amber-800 border-amber-500/30'
                    }`}
                  >
                    {statusText}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] font-sans text-[#424245] pt-0.5 font-normal">
                <span className="truncate">{src.description}</span>
                <span className="text-[#1d1d1f] font-mono font-semibold text-[11px] flex-shrink-0 ml-2">
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
