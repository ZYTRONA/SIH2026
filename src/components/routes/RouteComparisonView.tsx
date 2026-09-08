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
    <div className="bg-white border border-zinc-200/90 shadow-xs rounded-xl p-5 space-y-4">
      {/* Header with Visualization Mode Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-black text-white">
            <BarChart3 className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-bold font-sans text-zinc-950">
              Multi-Objective Route Trade-Off Analysis
            </h3>
            <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider font-semibold">
              Safety • Fuel • ETA • Distance Comparative Dimensions
            </span>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1 bg-zinc-100 p-1 rounded-xl border border-zinc-200 text-xs font-mono">
          <button
            onClick={() => setActiveTab('metrics')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all select-none cursor-pointer ${
              activeTab === 'metrics'
                ? 'bg-black text-white font-bold shadow-xs'
                : 'text-zinc-700 hover:text-zinc-950 hover:bg-zinc-200/80 font-medium'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Metrics Chart</span>
          </button>

          <button
            onClick={() => setActiveTab('radar')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all select-none cursor-pointer ${
              activeTab === 'radar'
                ? 'bg-black text-white font-bold shadow-xs'
                : 'text-zinc-700 hover:text-zinc-950 hover:bg-zinc-200/80 font-medium'
            }`}
          >
            <RadarIcon className="w-3.5 h-3.5" />
            <span>Pareto Radar</span>
          </button>

          <button
            onClick={() => setActiveTab('table')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all select-none cursor-pointer ${
              activeTab === 'table'
                ? 'bg-black text-white font-bold shadow-xs'
                : 'text-zinc-700 hover:text-zinc-950 hover:bg-zinc-200/80 font-medium'
            }`}
          >
            <TableProperties className="w-3.5 h-3.5" />
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
                  stroke="#E4E4E7"
                  strokeOpacity={0.9}
                  vertical={false}
                />
                <XAxis
                  dataKey="metric"
                  stroke="#71717A"
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: '#E4E4E7' }}
                  fontFamily="monospace"
                />
                <YAxis
                  domain={[0, 100]}
                  stroke="#71717A"
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: '#E4E4E7' }}
                  fontFamily="monospace"
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="p-3.5 rounded-xl bg-white border border-zinc-300 shadow-xl text-xs font-mono space-y-1.5">
                          <span className="text-zinc-950 font-bold block border-b border-zinc-100 pb-1">
                            {label} (Efficiency Score / 100)
                          </span>
                          {payload.map((entry, idx) => (
                            <div
                              key={`tooltip-${idx}`}
                              className="flex items-center justify-between gap-4"
                            >
                              <span className="flex items-center gap-1.5 text-zinc-600">
                                <span
                                  className="w-2 h-2 rounded-full"
                                  style={{ backgroundColor: entry.color }}
                                />
                                {entry.name}:
                              </span>
                              <span className="text-zinc-950 font-bold">
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
                <Bar dataKey="SAFE" name="Safe Route" fill="#059669" radius={[4, 4, 0, 0]} />
                <Bar dataKey="FASTEST" name="Fastest Route" fill="#D97706" radius={[4, 4, 0, 0]} />
                <Bar dataKey="FUEL_EFFICIENT" name="Fuel Efficient" fill="#52525B" radius={[4, 4, 0, 0]} />
                <Bar dataKey="BALANCED" name="Balanced (AI)" fill="#09090B" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono pt-1">
            <div className="p-2.5 rounded-xl bg-zinc-50 border border-zinc-200">
              <span className="text-[10px] text-zinc-500 block">SAFETY LEADER</span>
              <span className="text-emerald-800 font-bold">Safe Route (12 / 100 Risk)</span>
            </div>
            <div className="p-2.5 rounded-xl bg-zinc-50 border border-zinc-200">
              <span className="text-[10px] text-zinc-500 block">SPEED LEADER</span>
              <span className="text-amber-800 font-bold">Fastest Route (38h 40m)</span>
            </div>
            <div className="p-2.5 rounded-xl bg-zinc-50 border border-zinc-200">
              <span className="text-[10px] text-zinc-500 block">FUEL LEADER</span>
              <span className="text-zinc-900 font-bold">Fuel Efficient (79.4 m³)</span>
            </div>
            <div className="p-2.5 rounded-xl bg-zinc-100 border border-zinc-300">
              <span className="text-[10px] text-zinc-600 block font-bold">OPTIMAL TRADE-OFF</span>
              <span className="text-zinc-950 font-black">Balanced Route (AI Pick)</span>
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
                <PolarGrid stroke="#E4E4E7" strokeOpacity={0.9} />
                <PolarAngleAxis
                  dataKey="metric"
                  stroke="#52525B"
                  fontSize={10}
                  fontFamily="monospace"
                />
                <PolarRadiusAxis
                  angle={30}
                  domain={[0, 100]}
                  stroke="#A1A1AA"
                  fontSize={9}
                  fontFamily="monospace"
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="p-3.5 rounded-xl bg-white border border-zinc-300 shadow-xl text-xs font-mono space-y-1">
                          <span className="text-zinc-950 font-bold block border-b border-zinc-100 pb-1">
                            {label}
                          </span>
                          {payload.map((entry, idx) => (
                            <div key={`radar-tt-${idx}`} className="flex items-center justify-between gap-3">
                              <span className="flex items-center gap-1.5 text-zinc-600">
                                <span
                                  className="w-2 h-2 rounded-full"
                                  style={{ backgroundColor: entry.color }}
                                />
                                {entry.name}:
                              </span>
                              <span className="text-zinc-950 font-bold">{entry.value}</span>
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
                  stroke="#52525B"
                  fill="#52525B"
                  fillOpacity={0.15}
                />
                <RechartsRadar
                  name="Balanced (AI)"
                  dataKey="BALANCED"
                  stroke="#09090B"
                  fill="#09090B"
                  fillOpacity={0.25}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[11px] font-mono text-zinc-500 text-center">
            Polar radar polygons show normalized metric coverage. The Balanced route maximizes enclosed Pareto area.
          </p>
        </div>
      )}

      {/* 3. Detailed Comparison Matrix Table View */}
      {activeTab === 'table' && (
        <div className="overflow-x-auto">
          <table className="w-full text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-zinc-200 text-zinc-700 bg-zinc-50">
                <th className="p-2.5 text-left font-bold">Evaluation Dimension</th>
                {ROUTE_CANDIDATES.map((r) => (
                  <th
                    key={r.key}
                    onClick={() => onSelectRoute(r.key)}
                    className={`p-2.5 text-right font-bold cursor-pointer transition-colors ${
                      r.key === selectedRouteKey
                        ? 'text-zinc-950 bg-zinc-100 font-black border-b-2 border-black'
                        : 'hover:text-zinc-950'
                    }`}
                  >
                    <div className="flex items-center justify-end gap-1">
                      <span>{r.name.split(' ')[0]}</span>
                      {r.isRecommended && <Award className="w-3 h-3 text-black inline" />}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 text-zinc-700">
              {/* Distance Row */}
              <tr className="hover:bg-zinc-50">
                <td className="p-2.5 text-zinc-900 flex items-center gap-1.5 font-semibold">
                  <Gauge className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Voyage Distance</span>
                </td>
                <td className="p-2.5 text-right text-zinc-600">1,342 km (+68 km)</td>
                <td className="p-2.5 text-right text-amber-800 font-bold">1,214 km (MIN)</td>
                <td className="p-2.5 text-right text-zinc-600">1,280 km (+6 km)</td>
                <td className="p-2.5 text-right text-zinc-950 font-bold bg-zinc-50">
                  1,274 km (Baseline)
                </td>
              </tr>

              {/* ETA Row */}
              <tr className="hover:bg-zinc-50">
                <td className="p-2.5 text-zinc-900 flex items-center gap-1.5 font-semibold">
                  <Clock className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Estimated Transit Time</span>
                </td>
                <td className="p-2.5 text-right text-zinc-600">45h 12m (+3h 20m)</td>
                <td className="p-2.5 text-right text-amber-800 font-bold">38h 40m (FASTEST)</td>
                <td className="p-2.5 text-right text-zinc-600">42h 10m (+18m)</td>
                <td className="p-2.5 text-right text-zinc-950 font-bold bg-zinc-50">
                  41h 52m (Balanced)
                </td>
              </tr>

              {/* Fuel Row */}
              <tr className="hover:bg-zinc-50">
                <td className="p-2.5 text-zinc-900 flex items-center gap-1.5 font-semibold">
                  <Fuel className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Fuel Consumption</span>
                </td>
                <td className="p-2.5 text-right text-zinc-600">88.2 m³ (+5.6 m³)</td>
                <td className="p-2.5 text-right text-zinc-600">84.7 m³ (+2.1 m³)</td>
                <td className="p-2.5 text-right text-emerald-800 font-bold">79.4 m³ (LOWEST)</td>
                <td className="p-2.5 text-right text-zinc-950 font-bold bg-zinc-50">
                  82.6 m³ (Optimal)
                </td>
              </tr>

              {/* Risk Row */}
              <tr className="hover:bg-zinc-50">
                <td className="p-2.5 text-zinc-900 flex items-center gap-1.5 font-semibold">
                  <Shield className="w-3.5 h-3.5 text-zinc-500" />
                  <span>POLARIS Risk Index</span>
                </td>
                <td className="p-2.5 text-right text-emerald-800 font-bold">12 / 100 (SAFEST)</td>
                <td className="p-2.5 text-right text-rose-800 font-bold">41 / 100 (HIGH)</td>
                <td className="p-2.5 text-right text-zinc-900 font-medium">26 / 100 (LOW)</td>
                <td className="p-2.5 text-right text-zinc-950 font-bold bg-zinc-50">
                  24 / 100 (LOW)
                </td>
              </tr>

              {/* Icebreaker Requirement */}
              <tr className="hover:bg-zinc-50">
                <td className="p-2.5 text-zinc-900 font-semibold">Icebreaker Escort</td>
                <td className="p-2.5 text-right text-emerald-800 font-medium">None</td>
                <td className="p-2.5 text-right text-amber-800 font-bold">Recommended</td>
                <td className="p-2.5 text-right text-emerald-800 font-medium">None</td>
                <td className="p-2.5 text-right text-emerald-800 font-bold bg-zinc-50">
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

