import React from 'react';
import { FASTEST_ROUTE_REJECTION } from '@/data/explainabilityData';
import {
  AlertTriangle,
  XCircle,
  CheckCircle2,
  Clock,
  Shield,
  Snowflake,
  Mountain,
  Ship,
} from 'lucide-react';

export const AlternativeRouteRejectionCard: React.FC = () => {
  const { title, quote, comparison, verdict } = FASTEST_ROUTE_REJECTION;

  return (
    <div className="polar-panel p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-polar-700/60">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold font-sans text-slate-100">
              {title}
            </h3>
            <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider">
              Trade-Off Rejection Analysis & Hazard Comparison
            </span>
          </div>
        </div>

        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/15 text-amber-300 border border-amber-500/30 font-semibold">
          REJECTED CANDIDATE
        </span>
      </div>

      {/* Mandatory Prompt-Required Quote Callout */}
      <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/40 space-y-1.5">
        <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider block">
          Primary Rejection Rationale
        </span>
        <blockquote className="text-xs text-slate-200 font-sans leading-relaxed italic border-l-2 border-amber-400 pl-3">
          "{quote}"
        </blockquote>
      </div>

      {/* Side-by-Side Delta Comparison Cards */}
      <div className="space-y-2">
        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold px-1 block">
          Balanced Route vs Fastest Direct Route Comparison
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 font-mono text-xs">
          {/* Travel Time */}
          <div className="p-3 rounded-lg bg-polar-900/80 border border-polar-700/40 space-y-1.5">
            <div className="flex items-center justify-between text-slate-400 text-[11px]">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                Transit Duration
              </span>
              <span className="text-amber-400 font-bold">{comparison.travelTime.delta}</span>
            </div>
            <div className="flex items-center justify-between text-xs pt-1 border-t border-polar-800">
              <span className="text-cyan-300 font-bold">
                Balanced: {comparison.travelTime.balanced}
              </span>
              <span className="text-slate-400">
                Fastest: {comparison.travelTime.fastest}
              </span>
            </div>
          </div>

          {/* Risk Score */}
          <div className="p-3 rounded-lg bg-polar-900/80 border border-polar-700/40 space-y-1.5">
            <div className="flex items-center justify-between text-slate-400 text-[11px]">
              <span className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-rose-400" />
                POLARIS Risk Index
              </span>
              <span className="text-rose-400 font-bold">{comparison.riskScore.delta}</span>
            </div>
            <div className="flex items-center justify-between text-xs pt-1 border-t border-polar-800">
              <span className="text-emerald-400 font-bold">
                Balanced: {comparison.riskScore.balanced.split(' ')[0]}
              </span>
              <span className="text-rose-400">
                Fastest: {comparison.riskScore.fastest.split(' ')[0]}
              </span>
            </div>
          </div>

          {/* Sea Ice Concentration */}
          <div className="p-3 rounded-lg bg-polar-900/80 border border-polar-700/40 space-y-1.5">
            <div className="flex items-center justify-between text-slate-400 text-[11px]">
              <span className="flex items-center gap-1">
                <Snowflake className="w-3.5 h-3.5 text-cyan-400" />
                Max Sea Ice Pack
              </span>
              <span className="text-rose-400 font-bold">{comparison.seaIceConcentration.delta}</span>
            </div>
            <div className="flex items-center justify-between text-xs pt-1 border-t border-polar-800">
              <span className="text-cyan-300 font-bold">
                Balanced: {comparison.seaIceConcentration.balanced}
              </span>
              <span className="text-slate-400">
                Fastest: {comparison.seaIceConcentration.fastest}
              </span>
            </div>
          </div>

          {/* Iceberg CPA */}
          <div className="p-3 rounded-lg bg-polar-900/80 border border-polar-700/40 space-y-1.5">
            <div className="flex items-center justify-between text-slate-400 text-[11px]">
              <span className="flex items-center gap-1">
                <Mountain className="w-3.5 h-3.5 text-amber-400" />
                Iceberg Proximity (CPA)
              </span>
              <span className="text-rose-400 font-bold">{comparison.icebergCPA.delta}</span>
            </div>
            <div className="flex items-center justify-between text-xs pt-1 border-t border-polar-800">
              <span className="text-emerald-400 font-bold">
                {comparison.icebergCPA.balanced}
              </span>
              <span className="text-rose-400">
                {comparison.icebergCPA.fastest}
              </span>
            </div>
          </div>

          {/* Icebreaker Requirement */}
          <div className="p-3 rounded-lg bg-polar-900/80 border border-polar-700/40 space-y-1.5 sm:col-span-2">
            <div className="flex items-center justify-between text-slate-400 text-[11px]">
              <span className="flex items-center gap-1">
                <Ship className="w-3.5 h-3.5 text-slate-400" />
                Operational Escort Dependency
              </span>
              <span className="text-amber-400 font-bold">{comparison.icebreakerRequired.delta}</span>
            </div>
            <div className="flex items-center justify-between text-xs pt-1 border-t border-polar-800">
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Balanced: {comparison.icebreakerRequired.balanced}
              </span>
              <span className="text-rose-400 flex items-center gap-1">
                <XCircle className="w-3.5 h-3.5" />
                Fastest: {comparison.icebreakerRequired.fastest}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Decision Summary Footer */}
      <div className="p-3 rounded-lg bg-polar-900/60 border border-polar-700/40 text-[11px] font-mono text-slate-300 leading-relaxed">
        <strong className="text-emerald-400">Tactical Conclusion: </strong>
        {verdict}
      </div>
    </div>
  );
};
