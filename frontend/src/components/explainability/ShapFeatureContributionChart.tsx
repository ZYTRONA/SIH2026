import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
  Cell,
} from 'recharts';
import {
  SHAP_FEATURE_CONTRIBUTIONS,
  ShapFeatureContribution,
} from '@/data/explainabilityData';
import { BarChart3, Info, TrendingUp, TrendingDown } from 'lucide-react';

export const ShapFeatureContributionChart: React.FC = () => {
  // Prepare data formatted for horizontal diverging BarChart
  const chartData = SHAP_FEATURE_CONTRIBUTIONS.map((item) => ({
    name: item.feature,
    shapValue: item.shapValue,
    category: item.category,
    rawFeatureValue: item.rawFeatureValue,
    impactDescription: item.impactDescription,
    isPositive: item.shapValue >= 0,
  }));

  return (
    <div className="bg-white border border-[#e0e0e0] rounded-[18px] p-6 space-y-5">
      {/* Header with Mandatory Prompt-Required Label */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#f0f0f0]">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#0066cc]/10 text-[#0066cc]">
              <BarChart3 className="w-4 h-4 text-[#0066cc]" />
            </div>
            <h3 className="text-[15px] font-semibold text-[#1d1d1f] tracking-tight">
              Feature Contribution Analysis
            </h3>
          </div>
          {/* Mandatory Specific Label */}
          <span className="text-[12px] font-mono text-[#86868b] font-semibold block">
            SHAP-based feature contribution for the ML risk model.
          </span>
        </div>

        <div className="flex items-center gap-3 text-[12px] font-mono">
          <div className="flex items-center gap-1.5 text-[#0066cc] font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0066cc]" />
            <span>Positive (+Safety / -Risk)</span>
          </div>
          <div className="flex items-center gap-1.5 text-amber-700 font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />
            <span>Trade-Off Penalty (-Cost)</span>
          </div>
        </div>
      </div>

      {/* Mandatory Scope Clarification Note */}
      <div className="p-4 rounded-xl bg-[#fafafc] border border-[#e0e0e0] flex items-start gap-3 text-xs">
        <Info className="w-4 h-4 text-[#0066cc] flex-shrink-0 mt-0.5" />
        <p className="text-[#424245] leading-relaxed text-[12px] font-normal">
          <strong className="text-[#1d1d1f] font-mono font-semibold">Methodology:</strong> SHAP (SHapley Additive exPlanations) attributions quantify how individual environmental hazard inputs pull the calculated polar risk score relative to baseline conditions. Positive SHAP values indicate favorable environmental conditions along the chosen corridor.
        </p>
      </div>

      {/* Horizontal Diverging Bar Chart */}
      <div className="h-64 sm:h-72 w-full pt-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={chartData}
            margin={{ top: 10, right: 30, left: 30, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#f0f0f0"
              strokeOpacity={0.9}
              horizontal={false}
            />
            <XAxis
              type="number"
              domain={[-0.2, 0.4]}
              stroke="#86868b"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#e0e0e0' }}
              fontFamily="monospace"
              tickFormatter={(val) => `${val > 0 ? '+' : ''}${val.toFixed(2)}`}
            />
            <YAxis
              type="category"
              dataKey="name"
              stroke="#424245"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#e0e0e0' }}
              fontFamily="monospace"
              width={95}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const item = payload[0].payload;
                  return (
                    <div className="p-3.5 rounded-xl bg-white border border-[#e0e0e0] shadow-sm text-xs font-mono space-y-1.5 max-w-xs">
                      <div className="flex items-center justify-between gap-3 border-b border-[#f0f0f0] pb-1">
                        <span className="text-[#1d1d1f] font-semibold">{item.name}</span>
                        <span
                          className={`font-semibold ${
                            item.shapValue >= 0 ? 'text-[#0066cc]' : 'text-amber-700'
                          }`}
                        >
                          SHAP: {item.shapValue > 0 ? '+' : ''}
                          {item.shapValue.toFixed(2)}
                        </span>
                      </div>
                      <div className="text-[11px] text-[#424245]">
                        <span className="text-[#86868b]">Observed Value: </span>
                        <span className="text-[#1d1d1f] font-semibold">{item.rawFeatureValue}</span>
                      </div>
                      <p className="text-[11px] text-[#86868b] leading-tight font-normal">
                        {item.impactDescription}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <ReferenceLine x={0} stroke="#86868b" strokeWidth={1.5} />
            <Bar dataKey="shapValue" radius={[0, 4, 4, 0]}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.shapValue >= 0 ? '#0066cc' : '#d97706'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 7 Factors Breakdown Table / Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-1 font-mono text-xs">
        {SHAP_FEATURE_CONTRIBUTIONS.map((item: ShapFeatureContribution) => (
          <div
            key={item.feature}
            className="p-3 rounded-xl bg-[#fafafc] border border-[#e0e0e0] space-y-1"
          >
            <div className="flex items-center justify-between">
              <span className="text-[#1d1d1f] font-semibold text-[11px]">{item.feature}</span>
              <span
                className={`text-[11px] font-semibold flex items-center gap-1 ${
                  item.shapValue >= 0 ? 'text-[#0066cc]' : 'text-amber-700'
                }`}
              >
                {item.shapValue >= 0 ? (
                  <TrendingUp className="w-3.5 h-3.5 text-[#0066cc]" />
                ) : (
                  <TrendingDown className="w-3.5 h-3.5 text-amber-600" />
                )}
                {item.shapValue > 0 ? '+' : ''}
                {item.shapValue.toFixed(2)}
              </span>
            </div>
            <div className="text-[11px] text-[#86868b] truncate font-normal">
              {item.rawFeatureValue}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

