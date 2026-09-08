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
      <div className="p-3.5 rounded-xl bg-white border border-zinc-200 shadow-xl text-xs font-mono space-y-1.5">
        <div className="text-zinc-950 font-bold border-b border-zinc-100 pb-1.5 flex items-center justify-between gap-4">
          <span className="text-zinc-500 font-semibold">TRAJECTORY PROJECTION</span>
          <span className="text-black font-extrabold">{label}</span>
        </div>
        {payload.map((entry, index) => (
          <div key={`item-${index}`} className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-1.5 text-zinc-600">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              {entry.name}:
            </span>
            <span className="text-zinc-950 font-bold">
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
    <div className="bg-white border border-zinc-200/90 shadow-xs rounded-xl p-5 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-zinc-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-zinc-100 border border-zinc-200 text-zinc-900">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold font-sans text-zinc-950">
              {iceberg.code} Hydrodynamic Trajectory & Route Proximity
            </h3>
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider font-semibold">
              Lagrangian Drift Model & Multi-Factor Hydrodynamic Forcing
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-[11px] font-mono font-bold">
          <div className="flex items-center gap-1.5 text-zinc-950">
            <span className="w-3 h-1 bg-black rounded-full inline-block" />
            <span>Route Dist (km)</span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-900">
            <span className="w-2.5 h-2.5 bg-emerald-600 rounded-xs inline-block" />
            <span>Current Drag (m/s)</span>
          </div>
          <div className="flex items-center gap-1.5 text-amber-900">
            <span className="w-2.5 h-2.5 bg-amber-600 rounded-xs inline-block" />
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
              stroke="#E4E4E7"
              strokeOpacity={0.9}
              vertical={false}
            />

            <XAxis
              dataKey="hourLabel"
              stroke="#71717A"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#E4E4E7' }}
              fontFamily="monospace"
            />

            {/* Left Y Axis for Route Distance (km) */}
            <YAxis
              yAxisId="left"
              stroke="#18181B"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#E4E4E7' }}
              fontFamily="monospace"
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
              fontFamily="monospace"
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
              radius={[2, 2, 0, 0]}
            />

            {/* Wind Drag Bar */}
            <Bar
              yAxisId="right"
              dataKey="windDragMs"
              name="Wind Drag Forcing"
              fill="#D97706"
              opacity={0.85}
              barSize={16}
              radius={[2, 2, 0, 0]}
            />

            {/* Distance to Route Line */}
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="routeDistanceKm"
              name="Distance to Route Corridor"
              stroke="#09090B"
              strokeWidth={2.5}
              dot={{ r: 4, fill: '#09090B', strokeWidth: 0 }}
              activeDot={{ r: 6, fill: '#09090B', stroke: '#FFFFFF', strokeWidth: 2 }}
            />

            <Legend wrapperStyle={{ display: 'none' }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Caption */}
      <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] font-mono text-zinc-600 gap-2">
        <div className="flex items-center gap-1.5 text-zinc-800">
          <Navigation className="w-3.5 h-3.5 text-black" />
          <span>CLOSEST POINT OF APPROACH (CPA): <strong className="text-zinc-950 font-bold">{iceberg.routeDistanceKm} km</strong> at T+48h</span>
        </div>
        <div className="flex items-center gap-2 text-zinc-700 font-bold">
          <Waves className="w-3.5 h-3.5 text-black" />
          <span>OCEAN / WIND RATIO: {iceberg.oceanCurrentForcingPct} : {iceberg.windDragForcingPct}</span>
        </div>
      </div>
    </div>
  );
};
