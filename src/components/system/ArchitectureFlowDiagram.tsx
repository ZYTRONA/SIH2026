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
    <div className="bg-white border border-zinc-200/90 shadow-xs rounded-xl p-5 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-zinc-200">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-black text-white shadow-xs">
              <Cpu className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold font-sans text-zinc-950">
              End-to-End System Architecture Pipeline
            </h3>
          </div>
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block font-bold">
            Cryospheric Data Ingestion → Cloud AI Analytics → Edge Deployment → Bridge Dashboard
          </span>
        </div>

        <span className="px-2.5 py-1 rounded-md text-[10px] font-mono bg-zinc-100 text-zinc-900 border border-zinc-300 font-bold self-start sm:self-auto">
          6-STAGE PIPELINE
        </span>
      </div>

      {/* Visual Flow Stages */}
      <div className="space-y-4">
        {/* Tier 1: 4 Raw Data Feeds */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 px-1">
            <span className="font-bold text-zinc-800">STAGE 1: RAW INGESTION FEEDS</span>
            <span className="text-zinc-600 font-semibold">Continuous Satellite & Marine Telemetry</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
            <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 flex items-center gap-3 hover:border-zinc-400 hover:bg-white transition-all shadow-xs">
              <div className="p-2 rounded-lg bg-white border border-zinc-200 text-zinc-900 shadow-2xs">
                <Satellite className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-zinc-950 block">Satellite Data</span>
                <span className="text-[10px] text-zinc-500">Sentinel / AMSR2</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 flex items-center gap-3 hover:border-zinc-400 hover:bg-white transition-all shadow-xs">
              <div className="p-2 rounded-lg bg-white border border-zinc-200 text-zinc-900 shadow-2xs">
                <Wind className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-zinc-950 block">Weather Data</span>
                <span className="text-[10px] text-zinc-500">ECMWF / GFS</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 flex items-center gap-3 hover:border-zinc-400 hover:bg-white transition-all shadow-xs">
              <div className="p-2 rounded-lg bg-white border border-zinc-200 text-zinc-900 shadow-2xs">
                <Compass className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-zinc-950 block">Ocean Data</span>
                <span className="text-[10px] text-zinc-500">HYCOM Currents</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 flex items-center gap-3 hover:border-zinc-400 hover:bg-white transition-all shadow-xs">
              <div className="p-2 rounded-lg bg-white border border-zinc-200 text-zinc-900 shadow-2xs">
                <Radio className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-zinc-950 block">AIS / Vessel Data</span>
                <span className="text-[10px] text-zinc-500">Live Telemetry</span>
              </div>
            </div>
          </div>
        </div>

        {/* Down Arrow Connector */}
        <div className="flex justify-center">
          <div className="p-1.5 rounded-full bg-zinc-100 border border-zinc-300 text-zinc-800 shadow-xs">
            <ArrowDown className="w-4 h-4" />
          </div>
        </div>

        {/* Tier 2: Cloud Intelligence Engine */}
        <div className="p-4 rounded-xl bg-white border-2 border-zinc-900 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2 text-zinc-950 font-bold">
              <Cloud className="w-4 h-4 text-black" />
              <span className="text-sm">STAGE 2: Cloud Intelligence Engine</span>
            </div>
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                isOffline
                  ? 'bg-amber-50 text-amber-900 border-amber-300'
                  : 'bg-emerald-50 text-emerald-900 border-emerald-300'
              }`}
            >
              {isOffline ? 'CACHED MODEL STATE' : 'HPC COMPUTE ACTIVE'}
            </span>
          </div>
          <p className="text-xs text-zinc-600 font-sans leading-relaxed font-medium">
            Scalable cloud infrastructure rasterizes satellite radar feeds, calibrates meteorological grids, and executes deep cryospheric model training and inference.
          </p>
        </div>

        {/* Down Arrow Connector */}
        <div className="flex justify-center">
          <div className="p-1.5 rounded-full bg-zinc-100 border border-zinc-300 text-zinc-800 shadow-xs">
            <ArrowDown className="w-4 h-4" />
          </div>
        </div>

        {/* Tier 3: 4 Analytics Modules requested by Prompt */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 px-1">
            <span className="font-bold text-zinc-800">STAGE 3: AI & DETERMINISTIC ANALYTICS MODULES</span>
            <span className="text-zinc-600 font-semibold">Multi-Model Decision Support</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
            {/* Sea-Ice Forecast */}
            <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 space-y-1 hover:border-zinc-400 hover:bg-white transition-all shadow-xs">
              <div className="flex items-center gap-1.5 text-zinc-950 font-bold">
                <Sparkles className="w-3.5 h-3.5 text-black" />
                <span>Sea-Ice Forecast</span>
              </div>
              <span className="text-[10px] text-zinc-500 block">ResUNet 72h Model</span>
            </div>

            {/* Iceberg Prediction */}
            <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 space-y-1 hover:border-zinc-400 hover:bg-white transition-all shadow-xs">
              <div className="flex items-center gap-1.5 text-amber-950 font-bold">
                <Mountain className="w-3.5 h-3.5 text-amber-700" />
                <span>Iceberg Prediction</span>
              </div>
              <span className="text-[10px] text-zinc-500 block">Physics + XGBoost</span>
            </div>

            {/* Risk Assessment */}
            <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 space-y-1 hover:border-zinc-400 hover:bg-white transition-all shadow-xs">
              <div className="flex items-center gap-1.5 text-rose-950 font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-rose-700" />
                <span>Risk Assessment</span>
              </div>
              <span className="text-[10px] text-zinc-500 block">IMO POLARIS RIO</span>
            </div>

            {/* Route Optimization */}
            <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 space-y-1 hover:border-zinc-400 hover:bg-white transition-all shadow-xs">
              <div className="flex items-center gap-1.5 text-emerald-950 font-bold">
                <GitFork className="w-3.5 h-3.5 text-emerald-700" />
                <span>Route Optimization</span>
              </div>
              <span className="text-[10px] text-zinc-500 block">A* + NSGA-II</span>
            </div>
          </div>
        </div>

        {/* Down Arrow Connector */}
        <div className="flex justify-center">
          <div className="p-1.5 rounded-full bg-zinc-100 border border-zinc-300 text-zinc-800 shadow-xs">
            <ArrowDown className="w-4 h-4" />
          </div>
        </div>

        {/* Tier 4: Compact Navigation Package */}
        <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono shadow-xs">
          <div className="flex items-center gap-2.5 text-zinc-950 font-bold">
            <PackageCheck className="w-4 h-4 text-black" />
            <span>STAGE 4: Compact Navigation Package</span>
            <span className="text-[10px] text-zinc-500 font-normal">
              (Binary GeoJSON & Waypoint Protocol &lt; 5 MB)
            </span>
          </div>
          <span className="text-[10px] text-emerald-900 font-bold bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-300">
            OPTIMIZED FOR POLAR SATELLITE LINK
          </span>
        </div>

        {/* Down Arrow Connector */}
        <div className="flex justify-center">
          <div className="p-1.5 rounded-full bg-zinc-100 border border-zinc-300 text-zinc-800 shadow-xs">
            <ArrowDown className="w-4 h-4" />
          </div>
        </div>

        {/* Tier 5: Edge Engine */}
        <div className="p-4 rounded-xl bg-white border-2 border-zinc-800 shadow-xs space-y-1.5">
          <div className="flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2 text-zinc-950 font-bold">
              <Server className="w-4 h-4 text-black" />
              <span className="text-sm">STAGE 5: Edge Engine</span>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-zinc-100 text-zinc-900 border border-zinc-300">
              NVIDIA JETSON AGX SHIPBOARD
            </span>
          </div>
          <p className="text-xs text-zinc-600 font-sans leading-relaxed font-medium">
            Maintains 48-hour local cryospheric cache and runs onboard A* contingency solver for real-time obstacle avoidance even during satellite blackout.
          </p>
        </div>

        {/* Down Arrow Connector */}
        <div className="flex justify-center">
          <div className="p-1.5 rounded-full bg-zinc-100 border border-zinc-300 text-zinc-800 shadow-xs">
            <ArrowDown className="w-4 h-4" />
          </div>
        </div>

        {/* Tier 6: Vessel Dashboard */}
        <div className="p-4 rounded-xl bg-black text-white border border-black shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="text-sm font-bold font-sans text-white">
                STAGE 6: Vessel Dashboard
              </h4>
              <span className="text-[11px] font-mono text-zinc-400">
                Mission Control, Tactical Polar Chart & Autonomous Decision Support
              </span>
            </div>
          </div>

          <span className="px-3 py-1 rounded-md bg-white text-black text-xs font-mono font-bold shadow-xs self-start sm:self-auto">
            BRIDGE INTERFACE ACTIVE
          </span>
        </div>
      </div>
    </div>
  );
};
