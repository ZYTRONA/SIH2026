import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageContainer } from '@/components/layout/PageContainer';
import {
  RecommendationSummaryCard,
  ShapFeatureContributionChart,
  ConfidenceMetricsGrid,
  AlternativeRouteRejectionCard,
  RouteCostBreakdownCard,
  ModelArchitectureCard,
} from '@/components/explainability';
import { Sparkles, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export const ExplainableAI: React.FC = () => {
  const navigate = useNavigate();
  const [accepted, setAccepted] = useState(false);

  const handleAcceptRecommendation = () => {
    setAccepted(true);
    setTimeout(() => {
      navigate('/dashboard');
    }, 1200);
  };

  return (
    <PageContainer
      title="Decision Intelligence & Rationale"
      subtitle="Transparent AI decision rationales, SHAP feature attributions, and uncertainty margins."
      badge="TRANSPARENCY 91%"
      badgeType="active"
    >
      <div className="space-y-6">
        {/* Accept Recommendation Notification Banner */}
        {accepted && (
          <div className="p-4 rounded-[18px] bg-[#0066cc] text-white flex items-center justify-between gap-3 text-[14px] font-semibold animate-in fade-in">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-white" />
              <span>Recommendation accepted! Route POLAR-OPT-A loaded to Bridge ECDIS console.</span>
            </div>
            <span className="text-[12px] text-white/80 font-mono">Redirecting to Dashboard...</span>
          </div>
        )}

        {/* 1. Header Banner, Decision Question & 5 Core Reasoning Points */}
        <RecommendationSummaryCard />

        {/* Primary Action: Big Accept Recommendation Button */}
        <div className="bg-white border border-[#e0e0e0] rounded-[18px] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-0.5">
            <h3 className="text-[15px] font-semibold text-[#1d1d1f]">
              Autonomous Path Recommendation Verdict
            </h3>
            <p className="text-[13px] text-[#424245]">
              94% model confidence based on Sentinel-1 SAR, ResUNet ice concentration, and Lagrangian iceberg drift cones.
            </p>
          </div>

          <button
            onClick={handleAcceptRecommendation}
            disabled={accepted}
            className="btn-apple-primary flex items-center justify-center gap-2 !h-12 !px-7 !text-[15px] font-semibold cursor-pointer shrink-0"
          >
            <CheckCircle2 className="w-5 h-5 text-white" />
            <span>{accepted ? 'Recommendation Accepted' : 'Accept Recommendation'}</span>
            {!accepted && <ArrowRight className="w-4 h-4 text-white" />}
          </button>
        </div>

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
