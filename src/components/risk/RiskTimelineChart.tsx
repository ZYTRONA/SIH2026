import React from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ReferenceLine,
} from 'recharts';
import { RISK_TIMELINE_72H } from '@/data/riskIntelligenceData';
import { ShieldAlert, Activity, Snowflake, Mountain, Wind } from 'lucide-react';

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-3.5 rounded-lg bg-white border border-slate-200 shadow-xl text-xs font-mono space-y-1.5">
        <div className="text-slate-800 font-bold border-b border-slate-100 pb-1 flex items-center justify-between gap-4">
          <span className="text-slate-500 font-semibold">RISK FORECAST WINDOW</span>
          <span className="text-sky-700 font-bold">{label}</span>
        </div>
        {payload.map((entry, index) => (
          <div key={`item-${index}`} className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-1.5 text-slate-600">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              {entry.name}:
            </span>
            <span className="text-slate-900 font-bold">
              {entry.value} / 100
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export const RiskTimelineChart: React.FC = () => {
  return (
    <div className="bg-white border border-slate-200/90 shadow-xs rounded-xl p-5 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold font-sans text-slate-900">
              72-Hour Multi-Factor Risk Projection
            </h3>
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-semibold">
              IMO POLARIS Risk Index Outcome (RIO) Temporal Trajectory
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-[11px] font-mono flex-wrap">
          <div className="flex items-center gap-1.5 text-rose-700 font-medium">
            <span className="w-3 h-1 bg-rose-600 rounded-full inline-block" />
            <span>Composite Risk</span>
          </div>
          <div className="flex items-center gap-1.5 text-amber-700 font-medium">
            <Wind className="w-3 h-3 text-amber-600" />
            <span>Weather</span>
          </div>
          <div className="flex items-center gap-1.5 text-sky-700 font-medium">
            <Snowflake className="w-3 h-3 text-sky-600" />
            <span>Sea-Ice</span>
          </div>
          <div className="flex items-center gap-1.5 text-orange-700 font-medium">
            <Mountain className="w-3 h-3 text-orange-600" />
            <span>Icebergs</span>
          </div>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-64 sm:h-72 w-full pt-1">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={RISK_TIMELINE_72H}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#E2E8F0"
              strokeOpacity={0.8}
              vertical={false}
            />

            <XAxis
              dataKey="timeLabel"
              stroke="#64748B"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#CBD5E1' }}
              fontFamily="monospace"
            />

            <YAxis
              domain={[0, 100]}
              stroke="#64748B"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#CBD5E1' }}
              fontFamily="monospace"
            />

            <Tooltip content={<CustomTooltip />} />

            {/* Threshold Reference Lines */}
            <ReferenceLine y={60} stroke="#EA580C" strokeDasharray="4 4" label={{ value: 'HIGH THRESHOLD (60)', fill: '#EA580C', fontSize: 9, position: 'right' }} />
            <ReferenceLine y={40} stroke="#D97706" strokeDasharray="4 4" label={{ value: 'MODERATE (40)', fill: '#D97706', fontSize: 9, position: 'right' }} />

            {/* Subsystem Lines */}
            <Line
              type="monotone"
              dataKey="weatherRisk"
              name="Weather Risk"
              stroke="#D97706"
              strokeWidth={1.75}
              strokeDasharray="4 3"
              dot={false}
            />

            <Line
              type="monotone"
              dataKey="seaIceRisk"
              name="Sea-Ice Risk"
              stroke="#0284C7"
              strokeWidth={1.75}
              strokeDasharray="4 3"
              dot={false}
            />

            <Line
              type="monotone"
              dataKey="icebergRisk"
              name="Iceberg Risk"
              stroke="#EA580C"
              strokeWidth={1.75}
              strokeDasharray="4 3"
              dot={false}
            />

            {/* Composite Master Risk Line */}
            <Line
              type="monotone"
              dataKey="compositeRisk"
              name="Composite Mission Risk"
              stroke="#DC2626"
              strokeWidth={3}
              dot={{ r: 3.5, fill: '#DC2626', strokeWidth: 0 }}
              activeDot={{ r: 6, fill: '#DC2626', stroke: '#FFFFFF', strokeWidth: 2 }}
            />

            <Legend wrapperStyle={{ display: 'none' }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Caption */}
      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] font-mono text-slate-600 gap-2">
        <div className="flex items-center gap-1.5 text-slate-700">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
          <span>PEAK RISK CONVERGENCE: T+36h (Composite score 41 / 100)</span>
        </div>
        <div className="text-emerald-700 font-semibold">
          ALL PROJECTED WINDOWS WITHIN PC3 SAFE STRUCTURAL MARGIN
        </div>
      </div>
    </div>
  );
};
