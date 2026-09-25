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
    <div className="bg-white border border-[#e0e0e0] rounded-[18px] p-6 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#f0f0f0]">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-[15px] font-semibold text-[#1d1d1f] tracking-tight">
              {title}
            </h3>
            <span className="text-[11px] font-mono text-[#86868b] uppercase tracking-wider font-semibold">
              Trade-Off Rejection Analysis & Hazard Comparison
            </span>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full text-[11px] font-mono bg-amber-500/10 text-amber-800 border border-amber-500/20 font-semibold">
          REJECTED CANDIDATE
        </span>
      </div>

      {/* Mandatory Prompt-Required Quote Callout */}
      <div className="p-4 rounded-xl bg-[#fafafc] border border-[#e0e0e0] space-y-2">
        <span className="text-[11px] font-mono font-semibold text-[#1d1d1f] uppercase tracking-wider block">
          Primary Rejection Rationale
        </span>
        <blockquote className="text-[13px] text-[#424245] leading-relaxed italic border-l-2 border-[#0066cc] pl-3.5 font-normal">
          &quot;{quote}&quot;
        </blockquote>
      </div>

      {/* Side-by-Side Delta Comparison Cards */}
      <div className="space-y-2.5">
        <span className="text-[11px] font-mono uppercase tracking-wider text-[#86868b] font-semibold px-1 block">
          Balanced Route vs Fastest Direct Route Comparison
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 font-mono text-xs">
          {/* Travel Time */}
          <div className="p-3.5 rounded-xl bg-[#fafafc] border border-[#e0e0e0] space-y-1.5">
            <div className="flex items-center justify-between text-[#86868b] text-[11px]">
              <span className="flex items-center gap-1 font-semibold">
                <Clock className="w-3.5 h-3.5 text-[#86868b]" />
                Transit Duration
              </span>
              <span className="text-amber-700 font-semibold">{comparison.travelTime.delta}</span>
            </div>
            <div className="flex items-center justify-between text-xs pt-1.5 border-t border-[#e0e0e0]">
              <span className="text-[#1d1d1f] font-semibold">
                Balanced: {comparison.travelTime.balanced}
              </span>
              <span className="text-[#86868b] font-normal">
                Fastest: {comparison.travelTime.fastest}
              </span>
            </div>
          </div>

          {/* Risk Score */}
          <div className="p-3.5 rounded-xl bg-[#fafafc] border border-[#e0e0e0] space-y-1.5">
            <div className="flex items-center justify-between text-[#86868b] text-[11px]">
              <span className="flex items-center gap-1 font-semibold">
                <Shield className="w-3.5 h-3.5 text-[#86868b]" />
                POLARIS Risk Index
              </span>
              <span className="text-rose-700 font-semibold">{comparison.riskScore.delta}</span>
            </div>
            <div className="flex items-center justify-between text-xs pt-1.5 border-t border-[#e0e0e0]">
              <span className="text-emerald-700 font-semibold">
                Balanced: {comparison.riskScore.balanced.split(' ')[0]}
              </span>
              <span className="text-rose-700 font-semibold">
                Fastest: {comparison.riskScore.fastest.split(' ')[0]}
              </span>
            </div>
          </div>

          {/* Sea Ice Concentration */}
          <div className="p-3.5 rounded-xl bg-[#fafafc] border border-[#e0e0e0] space-y-1.5">
            <div className="flex items-center justify-between text-[#86868b] text-[11px]">
              <span className="flex items-center gap-1 font-semibold">
                <Snowflake className="w-3.5 h-3.5 text-[#86868b]" />
                Max Sea Ice Pack
              </span>
              <span className="text-rose-700 font-semibold">{comparison.seaIceConcentration.delta}</span>
            </div>
            <div className="flex items-center justify-between text-xs pt-1.5 border-t border-[#e0e0e0]">
              <span className="text-[#1d1d1f] font-semibold">
                Balanced: {comparison.seaIceConcentration.balanced}
              </span>
              <span className="text-[#86868b] font-normal">
                Fastest: {comparison.seaIceConcentration.fastest}
              </span>
            </div>
          </div>

          {/* Iceberg CPA */}
          <div className="p-3.5 rounded-xl bg-[#fafafc] border border-[#e0e0e0] space-y-1.5">
            <div className="flex items-center justify-between text-[#86868b] text-[11px]">
              <span className="flex items-center gap-1 font-semibold">
                <Mountain className="w-3.5 h-3.5 text-[#86868b]" />
                Iceberg Proximity (CPA)
              </span>
              <span className="text-rose-700 font-semibold">{comparison.icebergCPA.delta}</span>
            </div>
            <div className="flex items-center justify-between text-xs pt-1.5 border-t border-[#e0e0e0]">
              <span className="text-emerald-700 font-semibold">
                {comparison.icebergCPA.balanced}
              </span>
              <span className="text-rose-700 font-semibold">
                {comparison.icebergCPA.fastest}
              </span>
            </div>
          </div>

          {/* Icebreaker Requirement */}
          <div className="p-3.5 rounded-xl bg-[#fafafc] border border-[#e0e0e0] space-y-1.5 sm:col-span-2">
            <div className="flex items-center justify-between text-[#86868b] text-[11px]">
              <span className="flex items-center gap-1 font-semibold">
                <Ship className="w-3.5 h-3.5 text-[#86868b]" />
                Operational Escort Dependency
              </span>
              <span className="text-amber-700 font-semibold">{comparison.icebreakerRequired.delta}</span>
            </div>
            <div className="flex items-center justify-between text-xs pt-1.5 border-t border-[#e0e0e0]">
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Balanced: {comparison.icebreakerRequired.balanced}
              </span>
              <span className="text-rose-700 font-semibold flex items-center gap-1">
                <XCircle className="w-3.5 h-3.5 text-rose-600" />
                Fastest: {comparison.icebreakerRequired.fastest}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Decision Summary Footer */}
      <div className="p-3.5 rounded-xl bg-[#fafafc] border border-[#e0e0e0] text-[12px] font-mono text-[#424245] leading-relaxed">
        <strong className="text-emerald-700 font-semibold">Tactical Conclusion: </strong>
        {verdict}
      </div>
    </div>
  );
};

