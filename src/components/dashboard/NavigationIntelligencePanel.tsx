import React from 'react';
import {
  BrainCircuit,
  Compass,
  Zap,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import { NAVIGATION_INTELLIGENCE_DATA } from '@/data/dashboardData';
import { Link } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

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
    <TooltipProvider delayDuration={200}>
      <div className="rounded-2xl border border-zinc-200/90 bg-white p-5 shadow-xs space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-zinc-100 border border-zinc-200 text-zinc-950">
              <BrainCircuit className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-zinc-950 font-sans tracking-tight">
                Navigation Intelligence
              </h2>
              <p className="text-[11px] text-zinc-500 font-sans font-medium">
                Autonomous Polar Decision Engine (A* + NSGA-II)
              </p>
            </div>
          </div>

          <span className="rounded-full bg-black px-2.5 py-1 text-[10px] font-mono font-bold text-white shadow-xs">
            ACTIVE ADVISORY
          </span>
        </div>

        <div className="space-y-3.5">
          {/* Observed Environmental State */}
          <div className="rounded-xl bg-zinc-50 border border-zinc-200/80 p-3.5 space-y-1">
            <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-zinc-800" />
              Observed Environmental State
            </p>
            <p className="text-xs text-zinc-900 font-sans italic font-medium">
              &quot;{currentCondition}&quot;
            </p>
          </div>

          {/* AI Recommendation */}
          <div className="rounded-xl border border-zinc-200 bg-zinc-50/70 p-3.5 space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-900 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-black" />
                AI Recommendation
              </p>
              <span className="rounded bg-black px-2 py-0.5 text-[10px] font-mono font-bold text-white shadow-2xs">
                {recommendedRoute} ROUTE
              </span>
            </div>
            <p className="text-xs text-zinc-700 font-sans leading-relaxed">
              {aiRationale}
            </p>
          </div>

          {/* 4 Metrics Grid with Radix UI Progress Indicators */}
          <div className="grid grid-cols-2 gap-2.5 font-mono">
            {/* 1. Model Confidence */}
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="rounded-xl bg-zinc-50 border border-zinc-200/80 p-3 space-y-1.5 cursor-default hover:border-zinc-300 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-zinc-500 font-bold uppercase">Confidence</span>
                    <span className="text-xs font-extrabold text-zinc-950">{confidencePct}%</span>
                  </div>
                  <Progress value={confidencePct} className="h-1.5 bg-zinc-200" indicatorClassName="bg-black" />
                </div>
              </TooltipTrigger>
              <TooltipContent side="top" className="text-xs font-mono">
                ECMWF & SAR ensemble confidence: {confidencePct}%
              </TooltipContent>
            </Tooltip>

            {/* 2. Fuel Saving */}
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="rounded-xl bg-zinc-50 border border-zinc-200/80 p-3 space-y-1.5 cursor-default hover:border-zinc-300 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-zinc-500 font-bold uppercase">Fuel Saving</span>
                    <span className="text-xs font-extrabold text-emerald-600 flex items-center gap-0.5">
                      <TrendingUp className="w-3 h-3" />
                      +{estimatedFuelSavingPct}%
                    </span>
                  </div>
                  <Progress value={estimatedFuelSavingPct * 5} className="h-1.5 bg-zinc-200" indicatorClassName="bg-emerald-600" />
                </div>
              </TooltipTrigger>
              <TooltipContent side="top" className="text-xs font-mono">
                Estimated fuel reduction compared to baseline standard corridor
              </TooltipContent>
            </Tooltip>

            {/* 3. Time Delta */}
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="rounded-xl bg-zinc-50 border border-zinc-200/80 p-3 space-y-1.5 cursor-default hover:border-zinc-300 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-zinc-500 font-bold uppercase">Time Delta</span>
                    <span className="text-xs font-extrabold text-zinc-950">{estimatedTimeDeltaHours} hrs</span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-200 rounded-full overflow-hidden">
                    <div className="h-full bg-zinc-700 w-3/4 rounded-full" />
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent side="top" className="text-xs font-mono">
                Total voyage time advantage: {estimatedTimeDeltaHours} hours
              </TooltipContent>
            </Tooltip>

            {/* 4. Safety Index */}
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="rounded-xl bg-zinc-50 border border-zinc-200/80 p-3 space-y-1.5 cursor-default hover:border-zinc-300 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-zinc-500 font-bold uppercase">Safety Index</span>
                    <span className="text-xs font-extrabold text-zinc-950 flex items-center gap-0.5">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      {safetyScore}/100
                    </span>
                  </div>
                  <Progress value={safetyScore} className="h-1.5 bg-zinc-200" indicatorClassName="bg-black" />
                </div>
              </TooltipTrigger>
              <TooltipContent side="top" className="text-xs font-mono">
                POLARIS RIO Structural Compliance Index (Safe &gt; 80)
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Drilldown button */}
          <Link
            to="/routes"
            className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-black hover:bg-zinc-800 text-white font-bold text-xs font-mono transition-colors shadow-xs group"
          >
            <span>Inspect Detailed Route Optimization</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </TooltipProvider>
  );
};

