import React from 'react';
import {
  Wifi,
  WifiOff,
  Database,
  RefreshCw,
  HardDrive,
  Cpu,
} from 'lucide-react';
import { Switch } from '@/components/ui/switch';

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
    <div className="bg-white border border-zinc-200/90 shadow-xs rounded-2xl p-5 space-y-4">
      {/* Top Toggle Switch Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-100">
        <div className="flex items-center gap-2.5">
          <div
            className={`p-2 rounded-xl border transition-all ${
              isOffline
                ? 'bg-amber-50 text-amber-900 border-amber-300'
                : 'bg-emerald-50 text-emerald-900 border-emerald-300'
            }`}
          >
            {isOffline ? <WifiOff className="w-5 h-5 text-amber-700" /> : <Wifi className="w-5 h-5 text-emerald-700" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold font-sans text-zinc-950 tracking-tight">
                Network Connectivity & Edge Mode:
              </h3>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border ${
                  isOffline
                    ? 'bg-amber-50 text-amber-900 border-amber-300'
                    : 'bg-emerald-50 text-emerald-900 border-emerald-300'
                }`}
              >
                {isOffline ? 'OFFLINE (AUTONOMOUS EDGE)' : 'ONLINE (CLOUD SYNCED)'}
              </span>
            </div>
            <span className="text-[11px] font-mono text-zinc-500 font-medium">
              {isOffline
                ? 'Shipboard Jetson AGX running autonomous local inference'
                : 'Live Starlink polar satellite uplink active (98.4% uptime)'}
            </span>
          </div>
        </div>

        {/* Interactive Radix UI Switch */}
        <div className="flex items-center gap-3 bg-zinc-50 px-3.5 py-2 rounded-xl border border-zinc-200 text-xs font-mono self-start sm:self-auto">
          <span className={`font-bold ${!isOffline ? 'text-zinc-950' : 'text-zinc-400'}`}>Online</span>
          <Switch
            checked={isOffline}
            onCheckedChange={(checked) => onToggle(checked)}
            aria-label="Toggle offline edge mode"
          />
          <span className={`font-bold ${isOffline ? 'text-amber-900' : 'text-zinc-400'}`}>Offline Edge</span>
        </div>
      </div>

      {/* When Offline: Display the 3 Required Sentences requested by Prompt */}
      {isOffline && (
        <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-300 shadow-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold text-amber-950 uppercase tracking-wider flex items-center gap-1.5">
              <HardDrive className="w-3.5 h-3.5 text-amber-800" />
              Autonomous Offline Operation Mode
            </span>
            <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-950 text-[9px] font-mono font-bold border border-amber-300">
              CACHE ACTIVE
            </span>
          </div>

          {/* 3 Required Exact Prompts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 font-mono text-xs">
            <div className="p-3 rounded-xl bg-white border border-amber-200 shadow-xs flex items-center gap-2.5">
              <Database className="w-4 h-4 text-amber-700 shrink-0" />
              <span className="text-zinc-900 font-bold text-xs">
                Using cached environmental data
              </span>
            </div>

            <div className="p-3 rounded-xl bg-white border border-amber-200 shadow-xs flex items-center gap-2.5">
              <Cpu className="w-4 h-4 text-zinc-900 shrink-0" />
              <span className="text-zinc-900 font-bold text-xs">
                Local route calculation enabled
              </span>
            </div>

            <div className="p-3 rounded-xl bg-white border border-amber-200 shadow-xs flex items-center gap-2.5">
              <RefreshCw className="w-4 h-4 text-emerald-700 shrink-0" />
              <span className="text-zinc-900 font-bold text-xs">
                Last synchronization: {lastSyncFormatted}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

