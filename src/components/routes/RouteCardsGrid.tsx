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
          <Compass className="w-4 h-4 text-ice-400" />
          <h3 className="text-sm font-bold font-sans text-slate-100 uppercase tracking-wider">
            Candidate Polar Navigation Routes (Pareto Set)
          </h3>
        </div>
        <span className="text-[11px] font-mono text-slate-400">
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
              className={`polar-panel relative p-4 flex flex-col justify-between cursor-pointer transition-all duration-300 rounded-xl border ${
                isSelected
                  ? 'border-cyan-400/90 bg-polar-900/95 shadow-lg shadow-cyan-950/40 ring-1 ring-cyan-400/40'
                  : 'border-polar-700/60 bg-polar-950/70 hover:border-polar-600 hover:bg-polar-900/60'
              }`}
            >
              {/* Top Row: Route Title, Badge & Selector Dot */}
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-bold font-sans text-slate-100">
                        {route.name}
                      </h4>
                      {/* Selection radio mark */}
                      {isSelected ? (
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                      ) : (
                        <div className="w-3.5 h-3.5 rounded-full border border-polar-600 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-[11px] font-mono text-slate-400 line-clamp-1">
                      {route.subtitle}
                    </p>
                  </div>

                  {/* AI Recommended or Trait Badge */}
                  {isRecommended ? (
                    <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-ice-500/20 text-ice-300 border border-ice-400/50 shadow-sm animate-pulse flex-shrink-0">
                      <Sparkles className="w-3 h-3 text-cyan-300" />
                      {route.badgeLabel}
                    </span>
                  ) : (
                    <span
                      className="px-2 py-0.5 rounded text-[10px] font-mono font-bold border flex-shrink-0"
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
                  <div className="p-2.5 rounded-lg bg-polar-900/80 border border-polar-700/40 space-y-0.5">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider flex items-center gap-1">
                      <Gauge className="w-3 h-3 text-slate-400" />
                      Distance
                    </span>
                    <span className="text-sm font-bold text-slate-100 block">
                      {route.distanceFormatted}
                    </span>
                  </div>

                  {/* ETA */}
                  <div className="p-2.5 rounded-lg bg-polar-900/80 border border-polar-700/40 space-y-0.5">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      ETA
                    </span>
                    <span className="text-sm font-bold text-slate-100 block">
                      {route.etaFormatted}
                    </span>
                  </div>

                  {/* Fuel */}
                  <div className="p-2.5 rounded-lg bg-polar-900/80 border border-polar-700/40 space-y-0.5">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider flex items-center gap-1">
                      <Fuel className="w-3 h-3 text-cyan-400" />
                      Fuel
                    </span>
                    <span className="text-sm font-bold text-cyan-300 block">
                      {route.fuelFormatted}
                    </span>
                  </div>

                  {/* Risk */}
                  <div className="p-2.5 rounded-lg bg-polar-900/80 border border-polar-700/40 space-y-0.5">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider flex items-center gap-1">
                      <Shield className="w-3 h-3 text-amber-400" />
                      Risk
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span
                        className={`text-sm font-bold ${
                          route.riskTier === 'SAFE'
                            ? 'text-emerald-400'
                            : route.riskTier === 'LOW'
                            ? 'text-cyan-400'
                            : 'text-amber-400'
                        }`}
                      >
                        {route.riskScore}
                      </span>
                      <span className="text-[10px] text-slate-400">/ 100</span>
                    </div>
                  </div>
                </div>

                {/* Key characteristics list */}
                <div className="space-y-1.5 pt-1">
                  {route.characteristics.slice(0, 2).map((trait, idx) => (
                    <div
                      key={idx}
                      className="text-[11px] font-mono text-slate-300 flex items-start gap-1.5"
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
                <div className="mt-4 pt-3 border-t border-cyan-500/30 space-y-2.5 bg-cyan-950/20 -mx-4 -mb-4 p-4 rounded-b-xl">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold text-ice-400 uppercase tracking-wider flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-cyan-300" />
                      AI Recommendation Rationale
                    </span>
                    <p className="text-xs text-slate-200 font-sans leading-relaxed italic">
                      "{route.recommendationReason}"
                    </p>
                  </div>

                  {/* Why this route? Button requested by Prompt */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate('/explainability');
                    }}
                    className="w-full py-2 px-3 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/50 text-cyan-200 hover:text-white text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all group shadow-sm"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-cyan-300 group-hover:rotate-12 transition-transform" />
                    <span>Why this route?</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              )}

              {/* Footer for non-recommended cards */}
              {!isRecommended && (
                <div className="mt-3 pt-2.5 border-t border-polar-700/40 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>Max Ice: {route.maxIceConcentrationPct}%</span>
                  {route.icebreakerAssistance && (
                    <span className="text-amber-400 flex items-center gap-1 text-[10px]">
                      <AlertTriangle className="w-3 h-3" />
                      Escort Advised
                    </span>
                  )}
                  {!route.icebreakerAssistance && (
                    <span className="text-emerald-400 text-[10px]">Autonomous Transit</span>
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
