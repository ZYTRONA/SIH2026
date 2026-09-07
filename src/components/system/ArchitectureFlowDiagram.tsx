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
    <div className="bg-white border border-slate-200/90 shadow-xs rounded-xl p-5 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-sky-50 border border-sky-200 text-sky-700">
              <Cpu className="w-4 h-4 text-sky-600" />
            </div>
            <h3 className="text-sm font-bold font-sans text-slate-900">
              End-to-End System Architecture Pipeline
            </h3>
          </div>
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
            Cryospheric Data Ingestion → Cloud AI Analytics → Edge Deployment → Bridge Dashboard
          </span>
        </div>

        <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-sky-50 text-sky-800 border border-sky-200 font-semibold self-start sm:self-auto">
          6-STAGE PIPELINE
        </span>
      </div>

      {/* Visual Flow Stages */}
      <div className="space-y-4">
        {/* Tier 1: 4 Raw Data Feeds */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 px-1">
            <span className="font-bold text-slate-700">STAGE 1: RAW INGESTION FEEDS</span>
            <span className="text-sky-700 font-semibold">Continuous Satellite & Marine Telemetry</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 flex items-center gap-2.5 hover:border-slate-300 transition-all">
              <div className="p-1.5 rounded-lg bg-white border border-slate-200 text-sky-600 shadow-xs">
                <Satellite className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-slate-900 block">Satellite Data</span>
                <span className="text-[10px] text-slate-500">Sentinel / AMSR2</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 flex items-center gap-2.5 hover:border-slate-300 transition-all">
              <div className="p-1.5 rounded-lg bg-white border border-slate-200 text-amber-600 shadow-xs">
                <Wind className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-slate-900 block">Weather Data</span>
                <span className="text-[10px] text-slate-500">ECMWF / GFS</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 flex items-center gap-2.5 hover:border-slate-300 transition-all">
              <div className="p-1.5 rounded-lg bg-white border border-slate-200 text-emerald-600 shadow-xs">
                <Compass className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-slate-900 block">Ocean Data</span>
                <span className="text-[10px] text-slate-500">HYCOM Currents</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 flex items-center gap-2.5 hover:border-slate-300 transition-all">
              <div className="p-1.5 rounded-lg bg-white border border-slate-200 text-indigo-600 shadow-xs">
                <Radio className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-slate-900 block">AIS / Vessel Data</span>
                <span className="text-[10px] text-slate-500">Live Telemetry</span>
              </div>
            </div>
          </div>
        </div>

        {/* Down Arrow Connector */}
        <div className="flex justify-center">
          <div className="p-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-500 shadow-xs">
            <ArrowDown className="w-4 h-4" />
          </div>
        </div>

        {/* Tier 2: Cloud Intelligence Engine */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-sky-50/60 via-white to-sky-50/60 border border-sky-200/90 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2 text-sky-900 font-bold">
              <Cloud className="w-4 h-4 text-sky-600" />
              <span className="text-sm">STAGE 2: Cloud Intelligence Engine</span>
            </div>
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                isOffline
                  ? 'bg-amber-50 text-amber-800 border-amber-200'
                  : 'bg-emerald-50 text-emerald-800 border-emerald-200'
              }`}
            >
              {isOffline ? 'CACHED MODEL STATE' : 'HPC COMPUTE ACTIVE'}
            </span>
          </div>
          <p className="text-xs text-slate-600 font-sans leading-relaxed">
            Scalable cloud infrastructure rasterizes satellite radar feeds, calibrates meteorological grids, and executes deep cryospheric model training and inference.
          </p>
        </div>

        {/* Down Arrow Connector */}
        <div className="flex justify-center">
          <div className="p-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-500 shadow-xs">
            <ArrowDown className="w-4 h-4" />
          </div>
        </div>

        {/* Tier 3: 4 Analytics Modules requested by Prompt */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 px-1">
            <span className="font-bold text-slate-700">STAGE 3: AI & DETERMINISTIC ANALYTICS MODULES</span>
            <span className="text-sky-700 font-semibold">Multi-Model Decision Support</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono text-xs">
            {/* Sea-Ice Forecast */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 space-y-1 hover:border-slate-300 transition-all">
              <div className="flex items-center gap-1.5 text-sky-700 font-bold">
                <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                <span>Sea-Ice Forecast</span>
              </div>
              <span className="text-[10px] text-slate-500 block">ResUNet 72h Model</span>
            </div>

            {/* Iceberg Prediction */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 space-y-1 hover:border-slate-300 transition-all">
              <div className="flex items-center gap-1.5 text-amber-800 font-bold">
                <Mountain className="w-3.5 h-3.5 text-amber-600" />
                <span>Iceberg Prediction</span>
              </div>
              <span className="text-[10px] text-slate-500 block">Physics + XGBoost</span>
            </div>

            {/* Risk Assessment */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 space-y-1 hover:border-slate-300 transition-all">
              <div className="flex items-center gap-1.5 text-rose-800 font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-rose-600" />
                <span>Risk Assessment</span>
              </div>
              <span className="text-[10px] text-slate-500 block">IMO POLARIS RIO</span>
            </div>

            {/* Route Optimization */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 space-y-1 hover:border-slate-300 transition-all">
              <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
                <GitFork className="w-3.5 h-3.5 text-emerald-600" />
                <span>Route Optimization</span>
              </div>
              <span className="text-[10px] text-slate-500 block">A* + NSGA-II</span>
            </div>
          </div>
        </div>

        {/* Down Arrow Connector */}
        <div className="flex justify-center">
          <div className="p-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-500 shadow-xs">
            <ArrowDown className="w-4 h-4" />
          </div>
        </div>

        {/* Tier 4: Compact Navigation Package */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2 text-slate-900 font-bold">
            <PackageCheck className="w-4 h-4 text-sky-600" />
            <span>STAGE 4: Compact Navigation Package</span>
            <span className="text-[10px] text-slate-500 font-normal">
              (Binary GeoJSON & Waypoint Protocol &lt; 5 MB)
            </span>
          </div>
          <span className="text-[10px] text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            OPTIMIZED FOR POLAR SATELLITE LINK
          </span>
        </div>

        {/* Down Arrow Connector */}
        <div className="flex justify-center">
          <div className="p-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-500 shadow-xs">
            <ArrowDown className="w-4 h-4" />
          </div>
        </div>

        {/* Tier 5: Edge Engine */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-50/40 via-white to-emerald-50/40 border border-emerald-200/90 shadow-xs space-y-1.5">
          <div className="flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2 text-emerald-900 font-bold">
              <Server className="w-4 h-4 text-emerald-600" />
              <span className="text-sm">STAGE 5: Edge Engine</span>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
              NVIDIA JETSON AGX SHIPBOARD
            </span>
          </div>
          <p className="text-xs text-slate-600 font-sans leading-relaxed">
            Maintains 48-hour local cryospheric cache and runs onboard A* contingency solver for real-time obstacle avoidance even during satellite blackout.
          </p>
        </div>

        {/* Down Arrow Connector */}
        <div className="flex justify-center">
          <div className="p-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-500 shadow-xs">
            <ArrowDown className="w-4 h-4" />
          </div>
        </div>

        {/* Tier 6: Vessel Dashboard */}
        <div className="p-4 rounded-xl bg-white border border-sky-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-sky-50 border border-sky-200 text-sky-700">
              <LayoutDashboard className="w-5 h-5 text-sky-600" />
            </div>
            <div>
              <h4 className="text-sm font-bold font-sans text-slate-900">
                STAGE 6: Vessel Dashboard
              </h4>
              <span className="text-[11px] font-mono text-slate-500">
                Mission Control, Tactical Polar Chart & Autonomous Decision Support
              </span>
            </div>
          </div>

          <span className="px-3 py-1 rounded-lg bg-sky-50 text-sky-800 border border-sky-200 text-xs font-mono font-bold shadow-xs self-start sm:self-auto">
            BRIDGE INTERFACE ACTIVE
          </span>
        </div>
      </div>
    </div>
  );
};
