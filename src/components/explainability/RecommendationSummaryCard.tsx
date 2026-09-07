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
    <div className="polar-panel p-5 space-y-5">
      {/* 1. Header Banner & Decision Question */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-polar-700/60">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-ice-500/15 border border-ice-400/40 text-ice-300">
              <HelpCircle className="w-5 h-5 text-cyan-300" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                Autonomous Navigation Decision Support
              </span>
              <h2 className="text-lg font-bold font-sans text-slate-100">
                "{EXPLAINABILITY_HEADER.question}"
              </h2>
            </div>
          </div>
          <p className="text-xs text-slate-300 font-sans leading-relaxed pt-1">
            {EXPLAINABILITY_HEADER.rationaleSummary}
          </p>
        </div>

        {/* Recommended Route & Confidence Pill */}
        <div className="flex items-center gap-3 bg-gradient-to-r from-polar-900 via-cyan-950/30 to-polar-900 p-3 rounded-xl border border-cyan-500/40 shadow-lg flex-shrink-0 self-start lg:self-auto">
          <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-300">
            <Award className="w-6 h-6 text-cyan-300" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                RECOMMENDED:
              </span>
              <span className="text-sm font-bold font-sans text-white">
                {EXPLAINABILITY_HEADER.recommendedRouteName}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[11px] font-mono text-slate-400">Model Confidence:</span>
              <span className="px-2 py-0.2 rounded text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/50">
                {EXPLAINABILITY_HEADER.overallConfidencePct}% CONFIDENCE
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Five Core Reasoning Points requested by Prompt */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Core Navigational Rationale & Multi-Factor Justifications
          </span>
          <span className="text-[10px] font-mono text-emerald-400 font-bold">
            5/5 Safety & Kinetic Constraints Satisfied
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {CORE_REASONING_POINTS.map((point: ReasoningPoint) => {
            const Icon = iconMap[point.iconName] || ShieldCheck;

            return (
              <div
                key={point.id}
                className="p-3.5 rounded-xl bg-polar-900/80 border border-polar-700/50 space-y-2 hover:border-cyan-500/40 transition-all flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded bg-polar-950 border border-polar-700 text-cyan-400">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h4 className="text-xs font-bold font-sans text-slate-100">
                        {point.title}
                      </h4>
                    </div>
                    <span
                      className={`px-1.5 py-0.2 rounded text-[9px] font-mono font-bold border flex-shrink-0 ${
                        point.badgeType === 'safe'
                          ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40'
                          : 'bg-cyan-500/15 text-cyan-300 border-cyan-500/40'
                      }`}
                    >
                      {point.badge}
                    </span>
                  </div>

                  <p className="text-[11px] font-sans text-slate-300 leading-relaxed">
                    {point.detail}
                  </p>
                </div>

                <div className="pt-2 border-t border-polar-700/40 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-400">{point.summary}</span>
                  <span className="text-cyan-300 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
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
