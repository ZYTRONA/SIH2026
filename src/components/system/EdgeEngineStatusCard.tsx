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
    <div className="bg-white border border-[#e0e0e0] rounded-[18px] p-6 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#f0f0f0]">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-[#0066cc]/10 text-[#0066cc]">
            <Server className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-[15px] font-semibold text-[#1d1d1f] tracking-tight">
              Edge Engine
            </h3>
            <span className="text-[11px] font-mono text-[#86868b] uppercase tracking-wider block font-semibold">
              Shipboard Industrial Compute Unit
            </span>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full text-[11px] font-mono bg-emerald-500/10 text-emerald-800 border border-emerald-500/20 font-semibold">
          ACTIVE ONBOARD
        </span>
      </div>

      {/* 3 Core Edge Metrics requested by Prompt */}
      <div className="space-y-3 font-mono text-xs">
        {/* Status: CONNECTED */}
        <div className="p-4 rounded-xl bg-[#fafafc] border border-[#e0e0e0] flex items-center justify-between hover:bg-white hover:border-[#0066cc]/40 transition-all">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-white border border-[#e0e0e0] text-[#0066cc]">
              <Radio className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-[#1d1d1f] font-semibold block text-[12px]">Status:</span>
              <span className="text-[11px] text-[#86868b] font-sans font-normal">
                {isOffline ? 'Autonomous shipboard mode' : 'Starlink Polar uplink linked'}
              </span>
            </div>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold border ${
              isOffline
                ? 'bg-amber-500/10 text-amber-800 border-amber-500/30'
                : 'bg-emerald-500/10 text-emerald-800 border-emerald-500/30'
            }`}
          >
            {statusDisplay}
          </span>
        </div>

        {/* Offline Cache: READY */}
        <div className="p-4 rounded-xl bg-[#fafafc] border border-[#e0e0e0] flex items-center justify-between hover:bg-white hover:border-[#0066cc]/40 transition-all">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-white border border-[#e0e0e0] text-[#0066cc]">
              <HardDrive className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-[#1d1d1f] font-semibold block text-[12px]">Offline Cache:</span>
              <span className="text-[11px] text-[#86868b] font-sans font-normal">
                {EDGE_ENGINE_SPEC.storageAllocation}
              </span>
            </div>
          </div>

          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#f5f5f7] text-[#1d1d1f] border border-[#e0e0e0]">
            {EDGE_ENGINE_SPEC.offlineCache}
          </span>
        </div>

        {/* Last Sync: 2 min ago */}
        <div className="p-4 rounded-xl bg-[#fafafc] border border-[#e0e0e0] flex items-center justify-between hover:bg-white hover:border-[#0066cc]/40 transition-all">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-white border border-[#e0e0e0] text-[#0066cc]">
              <Clock className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-[#1d1d1f] font-semibold block text-[12px]">Last Sync:</span>
              <span className="text-[11px] text-[#86868b] font-sans font-normal">
                {EDGE_ENGINE_SPEC.packageSize}
              </span>
            </div>
          </div>

          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#f5f5f7] text-[#1d1d1f] border border-[#e0e0e0]">
            {EDGE_ENGINE_SPEC.lastSyncFormatted}
          </span>
        </div>
      </div>

      {/* Hardware & Spec Footer */}
      <div className="p-3.5 rounded-xl bg-[#fafafc] border border-[#e0e0e0] text-[12px] font-mono text-[#424245] flex items-center justify-between">
        <span className="truncate flex items-center gap-1.5 font-normal text-[#424245]">
          <Cpu className="w-3.5 h-3.5 text-[#0066cc] flex-shrink-0" />
          {EDGE_ENGINE_SPEC.hardware}
        </span>
        <span className="text-emerald-700 font-semibold flex items-center gap-1 flex-shrink-0">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          Local Solver Ready
        </span>
      </div>
    </div>
  );
};
