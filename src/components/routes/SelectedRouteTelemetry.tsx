import React from 'react';
import {
  ROUTE_CANDIDATES,
  RouteKey,
} from '@/data/routeOptimizationData';
import {
  Navigation,
  Snowflake,
  Shield,
  Clock,
  Fuel,
  Gauge,
} from 'lucide-react';

interface SelectedRouteTelemetryProps {
  selectedRouteKey: RouteKey;
}

export const SelectedRouteTelemetry: React.FC<SelectedRouteTelemetryProps> = ({
  selectedRouteKey,
}) => {
  const route =
    ROUTE_CANDIDATES.find((r) => r.key === selectedRouteKey) || ROUTE_CANDIDATES[3];

  return (
    <div className="polar-panel p-5 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-polar-700/60">
        <div className="flex items-center gap-2">
          <div
            className="p-1.5 rounded border"
            style={{
              borderColor: `${route.color}50`,
              backgroundColor: `${route.color}15`,
              color: route.color,
            }}
          >
            <Navigation className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold font-sans text-slate-100">
                {route.name} Telemetry & Waypoints
              </h3>
              {route.isRecommended && (
                <span className="px-2 py-0.2 rounded text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/40">
                  AI RECOMMENDED
                </span>
              )}
            </div>
            <span className="text-[10px] font-mono text-slate-400">
              Corridor ID: {route.id} • Color Signature:{' '}
              <span className="font-bold" style={{ color: route.color }}>
                {route.key}
              </span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-slate-400">Average Transit Speed:</span>
          <span className="font-bold text-slate-200">{route.averageSpeedKts} kts</span>
        </div>
      </div>

      {/* 4 Summary Stat Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs">
        <div className="p-2.5 rounded-lg bg-polar-900/80 border border-polar-700/50">
          <span className="text-[10px] text-slate-400 flex items-center gap-1">
            <Gauge className="w-3 h-3 text-slate-400" />
            Distance
          </span>
          <span className="text-sm font-bold text-slate-100">{route.distanceFormatted}</span>
        </div>

        <div className="p-2.5 rounded-lg bg-polar-900/80 border border-polar-700/50">
          <span className="text-[10px] text-slate-400 flex items-center gap-1">
            <Clock className="w-3 h-3 text-slate-400" />
            ETA Window
          </span>
          <span className="text-sm font-bold text-slate-100">{route.etaFormatted}</span>
        </div>

        <div className="p-2.5 rounded-lg bg-polar-900/80 border border-polar-700/50">
          <span className="text-[10px] text-slate-400 flex items-center gap-1">
            <Fuel className="w-3 h-3 text-cyan-400" />
            Fuel Burn
          </span>
          <span className="text-sm font-bold text-cyan-300">{route.fuelFormatted}</span>
        </div>

        <div className="p-2.5 rounded-lg bg-polar-900/80 border border-polar-700/50">
          <span className="text-[10px] text-slate-400 flex items-center gap-1">
            <Shield className="w-3 h-3 text-amber-400" />
            Risk Index
          </span>
          <span
            className={`text-sm font-bold ${
              route.riskTier === 'SAFE'
                ? 'text-emerald-400'
                : route.riskTier === 'LOW'
                ? 'text-cyan-400'
                : 'text-amber-400'
            }`}
          >
            {route.riskFormatted}
          </span>
        </div>
      </div>

      {/* Waypoints Trajectory List */}
      <div className="space-y-2">
        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold px-1 block">
          Sequential Navigation Waypoints
        </span>

        <div className="space-y-2">
          {route.routePath.waypoints.map((wp, index, arr) => {
            const isStart = index === 0;
            const isDest = index === arr.length - 1;

            return (
              <div
                key={wp.id}
                className={`p-2.5 rounded-lg border text-xs font-mono flex items-center justify-between gap-3 ${
                  isStart
                    ? 'bg-polar-900/60 border-cyan-500/30'
                    : isDest
                    ? 'bg-emerald-950/20 border-emerald-500/40'
                    : 'bg-polar-900/40 border-polar-700/40'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
                    style={{
                      backgroundColor: `${route.color}20`,
                      color: route.color,
                      border: `1px solid ${route.color}60`,
                    }}
                  >
                    {isStart ? 'S' : isDest ? 'D' : index}
                  </div>
                  <div>
                    <span className="font-bold text-slate-200">{wp.name}</span>
                    <span className="text-[10px] text-slate-400 block">
                      Coords: {Math.abs(wp.lat).toFixed(2)}°S, {wp.lng.toFixed(2)}°E
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-[11px] flex-shrink-0">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Snowflake className="w-3 h-3 text-cyan-400" />
                    Ice: {wp.iceConcentrationPct}%
                  </span>
                  {isDest ? (
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold text-[10px]">
                      DESTINATION
                    </span>
                  ) : isStart ? (
                    <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold text-[10px]">
                      START BEACON
                    </span>
                  ) : (
                    <span className="text-slate-400">WAYPOINT</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
