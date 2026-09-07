import React from 'react';
import {
  BrainCircuit,
  Compass,
  Zap,
  ShieldCheck,
  Fuel,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { NAVIGATION_INTELLIGENCE_DATA } from '@/data/dashboardData';
import { Link } from 'react-router-dom';

export const NavigationIntelligencePanel: React.FC = () => {
  const {
    recommendedRoute,
    confidencePct,
    estimatedFuelSavingPct,
    estimatedTimeDeltaHours,
    safetyScore,
    currentCondition,
    aiRationale,
  } = NAVIGATION_INTELLIGENCE_DATA;

  return (
    <div className="polar-panel p-5 flex flex-col justify-between space-y-4">
      {/* Panel Header */}
      <div className="flex items-center justify-between pb-3 border-b border-polar-700/60">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <BrainCircuit className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold font-sans text-slate-100">
              Navigation Intelligence
            </h3>
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">
              Autonomous Polar Decision Engine
            </span>
          </div>
        </div>

        <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-ice-500/15 text-ice-300 border border-ice-500/30 font-semibold">
          ACTIVE ADVISORY
        </span>
      </div>

      {/* Current Condition Readout */}
      <div className="p-3 rounded-lg bg-polar-900/90 border border-polar-700/60 space-y-1.5">
        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
          <Compass className="w-3 h-3 text-ice-400" />
          Observed Environmental State
        </span>
        <p className="text-xs text-slate-200 leading-relaxed italic">
          "{currentCondition}"
        </p>
      </div>

      {/* AI Recommendation Box */}
      <div className="p-3.5 rounded-lg bg-ice-950/30 border border-ice-500/30 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase tracking-wider text-ice-400 font-bold flex items-center gap-1.5">
            <Zap className="w-3 h-3 text-ice-400" />
            AI Recommendation
          </span>
          <span className="px-2 py-0.5 rounded bg-ice-500/20 text-ice-200 border border-ice-500/40 text-xs font-mono font-bold">
            {recommendedRoute} ROUTE
          </span>
        </div>
        <p className="text-xs text-slate-200 leading-relaxed">
          {aiRationale}
        </p>
      </div>

      {/* Core Intelligence Metrics Grid */}
      <div className="grid grid-cols-2 gap-2.5">
        {/* Confidence Card */}
        <div className="p-3 rounded-lg bg-polar-900/80 border border-polar-700/50 space-y-1">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>Model Confidence</span>
            <span className="text-emerald-400 font-bold">{confidencePct}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-polar-950 overflow-hidden">
            <div
              className="h-full rounded-full bg-emerald-400 transition-all"
              style={{ width: `${confidencePct}%` }}
            />
          </div>
          <span className="text-[10px] text-slate-400 block pt-0.5">
            Bayesian Ensemble Score
          </span>
        </div>

        {/* Estimated Fuel Saving */}
        <div className="p-3 rounded-lg bg-polar-900/80 border border-polar-700/50 space-y-1">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span className="flex items-center gap-1">
              <Fuel className="w-3 h-3 text-cyan-400" />
              Est. Fuel Saving
            </span>
            <span className="text-cyan-300 font-bold">+{estimatedFuelSavingPct}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-polar-950 overflow-hidden">
            <div
              className="h-full rounded-full bg-cyan-400 transition-all"
              style={{ width: `${estimatedFuelSavingPct * 5}%` }}
            />
          </div>
          <span className="text-[10px] text-slate-400 block pt-0.5">
            ~14.6 Metric Tons Saved
          </span>
        </div>
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-2 gap-2 text-xs font-mono">
        <div className="flex items-center gap-2 p-2 rounded bg-polar-900/60 border border-polar-700/40 text-slate-300">
          <Clock className="w-3.5 h-3.5 text-ice-400" />
          <div>
            <div className="text-[10px] text-slate-400">TIME DELTA</div>
            <div className="text-xs font-semibold text-slate-200">{estimatedTimeDeltaHours} hrs</div>
          </div>
        </div>

        <div className="flex items-center gap-2 p-2 rounded bg-polar-900/60 border border-polar-700/40 text-slate-300">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <div>
            <div className="text-[10px] text-slate-400">SAFETY INDEX</div>
            <div className="text-xs font-semibold text-emerald-400">{safetyScore}/100</div>
          </div>
        </div>
      </div>

      {/* Route Optimization Drilldown Link */}
      <Link
        to="/routes"
        className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-md bg-polar-800 hover:bg-polar-750 text-ice-300 border border-polar-700 hover:border-ice-500/40 text-xs font-mono font-medium transition-colors"
      >
        <span>Inspect Detailed Route Optimization Corridor</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
};
