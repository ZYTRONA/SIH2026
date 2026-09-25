import React from 'react';
import { RoutePath } from '@/types/map';

interface RouteLayerProps {
  routes: RoutePath[];
  toSvg: (pct: number) => number;
  selectedRouteId?: string;
  onSelectRoute?: (routeId: string) => void;
  onSelectWaypoint?: (wpName: string) => void;
}

export const RouteLayer: React.FC<RouteLayerProps> = ({
  routes,
  toSvg,
  selectedRouteId,
  onSelectRoute,
  onSelectWaypoint,
}) => {
  const activeRouteId = selectedRouteId || routes.find((r) => r.isRecommended)?.id;
  const activeRoute = routes.find((r) => r.id === activeRouteId) || routes[0];

  return (
    <g>
      {/* 1. Render Path Lines */}
      {routes.map((route) => {
        const isSelected = route.id === activeRouteId;
        const pathData = route.waypoints
          .map((wp, i) => `${i === 0 ? 'M' : 'L'} ${toSvg(wp.x)} ${toSvg(wp.y)}`)
          .join(' ');

        return (
          <g
            key={route.id}
            className="cursor-pointer transition-all"
            onClick={() => onSelectRoute && onSelectRoute(route.id)}
          >
            {/* Ambient Glow for Selected or Recommended Route */}
            {(isSelected || route.isRecommended) && (
              <path
                d={pathData}
                fill="none"
                stroke={route.color}
                strokeWidth={isSelected ? 18 : 12}
                strokeOpacity={isSelected ? 0.22 : 0.1}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}

            {/* Click Hitbox */}
            <path
              d={pathData}
              fill="none"
              stroke="transparent"
              strokeWidth={22}
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Core Route Line */}
            <path
              d={pathData}
              fill="none"
              stroke={route.color}
              strokeWidth={isSelected ? (route.strokeWidth || 3) + 1.5 : (route.strokeWidth || 2)}
              strokeDasharray={isSelected ? undefined : route.dashArray}
              strokeOpacity={isSelected ? 1 : 0.65}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        );
      })}

      {/* 2. Render Waypoints for Selected Active Route */}
      {activeRoute?.waypoints.map((wp, idx, arr) => {
        const wx = toSvg(wp.x);
        const wy = toSvg(wp.y);
        const isStart = idx === 0;
        const isDest = idx === arr.length - 1;

        if (isStart || isDest) return null; // Handled as special start/destination beacons

        return (
          <g
            key={wp.id}
            className="cursor-pointer group"
            onClick={(e) => {
              e.stopPropagation();
              onSelectWaypoint &&
                onSelectWaypoint(`${wp.name} (Ice Conc: ${wp.iceConcentrationPct}%)`);
            }}
          >
            <circle
              cx={wx}
              cy={wy}
              r="5.5"
              fill="#FFFFFF"
              stroke={activeRoute.color}
              strokeWidth="2"
            />
            <circle cx={wx} cy={wy} r="2.5" fill={activeRoute.color} />
            <text
              x={wx + 8}
              y={wy + 3}
              fill="#1d1d1f"
              fontSize="9"
              fontFamily="monospace"
              fontWeight="bold"
              className="select-none"
            >
              {wp.name.split(' ')[0]}
            </text>
          </g>
        );
      })}
    </g>
  );
};
