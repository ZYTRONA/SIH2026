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
      <div className="p-3.5 rounded-lg bg-polar-900/95 border border-polar-700/80 shadow-2xl backdrop-blur-md text-xs font-mono space-y-1.5">
        <div className="text-slate-200 font-bold border-b border-polar-700/50 pb-1 flex items-center justify-between gap-4">
          <span>RISK FORECAST WINDOW</span>
          <span className="text-ice-400">{label}</span>
        </div>
        {payload.map((entry, index) => (
          <div key={`item-${index}`} className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-1.5 text-slate-400">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              {entry.name}:
            </span>
            <span className="text-slate-100 font-bold">
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
    <div className="polar-panel p-5 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-polar-700/60">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded bg-rose-500/10 border border-rose-500/30 text-rose-400">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold font-sans text-slate-100">
              72-Hour Multi-Factor Risk Projection
            </h3>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
              IMO POLARIS Risk Index Outcome (RIO) Temporal Trajectory
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-[11px] font-mono flex-wrap">
          <div className="flex items-center gap-1.5 text-rose-300">
            <span className="w-3 h-1 bg-rose-500 rounded-full inline-block" />
            <span>Composite Risk</span>
          </div>
          <div className="flex items-center gap-1.5 text-amber-300">
            <Wind className="w-3 h-3 text-amber-400" />
            <span>Weather</span>
          </div>
          <div className="flex items-center gap-1.5 text-cyan-300">
            <Snowflake className="w-3 h-3 text-cyan-400" />
            <span>Sea-Ice</span>
          </div>
          <div className="flex items-center gap-1.5 text-orange-300">
            <Mountain className="w-3 h-3 text-orange-400" />
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
              stroke="#1E3558"
              strokeOpacity={0.5}
              vertical={false}
            />

            <XAxis
              dataKey="timeLabel"
              stroke="#64748B"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#1E3558' }}
              fontFamily="monospace"
            />

            <YAxis
              domain={[0, 100]}
              stroke="#64748B"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#1E3558' }}
              fontFamily="monospace"
            />

            <Tooltip content={<CustomTooltip />} />

            {/* Threshold Reference Lines */}
            <ReferenceLine y={60} stroke="#F97316" strokeDasharray="4 4" label={{ value: 'HIGH THRESHOLD (60)', fill: '#F97316', fontSize: 9, position: 'right' }} />
            <ReferenceLine y={40} stroke="#F59E0B" strokeDasharray="4 4" label={{ value: 'MODERATE (40)', fill: '#F59E0B', fontSize: 9, position: 'right' }} />

            {/* Subsystem Lines */}
            <Line
              type="monotone"
              dataKey="weatherRisk"
              name="Weather Risk"
              stroke="#F59E0B"
              strokeWidth={1.75}
              strokeDasharray="4 3"
              dot={false}
            />

            <Line
              type="monotone"
              dataKey="seaIceRisk"
              name="Sea-Ice Risk"
              stroke="#06B6D4"
              strokeWidth={1.75}
              strokeDasharray="4 3"
              dot={false}
            />

            <Line
              type="monotone"
              dataKey="icebergRisk"
              name="Iceberg Risk"
              stroke="#FB923C"
              strokeWidth={1.75}
              strokeDasharray="4 3"
              dot={false}
            />

            {/* Composite Master Risk Line */}
            <Line
              type="monotone"
              dataKey="compositeRisk"
              name="Composite Mission Risk"
              stroke="#EF4444"
              strokeWidth={3.5}
              dot={{ r: 4, fill: '#EF4444', strokeWidth: 0 }}
              activeDot={{ r: 7, fill: '#EF4444', stroke: '#0A1120', strokeWidth: 2 }}
            />

            <Legend wrapperStyle={{ display: 'none' }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Caption */}
      <div className="p-2.5 rounded bg-polar-900/60 border border-polar-700/40 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] font-mono text-slate-400 gap-2">
        <div className="flex items-center gap-1.5 text-slate-300">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
          <span>PEAK RISK CONVERGENCE: T+36h (Composite score 41 / 100)</span>
        </div>
        <div className="text-emerald-400 font-semibold">
          ALL PROJECTED WINDOWS WITHIN PC3 SAFE STRUCTURAL MARGIN
        </div>
      </div>
    </div>
  );
};
