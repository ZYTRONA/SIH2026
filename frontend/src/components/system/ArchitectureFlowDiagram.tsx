import React from 'react';
import {
  Satellite,
  Wind,
  Compass,
  Radio,
  Cloud,
  Cpu,
  Sparkles,
  Mountain,
  ShieldCheck,
  GitFork,
  PackageCheck,
  Server,
  LayoutDashboard,
  ArrowDown,
} from 'lucide-react';

interface ArchitectureFlowDiagramProps {
  isOffline?: boolean;
}

export const ArchitectureFlowDiagram: React.FC<ArchitectureFlowDiagramProps> = ({
  isOffline = false,
}) => {
  return (
    <div className="apple-card p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#f0f0f0]">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-[12px] bg-[#1d1d1f] text-white flex items-center justify-center shrink-0 shadow-xs">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-[15px] font-semibold text-[#1d1d1f] tracking-tight">
              End-to-End System Architecture Pipeline
            </h3>
            <p className="text-[12px] text-neutral-500 font-normal">
              Cryospheric Data Ingestion → Cloud AI Analytics → Edge Deployment → Bridge Dashboard
            </p>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-[#f5f5f7] text-[#1d1d1f] border border-[#e0e0e0] self-start sm:self-auto">
          6-Stage Pipeline
        </span>
      </div>

      {/* Visual Flow Stages */}
      <div className="space-y-4">
        {/* Stage 1: 4 Raw Data Feeds */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px] text-neutral-500 px-1">
            <span className="font-semibold text-[#1d1d1f]">STAGE 1: RAW INGESTION FEEDS</span>
            <span>Continuous Satellite &amp; Marine Telemetry</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="p-3 rounded-[12px] bg-[#fafafc] border border-[#e0e0e0] flex items-center gap-2.5 hover:border-[#0066cc]/40 hover:bg-white transition-all">
              <div className="h-7 w-7 rounded-[8px] bg-white border border-[#e0e0e0] text-[#0066cc] flex items-center justify-center shrink-0">
                <Satellite className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <span className="font-semibold text-[#1d1d1f] block text-[12px] truncate">SAR Satellite</span>
                <span className="text-[10px] text-neutral-500 block truncate">Sentinel-1 / AMSR2</span>
              </div>
            </div>

            <div className="p-3 rounded-[12px] bg-[#fafafc] border border-[#e0e0e0] flex items-center gap-2.5 hover:border-[#0066cc]/40 hover:bg-white transition-all">
              <div className="h-7 w-7 rounded-[8px] bg-white border border-[#e0e0e0] text-[#0066cc] flex items-center justify-center shrink-0">
                <Wind className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <span className="font-semibold text-[#1d1d1f] block text-[12px] truncate">Atmospheric</span>
                <span className="text-[10px] text-neutral-500 block truncate">ECMWF HRES / GFS</span>
              </div>
            </div>

            <div className="p-3 rounded-[12px] bg-[#fafafc] border border-[#e0e0e0] flex items-center gap-2.5 hover:border-[#0066cc]/40 hover:bg-white transition-all">
              <div className="h-7 w-7 rounded-[8px] bg-white border border-[#e0e0e0] text-[#0066cc] flex items-center justify-center shrink-0">
                <Compass className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <span className="font-semibold text-[#1d1d1f] block text-[12px] truncate">Hydrodynamic</span>
                <span className="text-[10px] text-neutral-500 block truncate">HYCOM Currents</span>
              </div>
            </div>

            <div className="p-3 rounded-[12px] bg-[#fafafc] border border-[#e0e0e0] flex items-center gap-2.5 hover:border-[#0066cc]/40 hover:bg-white transition-all">
              <div className="h-7 w-7 rounded-[8px] bg-white border border-[#e0e0e0] text-[#0066cc] flex items-center justify-center shrink-0">
                <Radio className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <span className="font-semibold text-[#1d1d1f] block text-[12px] truncate">AIS &amp; Vessel</span>
                <span className="text-[10px] text-neutral-500 block truncate">Live ECDIS Ping</span>
              </div>
            </div>
          </div>
        </div>

        {/* Down Arrow Connector */}
        <div className="flex justify-center">
          <div className="h-6 w-6 rounded-full bg-[#f5f5f7] border border-[#e0e0e0] text-[#0066cc] flex items-center justify-center">
            <ArrowDown className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Stage 2: Cloud Intelligence Engine */}
        <div className="p-3.5 rounded-[12px] bg-[#fafafc] border border-[#e0e0e0] space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-[#1d1d1f] font-semibold">
              <Cloud className="w-4 h-4 text-[#0066cc]" />
              <span className="text-[13px]">STAGE 2: Cloud Intelligence Engine</span>
            </div>
            <span
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium border ${
                isOffline
                  ? 'bg-amber-50 text-amber-800 border-amber-200'
                  : 'bg-emerald-50 text-emerald-800 border-emerald-200'
              }`}
            >
              {isOffline ? 'Cached Model State' : 'HPC Compute Active'}
            </span>
          </div>
          <p className="text-[12px] text-neutral-600 leading-relaxed font-normal">
            Scalable cloud infrastructure rasterizes satellite radar feeds, calibrates meteorological grids, and executes deep cryospheric model training and inference.
          </p>
        </div>

        {/* Down Arrow Connector */}
        <div className="flex justify-center">
          <div className="h-6 w-6 rounded-full bg-[#f5f5f7] border border-[#e0e0e0] text-[#0066cc] flex items-center justify-center">
            <ArrowDown className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Stage 3: AI Analytics Modules */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px] text-neutral-500 px-1">
            <span className="font-semibold text-[#1d1d1f]">STAGE 3: AI &amp; DETERMINISTIC ANALYTICS MODULES</span>
            <span>Multi-Model Decision Support</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
            {/* Sea-Ice Forecast */}
            <div className="p-3 rounded-[12px] bg-[#fafafc] border border-[#e0e0e0] space-y-1 hover:border-[#0066cc]/40 hover:bg-white transition-all">
              <div className="flex items-center gap-1.5 text-[#1d1d1f] font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-[#0066cc]" />
                <span className="text-[12px]">Sea-Ice Forecast</span>
              </div>
              <span className="text-[11px] text-neutral-500 block font-normal">ResUNet 72h Model</span>
            </div>

            {/* Iceberg Prediction */}
            <div className="p-3 rounded-[12px] bg-[#fafafc] border border-[#e0e0e0] space-y-1 hover:border-[#0066cc]/40 hover:bg-white transition-all">
              <div className="flex items-center gap-1.5 text-neutral-900 font-semibold">
                <Mountain className="w-3.5 h-3.5 text-amber-600" />
                <span className="text-[12px]">Iceberg Prediction</span>
              </div>
              <span className="text-[11px] text-neutral-500 block font-normal">Lagrangian Drift</span>
            </div>

            {/* Risk Assessment */}
            <div className="p-3 rounded-[12px] bg-[#fafafc] border border-[#e0e0e0] space-y-1 hover:border-[#0066cc]/40 hover:bg-white transition-all">
              <div className="flex items-center gap-1.5 text-neutral-900 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-rose-600" />
                <span className="text-[12px]">Risk Assessment</span>
              </div>
              <span className="text-[11px] text-neutral-500 block font-normal">IMO POLARIS RIO</span>
            </div>

            {/* Route Optimization */}
            <div className="p-3 rounded-[12px] bg-[#fafafc] border border-[#e0e0e0] space-y-1 hover:border-[#0066cc]/40 hover:bg-white transition-all">
              <div className="flex items-center gap-1.5 text-neutral-900 font-semibold">
                <GitFork className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-[12px]">Route Optimization</span>
              </div>
              <span className="text-[11px] text-neutral-500 block font-normal">A* + NSGA-II</span>
            </div>
          </div>
        </div>

        {/* Down Arrow Connector */}
        <div className="flex justify-center">
          <div className="h-6 w-6 rounded-full bg-[#f5f5f7] border border-[#e0e0e0] text-[#0066cc] flex items-center justify-center">
            <ArrowDown className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Stage 4: Compact Navigation Package */}
        <div className="p-3.5 rounded-[12px] bg-[#fafafc] border border-[#e0e0e0] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 text-[#1d1d1f] font-semibold">
            <PackageCheck className="w-4 h-4 text-[#0066cc]" />
            <span className="text-[13px]">STAGE 4: Compact Navigation Package</span>
            <span className="text-[11px] text-neutral-500 font-normal">
              (Binary GeoJSON &amp; Waypoint Protocol &lt; 5 MB)
            </span>
          </div>
          <span className="text-[10px] text-emerald-800 font-medium bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 self-start sm:self-auto">
            Optimized For Polar Satellite Link
          </span>
        </div>

        {/* Down Arrow Connector */}
        <div className="flex justify-center">
          <div className="h-6 w-6 rounded-full bg-[#f5f5f7] border border-[#e0e0e0] text-[#0066cc] flex items-center justify-center">
            <ArrowDown className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Stage 5: Edge Engine */}
        <div className="p-3.5 rounded-[12px] bg-[#fafafc] border border-[#e0e0e0] space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-[#1d1d1f] font-semibold">
              <Server className="w-4 h-4 text-[#0066cc]" />
              <span className="text-[13px]">STAGE 5: Shipboard Edge Engine</span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-[#f5f5f7] text-[#1d1d1f] border border-[#e0e0e0]">
              NVIDIA Jetson AGX Shipboard
            </span>
          </div>
          <p className="text-[12px] text-neutral-600 leading-relaxed font-normal">
            Maintains 48-hour local cryospheric cache and runs onboard A* contingency solver for real-time obstacle avoidance even during satellite blackout.
          </p>
        </div>

        {/* Down Arrow Connector */}
        <div className="flex justify-center">
          <div className="h-6 w-6 rounded-full bg-[#f5f5f7] border border-[#e0e0e0] text-[#0066cc] flex items-center justify-center">
            <ArrowDown className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Stage 6: Vessel Dashboard */}
        <div className="p-4 rounded-[14px] bg-[#1d1d1f] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-[10px] bg-white/10 text-white flex items-center justify-center shrink-0">
              <LayoutDashboard className="w-4.5 h-4.5 text-white" />
            </div>
            <div>
              <h4 className="text-[14px] font-semibold text-white">
                STAGE 6: Vessel Dashboard &amp; Bridge ECDIS
              </h4>
              <p className="text-[11px] text-neutral-400 font-normal">
                Mission Control, Tactical Polar Chart &amp; Autonomous Decision Support
              </p>
            </div>
          </div>

          <span className="px-3 py-1 rounded-full bg-white text-[#1d1d1f] text-[11px] font-medium self-start sm:self-auto">
            Bridge Interface Active
          </span>
        </div>
      </div>
    </div>
  );
};

