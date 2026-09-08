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
      title="Decision Intelligence & Rationale"
      subtitle="Transparent AI decision rationales, SHAP feature attributions, and uncertainty margins."
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

          {/* Route cost breakdown */}
          <RouteCostBreakdownCard />
        </div>

        {/* 3. Model Confidence Scores */}
        <ConfidenceMetricsGrid />

        {/* 4. Alternative Route Rejection Analysis */}
        <AlternativeRouteRejectionCard />

        {/* 5. AI/ML Model Information & Architecture Stack */}
        <ModelArchitectureCard />

        {/* 6. Footer Compliance Banner */}
        <div className="p-5 rounded-[18px] bg-white border border-[#e0e0e0] flex flex-col sm:flex-row sm:items-center justify-between text-[13px] text-[#1d1d1f] gap-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#0066cc]" />
            <span className="font-semibold">POLARIS Explainable AI (XAI) Framework</span>
            <span className="text-[#e0e0e0]">&bull;</span>
            <span className="text-[#86868b] font-normal">Local additive feature attribution & Pareto frontier transparency</span>
          </div>
          <div className="flex items-center gap-1.5 font-semibold bg-[#f5f5f7] px-3.5 py-1.5 rounded-full border border-[#e0e0e0] text-[12px] text-[#1d1d1f]">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>IMO Safety Code Compliant</span>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default ExplainableAI;
