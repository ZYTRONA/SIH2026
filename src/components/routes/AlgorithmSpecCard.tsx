import React from 'react';
import { ROUTE_ALGORITHM_SPEC } from '@/data/routeOptimizationData';
import { Cpu, GitFork, Sliders, Info, ShieldAlert, Sparkles } from 'lucide-react';

export const AlgorithmSpecCard: React.FC = () => {
  return (
    <div className="bg-white border border-slate-200/90 shadow-xs rounded-xl p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-sky-50 border border-sky-200 text-sky-700">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold font-sans text-slate-900">
              Optimization Engine Architecture
            </h3>
            <span className="text-[10px] font-mono text-sky-700 uppercase tracking-wider font-semibold">
              {ROUTE_ALGORITHM_SPEC.version}
            </span>
          </div>
        </div>

        <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono bg-sky-50 text-sky-700 border border-sky-200 font-semibold">
          PROTOTYPE SIMULATION
        </span>
      </div>

      {/* Mandatory Algorithm Duo */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-sky-800">
          <Sparkles className="w-4 h-4 text-sky-600" />
          <span>Core Hybrid Optimization Pipeline:</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* A* Pathfinding */}
          <div className="p-3 rounded-lg bg-white border border-slate-200 shadow-2xs space-y-1.5">
            <div className="flex items-center gap-2 text-sky-700 text-xs font-mono font-bold">
              <GitFork className="w-4 h-4" />
              <span>A* Pathfinding Engine</span>
            </div>
            <p className="text-[11px] text-slate-700 font-sans leading-relaxed font-medium">
              Calculates shortest feasible kinematic paths on discrete polar stereographic grid graphs with dynamic obstacle avoidance (iceberg drift radii & shelf boundaries).
            </p>
            <div className="text-[10px] font-mono text-slate-500 pt-1 border-t border-slate-100">
              Cost: <code className="text-sky-700 font-bold">f(n) = g(n) + h(n)</code> (Great Circle Heuristic)
            </div>
          </div>

          {/* NSGA-II Multi-objective Optimization */}
          <div className="p-3 rounded-lg bg-white border border-slate-200 shadow-2xs space-y-1.5">
            <div className="flex items-center gap-2 text-indigo-700 text-xs font-mono font-bold">
              <Sliders className="w-4 h-4" />
              <span>NSGA-II Multi-Objective</span>
            </div>
            <p className="text-[11px] text-slate-700 font-sans leading-relaxed font-medium">
              Non-dominated Sorting Genetic Algorithm II resolves non-convex trade-offs between voyage duration, fuel burn, and polar risk index outcomes (RIO).
            </p>
            <div className="text-[10px] font-mono text-slate-500 pt-1 border-t border-slate-100">
              Output: <code className="text-indigo-700 font-bold">Pareto Optimal Frontier</code> (Rank-1 Solutions)
            </div>
          </div>
        </div>
      </div>

      {/* Mandatory Disclaimer */}
      <div className="p-3 rounded-lg bg-amber-50/70 border border-amber-200 flex items-start gap-2.5 text-xs">
        <ShieldAlert className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <span className="font-mono font-bold text-amber-800 block text-[11px]">
            Prototype AI Simulation Notice
          </span>
          <p className="text-slate-700 text-[11px] leading-relaxed font-medium">
            The candidate routes shown are precomputed prototype simulated solutions representing the Pareto-optimal frontier under current environmental conditions. Full real-time edge solver coupling operates in connected testbed simulation mode.
          </p>
        </div>
      </div>

      {/* 3 Pareto Objectives */}
      <div className="space-y-2">
        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold px-1 block">
          Multi-Objective Optimization Formulation
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono">
          {ROUTE_ALGORITHM_SPEC.paretoObjectives.map((obj, i) => (
            <div
              key={i}
              className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="text-slate-900 font-bold text-[11px]">{obj.name}</span>
                <span className="text-sky-700 font-bold">{obj.weight}</span>
              </div>
              <div className="text-[10px] text-slate-500 truncate">
                {obj.formula}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Simulation Hyperparameters */}
      <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-slate-500">
        <div className="flex items-center gap-1.5 text-slate-700">
          <Info className="w-3.5 h-3.5 text-sky-600" />
          <span>Pop: 120 | Gen: 85 | Crossover: 0.85 | Mutation: 0.08</span>
        </div>
        <span className="text-sky-700 font-semibold">Spatial Grid: 5.0 km resolution</span>
      </div>
    </div>
  );
};
