import React from 'react';
import {
  ROUTE_COST_BREAKDOWN,
  RouteCostItem,
} from '@/data/explainabilityData';
import { GitFork, Activity, Fuel, Clock, Shield, Sliders } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  'Fuel Kinetics Cost': Fuel,
  'Transit Duration Cost': Clock,
  'Safety Hazard Penalty': Shield,
  'Maneuvering & Turning Penalty': Sliders,
};

export const RouteCostBreakdownCard: React.FC = () => {
  return (
    <div className="polar-panel p-5 space-y-4">
      {/* Header with Prompt-Required Label */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-polar-700/60">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded bg-ice-500/10 border border-ice-500/30 text-ice-400">
              <GitFork className="w-4 h-4" />
            </div>
            {/* Mandatory Specific Label */}
            <h3 className="text-sm font-bold font-sans text-slate-100">
              Route Cost Breakdown
            </h3>
          </div>
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
            A* + NSGA-II Multi-Objective Optimization Objective Cost Distribution
          </span>
        </div>

        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-ice-500/15 text-ice-300 border border-ice-500/30 font-semibold self-start sm:self-auto">
          PARETO MINIMIZATION
        </span>
      </div>

      {/* Stacked Progress Visual Bar */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs font-mono text-slate-300">
          <span>Objective Weight Aggregation</span>
          <span className="text-cyan-400 font-bold">100% Normalized Cost</span>
        </div>

        <div className="w-full h-3 rounded-full bg-polar-950 overflow-hidden border border-polar-700/50 flex">
          {ROUTE_COST_BREAKDOWN.map((item: RouteCostItem) => (
            <div
              key={item.name}
              className="h-full transition-all hover:opacity-90"
              style={{
                width: `${item.costPct}%`,
                backgroundColor: item.color,
              }}
              title={`${item.name}: ${item.costPct}%`}
            />
          ))}
        </div>
      </div>

      {/* Individual Cost Items List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 font-mono text-xs">
        {ROUTE_COST_BREAKDOWN.map((item: RouteCostItem) => {
          const Icon = iconMap[item.name] || Activity;

          return (
            <div
              key={item.name}
              className="p-3 rounded-xl bg-polar-900/80 border border-polar-700/40 space-y-2 hover:border-polar-600 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="p-1 rounded"
                    style={{
                      backgroundColor: `${item.color}20`,
                      color: item.color,
                    }}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-bold text-slate-200">{item.name}</span>
                </div>
                <span className="font-bold text-sm" style={{ color: item.color }}>
                  {item.costPct}%
                </span>
              </div>

              <div className="w-full h-1.5 rounded-full bg-polar-950 overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${item.costPct}%`,
                    backgroundColor: item.color,
                  }}
                />
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-400 pt-0.5">
                <span className="truncate">{item.description}</span>
                <span className="font-semibold text-slate-300 flex-shrink-0 ml-1">
                  {item.rawCost}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
