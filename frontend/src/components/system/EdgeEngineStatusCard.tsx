import React from 'react';
import { EDGE_ENGINE_SPEC } from '@/data/systemStatusData';
import {
  Server,
  HardDrive,
  Cpu,
  Radio,
  Layers,
  CheckCircle2,
} from 'lucide-react';

interface EdgeEngineStatusCardProps {
  isOffline?: boolean;
}

export const EdgeEngineStatusCard: React.FC<EdgeEngineStatusCardProps> = ({
  isOffline = false,
}) => {
  const edgeServices = [
    {
      id: 'edge-rt',
      name: 'Shipboard Autonomous Runtime',
      description: isOffline
        ? 'Executing localized TensorRT FP16 neural inferences'
        : 'Standby mode • Real-time satellite synchronization',
      status: isOffline ? 'Autonomous' : 'Standby',
      isPrimary: isOffline,
      metrics: EDGE_ENGINE_SPEC.inferenceLatency,
      icon: Cpu,
    },
    {
      id: 'edge-cache',
      name: 'Local Cryospheric NVMe Cache',
      description: 'Pre-cached high-resolution SAR tensors and bathymetric grids',
      status: 'Ready',
      isPrimary: true,
      metrics: '48.2 GB Loaded',
      icon: HardDrive,
    },
    {
      id: 'edge-ecdis',
      name: 'Shipboard ECDIS Transponder',
      description: 'Direct NMEA 0183 & IEC 61162-1 bridge telemetry interface',
      status: 'Linked',
      isPrimary: true,
      metrics: '1Hz Transponder',
      icon: Radio,
    },
    {
      id: 'edge-dla',
      name: 'Dual NVDLA 2.0 Accelerators',
      description: 'Dedicated hardware deep learning engines DLA-0 and DLA-1',
      status: 'Active',
      isPrimary: true,
      metrics: '2 / 2 Cores',
      icon: Layers,
    },
  ];

  return (
    <div className="apple-card h-full flex flex-col justify-between p-6 space-y-5">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#f0f0f0]">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-[12px] bg-[#1d1d1f] text-white flex items-center justify-center shrink-0 shadow-xs">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-[15px] font-semibold text-[#1d1d1f] tracking-tight">
                  Shipboard Edge Engine
                </h3>
              </div>
              <p className="text-[12px] text-neutral-500 font-normal">
                NVIDIA Jetson AGX Orin Industrial (275 TOPS)
              </p>
            </div>
          </div>

          <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-900 border border-emerald-200">
            Active Onboard
          </span>
        </div>

        {/* 4 Edge Services List (Matching Cloud Engine) */}
        <div className="space-y-2.5 pt-4">
          {edgeServices.map((srv) => {
            const Icon = srv.icon;
            return (
              <div
                key={srv.id}
                className="p-3 rounded-[12px] bg-[#fafafc] border border-[#e0e0e0] space-y-1.5 transition-all hover:bg-white hover:border-[#0066cc]/40"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="h-7 w-7 rounded-[8px] bg-white border border-[#e0e0e0] text-[#0066cc] flex items-center justify-center shrink-0">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[#1d1d1f] font-semibold text-[13px] tracking-tight">
                      {srv.name}
                    </span>
                  </div>

                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium border ${
                      srv.isPrimary
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : 'bg-blue-50 text-[#0066cc] border-blue-200'
                    }`}
                  >
                    {srv.status}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-neutral-500 pl-9">
                  <span className="truncate pr-2">{srv.description}</span>
                  <span className="text-[#1d1d1f] font-mono font-medium text-[11px] shrink-0">
                    {srv.metrics}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Status Bar */}
      <div className="flex items-center justify-between pt-3 border-t border-[#f0f0f0] text-[11px] text-neutral-500">
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>Local Engine: Zero-Downtime Autonomous Failover</span>
        </div>
        <span className="font-mono text-neutral-400">JetPack 6.0.2</span>
      </div>
    </div>
  );
};

