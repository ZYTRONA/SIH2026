import React from 'react';
import { ROUTE_ALGORITHM_SPEC } from '@/data/routeOptimizationData';
import { Cpu, GitFork, Sliders, Info, ShieldAlert, Sparkles } from 'lucide-react';

export const AlgorithmSpecCard: React.FC = () => {
  return (
    <div className="polar-panel p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-polar-700/60">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded bg-ice-500/10 border border-ice-500/30 text-ice-400">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold font-sans text-slate-100">
              Optimization Engine Architecture
            </h3>
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">
              {ROUTE_ALGORITHM_SPEC.version}
            </span>
          </div>
        </div>

        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-semibold">
          PROTOTYPE SIMULATION
        </span>
      </div>

      {/* Mandatory Algorithm Duo requested by Prompt */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-polar-900/90 via-polar-850/80 to-polar-900/90 border border-polar-700/70 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-ice-300">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Core Hybrid Optimization Pipeline:</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* A* Pathfinding */}
          <div className="p-3 rounded-lg bg-polar-950/80 border border-polar-700/50 space-y-1.5">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold">
              <GitFork className="w-4 h-4" />
              <span>A* Pathfinding Engine</span>
            </div>
            <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
              Calculates shortest feasible kinematic paths on discrete polar stereographic grid graphs with dynamic obstacle avoidance (iceberg drift radii & shelf boundaries).
            </p>
            <div className="text-[10px] font-mono text-slate-400 pt-1 border-t border-polar-800">
              Cost: <code className="text-ice-300">f(n) = g(n) + h(n)</code> (Great Circle Heuristic)
            </div>
          </div>

          {/* NSGA-II Multi-objective Optimization */}
          <div className="p-3 rounded-lg bg-polar-950/80 border border-polar-700/50 space-y-1.5">
            <div className="flex items-center gap-2 text-ice-400 text-xs font-mono font-bold">
              <Sliders className="w-4 h-4" />
              <span>NSGA-II Multi-Objective</span>
            </div>
            <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
              Non-dominated Sorting Genetic Algorithm II resolves non-convex trade-offs between voyage duration, fuel burn, and polar risk index outcomes (RIO).
            </p>
            <div className="text-[10px] font-mono text-slate-400 pt-1 border-t border-polar-800">
              Output: <code className="text-cyan-300">Pareto Optimal Frontier</code> (Rank-1 Solutions)
            </div>
          </div>
        </div>
      </div>

      {/* Mandatory Disclaimer requested by Prompt */}
      <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-500/30 flex items-start gap-2.5 text-xs">
        <ShieldAlert className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <span className="font-mono font-bold text-amber-300 block text-[11px]">
            Prototype AI Simulation Notice
          </span>
          <p className="text-slate-300 text-[11px] leading-relaxed">
            The candidate routes shown are precomputed prototype simulated solutions representing the Pareto-optimal frontier under current environmental conditions. Full real-time edge solver coupling operates in connected testbed simulation mode.
          </p>
        </div>
      </div>

      {/* 3 Pareto Objectives */}
      <div className="space-y-2">
        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold px-1 block">
          Multi-Objective Optimization Formulation
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono">
          {ROUTE_ALGORITHM_SPEC.paretoObjectives.map((obj, i) => (
            <div
              key={i}
              className="p-2.5 rounded bg-polar-900/60 border border-polar-700/40 space-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="text-slate-200 font-bold text-[11px]">{obj.name}</span>
                <span className="text-cyan-400 font-bold">{obj.weight}</span>
              </div>
              <div className="text-[10px] text-slate-400 truncate">
                {obj.formula}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Simulation Hyperparameters */}
      <div className="pt-2 border-t border-polar-700/50 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-slate-400">
        <div className="flex items-center gap-1.5 text-slate-300">
          <Info className="w-3.5 h-3.5 text-ice-400" />
          <span>Pop: 120 | Gen: 85 | Crossover: 0.85 | Mutation: 0.08</span>
        </div>
        <span className="text-cyan-300">Spatial Grid: 5.0 km resolution</span>
      </div>
    </div>
  );
};
