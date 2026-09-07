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
    <div className="bg-white border border-slate-200/90 rounded-xl p-5 sm:p-6 space-y-6 shadow-xs animate-fade-in">
      {/* Header & Confirmation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-900 font-sans">
                Navigation Plan Ready
              </h3>
              <span className="px-2 py-0.2 rounded text-[10px] font-mono bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                OPTIMIZED
              </span>
            </div>
            <span className="text-[11px] font-mono text-slate-500">
              MISSION REF: {result.missionId} | {result.config.vessel} [{result.config.polarCapability}]
            </span>
          </div>
        </div>

        <button
          onClick={onReset}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-mono transition-colors self-start sm:self-auto font-medium"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reconfigure</span>
        </button>
      </div>

      {/* Recommended Route Badge Banner */}
      <div className="p-4 rounded-xl bg-sky-50/80 border border-sky-200 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-wider text-sky-800 font-bold flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-sky-600" />
            Recommended Route
          </span>
          <span className="px-2.5 py-0.5 rounded-md bg-white text-sky-800 border border-sky-300 text-xs font-mono font-bold shadow-2xs">
            {result.recommendedRouteName}
          </span>
        </div>
        <p className="text-xs text-slate-700 leading-relaxed font-sans">
          {result.aiRationale}
        </p>
      </div>

      {/* Core Key Results Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {/* 1. Distance */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500 font-medium">
            <Navigation className="w-3.5 h-3.5 text-sky-600" />
            <span>DISTANCE</span>
          </div>
          <div className="text-lg sm:text-xl font-bold font-sans text-slate-900">
            {result.distanceNm} NM
          </div>
          <span className="text-[10px] font-mono text-slate-400">Waypoints: {result.waypointsCount}</span>
        </div>

        {/* 2. ETA */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500 font-medium">
            <Clock className="w-3.5 h-3.5 text-sky-600" />
            <span>MISSION ETA</span>
          </div>
          <div className="text-lg sm:text-xl font-bold font-sans text-slate-900">
            {result.etaFormatted}
          </div>
          <span className="text-[10px] font-mono text-emerald-700 font-semibold">-3.2h vs standard</span>
        </div>

        {/* 3. Fuel Estimate */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500 font-medium">
            <Fuel className="w-3.5 h-3.5 text-sky-600" />
            <span>FUEL ESTIMATE</span>
          </div>
          <div className="text-lg sm:text-xl font-bold font-sans text-sky-700">
            {result.fuelEstimateTons} Tons
          </div>
          <span className="text-[10px] font-mono text-sky-700 font-semibold">+{result.fuelSavingsPct}% efficiency</span>
        </div>

        {/* 4. Average Risk */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500 font-medium">
            <ShieldAlert className="w-3.5 h-3.5 text-emerald-600" />
            <span>AVERAGE RISK</span>
          </div>
          <div className="text-lg sm:text-xl font-bold font-sans text-emerald-700">
            {result.averageRiskScore} / 100
          </div>
          <span className="text-[10px] font-mono text-emerald-700 font-semibold">STATUS: {result.riskCategory}</span>
        </div>

        {/* 5. Sea-Ice Exposure */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500 font-medium">
            <Snowflake className="w-3.5 h-3.5 text-sky-600" />
            <span>SEA-ICE EXPOSURE</span>
          </div>
          <div className="text-base sm:text-lg font-bold font-sans text-slate-900">
            {result.seaIceExposurePct}%
          </div>
          <span className="text-[10px] font-mono text-slate-500">Open Lead Channel</span>
        </div>

        {/* 6. Iceberg Exposure */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500 font-medium">
            <Mountain className="w-3.5 h-3.5 text-amber-600" />
            <span>ICEBERG EXPOSURE</span>
          </div>
          <div className="text-base sm:text-lg font-bold font-sans text-amber-700">
            {result.icebergExposureCount} Proximate
          </div>
          <span className="text-[10px] font-mono text-slate-500">All bergs safe margin</span>
        </div>

        {/* 7. Weather Severity */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1 col-span-2 sm:col-span-1 lg:col-span-2">
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500 font-medium">
            <Wind className="w-3.5 h-3.5 text-amber-600" />
            <span>WEATHER SEVERITY</span>
          </div>
          <div className="text-base sm:text-lg font-bold font-sans text-slate-900">
            {result.weatherSeverity}
          </div>
          <span className="text-[10px] font-mono text-slate-500">ECMWF 72h high-latitude forecast</span>
        </div>
      </div>

      {/* Alternative Tradeoffs Summary */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold block">
          Alternative Route Candidates (Pareto Frontier)
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {result.alternatives.map((alt) => (
            <div
              key={alt.name}
              className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono space-y-1"
            >
              <div className="flex items-center justify-between text-slate-900 font-bold">
                <span>{alt.name}</span>
                <span>{alt.distanceNm} NM</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-600">
                <span>ETA: {alt.etaHours}h</span>
                <span>Fuel: {alt.fuelTons} T</span>
                <span>Risk: {alt.riskScore}/100</span>
              </div>
              <div className="text-[10px] text-amber-700 font-medium pt-0.5">
                Tradeoff: {alt.tradeoff}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => alert('Voyage plan exported in standardized IMO PDF/GeoJSON format.')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-mono transition-colors font-medium shadow-2xs"
          >
            <FileDown className="w-3.5 h-3.5 text-sky-600" />
            <span>Export Plan (GeoJSON)</span>
          </button>

          <button
            onClick={() => alert('Plan transmitted to Bridge ECDIS via Starlink Polar link.')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-mono transition-colors font-semibold shadow-2xs"
          >
            <Send className="w-3.5 h-3.5 text-emerald-600" />
            <span>Transmit to Bridge</span>
          </button>
        </div>

        <Link
          to="/routes"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-mono font-bold text-xs shadow-xs transition-all"
        >
          <span>Deep-Dive Route Optimization</span>
        </Link>
      </div>
    </div>
  );
};
