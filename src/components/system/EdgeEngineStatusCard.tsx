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
    <div className="bg-white border border-slate-200/90 shadow-xs rounded-xl p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700">
            <Server className="w-4 h-4 text-emerald-600" />
          </div>
          <div>
            <h3 className="text-sm font-bold font-sans text-slate-900">
              Edge Engine
            </h3>
            <span className="text-[10px] font-mono text-emerald-700 uppercase tracking-wider block">
              Shipboard Industrial Compute Unit
            </span>
          </div>
        </div>

        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
          ACTIVE ONBOARD
        </span>
      </div>

      {/* 3 Core Edge Metrics requested by Prompt */}
      <div className="space-y-3 font-mono text-xs">
        {/* Status: CONNECTED */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded bg-white border border-slate-200 text-emerald-600 shadow-xs">
              <Radio className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-slate-900 font-bold block">Status:</span>
              <span className="text-[10px] text-slate-500">
                {isOffline ? 'Autonomous shipboard mode' : 'Starlink Polar uplink linked'}
              </span>
            </div>
          </div>

          <span
            className={`px-2.5 py-0.5 rounded text-xs font-bold border ${
              isOffline
                ? 'bg-amber-50 text-amber-800 border border-amber-200'
                : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
            }`}
          >
            {statusDisplay}
          </span>
        </div>

        {/* Offline Cache: READY */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded bg-white border border-slate-200 text-sky-600 shadow-xs">
              <HardDrive className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-slate-900 font-bold block">Offline Cache:</span>
              <span className="text-[10px] text-slate-500">
                {EDGE_ENGINE_SPEC.storageAllocation}
              </span>
            </div>
          </div>

          <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-sky-50 text-sky-800 border border-sky-200">
            {EDGE_ENGINE_SPEC.offlineCache}
          </span>
        </div>

        {/* Last Sync: 2 min ago */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded bg-white border border-slate-200 text-slate-600 shadow-xs">
              <Clock className="w-3.5 h-3.5 text-sky-600" />
            </div>
            <div>
              <span className="text-slate-900 font-bold block">Last Sync:</span>
              <span className="text-[10px] text-slate-500">
                {EDGE_ENGINE_SPEC.packageSize}
              </span>
            </div>
          </div>

          <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-slate-100 text-slate-800 border border-slate-200">
            {EDGE_ENGINE_SPEC.lastSyncFormatted}
          </span>
        </div>
      </div>

      {/* Hardware & Spec Footer */}
      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-[11px] font-mono text-slate-600 flex items-center justify-between">
        <span className="truncate flex items-center gap-1.5">
          <Cpu className="w-3.5 h-3.5 text-sky-600 flex-shrink-0" />
          {EDGE_ENGINE_SPEC.hardware}
        </span>
        <span className="text-emerald-700 font-semibold flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          Local Solver Ready
        </span>
      </div>
    </div>
  );
};
