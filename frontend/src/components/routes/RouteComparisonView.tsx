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
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
    <div className="bg-white border border-[#e0e0e0] rounded-[18px] p-6 space-y-5">
      {/* Header with Radix UI Visualization Mode Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#f0f0f0]">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-[#0066cc]/10 text-[#0066cc]">
            <BarChart3 className="w-4 h-4 text-[#0066cc]" />
          </div>
          <div>
            <h3 className="text-[15px] font-semibold text-[#1d1d1f] tracking-tight">
              Multi-Objective Route Trade-Off Analysis
            </h3>
            <span className="text-[11px] font-mono text-[#86868b] uppercase tracking-wider font-semibold">
              Safety • Fuel • ETA • Distance Comparative Dimensions
            </span>
          </div>
        </div>

        {/* Tab Controls using Radix UI Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={(val) => setActiveTab(val as 'metrics' | 'radar' | 'table')}
        >
          <TabsList className="h-9 p-1 bg-[#f5f5f7] border border-[#e0e0e0] rounded-full">
            <TabsTrigger value="metrics" className="h-7 px-3 text-[12px] font-mono font-semibold rounded-full data-[state=active]:bg-white data-[state=active]:text-[#0066cc] data-[state=active]:shadow-xs">
              <BarChart3 className="w-3.5 h-3.5 mr-1" />
              Metrics Chart
            </TabsTrigger>
            <TabsTrigger value="radar" className="h-7 px-3 text-[12px] font-mono font-semibold rounded-full data-[state=active]:bg-white data-[state=active]:text-[#0066cc] data-[state=active]:shadow-xs">
              <RadarIcon className="w-3.5 h-3.5 mr-1" />
              Pareto Radar
            </TabsTrigger>
            <TabsTrigger value="table" className="h-7 px-3 text-[12px] font-mono font-semibold rounded-full data-[state=active]:bg-white data-[state=active]:text-[#0066cc] data-[state=active]:shadow-xs">
              <TableProperties className="w-3.5 h-3.5 mr-1" />
              Comparison Matrix
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* 1. Bar Chart View */}
      {activeTab === 'metrics' && (
        <div className="space-y-4">
          <div className="h-64 sm:h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={normalizedBarData}
                margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
                barCategoryGap="20%"
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#f0f0f0"
                  strokeOpacity={0.9}
                  vertical={false}
                />
                <XAxis
                  dataKey="metric"
                  stroke="#86868b"
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: '#e0e0e0' }}
                  fontFamily="monospace"
                />
                <YAxis
                  domain={[0, 100]}
                  stroke="#86868b"
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: '#e0e0e0' }}
                  fontFamily="monospace"
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="p-3.5 rounded-xl bg-white border border-[#e0e0e0] shadow-sm text-xs font-mono space-y-1.5">
                          <span className="text-[#1d1d1f] font-semibold block border-b border-[#f0f0f0] pb-1">
                            {label} (Efficiency Score / 100)
                          </span>
                          {payload.map((entry, idx) => (
                            <div
                              key={`tooltip-${idx}`}
                              className="flex items-center justify-between gap-4"
                            >
                              <span className="flex items-center gap-1.5 text-[#424245]">
                                <span
                                  className="w-2 h-2 rounded-full"
                                  style={{ backgroundColor: entry.color }}
                                />
                                {entry.name}:
                              </span>
                              <span className="text-[#1d1d1f] font-semibold">
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
                <Bar dataKey="FASTEST" name="Fastest Route" fill="#d97706" radius={[4, 4, 0, 0]} />
                <Bar dataKey="FUEL_EFFICIENT" name="Fuel Efficient" fill="#64748b" radius={[4, 4, 0, 0]} />
                <Bar dataKey="BALANCED" name="Balanced (AI)" fill="#0066cc" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono pt-1">
            <div className="p-3 rounded-xl bg-[#fafafc] border border-[#e0e0e0]">
              <span className="text-[10px] text-[#86868b] block font-semibold uppercase">SAFETY LEADER</span>
              <span className="text-emerald-700 font-semibold">Safe Route (12 / 100 Risk)</span>
            </div>
            <div className="p-3 rounded-xl bg-[#fafafc] border border-[#e0e0e0]">
              <span className="text-[10px] text-[#86868b] block font-semibold uppercase">SPEED LEADER</span>
              <span className="text-amber-700 font-semibold">Fastest Route (38h 40m)</span>
            </div>
            <div className="p-3 rounded-xl bg-[#fafafc] border border-[#e0e0e0]">
              <span className="text-[10px] text-[#86868b] block font-semibold uppercase">FUEL LEADER</span>
              <span className="text-[#1d1d1f] font-semibold">Fuel Efficient (79.4 m³)</span>
            </div>
            <div className="p-3 rounded-xl bg-[#0066cc]/10 border border-[#0066cc]/30">
              <span className="text-[10px] text-[#0066cc] block font-semibold uppercase">OPTIMAL TRADE-OFF</span>
              <span className="text-[#0066cc] font-semibold">Balanced Route (AI Pick)</span>
            </div>
          </div>
        </div>
      )}

      {/* 2. Radar Chart View */}
      {activeTab === 'radar' && (
        <div className="space-y-3">
          <div className="h-64 sm:h-72 w-full pt-1">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={ROUTE_RADAR_DATA} margin={{ top: 5, right: 25, bottom: 5, left: 25 }}>
                <PolarGrid stroke="#e0e0e0" strokeOpacity={0.9} />
                <PolarAngleAxis
                  dataKey="metric"
                  stroke="#424245"
                  fontSize={10}
                  fontFamily="monospace"
                />
                <PolarRadiusAxis
                  angle={30}
                  domain={[0, 100]}
                  stroke="#86868b"
                  fontSize={9}
                  fontFamily="monospace"
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="p-3.5 rounded-xl bg-white border border-[#e0e0e0] shadow-sm text-xs font-mono space-y-1">
                          <span className="text-[#1d1d1f] font-semibold block border-b border-[#f0f0f0] pb-1">
                            {label}
                          </span>
                          {payload.map((entry, idx) => (
                            <div key={`radar-tt-${idx}`} className="flex items-center justify-between gap-3">
                              <span className="flex items-center gap-1.5 text-[#424245]">
                                <span
                                  className="w-2 h-2 rounded-full"
                                  style={{ backgroundColor: entry.color }}
                                />
                                {entry.name}:
                              </span>
                              <span className="text-[#1d1d1f] font-semibold">{entry.value}</span>
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
                  stroke="#d97706"
                  fill="#d97706"
                  fillOpacity={0.15}
                />
                <RechartsRadar
                  name="Fuel Efficient"
                  dataKey="FUEL_EFFICIENT"
                  stroke="#64748b"
                  fill="#64748b"
                  fillOpacity={0.15}
                />
                <RechartsRadar
                  name="Balanced (AI)"
                  dataKey="BALANCED"
                  stroke="#0066cc"
                  fill="#0066cc"
                  fillOpacity={0.25}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[12px] font-mono text-[#86868b] text-center font-normal">
            Polar radar polygons show normalized metric coverage. The Balanced route maximizes enclosed Pareto area.
          </p>
        </div>
      )}

      {/* 3. Detailed Comparison Matrix Table View */}
      {activeTab === 'table' && (
        <div className="overflow-x-auto">
          <table className="w-full text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-[#e0e0e0] text-[#1d1d1f] bg-[#fafafc]">
                <th className="p-3 text-left font-semibold">Evaluation Dimension</th>
                {ROUTE_CANDIDATES.map((r) => (
                  <th
                    key={r.key}
                    onClick={() => onSelectRoute(r.key)}
                    className={`p-3 text-right font-semibold cursor-pointer transition-colors ${
                      r.key === selectedRouteKey
                        ? 'text-[#0066cc] bg-[#0066cc]/10 font-semibold border-b-2 border-[#0066cc]'
                        : 'hover:text-[#0066cc]'
                    }`}
                  >
                    <div className="flex items-center justify-end gap-1">
                      <span>{r.name.split(' ')[0]}</span>
                      {r.isRecommended && <Award className="w-3.5 h-3.5 text-[#0066cc] inline" />}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f0f0] text-[#424245]">
              {/* Distance Row */}
              <tr className="hover:bg-[#fafafc] transition-colors">
                <td className="p-3 text-[#1d1d1f] flex items-center gap-1.5 font-semibold">
                  <Gauge className="w-3.5 h-3.5 text-[#86868b]" />
                  <span>Voyage Distance</span>
                </td>
                <td className="p-3 text-right text-[#424245]">1,342 km (+68 km)</td>
                <td className="p-3 text-right text-amber-700 font-semibold">1,214 km (MIN)</td>
                <td className="p-3 text-right text-[#424245]">1,280 km (+6 km)</td>
                <td className="p-3 text-right text-[#0066cc] font-semibold bg-[#fafafc]">
                  1,274 km (Baseline)
                </td>
              </tr>

              {/* ETA Row */}
              <tr className="hover:bg-[#fafafc] transition-colors">
                <td className="p-3 text-[#1d1d1f] flex items-center gap-1.5 font-semibold">
                  <Clock className="w-3.5 h-3.5 text-[#86868b]" />
                  <span>Estimated Transit Time</span>
                </td>
                <td className="p-3 text-right text-[#424245]">45h 12m (+3h 20m)</td>
                <td className="p-3 text-right text-amber-700 font-semibold">38h 40m (FASTEST)</td>
                <td className="p-3 text-right text-[#424245]">42h 10m (+18m)</td>
                <td className="p-3 text-right text-[#0066cc] font-semibold bg-[#fafafc]">
                  41h 52m (Balanced)
                </td>
              </tr>

              {/* Fuel Row */}
              <tr className="hover:bg-[#fafafc] transition-colors">
                <td className="p-3 text-[#1d1d1f] flex items-center gap-1.5 font-semibold">
                  <Fuel className="w-3.5 h-3.5 text-[#86868b]" />
                  <span>Fuel Consumption</span>
                </td>
                <td className="p-3 text-right text-[#424245]">88.2 m³ (+5.6 m³)</td>
                <td className="p-3 text-right text-[#424245]">84.7 m³ (+2.1 m³)</td>
                <td className="p-3 text-right text-emerald-700 font-semibold">79.4 m³ (LOWEST)</td>
                <td className="p-3 text-right text-[#0066cc] font-semibold bg-[#fafafc]">
                  82.6 m³ (Optimal)
                </td>
              </tr>

              {/* Risk Row */}
              <tr className="hover:bg-[#fafafc] transition-colors">
                <td className="p-3 text-[#1d1d1f] flex items-center gap-1.5 font-semibold">
                  <Shield className="w-3.5 h-3.5 text-[#86868b]" />
                  <span>POLARIS Risk Index</span>
                </td>
                <td className="p-3 text-right text-emerald-700 font-semibold">12 / 100 (SAFEST)</td>
                <td className="p-3 text-right text-rose-700 font-semibold">41 / 100 (HIGH)</td>
                <td className="p-3 text-right text-[#1d1d1f] font-normal">26 / 100 (LOW)</td>
                <td className="p-3 text-right text-[#0066cc] font-semibold bg-[#fafafc]">
                  24 / 100 (LOW)
                </td>
              </tr>

              {/* Icebreaker Requirement */}
              <tr className="hover:bg-[#fafafc] transition-colors">
                <td className="p-3 text-[#1d1d1f] font-semibold">Icebreaker Escort</td>
                <td className="p-3 text-right text-emerald-700 font-normal">None</td>
                <td className="p-3 text-right text-amber-700 font-semibold">Recommended</td>
                <td className="p-3 text-right text-emerald-700 font-normal">None</td>
                <td className="p-3 text-right text-emerald-700 font-semibold bg-[#fafafc]">
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

