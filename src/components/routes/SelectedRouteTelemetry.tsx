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
  MapPin,
  Sparkles,
  Layers,
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
    <div className="apple-card p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#f0f0f0]">
        <div className="flex items-center gap-3">
          <div
            className="h-10 w-10 rounded-[12px] flex items-center justify-center shrink-0 border shadow-xs"
            style={{
              borderColor: `${route.color}40`,
              backgroundColor: `${route.color}15`,
              color: route.color,
            }}
          >
            <Navigation className="w-5 h-5" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-[16px] font-semibold text-[#1d1d1f] tracking-tight">
                {route.name} Telemetry &amp; Waypoints
              </h3>
              {route.isRecommended && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#0066cc] text-white">
                  <Sparkles className="w-3 h-3" />
                  AI RECOMMENDED
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-[12px] font-mono text-neutral-500 font-normal">
              <span>Corridor ID: <strong className="text-[#1d1d1f]">{route.id}</strong></span>
              <span>•</span>
              <span className="flex items-center gap-1">
                Color:
                <span
                  className="w-2.5 h-2.5 rounded-full inline-block"
                  style={{ backgroundColor: route.color }}
                />
                <span className="font-semibold" style={{ color: route.color }}>
                  {route.key}
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Speed & Escort Chips */}
        <div className="flex items-center gap-2 self-start sm:self-auto font-mono text-[11px]">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f5f5f7] border border-[#e0e0e0] text-[#1d1d1f]">
            <Gauge className="w-3.5 h-3.5 text-[#0066cc]" />
            <span className="text-neutral-400">Avg Speed:</span>
            <span className="font-semibold">{route.averageSpeedKts} kts</span>
          </div>
        </div>
      </div>

      {/* 4 Performance Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Distance */}
        <div className="p-3.5 rounded-[14px] bg-[#fafafc] border border-[#e0e0e0] space-y-1">
          <div className="flex items-center justify-between text-neutral-400 text-[10px] uppercase font-mono font-semibold">
            <span>Distance</span>
            <MapPin className="w-3.5 h-3.5 text-neutral-500" />
          </div>
          <div className="text-[17px] font-semibold text-[#1d1d1f] tracking-tight">
            {route.distanceFormatted}
          </div>
          <span className="text-[10px] text-neutral-500 block font-normal">
            Orthodromic Track
          </span>
        </div>

        {/* ETA Window */}
        <div className="p-3.5 rounded-[14px] bg-[#fafafc] border border-[#e0e0e0] space-y-1">
          <div className="flex items-center justify-between text-neutral-400 text-[10px] uppercase font-mono font-semibold">
            <span>ETA Window</span>
            <Clock className="w-3.5 h-3.5 text-neutral-500" />
          </div>
          <div className="text-[17px] font-semibold text-[#1d1d1f] tracking-tight">
            {route.etaFormatted}
          </div>
          <span className="text-[10px] text-neutral-500 block font-normal">
            Transit Duration
          </span>
        </div>

        {/* Fuel Burn */}
        <div className="p-3.5 rounded-[14px] bg-[#fafafc] border border-[#e0e0e0] space-y-1">
          <div className="flex items-center justify-between text-neutral-400 text-[10px] uppercase font-mono font-semibold">
            <span>Fuel Burn</span>
            <Fuel className="w-3.5 h-3.5 text-neutral-500" />
          </div>
          <div className="text-[17px] font-semibold text-[#1d1d1f] tracking-tight">
            {route.fuelFormatted}
          </div>
          <span className="text-[10px] text-neutral-500 block font-normal">
            MGO Bunker Est.
          </span>
        </div>

        {/* Polar Risk Index */}
        <div className="p-3.5 rounded-[14px] bg-[#fafafc] border border-[#e0e0e0] space-y-1">
          <div className="flex items-center justify-between text-neutral-400 text-[10px] uppercase font-mono font-semibold">
            <span>Risk Index</span>
            <Shield className="w-3.5 h-3.5 text-neutral-500" />
          </div>
          <div className="text-[17px] font-semibold text-[#1d1d1f] tracking-tight flex items-baseline gap-1">
            <span>{route.riskScore}</span>
            <span className="text-[11px] text-neutral-400 font-normal">/ 100</span>
          </div>
          <span
            className={`text-[10px] font-semibold block ${
              route.riskTier === 'SAFE'
                ? 'text-emerald-700'
                : route.riskTier === 'LOW'
                ? 'text-[#0066cc]'
                : 'text-amber-700'
            }`}
          >
            {route.riskTier} Polar Margin
          </span>
        </div>
      </div>

      {/* Connected Navigation Waypoints Timeline */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[12px] font-semibold text-[#1d1d1f]">
            <Layers className="w-4 h-4 text-[#0066cc]" />
            <span>Sequential Navigation Waypoints</span>
          </div>
          <span className="text-[11px] font-mono text-neutral-400">
            {route.routePath.waypoints.length} Navigational Nodes
          </span>
        </div>

        <div className="relative pl-6 space-y-3 before:absolute before:left-[11px] before:top-3 before:bottom-3 before:w-[2px] before:bg-[#e0e0e0]">
          {route.routePath.waypoints.map((wp, index, arr) => {
            const isStart = index === 0;
            const isDest = index === arr.length - 1;

            return (
              <div
                key={wp.id}
                className={`relative p-3 rounded-[12px] border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 ${
                  isStart
                    ? 'bg-blue-50/50 border-blue-200'
                    : isDest
                    ? 'bg-emerald-50/50 border-emerald-200'
                    : 'bg-[#fafafc] border-[#e0e0e0] hover:bg-white'
                }`}
              >
                {/* Connected Node Dot */}
                <div
                  className={`absolute -left-[30px] top-1/2 -translate-y-1/2 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white border-2 border-white shadow-xs ${
                    isStart
                      ? 'bg-[#0066cc]'
                      : isDest
                      ? 'bg-emerald-600'
                      : 'bg-[#1d1d1f]'
                  }`}
                >
                  {isStart ? 'S' : isDest ? 'D' : index}
                </div>

                {/* Waypoint Info */}
                <div className="space-y-0.5 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-[13px] text-[#1d1d1f] tracking-tight">
                      {wp.name}
                    </span>
                    {isStart && (
                      <span className="px-2 py-0.5 rounded-full bg-[#0066cc] text-white text-[9px] font-bold tracking-wider uppercase">
                        Origin
                      </span>
                    )}
                    {isDest && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[9px] font-bold tracking-wider uppercase">
                        Destination
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] font-mono text-neutral-500 block">
                    Coordinates: {Math.abs(wp.lat).toFixed(2)}°S, {wp.lng.toFixed(2)}°E
                  </span>
                </div>

                {/* Sea-Ice Meter & Tag */}
                <div className="flex items-center gap-3 shrink-0 pt-1 sm:pt-0 border-t sm:border-t-0 border-[#f0f0f0]">
                  {/* Ice Meter */}
                  <div className="flex items-center gap-2">
                    <Snowflake className="w-3.5 h-3.5 text-[#0066cc]" />
                    <div className="text-[11px] font-mono font-semibold text-neutral-700 min-w-[58px]">
                      Ice: {wp.iceConcentrationPct}%
                    </div>
                    {/* Visual meter */}
                    <div className="w-14 h-2 rounded-full bg-[#e0e0e0] overflow-hidden hidden sm:block">
                      <div
                        className={`h-full rounded-full transition-all ${
                          wp.iceConcentrationPct <= 25
                            ? 'bg-emerald-500'
                            : wp.iceConcentrationPct <= 50
                            ? 'bg-blue-500'
                            : 'bg-amber-500'
                        }`}
                        style={{ width: `${wp.iceConcentrationPct}%` }}
                      />
                    </div>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded-md text-[10px] font-semibold font-mono ${
                      isStart
                        ? 'bg-blue-100 text-[#0066cc]'
                        : isDest
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-neutral-100 text-neutral-600'
                    }`}
                  >
                    {isStart ? 'START BEACON' : isDest ? "ST. JOHN'S BASE" : 'WAYPOINT'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

