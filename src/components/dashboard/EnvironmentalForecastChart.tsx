import React, { useState } from 'react';
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
import { Activity, Snowflake, Wind, ShieldAlert, Layers } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
      <div className="p-3.5 rounded-xl bg-white border border-zinc-200 shadow-xl text-xs font-mono space-y-1.5">
        <div className="text-zinc-950 font-bold border-b border-zinc-100 pb-1.5 flex items-center justify-between gap-4">
          <span>FORECAST TIMELINE</span>
          <span className="text-black font-extrabold">+{label}</span>
        </div>
        {payload.map((entry, index) => (
          <div key={`item-${index}`} className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-1.5 text-zinc-600 font-medium">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              {entry.name}:
            </span>
            <span className="text-zinc-950 font-bold tabular-nums">
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
  const [activeSeriesTab, setActiveSeriesTab] = useState<'all' | 'ice' | 'wind' | 'risk'>('all');

  return (
    <div className="bg-white border border-zinc-200/90 rounded-2xl p-5 space-y-4 shadow-xs">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-zinc-100">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-zinc-100 border border-zinc-200 text-zinc-900">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold font-sans text-zinc-950 tracking-tight">
              72-Hour Environmental Dynamics & Risk Forecast
            </h3>
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider font-semibold">
              Copernicus Marine & ECMWF Spatiotemporal Ensemble Model
            </span>
          </div>
        </div>

        {/* Radix UI Tabs for Series Focus */}
        <Tabs
          value={activeSeriesTab}
          onValueChange={(val) => setActiveSeriesTab(val as 'all' | 'ice' | 'wind' | 'risk')}
          className="w-auto"
        >
          <TabsList className="h-8 p-0.5 bg-zinc-100 border border-zinc-200 rounded-lg">
            <TabsTrigger value="all" className="h-7 px-2.5 text-[11px] font-mono font-bold data-[state=active]:bg-black data-[state=active]:text-white">
              <Layers className="w-3 h-3 mr-1" />
              All Series
            </TabsTrigger>
            <TabsTrigger value="ice" className="h-7 px-2.5 text-[11px] font-mono font-bold data-[state=active]:bg-black data-[state=active]:text-white">
              <Snowflake className="w-3 h-3 mr-1" />
              Sea-Ice
            </TabsTrigger>
            <TabsTrigger value="wind" className="h-7 px-2.5 text-[11px] font-mono font-bold data-[state=active]:bg-black data-[state=active]:text-white">
              <Wind className="w-3 h-3 mr-1 text-amber-500" />
              Wind
            </TabsTrigger>
            <TabsTrigger value="risk" className="h-7 px-2.5 text-[11px] font-mono font-bold data-[state=active]:bg-black data-[state=active]:text-white">
              <ShieldAlert className="w-3 h-3 mr-1 text-rose-500" />
              Risk
            </TabsTrigger>
          </TabsList>
        </Tabs>
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
                <stop offset="5%" stopColor="#18181B" stopOpacity={0.18} />
                <stop offset="95%" stopColor="#18181B" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#E4E4E7"
              strokeOpacity={0.9}
              vertical={false}
            />

            <XAxis
              dataKey="hour"
              stroke="#71717A"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#E4E4E7' }}
              fontFamily="monospace"
            />

            {/* Left Y Axis for Percentages & Scores (0-100) */}
            <YAxis
              yAxisId="left"
              domain={[0, 100]}
              stroke="#71717A"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#E4E4E7' }}
              fontFamily="monospace"
            />

            {/* Right Y Axis for Wind Speed (knots) */}
            <YAxis
              yAxisId="right"
              orientation="right"
              domain={[0, 50]}
              stroke="#D97706"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              fontFamily="monospace"
            />

            <Tooltip content={<CustomTooltip />} />

            {/* Sea-Ice Concentration Area */}
            {(activeSeriesTab === 'all' || activeSeriesTab === 'ice') && (
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="seaIceConcentration"
                name="Sea-Ice Concentration"
                stroke="#09090B"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#iceAreaGradient)"
              />
            )}

            {/* Wind Speed Bars */}
            {(activeSeriesTab === 'all' || activeSeriesTab === 'wind') && (
              <Bar
                yAxisId="right"
                dataKey="windSpeed"
                name="Wind Speed"
                fill="#F59E0B"
                opacity={0.85}
                barSize={14}
                radius={[3, 3, 0, 0]}
              />
            )}

            {/* Risk Score Line */}
            {(activeSeriesTab === 'all' || activeSeriesTab === 'risk') && (
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="riskScore"
                name="Navigation Risk"
                stroke="#E11D48"
                strokeWidth={2.5}
                dot={{ r: 3.5, fill: '#E11D48', strokeWidth: 0 }}
                activeDot={{ r: 5, fill: '#E11D48' }}
              />
            )}

            <Legend wrapperStyle={{ display: 'none' }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Forecast Caption */}
      <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono text-zinc-600 gap-2">
        <span className="text-zinc-800 font-medium">
          PROJECTION WINDOW: T+00h to T+72h (Updated 14 min ago via ECMWF-HRES)
        </span>
        <span className="text-amber-900 font-bold">
          CRITICAL WINDOW: T+24h to T+36h (Peak pack convergence)
        </span>
      </div>
    </div>
  );
};

