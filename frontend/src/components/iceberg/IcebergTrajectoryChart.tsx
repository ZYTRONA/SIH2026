import React from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import { DetailedIceberg } from '@/data/icebergIntelligenceData';
import { Navigation, Waves, Compass } from 'lucide-react';

interface IcebergTrajectoryChartProps {
  iceberg: DetailedIceberg;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
    unit?: string;
  }>;
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-3.5 rounded-[14px] bg-white border border-[#e0e0e0] shadow-xl text-[12px] space-y-1.5">
        <div className="text-[#1d1d1f] font-semibold border-b border-[#f0f0f0] pb-1.5 flex items-center justify-between gap-4">
          <span className="text-neutral-500 font-normal">PROJECTION</span>
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
              {entry.value}
              {entry.name.includes('Distance') ? ' km' : ' m/s'}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export const IcebergTrajectoryChart: React.FC<IcebergTrajectoryChartProps> = ({
  iceberg,
}) => {
  const chartData = iceberg.trajectory.map((pt) => ({
    stage: pt.stage,
    hourLabel: `T+${pt.hourOffset}h`,
    routeDistanceKm: pt.routeDistanceKm,
    driftVelocityMs: pt.driftVelocityMs,
    windDragMs: pt.windDragMs,
    oceanCurrentVelocityMs: pt.oceanCurrentVelocityMs,
  }));

  return (
    <div className="bg-white border border-[#e0e0e0] rounded-[18px] p-5 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#f0f0f0]">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-full bg-[#f5f5f7] border border-[#e0e0e0] text-[#0066cc]">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-[15px] font-semibold text-[#1d1d1f] tracking-tight">
              {iceberg.code} Hydrodynamic Trajectory & Route Proximity
            </h3>
            <span className="text-[11px] text-neutral-500 font-normal">
              Lagrangian Drift Model & Multi-Factor Hydrodynamic Forcing
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-[11px]">
          <div className="flex items-center gap-1.5 text-[#1d1d1f] font-semibold">
            <span className="w-3 h-1 bg-[#0066cc] rounded-full inline-block" />
            <span>Route Dist (km)</span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-700 font-normal">
            <span className="w-2.5 h-2.5 bg-emerald-600 rounded-[3px] inline-block" />
            <span>Current Drag (m/s)</span>
          </div>
          <div className="flex items-center gap-1.5 text-amber-700 font-normal">
            <span className="w-2.5 h-2.5 bg-amber-600 rounded-[3px] inline-block" />
            <span>Wind Drag (m/s)</span>
          </div>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-64 sm:h-72 w-full pt-1">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e0e0e0"
              strokeOpacity={0.7}
              vertical={false}
            />

            <XAxis
              dataKey="hourLabel"
              stroke="#888888"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#e0e0e0' }}
            />

            {/* Left Y Axis for Route Distance (km) */}
            <YAxis
              yAxisId="left"
              stroke="#888888"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#e0e0e0' }}
              unit="km"
            />

            {/* Right Y Axis for Velocity (m/s) */}
            <YAxis
              yAxisId="right"
              orientation="right"
              domain={[0, 1.0]}
              stroke="#059669"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              unit="m/s"
            />

            <Tooltip content={<CustomTooltip />} />

            {/* Current Drag Bar */}
            <Bar
              yAxisId="right"
              dataKey="oceanCurrentVelocityMs"
              name="Ocean Current Forcing"
              fill="#059669"
              opacity={0.85}
              barSize={16}
              radius={[3, 3, 0, 0]}
            />

            {/* Wind Drag Bar */}
            <Bar
              yAxisId="right"
              dataKey="windDragMs"
              name="Wind Drag Forcing"
              fill="#D97706"
              opacity={0.85}
              barSize={16}
              radius={[3, 3, 0, 0]}
            />

            {/* Distance to Route Line */}
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="routeDistanceKm"
              name="Distance to Route Corridor"
              stroke="#0066cc"
              strokeWidth={2.5}
              dot={{ r: 4, fill: '#0066cc', strokeWidth: 0 }}
              activeDot={{ r: 6, fill: '#0066cc', stroke: '#FFFFFF', strokeWidth: 2 }}
            />

            <Legend wrapperStyle={{ display: 'none' }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Caption */}
      <div className="p-3.5 rounded-[14px] bg-[#fafafc] border border-[#e0e0e0] flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-neutral-600 gap-2">
        <div className="flex items-center gap-1.5 text-[#1d1d1f]">
          <Navigation className="w-3.5 h-3.5 text-[#0066cc]" />
          <span>CLOSEST POINT OF APPROACH (CPA): <strong className="text-[#1d1d1f] font-semibold">{iceberg.routeDistanceKm} km</strong> at T+48h</span>
        </div>
        <div className="flex items-center gap-2 text-neutral-600">
          <Waves className="w-3.5 h-3.5 text-[#0066cc]" />
          <span>OCEAN / WIND RATIO: {iceberg.oceanCurrentForcingPct} : {iceberg.windDragForcingPct}</span>
        </div>
      </div>
    </div>
  );
};
