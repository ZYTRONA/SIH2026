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
    <div className="polar-panel p-5 space-y-4">
      {/* Header with Mandatory Prompt-Required Label */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-polar-700/60">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <BarChart3 className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold font-sans text-slate-100">
              Feature Contribution Analysis
            </h3>
          </div>
          {/* Mandatory Specific Label */}
          <span className="text-[11px] font-mono text-cyan-300 font-semibold block">
            SHAP-based feature contribution for the ML risk model.
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-2.5 h-2.5 rounded bg-emerald-500" />
            <span>Positive Attribution (+Safety / -Risk)</span>
          </div>
          <div className="flex items-center gap-1.5 text-orange-400">
            <span className="w-2.5 h-2.5 rounded bg-orange-500" />
            <span>Trade-Off Penalty (-Distance Cost)</span>
          </div>
        </div>
      </div>

      {/* Mandatory Scope Clarification Note */}
      <div className="p-3 rounded-lg bg-polar-900/90 border border-polar-700/50 flex items-start gap-2.5 text-xs font-sans">
        <Info className="w-4 h-4 text-ice-400 flex-shrink-0 mt-0.5" />
        <p className="text-slate-300 leading-relaxed text-[11px]">
          <strong className="text-ice-300 font-mono">Methodology:</strong> SHAP (SHapley Additive exPlanations) attributions quantify how individual environmental hazard inputs pull the calculated polar risk score relative to baseline conditions. Positive SHAP values indicate favorable environmental conditions along the chosen corridor.
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
              stroke="#1E3558"
              strokeOpacity={0.5}
              horizontal={false}
            />
            <XAxis
              type="number"
              domain={[-0.2, 0.4]}
              stroke="#64748B"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#1E3558' }}
              fontFamily="monospace"
              tickFormatter={(val) => `${val > 0 ? '+' : ''}${val.toFixed(2)}`}
            />
            <YAxis
              type="category"
              dataKey="name"
              stroke="#94A3B8"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#1E3558' }}
              fontFamily="monospace"
              width={95}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const item = payload[0].payload;
                  return (
                    <div className="p-3 rounded-lg bg-polar-900/95 border border-polar-700/80 shadow-2xl backdrop-blur-md text-xs font-mono space-y-1.5 max-w-xs">
                      <div className="flex items-center justify-between gap-3 border-b border-polar-700/50 pb-1">
                        <span className="text-slate-100 font-bold">{item.name}</span>
                        <span
                          className={`font-bold ${
                            item.shapValue >= 0 ? 'text-emerald-400' : 'text-orange-400'
                          }`}
                        >
                          SHAP: {item.shapValue > 0 ? '+' : ''}
                          {item.shapValue.toFixed(2)}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-300">
                        <span className="text-slate-400">Observed Value: </span>
                        <span className="text-ice-300 font-bold">{item.rawFeatureValue}</span>
                      </div>
                      <p className="text-[10px] text-slate-400 font-sans leading-tight">
                        {item.impactDescription}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <ReferenceLine x={0} stroke="#475569" strokeWidth={1.5} />
            <Bar dataKey="shapValue" radius={[0, 4, 4, 0]}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.shapValue >= 0 ? '#06B6D4' : '#F97316'}
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
            className="p-2.5 rounded-lg bg-polar-900/70 border border-polar-700/40 space-y-1"
          >
            <div className="flex items-center justify-between">
              <span className="text-slate-200 font-bold text-[11px]">{item.feature}</span>
              <span
                className={`text-[11px] font-bold flex items-center gap-1 ${
                  item.shapValue >= 0 ? 'text-cyan-400' : 'text-orange-400'
                }`}
              >
                {item.shapValue >= 0 ? (
                  <TrendingUp className="w-3 h-3 text-cyan-400" />
                ) : (
                  <TrendingDown className="w-3 h-3 text-orange-400" />
                )}
                {item.shapValue > 0 ? '+' : ''}
                {item.shapValue.toFixed(2)}
              </span>
            </div>
            <div className="text-[10px] text-slate-400 truncate">
              {item.rawFeatureValue}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
