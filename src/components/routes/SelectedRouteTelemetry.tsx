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
    <div className="bg-white border border-slate-200/90 shadow-xs rounded-xl p-5 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div
            className="p-1.5 rounded-lg border"
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
              <h3 className="text-sm font-bold font-sans text-slate-900">
                {route.name} Telemetry & Waypoints
              </h3>
              {route.isRecommended && (
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-sky-50 text-sky-700 border border-sky-300">
                  AI RECOMMENDED
                </span>
              )}
            </div>
            <span className="text-[10px] font-mono text-slate-500">
              Corridor ID: {route.id} • Color Signature:{' '}
              <span className="font-bold" style={{ color: route.color }}>
                {route.key}
              </span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-slate-500">Average Transit Speed:</span>
          <span className="font-bold text-slate-900">{route.averageSpeedKts} kts</span>
        </div>
      </div>

      {/* 4 Summary Stat Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs">
        <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
          <span className="text-[10px] text-slate-500 flex items-center gap-1 font-semibold">
            <Gauge className="w-3 h-3 text-slate-400" />
            Distance
          </span>
          <span className="text-sm font-bold text-slate-900">{route.distanceFormatted}</span>
        </div>

        <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
          <span className="text-[10px] text-slate-500 flex items-center gap-1 font-semibold">
            <Clock className="w-3 h-3 text-slate-400" />
            ETA Window
          </span>
          <span className="text-sm font-bold text-slate-900">{route.etaFormatted}</span>
        </div>

        <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
          <span className="text-[10px] text-slate-500 flex items-center gap-1 font-semibold">
            <Fuel className="w-3 h-3 text-sky-600" />
            Fuel Burn
          </span>
          <span className="text-sm font-bold text-sky-700">{route.fuelFormatted}</span>
        </div>

        <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
          <span className="text-[10px] text-slate-500 flex items-center gap-1 font-semibold">
            <Shield className="w-3 h-3 text-amber-600" />
            Risk Index
          </span>
          <span
            className={`text-sm font-bold ${
              route.riskTier === 'SAFE'
                ? 'text-emerald-700'
                : route.riskTier === 'LOW'
                ? 'text-sky-700'
                : 'text-amber-700'
            }`}
          >
            {route.riskFormatted}
          </span>
        </div>
      </div>

      {/* Waypoints Trajectory List */}
      <div className="space-y-2">
        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold px-1 block">
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
                    ? 'bg-sky-50/70 border-sky-300'
                    : isDest
                    ? 'bg-emerald-50/70 border-emerald-300'
                    : 'bg-slate-50 border-slate-200'
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
                    <span className="font-bold text-slate-900">{wp.name}</span>
                    <span className="text-[10px] text-slate-500 block font-normal">
                      Coords: {Math.abs(wp.lat).toFixed(2)}°S, {wp.lng.toFixed(2)}°E
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-[11px] flex-shrink-0">
                  <span className="text-slate-600 flex items-center gap-1 font-medium">
                    <Snowflake className="w-3.5 h-3.5 text-sky-600" />
                    Ice: {wp.iceConcentrationPct}%
                  </span>
                  {isDest ? (
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px] border border-emerald-300">
                      DESTINATION
                    </span>
                  ) : isStart ? (
                    <span className="px-2 py-0.5 rounded bg-sky-100 text-sky-800 font-bold text-[10px] border border-sky-300">
                      START BEACON
                    </span>
                  ) : (
                    <span className="text-slate-400 font-medium">WAYPOINT</span>
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
