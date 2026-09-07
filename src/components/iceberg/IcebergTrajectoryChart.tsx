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
      <div className="p-3.5 rounded-lg bg-polar-900/95 border border-polar-700/80 shadow-2xl backdrop-blur-md text-xs font-mono space-y-1.5">
        <div className="text-slate-200 font-bold border-b border-polar-700/50 pb-1 flex items-center justify-between gap-4">
          <span>TRAJECTORY PROJECTION</span>
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
    <div className="polar-panel p-5 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-polar-700/60">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded bg-ice-500/10 border border-ice-500/30 text-ice-400">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold font-sans text-slate-100">
              {iceberg.code} Hydrodynamic Trajectory & Route Proximity
            </h3>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
              Lagrangian Drift Model & Multi-Factor Hydrodynamic Forcing
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-[11px] font-mono">
          <div className="flex items-center gap-1.5 text-ice-300">
            <span className="w-3 h-0.5 bg-ice-400 rounded-full inline-block" />
            <span>Route Dist (km)</span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-300">
            <span className="w-2.5 h-2.5 bg-emerald-500/70 rounded-sm inline-block" />
            <span>Current Drag (m/s)</span>
          </div>
          <div className="flex items-center gap-1.5 text-cyan-300">
            <span className="w-2.5 h-2.5 bg-cyan-500/70 rounded-sm inline-block" />
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
              stroke="#1E3558"
              strokeOpacity={0.5}
              vertical={false}
            />

            <XAxis
              dataKey="hourLabel"
              stroke="#64748B"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#1E3558' }}
              fontFamily="monospace"
            />

            {/* Left Y Axis for Route Distance (km) */}
            <YAxis
              yAxisId="left"
              stroke="#38BDF8"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#1E3558' }}
              fontFamily="monospace"
              unit="km"
            />

            {/* Right Y Axis for Velocity (m/s) */}
            <YAxis
              yAxisId="right"
              orientation="right"
              domain={[0, 1.0]}
              stroke="#10B981"
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
              fill="#10B981"
              opacity={0.6}
              barSize={16}
              radius={[2, 2, 0, 0]}
            />

            {/* Wind Drag Bar */}
            <Bar
              yAxisId="right"
              dataKey="windDragMs"
              name="Wind Drag Forcing"
              fill="#06B6D4"
              opacity={0.6}
              barSize={16}
              radius={[2, 2, 0, 0]}
            />

            {/* Distance to Route Line */}
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="routeDistanceKm"
              name="Distance to Route Corridor"
              stroke="#38BDF8"
              strokeWidth={3}
              dot={{ r: 4, fill: '#38BDF8', strokeWidth: 0 }}
              activeDot={{ r: 6, fill: '#38BDF8', stroke: '#0A1120', strokeWidth: 2 }}
            />

            <Legend wrapperStyle={{ display: 'none' }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Caption */}
      <div className="p-2.5 rounded bg-polar-900/60 border border-polar-700/40 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] font-mono text-slate-400 gap-2">
        <div className="flex items-center gap-1.5 text-slate-300">
          <Navigation className="w-3.5 h-3.5 text-ice-400" />
          <span>CLOSEST POINT OF APPROACH (CPA): {iceberg.routeDistanceKm} km at T+48h</span>
        </div>
        <div className="flex items-center gap-2 text-cyan-300">
          <Waves className="w-3.5 h-3.5" />
          <span>OCEAN / WIND RATIO: {iceberg.oceanCurrentForcingPct} : {iceberg.windDragForcingPct}</span>
        </div>
      </div>
    </div>
  );
};
