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
      <div className="p-3.5 rounded-[14px] bg-white border border-[#e0e0e0] shadow-lg text-[12px] font-mono space-y-2 select-none">
        <div className="text-[#1d1d1f] font-semibold border-b border-[#f0f0f0] pb-1.5 flex items-center justify-between gap-4">
          <span>FORECAST HORIZON</span>
          <span className="text-[#0066cc] font-semibold">+{label}</span>
        </div>
        {payload.map((entry, index) => (
          <div key={`item-${index}`} className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-2 text-neutral-600 font-normal">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              {entry.name}:
            </span>
            <span className="text-[#1d1d1f] font-semibold tabular-nums">
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
    <div className="apple-card p-0 overflow-hidden select-none">
      {/* Header */}
      <div className="px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#f0f0f0] bg-[#fafafc]">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-[8px] bg-white border border-[#e0e0e0] text-[#0066cc]">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-[15px] sm:text-[16px] font-semibold text-[#1d1d1f] tracking-tight">
              72-Hour Environmental Dynamics & Risk Forecast
            </h3>
            <span className="text-[12px] text-neutral-500 font-normal">
              Copernicus Marine & ECMWF Spatiotemporal Ensemble
            </span>
          </div>
        </div>

        {/* Apple Segmented Pill Filter */}
        <div className="apple-segmented-container self-start sm:self-auto">
          <button
            onClick={() => setActiveSeriesTab('all')}
            className={`apple-segmented-item flex items-center gap-1.5 ${
              activeSeriesTab === 'all' ? 'apple-segmented-item-active' : ''
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>All</span>
          </button>
          <button
            onClick={() => setActiveSeriesTab('ice')}
            className={`apple-segmented-item flex items-center gap-1.5 ${
              activeSeriesTab === 'ice' ? 'apple-segmented-item-active' : ''
            }`}
          >
            <Snowflake className="w-3.5 h-3.5 text-[#0066cc]" />
            <span>Sea-Ice</span>
          </button>
          <button
            onClick={() => setActiveSeriesTab('wind')}
            className={`apple-segmented-item flex items-center gap-1.5 ${
              activeSeriesTab === 'wind' ? 'apple-segmented-item-active' : ''
            }`}
          >
            <Wind className="w-3.5 h-3.5 text-amber-600" />
            <span>Wind</span>
          </button>
          <button
            onClick={() => setActiveSeriesTab('risk')}
            className={`apple-segmented-item flex items-center gap-1.5 ${
              activeSeriesTab === 'risk' ? 'apple-segmented-item-active' : ''
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
            <span>Risk</span>
          </button>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="p-5">
        <div className="h-[280px] sm:h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={ENVIRONMENTAL_FORECAST_72H}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="appleIceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0066cc" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#0066cc" stopOpacity={0.0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />

              <XAxis
                dataKey="hour"
                tickLine={false}
                axisLine={{ stroke: '#e0e0e0' }}
                tick={{ fontSize: 11, fill: '#7a7a7a', fontFamily: 'monospace', fontWeight: 400 }}
              />

              <YAxis
                tickLine={false}
                axisLine={{ stroke: '#e0e0e0' }}
                tick={{ fontSize: 11, fill: '#7a7a7a', fontFamily: 'monospace', fontWeight: 400 }}
                domain={[0, 100]}
              />

              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ fontSize: '12px', fontFamily: 'monospace', fontWeight: 600, paddingTop: '12px' }}
              />

              {(activeSeriesTab === 'all' || activeSeriesTab === 'ice') && (
                <Area
                  type="monotone"
                  dataKey="seaIceConcentration"
                  name="Sea-Ice Concentration (%)"
                  stroke="#0066cc"
                  strokeWidth={2}
                  fill="url(#appleIceGradient)"
                />
              )}

              {(activeSeriesTab === 'all' || activeSeriesTab === 'wind') && (
                <Line
                  type="monotone"
                  dataKey="windSpeed"
                  name="Wind Speed (kts)"
                  stroke="#d97706"
                  strokeWidth={2}
                  dot={{ r: 3, fill: '#d97706' }}
                />
              )}

              {(activeSeriesTab === 'all' || activeSeriesTab === 'risk') && (
                <Bar
                  dataKey="riskScore"
                  name="Risk Index RIO (/100)"
                  fill="#e11d48"
                  opacity={0.8}
                  radius={[4, 4, 0, 0]}
                />
              )}
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

