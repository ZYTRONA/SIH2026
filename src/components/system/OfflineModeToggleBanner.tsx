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
import { useAppStore } from '@/store/useAppStore';

interface OfflineModeToggleBannerProps {
  isOffline?: boolean;
  onToggle?: (offline: boolean) => void;
  lastSyncFormatted?: string;
}

export const OfflineModeToggleBanner: React.FC<OfflineModeToggleBannerProps> = ({
  isOffline: propIsOffline,
  onToggle: propOnToggle,
  lastSyncFormatted,
}) => {
  const {
    isOffline: storeIsOffline,
    toggleOfflineMode,
    offlineCache,
    syncOfflineCache,
  } = useAppStore();

  const isOffline = propIsOffline !== undefined ? propIsOffline : storeIsOffline;
  const handleToggle = (checked: boolean) => {
    if (propOnToggle) {
      propOnToggle(checked);
    } else {
      toggleOfflineMode();
    }
  };

  const displaySync = lastSyncFormatted || offlineCache.lastSyncTimestamp;

  return (
    <div className="apple-card p-6 space-y-4">
      {/* Top Toggle Switch Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#f0f0f0]">
        <div className="flex items-center gap-3">
          <div
            className={`p-3 rounded-full border transition-all ${
              isOffline
                ? 'bg-amber-50 border-amber-200 text-amber-900'
                : 'bg-emerald-50 border-emerald-200 text-emerald-900'
            }`}
          >
            {isOffline ? (
              <WifiOff className="w-5 h-5 text-amber-600" />
            ) : (
              <Wifi className="w-5 h-5 text-emerald-600" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-[15px] font-semibold text-[#1d1d1f] tracking-tight">
                Network Telemetry & Edge Mode:
              </h3>
              <span
                className={`px-3 py-0.5 rounded-full text-[11px] font-semibold border ${
                  isOffline
                    ? 'bg-amber-50 text-amber-900 border-amber-200'
                    : 'bg-emerald-50 text-emerald-900 border-emerald-200'
                }`}
              >
                {isOffline ? 'Offline Edge Active' : 'Cloud Satellite Synced'}
              </span>
            </div>
            <p className="text-[12px] text-neutral-500 font-normal mt-0.5">
              {isOffline
                ? 'Shipboard Jetson AGX Orin (64GB) executing autonomous local inference'
                : 'Live Starlink polar constellation satellite uplink active (98.4% uptime)'}
            </p>
          </div>
        </div>

        {/* Interactive Switch */}
        <div className="flex items-center gap-3 bg-[#f5f5f7] px-4 py-2 rounded-full border border-[#e0e0e0] text-[13px] self-start sm:self-auto min-h-[44px]">
          <span className={`font-normal ${!isOffline ? 'text-[#1d1d1f]' : 'text-neutral-400'}`}>
            Online
          </span>
          <Switch
            checked={isOffline}
            onCheckedChange={handleToggle}
            aria-label="Toggle autonomous offline edge mode"
          />
          <span
            className={`font-semibold ${
              isOffline ? 'text-amber-800' : 'text-neutral-400'
            }`}
          >
            Offline Edge
          </span>
        </div>
      </div>

      {/* When Offline: Display Required Sentences + Real Cache Telemetry */}
      {isOffline && (
        <div className="p-4 rounded-[14px] bg-amber-50/50 border border-amber-200 space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-[12px] font-semibold text-amber-900 uppercase tracking-wider flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-amber-700" />
              Autonomous Offline Cryo-Cache Telemetry ({offlineCache.cacheSize})
            </span>
            <button
              onClick={syncOfflineCache}
              className="btn-apple-secondary !min-h-[32px] !h-[32px] !py-0.5 !px-3 !text-[12px]"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Verify Local Cache</span>
            </button>
          </div>

          {/* 3 Core Prompts formatted in Apple card style */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[12px]">
            <div className="p-3.5 rounded-[12px] bg-white border border-[#e0e0e0] flex items-center gap-3">
              <Database className="w-4.5 h-4.5 text-amber-600 shrink-0" />
              <div>
                <span className="text-[#1d1d1f] font-semibold block">
                  Using cached environmental data
                </span>
                <span className="text-[11px] text-neutral-500">
                  SAR Pass #443 &bull; {offlineCache.icebergsTracked} Targets Preloaded
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-[12px] bg-white border border-[#e0e0e0] flex items-center gap-3">
              <Cpu className="w-4.5 h-4.5 text-[#0066cc] shrink-0" />
              <div>
                <span className="text-[#1d1d1f] font-semibold block">
                  Local route calculation enabled
                </span>
                <span className="text-[11px] text-neutral-500">
                  Shipboard A* + NSGA-II Solver active
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-[12px] bg-white border border-[#e0e0e0] flex items-center gap-3">
              <RefreshCw className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
              <div>
                <span className="text-[#1d1d1f] font-semibold block">
                  Last synchronization: {displaySync}
                </span>
                <span className="text-[11px] text-emerald-700">
                  Storage Quota: {offlineCache.storageQuotaUsedPercent}% Used
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
