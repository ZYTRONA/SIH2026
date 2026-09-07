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
    <div className="polar-panel p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-polar-700/60">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <Server className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold font-sans text-slate-100">
              Edge Engine
            </h3>
            <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">
              Shipboard Industrial Compute Unit
            </span>
          </div>
        </div>

        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-semibold">
          ACTIVE ONBOARD
        </span>
      </div>

      {/* 3 Core Edge Metrics requested by Prompt */}
      <div className="space-y-3 font-mono text-xs">
        {/* Status: CONNECTED */}
        <div className="p-3 rounded-xl bg-polar-900/80 border border-polar-700/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded bg-polar-950 border border-polar-700 text-emerald-400">
              <Radio className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-slate-100 font-bold block">Status:</span>
              <span className="text-[10px] text-slate-400">
                {isOffline ? 'Autonomous shipboard mode' : 'Starlink Polar uplink linked'}
              </span>
            </div>
          </div>

          <span
            className={`px-2.5 py-0.5 rounded text-xs font-bold border ${
              isOffline
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
            }`}
          >
            {statusDisplay}
          </span>
        </div>

        {/* Offline Cache: READY */}
        <div className="p-3 rounded-xl bg-polar-900/80 border border-polar-700/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded bg-polar-950 border border-polar-700 text-cyan-400">
              <HardDrive className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-slate-100 font-bold block">Offline Cache:</span>
              <span className="text-[10px] text-slate-400">
                {EDGE_ENGINE_SPEC.storageAllocation}
              </span>
            </div>
          </div>

          <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/40">
            {EDGE_ENGINE_SPEC.offlineCache}
          </span>
        </div>

        {/* Last Sync: 2 min ago */}
        <div className="p-3 rounded-xl bg-polar-900/80 border border-polar-700/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded bg-polar-950 border border-polar-700 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-ice-400" />
            </div>
            <div>
              <span className="text-slate-100 font-bold block">Last Sync:</span>
              <span className="text-[10px] text-slate-400">
                {EDGE_ENGINE_SPEC.packageSize}
              </span>
            </div>
          </div>

          <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-polar-950 text-slate-200 border border-polar-700">
            {EDGE_ENGINE_SPEC.lastSyncFormatted}
          </span>
        </div>
      </div>

      {/* Hardware & Spec Footer */}
      <div className="p-2.5 rounded-lg bg-polar-900/60 border border-polar-700/40 text-[11px] font-mono text-slate-400 flex items-center justify-between">
        <span className="truncate flex items-center gap-1">
          <Cpu className="w-3 h-3 text-cyan-400 flex-shrink-0" />
          {EDGE_ENGINE_SPEC.hardware}
        </span>
        <span className="text-emerald-400 font-semibold flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3" />
          Local Solver Ready
        </span>
      </div>
    </div>
  );
};
