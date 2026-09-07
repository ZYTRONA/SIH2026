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
    <div className="polar-panel p-5 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-polar-700/60">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Cpu className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold font-sans text-slate-100">
              End-to-End System Architecture Pipeline
            </h3>
          </div>
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
            Cryospheric Data Ingestion → Cloud AI Analytics → Edge Deployment → Bridge Dashboard
          </span>
        </div>

        <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-semibold self-start sm:self-auto">
          6-STAGE PIPELINE
        </span>
      </div>

      {/* Visual Flow Stages */}
      <div className="space-y-4">
        {/* Tier 1: 4 Raw Data Feeds */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 px-1">
            <span className="font-bold text-slate-300">STAGE 1: RAW INGESTION FEEDS</span>
            <span className="text-cyan-400">Continuous Satellite & Marine Telemetry</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono text-xs">
            <div className="p-3 rounded-xl bg-polar-900/80 border border-polar-700/50 flex items-center gap-2.5 hover:border-cyan-500/40 transition-all">
              <div className="p-1.5 rounded bg-polar-950 text-cyan-400">
                <Satellite className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-slate-100 block">Satellite Data</span>
                <span className="text-[10px] text-slate-400">Sentinel / AMSR2</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-polar-900/80 border border-polar-700/50 flex items-center gap-2.5 hover:border-cyan-500/40 transition-all">
              <div className="p-1.5 rounded bg-polar-950 text-amber-400">
                <Wind className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-slate-100 block">Weather Data</span>
                <span className="text-[10px] text-slate-400">ECMWF / GFS</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-polar-900/80 border border-polar-700/50 flex items-center gap-2.5 hover:border-cyan-500/40 transition-all">
              <div className="p-1.5 rounded bg-polar-950 text-emerald-400">
                <Compass className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-slate-100 block">Ocean Data</span>
                <span className="text-[10px] text-slate-400">HYCOM Currents</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-polar-900/80 border border-polar-700/50 flex items-center gap-2.5 hover:border-cyan-500/40 transition-all">
              <div className="p-1.5 rounded bg-polar-950 text-indigo-400">
                <Radio className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-slate-100 block">AIS / Vessel Data</span>
                <span className="text-[10px] text-slate-400">Live Telemetry</span>
              </div>
            </div>
          </div>
        </div>

        {/* Down Arrow Connector */}
        <div className="flex justify-center">
          <div className="p-1.5 rounded-full bg-polar-900 border border-polar-700 text-cyan-400 animate-bounce">
            <ArrowDown className="w-4 h-4" />
          </div>
        </div>

        {/* Tier 2: Cloud Intelligence Engine */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-polar-900 via-cyan-950/40 to-polar-900 border border-cyan-500/40 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2 text-cyan-300 font-bold">
              <Cloud className="w-4 h-4 text-cyan-400" />
              <span className="text-sm">STAGE 2: Cloud Intelligence Engine</span>
            </div>
            <span
              className={`px-2 py-0.2 rounded text-[10px] font-bold border ${
                isOffline
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
              }`}
            >
              {isOffline ? 'CACHED MODEL STATE' : 'HPC COMPUTE ACTIVE'}
            </span>
          </div>
          <p className="text-xs text-slate-300 font-sans leading-relaxed">
            Scalable cloud infrastructure rasterizes satellite radar feeds, calibrates meteorological grids, and executes deep cryospheric model training and inference.
          </p>
        </div>

        {/* Down Arrow Connector */}
        <div className="flex justify-center">
          <div className="p-1.5 rounded-full bg-polar-900 border border-polar-700 text-cyan-400">
            <ArrowDown className="w-4 h-4" />
          </div>
        </div>

        {/* Tier 3: 4 Analytics Modules requested by Prompt */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 px-1">
            <span className="font-bold text-slate-300">STAGE 3: AI & DETERMINISTIC ANALYTICS MODULES</span>
            <span className="text-cyan-400">Multi-Model Decision Support</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono text-xs">
            {/* Sea-Ice Forecast */}
            <div className="p-3 rounded-xl bg-polar-900/80 border border-polar-700/50 space-y-1 hover:border-cyan-500/40 transition-all">
              <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Sea-Ice Forecast</span>
              </div>
              <span className="text-[10px] text-slate-400 block">ResUNet 72h Model</span>
            </div>

            {/* Iceberg Prediction */}
            <div className="p-3 rounded-xl bg-polar-900/80 border border-polar-700/50 space-y-1 hover:border-cyan-500/40 transition-all">
              <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                <Mountain className="w-3.5 h-3.5" />
                <span>Iceberg Prediction</span>
              </div>
              <span className="text-[10px] text-slate-400 block">Physics + XGBoost</span>
            </div>

            {/* Risk Assessment */}
            <div className="p-3 rounded-xl bg-polar-900/80 border border-polar-700/50 space-y-1 hover:border-cyan-500/40 transition-all">
              <div className="flex items-center gap-1.5 text-rose-400 font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Risk Assessment</span>
              </div>
              <span className="text-[10px] text-slate-400 block">IMO POLARIS RIO</span>
            </div>

            {/* Route Optimization */}
            <div className="p-3 rounded-xl bg-polar-900/80 border border-polar-700/50 space-y-1 hover:border-cyan-500/40 transition-all">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <GitFork className="w-3.5 h-3.5" />
                <span>Route Optimization</span>
              </div>
              <span className="text-[10px] text-slate-400 block">A* + NSGA-II</span>
            </div>
          </div>
        </div>

        {/* Down Arrow Connector */}
        <div className="flex justify-center">
          <div className="p-1.5 rounded-full bg-polar-900 border border-polar-700 text-cyan-400">
            <ArrowDown className="w-4 h-4" />
          </div>
        </div>

        {/* Tier 4: Compact Navigation Package */}
        <div className="p-3.5 rounded-xl bg-polar-900/90 border border-ice-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2 text-ice-300 font-bold">
            <PackageCheck className="w-4 h-4 text-ice-400" />
            <span>STAGE 4: Compact Navigation Package</span>
            <span className="text-[10px] text-slate-400 font-normal">
              (Binary GeoJSON & Waypoint Protocol &lt; 5 MB)
            </span>
          </div>
          <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
            OPTIMIZED FOR POLAR SATELLITE LINK
          </span>
        </div>

        {/* Down Arrow Connector */}
        <div className="flex justify-center">
          <div className="p-1.5 rounded-full bg-polar-900 border border-polar-700 text-cyan-400">
            <ArrowDown className="w-4 h-4" />
          </div>
        </div>

        {/* Tier 5: Edge Engine */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-polar-900 via-emerald-950/30 to-polar-900 border border-emerald-500/40 space-y-1.5">
          <div className="flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2 text-emerald-300 font-bold">
              <Server className="w-4 h-4 text-emerald-400" />
              <span className="text-sm">STAGE 5: Edge Engine</span>
            </div>
            <span className="px-2 py-0.2 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              NVIDIA JETSON AGX SHIPBOARD
            </span>
          </div>
          <p className="text-xs text-slate-300 font-sans leading-relaxed">
            Maintains 48-hour local cryospheric cache and runs onboard A* contingency solver for real-time obstacle avoidance even during satellite blackout.
          </p>
        </div>

        {/* Down Arrow Connector */}
        <div className="flex justify-center">
          <div className="p-1.5 rounded-full bg-polar-900 border border-polar-700 text-cyan-400">
            <ArrowDown className="w-4 h-4" />
          </div>
        </div>

        {/* Tier 6: Vessel Dashboard */}
        <div className="p-4 rounded-xl bg-polar-900/90 border border-cyan-500/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-300">
              <LayoutDashboard className="w-5 h-5 text-cyan-300" />
            </div>
            <div>
              <h4 className="text-sm font-bold font-sans text-slate-100">
                STAGE 6: Vessel Dashboard
              </h4>
              <span className="text-[11px] font-mono text-slate-400">
                Mission Control, Tactical Polar Chart & Autonomous Decision Support
              </span>
            </div>
          </div>

          <span className="px-3 py-1 rounded-lg bg-cyan-500/20 text-cyan-200 border border-cyan-400/50 text-xs font-mono font-bold shadow-sm self-start sm:self-auto">
            BRIDGE INTERFACE ACTIVE
          </span>
        </div>
      </div>
    </div>
  );
};
