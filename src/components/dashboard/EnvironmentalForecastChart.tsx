import React from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import { ENVIRONMENTAL_FORECAST_72H } from '@/data/dashboardData';
import { Activity, Snowflake, Wind, ShieldAlert } from 'lucide-react';

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
      <div className="p-3 rounded-lg bg-polar-900/95 border border-polar-700/80 shadow-2xl backdrop-blur-md text-xs font-mono space-y-1.5">
        <div className="text-slate-300 font-bold border-b border-polar-700/50 pb-1 flex items-center justify-between gap-4">
          <span>FORECAST TIMELINE</span>
          <span className="text-ice-400">+{label}</span>
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
              {entry.value}
              {entry.name.includes('Sea-Ice')
                ? '%'
                : entry.name.includes('Wind')
                ? ' kts'
                : ' / 100'}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export const EnvironmentalForecastChart: React.FC = () => {
  return (
    <div className="polar-panel p-5 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-polar-700/60">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded bg-ice-500/10 border border-ice-500/30 text-ice-400">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold font-sans text-slate-100">
              72-Hour Environmental Dynamics & Risk Forecast
            </h3>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
              Copernicus Marine & ECMWF Spatiotemporal Ensemble Model
            </span>
          </div>
        </div>

        {/* Legend pills */}
        <div className="flex items-center gap-3 text-[11px] font-mono">
          <span className="flex items-center gap-1.5 text-sky-300">
            <Snowflake className="w-3 h-3 text-sky-400" />
            Sea-Ice %
          </span>
          <span className="flex items-center gap-1.5 text-amber-300">
            <Wind className="w-3 h-3 text-amber-400" />
            Wind (kts)
          </span>
          <span className="flex items-center gap-1.5 text-rose-300">
            <ShieldAlert className="w-3 h-3 text-rose-400" />
            Risk Index
          </span>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-64 sm:h-72 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={ENVIRONMENTAL_FORECAST_72H}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="iceAreaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#1E3558"
              strokeOpacity={0.5}
              vertical={false}
            />

            <XAxis
              dataKey="hour"
              stroke="#64748B"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#1E3558' }}
              fontFamily="monospace"
            />

            {/* Left Y Axis for Percentages & Scores (0-100) */}
            <YAxis
              yAxisId="left"
              domain={[0, 100]}
              stroke="#64748B"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#1E3558' }}
              fontFamily="monospace"
            />

            {/* Right Y Axis for Wind Speed (knots) */}
            <YAxis
              yAxisId="right"
              orientation="right"
              domain={[0, 50]}
              stroke="#F59E0B"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              fontFamily="monospace"
            />

            <Tooltip content={<CustomTooltip />} />

            {/* Sea-Ice Concentration Area */}
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="seaIceConcentration"
              name="Sea-Ice Concentration"
              stroke="#38BDF8"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#iceAreaGradient)"
            />

            {/* Wind Speed Bars */}
            <Bar
              yAxisId="right"
              dataKey="windSpeed"
              name="Wind Speed"
              fill="#F59E0B"
              opacity={0.65}
              barSize={12}
              radius={[2, 2, 0, 0]}
            />

            {/* Risk Score Line */}
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="riskScore"
              name="Navigation Risk"
              stroke="#EF4444"
              strokeWidth={2.5}
              dot={{ r: 3, fill: '#EF4444', strokeWidth: 0 }}
              activeDot={{ r: 5, fill: '#EF4444' }}
            />

            <Legend
              wrapperStyle={{ display: 'none' }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Forecast Caption */}
      <div className="p-2.5 rounded bg-polar-900/60 border border-polar-700/40 flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono text-slate-400 gap-2">
        <span className="text-slate-300">
          PROJECTION WINDOW: T+00h to T+72h (Updated 14 min ago via ECMWF-HRES)
        </span>
        <span className="text-amber-400 font-medium">
          CRITICAL WINDOW: T+24h to T+36h (Peak pack convergence)
        </span>
      </div>
    </div>
  );
};
