import React from 'react';
import {
  Sparkles,
  ArrowRight,
  Fuel,
  Clock,
  ShieldCheck,
  Snowflake,
  TrendingUp,
} from 'lucide-react';
import { NAVIGATION_INTELLIGENCE_DATA } from '@/data/dashboardData';
import { Link } from 'react-router-dom';

interface CircularConfidenceProps {
  value: number;
  size?: number;
  strokeWidth?: number;
}

const CircularConfidence: React.FC<CircularConfidenceProps> = ({
  value,
  size = 76,
  strokeWidth = 5,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#f0f0f0"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#0066cc"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[18px] font-semibold text-[#1d1d1f] leading-none">{value}%</span>
        <span className="text-[10px] text-neutral-400 font-normal mt-0.5">Confidence</span>
      </div>
    </div>
  );
};

interface MetricRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  delta?: string;
  deltaType?: 'positive' | 'negative' | 'neutral';
  deltaLabel?: string;
}

const MetricRow: React.FC<MetricRowProps> = ({ icon, label, value, delta, deltaLabel }) => (
  <div className="flex items-center justify-between py-2.5 border-b border-[#f0f0f0] last:border-0">
    <div className="flex items-center gap-2.5">
      <div className="p-1.5 rounded-full bg-[#f5f5f7] text-[#1d1d1f]">
        {icon}
      </div>
      <span className="text-[14px] text-neutral-600 font-normal">{label}</span>
    </div>
    <div className="flex items-center gap-2">
      <span className="text-[14px] font-semibold text-[#1d1d1f] tabular-nums">{value}</span>
      {delta && (
        <span className="text-[12px] font-normal text-emerald-600 flex items-center gap-0.5">
          <TrendingUp className="w-3 h-3" />
          {delta}
        </span>
      )}
      {deltaLabel && (
        <span className="text-[11px] text-neutral-400">{deltaLabel}</span>
      )}
    </div>
  </div>
);

export const NavigationIntelligencePanel: React.FC = () => {
  const { confidencePct, estimatedFuelSavingPct, estimatedTimeDeltaHours, safetyScore } = NAVIGATION_INTELLIGENCE_DATA;

  return (
    <div className="apple-card p-0 overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-[#f0f0f0] bg-[#fafafc]">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-full bg-[#0066cc]/10 text-[#0066cc]">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-[14px] font-semibold text-[#1d1d1f]">Navigation Intelligence</h3>
            <p className="text-[12px] text-neutral-500">AI-powered route optimization and risk assessment</p>
          </div>
        </div>
      </div>

      {/* AI Recommendation Banner */}
      <div className="px-5 py-4 border-b border-[#f0f0f0]">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[11px] font-semibold text-[#0066cc] uppercase tracking-wider">AI Recommendation</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-normal bg-emerald-50 text-emerald-800 border border-emerald-200">Optimal</span>
            </div>
            <h4 className="text-[21px] font-semibold text-[#1d1d1f] tracking-tight">Route Delta 2.1</h4>
            <p className="text-[14px] text-neutral-600 mt-1 leading-relaxed">
              Adaptive route balancing safety, ice risk, and fuel efficiency.
            </p>
          </div>
          <CircularConfidence value={confidencePct} />
        </div>
      </div>

      {/* Metrics */}
      <div className="px-5 py-2">
        <MetricRow
          icon={<Fuel className="w-3.5 h-3.5" />}
          label="Fuel Saving"
          value={`${estimatedFuelSavingPct}%`}
          delta="-2.1 t"
          deltaType="positive"
        />
        <MetricRow
          icon={<Clock className="w-3.5 h-3.5" />}
          label="Time Delta"
          value={`${Math.abs(estimatedTimeDeltaHours)}h ${Math.round(Math.abs(estimatedTimeDeltaHours % 1) * 60)}m`}
          delta="-2h 18m"
          deltaType="positive"
          deltaLabel="vs baseline"
        />
        <MetricRow
          icon={<ShieldCheck className="w-3.5 h-3.5" />}
          label="Safety Index"
          value={`${safetyScore}/100`}
          delta="Improved"
          deltaType="positive"
        />
        <MetricRow
          icon={<Snowflake className="w-3.5 h-3.5" />}
          label="Ice Exposure"
          value="Low"
          delta="Reduced"
          deltaType="positive"
        />
      </div>

      {/* View Full Analysis Link */}
      <div className="px-5 py-3 border-t border-[#f0f0f0] bg-[#fafafc]">
        <Link
          to="/routes"
          className="btn-apple-secondary w-full !min-h-[38px] !h-[38px] !text-[14px]"
        >
          <span>View Full Analysis</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
