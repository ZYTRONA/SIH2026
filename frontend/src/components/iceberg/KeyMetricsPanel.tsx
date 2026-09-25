import React from 'react';
import { Mountain, TriangleAlert, Radar, BarChart2 } from 'lucide-react';

interface KeyMetricsPanelProps {
  totalActiveCount?: number;
  highRiskCount?: number;
  incursionsCount?: number;
  sarTrackedPct?: number;
}

export const KeyMetricsPanel: React.FC<KeyMetricsPanelProps> = ({
  totalActiveCount = 37,
  highRiskCount = 7,
  incursionsCount = 12,
  sarTrackedPct = 94,
}) => {
  return (
    <div className="apple-card p-5 flex flex-col justify-between h-full space-y-4">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center gap-2.5 pb-2 border-b border-[#f0f0f0]">
          <BarChart2 className="w-4.5 h-4.5 text-[#1d1d1f]" />
          <h2 className="text-[14px] font-semibold text-[#1d1d1f] tracking-tight">
            Key Telemetry Metrics
          </h2>
        </div>

        {/* Metric Cards List */}
        <div className="space-y-3">
          {/* 1. Active Icebergs */}
          <div className="p-3.5 rounded-[14px] border border-[#e0e0e0] bg-[#fafafc] flex items-center gap-3.5">
            <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center shrink-0 text-[#0066cc] border border-[#e0e0e0]">
              <Mountain className="h-5 w-5" />
            </div>
            <div>
              <div className="text-[24px] sm:text-[28px] font-semibold text-[#1d1d1f] leading-none tracking-tight">
                {totalActiveCount}
              </div>
              <div className="text-[13px] font-semibold text-[#1d1d1f] mt-1 leading-tight">
                Active Icebergs
              </div>
              <div className="text-[11px] text-neutral-500 mt-0.5 font-normal">
                &uarr; 4 since yesterday
              </div>
            </div>
          </div>

          {/* 2. High Risk Alerts */}
          <div className="p-3.5 rounded-[14px] border border-[#e0e0e0] bg-[#fafafc] flex items-center gap-3.5">
            <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center shrink-0 text-rose-600 border border-[#e0e0e0]">
              <TriangleAlert className="h-5 w-5" />
            </div>
            <div>
              <div className="text-[24px] sm:text-[28px] font-semibold text-[#1d1d1f] leading-none tracking-tight">
                {highRiskCount}
              </div>
              <div className="text-[13px] font-semibold text-[#1d1d1f] mt-1 leading-tight">
                High Risk Alerts
              </div>
              <div className="text-[11px] text-rose-600 font-normal mt-0.5">
                &uarr; 2 since yesterday
              </div>
            </div>
          </div>

          {/* 3. Predicted Corridor Incursions */}
          <div className="p-3.5 rounded-[14px] border border-[#e0e0e0] bg-[#fafafc] flex items-center gap-3.5">
            <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center shrink-0 text-[#0066cc] border border-[#e0e0e0]">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19 L10 19 C14 19 14 13 10 13 L8 13 C4 13 4 5 10 5 L20 5" />
                <path d="M16 2 L20 5 L16 8" />
              </svg>
            </div>
            <div>
              <div className="text-[24px] sm:text-[28px] font-semibold text-[#1d1d1f] leading-none tracking-tight">
                {incursionsCount}
              </div>
              <div className="text-[13px] font-semibold text-[#1d1d1f] mt-1 leading-tight">
                Corridor Incursions
              </div>
              <div className="text-[11px] text-[#0066cc] font-normal mt-0.5">
                &uarr; 3 since yesterday
              </div>
            </div>
          </div>

          {/* 4. Radar Tracking Status */}
          <div className="p-3.5 rounded-[14px] border border-[#e0e0e0] bg-[#fafafc] space-y-2">
            <div className="flex items-start gap-3.5">
              <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center shrink-0 text-emerald-600 border border-[#e0e0e0]">
                <Radar className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-semibold text-[#1d1d1f] leading-tight">
                  Radar Tracking Status
                </div>
                <div className="text-[11px] text-neutral-500 mt-0.5 font-normal">
                  {sarTrackedPct}% Tracked by SAR
                </div>

                <div className="flex items-center gap-1.5 mt-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] font-normal text-emerald-700">Active</span>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1.5 rounded-full bg-[#e0e0e0] overflow-hidden">
              <div
                className="h-full bg-[#0066cc] rounded-full transition-all duration-500"
                style={{ width: `${sarTrackedPct}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
