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
    <div className="polar-panel p-5 space-y-4">
      {/* Header with Live Status & Phase Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-polar-700/60">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Zap className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold font-sans text-slate-100">
                Live Simulation Telemetry
              </h3>
              <span className="px-2 py-0.2 rounded text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 animate-pulse">
                SYNCED
              </span>
            </div>
            <span className="text-[10px] font-mono text-cyan-400">
              Phase: {phaseName}
            </span>
          </div>
        </div>

        {/* Simulation Time Readout */}
        <div className="flex items-center gap-1.5 text-xs font-mono text-slate-300 bg-polar-900/90 px-3 py-1 rounded-lg border border-polar-700/50">
          <Clock className="w-3.5 h-3.5 text-ice-400" />
          <span className="font-bold">{dayLabel} ({timeOffset})</span>
          <span className="text-slate-400">| {timestamp}</span>
        </div>
      </div>

      {/* 4 Required Primary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
        {/* 1. Sea Ice Coverage (e.g. 72% on Day 3) */}
        <div className="p-3.5 rounded-xl bg-polar-900/80 border border-polar-700/50 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="flex items-center gap-1">
              <Snowflake className="w-3.5 h-3.5 text-cyan-400" />
              Sea Ice
            </span>
            <span className="text-[10px] text-cyan-400">Pack Area</span>
          </div>
          <span className="text-xl font-bold font-sans text-slate-100 block">
            {environment.seaIceCoveragePct}%
          </span>
          <span className="text-[10px] text-slate-400 block truncate">
            {environment.seaIceCoveragePct > 70
              ? 'Heavy pack compression'
              : 'Navigable open leads'}
          </span>
        </div>

        {/* 2. Wind (e.g. 24 knots on Day 3) */}
        <div className="p-3.5 rounded-xl bg-polar-900/80 border border-polar-700/50 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="flex items-center gap-1">
              <Wind className="w-3.5 h-3.5 text-amber-400" />
              Wind
            </span>
            <span className="text-[10px] text-amber-400">Atmospheric</span>
          </div>
          <span className="text-xl font-bold font-sans text-amber-300 block">
            {environment.windSpeedKts} knots
          </span>
          <span className="text-[10px] text-slate-400 block truncate">
            Direction: {environment.windDirection}
          </span>
        </div>

        {/* 3. Risk (e.g. 31 / 100 on Day 3) */}
        <div className="p-3.5 rounded-xl bg-polar-900/80 border border-polar-700/50 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-rose-400" />
              Risk
            </span>
            <span
              className={`text-[10px] font-bold ${
                environment.riskTier === 'SAFE'
                  ? 'text-emerald-400'
                  : environment.riskTier === 'LOW'
                  ? 'text-cyan-400'
                  : 'text-amber-400'
              }`}
            >
              {environment.riskTier}
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold font-sans text-slate-100">
              {environment.riskScore}
            </span>
            <span className="text-xs text-slate-400">/ 100</span>
          </div>
          <span className="text-[10px] text-slate-400 block truncate">
            POLARIS RIO Compliant
          </span>
        </div>

        {/* 4. Nearby Icebergs (e.g. 4 on Day 3) */}
        <div className="p-3.5 rounded-xl bg-polar-900/80 border border-polar-700/50 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="flex items-center gap-1">
              <Mountain className="w-3.5 h-3.5 text-orange-400" />
              Nearby Icebergs
            </span>
            <span className="text-[10px] text-orange-400">Radar Range</span>
          </div>
          <span className="text-xl font-bold font-sans text-orange-300 block">
            {environment.nearbyIcebergsCount}
          </span>
          <span className="text-[10px] text-slate-400 block truncate">
            Within 48 NM radius
          </span>
        </div>
      </div>

      {/* Secondary Vessel Dynamics Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono pt-1">
        <div className="p-2 rounded bg-polar-900/60 border border-polar-700/40">
          <span className="text-[10px] text-slate-400 flex items-center gap-1">
            <Ship className="w-3 h-3 text-cyan-400" />
            Vessel Position
          </span>
          <span className="text-slate-200 font-bold">
            {Math.abs(vessel.lat).toFixed(2)}°S, {vessel.lng.toFixed(2)}°E
          </span>
        </div>

        <div className="p-2 rounded bg-polar-900/60 border border-polar-700/40">
          <span className="text-[10px] text-slate-400 flex items-center gap-1">
            <Gauge className="w-3 h-3 text-slate-400" />
            Vessel Speed & Load
          </span>
          <span className="text-slate-200 font-bold">
            {vessel.speedKts} kts ({vessel.currentEngineLoadPct}% load)
          </span>
        </div>

        <div className="p-2 rounded bg-polar-900/60 border border-polar-700/40">
          <span className="text-[10px] text-slate-400 flex items-center gap-1">
            <Thermometer className="w-3 h-3 text-blue-400" />
            Ambient Air Temp
          </span>
          <span className="text-cyan-300 font-bold">{environment.airTempC}°C</span>
        </div>

        <div className="p-2 rounded bg-polar-900/60 border border-polar-700/40">
          <span className="text-[10px] text-slate-400 flex items-center gap-1">
            <Waves className="w-3 h-3 text-emerald-400" />
            Wave Swell & Current
          </span>
          <span className="text-slate-200 font-bold">
            {environment.waveHeightM}m / {environment.currentSpeedKts} kts
          </span>
        </div>
      </div>

      {/* Narrative Footer */}
      <div className="p-3 rounded-lg bg-polar-900/70 border border-polar-700/40 text-[11px] font-mono text-slate-300 leading-relaxed flex items-start justify-between gap-3">
        <p className="flex-1">
          <strong className="text-ice-300">Tactical Log: </strong>
          {narrative}
        </p>

        {onRecalculateRouteClick && (
          <button
            onClick={onRecalculateRouteClick}
            className="flex-shrink-0 px-3 py-1 rounded bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-400/40 text-xs font-mono font-bold transition-all shadow-sm"
          >
            Trigger Scenario
          </button>
        )}
      </div>
    </div>
  );
};
