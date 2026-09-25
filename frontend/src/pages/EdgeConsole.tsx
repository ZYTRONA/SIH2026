import React, { useState, useEffect } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import {
  Wifi,
  WifiOff,
  RefreshCw,
  Database,
  Cpu,
  Layers,
  CheckCircle2,
  Radio,
  Zap,
  Server,
  CloudOff,
  Cloud,
} from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { offlineStorage, OfflineSyncItem } from '@/services/offlineStorage';
import { polarisApi } from '@/services/api';

export const EdgeConsole: React.FC = () => {
  const {
    isOffline,
    toggleOfflineMode,
    offlineCache,
    syncOfflineCache,
  } = useAppStore();

  const [syncQueue, setSyncQueue] = useState<OfflineSyncItem[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);

  useEffect(() => {
    loadSyncQueue();
  }, []);

  const loadSyncQueue = async () => {
    const q = await offlineStorage.getSyncQueue();
    setSyncQueue(q);
  };

  const handleManualSync = async () => {
    setIsSyncing(true);
    setTimeout(async () => {
      await offlineStorage.clearSyncQueue();
      syncOfflineCache();
      setSyncQueue([]);
      setIsSyncing(false);
    }, 800);
  };

  const handleSimulateOfflineRouteComputation = async () => {
    setTestResult('Running Shipboard Edge A* + NSGA-II Inference (0 ms Network latency)...');
    setTimeout(async () => {
      const res = await polarisApi.optimizeRoute(
        {
          vesselName: 'SA Agulhas II',
          polarClass: 'PC3',
          speedKts: 14.5,
          fuelCapacityMt: 1850,
          startLat: -70.77,
          startLng: 11.73,
          destLat: -69.41,
          destLng: 76.19,
          mode: 'Safest',
          forecastHorizonHours: 72,
        },
        true
      );

      await offlineStorage.addToSyncQueue({
        type: 'route_plan',
        payload: { routeId: res.primaryRoute.id, waypointsCount: res.primaryRoute.waypoints.length },
      });
      await loadSyncQueue();

      setTestResult(
        `SUCCESS: Computed 3 offline optimal trajectories via Local CryoDB. Distance: ${res.primaryRoute.distanceNm} NM, RIO: +${res.primaryRoute.rioScore}. Saved to Edge sync queue.`
      );
    }, 400);
  };

  return (
    <PageContainer
      title="Shipboard Edge & Offline Resilience Console"
      subtitle="Autonomous cryospheric navigation engine running offline aboard NVIDIA Jetson AGX Orin with local Sentinel-1 and ERA5 GRIB2 caches."
      badge={isOffline ? 'OFFLINE EDGE MODE (LOCAL CRYO-DB)' : 'ONLINE SATELLITE FEED'}
      badgeType={isOffline ? 'warning' : 'active'}
    >
      <div className="space-y-6">
        {/* Top Interactive Demonstration Banner: Turn Internet OFF */}
        <div className={`p-6 rounded-[18px] border transition-all duration-300 ${
          isOffline
            ? 'bg-amber-500/10 border-amber-500/30 text-[#1d1d1f]'
            : 'bg-white border-[#e0e0e0] text-[#1d1d1f]'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className={`p-3 rounded-2xl ${
                isOffline ? 'bg-amber-500 text-white' : 'bg-[#0066cc] text-white'
              }`}>
                {isOffline ? <WifiOff className="w-6 h-6" /> : <Wifi className="w-6 h-6" />}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-[17px] font-semibold tracking-tight">
                    {isOffline
                      ? 'Shipboard Edge Operating Mode: OFFLINE ISOLATION'
                      : 'Satellite Connected Mode: ONLINE SYNC ACTIVE'}
                  </h2>
                  <span className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full font-bold uppercase ${
                    isOffline
                      ? 'bg-amber-200 text-amber-900'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {isOffline ? 'Edge Offline Active' : 'Online Iridium Certus'}
                  </span>
                </div>
                <p className="text-[13px] text-neutral-600 max-w-2xl font-normal leading-relaxed">
                  {isOffline
                    ? 'All cloud API requests are intercepted and served instantaneously from local IndexedDB Cryo-Cache and on-device TensorRT models. Zero satellite telemetry dependency.'
                    : 'Real-time two-way synchronization with Copernicus Sentinel-1 downlink and ECMWF ERA5 ocean model runs.'}
                </p>
              </div>
            </div>

            {/* Offline Toggle Button (Direct Demonstration) */}
            <div className="shrink-0 flex items-center gap-3">
              <button
                type="button"
                onClick={toggleOfflineMode}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-sm ${
                  isOffline
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    : 'bg-amber-600 hover:bg-amber-700 text-white'
                }`}
              >
                {isOffline ? (
                  <>
                    <Cloud className="w-4 h-4" />
                    <span>Restore Satellite Uplink (Go Online)</span>
                  </>
                ) : (
                  <>
                    <CloudOff className="w-4 h-4" />
                    <span>Simulate Internet OFF (Go Offline)</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* 4-Column Edge Telemetry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-[#e0e0e0] rounded-[18px] p-5 space-y-2">
            <div className="flex items-center justify-between text-neutral-500 text-xs font-mono">
              <span>LOCAL CRYO-CACHE</span>
              <Database className="w-4 h-4 text-[#0066cc]" />
            </div>
            <div className="text-2xl font-bold text-[#1d1d1f] font-mono">
              {offlineCache.cacheSize}
            </div>
            <div className="text-[11px] text-neutral-500">
              AMSR2 + Sentinel-1 SAR Offline Grids
            </div>
          </div>

          <div className="bg-white border border-[#e0e0e0] rounded-[18px] p-5 space-y-2">
            <div className="flex items-center justify-between text-neutral-500 text-xs font-mono">
              <span>TRACKED ICEBERGS</span>
              <Radio className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-bold text-[#1d1d1f] font-mono">
              {offlineCache.icebergsTracked} Targets
            </div>
            <div className="text-[11px] text-neutral-500">
              Drift vectors precomputed in CryoDB
            </div>
          </div>

          <div className="bg-white border border-[#e0e0e0] rounded-[18px] p-5 space-y-2">
            <div className="flex items-center justify-between text-neutral-500 text-xs font-mono">
              <span>PRECOMPUTED ROUTES</span>
              <Layers className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-bold text-[#1d1d1f] font-mono">
              {offlineCache.routesPrecomputed} Corridors
            </div>
            <div className="text-[11px] text-neutral-500">
              A* + NSGA-II local Pareto solutions
            </div>
          </div>

          <div className="bg-white border border-[#e0e0e0] rounded-[18px] p-5 space-y-2">
            <div className="flex items-center justify-between text-neutral-500 text-xs font-mono">
              <span>EDGE HARDWARE</span>
              <Cpu className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="text-lg font-bold text-[#1d1d1f] font-mono">
              NVIDIA AGX Orin
            </div>
            <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>TensorRT 275 TOPS Active</span>
            </div>
          </div>
        </div>

        {/* Deep Resilience Testing Deck (Offline Verification) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Live Offline Execution Test (7 Cols) */}
          <div className="lg:col-span-7 bg-white border border-[#e0e0e0] rounded-[18px] p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#f0f0f0]">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#0066cc]" />
                <h3 className="text-[15px] font-semibold text-[#1d1d1f]">
                  Offline Decision Execution Benchmark
                </h3>
              </div>
              <span className="text-[11px] font-mono text-neutral-500">
                ZERO NETWORK ROUNDTRIP
              </span>
            </div>

            <p className="text-[13px] text-neutral-600 font-normal leading-relaxed">
              Click below to execute the complete A* and NSGA-II route optimization engine completely offline without any network dependency. The output will be persisted directly to local storage and queued for uplink when connection resumes.
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleSimulateOfflineRouteComputation}
                className="w-full py-3 px-4 rounded-xl bg-[#1d1d1f] hover:bg-black text-white font-medium text-xs flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
              >
                <Cpu className="w-4 h-4 text-emerald-400" />
                <span>Execute Offline Route Optimization & Local Cache Save</span>
              </button>
            </div>

            {testResult && (
              <div className="p-4 rounded-xl bg-[#fafafc] border border-[#e0e0e0] space-y-2 font-mono text-xs">
                <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Shipboard Edge Engine Output</span>
                </div>
                <p className="text-[#1d1d1f] leading-relaxed">{testResult}</p>
              </div>
            )}
          </div>

          {/* Right Column: Pending Sync Queue (5 Cols) */}
          <div className="lg:col-span-5 bg-white border border-[#e0e0e0] rounded-[18px] p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#f0f0f0]">
              <div className="flex items-center gap-2">
                <Server className="w-4 h-4 text-[#0066cc]" />
                <h3 className="text-[15px] font-semibold text-[#1d1d1f]">
                  Offline Sync Queue
                </h3>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold">
                {syncQueue.length} PENDING
              </span>
            </div>

            {syncQueue.length === 0 ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
                <p className="text-xs text-neutral-600 font-medium">
                  All local waypoint edits & route runs are synchronized.
                </p>
              </div>
            ) : (
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {syncQueue.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-lg bg-[#fafafc] border border-[#e0e0e0] flex items-center justify-between text-xs font-mono"
                  >
                    <div>
                      <div className="font-semibold text-[#1d1d1f] uppercase">{item.type}</div>
                      <div className="text-[10px] text-neutral-500">ID: {item.id}</div>
                    </div>
                    <span className="text-[10px] text-amber-700 font-bold px-2 py-0.5 rounded bg-amber-100">
                      QUEUED
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div className="pt-2">
              <button
                type="button"
                onClick={handleManualSync}
                disabled={isSyncing || syncQueue.length === 0}
                className="w-full py-2.5 px-4 rounded-xl bg-[#0066cc] hover:bg-[#0055b3] text-white text-xs font-medium flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                <span>Synchronize Queue to NCPOR Cloud</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default EdgeConsole;
