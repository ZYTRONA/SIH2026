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
    <div className="bg-white border border-zinc-200/90 shadow-xs rounded-xl p-5 space-y-4">
      {/* Header with Prompt-Required Label */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-100">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-black text-white">
              <GitFork className="w-4 h-4 text-white" />
            </div>
            {/* Mandatory Specific Label */}
            <h3 className="text-sm font-bold font-sans text-zinc-950">
              Route Cost Breakdown
            </h3>
          </div>
          <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider block font-semibold">
            A* + NSGA-II Multi-Objective Optimization Objective Cost Distribution
          </span>
        </div>

        <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono bg-zinc-100 text-zinc-900 border border-zinc-300 font-bold self-start sm:self-auto">
          PARETO MINIMIZATION
        </span>
      </div>

      {/* Stacked Progress Visual Bar */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs font-mono text-zinc-600">
          <span>Objective Weight Aggregation</span>
          <span className="text-zinc-950 font-bold">100% Normalized Cost</span>
        </div>

        <div className="w-full h-3 rounded-full bg-zinc-200 overflow-hidden border border-zinc-300 flex">
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
              className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 space-y-2 hover:border-zinc-300 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="p-1 rounded-md"
                    style={{
                      backgroundColor: `${item.color}20`,
                      color: item.color,
                    }}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-bold text-zinc-950">{item.name}</span>
                </div>
                <span className="font-bold text-sm" style={{ color: item.color }}>
                  {item.costPct}%
                </span>
              </div>

              <div className="w-full h-1.5 rounded-full bg-zinc-200 overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${item.costPct}%`,
                    backgroundColor: item.color,
                  }}
                />
              </div>

              <div className="flex items-center justify-between text-[10px] text-zinc-500 pt-0.5">
                <span className="truncate">{item.description}</span>
                <span className="font-semibold text-zinc-800 flex-shrink-0 ml-1">
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

