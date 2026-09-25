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
    <div className="bg-white border border-[#e0e0e0] rounded-[18px] p-6 space-y-5">
      {/* Header with Prompt-Required Label */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#f0f0f0]">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#0066cc]/10 text-[#0066cc]">
              <GitFork className="w-4 h-4 text-[#0066cc]" />
            </div>
            {/* Mandatory Specific Label */}
            <h3 className="text-[15px] font-semibold text-[#1d1d1f] tracking-tight">
              Route Cost Breakdown
            </h3>
          </div>
          <span className="text-[11px] font-mono text-[#86868b] uppercase tracking-wider block font-semibold">
            A* + NSGA-II Multi-Objective Optimization Objective Cost Distribution
          </span>
        </div>

        <span className="px-3 py-1 rounded-full text-[11px] font-mono bg-[#f5f5f7] text-[#1d1d1f] border border-[#e0e0e0] font-semibold self-start sm:self-auto">
          PARETO MINIMIZATION
        </span>
      </div>

      {/* Stacked Progress Visual Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono text-[#86868b]">
          <span>Objective Weight Aggregation</span>
          <span className="text-[#1d1d1f] font-semibold">100% Normalized Cost</span>
        </div>

        <div className="w-full h-3 rounded-full bg-[#f0f0f0] overflow-hidden border border-[#e0e0e0] flex">
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
              className="p-4 rounded-xl bg-[#fafafc] border border-[#e0e0e0] space-y-2.5 hover:border-[#0066cc]/40 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="p-1.5 rounded-lg"
                    style={{
                      backgroundColor: `${item.color}15`,
                      color: item.color,
                    }}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-semibold text-[#1d1d1f] text-[12px]">{item.name}</span>
                </div>
                <span className="font-semibold text-sm" style={{ color: item.color }}>
                  {item.costPct}%
                </span>
              </div>

              <div className="w-full h-1.5 rounded-full bg-[#e0e0e0] overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${item.costPct}%`,
                    backgroundColor: item.color,
                  }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#86868b] pt-0.5">
                <span className="truncate font-normal">{item.description}</span>
                <span className="font-semibold text-[#1d1d1f] flex-shrink-0 ml-1">
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

