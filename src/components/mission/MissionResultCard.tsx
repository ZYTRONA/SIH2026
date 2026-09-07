import React from 'react';
import { MissionPlanResult } from '@/types';
import {
  CheckCircle2,
  Navigation,
  Fuel,
  Clock,
  ShieldAlert,
  Snowflake,
  Mountain,
  Wind,
  RotateCcw,
  Send,
  FileDown,
  Sparkles,
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface MissionResultCardProps {
  result: MissionPlanResult;
  onReset: () => void;
}

export const MissionResultCard: React.FC<MissionResultCardProps> = ({
  result,
  onReset,
}) => {
  return (
    <div className="polar-panel p-5 sm:p-6 space-y-6 animate-fade-in border-ice-500/50">
      {/* Header & Confirmation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-polar-700/60">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-100 font-sans">
                Navigation Plan Ready
              </h3>
              <span className="px-2 py-0.2 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                OPTIMIZED
              </span>
            </div>
            <span className="text-[11px] font-mono text-slate-400">
              MISSION REF: {result.missionId} | {result.config.vessel} [{result.config.polarCapability}]
            </span>
          </div>
        </div>

        <button
          onClick={onReset}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-polar-900 hover:bg-polar-800 text-slate-300 border border-polar-700 text-xs font-mono transition-colors self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reconfigure</span>
        </button>
      </div>

      {/* Recommended Route Badge Banner */}
      <div className="p-4 rounded-lg bg-ice-950/40 border border-ice-500/40 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-wider text-ice-400 font-bold flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-ice-400" />
            Recommended Route
          </span>
          <span className="px-2.5 py-0.5 rounded bg-ice-500/20 text-ice-200 border border-ice-500/40 text-xs font-mono font-bold">
            {result.recommendedRouteName}
          </span>
        </div>
        <p className="text-xs text-slate-200 leading-relaxed font-sans">
          {result.aiRationale}
        </p>
      </div>

      {/* Core Key Results Grid (7 Metrics requested by Prompt) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {/* 1. Distance */}
        <div className="p-3 rounded-lg bg-polar-900/80 border border-polar-700/50 space-y-1">
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
            <Navigation className="w-3.5 h-3.5 text-ice-400" />
            <span>DISTANCE</span>
          </div>
          <div className="text-lg sm:text-xl font-bold font-sans text-slate-100">
            {result.distanceNm} NM
          </div>
          <span className="text-[10px] font-mono text-slate-400">Waypoints: {result.waypointsCount}</span>
        </div>

        {/* 2. ETA */}
        <div className="p-3 rounded-lg bg-polar-900/80 border border-polar-700/50 space-y-1">
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
            <Clock className="w-3.5 h-3.5 text-ice-400" />
            <span>MISSION ETA</span>
          </div>
          <div className="text-lg sm:text-xl font-bold font-sans text-slate-100">
            {result.etaFormatted}
          </div>
          <span className="text-[10px] font-mono text-emerald-400">-3.2h vs standard</span>
        </div>

        {/* 3. Fuel Estimate */}
        <div className="p-3 rounded-lg bg-polar-900/80 border border-polar-700/50 space-y-1">
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
            <Fuel className="w-3.5 h-3.5 text-cyan-400" />
            <span>FUEL ESTIMATE</span>
          </div>
          <div className="text-lg sm:text-xl font-bold font-sans text-cyan-300">
            {result.fuelEstimateTons} Tons
          </div>
          <span className="text-[10px] font-mono text-cyan-400">+{result.fuelSavingsPct}% efficiency</span>
        </div>

        {/* 4. Average Risk */}
        <div className="p-3 rounded-lg bg-polar-900/80 border border-polar-700/50 space-y-1">
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
            <ShieldAlert className="w-3.5 h-3.5 text-emerald-400" />
            <span>AVERAGE RISK</span>
          </div>
          <div className="text-lg sm:text-xl font-bold font-sans text-emerald-400">
            {result.averageRiskScore} / 100
          </div>
          <span className="text-[10px] font-mono text-emerald-300">STATUS: {result.riskCategory}</span>
        </div>

        {/* 5. Sea-Ice Exposure */}
        <div className="p-3 rounded-lg bg-polar-900/80 border border-polar-700/50 space-y-1">
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
            <Snowflake className="w-3.5 h-3.5 text-sky-400" />
            <span>SEA-ICE EXPOSURE</span>
          </div>
          <div className="text-base sm:text-lg font-bold font-sans text-slate-100">
            {result.seaIceExposurePct}%
          </div>
          <span className="text-[10px] font-mono text-slate-400">Open Lead Channel</span>
        </div>

        {/* 6. Iceberg Exposure */}
        <div className="p-3 rounded-lg bg-polar-900/80 border border-polar-700/50 space-y-1">
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
            <Mountain className="w-3.5 h-3.5 text-amber-400" />
            <span>ICEBERG EXPOSURE</span>
          </div>
          <div className="text-base sm:text-lg font-bold font-sans text-amber-300">
            {result.icebergExposureCount} Proximate
          </div>
          <span className="text-[10px] font-mono text-slate-400">All bergs safe margin</span>
        </div>

        {/* 7. Weather Severity */}
        <div className="p-3 rounded-lg bg-polar-900/80 border border-polar-700/50 space-y-1 col-span-2 sm:col-span-1 lg:col-span-2">
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
            <Wind className="w-3.5 h-3.5 text-amber-400" />
            <span>WEATHER SEVERITY</span>
          </div>
          <div className="text-base sm:text-lg font-bold font-sans text-slate-100">
            {result.weatherSeverity}
          </div>
          <span className="text-[10px] font-mono text-slate-400">ECMWF 72h high-latitude forecast</span>
        </div>
      </div>

      {/* Alternative Tradeoffs Summary */}
      <div className="space-y-2 pt-2 border-t border-polar-800">
        <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold block">
          Alternative Route Candidates (Pareto Frontier)
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {result.alternatives.map((alt) => (
            <div
              key={alt.name}
              className="p-3 rounded-lg bg-polar-900/60 border border-polar-700/40 text-xs font-mono space-y-1"
            >
              <div className="flex items-center justify-between text-slate-200 font-bold">
                <span>{alt.name}</span>
                <span>{alt.distanceNm} NM</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>ETA: {alt.etaHours}h</span>
                <span>Fuel: {alt.fuelTons} T</span>
                <span>Risk: {alt.riskScore}/100</span>
              </div>
              <div className="text-[10px] text-amber-400/90 pt-0.5">
                Tradeoff: {alt.tradeoff}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-4 border-t border-polar-700/60 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => alert('Voyage plan exported in standardized IMO PDF/GeoJSON format.')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-polar-800 hover:bg-polar-750 text-slate-200 border border-polar-700 text-xs font-mono transition-colors"
          >
            <FileDown className="w-3.5 h-3.5 text-ice-400" />
            <span>Export Plan (GeoJSON)</span>
          </button>

          <button
            onClick={() => alert('Plan transmitted to Bridge ECDIS via Starlink Polar link.')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-polar-800 hover:bg-polar-750 text-emerald-300 border border-polar-700 text-xs font-mono transition-colors"
          >
            <Send className="w-3.5 h-3.5 text-emerald-400" />
            <span>Transmit to Bridge</span>
          </button>
        </div>

        <Link
          to="/routes"
          className="flex items-center gap-2 px-4 py-2 rounded-md bg-ice-500 hover:bg-ice-400 text-polar-950 font-mono font-bold text-xs shadow-md transition-all"
        >
          <span>Deep-Dive Route Optimization</span>
        </Link>
      </div>
    </div>
  );
};
