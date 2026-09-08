import React from 'react';
import { EDGE_ENGINE_SPEC } from '@/data/systemStatusData';
import {
  Server,
  HardDrive,
  Clock,
  Cpu,
  Radio,
  CheckCircle2,
} from 'lucide-react';

interface EdgeEngineStatusCardProps {
  isOffline?: boolean;
}

export const EdgeEngineStatusCard: React.FC<EdgeEngineStatusCardProps> = ({
  isOffline = false,
}) => {
  const statusDisplay = isOffline ? 'READY (OFFLINE)' : EDGE_ENGINE_SPEC.statusOnline;

  return (
    <div className="bg-white border border-zinc-200/90 shadow-xs rounded-xl p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-black text-white shadow-xs">
            <Server className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold font-sans text-zinc-950">
              Edge Engine
            </h3>
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block font-bold">
              Shipboard Industrial Compute Unit
            </span>
          </div>
        </div>

        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-50 text-emerald-900 border border-emerald-300 font-bold">
          ACTIVE ONBOARD
        </span>
      </div>

      {/* 3 Core Edge Metrics requested by Prompt */}
      <div className="space-y-3 font-mono text-xs">
        {/* Status: CONNECTED */}
        <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200/90 flex items-center justify-between hover:bg-white hover:border-zinc-300 transition-all">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-white border border-zinc-200 text-zinc-900 shadow-2xs">
              <Radio className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-zinc-950 font-bold block">Status:</span>
              <span className="text-[10px] text-zinc-500 font-sans font-medium">
                {isOffline ? 'Autonomous shipboard mode' : 'Starlink Polar uplink linked'}
              </span>
            </div>
          </div>

          <span
            className={`px-2.5 py-0.5 rounded text-xs font-bold border ${
              isOffline
                ? 'bg-amber-50 text-amber-900 border-amber-300'
                : 'bg-emerald-50 text-emerald-900 border-emerald-300'
            }`}
          >
            {statusDisplay}
          </span>
        </div>

        {/* Offline Cache: READY */}
        <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200/90 flex items-center justify-between hover:bg-white hover:border-zinc-300 transition-all">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-white border border-zinc-200 text-zinc-900 shadow-2xs">
              <HardDrive className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-zinc-950 font-bold block">Offline Cache:</span>
              <span className="text-[10px] text-zinc-500 font-sans font-medium">
                {EDGE_ENGINE_SPEC.storageAllocation}
              </span>
            </div>
          </div>

          <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-zinc-100 text-zinc-900 border border-zinc-300">
            {EDGE_ENGINE_SPEC.offlineCache}
          </span>
        </div>

        {/* Last Sync: 2 min ago */}
        <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200/90 flex items-center justify-between hover:bg-white hover:border-zinc-300 transition-all">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-white border border-zinc-200 text-zinc-900 shadow-2xs">
              <Clock className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-zinc-950 font-bold block">Last Sync:</span>
              <span className="text-[10px] text-zinc-500 font-sans font-medium">
                {EDGE_ENGINE_SPEC.packageSize}
              </span>
            </div>
          </div>

          <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-zinc-100 text-zinc-900 border border-zinc-300">
            {EDGE_ENGINE_SPEC.lastSyncFormatted}
          </span>
        </div>
      </div>

      {/* Hardware & Spec Footer */}
      <div className="p-2.5 rounded-lg bg-zinc-50 border border-zinc-200 text-[11px] font-mono text-zinc-600 flex items-center justify-between">
        <span className="truncate flex items-center gap-1.5 font-medium text-zinc-700">
          <Cpu className="w-3.5 h-3.5 text-black flex-shrink-0" />
          {EDGE_ENGINE_SPEC.hardware}
        </span>
        <span className="text-emerald-900 font-bold flex items-center gap-1 flex-shrink-0">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
          Local Solver Ready
        </span>
      </div>
    </div>
  );
};
