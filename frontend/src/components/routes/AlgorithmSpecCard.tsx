import React from 'react';
import { ROUTE_ALGORITHM_SPEC } from '@/data/routeOptimizationData';
import {
  Cpu,
  GitFork,
  Sliders,
  Sparkles,
  ShieldCheck,
  Fuel,
  Clock,
  Activity,
  CheckCircle2,
} from 'lucide-react';

export const AlgorithmSpecCard: React.FC = () => {
  return (
    <div className="apple-card p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#f0f0f0]">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-[12px] bg-[#1d1d1f] text-white flex items-center justify-center shrink-0 shadow-xs">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-[16px] font-semibold text-[#1d1d1f] tracking-tight">
                Optimization Engine Architecture
              </h3>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#0066cc]/10 text-[#0066cc] border border-[#0066cc]/20">
                v2.6
              </span>
            </div>
            <p className="text-[12px] text-neutral-500 font-normal">
              Continuous-Curvature A* Kinematic Pathfinder &amp; NSGA-II Multi-Objective Solver
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-semibold self-start sm:self-auto">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
          <span>OPERATIONAL SOLVER</span>
        </div>
      </div>

      {/* 2-Stage Hybrid Optimization Pipeline */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[12px] font-semibold text-[#1d1d1f]">
            <Sparkles className="w-4 h-4 text-[#0066cc]" />
            <span>Dual-Stage Hybrid Optimization Pipeline</span>
          </div>
          <span className="text-[11px] font-mono text-neutral-400 font-normal">
            Continuous Stereographic Grid
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Stage 1: A* Kinematic Pathfinding */}
          <div className="p-4 rounded-[14px] bg-[#fafafc] border border-[#e0e0e0] flex flex-col justify-between space-y-3 hover:border-[#0066cc]/30 transition-colors">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-[#0066cc]/10 text-[#0066cc]">
                    <GitFork className="w-4 h-4" />
                  </div>
                  <span className="text-[14px] font-semibold text-[#1d1d1f]">
                    Stage 1: A* Pathfinding
                  </span>
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#f5f5f7] text-neutral-600 border border-[#e0e0e0]">
                  Kinematic Grid
                </span>
              </div>
              <p className="text-[12px] text-neutral-600 leading-relaxed font-normal">
                Computes collision-free continuous trajectories across polar stereographic grid graphs, avoiding dynamic iceberg drift radii and multi-year pack ice barriers.
              </p>
            </div>

            {/* Formula Block */}
            <div className="p-2.5 rounded-lg bg-white border border-[#e0e0e0] font-mono text-[11px] text-neutral-700 flex items-center justify-between">
              <span className="text-neutral-500 font-semibold">Cost Function:</span>
              <span className="font-semibold text-[#1d1d1f] bg-[#f5f5f7] px-2 py-0.5 rounded border border-[#e0e0e0]">
                f(n) = g(n) + h(n)
              </span>
            </div>
          </div>

          {/* Stage 2: NSGA-II Multi-Objective */}
          <div className="p-4 rounded-[14px] bg-[#fafafc] border border-[#e0e0e0] flex flex-col justify-between space-y-3 hover:border-[#0066cc]/30 transition-colors">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
                    <Sliders className="w-4 h-4" />
                  </div>
                  <span className="text-[14px] font-semibold text-[#1d1d1f]">
                    Stage 2: NSGA-II Solver
                  </span>
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#f5f5f7] text-neutral-600 border border-[#e0e0e0]">
                  Pareto Optimizer
                </span>
              </div>
              <p className="text-[12px] text-neutral-600 leading-relaxed font-normal">
                Executes genetic non-dominated sorting and crowding distance selection to resolve non-convex trade-offs across safety, fuel economy, and transit duration.
              </p>
            </div>

            {/* Output Block */}
            <div className="p-2.5 rounded-lg bg-white border border-[#e0e0e0] font-mono text-[11px] text-neutral-700 flex items-center justify-between">
              <span className="text-neutral-500 font-semibold">Frontier:</span>
              <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Rank-1 Pareto Set
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Multi-Objective Optimization Formulation */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-semibold text-[#1d1d1f] tracking-tight">
            Multi-Objective Pareto Formulation
          </span>
          <span className="text-[11px] font-mono text-neutral-400">
            Total Weight: 100%
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Objective 1: Safety Cost */}
          <div className="p-3.5 rounded-[14px] bg-[#fafafc] border border-[#e0e0e0] space-y-2 flex flex-col justify-between">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-emerald-700">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="text-[12px] font-semibold text-[#1d1d1f]">1. Safety Cost</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px]">
                  35%
                </span>
              </div>
              <p className="text-[11px] text-neutral-500 font-normal leading-relaxed">
                Minimizes cumulative Polar RIO risk and iceberg proximity probability.
              </p>
            </div>
            <div className="pt-2 border-t border-[#e0e0e0]/60 font-mono text-[11px] text-neutral-700">
              <span className="text-neutral-400 text-[10px] block">Mathematical Objective:</span>
              <code className="text-[11px] font-semibold text-[#1d1d1f]">min ∫ (RIO + P_ice) ds</code>
            </div>
          </div>

          {/* Objective 2: Fuel Consumption */}
          <div className="p-3.5 rounded-[14px] bg-[#fafafc] border border-[#e0e0e0] space-y-2 flex flex-col justify-between">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[#0066cc]">
                  <Fuel className="w-4 h-4" />
                  <span className="text-[12px] font-semibold text-[#1d1d1f]">2. Fuel Burn</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-blue-100 text-[#0066cc] font-bold text-[11px]">
                  35%
                </span>
              </div>
              <p className="text-[11px] text-neutral-500 font-normal leading-relaxed">
                Minimizes bunker fuel consumption factoring ice resistance and wave drag.
              </p>
            </div>
            <div className="pt-2 border-t border-[#e0e0e0]/60 font-mono text-[11px] text-neutral-700">
              <span className="text-neutral-400 text-[10px] block">Mathematical Objective:</span>
              <code className="text-[11px] font-semibold text-[#1d1d1f]">min ∫ ṁ_fuel(v, R) dt</code>
            </div>
          </div>

          {/* Objective 3: Transit Duration */}
          <div className="p-3.5 rounded-[14px] bg-[#fafafc] border border-[#e0e0e0] space-y-2 flex flex-col justify-between">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-amber-600">
                  <Clock className="w-4 h-4" />
                  <span className="text-[12px] font-semibold text-[#1d1d1f]">3. Duration</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold text-[11px]">
                  30%
                </span>
              </div>
              <p className="text-[11px] text-neutral-500 font-normal leading-relaxed">
                Minimizes voyage time subject to PC3 icebreaker safe speed limits.
              </p>
            </div>
            <div className="pt-2 border-t border-[#e0e0e0]/60 font-mono text-[11px] text-neutral-700">
              <span className="text-neutral-400 text-[10px] block">Mathematical Objective:</span>
              <code className="text-[11px] font-semibold text-[#1d1d1f]">min ∫ (1 / v_safe) ds</code>
            </div>
          </div>
        </div>
      </div>

      {/* Solver Hyperparameters & Grid Telemetry */}
      <div className="p-4 rounded-[14px] bg-[#f5f5f7] border border-[#e0e0e0] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[12px]">
        <div className="flex flex-wrap items-center gap-3 text-neutral-600 font-mono text-[11px]">
          <div className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-md border border-[#e0e0e0]">
            <span className="text-neutral-400">Pop:</span>
            <span className="font-semibold text-[#1d1d1f]">{ROUTE_ALGORITHM_SPEC.simulationParams.populationSize}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-md border border-[#e0e0e0]">
            <span className="text-neutral-400">Generations:</span>
            <span className="font-semibold text-[#1d1d1f]">{ROUTE_ALGORITHM_SPEC.simulationParams.generations}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-md border border-[#e0e0e0]">
            <span className="text-neutral-400">Crossover:</span>
            <span className="font-semibold text-[#1d1d1f]">{ROUTE_ALGORITHM_SPEC.simulationParams.crossoverProbability}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-md border border-[#e0e0e0]">
            <span className="text-neutral-400">Mutation:</span>
            <span className="font-semibold text-[#1d1d1f]">{ROUTE_ALGORITHM_SPEC.simulationParams.mutationRate}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[12px] font-semibold text-[#1d1d1f] shrink-0">
          <Activity className="w-3.5 h-3.5 text-[#0066cc]" />
          <span>Spatial Grid: {ROUTE_ALGORITHM_SPEC.simulationParams.gridResolutionKm} km resolution</span>
        </div>
      </div>
    </div>
  );
};

