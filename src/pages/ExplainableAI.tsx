import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import {
  RecommendationSummaryCard,
  ShapFeatureContributionChart,
  ConfidenceMetricsGrid,
  AlternativeRouteRejectionCard,
  RouteCostBreakdownCard,
  ModelArchitectureCard,
} from '@/components/explainability';
import { Sparkles, ShieldCheck } from 'lucide-react';

export const ExplainableAI: React.FC = () => {
  return (
    <PageContainer
      title="Explainable Navigation Intelligence"
      subtitle="Transparent AI decision rationales, SHAP feature attributions, and uncertainty margins"
      badge="TRANSPARENCY 91%"
      badgeType="active"
    >
      <div className="space-y-6">
        {/* 1. Header Banner, Decision Question & 5 Core Reasoning Points */}
        <RecommendationSummaryCard />

        {/* 2. Feature Contributions (SHAP for Risk Model) & Route Cost Breakdown (NSGA-II) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* SHAP-based feature contribution for the ML risk model */}
          <ShapFeatureContributionChart />

          {/* Route cost breakdown (separate from SHAP) */}
          <RouteCostBreakdownCard />
        </div>

        {/* 3. Model Confidence Scores (Forecast 89%, Risk 86%, Route 87%) */}
        <ConfidenceMetricsGrid />

        {/* 4. Alternative Route Rejection Analysis (Why Fastest was not selected) */}
        <AlternativeRouteRejectionCard />

        {/* 5. AI/ML Model Information & Architecture Stack */}
        <ModelArchitectureCard />

        {/* 6. Footer Compliance Banner */}
        <div className="p-3.5 rounded-xl bg-zinc-100 border border-zinc-200 flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono text-zinc-600 gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-black" />
            <span className="text-zinc-950 font-bold">POLARIS Explainable AI (XAI) Framework</span>
            <span>—</span>
            <span>Local additive feature attribution & Pareto frontier transparency</span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>IMO CODE OF SAFETY COMPLIANT</span>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

