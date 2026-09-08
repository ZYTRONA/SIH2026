import React from 'react';
import {
  HAZARD_SCENARIO_SPEC,
} from '@/data/digitalTwinData';
import {
  AlertTriangle,
  RefreshCw,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';

export type RecalculationStage = 'idle' | 'hazard_detected' | 'recalculating' | 'safer_route';

interface RouteRecalculationOverlayProps {
  stage: RecalculationStage;
  onTriggerRecalculate: () => void;
  onResetRecalculate: () => void;
}

export const RouteRecalculationOverlay: React.FC<RouteRecalculationOverlayProps> = ({
  stage,
  onTriggerRecalculate,
  onResetRecalculate,
}) => {
  return (
    <div className="bg-white border border-zinc-200/90 shadow-xs rounded-xl p-5 space-y-4">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-200">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-black text-white">
              <RefreshCw className={`w-4 h-4 text-white ${stage === 'recalculating' ? 'animate-spin' : ''}`} />
            </div>
            <h3 className="text-sm font-bold font-sans text-zinc-950">
              Dynamic Route Recalculation Engine
            </h3>
          </div>
          <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider block font-semibold">
            Real-Time Collision Avoidance & Waypoint Re-Planning
          </span>
        </div>

        {/* Primary Action Button requested by Prompt */}
        <div className="flex items-center gap-2">
          {stage === 'idle' ? (
            <button
              onClick={onTriggerRecalculate}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black hover:bg-zinc-800 text-white text-xs font-mono font-bold transition-all shadow-xs group cursor-pointer"
            >
              <AlertTriangle className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
              <span>Recalculate Route</span>
            </button>
          ) : (
            <button
              onClick={onResetRecalculate}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-300 text-xs font-mono font-medium transition-all shadow-xs cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Baseline Route</span>
            </button>
          )}
        </div>
      </div>

      {/* 4-Stage Recalculation Animation Flow requested by Prompt */}
      <div className="space-y-3">
        {/* Stage Indicator Stepper */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs">
          {/* Step 1: Old Route */}
          <div
            className={`p-2.5 rounded-xl border transition-all ${
              stage === 'hazard_detected' || stage === 'recalculating' || stage === 'safer_route'
                ? 'bg-zinc-50 border-zinc-200 text-zinc-700'
                : 'bg-white border-zinc-200 text-zinc-500'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-zinc-500 font-bold">Step 1</span>
              <span className="w-2 h-2 rounded-full bg-black" />
            </div>
            <span className="font-bold text-zinc-950 block mt-1">1. Old Route</span>
            <span className="text-[10px] text-zinc-500 block truncate">Planned Baseline</span>
          </div>

          {/* Step 2: Hazard Detected */}
          <div
            className={`p-2.5 rounded-xl border transition-all ${
              stage === 'hazard_detected'
                ? 'bg-rose-50 border-rose-400 text-rose-950 ring-2 ring-rose-500/20 shadow-xs animate-pulse'
                : stage === 'recalculating' || stage === 'safer_route'
                ? 'bg-zinc-50 border-zinc-200 text-zinc-700'
                : 'bg-white border-zinc-200 text-zinc-400'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-zinc-500 font-bold">Step 2</span>
              <span className={`w-2 h-2 rounded-full ${stage === 'hazard_detected' ? 'bg-rose-600' : 'bg-zinc-300'}`} />
            </div>
            <span className="font-bold text-zinc-950 block mt-1">2. Hazard</span>
            <span className="text-[10px] text-zinc-500 block truncate">
              {stage === 'hazard_detected' ? 'Drift Incursion' : 'IB-023 Buffer'}
            </span>
          </div>

          {/* Step 3: Route Recalculated */}
          <div
            className={`p-2.5 rounded-xl border transition-all ${
              stage === 'recalculating'
                ? 'bg-amber-50 border-amber-400 text-amber-950 ring-2 ring-amber-500/20 shadow-xs'
                : stage === 'safer_route'
                ? 'bg-zinc-50 border-zinc-200 text-zinc-700'
                : 'bg-white border-zinc-200 text-zinc-400'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-zinc-500 font-bold">Step 3</span>
              <span className={`w-2 h-2 rounded-full ${stage === 'recalculating' ? 'bg-amber-600 animate-ping' : 'bg-zinc-300'}`} />
            </div>
            <span className="font-bold text-zinc-950 block mt-1">3. Recalculation</span>
            <span className="text-[10px] text-zinc-500 block truncate">
              {stage === 'recalculating' ? 'A* + NSGA-II' : 'Solved'}
            </span>
          </div>

          {/* Step 4: Safer Route */}
          <div
            className={`p-2.5 rounded-xl border transition-all ${
              stage === 'safer_route'
                ? 'bg-emerald-50 border-emerald-400 text-emerald-950 ring-2 ring-emerald-500/20 shadow-xs'
                : 'bg-white border-zinc-200 text-zinc-400'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-zinc-500 font-bold">Step 4</span>
              <span className={`w-2 h-2 rounded-full ${stage === 'safer_route' ? 'bg-emerald-600' : 'bg-zinc-300'}`} />
            </div>
            <span className="font-bold text-zinc-950 block mt-1">4. Safer Route</span>
            <span className="text-[10px] text-zinc-500 block truncate">
              {stage === 'safer_route' ? 'Active Corridor' : 'Standby'}
            </span>
          </div>
        </div>

        {/* Dynamic Status Banner depending on current stage */}
        {stage === 'hazard_detected' && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-300 shadow-xs space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-rose-900 font-mono font-bold">
                <AlertTriangle className="w-5 h-5 text-rose-600 animate-bounce" />
                {/* Mandatory Prompt-Required Text */}
                <span className="text-sm font-black">"Hazard detected."</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-900 font-mono text-[10px] font-bold border border-rose-300">
                INCURSION WARNING
              </span>
            </div>
            <p className="text-zinc-800 font-sans leading-relaxed font-medium">
              {HAZARD_SCENARIO_SPEC.description}
            </p>
            <div className="flex items-center gap-4 text-xs font-mono pt-1 text-zinc-700">
              <span className="text-rose-900 font-bold">
                Collision Risk: {HAZARD_SCENARIO_SPEC.collisionRiskBefore}
              </span>
              <span>Target: Planned Waypoint Bravo</span>
            </div>
          </div>
        )}

        {stage === 'recalculating' && (
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 shadow-xs space-y-2 text-xs">
            <div className="flex items-center gap-2 text-amber-950 font-mono font-bold">
              <RefreshCw className="w-5 h-5 text-amber-700 animate-spin" />
              <span className="text-sm">A* Pathfinding + NSGA-II Pareto Solver in Progress...</span>
            </div>
            <p className="text-zinc-800 font-sans leading-relaxed font-medium">
              Synthesizing continuous-curvature obstacle avoidance spline around IB-023 projected 24h drift ellipse.
            </p>
          </div>
        )}

        {stage === 'safer_route' && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 shadow-xs space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-950 font-mono font-bold">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span className="text-sm font-black">Safer Avoidance Route Activated</span>
              </div>
              <span className="px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-900 font-mono text-[10px] font-bold border border-emerald-300">
                OPTIMAL SAFE CORRIDOR
              </span>
            </div>
            <p className="text-zinc-800 font-sans leading-relaxed font-medium">
              Corridor shifted 8.5 NM West inserting waypoint <code className="text-emerald-900 bg-emerald-100 px-1 py-0.5 rounded font-mono font-bold border border-emerald-300">WP-Bravo-Alt</code>. Collision probability reduced from <span className="text-rose-700 line-through">18.4%</span> to <strong className="text-emerald-900">2.1% (SAFE)</strong>.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono pt-1 text-zinc-700">
              <span className="text-zinc-950 font-bold">Distance Delta: {HAZARD_SCENARIO_SPEC.distanceDeltaKm}</span>
              <span className="text-zinc-700">ETA Delta: {HAZARD_SCENARIO_SPEC.etaDeltaMin}</span>
              <span className="text-emerald-900 font-bold">Structural Safety Margin: +24 NOMINAL</span>
            </div>
          </div>
        )}

        {stage === 'idle' && (
          <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs font-mono text-zinc-600 flex items-center justify-between">
            <span>Ready for dynamic contingency re-routing simulation.</span>
            <span className="text-zinc-950 font-bold">Click "Recalculate Route" to simulate dynamic incursion</span>
          </div>
        )}
      </div>
    </div>
  );
};

