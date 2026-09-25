import React from 'react';
import {
  EDGE_HARDWARE_METRICS,
  EDGE_ENGINE_SPEC,
} from '@/data/systemStatusData';
import {
  Cpu,
  HardDrive,
  Activity,
  Zap,
  Thermometer,
  Layers,
} from 'lucide-react';

interface HardwareTelemetryDeckProps {
  isOffline?: boolean;
}

export const HardwareTelemetryDeck: React.FC<HardwareTelemetryDeckProps> = ({
  isOffline = false,
}) => {
  return (
    <div className="apple-card p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#f0f0f0]">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-[12px] bg-[#1d1d1f] text-white flex items-center justify-center shrink-0 shadow-xs">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-[15px] font-semibold text-[#1d1d1f] tracking-tight">
                Shipboard Edge Hardware Telemetry
              </h3>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                275 TOPS INT8
              </span>
            </div>
            <p className="text-[12px] text-neutral-500 font-normal">
              {EDGE_ENGINE_SPEC.hardware} • {isOffline ? 'Autonomous Edge Active' : 'Satellite Telemetry Synchronized'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto text-[11px]">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="font-semibold">TensorRT FP16:</span>
            <span className="font-mono font-bold">{EDGE_ENGINE_SPEC.inferenceLatency}</span>
          </div>
        </div>
      </div>

      {/* 4 Hardware Monitor Progress Bars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {EDGE_HARDWARE_METRICS.map((m, idx) => {
          const pct = Math.round((m.value / m.max) * 100);
          return (
            <div
              key={idx}
              className="p-4 rounded-[14px] bg-[#fafafc] border border-[#e0e0e0] space-y-3 flex flex-col justify-between hover:bg-white hover:border-[#0066cc]/40 transition-all"
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px] font-medium text-neutral-500">
                  <span className="truncate">{m.name}</span>
                  {idx === 0 ? (
                    <Zap className="w-3.5 h-3.5 text-[#0066cc]" />
                  ) : idx === 1 ? (
                    <Layers className="w-3.5 h-3.5 text-indigo-600" />
                  ) : idx === 2 ? (
                    <HardDrive className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Thermometer className="w-3.5 h-3.5 text-amber-600" />
                  )}
                </div>
                <div className="text-[18px] font-bold text-[#1d1d1f] font-mono tracking-tight">
                  {m.formattedValue}
                </div>
              </div>

              <div className="space-y-1.5">
                {/* Visual Progress Bar */}
                <div className="w-full h-2 rounded-full bg-[#e0e0e0] overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      pct > 80
                        ? 'bg-rose-500'
                        : pct > 60
                        ? 'bg-[#0066cc]'
                        : 'bg-emerald-500'
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="text-[10px] text-neutral-400 block font-normal truncate">
                  {m.detail}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edge Compute Profile Highlights */}
      <div className="p-4 rounded-[14px] bg-[#f5f5f7] border border-[#e0e0e0] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[12px]">
        <div className="flex flex-wrap items-center gap-4 text-neutral-600 text-[11px]">
          <div className="flex items-center gap-1.5">
            <span className="text-neutral-500">DLA Engines:</span>
            <span className="font-semibold text-[#1d1d1f]">2x NVDLA 2.0 Active</span>
          </div>
          <span className="hidden sm:inline text-neutral-300">•</span>
          <div className="flex items-center gap-1.5">
            <span className="text-neutral-500">Power Mode:</span>
            <span className="font-semibold text-[#1d1d1f]">50W Max-N Industrial</span>
          </div>
          <span className="hidden sm:inline text-neutral-300">•</span>
          <div className="flex items-center gap-1.5">
            <span className="text-neutral-500">CUDA Cores:</span>
            <span className="font-semibold text-[#1d1d1f]">2048 Ampere Architecture</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-medium text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 shrink-0">
          <Activity className="w-3.5 h-3.5 text-emerald-600" />
          <span>Continuous Zero-Downtime Guarantee</span>
        </div>
      </div>
    </div>
  );
};

