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
    <div className="bg-white border border-slate-200/90 shadow-xs rounded-xl p-5 space-y-4">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-sky-50 border border-sky-200 text-sky-700">
              <RefreshCw className={`w-4 h-4 text-sky-600 ${stage === 'recalculating' ? 'animate-spin' : ''}`} />
            </div>
            <h3 className="text-sm font-bold font-sans text-slate-900">
              Dynamic Route Recalculation Engine
            </h3>
          </div>
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
            Real-Time Collision Avoidance & Waypoint Re-Planning
          </span>
        </div>

        {/* Primary Action Button requested by Prompt */}
        <div className="flex items-center gap-2">
          {stage === 'idle' ? (
            <button
              onClick={onTriggerRecalculate}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-mono font-bold transition-all shadow-xs group"
            >
              <AlertTriangle className="w-4 h-4 text-rose-600 group-hover:scale-110 transition-transform" />
              <span>Recalculate Route</span>
            </button>
          ) : (
            <button
              onClick={onResetRecalculate}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-mono font-medium transition-all shadow-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Baseline Route</span>
            </button>
          )}
        </div>
      </div>

      {/* 4-Stage Recalculation Animation Flow requested by Prompt */}
      {/* Sequence: Old route → hazard → route recalculated → safer route */}
      <div className="space-y-3">
        {/* Stage Indicator Stepper */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs">
          {/* Step 1: Old Route */}
          <div
            className={`p-2.5 rounded-lg border transition-all ${
              stage === 'hazard_detected' || stage === 'recalculating' || stage === 'safer_route'
                ? 'bg-slate-50 border-slate-200 text-slate-700'
                : 'bg-white border-slate-200 text-slate-500'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-slate-500">Step 1</span>
              <span className="w-2 h-2 rounded-full bg-sky-500" />
            </div>
            <span className="font-bold text-slate-900 block mt-1">1. Old Route</span>
            <span className="text-[10px] text-slate-500 block truncate">Planned Baseline</span>
          </div>

          {/* Step 2: Hazard Detected */}
          <div
            className={`p-2.5 rounded-lg border transition-all ${
              stage === 'hazard_detected'
                ? 'bg-rose-50 border-rose-300 text-rose-900 ring-2 ring-rose-500/20 shadow-xs animate-pulse'
                : stage === 'recalculating' || stage === 'safer_route'
                ? 'bg-slate-50 border-slate-200 text-slate-700'
                : 'bg-white border-slate-200 text-slate-400'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-slate-500">Step 2</span>
              <span className={`w-2 h-2 rounded-full ${stage === 'hazard_detected' ? 'bg-rose-600' : 'bg-slate-300'}`} />
            </div>
            <span className="font-bold text-slate-900 block mt-1">2. Hazard</span>
            <span className="text-[10px] text-slate-500 block truncate">
              {stage === 'hazard_detected' ? 'Drift Incursion' : 'IB-023 Buffer'}
            </span>
          </div>

          {/* Step 3: Route Recalculated */}
          <div
            className={`p-2.5 rounded-lg border transition-all ${
              stage === 'recalculating'
                ? 'bg-amber-50 border-amber-300 text-amber-900 ring-2 ring-amber-500/20 shadow-xs'
                : stage === 'safer_route'
                ? 'bg-slate-50 border-slate-200 text-slate-700'
                : 'bg-white border-slate-200 text-slate-400'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-slate-500">Step 3</span>
              <span className={`w-2 h-2 rounded-full ${stage === 'recalculating' ? 'bg-amber-500 animate-ping' : 'bg-slate-300'}`} />
            </div>
            <span className="font-bold text-slate-900 block mt-1">3. Recalculation</span>
            <span className="text-[10px] text-slate-500 block truncate">
              {stage === 'recalculating' ? 'A* + NSGA-II' : 'Solved'}
            </span>
          </div>

          {/* Step 4: Safer Route */}
          <div
            className={`p-2.5 rounded-lg border transition-all ${
              stage === 'safer_route'
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900 ring-2 ring-emerald-500/20 shadow-xs'
                : 'bg-white border-slate-200 text-slate-400'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-slate-500">Step 4</span>
              <span className={`w-2 h-2 rounded-full ${stage === 'safer_route' ? 'bg-emerald-600' : 'bg-slate-300'}`} />
            </div>
            <span className="font-bold text-slate-900 block mt-1">4. Safer Route</span>
            <span className="text-[10px] text-slate-500 block truncate">
              {stage === 'safer_route' ? 'Active Corridor' : 'Standby'}
            </span>
          </div>
        </div>

        {/* Dynamic Status Banner depending on current stage */}
        {stage === 'hazard_detected' && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 shadow-xs space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-rose-700 font-mono font-bold">
                <AlertTriangle className="w-5 h-5 text-rose-600 animate-bounce" />
                {/* Mandatory Prompt-Required Text */}
                <span className="text-sm">"Hazard detected."</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-mono text-[10px] font-bold border border-rose-300">
                INCURSION WARNING
              </span>
            </div>
            <p className="text-slate-800 font-sans leading-relaxed">
              {HAZARD_SCENARIO_SPEC.description}
            </p>
            <div className="flex items-center gap-4 text-xs font-mono pt-1 text-slate-600">
              <span className="text-rose-700 font-bold">
                Collision Risk: {HAZARD_SCENARIO_SPEC.collisionRiskBefore}
              </span>
              <span>Target: Planned Waypoint Bravo</span>
            </div>
          </div>
        )}

        {stage === 'recalculating' && (
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 shadow-xs space-y-2 text-xs">
            <div className="flex items-center gap-2 text-amber-800 font-mono font-bold">
              <RefreshCw className="w-5 h-5 text-amber-600 animate-spin" />
              <span className="text-sm">A* Pathfinding + NSGA-II Pareto Solver in Progress...</span>
            </div>
            <p className="text-slate-800 font-sans leading-relaxed">
              Synthesizing continuous-curvature obstacle avoidance spline around IB-023 projected 24h drift ellipse.
            </p>
          </div>
        )}

        {stage === 'safer_route' && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 shadow-xs space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-800 font-mono font-bold">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span className="text-sm">Safer Avoidance Route Activated</span>
              </div>
              <span className="px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono text-[10px] font-bold border border-emerald-300">
                OPTIMAL SAFE CORRIDOR
              </span>
            </div>
            <p className="text-slate-800 font-sans leading-relaxed">
              Corridor shifted 8.5 NM West inserting waypoint <code className="text-emerald-800 bg-emerald-100/80 px-1 py-0.5 rounded font-mono font-bold">WP-Bravo-Alt</code>. Collision probability reduced from <span className="text-rose-600 line-through">18.4%</span> to <strong className="text-emerald-700">2.1% (SAFE)</strong>.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono pt-1 text-slate-600">
              <span className="text-sky-700 font-semibold">Distance Delta: {HAZARD_SCENARIO_SPEC.distanceDeltaKm}</span>
              <span className="text-slate-600">ETA Delta: {HAZARD_SCENARIO_SPEC.etaDeltaMin}</span>
              <span className="text-emerald-700 font-bold">Structural Safety Margin: +24 NOMINAL</span>
            </div>
          </div>
        )}

        {stage === 'idle' && (
          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-mono text-slate-600 flex items-center justify-between">
            <span>Ready for dynamic contingency re-routing simulation.</span>
            <span className="text-sky-700 font-semibold">Click "Recalculate Route" to simulate dynamic incursion</span>
          </div>
        )}
      </div>
    </div>
  );
};
