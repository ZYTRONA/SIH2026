import React, { useState } from 'react';
import {
  CACHED_DATASETS_INVENTORY,
  CachedDatasetItem,
} from '@/data/systemStatusData';
import { useAppStore } from '@/store/useAppStore';
import {
  RefreshCw,
  CheckCircle2,
  ShieldCheck,
  FileCheck,
  Database,
} from 'lucide-react';

export const CacheManagerDeck: React.FC = () => {
  const { offlineCache, syncOfflineCache } = useAppStore();
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncProgress, setSyncProgress] = useState<number>(0);
  const [justSynced, setJustSynced] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [verifiedSuccess, setVerifiedSuccess] = useState<boolean>(false);

  const handleSync = () => {
    setIsSyncing(true);
    setSyncProgress(15);
    setJustSynced(false);

    const interval = setInterval(() => {
      setSyncProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSyncing(false);
          setJustSynced(true);
          syncOfflineCache();
          setTimeout(() => setJustSynced(false), 4000);
          return 100;
        }
        return prev + 25;
      });
    }, 300);
  };

  const handleVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setVerifiedSuccess(true);
      setTimeout(() => setVerifiedSuccess(false), 4000);
    }, 1200);
  };

  return (
    <div className="apple-card p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#f0f0f0]">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-[12px] bg-[#0066cc] text-white flex items-center justify-center shrink-0 shadow-xs">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-[16px] font-semibold text-[#1d1d1f] tracking-tight">
                Offline Cryospheric Cache Management
              </h3>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-[#0066cc] border border-blue-200">
                Protobuf &amp; GeoTIFF
              </span>
            </div>
            <p className="text-[12px] text-neutral-500 font-normal">
              Autonomous shipboard storage allocation for zero-downtime polar blackout resilience
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={handleVerify}
            disabled={isVerifying || isSyncing}
            className="btn-apple-secondary !min-h-[36px] !h-[36px] !px-3.5 !py-1 !text-[12px] cursor-pointer flex items-center gap-1.5"
          >
            {isVerifying ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Verifying...</span>
              </>
            ) : verifiedSuccess ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Checksums OK</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-3.5 h-3.5 text-[#0066cc]" />
                <span>Verify SHA-256</span>
              </>
            )}
          </button>

          <button
            onClick={handleSync}
            disabled={isSyncing}
            className="btn-apple-primary !min-h-[36px] !h-[36px] !px-4 !py-1 !text-[12px] cursor-pointer flex items-center gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? `Syncing (${syncProgress}%)` : justSynced ? 'Cache Updated' : 'Sync Edge Cache'}</span>
          </button>
        </div>
      </div>

      {/* Sync Progress Bar if Active */}
      {isSyncing && (
        <div className="p-4 rounded-[14px] bg-blue-50/60 border border-blue-200 space-y-2">
          <div className="flex items-center justify-between text-[12px] font-mono font-semibold text-[#0066cc]">
            <span>Downloading &amp; Rasterizing Sentinel-1 Polar Tensors...</span>
            <span>{syncProgress}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-blue-200 overflow-hidden">
            <div
              className="h-full bg-[#0066cc] rounded-full transition-all duration-300"
              style={{ width: `${syncProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Cache Metrics Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-[14px] bg-[#fafafc] border border-[#e0e0e0] space-y-1">
          <span className="text-[11px] text-neutral-500 font-medium block">Total Allocation</span>
          <span className="text-[16px] font-bold text-[#1d1d1f] font-mono block">{offlineCache.cacheSize}</span>
          <span className="text-[11px] text-neutral-400 block">128 GB NVMe Partition</span>
        </div>

        <div className="p-3.5 rounded-[14px] bg-[#fafafc] border border-[#e0e0e0] space-y-1">
          <span className="text-[11px] text-neutral-500 font-medium block">Tracked Icebergs</span>
          <span className="text-[16px] font-bold text-[#1d1d1f] font-mono block">{offlineCache.icebergsTracked} Targets</span>
          <span className="text-[11px] text-neutral-400 block">Lagrangian Vector Cones</span>
        </div>

        <div className="p-3.5 rounded-[14px] bg-[#fafafc] border border-[#e0e0e0] space-y-1">
          <span className="text-[11px] text-neutral-500 font-medium block">Precomputed Routes</span>
          <span className="text-[16px] font-bold text-[#1d1d1f] font-mono block">{offlineCache.routesPrecomputed} Primary Corridors</span>
          <span className="text-[11px] text-neutral-400 block">Pareto Rank-1 Graphs</span>
        </div>

        <div className="p-3.5 rounded-[14px] bg-[#fafafc] border border-[#e0e0e0] space-y-1">
          <span className="text-[11px] text-neutral-500 font-medium block">Last Synchronized</span>
          <span className="text-[14px] font-semibold text-[#1d1d1f] block truncate">{offlineCache.lastSyncTimestamp}</span>
          <span className="text-[11px] text-emerald-700 font-medium block">100% Integrity Verified</span>
        </div>
      </div>

      {/* Cached Datasets Inventory Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-semibold text-[#1d1d1f]">
            Preloaded Cryospheric Dataset Packages
          </span>
          <span className="text-[11px] text-neutral-500 font-medium">
            {CACHED_DATASETS_INVENTORY.length} Packages Verified
          </span>
        </div>

        <div className="space-y-2">
          {CACHED_DATASETS_INVENTORY.map((ds: CachedDatasetItem) => (
            <div
              key={ds.id}
              className="p-3 rounded-[12px] bg-[#fafafc] border border-[#e0e0e0] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 hover:bg-white hover:border-[#0066cc]/30 transition-all text-xs"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-8 w-8 rounded-[8px] bg-white border border-[#e0e0e0] text-[#0066cc] flex items-center justify-center shrink-0">
                  <FileCheck className="w-4 h-4" />
                </div>
                <div className="min-w-0 space-y-0.5">
                  <span className="font-semibold text-[13px] text-[#1d1d1f] block truncate">
                    {ds.name}
                  </span>
                  <div className="flex items-center gap-2 text-[11px] text-neutral-500">
                    <span className="font-medium text-neutral-600">{ds.type}</span>
                    <span>•</span>
                    <span>{ds.entriesCount}</span>
                    <span className="hidden md:inline">•</span>
                    <span className="hidden md:inline text-neutral-400 font-mono text-[10px]">{ds.integrityHash}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-auto shrink-0 text-[11px]">
                <span className="text-[#1d1d1f] font-mono font-bold">{ds.size}</span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-medium">
                  {ds.status}
                </span>
                <span className="text-neutral-500 text-[11px] font-mono">{ds.validUntil}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
