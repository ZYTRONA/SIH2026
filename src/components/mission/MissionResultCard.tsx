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
    <div className="bg-white border border-zinc-200/90 rounded-xl p-5 sm:p-6 space-y-6 shadow-xs animate-fade-in">
      {/* Header & Confirmation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-100">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-black text-white">
            <CheckCircle2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-zinc-950 font-sans">
                Navigation Plan Ready
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-100 text-zinc-900 border border-zinc-200 font-bold">
                OPTIMIZED
              </span>
            </div>
            <span className="text-[11px] font-mono text-zinc-500">
              MISSION REF: {result.missionId} | {result.config.vessel} [{result.config.polarCapability}]
            </span>
          </div>
        </div>

        <button
          onClick={onReset}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-50 hover:bg-zinc-100 text-zinc-700 border border-zinc-200 text-xs font-mono transition-colors self-start sm:self-auto font-medium"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reconfigure</span>
        </button>
      </div>

      {/* Recommended Route Badge Banner */}
      <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-300 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-wider text-zinc-950 font-extrabold flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-black" />
            Recommended Route
          </span>
          <span className="px-2.5 py-0.5 rounded-md bg-black text-white text-xs font-mono font-bold shadow-xs">
            {result.recommendedRouteName}
          </span>
        </div>
        <p className="text-xs text-zinc-700 leading-relaxed font-sans font-normal">
          {result.aiRationale}
        </p>
      </div>

      {/* Core Key Results Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {/* 1. Distance */}
        <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 space-y-1">
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-500 font-semibold">
            <Navigation className="w-3.5 h-3.5 text-zinc-900" />
            <span>DISTANCE</span>
          </div>
          <div className="text-lg sm:text-xl font-extrabold font-sans text-zinc-950">
            {result.distanceNm} NM
          </div>
          <span className="text-[10px] font-mono text-zinc-400">Waypoints: {result.waypointsCount}</span>
        </div>

        {/* 2. ETA */}
        <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 space-y-1">
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-500 font-semibold">
            <Clock className="w-3.5 h-3.5 text-zinc-900" />
            <span>MISSION ETA</span>
          </div>
          <div className="text-lg sm:text-xl font-extrabold font-sans text-zinc-950">
            {result.etaFormatted}
          </div>
          <span className="text-[10px] font-mono text-emerald-900 font-bold">-3.2h vs standard</span>
        </div>

        {/* 3. Fuel Estimate */}
        <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 space-y-1">
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-500 font-semibold">
            <Fuel className="w-3.5 h-3.5 text-black" />
            <span>FUEL ESTIMATE</span>
          </div>
          <div className="text-lg sm:text-xl font-extrabold font-sans text-zinc-950">
            {result.fuelEstimateTons} Tons
          </div>
          <span className="text-[10px] font-mono text-zinc-800 font-bold">+{result.fuelSavingsPct}% efficiency</span>
        </div>

        {/* 4. Average Risk */}
        <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 space-y-1">
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-500 font-semibold">
            <ShieldAlert className="w-3.5 h-3.5 text-black" />
            <span>AVERAGE RISK</span>
          </div>
          <div className="text-lg sm:text-xl font-extrabold font-sans text-zinc-950">
            {result.averageRiskScore} / 100
          </div>
          <span className="text-[10px] font-mono text-zinc-900 font-bold">STATUS: {result.riskCategory}</span>
        </div>

        {/* 5. Sea-Ice Exposure */}
        <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 space-y-1">
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-500 font-semibold">
            <Snowflake className="w-3.5 h-3.5 text-zinc-900" />
            <span>SEA-ICE EXPOSURE</span>
          </div>
          <div className="text-base sm:text-lg font-bold font-sans text-zinc-950">
            {result.seaIceExposurePct}%
          </div>
          <span className="text-[10px] font-mono text-zinc-500">Open Lead Channel</span>
        </div>

        {/* 6. Iceberg Exposure */}
        <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 space-y-1">
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-500 font-semibold">
            <Mountain className="w-3.5 h-3.5 text-amber-800" />
            <span>ICEBERG EXPOSURE</span>
          </div>
          <div className="text-base sm:text-lg font-bold font-sans text-amber-900">
            {result.icebergExposureCount} Proximate
          </div>
          <span className="text-[10px] font-mono text-zinc-500">All bergs safe margin</span>
        </div>

        {/* 7. Weather Severity */}
        <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 space-y-1 col-span-2 sm:col-span-1 lg:col-span-2">
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-500 font-semibold">
            <Wind className="w-3.5 h-3.5 text-zinc-900" />
            <span>WEATHER SEVERITY</span>
          </div>
          <div className="text-base sm:text-lg font-bold font-sans text-zinc-950">
            {result.weatherSeverity}
          </div>
          <span className="text-[10px] font-mono text-zinc-500">ECMWF 72h high-latitude forecast</span>
        </div>
      </div>

      {/* Alternative Tradeoffs Summary */}
      <div className="space-y-2 pt-2 border-t border-zinc-100">
        <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-bold block">
          Alternative Route Candidates (Pareto Frontier)
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {result.alternatives.map((alt) => (
            <div
              key={alt.name}
              className="p-3 rounded-xl bg-white border border-zinc-200 text-xs font-mono space-y-1 shadow-2xs"
            >
              <div className="flex items-center justify-between text-zinc-950 font-bold">
                <span>{alt.name}</span>
                <span>{alt.distanceNm} NM</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-zinc-600">
                <span>ETA: {alt.etaHours}h</span>
                <span>Fuel: {alt.fuelTons} T</span>
                <span>Risk: {alt.riskScore}/100</span>
              </div>
              <div className="text-[10px] text-amber-900 font-bold pt-0.5">
                Tradeoff: {alt.tradeoff}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-4 border-t border-zinc-100 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => alert('Voyage plan exported in standardized IMO PDF/GeoJSON format.')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-zinc-50 text-zinc-800 border border-zinc-200 text-xs font-mono transition-colors font-medium shadow-xs"
          >
            <FileDown className="w-3.5 h-3.5 text-zinc-900" />
            <span>Export Plan (GeoJSON)</span>
          </button>

          <button
            onClick={() => alert('Plan transmitted to Bridge ECDIS via Starlink Polar link.')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-900 border border-zinc-200 text-xs font-mono transition-colors font-bold shadow-xs"
          >
            <Send className="w-3.5 h-3.5 text-black" />
            <span>Transmit to Bridge</span>
          </button>
        </div>

        <Link
          to="/routes"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-black hover:bg-zinc-800 text-white font-mono font-bold text-xs shadow-xs transition-all"
        >
          <span>Deep-Dive Route Optimization</span>
        </Link>
      </div>
    </div>
  );
};
