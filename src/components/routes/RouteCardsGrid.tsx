import React from 'react';
import { useNavigate } from 'react-router-dom';
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
  ArrowRight,
  HelpCircle,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface RouteCardsGridProps {
  selectedRouteKey: RouteKey;
  onSelectRoute: (key: RouteKey) => void;
}

export const RouteCardsGrid: React.FC<RouteCardsGridProps> = ({
  selectedRouteKey,
  onSelectRoute,
}) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-sky-600" />
          <h3 className="text-sm font-bold font-sans text-slate-900 uppercase tracking-wider">
            Candidate Polar Navigation Routes (Pareto Frontier)
          </h3>
        </div>
        <span className="text-[11px] font-mono text-slate-500">
          Select a candidate to view trajectory, waypoints, and comparative metrics
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
              className={`relative p-4 sm:p-5 flex flex-col justify-between cursor-pointer transition-all duration-300 rounded-xl ${
                isSelected
                  ? 'border-2 border-sky-600 bg-white shadow-md ring-2 ring-sky-500/20'
                  : 'border border-slate-200/90 bg-white hover:border-slate-300 shadow-xs hover:shadow-sm'
              }`}
            >
              {/* Top Row: Route Title, Badge & Selector Dot */}
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-0.5 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-bold font-sans text-slate-900 truncate">
                        {route.name}
                      </h4>
                      {/* Selection radio mark */}
                      {isSelected ? (
                        <CheckCircle2 className="w-4 h-4 text-sky-600 flex-shrink-0" />
                      ) : (
                        <div className="w-3.5 h-3.5 rounded-full border border-slate-300 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-[11px] font-mono text-slate-500 line-clamp-1">
                      {route.subtitle}
                    </p>
                  </div>

                  {/* AI Recommended or Trait Badge */}
                  {isRecommended ? (
                    <Badge variant="ice" className="gap-1 animate-pulse flex-shrink-0 font-bold bg-sky-50 text-sky-700 border-sky-300">
                      <Sparkles className="w-3 h-3 text-sky-600" />
                      {route.badgeLabel}
                    </Badge>
                  ) : (
                    <span
                      className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold border flex-shrink-0"
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

                {/* 4 Core Metrics requested by Prompt */}
                <div className="grid grid-cols-2 gap-2 pt-1 font-mono">
                  {/* Distance */}
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 space-y-0.5">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider flex items-center gap-1 font-semibold">
                      <Gauge className="w-3 h-3 text-slate-400" />
                      Distance
                    </span>
                    <span className="text-sm font-bold text-slate-900 block tabular-nums">
                      {route.distanceFormatted}
                    </span>
                  </div>

                  {/* ETA */}
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 space-y-0.5">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider flex items-center gap-1 font-semibold">
                      <Clock className="w-3 h-3 text-slate-400" />
                      ETA
                    </span>
                    <span className="text-sm font-bold text-slate-900 block tabular-nums">
                      {route.etaFormatted}
                    </span>
                  </div>

                  {/* Fuel */}
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 space-y-0.5">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider flex items-center gap-1 font-semibold">
                      <Fuel className="w-3 h-3 text-sky-600" />
                      Fuel
                    </span>
                    <span className="text-sm font-bold text-sky-700 block tabular-nums">
                      {route.fuelFormatted}
                    </span>
                  </div>

                  {/* Risk */}
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 space-y-0.5">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider flex items-center gap-1 font-semibold">
                      <Shield className="w-3 h-3 text-amber-600" />
                      Risk
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span
                        className={`text-sm font-bold tabular-nums ${
                          route.riskTier === 'SAFE'
                            ? 'text-emerald-700'
                            : route.riskTier === 'LOW'
                            ? 'text-sky-700'
                            : 'text-amber-700'
                        }`}
                      >
                        {route.riskScore}
                      </span>
                      <span className="text-[10px] text-slate-500">/ 100</span>
                    </div>
                  </div>
                </div>

                {/* Key characteristics list */}
                <div className="space-y-1.5 pt-1">
                  {route.characteristics.slice(0, 2).map((trait, idx) => (
                    <div
                      key={idx}
                      className="text-[11px] font-mono text-slate-600 flex items-start gap-1.5"
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                        style={{ backgroundColor: route.color }}
                      />
                      <span className="line-clamp-1">{trait}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Section for AI Recommended Route: Reason & "Why this route?" button */}
              {isRecommended && (
                <div className="mt-4 pt-3 border-t border-sky-200 space-y-2.5 bg-sky-50/80 -mx-4 sm:-mx-5 -mb-4 sm:-mb-5 p-4 rounded-b-xl">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold text-sky-800 uppercase tracking-wider flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-sky-600" />
                      AI Recommendation Rationale
                    </span>
                    <p className="text-xs text-slate-700 font-sans leading-relaxed italic font-medium">
                      &quot;{route.recommendationReason}&quot;
                    </p>
                  </div>

                  {/* Why this route? Button */}
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate('/explainability');
                    }}
                    variant="default"
                    size="sm"
                    className="w-full gap-2 bg-sky-600 hover:bg-sky-700 text-white font-bold justify-between shadow-xs"
                  >
                    <span className="flex items-center gap-1.5">
                      <HelpCircle className="w-3.5 h-3.5" />
                      Why this route?
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              )}

              {/* Footer for non-recommended cards */}
              {!isRecommended && (
                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>Max Ice: {route.maxIceConcentrationPct}%</span>
                  {route.icebreakerAssistance ? (
                    <Badge variant="warning" className="text-[9px]">
                      <AlertTriangle className="w-3 h-3 mr-0.5" />
                      Escort Advised
                    </Badge>
                  ) : (
                    <Badge variant="success" className="text-[9px]">
                      Autonomous Transit
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
