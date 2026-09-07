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
    <div className="polar-panel p-4 space-y-3">
      {/* Top Toggle Switch Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-polar-700/60">
        <div className="flex items-center gap-2.5">
          <div
            className={`p-2 rounded-lg border transition-all ${
              isOffline
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
            }`}
          >
            {isOffline ? <WifiOff className="w-5 h-5" /> : <Wifi className="w-5 h-5" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold font-sans text-slate-100">
                Network Connectivity & Edge Mode:
              </h3>
              <span
                className={`px-2 py-0.2 rounded text-[10px] font-mono font-bold border ${
                  isOffline
                    ? 'bg-amber-500/15 text-amber-300 border-amber-500/40'
                    : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40'
                }`}
              >
                {isOffline ? 'OFFLINE (AUTONOMOUS EDGE)' : 'ONLINE (CLOUD SYNCED)'}
              </span>
            </div>
            <span className="text-[10px] font-mono text-slate-400">
              {isOffline
                ? 'Shipboard Jetson AGX running autonomous local inference'
                : 'Live Starlink polar satellite uplink active (98.4% uptime)'}
            </span>
          </div>
        </div>

        {/* Interactive Online/Offline Mode Toggle Switch */}
        <div className="flex items-center gap-2 bg-polar-900/90 p-1 rounded-xl border border-polar-700/60 font-mono text-xs self-start sm:self-auto">
          <button
            onClick={() => onToggle(false)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              !isOffline
                ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Wifi className="w-3.5 h-3.5" />
            <span>Online</span>
          </button>

          <button
            onClick={() => onToggle(true)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              isOffline
                ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <WifiOff className="w-3.5 h-3.5" />
            <span>Offline</span>
          </button>
        </div>
      </div>

      {/* When Offline: Display the 3 Required Sentences requested by Prompt */}
      {isOffline && (
        <div className="p-4 rounded-xl bg-amber-950/25 border border-amber-500/40 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <HardDrive className="w-3.5 h-3.5 text-amber-400" />
              Autonomous Offline Operation Mode
            </span>
            <span className="px-2 py-0.2 rounded bg-amber-500/20 text-amber-300 text-[9px] font-mono font-bold border border-amber-500/30">
              CACHE ACTIVE
            </span>
          </div>

          {/* 3 Required Exact Prompts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 font-mono text-xs">
            <div className="p-2.5 rounded-lg bg-polar-900/90 border border-amber-500/30 flex items-center gap-2">
              <Database className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span className="text-slate-200 font-bold">
                Using cached environmental data
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-polar-900/90 border border-amber-500/30 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <span className="text-slate-200 font-bold">
                Local route calculation enabled
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-polar-900/90 border border-amber-500/30 flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span className="text-slate-200 font-bold">
                Last synchronization: {lastSyncFormatted}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
