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
    <div className="bg-white border border-zinc-200/90 shadow-xs rounded-xl p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-black text-white">
            <AlertTriangle className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-bold font-sans text-zinc-950">
              {title}
            </h3>
            <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider font-semibold">
              Trade-Off Rejection Analysis & Hazard Comparison
            </span>
          </div>
        </div>

        <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono bg-zinc-100 text-zinc-900 border border-zinc-300 font-bold">
          REJECTED CANDIDATE
        </span>
      </div>

      {/* Mandatory Prompt-Required Quote Callout */}
      <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 space-y-1.5">
        <span className="text-[10px] font-mono font-bold text-zinc-900 uppercase tracking-wider block">
          Primary Rejection Rationale
        </span>
        <blockquote className="text-xs text-zinc-800 font-sans leading-relaxed italic border-l-2 border-black pl-3 font-medium">
          "{quote}"
        </blockquote>
      </div>

      {/* Side-by-Side Delta Comparison Cards */}
      <div className="space-y-2">
        <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-600 font-bold px-1 block">
          Balanced Route vs Fastest Direct Route Comparison
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 font-mono text-xs">
          {/* Travel Time */}
          <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 space-y-1.5">
            <div className="flex items-center justify-between text-zinc-500 text-[11px]">
              <span className="flex items-center gap-1 font-semibold">
                <Clock className="w-3.5 h-3.5 text-zinc-400" />
                Transit Duration
              </span>
              <span className="text-amber-800 font-bold">{comparison.travelTime.delta}</span>
            </div>
            <div className="flex items-center justify-between text-xs pt-1 border-t border-zinc-200">
              <span className="text-zinc-950 font-bold">
                Balanced: {comparison.travelTime.balanced}
              </span>
              <span className="text-zinc-500">
                Fastest: {comparison.travelTime.fastest}
              </span>
            </div>
          </div>

          {/* Risk Score */}
          <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 space-y-1.5">
            <div className="flex items-center justify-between text-zinc-500 text-[11px]">
              <span className="flex items-center gap-1 font-semibold">
                <Shield className="w-3.5 h-3.5 text-zinc-500" />
                POLARIS Risk Index
              </span>
              <span className="text-rose-800 font-bold">{comparison.riskScore.delta}</span>
            </div>
            <div className="flex items-center justify-between text-xs pt-1 border-t border-zinc-200">
              <span className="text-emerald-800 font-bold">
                Balanced: {comparison.riskScore.balanced.split(' ')[0]}
              </span>
              <span className="text-rose-800 font-semibold">
                Fastest: {comparison.riskScore.fastest.split(' ')[0]}
              </span>
            </div>
          </div>

          {/* Sea Ice Concentration */}
          <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 space-y-1.5">
            <div className="flex items-center justify-between text-zinc-500 text-[11px]">
              <span className="flex items-center gap-1 font-semibold">
                <Snowflake className="w-3.5 h-3.5 text-zinc-500" />
                Max Sea Ice Pack
              </span>
              <span className="text-rose-800 font-bold">{comparison.seaIceConcentration.delta}</span>
            </div>
            <div className="flex items-center justify-between text-xs pt-1 border-t border-zinc-200">
              <span className="text-zinc-950 font-bold">
                Balanced: {comparison.seaIceConcentration.balanced}
              </span>
              <span className="text-zinc-500">
                Fastest: {comparison.seaIceConcentration.fastest}
              </span>
            </div>
          </div>

          {/* Iceberg CPA */}
          <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 space-y-1.5">
            <div className="flex items-center justify-between text-zinc-500 text-[11px]">
              <span className="flex items-center gap-1 font-semibold">
                <Mountain className="w-3.5 h-3.5 text-zinc-500" />
                Iceberg Proximity (CPA)
              </span>
              <span className="text-rose-800 font-bold">{comparison.icebergCPA.delta}</span>
            </div>
            <div className="flex items-center justify-between text-xs pt-1 border-t border-zinc-200">
              <span className="text-emerald-800 font-bold">
                {comparison.icebergCPA.balanced}
              </span>
              <span className="text-rose-800 font-semibold">
                {comparison.icebergCPA.fastest}
              </span>
            </div>
          </div>

          {/* Icebreaker Requirement */}
          <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 space-y-1.5 sm:col-span-2">
            <div className="flex items-center justify-between text-zinc-500 text-[11px]">
              <span className="flex items-center gap-1 font-semibold">
                <Ship className="w-3.5 h-3.5 text-zinc-400" />
                Operational Escort Dependency
              </span>
              <span className="text-amber-800 font-bold">{comparison.icebreakerRequired.delta}</span>
            </div>
            <div className="flex items-center justify-between text-xs pt-1 border-t border-zinc-200">
              <span className="text-emerald-800 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Balanced: {comparison.icebreakerRequired.balanced}
              </span>
              <span className="text-rose-800 font-bold flex items-center gap-1">
                <XCircle className="w-3.5 h-3.5 text-rose-600" />
                Fastest: {comparison.icebreakerRequired.fastest}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Decision Summary Footer */}
      <div className="p-3 rounded-xl bg-zinc-100 border border-zinc-200 text-[11px] font-mono text-zinc-700 leading-relaxed">
        <strong className="text-emerald-800 font-bold">Tactical Conclusion: </strong>
        {verdict}
      </div>
    </div>
  );
};

