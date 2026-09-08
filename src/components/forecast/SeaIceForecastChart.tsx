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
      <div className="p-3.5 rounded-[14px] bg-white border border-[#e0e0e0] shadow-xl text-[12px] space-y-2">
        <div className="text-[#1d1d1f] font-semibold border-b border-[#f0f0f0] pb-1.5 flex items-center justify-between gap-4">
          <span className="text-neutral-500 font-normal">TIMELINE</span>
          <span className="text-[#1d1d1f] font-semibold">{label}</span>
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between gap-4">
            <span className="text-neutral-600 font-normal">Predicted SIC:</span>
            <span className="text-[#0066cc] font-semibold">{predicted}%</span>
          </div>

          {data && (
            <>
              <div className="flex items-center justify-between gap-4 text-neutral-500 text-[11px]">
                <span>Uncertainty (95% CI):</span>
                <span className="text-[#1d1d1f] font-normal">
                  {data.sicLower}% – {data.sicUpper}%
                </span>
              </div>
              <div className="flex items-center justify-between gap-4 text-neutral-500 text-[11px]">
                <span>Ice Thickness:</span>
                <span className="text-[#1d1d1f] font-normal">{data.thicknessM} m</span>
              </div>
              <div className="flex items-center justify-between gap-4 text-neutral-500 text-[11px]">
                <span>Drift Velocity:</span>
                <span className="text-[#1d1d1f] font-normal">{data.driftVelocityKts} kts</span>
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
    <div className="bg-white border border-[#e0e0e0] rounded-[18px] p-5 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#f0f0f0]">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-full bg-[#f5f5f7] border border-[#e0e0e0] text-[#0066cc]">
            <Snowflake className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-[15px] font-semibold text-[#1d1d1f] tracking-[-0.2px]">
              Sea-Ice Concentration Forecast
            </h3>
            <span className="text-[11px] text-neutral-500 font-normal">
              ResUNet Spatiotemporal Projection with Uncertainty Bounds
            </span>
          </div>
        </div>

        {/* Legend Indicators */}
        <div className="flex items-center gap-3 text-[11px]">
          <div className="flex items-center gap-1.5 text-[#1d1d1f] font-semibold">
            <span className="w-3 h-1 bg-[#0066cc] rounded-full inline-block" />
            <span>Predicted SIC %</span>
          </div>
          <div className="flex items-center gap-1.5 text-neutral-500 font-normal">
            <span className="w-3 h-2 bg-[#e0f0ff] border border-[#d0e6ff] rounded-[3px] inline-block" />
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
                <stop offset="5%" stopColor="#0066cc" stopOpacity={0.18} />
                <stop offset="95%" stopColor="#0066cc" stopOpacity={0.03} />
              </linearGradient>
            </defs>

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
              domain={[50, 100]}
              stroke="#888888"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#e0e0e0' }}
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
              stroke="#0066cc"
              strokeWidth={2.5}
              dot={{ r: 3, fill: '#0066cc', strokeWidth: 0 }}
              activeDot={{ r: 5, fill: '#0066cc', stroke: '#FFFFFF', strokeWidth: 2 }}
            />

            <Legend wrapperStyle={{ display: 'none' }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Insight Note */}
      <div className="p-3.5 rounded-[14px] bg-[#fafafc] border border-[#e0e0e0] flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-neutral-600 gap-2">
        <div className="flex items-center gap-1.5 text-[#1d1d1f]">
          <Info className="w-3.5 h-3.5 text-[#0066cc]" />
          <span>UNCERTAINTY SPREAD: Widens after T+48h due to Katabatic pressure gradient shifts</span>
        </div>
        <div className="flex items-center gap-1.5 text-amber-700 font-semibold">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>CRITICAL THRESHOLD (80%) REACHED AT T+5 DAYS</span>
        </div>
      </div>
    </div>
  );
};
