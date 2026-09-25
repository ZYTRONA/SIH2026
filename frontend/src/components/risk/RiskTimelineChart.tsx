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
      <div className="p-3.5 rounded-[14px] bg-white border border-[#e0e0e0] shadow-xl text-[12px] space-y-1.5">
        <div className="text-[#1d1d1f] font-semibold border-b border-[#f0f0f0] pb-1 flex items-center justify-between gap-4">
          <span className="text-neutral-500 font-normal">WINDOW</span>
          <span className="text-[#1d1d1f] font-semibold">{label}</span>
        </div>
        {payload.map((entry, index) => (
          <div key={`item-${index}`} className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-1.5 text-neutral-600 font-normal">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              {entry.name}:
            </span>
            <span className="text-[#1d1d1f] font-semibold">
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
    <div className="bg-white border border-[#e0e0e0] rounded-[18px] p-5 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#f0f0f0]">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-full bg-[#f5f5f7] border border-[#e0e0e0] text-[#0066cc]">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-[15px] font-semibold text-[#1d1d1f] tracking-tight">
              72-Hour Multi-Factor Risk Projection
            </h3>
            <span className="text-[11px] text-neutral-500 font-normal">
              IMO POLARIS Risk Index Outcome (RIO) Temporal Trajectory
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-[11px] flex-wrap">
          <div className="flex items-center gap-1.5 text-[#0066cc] font-semibold">
            <span className="w-3 h-1 bg-[#0066cc] rounded-full inline-block" />
            <span>Composite Risk</span>
          </div>
          <div className="flex items-center gap-1.5 text-amber-700 font-normal">
            <Wind className="w-3 h-3 text-amber-600" />
            <span>Weather</span>
          </div>
          <div className="flex items-center gap-1.5 text-neutral-600 font-normal">
            <Snowflake className="w-3 h-3 text-[#0066cc]" />
            <span>Sea-Ice</span>
          </div>
          <div className="flex items-center gap-1.5 text-amber-700 font-normal">
            <Mountain className="w-3 h-3 text-amber-600" />
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
              stroke="#e0e0e0"
              strokeOpacity={0.7}
              vertical={false}
            />

            <XAxis
              dataKey="timeLabel"
              stroke="#888888"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#e0e0e0' }}
            />

            <YAxis
              domain={[0, 100]}
              stroke="#888888"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#e0e0e0' }}
            />

            <Tooltip content={<CustomTooltip />} />

            {/* Threshold Reference Lines */}
            <ReferenceLine y={60} stroke="#e11d48" strokeDasharray="4 4" label={{ value: 'HIGH (60)', fill: '#e11d48', fontSize: 10, position: 'right' }} />
            <ReferenceLine y={40} stroke="#d97706" strokeDasharray="4 4" label={{ value: 'MODERATE (40)', fill: '#d97706', fontSize: 10, position: 'right' }} />

            {/* Subsystem Lines */}
            <Line
              type="monotone"
              dataKey="weatherRisk"
              name="Weather Risk"
              stroke="#d97706"
              strokeWidth={1.75}
              strokeDasharray="4 3"
              dot={false}
            />

            <Line
              type="monotone"
              dataKey="seaIceRisk"
              name="Sea-Ice Risk"
              stroke="#71717a"
              strokeWidth={1.75}
              strokeDasharray="4 3"
              dot={false}
            />

            <Line
              type="monotone"
              dataKey="icebergRisk"
              name="Iceberg Risk"
              stroke="#ea580c"
              strokeWidth={1.75}
              strokeDasharray="4 3"
              dot={false}
            />

            {/* Composite Master Risk Line */}
            <Line
              type="monotone"
              dataKey="compositeRisk"
              name="Composite Mission Risk"
              stroke="#0066cc"
              strokeWidth={2.5}
              dot={{ r: 3.5, fill: '#0066cc', strokeWidth: 0 }}
              activeDot={{ r: 6, fill: '#0066cc', stroke: '#FFFFFF', strokeWidth: 2 }}
            />

            <Legend wrapperStyle={{ display: 'none' }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Caption */}
      <div className="p-3.5 rounded-[14px] bg-[#fafafc] border border-[#e0e0e0] flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-neutral-600 gap-2">
        <div className="flex items-center gap-1.5 text-[#1d1d1f]">
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

