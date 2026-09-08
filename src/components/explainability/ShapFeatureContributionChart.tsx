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
    <div className="bg-white border border-zinc-200/90 shadow-xs rounded-xl p-5 space-y-4">
      {/* Header with Mandatory Prompt-Required Label */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-100">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-black text-white">
              <BarChart3 className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-sm font-bold font-sans text-zinc-950">
              Feature Contribution Analysis
            </h3>
          </div>
          {/* Mandatory Specific Label */}
          <span className="text-[11px] font-mono text-zinc-600 font-bold block">
            SHAP-based feature contribution for the ML risk model.
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="flex items-center gap-1.5 text-zinc-900 font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-black" />
            <span>Positive (+Safety / -Risk)</span>
          </div>
          <div className="flex items-center gap-1.5 text-amber-900 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />
            <span>Trade-Off Penalty (-Cost)</span>
          </div>
        </div>
      </div>

      {/* Mandatory Scope Clarification Note */}
      <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 flex items-start gap-2.5 text-xs font-sans">
        <Info className="w-4 h-4 text-zinc-600 flex-shrink-0 mt-0.5" />
        <p className="text-zinc-700 leading-relaxed text-[11px] font-medium">
          <strong className="text-zinc-950 font-mono">Methodology:</strong> SHAP (SHapley Additive exPlanations) attributions quantify how individual environmental hazard inputs pull the calculated polar risk score relative to baseline conditions. Positive SHAP values indicate favorable environmental conditions along the chosen corridor.
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
              stroke="#E4E4E7"
              strokeOpacity={0.9}
              horizontal={false}
            />
            <XAxis
              type="number"
              domain={[-0.2, 0.4]}
              stroke="#71717A"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#E4E4E7' }}
              fontFamily="monospace"
              tickFormatter={(val) => `${val > 0 ? '+' : ''}${val.toFixed(2)}`}
            />
            <YAxis
              type="category"
              dataKey="name"
              stroke="#52525B"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#E4E4E7' }}
              fontFamily="monospace"
              width={95}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const item = payload[0].payload;
                  return (
                    <div className="p-3.5 rounded-xl bg-white border border-zinc-300 shadow-xl text-xs font-mono space-y-1.5 max-w-xs">
                      <div className="flex items-center justify-between gap-3 border-b border-zinc-100 pb-1">
                        <span className="text-zinc-950 font-bold">{item.name}</span>
                        <span
                          className={`font-bold ${
                            item.shapValue >= 0 ? 'text-zinc-950' : 'text-amber-800'
                          }`}
                        >
                          SHAP: {item.shapValue > 0 ? '+' : ''}
                          {item.shapValue.toFixed(2)}
                        </span>
                      </div>
                      <div className="text-[11px] text-zinc-700">
                        <span className="text-zinc-500">Observed Value: </span>
                        <span className="text-zinc-950 font-bold">{item.rawFeatureValue}</span>
                      </div>
                      <p className="text-[10px] text-zinc-600 font-sans leading-tight font-normal">
                        {item.impactDescription}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <ReferenceLine x={0} stroke="#18181B" strokeWidth={1.5} />
            <Bar dataKey="shapValue" radius={[0, 4, 4, 0]}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.shapValue >= 0 ? '#09090B' : '#D97706'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 7 Factors Breakdown Table / Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 pt-1 font-mono text-xs">
        {SHAP_FEATURE_CONTRIBUTIONS.map((item: ShapFeatureContribution) => (
          <div
            key={item.feature}
            className="p-2.5 rounded-xl bg-zinc-50 border border-zinc-200 space-y-1"
          >
            <div className="flex items-center justify-between">
              <span className="text-zinc-950 font-bold text-[11px]">{item.feature}</span>
              <span
                className={`text-[11px] font-bold flex items-center gap-1 ${
                  item.shapValue >= 0 ? 'text-zinc-950' : 'text-amber-800'
                }`}
              >
                {item.shapValue >= 0 ? (
                  <TrendingUp className="w-3 h-3 text-black" />
                ) : (
                  <TrendingDown className="w-3 h-3 text-amber-700" />
                )}
                {item.shapValue > 0 ? '+' : ''}
                {item.shapValue.toFixed(2)}
              </span>
            </div>
            <div className="text-[10px] text-zinc-500 truncate">
              {item.rawFeatureValue}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

