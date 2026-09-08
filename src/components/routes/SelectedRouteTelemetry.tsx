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
    <div className="bg-white border border-[#e0e0e0] rounded-[18px] p-6 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#f0f0f0]">
        <div className="flex items-center gap-2.5">
          <div
            className="p-2 rounded-xl border"
            style={{
              borderColor: `${route.color}40`,
              backgroundColor: `${route.color}15`,
              color: route.color,
            }}
          >
            <Navigation className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-[15px] font-semibold text-[#1d1d1f] tracking-tight">
                {route.name} Telemetry & Waypoints
              </h3>
              {route.isRecommended && (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-[#0066cc] text-white">
                  AI RECOMMENDED
                </span>
              )}
            </div>
            <span className="text-[11px] font-mono text-[#86868b]">
              Corridor ID: {route.id} • Color Signature:{' '}
              <span className="font-semibold" style={{ color: route.color }}>
                {route.key}
              </span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[12px] font-mono">
          <span className="text-[#86868b]">Average Transit Speed:</span>
          <span className="font-semibold text-[#1d1d1f]">{route.averageSpeedKts} kts</span>
        </div>
      </div>

      {/* 4 Summary Stat Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
        <div className="p-3 rounded-xl bg-[#fafafc] border border-[#e0e0e0]">
          <span className="text-[10px] text-[#86868b] flex items-center gap-1 font-semibold uppercase">
            <Gauge className="w-3 h-3 text-[#86868b]" />
            Distance
          </span>
          <span className="text-[14px] font-semibold text-[#1d1d1f]">{route.distanceFormatted}</span>
        </div>

        <div className="p-3 rounded-xl bg-[#fafafc] border border-[#e0e0e0]">
          <span className="text-[10px] text-[#86868b] flex items-center gap-1 font-semibold uppercase">
            <Clock className="w-3 h-3 text-[#86868b]" />
            ETA Window
          </span>
          <span className="text-[14px] font-semibold text-[#1d1d1f]">{route.etaFormatted}</span>
        </div>

        <div className="p-3 rounded-xl bg-[#fafafc] border border-[#e0e0e0]">
          <span className="text-[10px] text-[#86868b] flex items-center gap-1 font-semibold uppercase">
            <Fuel className="w-3 h-3 text-[#86868b]" />
            Fuel Burn
          </span>
          <span className="text-[14px] font-semibold text-[#1d1d1f]">{route.fuelFormatted}</span>
        </div>

        <div className="p-3 rounded-xl bg-[#fafafc] border border-[#e0e0e0]">
          <span className="text-[10px] text-[#86868b] flex items-center gap-1 font-semibold uppercase">
            <Shield className="w-3 h-3 text-[#86868b]" />
            Risk Index
          </span>
          <span
            className={`text-[14px] font-semibold ${
              route.riskTier === 'SAFE'
                ? 'text-emerald-700'
                : route.riskTier === 'LOW'
                ? 'text-[#1d1d1f]'
                : 'text-amber-700'
            }`}
          >
            {route.riskFormatted}
          </span>
        </div>
      </div>

      {/* Waypoints Trajectory List */}
      <div className="space-y-2.5">
        <span className="text-[11px] font-mono uppercase tracking-wider text-[#86868b] font-semibold px-1 block">
          Sequential Navigation Waypoints
        </span>

        <div className="space-y-2">
          {route.routePath.waypoints.map((wp, index, arr) => {
            const isStart = index === 0;
            const isDest = index === arr.length - 1;

            return (
              <div
                key={wp.id}
                className={`p-3 rounded-xl border text-xs font-mono flex items-center justify-between gap-3 ${
                  isStart
                    ? 'bg-[#f5f5f7] border-[#e0e0e0]'
                    : isDest
                    ? 'bg-emerald-500/10 border-emerald-500/20'
                    : 'bg-[#fafafc] border-[#e0e0e0]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-semibold"
                    style={{
                      backgroundColor: `${route.color}15`,
                      color: route.color,
                      border: `1px solid ${route.color}40`,
                    }}
                  >
                    {isStart ? 'S' : isDest ? 'D' : index}
                  </div>
                  <div>
                    <span className="font-semibold text-[#1d1d1f] text-[13px]">{wp.name}</span>
                    <span className="text-[11px] text-[#86868b] block font-normal">
                      Coords: {Math.abs(wp.lat).toFixed(2)}°S, {wp.lng.toFixed(2)}°E
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-[11px] flex-shrink-0">
                  <span className="text-[#424245] flex items-center gap-1 font-normal">
                    <Snowflake className="w-3.5 h-3.5 text-[#0066cc]" />
                    Ice: {wp.iceConcentrationPct}%
                  </span>
                  {isDest ? (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-800 font-semibold text-[10px]">
                      DESTINATION
                    </span>
                  ) : isStart ? (
                    <span className="px-2.5 py-0.5 rounded-full bg-[#0066cc] text-white font-semibold text-[10px]">
                      START BEACON
                    </span>
                  ) : (
                    <span className="text-[#86868b] font-normal">WAYPOINT</span>
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

