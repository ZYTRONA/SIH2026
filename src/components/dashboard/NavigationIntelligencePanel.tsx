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
    <div className="bg-white border border-slate-200/90 rounded-xl p-5 flex flex-col justify-between space-y-4 shadow-xs">
      {/* Panel Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-sky-50 border border-sky-200 text-sky-600">
            <BrainCircuit className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold font-sans text-slate-900">
              Navigation Intelligence
            </h3>
            <span className="text-[10px] font-mono text-sky-700 font-semibold uppercase tracking-wider">
              Autonomous Polar Decision Engine
            </span>
          </div>
        </div>

        <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-sky-50 text-sky-700 border border-sky-200 font-bold shadow-2xs">
          ACTIVE ADVISORY
        </span>
      </div>

      {/* Current Condition Readout */}
      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold flex items-center gap-1.5">
          <Compass className="w-3 h-3 text-sky-600" />
          Observed Environmental State
        </span>
        <p className="text-xs text-slate-700 leading-relaxed italic font-sans">
          &quot;{currentCondition}&quot;
        </p>
      </div>

      {/* AI Recommendation Box */}
      <div className="p-3.5 rounded-xl bg-sky-50/80 border border-sky-200 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase tracking-wider text-sky-800 font-bold flex items-center gap-1.5">
            <Zap className="w-3 h-3 text-sky-600" />
            AI Recommendation
          </span>
          <span className="px-2 py-0.5 rounded-md bg-white text-sky-800 border border-sky-300 text-xs font-mono font-bold shadow-2xs">
            {recommendedRoute} ROUTE
          </span>
        </div>
        <p className="text-xs text-slate-700 leading-relaxed font-sans">
          {aiRationale}
        </p>
      </div>

      {/* Core Intelligence Metrics Grid */}
      <div className="grid grid-cols-2 gap-2.5">
        {/* Confidence Card */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-600">
            <span className="font-medium">Model Confidence</span>
            <span className="text-emerald-700 font-bold">{confidencePct}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
            <div
              className="h-full rounded-full bg-emerald-500 transition-all"
              style={{ width: `${confidencePct}%` }}
            />
          </div>
          <span className="text-[10px] text-slate-400 block pt-0.5 font-sans">
            Bayesian Ensemble Score
          </span>
        </div>

        {/* Estimated Fuel Saving */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-600">
            <span className="flex items-center gap-1 font-medium">
              <Fuel className="w-3 h-3 text-sky-600" />
              Est. Fuel Saving
            </span>
            <span className="text-sky-700 font-bold">+{estimatedFuelSavingPct}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
            <div
              className="h-full rounded-full bg-sky-600 transition-all"
              style={{ width: `${estimatedFuelSavingPct * 5}%` }}
            />
          </div>
          <span className="text-[10px] text-slate-400 block pt-0.5 font-sans">
            ~14.6 Metric Tons Saved
          </span>
        </div>
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-2 gap-2 text-xs font-mono">
        <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-700">
          <Clock className="w-3.5 h-3.5 text-sky-600" />
          <div>
            <div className="text-[10px] text-slate-400">TIME DELTA</div>
            <div className="text-xs font-bold text-slate-800">{estimatedTimeDeltaHours} hrs</div>
          </div>
        </div>

        <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-700">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <div>
            <div className="text-[10px] text-slate-400">SAFETY INDEX</div>
            <div className="text-xs font-bold text-emerald-700">{safetyScore}/100</div>
          </div>
        </div>
      </div>

      {/* Route Optimization Drilldown Link */}
      <Link
        to="/routes"
        className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs font-mono transition-colors shadow-xs"
      >
        <span>Inspect Detailed Route Optimization</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
};
