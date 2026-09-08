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
    <div className="bg-white border border-[#e0e0e0] rounded-[18px] p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#f0f0f0]">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#0066cc]/10 text-[#0066cc]">
              <Cpu className="w-4 h-4" />
            </div>
            <h3 className="text-[16px] font-semibold text-[#1d1d1f] tracking-tight">
              End-to-End System Architecture Pipeline
            </h3>
          </div>
          <span className="text-[11px] font-mono text-[#86868b] uppercase tracking-wider block font-semibold">
            Cryospheric Data Ingestion → Cloud AI Analytics → Edge Deployment → Bridge Dashboard
          </span>
        </div>

        <span className="px-3 py-1 rounded-full text-[11px] font-mono bg-[#f5f5f7] text-[#1d1d1f] border border-[#e0e0e0] font-semibold self-start sm:self-auto">
          6-STAGE PIPELINE
        </span>
      </div>

      {/* Visual Flow Stages */}
      <div className="space-y-4">
        {/* Tier 1: 4 Raw Data Feeds */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px] font-mono text-[#86868b] px-1">
            <span className="font-semibold text-[#1d1d1f]">STAGE 1: RAW INGESTION FEEDS</span>
            <span className="text-[#86868b] font-normal">Continuous Satellite & Marine Telemetry</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
            <div className="p-4 rounded-xl bg-[#fafafc] border border-[#e0e0e0] flex items-center gap-3 hover:border-[#0066cc]/40 hover:bg-white transition-all">
              <div className="p-2 rounded-xl bg-white border border-[#e0e0e0] text-[#0066cc]">
                <Satellite className="w-4 h-4" />
              </div>
              <div>
                <span className="font-semibold text-[#1d1d1f] block text-[12px]">Satellite Data</span>
                <span className="text-[11px] text-[#86868b] font-normal">Sentinel / AMSR2</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#fafafc] border border-[#e0e0e0] flex items-center gap-3 hover:border-[#0066cc]/40 hover:bg-white transition-all">
              <div className="p-2 rounded-xl bg-white border border-[#e0e0e0] text-[#0066cc]">
                <Wind className="w-4 h-4" />
              </div>
              <div>
                <span className="font-semibold text-[#1d1d1f] block text-[12px]">Weather Data</span>
                <span className="text-[11px] text-[#86868b] font-normal">ECMWF / GFS</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#fafafc] border border-[#e0e0e0] flex items-center gap-3 hover:border-[#0066cc]/40 hover:bg-white transition-all">
              <div className="p-2 rounded-xl bg-white border border-[#e0e0e0] text-[#0066cc]">
                <Compass className="w-4 h-4" />
              </div>
              <div>
                <span className="font-semibold text-[#1d1d1f] block text-[12px]">Ocean Data</span>
                <span className="text-[11px] text-[#86868b] font-normal">HYCOM Currents</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#fafafc] border border-[#e0e0e0] flex items-center gap-3 hover:border-[#0066cc]/40 hover:bg-white transition-all">
              <div className="p-2 rounded-xl bg-white border border-[#e0e0e0] text-[#0066cc]">
                <Radio className="w-4 h-4" />
              </div>
              <div>
                <span className="font-semibold text-[#1d1d1f] block text-[12px]">AIS / Vessel Data</span>
                <span className="text-[11px] text-[#86868b] font-normal">Live Telemetry</span>
              </div>
            </div>
          </div>
        </div>

        {/* Down Arrow Connector */}
        <div className="flex justify-center">
          <div className="p-1.5 rounded-full bg-[#f5f5f7] border border-[#e0e0e0] text-[#0066cc]">
            <ArrowDown className="w-4 h-4" />
          </div>
        </div>

        {/* Tier 2: Cloud Intelligence Engine */}
        <div className="p-4 rounded-xl bg-[#fafafc] border border-[#e0e0e0] space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2 text-[#1d1d1f] font-semibold">
              <Cloud className="w-4 h-4 text-[#0066cc]" />
              <span className="text-[13px]">STAGE 2: Cloud Intelligence Engine</span>
            </div>
            <span
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                isOffline
                  ? 'bg-amber-500/10 text-amber-800 border-amber-500/20'
                  : 'bg-emerald-500/10 text-emerald-800 border-emerald-500/20'
              }`}
            >
              {isOffline ? 'CACHED MODEL STATE' : 'HPC COMPUTE ACTIVE'}
            </span>
          </div>
          <p className="text-[12px] text-[#424245] leading-relaxed font-normal">
            Scalable cloud infrastructure rasterizes satellite radar feeds, calibrates meteorological grids, and executes deep cryospheric model training and inference.
          </p>
        </div>

        {/* Down Arrow Connector */}
        <div className="flex justify-center">
          <div className="p-1.5 rounded-full bg-[#f5f5f7] border border-[#e0e0e0] text-[#0066cc]">
            <ArrowDown className="w-4 h-4" />
          </div>
        </div>

        {/* Tier 3: 4 Analytics Modules requested by Prompt */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px] font-mono text-[#86868b] px-1">
            <span className="font-semibold text-[#1d1d1f]">STAGE 3: AI & DETERMINISTIC ANALYTICS MODULES</span>
            <span className="text-[#86868b] font-normal">Multi-Model Decision Support</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
            {/* Sea-Ice Forecast */}
            <div className="p-4 rounded-xl bg-[#fafafc] border border-[#e0e0e0] space-y-1 hover:border-[#0066cc]/40 hover:bg-white transition-all">
              <div className="flex items-center gap-1.5 text-[#1d1d1f] font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-[#0066cc]" />
                <span>Sea-Ice Forecast</span>
              </div>
              <span className="text-[11px] text-[#86868b] block font-normal">ResUNet 72h Model</span>
            </div>

            {/* Iceberg Prediction */}
            <div className="p-4 rounded-xl bg-[#fafafc] border border-[#e0e0e0] space-y-1 hover:border-[#0066cc]/40 hover:bg-white transition-all">
              <div className="flex items-center gap-1.5 text-amber-900 font-semibold">
                <Mountain className="w-3.5 h-3.5 text-amber-600" />
                <span>Iceberg Prediction</span>
              </div>
              <span className="text-[11px] text-[#86868b] block font-normal">Physics + XGBoost</span>
            </div>

            {/* Risk Assessment */}
            <div className="p-4 rounded-xl bg-[#fafafc] border border-[#e0e0e0] space-y-1 hover:border-[#0066cc]/40 hover:bg-white transition-all">
              <div className="flex items-center gap-1.5 text-rose-900 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-rose-600" />
                <span>Risk Assessment</span>
              </div>
              <span className="text-[11px] text-[#86868b] block font-normal">IMO POLARIS RIO</span>
            </div>

            {/* Route Optimization */}
            <div className="p-4 rounded-xl bg-[#fafafc] border border-[#e0e0e0] space-y-1 hover:border-[#0066cc]/40 hover:bg-white transition-all">
              <div className="flex items-center gap-1.5 text-emerald-900 font-semibold">
                <GitFork className="w-3.5 h-3.5 text-emerald-600" />
                <span>Route Optimization</span>
              </div>
              <span className="text-[11px] text-[#86868b] block font-normal">A* + NSGA-II</span>
            </div>
          </div>
        </div>

        {/* Down Arrow Connector */}
        <div className="flex justify-center">
          <div className="p-1.5 rounded-full bg-[#f5f5f7] border border-[#e0e0e0] text-[#0066cc]">
            <ArrowDown className="w-4 h-4" />
          </div>
        </div>

        {/* Tier 4: Compact Navigation Package */}
        <div className="p-4 rounded-xl bg-[#fafafc] border border-[#e0e0e0] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2.5 text-[#1d1d1f] font-semibold">
            <PackageCheck className="w-4 h-4 text-[#0066cc]" />
            <span>STAGE 4: Compact Navigation Package</span>
            <span className="text-[11px] text-[#86868b] font-normal">
              (Binary GeoJSON & Waypoint Protocol &lt; 5 MB)
            </span>
          </div>
          <span className="text-[11px] text-emerald-800 font-semibold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            OPTIMIZED FOR POLAR SATELLITE LINK
          </span>
        </div>

        {/* Down Arrow Connector */}
        <div className="flex justify-center">
          <div className="p-1.5 rounded-full bg-[#f5f5f7] border border-[#e0e0e0] text-[#0066cc]">
            <ArrowDown className="w-4 h-4" />
          </div>
        </div>

        {/* Tier 5: Edge Engine */}
        <div className="p-4 rounded-xl bg-[#fafafc] border border-[#e0e0e0] space-y-1.5">
          <div className="flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2 text-[#1d1d1f] font-semibold">
              <Server className="w-4 h-4 text-[#0066cc]" />
              <span className="text-[13px]">STAGE 5: Edge Engine</span>
            </div>
            <span className="px-3 py-0.5 rounded-full text-[10px] font-semibold bg-[#f5f5f7] text-[#1d1d1f] border border-[#e0e0e0]">
              NVIDIA JETSON AGX SHIPBOARD
            </span>
          </div>
          <p className="text-[12px] text-[#424245] leading-relaxed font-normal">
            Maintains 48-hour local cryospheric cache and runs onboard A* contingency solver for real-time obstacle avoidance even during satellite blackout.
          </p>
        </div>

        {/* Down Arrow Connector */}
        <div className="flex justify-center">
          <div className="p-1.5 rounded-full bg-[#f5f5f7] border border-[#e0e0e0] text-[#0066cc]">
            <ArrowDown className="w-4 h-4" />
          </div>
        </div>

        {/* Tier 6: Vessel Dashboard */}
        <div className="p-5 rounded-xl bg-[#1d1d1f] text-white border border-[#1d1d1f] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/10 text-white">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="text-[14px] font-semibold text-white">
                STAGE 6: Vessel Dashboard
              </h4>
              <span className="text-[12px] font-mono text-neutral-400 font-normal">
                Mission Control, Tactical Polar Chart & Autonomous Decision Support
              </span>
            </div>
          </div>

          <span className="px-3.5 py-1.5 rounded-full bg-white text-[#1d1d1f] text-xs font-mono font-semibold self-start sm:self-auto">
            BRIDGE INTERFACE ACTIVE
          </span>
        </div>
      </div>
    </div>
  );
};
