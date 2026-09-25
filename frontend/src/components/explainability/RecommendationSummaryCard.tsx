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
    <div className="bg-white border border-[#e0e0e0] rounded-[18px] p-6 space-y-6">
      {/* 1. Header Banner & Decision Question */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-[#f0f0f0]">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#0066cc]/10 text-[#0066cc]">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#86868b] font-semibold">
                Autonomous Navigation Decision Transparency
              </span>
              <h2 className="text-[18px] sm:text-[20px] font-semibold text-[#1d1d1f] tracking-tight">
                &quot;{EXPLAINABILITY_HEADER.question}&quot;
              </h2>
            </div>
          </div>
          <p className="text-[13px] sm:text-[14px] text-[#424245] leading-relaxed pt-1 max-w-3xl font-normal">
            {EXPLAINABILITY_HEADER.rationaleSummary}
          </p>
        </div>

        {/* Recommended Route & Confidence Pill */}
        <div className="flex items-center gap-3 bg-[#fafafc] p-4 rounded-xl border border-[#e0e0e0] flex-shrink-0 self-start lg:self-auto">
          <div className="p-2.5 rounded-xl bg-[#0066cc]/10 text-[#0066cc]">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-mono font-semibold text-[#86868b] uppercase tracking-wider">
                RECOMMENDED:
              </span>
              <span className="text-[14px] font-semibold text-[#1d1d1f]">
                {EXPLAINABILITY_HEADER.recommendedRouteName}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[11px] font-mono text-[#86868b]">Model Confidence:</span>
              <Badge variant="default" className="font-semibold bg-[#0066cc] text-white border-transparent">
                {EXPLAINABILITY_HEADER.overallConfidencePct}% CONFIDENCE
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Five Core Reasoning Points requested by Prompt */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between px-1">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#86868b] font-semibold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#0066cc]" />
            Core Navigational Rationale & Multi-Factor Justifications
          </span>
          <span className="text-[11px] font-mono text-emerald-700 font-semibold">
            5/5 Safety & Kinetic Constraints Satisfied
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {CORE_REASONING_POINTS.map((point: ReasoningPoint) => {
            const Icon = iconMap[point.iconName] || ShieldCheck;

            return (
              <div
                key={point.id}
                className="p-4 rounded-xl bg-[#fafafc] border border-[#e0e0e0] space-y-2.5 hover:border-[#0066cc]/40 transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-white border border-[#e0e0e0] text-[#0066cc]">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h4 className="text-[13px] font-semibold text-[#1d1d1f]">
                        {point.title}
                      </h4>
                    </div>
                    <Badge
                      variant="outline"
                      className={`text-[10px] font-semibold flex-shrink-0 ${
                        point.badgeType === 'safe'
                          ? 'bg-emerald-500/10 text-emerald-800 border-emerald-500/30'
                          : 'bg-[#f5f5f7] text-[#1d1d1f] border-[#e0e0e0]'
                      }`}
                    >
                      {point.badge}
                    </Badge>
                  </div>

                  <p className="text-[12px] text-[#424245] leading-relaxed font-normal">
                    {point.detail}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-[#e0e0e0] flex items-center justify-between text-[11px] font-mono">
                  <span className="text-[#86868b] font-normal">{point.summary}</span>
                  <span className="text-[#1d1d1f] font-semibold flex items-center gap-1">
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


