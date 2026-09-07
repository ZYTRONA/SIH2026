import React, { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar as RechartsRadar,
} from 'recharts';
import {
  ROUTE_CANDIDATES,
  ROUTE_RADAR_DATA,
  RouteKey,
} from '@/data/routeOptimizationData';
import {
  BarChart3,
  Radar as RadarIcon,
  TableProperties,
  Shield,
  Fuel,
  Clock,
  Gauge,
  Award,
} from 'lucide-react';

interface RouteComparisonViewProps {
  selectedRouteKey: RouteKey;
  onSelectRoute: (key: RouteKey) => void;
}

export const RouteComparisonView: React.FC<RouteComparisonViewProps> = ({
  selectedRouteKey,
  onSelectRoute,
}) => {
  const [activeTab, setActiveTab] = useState<'metrics' | 'radar' | 'table'>('metrics');

  // Chart data for normalized comparison bars (0 - 100 higher is better score)
  const normalizedBarData = [
    {
      metric: 'Safety Index',
      SAFE: 88,
      FASTEST: 59,
      FUEL_EFFICIENT: 74,
      BALANCED: 76,
    },
    {
      metric: 'Fuel Efficiency',
      SAFE: 70,
      FASTEST: 76,
      FUEL_EFFICIENT: 96,
      BALANCED: 88,
    },
    {
      metric: 'Speed / Velocity',
      SAFE: 62,
      FASTEST: 98,
      FUEL_EFFICIENT: 75,
      BALANCED: 78,
    },
    {
      metric: 'Distance Optimization',
      SAFE: 68,
      FASTEST: 95,
      FUEL_EFFICIENT: 82,
      BALANCED: 84,
    },
  ];

  return (
    <div className="bg-white border border-slate-200/90 shadow-xs rounded-xl p-5 space-y-4">
      {/* Header with Visualization Mode Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-sky-50 border border-sky-200 text-sky-700">
            <BarChart3 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold font-sans text-slate-900">
              Multi-Objective Route Trade-Off Analysis
            </h3>
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-semibold">
              Safety • Fuel • ETA • Distance Comparative Dimensions
            </span>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-mono">
          <button
            onClick={() => setActiveTab('metrics')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all select-none ${
              activeTab === 'metrics'
                ? 'bg-white text-slate-900 font-bold shadow-xs border border-slate-300'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5 text-sky-600" />
            <span>Metrics Chart</span>
          </button>

          <button
            onClick={() => setActiveTab('radar')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all select-none ${
              activeTab === 'radar'
                ? 'bg-white text-slate-900 font-bold shadow-xs border border-slate-300'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <RadarIcon className="w-3.5 h-3.5 text-sky-600" />
            <span>Pareto Radar</span>
          </button>

          <button
            onClick={() => setActiveTab('table')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all select-none ${
              activeTab === 'table'
                ? 'bg-white text-slate-900 font-bold shadow-xs border border-slate-300'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <TableProperties className="w-3.5 h-3.5 text-sky-600" />
            <span>Comparison Matrix</span>
          </button>
        </div>
      </div>

      {/* 1. Bar Chart View */}
      {activeTab === 'metrics' && (
        <div className="space-y-3">
          <div className="h-64 sm:h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={normalizedBarData}
                margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
                barCategoryGap="20%"
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#E2E8F0"
                  strokeOpacity={0.8}
                  vertical={false}
                />
                <XAxis
                  dataKey="metric"
                  stroke="#64748B"
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: '#CBD5E1' }}
                  fontFamily="monospace"
                />
                <YAxis
                  domain={[0, 100]}
                  stroke="#64748B"
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: '#CBD5E1' }}
                  fontFamily="monospace"
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="p-3 rounded-lg bg-white border border-slate-200 shadow-xl text-xs font-mono space-y-1.5">
                          <span className="text-sky-700 font-bold block border-b border-slate-100 pb-1">
                            {label} (Efficiency Score / 100)
                          </span>
                          {payload.map((entry, idx) => (
                            <div
                              key={`tooltip-${idx}`}
                              className="flex items-center justify-between gap-4"
                            >
                              <span className="flex items-center gap-1.5 text-slate-600">
                                <span
                                  className="w-2 h-2 rounded-full"
                                  style={{ backgroundColor: entry.color }}
                                />
                                {entry.name}:
                              </span>
                              <span className="text-slate-900 font-bold">
                                {entry.value} pts
                              </span>
                            </div>
                          ))}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend
                  wrapperStyle={{
                    paddingTop: '8px',
                    fontSize: '11px',
                    fontFamily: 'monospace',
                  }}
                />
                <Bar dataKey="SAFE" name="Safe Route" fill="#059669" radius={[3, 3, 0, 0]} />
                <Bar dataKey="FASTEST" name="Fastest Route" fill="#D97706" radius={[3, 3, 0, 0]} />
                <Bar dataKey="FUEL_EFFICIENT" name="Fuel Efficient" fill="#0284C7" radius={[3, 3, 0, 0]} />
                <Bar dataKey="BALANCED" name="Balanced (AI)" fill="#2563EB" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono pt-1">
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-500 block">SAFETY LEADER</span>
              <span className="text-emerald-700 font-bold">Safe Route (12 / 100 Risk)</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-500 block">SPEED LEADER</span>
              <span className="text-amber-700 font-bold">Fastest Route (38h 40m)</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-500 block">FUEL LEADER</span>
              <span className="text-sky-700 font-bold">Fuel Efficient (79.4 m³)</span>
            </div>
            <div className="p-2.5 rounded-lg bg-sky-50 border border-sky-200">
              <span className="text-[10px] text-sky-700 block font-bold">OPTIMAL TRADE-OFF</span>
              <span className="text-sky-800 font-bold">Balanced Route (AI Pick)</span>
            </div>
          </div>
        </div>
      )}

      {/* 2. Radar Chart View */}
      {activeTab === 'radar' && (
        <div className="space-y-2">
          <div className="h-64 sm:h-72 w-full pt-1">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={ROUTE_RADAR_DATA} margin={{ top: 5, right: 25, bottom: 5, left: 25 }}>
                <PolarGrid stroke="#E2E8F0" strokeOpacity={0.8} />
                <PolarAngleAxis
                  dataKey="metric"
                  stroke="#475569"
                  fontSize={10}
                  fontFamily="monospace"
                />
                <PolarRadiusAxis
                  angle={30}
                  domain={[0, 100]}
                  stroke="#94A3B8"
                  fontSize={9}
                  fontFamily="monospace"
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="p-3 rounded-lg bg-white border border-slate-200 shadow-xl text-xs font-mono space-y-1">
                          <span className="text-sky-700 font-bold block border-b border-slate-100 pb-1">
                            {label}
                          </span>
                          {payload.map((entry, idx) => (
                            <div key={`radar-tt-${idx}`} className="flex items-center justify-between gap-3">
                              <span className="flex items-center gap-1.5 text-slate-600">
                                <span
                                  className="w-2 h-2 rounded-full"
                                  style={{ backgroundColor: entry.color }}
                                />
                                {entry.name}:
                              </span>
                              <span className="text-slate-900 font-bold">{entry.value}</span>
                            </div>
                          ))}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend
                  wrapperStyle={{
                    fontSize: '11px',
                    fontFamily: 'monospace',
                  }}
                />
                <RechartsRadar
                  name="Safe Route"
                  dataKey="SAFE"
                  stroke="#059669"
                  fill="#059669"
                  fillOpacity={0.15}
                />
                <RechartsRadar
                  name="Fastest Route"
                  dataKey="FASTEST"
                  stroke="#D97706"
                  fill="#D97706"
                  fillOpacity={0.15}
                />
                <RechartsRadar
                  name="Fuel Efficient"
                  dataKey="FUEL_EFFICIENT"
                  stroke="#0284C7"
                  fill="#0284C7"
                  fillOpacity={0.15}
                />
                <RechartsRadar
                  name="Balanced (AI)"
                  dataKey="BALANCED"
                  stroke="#2563EB"
                  fill="#2563EB"
                  fillOpacity={0.25}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[11px] font-mono text-slate-500 text-center">
            Polar radar polygons show normalized metric coverage. The Balanced route maximizes enclosed Pareto area.
          </p>
        </div>
      )}

      {/* 3. Detailed Comparison Matrix Table View */}
      {activeTab === 'table' && (
        <div className="overflow-x-auto">
          <table className="w-full text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-600 bg-slate-50">
                <th className="p-2.5 text-left font-semibold">Evaluation Dimension</th>
                {ROUTE_CANDIDATES.map((r) => (
                  <th
                    key={r.key}
                    onClick={() => onSelectRoute(r.key)}
                    className={`p-2.5 text-right font-semibold cursor-pointer transition-colors ${
                      r.key === selectedRouteKey
                        ? 'text-sky-700 bg-sky-50 font-bold'
                        : 'hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center justify-end gap-1">
                      <span>{r.name.split(' ')[0]}</span>
                      {r.isRecommended && <Award className="w-3 h-3 text-sky-600 inline" />}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {/* Distance Row */}
              <tr className="hover:bg-slate-50">
                <td className="p-2.5 text-slate-800 flex items-center gap-1.5 font-medium">
                  <Gauge className="w-3.5 h-3.5 text-slate-400" />
                  <span>Voyage Distance</span>
                </td>
                <td className="p-2.5 text-right text-slate-600">1,342 km (+68 km)</td>
                <td className="p-2.5 text-right text-amber-700 font-bold">1,214 km (MIN)</td>
                <td className="p-2.5 text-right text-slate-600">1,280 km (+6 km)</td>
                <td className="p-2.5 text-right text-sky-700 font-bold bg-sky-50/40">
                  1,274 km (Baseline)
                </td>
              </tr>

              {/* ETA Row */}
              <tr className="hover:bg-slate-50">
                <td className="p-2.5 text-slate-800 flex items-center gap-1.5 font-medium">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Estimated Transit Time</span>
                </td>
                <td className="p-2.5 text-right text-slate-600">45h 12m (+3h 20m)</td>
                <td className="p-2.5 text-right text-amber-700 font-bold">38h 40m (FASTEST)</td>
                <td className="p-2.5 text-right text-slate-600">42h 10m (+18m)</td>
                <td className="p-2.5 text-right text-sky-700 font-bold bg-sky-50/40">
                  41h 52m (Balanced)
                </td>
              </tr>

              {/* Fuel Row */}
              <tr className="hover:bg-slate-50">
                <td className="p-2.5 text-slate-800 flex items-center gap-1.5 font-medium">
                  <Fuel className="w-3.5 h-3.5 text-sky-600" />
                  <span>Fuel Consumption</span>
                </td>
                <td className="p-2.5 text-right text-slate-600">88.2 m³ (+5.6 m³)</td>
                <td className="p-2.5 text-right text-slate-600">84.7 m³ (+2.1 m³)</td>
                <td className="p-2.5 text-right text-emerald-700 font-bold">79.4 m³ (LOWEST)</td>
                <td className="p-2.5 text-right text-sky-700 font-bold bg-sky-50/40">
                  82.6 m³ (Optimal)
                </td>
              </tr>

              {/* Risk Row */}
              <tr className="hover:bg-slate-50">
                <td className="p-2.5 text-slate-800 flex items-center gap-1.5 font-medium">
                  <Shield className="w-3.5 h-3.5 text-rose-600" />
                  <span>POLARIS Risk Index</span>
                </td>
                <td className="p-2.5 text-right text-emerald-700 font-bold">12 / 100 (SAFEST)</td>
                <td className="p-2.5 text-right text-rose-600 font-bold">41 / 100 (HIGH)</td>
                <td className="p-2.5 text-right text-sky-700 font-medium">26 / 100 (LOW)</td>
                <td className="p-2.5 text-right text-sky-700 font-bold bg-sky-50/40">
                  24 / 100 (LOW)
                </td>
              </tr>

              {/* Icebreaker Requirement */}
              <tr className="hover:bg-slate-50">
                <td className="p-2.5 text-slate-800 font-medium">Icebreaker Escort</td>
                <td className="p-2.5 text-right text-emerald-700">None</td>
                <td className="p-2.5 text-right text-amber-700 font-bold">Recommended</td>
                <td className="p-2.5 text-right text-emerald-700">None</td>
                <td className="p-2.5 text-right text-emerald-700 font-bold bg-sky-50/40">
                  None
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
