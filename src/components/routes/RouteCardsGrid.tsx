import React from 'react';
import {
  ROUTE_CANDIDATES,
  RouteCandidateDetail,
  RouteKey,
} from '@/data/routeOptimizationData';
import {
  Sparkles,
  Shield,
  Gauge,
  Fuel,
  Clock,
  Compass,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface RouteCardsGridProps {
  selectedRouteKey: RouteKey;
  onSelectRoute: (key: RouteKey) => void;
}

export const RouteCardsGrid: React.FC<RouteCardsGridProps> = ({
  selectedRouteKey,
  onSelectRoute,
}) => {
  return (
    <div className="space-y-3 select-none">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-[#0066cc]" />
          <h3 className="text-[14px] font-semibold text-[#1d1d1f] tracking-tight">
            Candidate Polar Navigation Routes (Pareto Frontier)
          </h3>
        </div>
        <span className="text-[12px] font-mono text-[#86868b] font-normal">
          Select a corridor to view waypoints, ice encounters, and SHAP feasibility
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {ROUTE_CANDIDATES.map((route: RouteCandidateDetail) => {
          const isSelected = route.key === selectedRouteKey;
          const isRecommended = route.isRecommended;

          return (
            <div
              key={route.id}
              onClick={() => onSelectRoute(route.key)}
              className={`relative p-5 flex flex-col justify-between cursor-pointer transition-all duration-200 rounded-[18px] ${
                isSelected
                  ? 'border-2 border-[#0066cc] bg-white ring-2 ring-[#0066cc]/10'
                  : 'border border-[#e0e0e0] bg-white hover:border-[#0066cc]/40'
              }`}
            >
              {/* Top Row: Route Title, Badge & Selector Dot */}
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-0.5 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-[16px] font-semibold text-[#1d1d1f] truncate">
                        {route.name}
                      </h4>
                      {/* Selection radio mark */}
                      {isSelected ? (
                        <CheckCircle2 className="w-4 h-4 text-[#0066cc] shrink-0" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-[#e0e0e0] shrink-0" />
                      )}
                    </div>
                    <p className="text-[12px] font-mono text-[#86868b] line-clamp-1 font-normal">
                      {route.subtitle}
                    </p>
                  </div>

                  {/* AI Recommended or Trait Badge */}
                  {isRecommended ? (
                    <Badge variant="default" className="gap-1 shrink-0 font-semibold bg-[#0066cc] text-white border-transparent">
                      <Sparkles className="w-3 h-3 text-amber-300" />
                      {route.badgeLabel}
                    </Badge>
                  ) : (
                    <span
                      className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold border shrink-0"
                      style={{
                        color: route.color,
                        borderColor: `${route.color}40`,
                        backgroundColor: `${route.color}15`,
                      }}
                    >
                      {route.badgeLabel}
                    </span>
                  )}
                </div>

                {/* 4 Core Metrics requested by Prompt with Apple Typography */}
                <div className="grid grid-cols-2 gap-2 pt-1 font-mono">
                  {/* Distance */}
                  <div className="p-2.5 rounded-xl bg-[#fafafc] border border-[#e0e0e0] space-y-0.5">
                    <span className="text-[10px] text-[#86868b] uppercase tracking-wider flex items-center gap-1 font-semibold">
                      <Gauge className="w-3 h-3 text-[#86868b]" />
                      Distance
                    </span>
                    <span className="text-[14px] font-semibold text-[#1d1d1f] block tabular-nums">
                      {route.distanceFormatted}
                    </span>
                  </div>

                  {/* ETA */}
                  <div className="p-2.5 rounded-xl bg-[#fafafc] border border-[#e0e0e0] space-y-0.5">
                    <span className="text-[10px] text-[#86868b] uppercase tracking-wider flex items-center gap-1 font-semibold">
                      <Clock className="w-3 h-3 text-[#86868b]" />
                      ETA
                    </span>
                    <span className="text-[14px] font-semibold text-[#1d1d1f] block tabular-nums">
                      {route.etaFormatted}
                    </span>
                  </div>

                  {/* Fuel */}
                  <div className="p-2.5 rounded-xl bg-[#fafafc] border border-[#e0e0e0] space-y-0.5">
                    <span className="text-[10px] text-[#86868b] uppercase tracking-wider flex items-center gap-1 font-semibold">
                      <Fuel className="w-3 h-3 text-[#86868b]" />
                      Fuel
                    </span>
                    <span className="text-[14px] font-semibold text-[#1d1d1f] block tabular-nums">
                      {route.fuelFormatted}
                    </span>
                  </div>

                  {/* Risk */}
                  <div className="p-2.5 rounded-xl bg-[#fafafc] border border-[#e0e0e0] space-y-0.5">
                    <span className="text-[10px] text-[#86868b] uppercase tracking-wider flex items-center gap-1 font-semibold">
                      <Shield className="w-3 h-3 text-[#86868b]" />
                      Risk
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span
                        className={`text-[14px] font-semibold tabular-nums ${
                          route.riskTier === 'SAFE'
                            ? 'text-emerald-700'
                            : route.riskTier === 'LOW'
                            ? 'text-[#1d1d1f]'
                            : 'text-amber-700'
                        }`}
                      >
                        {route.riskScore}
                      </span>
                      <span className="text-[10px] text-[#86868b] font-normal">/ 100</span>
                    </div>
                  </div>
                </div>

                {/* Key characteristics list */}
                <div className="space-y-1.5 pt-1">
                  {route.characteristics.slice(0, 2).map((trait, idx) => (
                    <div
                      key={idx}
                      className="text-[11px] font-mono text-[#424245] flex items-start gap-2 font-normal"
                    >
                      <span
                        className="w-2 h-2 rounded-full mt-1 shrink-0"
                        style={{ backgroundColor: route.color }}
                      />
                      <span className="line-clamp-1">{trait}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Section for AI Recommended Route: Reason & "Why this route?" button */}
              {isRecommended && (
                <div className="mt-4 pt-3.5 border-t border-[#f0f0f0] space-y-1.5 bg-[#fafafc] -mx-5 -mb-5 p-4 rounded-b-[18px]">
                  <span className="text-[11px] font-mono font-semibold text-[#1d1d1f] uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#0066cc]" />
                    AI Recommendation Rationale
                  </span>
                  <p className="text-[12px] text-[#424245] leading-relaxed italic font-normal">
                    &quot;{route.recommendationReason}&quot;
                  </p>
                </div>
              )}

              {/* Footer for non-recommended cards */}
              {!isRecommended && (
                <div className="mt-3 pt-2.5 border-t border-[#f0f0f0] flex items-center justify-between text-[11px] font-mono text-[#86868b]">
                  <span>Max Ice: <strong className="text-[#1d1d1f] font-semibold">{route.maxIceConcentrationPct}%</strong></span>
                  {route.icebreakerAssistance ? (
                    <Badge variant="warning" className="text-[10px] font-semibold">
                      <AlertTriangle className="w-3 h-3 mr-1" />
                      Escort Advised
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-[10px] bg-[#fafafc] border-[#e0e0e0] text-[#1d1d1f] font-semibold">
                      Autonomous
                    </Badge>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
