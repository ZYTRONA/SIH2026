import React from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import { SEA_ICE_CHART_DATA } from '@/data/seaIceData';
import { Snowflake, Info, ShieldAlert } from 'lucide-react';

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
    payload?: {
      sicLower: number;
      sicUpper: number;
      thicknessM: number;
      driftVelocityKts: number;
    };
  }>;
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const predicted = payload.find((p) => p.name === 'Predicted SIC')?.value;

    return (
      <div className="p-3.5 rounded-lg bg-polar-900/95 border border-polar-700/80 shadow-2xl backdrop-blur-md text-xs font-mono space-y-2">
        <div className="text-slate-200 font-bold border-b border-polar-700/50 pb-1 flex items-center justify-between gap-4">
          <span>FORECAST TIMELINE</span>
          <span className="text-ice-400">{label}</span>
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between gap-4">
            <span className="text-cyan-400 font-medium">Predicted Concentration:</span>
            <span className="text-slate-100 font-bold">{predicted}%</span>
          </div>

          {data && (
            <>
              <div className="flex items-center justify-between gap-4 text-slate-400 text-[11px]">
                <span>Uncertainty Range (95% CI):</span>
                <span className="text-slate-300 font-semibold">
                  {data.sicLower}% – {data.sicUpper}%
                </span>
              </div>
              <div className="flex items-center justify-between gap-4 text-slate-400 text-[11px]">
                <span>Estimated Ice Thickness:</span>
                <span className="text-slate-300">{data.thicknessM} m</span>
              </div>
              <div className="flex items-center justify-between gap-4 text-slate-400 text-[11px]">
                <span>Drift Vector Velocity:</span>
                <span className="text-slate-300">{data.driftVelocityKts} kts</span>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
  return null;
};

export const SeaIceForecastChart: React.FC = () => {
  return (
    <div className="polar-panel p-5 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-polar-700/60">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Snowflake className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold font-sans text-slate-100">
              Sea-Ice Concentration Forecast
            </h3>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
              ResUNet Spatiotemporal Projection with Uncertainty Bounds
            </span>
          </div>
        </div>

        {/* Legend Indicators */}
        <div className="flex items-center gap-3 text-[11px] font-mono">
          <div className="flex items-center gap-1.5 text-cyan-300">
            <span className="w-3 h-0.5 bg-cyan-400 rounded-full inline-block" />
            <span>Predicted SIC %</span>
          </div>
          <div className="flex items-center gap-1.5 text-sky-300">
            <span className="w-3 h-2 bg-sky-500/30 border border-sky-400/50 rounded-sm inline-block" />
            <span>95% Uncertainty Range</span>
          </div>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-64 sm:h-72 w-full pt-1">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={SEA_ICE_CHART_DATA}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="uncertaintyGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#38BDF8" stopOpacity={0.05} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#1E3558"
              strokeOpacity={0.5}
              vertical={false}
            />

            <XAxis
              dataKey="timeLabel"
              stroke="#64748B"
              fontSize={10}
              tickLine={false}
              axisLine={{ stroke: '#1E3558' }}
              fontFamily="monospace"
            />

            <YAxis
              domain={[50, 100]}
              stroke="#64748B"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#1E3558' }}
              fontFamily="monospace"
              unit="%"
            />

            <Tooltip content={<CustomTooltip />} />

            {/* Upper bound area fill for uncertainty */}
            <Area
              type="monotone"
              dataKey="sicUpper"
              name="Upper Bound (95% CI)"
              stroke="transparent"
              fill="url(#uncertaintyGradient)"
            />

            {/* Lower bound area subtraction */}
            <Area
              type="monotone"
              dataKey="sicLower"
              name="Lower Bound (5% CI)"
              stroke="transparent"
              fill="#060B13"
            />

            {/* Central Predicted Line */}
            <Line
              type="monotone"
              dataKey="sicPredicted"
              name="Predicted SIC"
              stroke="#38BDF8"
              strokeWidth={3}
              dot={{ r: 3, fill: '#38BDF8', strokeWidth: 0 }}
              activeDot={{ r: 6, fill: '#38BDF8', stroke: '#060B13', strokeWidth: 2 }}
            />

            <Legend wrapperStyle={{ display: 'none' }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Insight Note */}
      <div className="p-2.5 rounded bg-polar-900/60 border border-polar-700/40 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] font-mono text-slate-400 gap-2">
        <div className="flex items-center gap-1.5 text-slate-300">
          <Info className="w-3.5 h-3.5 text-ice-400" />
          <span>UNCERTAINTY SPREAD: Widens after T+48h due to Katabatic pressure gradient shifts</span>
        </div>
        <div className="flex items-center gap-1.5 text-amber-400 font-medium">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>CRITICAL THRESHOLD (80%) REACHED AT T+5 DAYS</span>
        </div>
      </div>
    </div>
  );
};
