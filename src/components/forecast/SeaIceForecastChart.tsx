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
      <div className="p-3.5 rounded-xl bg-white border border-zinc-200 shadow-xl text-xs font-mono space-y-2">
        <div className="text-zinc-950 font-bold border-b border-zinc-100 pb-1.5 flex items-center justify-between gap-4">
          <span className="text-zinc-500 font-semibold">FORECAST TIMELINE</span>
          <span className="text-black font-extrabold">{label}</span>
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between gap-4">
            <span className="text-zinc-700 font-medium">Predicted Concentration:</span>
            <span className="text-zinc-950 font-extrabold">{predicted}%</span>
          </div>

          {data && (
            <>
              <div className="flex items-center justify-between gap-4 text-zinc-500 text-[11px]">
                <span>Uncertainty Range (95% CI):</span>
                <span className="text-zinc-800 font-semibold">
                  {data.sicLower}% – {data.sicUpper}%
                </span>
              </div>
              <div className="flex items-center justify-between gap-4 text-zinc-500 text-[11px]">
                <span>Estimated Ice Thickness:</span>
                <span className="text-zinc-800 font-medium">{data.thicknessM} m</span>
              </div>
              <div className="flex items-center justify-between gap-4 text-zinc-500 text-[11px]">
                <span>Drift Vector Velocity:</span>
                <span className="text-zinc-800 font-medium">{data.driftVelocityKts} kts</span>
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
    <div className="bg-white border border-zinc-200/90 shadow-xs rounded-xl p-5 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-zinc-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-zinc-100 border border-zinc-200 text-zinc-900">
            <Snowflake className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold font-sans text-zinc-950">
              Sea-Ice Concentration Forecast
            </h3>
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider font-semibold">
              ResUNet Spatiotemporal Projection with Uncertainty Bounds
            </span>
          </div>
        </div>

        {/* Legend Indicators */}
        <div className="flex items-center gap-3 text-[11px] font-mono font-bold">
          <div className="flex items-center gap-1.5 text-zinc-950">
            <span className="w-3 h-1 bg-black rounded-full inline-block" />
            <span>Predicted SIC %</span>
          </div>
          <div className="flex items-center gap-1.5 text-zinc-600 font-medium">
            <span className="w-3 h-2 bg-zinc-200 border border-zinc-300 rounded-xs inline-block" />
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
                <stop offset="5%" stopColor="#18181B" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#18181B" stopOpacity={0.03} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#E4E4E7"
              strokeOpacity={0.9}
              vertical={false}
            />

            <XAxis
              dataKey="timeLabel"
              stroke="#71717A"
              fontSize={10}
              tickLine={false}
              axisLine={{ stroke: '#E4E4E7' }}
              fontFamily="monospace"
            />

            <YAxis
              domain={[50, 100]}
              stroke="#71717A"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#E4E4E7' }}
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
              fill="#FFFFFF"
            />

            {/* Central Predicted Line */}
            <Line
              type="monotone"
              dataKey="sicPredicted"
              name="Predicted SIC"
              stroke="#09090B"
              strokeWidth={2.5}
              dot={{ r: 3, fill: '#09090B', strokeWidth: 0 }}
              activeDot={{ r: 5, fill: '#09090B', stroke: '#FFFFFF', strokeWidth: 2 }}
            />

            <Legend wrapperStyle={{ display: 'none' }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Insight Note */}
      <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] font-mono text-zinc-600 gap-2">
        <div className="flex items-center gap-1.5 text-zinc-800">
          <Info className="w-3.5 h-3.5 text-black" />
          <span>UNCERTAINTY SPREAD: Widens after T+48h due to Katabatic pressure gradient shifts</span>
        </div>
        <div className="flex items-center gap-1.5 text-amber-900 font-bold">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>CRITICAL THRESHOLD (80%) REACHED AT T+5 DAYS</span>
        </div>
      </div>
    </div>
  );
};
