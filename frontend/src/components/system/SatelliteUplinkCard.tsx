import React from 'react';
import { SATELLITE_UPLINK_DATA } from '@/data/systemStatusData';
import {
  Satellite,
  Radio,
  Clock,
  ArrowDown,
  ArrowUp,
  Activity,
  ShieldCheck,
} from 'lucide-react';

interface SatelliteUplinkCardProps {
  isOffline?: boolean;
}

export const SatelliteUplinkCard: React.FC<SatelliteUplinkCardProps> = ({
  isOffline = false,
}) => {
  return (
    <div className="apple-card h-full flex flex-col justify-between p-6 space-y-5">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#f0f0f0]">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-[12px] bg-[#1d1d1f] text-white flex items-center justify-center shrink-0 shadow-xs">
              <Satellite className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-[15px] font-semibold text-[#1d1d1f] tracking-tight">
                  Polar Satellite Constellation Uplink
                </h3>
              </div>
              <p className="text-[12px] text-neutral-500 font-normal">
                Starlink Polar Fleet • {SATELLITE_UPLINK_DATA.inclination}
              </p>
            </div>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-[11px] font-medium border ${
              isOffline
                ? 'bg-amber-50 text-amber-900 border-amber-200'
                : 'bg-emerald-50 text-emerald-900 border-emerald-200'
            }`}
          >
            {isOffline ? 'Offline Simulated' : 'Link Stable • 44ms RTT'}
          </span>
        </div>

        {/* 4 Uplink Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {/* Downlink Speed */}
          <div className="p-3 rounded-[12px] bg-[#fafafc] border border-[#e0e0e0] space-y-1">
            <div className="flex items-center justify-between text-neutral-500 text-[11px] font-medium">
              <span>Downlink</span>
              <ArrowDown className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <div className="text-[16px] font-bold text-[#1d1d1f] font-mono tracking-tight">
              {isOffline ? '0.0' : SATELLITE_UPLINK_DATA.downlinkSpeedMbps}{' '}
              <span className="text-[11px] font-normal text-neutral-500">Mbps</span>
            </div>
            <span className="text-[10px] text-neutral-400 block truncate">Ka-Band High Speed</span>
          </div>

          {/* Uplink Speed */}
          <div className="p-3 rounded-[12px] bg-[#fafafc] border border-[#e0e0e0] space-y-1">
            <div className="flex items-center justify-between text-neutral-500 text-[11px] font-medium">
              <span>Uplink</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#0066cc]" />
            </div>
            <div className="text-[16px] font-bold text-[#1d1d1f] font-mono tracking-tight">
              {isOffline ? '0.0' : SATELLITE_UPLINK_DATA.uplinkSpeedMbps}{' '}
              <span className="text-[11px] font-normal text-neutral-500">Mbps</span>
            </div>
            <span className="text-[10px] text-neutral-400 block truncate">Telemetry Sync</span>
          </div>

          {/* Signal SNR */}
          <div className="p-3 rounded-[12px] bg-[#fafafc] border border-[#e0e0e0] space-y-1">
            <div className="flex items-center justify-between text-neutral-500 text-[11px] font-medium">
              <span>Signal (SNR)</span>
              <Activity className="w-3.5 h-3.5 text-indigo-600" />
            </div>
            <div className="text-[16px] font-bold text-[#1d1d1f] font-mono tracking-tight">
              {isOffline ? 'N/A' : `${SATELLITE_UPLINK_DATA.snrDb} dB`}
            </div>
            <span className="text-[10px] text-emerald-600 font-medium block truncate">Optimal Margin</span>
          </div>

          {/* Next SAR Ingestion Pass */}
          <div className="p-3 rounded-[12px] bg-[#fafafc] border border-[#e0e0e0] space-y-1">
            <div className="flex items-center justify-between text-neutral-500 text-[11px] font-medium">
              <span>Next Pass</span>
              <Clock className="w-3.5 h-3.5 text-amber-600" />
            </div>
            <div className="text-[16px] font-bold text-[#1d1d1f] font-mono tracking-tight">
              {SATELLITE_UPLINK_DATA.nextPassTime}
            </div>
            <span className="text-[10px] text-neutral-400 block truncate">
              Sentinel-1B #444
            </span>
          </div>
        </div>

        {/* Constellation Link Details Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px]">
          <div className="p-2.5 rounded-[10px] bg-[#f5f5f7] border border-[#e0e0e0] space-y-0.5">
            <span className="text-neutral-500 block">Antenna Terminal</span>
            <span className="font-semibold text-[#1d1d1f]">Phased-Array Dual</span>
          </div>
          <div className="p-2.5 rounded-[10px] bg-[#f5f5f7] border border-[#e0e0e0] space-y-0.5">
            <span className="text-neutral-500 block">Mesh Protocol</span>
            <span className="font-semibold text-[#1d1d1f]">Laser Inter-Sat</span>
          </div>
          <div className="p-2.5 rounded-[10px] bg-[#f5f5f7] border border-[#e0e0e0] space-y-0.5 col-span-2 sm:col-span-1">
            <span className="text-neutral-500 block">Security Stream</span>
            <span className="font-semibold text-[#1d1d1f]">AES-256 GCM</span>
          </div>
        </div>

        {/* Backup & Redundancy Channels */}
        <div className="p-3 rounded-[12px] bg-[#fafafc] border border-[#e0e0e0] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5">
            <div className="h-7 w-7 rounded-[8px] bg-white border border-[#e0e0e0] text-[#0066cc] flex items-center justify-center shrink-0">
              <Radio className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="font-semibold text-[#1d1d1f] block text-[12px]">
                Emergency Telemetry Redundancy
              </span>
              <span className="text-[11px] text-neutral-500 font-normal">
                {SATELLITE_UPLINK_DATA.backupStatus}
              </span>
            </div>
          </div>

          <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-medium shrink-0 self-start sm:self-auto">
            Failover Ready
          </span>
        </div>
      </div>

      {/* Footer Status Bar */}
      <div className="flex items-center justify-between pt-3 border-t border-[#f0f0f0] text-[11px] text-neutral-500">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Starlink Maritime Low-Latency Polar Constellation</span>
        </div>
        <span className="font-mono text-neutral-400">98.4% Polar Uptime</span>
      </div>
    </div>
  );
};

