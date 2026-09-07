import React from 'react';
import {
  EXPLAINABILITY_HEADER,
  CORE_REASONING_POINTS,
  ReasoningPoint,
} from '@/data/explainabilityData';
import {
  Sparkles,
  HelpCircle,
  CheckCircle2,
  Snowflake,
  Mountain,
  Wind,
  Fuel,
  Clock,
  ShieldCheck,
  Award,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const iconMap = {
  Snowflake,
  Mountain,
  Wind,
  Fuel,
  Clock,
  ShieldCheck,
};

export const RecommendationSummaryCard: React.FC = () => {
  return (
    <div className="bg-white border border-slate-200/90 shadow-xs rounded-xl p-5 sm:p-6 space-y-5">
      {/* 1. Header Banner & Decision Question */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-sky-50 border border-sky-200 text-sky-700 shadow-2xs">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-sky-700 font-semibold">
                Autonomous Navigation Decision Transparency
              </span>
              <h2 className="text-lg sm:text-xl font-bold font-sans text-slate-900">
                &quot;{EXPLAINABILITY_HEADER.question}&quot;
              </h2>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed pt-1 max-w-3xl">
            {EXPLAINABILITY_HEADER.rationaleSummary}
          </p>
        </div>

        {/* Recommended Route & Confidence Pill */}
        <div className="flex items-center gap-3 bg-sky-50/80 p-3.5 rounded-xl border border-sky-200 shadow-xs flex-shrink-0 self-start lg:self-auto">
          <div className="p-2 rounded-lg bg-sky-100 text-sky-700">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
                RECOMMENDED:
              </span>
              <span className="text-sm font-bold font-sans text-slate-900">
                {EXPLAINABILITY_HEADER.recommendedRouteName}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[11px] font-mono text-slate-500">Model Confidence:</span>
              <Badge variant="ice" className="font-bold bg-sky-100 text-sky-800 border-sky-300">
                {EXPLAINABILITY_HEADER.overallConfidencePct}% CONFIDENCE
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Five Core Reasoning Points requested by Prompt */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            Core Navigational Rationale & Multi-Factor Justifications
          </span>
          <span className="text-[10px] font-mono text-emerald-700 font-bold">
            5/5 Safety & Kinetic Constraints Satisfied
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3.5">
          {CORE_REASONING_POINTS.map((point: ReasoningPoint) => {
            const Icon = iconMap[point.iconName] || ShieldCheck;

            return (
              <div
                key={point.id}
                className="p-4 rounded-xl bg-slate-50/80 border border-slate-200 space-y-2.5 hover:border-sky-300 transition-all duration-200 flex flex-col justify-between shadow-2xs group hover:-translate-y-0.5"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-white border border-slate-200 text-sky-700 shadow-2xs group-hover:scale-105 transition-transform">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h4 className="text-xs font-bold font-sans text-slate-900">
                        {point.title}
                      </h4>
                    </div>
                    <Badge
                      variant={point.badgeType === 'safe' ? 'success' : 'default'}
                      className="text-[9px] font-bold flex-shrink-0"
                    >
                      {point.badge}
                    </Badge>
                  </div>

                  <p className="text-[11px] font-sans text-slate-600 leading-relaxed font-medium">
                    {point.detail}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-slate-200 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-500">{point.summary}</span>
                  <span className="text-sky-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    {point.metric}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

