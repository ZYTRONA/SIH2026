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
    <div className="bg-white border border-zinc-200/90 shadow-xs rounded-xl p-5 space-y-4">
      {/* Header with Live Status & Phase Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-zinc-200">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-black text-white">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold font-sans text-zinc-950">
                Live Simulation Telemetry
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-zinc-100 text-zinc-900 border border-zinc-300">
                SYNCED
              </span>
            </div>
            <span className="text-[10px] font-mono text-zinc-600">
              Phase: <strong className="text-zinc-950">{phaseName}</strong>
            </span>
          </div>
        </div>

        {/* Simulation Time Readout */}
        <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-800 bg-zinc-50 px-3 py-1.5 rounded-lg border border-zinc-200">
          <Clock className="w-3.5 h-3.5 text-black" />
          <span className="font-bold">{dayLabel} ({timeOffset})</span>
          <span className="text-zinc-400">| {timestamp}</span>
        </div>
      </div>

      {/* 4 Required Primary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
        {/* 1. Sea Ice Coverage (e.g. 72% on Day 3) */}
        <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 space-y-1">
          <div className="flex items-center justify-between text-zinc-500 text-xs">
            <span className="flex items-center gap-1">
              <Snowflake className="w-3.5 h-3.5 text-zinc-700" />
              Sea Ice
            </span>
            <span className="text-[10px] text-zinc-600 font-semibold">Pack Area</span>
          </div>
          <span className="text-xl font-black font-sans text-zinc-950 block">
            {environment.seaIceCoveragePct}%
          </span>
          <span className="text-[10px] text-zinc-500 block truncate">
            {environment.seaIceCoveragePct > 70
              ? 'Heavy pack compression'
              : 'Navigable open leads'}
          </span>
        </div>

        {/* 2. Wind (e.g. 24 knots on Day 3) */}
        <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 space-y-1">
          <div className="flex items-center justify-between text-zinc-500 text-xs">
            <span className="flex items-center gap-1">
              <Wind className="w-3.5 h-3.5 text-amber-600" />
              Wind
            </span>
            <span className="text-[10px] text-amber-700 font-semibold">Atmospheric</span>
          </div>
          <span className="text-xl font-black font-sans text-amber-900 block">
            {environment.windSpeedKts} knots
          </span>
          <span className="text-[10px] text-zinc-500 block truncate">
            Direction: {environment.windDirection}
          </span>
        </div>

        {/* 3. Risk (e.g. 31 / 100 on Day 3) */}
        <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 space-y-1">
          <div className="flex items-center justify-between text-zinc-500 text-xs">
            <span className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-zinc-700" />
              Risk
            </span>
            <span
              className={`text-[10px] font-bold ${
                environment.riskTier === 'SAFE'
                  ? 'text-emerald-800'
                  : environment.riskTier === 'LOW'
                  ? 'text-zinc-900'
                  : 'text-amber-800'
              }`}
            >
              {environment.riskTier}
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-black font-sans text-zinc-950">
              {environment.riskScore}
            </span>
            <span className="text-xs text-zinc-500">/ 100</span>
          </div>
          <span className="text-[10px] text-zinc-500 block truncate">
            POLARIS RIO Compliant
          </span>
        </div>

        {/* 4. Nearby Icebergs (e.g. 4 on Day 3) */}
        <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 space-y-1">
          <div className="flex items-center justify-between text-zinc-500 text-xs">
            <span className="flex items-center gap-1">
              <Mountain className="w-3.5 h-3.5 text-orange-600" />
              Nearby Icebergs
            </span>
            <span className="text-[10px] text-orange-700 font-semibold">Radar Range</span>
          </div>
          <span className="text-xl font-black font-sans text-orange-900 block">
            {environment.nearbyIcebergsCount}
          </span>
          <span className="text-[10px] text-zinc-500 block truncate">
            Within 48 NM radius
          </span>
        </div>
      </div>

      {/* Secondary Vessel Dynamics Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-mono pt-1">
        <div className="p-2.5 rounded-xl bg-zinc-50 border border-zinc-200">
          <span className="text-[10px] text-zinc-500 flex items-center gap-1 mb-0.5">
            <Ship className="w-3 h-3 text-zinc-700" />
            Vessel Position
          </span>
          <span className="text-zinc-950 font-bold">
            {Math.abs(vessel.lat).toFixed(2)}°S, {vessel.lng.toFixed(2)}°E
          </span>
        </div>

        <div className="p-2.5 rounded-xl bg-zinc-50 border border-zinc-200">
          <span className="text-[10px] text-zinc-500 flex items-center gap-1 mb-0.5">
            <Gauge className="w-3 h-3 text-zinc-700" />
            Speed & Load
          </span>
          <span className="text-zinc-950 font-bold">
            {vessel.speedKts} kts ({vessel.currentEngineLoadPct}% load)
          </span>
        </div>

        <div className="p-2.5 rounded-xl bg-zinc-50 border border-zinc-200">
          <span className="text-[10px] text-zinc-500 flex items-center gap-1 mb-0.5">
            <Thermometer className="w-3 h-3 text-zinc-700" />
            Ambient Air Temp
          </span>
          <span className="text-zinc-950 font-bold">{environment.airTempC}°C</span>
        </div>

        <div className="p-2.5 rounded-xl bg-zinc-50 border border-zinc-200">
          <span className="text-[10px] text-zinc-500 flex items-center gap-1 mb-0.5">
            <Waves className="w-3 h-3 text-zinc-700" />
            Swell & Current
          </span>
          <span className="text-zinc-950 font-bold">
            {environment.waveHeightM}m / {environment.currentSpeedKts} kts
          </span>
        </div>
      </div>

      {/* Narrative Footer */}
      <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs font-mono text-zinc-700 leading-relaxed flex items-start justify-between gap-3">
        <p className="flex-1">
          <strong className="text-zinc-950 font-bold">Tactical Log: </strong>
          {narrative}
        </p>

        {onRecalculateRouteClick && (
          <button
            onClick={onRecalculateRouteClick}
            className="flex-shrink-0 px-3 py-1.5 rounded-lg bg-black hover:bg-zinc-800 text-white text-xs font-mono font-bold transition-all shadow-xs cursor-pointer"
          >
            Trigger Scenario
          </button>
        )}
      </div>
    </div>
  );
};

