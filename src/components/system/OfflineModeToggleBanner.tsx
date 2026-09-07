import React from 'react';
import {
  Wifi,
  WifiOff,
  Database,
  RefreshCw,
  HardDrive,
  Cpu,
} from 'lucide-react';

interface OfflineModeToggleBannerProps {
  isOffline: boolean;
  onToggle: (offline: boolean) => void;
  lastSyncFormatted?: string;
}

export const OfflineModeToggleBanner: React.FC<OfflineModeToggleBannerProps> = ({
  isOffline,
  onToggle,
  lastSyncFormatted = '2 min ago',
}) => {
  return (
    <div className="bg-white border border-slate-200/90 shadow-xs rounded-xl p-4 space-y-3">
      {/* Top Toggle Switch Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2.5">
          <div
            className={`p-2 rounded-lg border transition-all ${
              isOffline
                ? 'bg-amber-50 text-amber-700 border-amber-200'
                : 'bg-emerald-50 text-emerald-700 border-emerald-200'
            }`}
          >
            {isOffline ? <WifiOff className="w-5 h-5 text-amber-600" /> : <Wifi className="w-5 h-5 text-emerald-600" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold font-sans text-slate-900">
                Network Connectivity & Edge Mode:
              </h3>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${
                  isOffline
                    ? 'bg-amber-50 text-amber-800 border-amber-200'
                    : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                }`}
              >
                {isOffline ? 'OFFLINE (AUTONOMOUS EDGE)' : 'ONLINE (CLOUD SYNCED)'}
              </span>
            </div>
            <span className="text-[10px] font-mono text-slate-500">
              {isOffline
                ? 'Shipboard Jetson AGX running autonomous local inference'
                : 'Live Starlink polar satellite uplink active (98.4% uptime)'}
            </span>
          </div>
        </div>

        {/* Interactive Online/Offline Mode Toggle Switch */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200 font-mono text-xs self-start sm:self-auto">
          <button
            onClick={() => onToggle(false)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              !isOffline
                ? 'bg-white text-emerald-700 font-bold border border-slate-200 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Wifi className="w-3.5 h-3.5 text-emerald-600" />
            <span>Online</span>
          </button>

          <button
            onClick={() => onToggle(true)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              isOffline
                ? 'bg-white text-amber-800 font-bold border border-slate-200 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <WifiOff className="w-3.5 h-3.5 text-amber-600" />
            <span>Offline</span>
          </button>
        </div>
      </div>

      {/* When Offline: Display the 3 Required Sentences requested by Prompt */}
      {isOffline && (
        <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 shadow-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
              <HardDrive className="w-3.5 h-3.5 text-amber-700" />
              Autonomous Offline Operation Mode
            </span>
            <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 text-[9px] font-mono font-bold border border-amber-300">
              CACHE ACTIVE
            </span>
          </div>

          {/* 3 Required Exact Prompts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 font-mono text-xs">
            <div className="p-2.5 rounded-lg bg-white border border-amber-200 shadow-xs flex items-center gap-2">
              <Database className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span className="text-slate-800 font-bold">
                Using cached environmental data
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-white border border-amber-200 shadow-xs flex items-center gap-2">
              <Cpu className="w-4 h-4 text-sky-600 flex-shrink-0" />
              <span className="text-slate-800 font-bold">
                Local route calculation enabled
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-white border border-amber-200 shadow-xs flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span className="text-slate-800 font-bold">
                Last synchronization: {lastSyncFormatted}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
