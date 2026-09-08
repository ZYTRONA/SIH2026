import React from 'react';
import { ROUTE_ALGORITHM_SPEC } from '@/data/routeOptimizationData';
import { Cpu, GitFork, Sliders, Info, ShieldAlert, Sparkles } from 'lucide-react';

export const AlgorithmSpecCard: React.FC = () => {
  return (
    <div className="bg-white border border-[#e0e0e0] rounded-[18px] p-6 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#f0f0f0]">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-[#0066cc]/10 text-[#0066cc]">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-[15px] font-semibold text-[#1d1d1f] tracking-tight">
              Optimization Engine Architecture
            </h3>
            <span className="text-[11px] font-mono text-[#86868b] uppercase tracking-wider font-semibold">
              {ROUTE_ALGORITHM_SPEC.version}
            </span>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full text-[11px] font-mono bg-[#f5f5f7] text-[#1d1d1f] border border-[#e0e0e0] font-semibold">
          PROTOTYPE SIMULATION
        </span>
      </div>

      {/* Mandatory Algorithm Duo */}
      <div className="p-4 rounded-xl bg-[#fafafc] border border-[#e0e0e0] space-y-3">
        <div className="flex items-center gap-2 text-[12px] font-mono font-semibold text-[#1d1d1f]">
          <Sparkles className="w-4 h-4 text-[#0066cc]" />
          <span>Core Hybrid Optimization Pipeline:</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* A* Pathfinding */}
          <div className="p-4 rounded-xl bg-white border border-[#e0e0e0] space-y-2">
            <div className="flex items-center gap-2 text-[#1d1d1f] text-[13px] font-semibold">
              <GitFork className="w-4 h-4 text-[#0066cc]" />
              <span>A* Pathfinding Engine</span>
            </div>
            <p className="text-[12px] text-[#424245] leading-relaxed font-normal">
              Calculates shortest feasible kinematic paths on discrete polar stereographic grid graphs with dynamic obstacle avoidance (iceberg drift radii & shelf boundaries).
            </p>
            <div className="text-[11px] font-mono text-[#86868b] pt-1.5 border-t border-[#f0f0f0]">
              Cost: <code className="text-[#1d1d1f] font-semibold">f(n) = g(n) + h(n)</code> (Great Circle Heuristic)
            </div>
          </div>

          {/* NSGA-II Multi-objective Optimization */}
          <div className="p-4 rounded-xl bg-white border border-[#e0e0e0] space-y-2">
            <div className="flex items-center gap-2 text-[#1d1d1f] text-[13px] font-semibold">
              <Sliders className="w-4 h-4 text-[#0066cc]" />
              <span>NSGA-II Multi-Objective</span>
            </div>
            <p className="text-[12px] text-[#424245] leading-relaxed font-normal">
              Non-dominated Sorting Genetic Algorithm II resolves non-convex trade-offs between voyage duration, fuel burn, and polar risk index outcomes (RIO).
            </p>
            <div className="text-[11px] font-mono text-[#86868b] pt-1.5 border-t border-[#f0f0f0]">
              Output: <code className="text-[#1d1d1f] font-semibold">Pareto Optimal Frontier</code> (Rank-1 Solutions)
            </div>
          </div>
        </div>
      </div>

      {/* Mandatory Disclaimer */}
      <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3 text-xs">
        <ShieldAlert className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <span className="font-semibold text-amber-900 block text-[12px]">
            Prototype AI Simulation Notice
          </span>
          <p className="text-[#424245] text-[12px] leading-relaxed font-normal">
            The candidate routes shown are precomputed prototype simulated solutions representing the Pareto-optimal frontier under current environmental conditions. Full real-time edge solver coupling operates in connected testbed simulation mode.
          </p>
        </div>
      </div>

      {/* 3 Pareto Objectives */}
      <div className="space-y-2">
        <span className="text-[11px] font-mono uppercase tracking-wider text-[#86868b] font-semibold px-1 block">
          Multi-Objective Optimization Formulation
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs font-mono">
          {ROUTE_ALGORITHM_SPEC.paretoObjectives.map((obj, i) => (
            <div
              key={i}
              className="p-3 rounded-xl bg-[#fafafc] border border-[#e0e0e0] space-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="text-[#1d1d1f] font-semibold text-[12px]">{obj.name}</span>
                <span className="text-[#0066cc] font-semibold">{obj.weight}</span>
              </div>
              <div className="text-[11px] text-[#86868b] truncate font-normal">
                {obj.formula}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Simulation Hyperparameters */}
      <div className="pt-3 border-t border-[#f0f0f0] flex flex-wrap items-center justify-between gap-3 text-[12px] font-mono text-[#86868b]">
        <div className="flex items-center gap-1.5 text-[#424245]">
          <Info className="w-3.5 h-3.5 text-[#0066cc]" />
          <span>Pop: 120 | Gen: 85 | Crossover: 0.85 | Mutation: 0.08</span>
        </div>
        <span className="text-[#1d1d1f] font-semibold">Spatial Grid: 5.0 km resolution</span>
      </div>
    </div>
  );
};

