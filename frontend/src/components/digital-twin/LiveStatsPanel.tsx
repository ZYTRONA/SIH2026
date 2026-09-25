import React from 'react';
import { DayTimelineState } from '@/data/digitalTwinData';
import {
  Clock,
  Snowflake,
  Wind,
  Shield,
  Mountain,
  Gauge,
  Ship,
  Thermometer,
  Waves,
  Zap,
} from 'lucide-react';

interface LiveStatsPanelProps {
  currentState: DayTimelineState;
  onRecalculateRouteClick?: () => void;
}

export const LiveStatsPanel: React.FC<LiveStatsPanelProps> = ({
  currentState,
  onRecalculateRouteClick,
}) => {
  const { dayLabel, timeOffset, timestamp, phaseName, environment, vessel, narrative } =
    currentState;

  return (
    <div className="bg-white border border-[#e0e0e0] rounded-[18px] p-6 space-y-5">
      {/* Header with Live Status & Phase Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#f0f0f0]">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-[#0066cc]/10 text-[#0066cc]">
            <Zap className="w-4 h-4 text-[#0066cc]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-[15px] font-semibold text-[#1d1d1f] tracking-tight">
                Live Simulation Telemetry
              </h3>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-800 border border-emerald-500/20">
                SYNCED
              </span>
            </div>
            <span className="text-[11px] font-mono text-[#86868b]">
              Phase: <strong className="text-[#1d1d1f] font-semibold">{phaseName}</strong>
            </span>
          </div>
        </div>

        {/* Simulation Time Readout */}
        <div className="flex items-center gap-1.5 text-xs font-mono text-[#1d1d1f] bg-[#fafafc] px-3.5 py-1.5 rounded-full border border-[#e0e0e0]">
          <Clock className="w-3.5 h-3.5 text-[#0066cc]" />
          <span className="font-semibold">{dayLabel} ({timeOffset})</span>
          <span className="text-[#86868b]">| {timestamp}</span>
        </div>
      </div>

      {/* 4 Required Primary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 font-mono">
        {/* 1. Sea Ice Coverage (e.g. 72% on Day 3) */}
        <div className="p-4 rounded-xl bg-[#fafafc] border border-[#e0e0e0] space-y-1">
          <div className="flex items-center justify-between text-[#86868b] text-xs">
            <span className="flex items-center gap-1 font-semibold">
              <Snowflake className="w-3.5 h-3.5 text-[#0066cc]" />
              Sea Ice
            </span>
            <span className="text-[10px] text-[#86868b] font-normal uppercase">Pack Area</span>
          </div>
          <span className="text-[22px] font-semibold text-[#1d1d1f] block tracking-tight">
            {environment.seaIceCoveragePct}%
          </span>
          <span className="text-[11px] text-[#86868b] block truncate font-normal">
            {environment.seaIceCoveragePct > 70
              ? 'Heavy pack compression'
              : 'Navigable open leads'}
          </span>
        </div>

        {/* 2. Wind (e.g. 24 knots on Day 3) */}
        <div className="p-4 rounded-xl bg-[#fafafc] border border-[#e0e0e0] space-y-1">
          <div className="flex items-center justify-between text-[#86868b] text-xs">
            <span className="flex items-center gap-1 font-semibold">
              <Wind className="w-3.5 h-3.5 text-amber-600" />
              Wind
            </span>
            <span className="text-[10px] text-amber-700 font-normal uppercase">Atmospheric</span>
          </div>
          <span className="text-[22px] font-semibold text-amber-700 block tracking-tight">
            {environment.windSpeedKts} knots
          </span>
          <span className="text-[11px] text-[#86868b] block truncate font-normal">
            Direction: {environment.windDirection}
          </span>
        </div>

        {/* 3. Risk (e.g. 31 / 100 on Day 3) */}
        <div className="p-4 rounded-xl bg-[#fafafc] border border-[#e0e0e0] space-y-1">
          <div className="flex items-center justify-between text-[#86868b] text-xs">
            <span className="flex items-center gap-1 font-semibold">
              <Shield className="w-3.5 h-3.5 text-[#0066cc]" />
              Risk
            </span>
            <span
              className={`text-[10px] font-semibold ${
                environment.riskTier === 'SAFE'
                  ? 'text-emerald-700'
                  : environment.riskTier === 'LOW'
                  ? 'text-[#1d1d1f]'
                  : 'text-amber-700'
              }`}
            >
              {environment.riskTier}
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-[22px] font-semibold text-[#1d1d1f] tracking-tight">
              {environment.riskScore}
            </span>
            <span className="text-xs text-[#86868b] font-normal">/ 100</span>
          </div>
          <span className="text-[11px] text-[#86868b] block truncate font-normal">
            POLARIS RIO Compliant
          </span>
        </div>

        {/* 4. Nearby Icebergs (e.g. 4 on Day 3) */}
        <div className="p-4 rounded-xl bg-[#fafafc] border border-[#e0e0e0] space-y-1">
          <div className="flex items-center justify-between text-[#86868b] text-xs">
            <span className="flex items-center gap-1 font-semibold">
              <Mountain className="w-3.5 h-3.5 text-orange-600" />
              Nearby Icebergs
            </span>
            <span className="text-[10px] text-orange-700 font-normal uppercase">Radar Range</span>
          </div>
          <span className="text-[22px] font-semibold text-orange-700 block tracking-tight">
            {environment.nearbyIcebergsCount}
          </span>
          <span className="text-[11px] text-[#86868b] block truncate font-normal">
            Within 48 NM radius
          </span>
        </div>
      </div>

      {/* Secondary Vessel Dynamics Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono pt-1">
        <div className="p-3 rounded-xl bg-[#fafafc] border border-[#e0e0e0]">
          <span className="text-[10px] text-[#86868b] flex items-center gap-1 mb-0.5 font-semibold uppercase">
            <Ship className="w-3 h-3 text-[#0066cc]" />
            Vessel Position
          </span>
          <span className="text-[#1d1d1f] font-semibold">
            {Math.abs(vessel.lat).toFixed(2)}°S, {vessel.lng.toFixed(2)}°E
          </span>
        </div>

        <div className="p-3 rounded-xl bg-[#fafafc] border border-[#e0e0e0]">
          <span className="text-[10px] text-[#86868b] flex items-center gap-1 mb-0.5 font-semibold uppercase">
            <Gauge className="w-3 h-3 text-[#0066cc]" />
            Speed & Load
          </span>
          <span className="text-[#1d1d1f] font-semibold">
            {vessel.speedKts} kts ({vessel.currentEngineLoadPct}% load)
          </span>
        </div>

        <div className="p-3 rounded-xl bg-[#fafafc] border border-[#e0e0e0]">
          <span className="text-[10px] text-[#86868b] flex items-center gap-1 mb-0.5 font-semibold uppercase">
            <Thermometer className="w-3 h-3 text-[#0066cc]" />
            Ambient Air Temp
          </span>
          <span className="text-[#1d1d1f] font-semibold">{environment.airTempC}°C</span>
        </div>

        <div className="p-3 rounded-xl bg-[#fafafc] border border-[#e0e0e0]">
          <span className="text-[10px] text-[#86868b] flex items-center gap-1 mb-0.5 font-semibold uppercase">
            <Waves className="w-3 h-3 text-[#0066cc]" />
            Swell & Current
          </span>
          <span className="text-[#1d1d1f] font-semibold">
            {environment.waveHeightM}m / {environment.currentSpeedKts} kts
          </span>
        </div>
      </div>

      {/* Narrative Footer */}
      <div className="p-4 rounded-xl bg-[#fafafc] border border-[#e0e0e0] text-xs font-mono text-[#424245] leading-relaxed flex items-start justify-between gap-3">
        <p className="flex-1 font-normal text-[12px]">
          <strong className="text-[#1d1d1f] font-semibold">Tactical Log: </strong>
          {narrative}
        </p>

        {onRecalculateRouteClick && (
          <button
            onClick={onRecalculateRouteClick}
            className="flex-shrink-0 px-3.5 py-1.5 rounded-full bg-[#0066cc] hover:bg-[#0071e3] text-white text-xs font-mono font-semibold transition-all cursor-pointer active:scale-95"
          >
            Trigger Scenario
          </button>
        )}
      </div>
    </div>
  );
};

