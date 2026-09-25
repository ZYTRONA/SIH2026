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
    <div className="bg-white border border-[#e0e0e0] rounded-[18px] p-6 space-y-6 animate-fade-in">
      {/* Header & Confirmation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#f0f0f0]">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-full bg-[#f0fdf4] border border-emerald-200 text-emerald-600">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-[17px] font-semibold text-[#1d1d1f] tracking-[-0.28px]">
                Navigation Plan Ready
              </h3>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#f0f7ff] text-[#0066cc] border border-[#d0e6ff]">
                OPTIMIZED
              </span>
            </div>
            <span className="text-[12px] text-neutral-500 font-normal">
              MISSION REF: {result.missionId} &bull; {result.config.vessel} [{result.config.polarCapability}]
            </span>
          </div>
        </div>

        <button
          onClick={onReset}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#f5f5f7] hover:bg-[#e0e0e0] text-[#1d1d1f] border border-[#e0e0e0] text-[12px] font-normal transition-colors self-start sm:self-auto active:scale-95"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reconfigure</span>
        </button>
      </div>

      {/* Recommended Route Banner */}
      <div className="p-4 rounded-[14px] bg-[#fafafc] border border-[#e0e0e0] space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[12px] uppercase tracking-wider text-[#1d1d1f] font-semibold flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#0066cc]" />
            Recommended Route
          </span>
          <span className="px-3 py-1 rounded-full bg-[#0066cc] text-white text-[12px] font-semibold">
            {result.recommendedRouteName}
          </span>
        </div>
        <p className="text-[13px] text-neutral-600 leading-relaxed font-normal">
          {result.aiRationale}
        </p>
      </div>

      {/* Core Key Results Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {/* 1. Distance */}
        <div className="p-3.5 rounded-[14px] bg-[#fafafc] border border-[#e0e0e0] space-y-1">
          <div className="flex items-center gap-1.5 text-[11px] text-neutral-500 font-normal">
            <Navigation className="w-3.5 h-3.5 text-[#0066cc]" />
            <span>DISTANCE</span>
          </div>
          <div className="text-[20px] font-semibold text-[#1d1d1f] tracking-[-0.2px]">
            {result.distanceNm} <span className="text-[13px] font-normal text-neutral-500">NM</span>
          </div>
          <span className="text-[11px] text-neutral-400 font-normal">Waypoints: {result.waypointsCount}</span>
        </div>

        {/* 2. ETA */}
        <div className="p-3.5 rounded-[14px] bg-[#fafafc] border border-[#e0e0e0] space-y-1">
          <div className="flex items-center gap-1.5 text-[11px] text-neutral-500 font-normal">
            <Clock className="w-3.5 h-3.5 text-[#0066cc]" />
            <span>MISSION ETA</span>
          </div>
          <div className="text-[20px] font-semibold text-[#1d1d1f] tracking-[-0.2px]">
            {result.etaFormatted}
          </div>
          <span className="text-[11px] text-emerald-700 font-normal">-3.2h vs standard</span>
        </div>

        {/* 3. Fuel Estimate */}
        <div className="p-3.5 rounded-[14px] bg-[#fafafc] border border-[#e0e0e0] space-y-1">
          <div className="flex items-center gap-1.5 text-[11px] text-neutral-500 font-normal">
            <Fuel className="w-3.5 h-3.5 text-[#0066cc]" />
            <span>FUEL ESTIMATE</span>
          </div>
          <div className="text-[20px] font-semibold text-[#1d1d1f] tracking-[-0.2px]">
            {result.fuelEstimateTons} <span className="text-[13px] font-normal text-neutral-500">Tons</span>
          </div>
          <span className="text-[11px] text-[#0066cc] font-normal">+{result.fuelSavingsPct}% efficiency</span>
        </div>

        {/* 4. Average Risk */}
        <div className="p-3.5 rounded-[14px] bg-[#fafafc] border border-[#e0e0e0] space-y-1">
          <div className="flex items-center gap-1.5 text-[11px] text-neutral-500 font-normal">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
            <span>AVERAGE RISK</span>
          </div>
          <div className="text-[20px] font-semibold text-[#1d1d1f] tracking-[-0.2px]">
            {result.averageRiskScore} <span className="text-[13px] font-normal text-neutral-500">/ 100</span>
          </div>
          <span className="text-[11px] text-neutral-600 font-normal">STATUS: {result.riskCategory}</span>
        </div>

        {/* 5. Sea-Ice Exposure */}
        <div className="p-3.5 rounded-[14px] bg-[#fafafc] border border-[#e0e0e0] space-y-1">
          <div className="flex items-center gap-1.5 text-[11px] text-neutral-500 font-normal">
            <Snowflake className="w-3.5 h-3.5 text-[#0066cc]" />
            <span>SEA-ICE EXPOSURE</span>
          </div>
          <div className="text-[18px] font-semibold text-[#1d1d1f]">
            {result.seaIceExposurePct}%
          </div>
          <span className="text-[11px] text-neutral-500 font-normal">Open Lead Channel</span>
        </div>

        {/* 6. Iceberg Exposure */}
        <div className="p-3.5 rounded-[14px] bg-[#fafafc] border border-[#e0e0e0] space-y-1">
          <div className="flex items-center gap-1.5 text-[11px] text-neutral-500 font-normal">
            <Mountain className="w-3.5 h-3.5 text-amber-600" />
            <span>ICEBERG EXPOSURE</span>
          </div>
          <div className="text-[18px] font-semibold text-[#1d1d1f]">
            {result.icebergExposureCount} Proximate
          </div>
          <span className="text-[11px] text-neutral-500 font-normal">Safe safety buffer</span>
        </div>

        {/* 7. Weather Severity */}
        <div className="p-3.5 rounded-[14px] bg-[#fafafc] border border-[#e0e0e0] space-y-1 col-span-2 sm:col-span-1 lg:col-span-2">
          <div className="flex items-center gap-1.5 text-[11px] text-neutral-500 font-normal">
            <Wind className="w-3.5 h-3.5 text-[#0066cc]" />
            <span>WEATHER SEVERITY</span>
          </div>
          <div className="text-[18px] font-semibold text-[#1d1d1f]">
            {result.weatherSeverity}
          </div>
          <span className="text-[11px] text-neutral-500 font-normal">ECMWF 72h high-latitude forecast</span>
        </div>
      </div>

      {/* Alternative Tradeoffs Summary */}
      <div className="space-y-2.5 pt-3 border-t border-[#f0f0f0]">
        <span className="text-[12px] uppercase tracking-wider text-neutral-500 font-semibold block">
          Alternative Route Candidates (Pareto Frontier)
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {result.alternatives.map((alt) => (
            <div
              key={alt.name}
              className="p-3.5 rounded-[14px] bg-[#fafafc] border border-[#e0e0e0] text-[12px] space-y-1.5"
            >
              <div className="flex items-center justify-between text-[#1d1d1f] font-semibold">
                <span>{alt.name}</span>
                <span>{alt.distanceNm} NM</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-neutral-500 font-normal">
                <span>ETA: {alt.etaHours}h</span>
                <span>Fuel: {alt.fuelTons} T</span>
                <span>Risk: {alt.riskScore}/100</span>
              </div>
              <div className="text-[11px] text-amber-700 font-normal pt-0.5">
                Tradeoff: {alt.tradeoff}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-4 border-t border-[#f0f0f0] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => alert('Voyage plan exported in standardized IMO GeoJSON format.')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-[#f5f5f7] text-[#1d1d1f] border border-[#e0e0e0] text-[13px] font-normal transition-colors active:scale-95"
          >
            <FileDown className="w-3.5 h-3.5 text-[#0066cc]" />
            <span>Export Plan (GeoJSON)</span>
          </button>

          <button
            onClick={() => alert('Plan transmitted to Bridge ECDIS via Starlink Polar link.')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#f5f5f7] hover:bg-[#e0e0e0] text-[#1d1d1f] border border-[#e0e0e0] text-[13px] font-semibold transition-colors active:scale-95"
          >
            <Send className="w-3.5 h-3.5 text-[#0066cc]" />
            <span>Transmit to Bridge</span>
          </button>
        </div>

        <Link
          to="/routes"
          className="btn-apple-primary text-[13px]"
        >
          <span>Deep-Dive Route Optimization</span>
        </Link>
      </div>
    </div>
  );
};
