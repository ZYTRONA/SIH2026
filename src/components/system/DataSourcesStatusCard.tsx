import React from 'react';
import { DATA_SOURCES_SERVICES, SystemServiceItem } from '@/data/systemStatusData';
import {
  Database,
  Satellite,
  Wind,
  Compass,
  Radio,
  Activity,
  CheckCircle2,
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
    <div className="apple-card h-full flex flex-col justify-between p-6 space-y-5">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#f0f0f0]">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-[12px] bg-[#1d1d1f] text-white flex items-center justify-center shrink-0 shadow-xs">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-[15px] font-semibold text-[#1d1d1f] tracking-tight">
                  Spaceborne &amp; Sensor Feeds
                </h3>
              </div>
              <p className="text-[12px] text-neutral-500 font-normal">
                SAR Satellite, Atmospheric &amp; Maritime Ingestion
              </p>
            </div>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-[11px] font-medium border ${
              isOffline
                ? 'bg-amber-50 text-amber-900 border-amber-200'
                : 'bg-emerald-50 text-emerald-900 border-emerald-200'
            }`}
          >
            {isOffline ? 'Cached (Offline)' : 'All Connected'}
          </span>
        </div>

        {/* 4 Data Sources List */}
        <div className="space-y-2.5 pt-4">
          {DATA_SOURCES_SERVICES.map((src: SystemServiceItem) => {
            const Icon = iconMap[src.iconName] || Activity;
            const statusText = isOffline ? 'Cached' : 'Connected';
            const isConnected = !isOffline && src.status === 'CONNECTED';

            return (
              <div
                key={src.id}
                className="p-3 rounded-[12px] bg-[#fafafc] border border-[#e0e0e0] space-y-1.5 transition-all hover:bg-white hover:border-[#0066cc]/40"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="h-7 w-7 rounded-[8px] bg-white border border-[#e0e0e0] text-[#0066cc] flex items-center justify-center shrink-0">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[#1d1d1f] font-semibold text-[13px] tracking-tight">
                      {src.name}
                    </span>
                  </div>

                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium border ${
                      isConnected
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : 'bg-amber-50 text-amber-800 border-amber-200'
                    }`}
                  >
                    {statusText}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-neutral-500 pl-9">
                  <span className="truncate pr-2">{src.description}</span>
                  <span className="text-[#1d1d1f] font-mono font-medium text-[11px] shrink-0">
                    {src.metrics}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Status Bar */}
      <div className="flex items-center justify-between pt-3 border-t border-[#f0f0f0] text-[11px] text-neutral-500">
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>Ingestion Cadence: Sub-hourly SAR &amp; 1Hz ECDIS</span>
        </div>
        <span className="font-mono text-neutral-400">4 / 4 Feeds Ready</span>
      </div>
    </div>
  );
};

