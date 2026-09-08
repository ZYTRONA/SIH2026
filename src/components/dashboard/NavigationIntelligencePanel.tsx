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
    <div className="bg-white border border-zinc-200/90 rounded-xl p-5 flex flex-col justify-between space-y-4 shadow-xs">
      {/* Panel Header */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-zinc-100 border border-zinc-200 text-zinc-900">
            <BrainCircuit className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold font-sans text-zinc-950">
              Navigation Intelligence
            </h3>
            <span className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider">
              Autonomous Polar Decision Engine
            </span>
          </div>
        </div>

        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-black text-white font-bold shadow-xs">
          ACTIVE ADVISORY
        </span>
      </div>

      {/* Current Condition Readout */}
      <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 space-y-1.5">
        <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-bold flex items-center gap-1.5">
          <Compass className="w-3.5 h-3.5 text-black" />
          Observed Environmental State
        </span>
        <p className="text-xs text-zinc-800 leading-relaxed italic font-sans font-medium">
          &quot;{currentCondition}&quot;
        </p>
      </div>

      {/* AI Recommendation Box */}
      <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-300 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-900 font-extrabold flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-black" />
            AI Recommendation
          </span>
          <span className="px-2.5 py-0.5 rounded-md bg-black text-white text-xs font-mono font-bold shadow-xs">
            {recommendedRoute} ROUTE
          </span>
        </div>
        <p className="text-xs text-zinc-700 leading-relaxed font-sans font-normal">
          {aiRationale}
        </p>
      </div>

      {/* Core Intelligence Metrics Grid */}
      <div className="grid grid-cols-2 gap-2.5">
        {/* Confidence Card */}
        <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-600">
            <span className="font-semibold">Model Confidence</span>
            <span className="text-zinc-950 font-extrabold">{confidencePct}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-zinc-200 overflow-hidden">
            <div
              className="h-full rounded-full bg-black transition-all"
              style={{ width: `${confidencePct}%` }}
            />
          </div>
          <span className="text-[10px] text-zinc-500 block pt-0.5 font-sans font-medium">
            Bayesian Ensemble Score
          </span>
        </div>

        {/* Estimated Fuel Saving */}
        <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-600">
            <span className="flex items-center gap-1 font-semibold">
              <Fuel className="w-3 h-3 text-black" />
              Est. Fuel Saving
            </span>
            <span className="text-zinc-950 font-extrabold">+{estimatedFuelSavingPct}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-zinc-200 overflow-hidden">
            <div
              className="h-full rounded-full bg-zinc-800 transition-all"
              style={{ width: `${estimatedFuelSavingPct * 5}%` }}
            />
          </div>
          <span className="text-[10px] text-zinc-500 block pt-0.5 font-sans font-medium">
            ~14.6 Metric Tons Saved
          </span>
        </div>
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-2 gap-2 text-xs font-mono">
        <div className="flex items-center gap-2 p-2.5 rounded-lg bg-zinc-50 border border-zinc-200 text-zinc-700">
          <Clock className="w-3.5 h-3.5 text-zinc-600" />
          <div>
            <div className="text-[10px] text-zinc-500 font-medium">TIME DELTA</div>
            <div className="text-xs font-bold text-zinc-950">{estimatedTimeDeltaHours} hrs</div>
          </div>
        </div>

        <div className="flex items-center gap-2 p-2.5 rounded-lg bg-zinc-50 border border-zinc-200 text-zinc-700">
          <ShieldCheck className="w-3.5 h-3.5 text-black" />
          <div>
            <div className="text-[10px] text-zinc-500 font-medium">SAFETY INDEX</div>
            <div className="text-xs font-bold text-zinc-950">{safetyScore}/100</div>
          </div>
        </div>
      </div>

      {/* Route Optimization Drilldown Link */}
      <Link
        to="/routes"
        className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-black hover:bg-zinc-800 text-white font-bold text-xs font-mono transition-colors shadow-xs"
      >
        <span>Inspect Detailed Route Optimization</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
};
