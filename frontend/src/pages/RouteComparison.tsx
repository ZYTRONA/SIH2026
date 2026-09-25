import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import {
  ShieldCheck,
  BarChart3,
  Sparkles,
} from 'lucide-react';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  Tooltip,
} from 'recharts';
import { useNavigate } from 'react-router-dom';

interface RouteOptionData {
  id: string;
  name: string;
  badge: string;
  timeDays: number;
  fuelTons: number;
  fuelEfficiencyPct: number;
  riskScore: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  fuelLevel: 'Low' | 'Medium' | 'High';
  timeLevel: '4.0 Days' | '4.5 Days' | '5.0 Days';
  distanceNm: number;
  rioScore: number;
  icebergsInCorridor: number;
  iceEncounterPct: number;
  recommended: boolean;
  algorithm: string;
  description: string;
}

const COMPARISON_ROUTES: RouteOptionData[] = [
  {
    id: 'safe',
    name: 'Safe Route (POLAR-OPT-A)',
    badge: 'RECOMMENDED BY POLARIS AI',
    timeDays: 5.0,
    timeLevel: '5.0 Days',
    fuelTons: 142.6,
    fuelLevel: 'Medium',
    fuelEfficiencyPct: 92.4,
    riskScore: 18.2,
    riskLevel: 'Low',
    distanceNm: 1845,
    rioScore: +18,
    icebergsInCorridor: 0,
    iceEncounterPct: 22.4,
    recommended: true,
    algorithm: 'NSGA-II Pareto Optimized Corridor',
    description: 'Bypasses high-density tabular iceberg clusters in Weddell sector; maximizes open water lead navigation.',
  },
  {
    id: 'fastest',
    name: 'Fastest Route (POLAR-OPT-B)',
    badge: 'HIGH HAZARD EXPOSURE',
    timeDays: 4.0,
    timeLevel: '4.0 Days',
    fuelTons: 178.4,
    fuelLevel: 'High',
    fuelEfficiencyPct: 78.1,
    riskScore: 48.5,
    riskLevel: 'Medium',
    distanceNm: 1680,
    rioScore: +6,
    icebergsInCorridor: 3,
    iceEncounterPct: 46.8,
    recommended: false,
    algorithm: 'A* Direct Great Circle / Rhumb Line',
    description: 'Minimizes transit distance but cuts directly through 4-knot drift multi-year ice floes requiring continuous ramming.',
  },
  {
    id: 'efficient',
    name: 'Efficient Route (POLAR-OPT-C)',
    badge: 'OPTIMAL FUEL CONSUMPTION',
    timeDays: 4.5,
    timeLevel: '4.5 Days',
    fuelTons: 128.0,
    fuelLevel: 'Low',
    fuelEfficiencyPct: 96.5,
    riskScore: 26.4,
    riskLevel: 'Medium',
    distanceNm: 1750,
    rioScore: +14,
    icebergsInCorridor: 1,
    iceEncounterPct: 28.0,
    recommended: false,
    algorithm: 'Hydrodynamic Current Assisted Routing',
    description: 'Rides Antarctic Circumpolar eastward drift currents with throttled 60% engine load to conserve bunker fuel.',
  },
];

const RADAR_DATA = [
  { metric: 'Safety (100 - Risk)', Safe: 82, Fastest: 52, Efficient: 74 },
  { metric: 'Fuel Efficiency', Safe: 92, Fastest: 78, Efficient: 97 },
  { metric: 'Time Efficiency', Safe: 70, Fastest: 95, Efficient: 82 },
  { metric: 'Ice Avoidance', Safe: 88, Fastest: 50, Efficient: 72 },
  { metric: 'Current Benefit', Safe: 65, Fastest: 40, Efficient: 90 },
];

export const RouteComparison: React.FC = () => {
  const navigate = useNavigate();
  const [selectedRoute, setSelectedRoute] = useState<string>('safe');

  return (
    <PageContainer
      title="Multi-Objective Route Comparison"
      subtitle="Examine multi-criteria trade-offs between transit duration, bunker fuel conservation, and IMO POLARIS risk index exposure."
      badge="NSGA-II PARETO FRONT"
      badgeType="active"
    >
      <div className="space-y-6">
        {/* Tier 1: Canonical Specification Comparison Table */}
        <div className="bg-white border border-[#e0e0e0] rounded-[18px] p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#f0f0f0]">
            <div>
              <h2 className="text-[16px] font-semibold text-[#1d1d1f]">
                NSGA-II Multi-Criteria Comparison Matrix
              </h2>
              <p className="text-[12px] text-neutral-500 font-normal">
                Standardized polar operational trade-off evaluation for Maitri &rarr; Bharati corridor.
              </p>
            </div>
            <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-[#f5f5f7] border border-[#e0e0e0] text-[#1d1d1f] font-semibold">
              3 CANDIDATE PATHWAYS COMPUTED
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#e0e0e0] text-neutral-500 uppercase tracking-wider font-mono text-[11px]">
                  <th className="py-3 px-4">Route Pathway</th>
                  <th className="py-3 px-4">Transit Time</th>
                  <th className="py-3 px-4">Fuel Consumption</th>
                  <th className="py-3 px-4">Risk Exposure</th>
                  <th className="py-3 px-4">Distance (NM)</th>
                  <th className="py-3 px-4">IMO RIO Score</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0f0f0]">
                {COMPARISON_ROUTES.map((route) => {
                  const isSelected = selectedRoute === route.id;
                  return (
                    <tr
                      key={route.id}
                      onClick={() => setSelectedRoute(route.id)}
                      className={`cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-blue-50/70 font-medium'
                          : 'hover:bg-[#fafafc]'
                      }`}
                    >
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-2.5 h-2.5 rounded-full ${
                              route.id === 'safe'
                                ? 'bg-emerald-500'
                                : route.id === 'fastest'
                                ? 'bg-amber-500'
                                : 'bg-[#0066cc]'
                            }`}
                          />
                          <span className="font-semibold text-[#1d1d1f]">{route.name}</span>
                        </div>
                        {route.recommended && (
                          <span className="inline-block mt-0.5 text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
                            RECOMMENDED
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 font-mono font-semibold text-[#1d1d1f]">
                        {route.timeLevel}
                      </td>

                      <td className="py-3.5 px-4">
                        <span
                          className={`font-mono font-semibold px-2 py-0.5 rounded ${
                            route.fuelLevel === 'Low'
                              ? 'bg-emerald-100 text-emerald-800'
                              : route.fuelLevel === 'Medium'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {route.fuelLevel} ({route.fuelTons} MT)
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span
                          className={`font-mono font-semibold px-2 py-0.5 rounded ${
                            route.riskLevel === 'Low'
                              ? 'bg-emerald-100 text-emerald-800'
                              : route.riskLevel === 'Medium'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {route.riskLevel} (Score: {route.riskScore})
                        </span>
                      </td>

                      <td className="py-3.5 px-4 font-mono text-[#1d1d1f]">
                        {route.distanceNm} nm
                      </td>

                      <td className="py-3.5 px-4 font-mono font-bold text-emerald-700">
                        {route.rioScore > 0 ? `+${route.rioScore}` : route.rioScore} RIO
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedRoute(route.id);
                            navigate('/routes');
                          }}
                          className="px-3 py-1.5 rounded-full bg-[#1d1d1f] hover:bg-black text-white text-[11px] font-medium transition-all"
                        >
                          Select Corridor
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tier 2: Radar Comparison & Trade-Off Metrics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Radar Chart (6 Cols) */}
          <div className="lg:col-span-6 bg-white border border-[#e0e0e0] rounded-[18px] p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#f0f0f0]">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-[#0066cc]" />
                <h3 className="text-[15px] font-semibold text-[#1d1d1f]">
                  Pareto Trade-Off Radar
                </h3>
              </div>
              <span className="text-[11px] font-mono text-neutral-500">
                Multi-Attribute Decision Matrix
              </span>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={RADAR_DATA}>
                  <PolarGrid stroke="#e0e0e0" />
                  <PolarAngleAxis dataKey="metric" tick={{ fill: '#424245', fontSize: 11 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#86868b" fontSize={10} />
                  <Radar
                    name="Safe Route"
                    dataKey="Safe"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.3}
                  />
                  <Radar
                    name="Fastest Route"
                    dataKey="Fastest"
                    stroke="#f59e0b"
                    fill="#f59e0b"
                    fillOpacity={0.2}
                  />
                  <Radar
                    name="Efficient Route"
                    dataKey="Efficient"
                    stroke="#0066cc"
                    fill="#0066cc"
                    fillOpacity={0.25}
                  />
                  <Legend />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Deep Route Spec Card (6 Cols) */}
          <div className="lg:col-span-6 bg-white border border-[#e0e0e0] rounded-[18px] p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#f0f0f0]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <h3 className="text-[15px] font-semibold text-[#1d1d1f]">
                  Detailed Candidate Spec: {COMPARISON_ROUTES.find((r) => r.id === selectedRoute)?.name}
                </h3>
              </div>
            </div>

            {(() => {
              const current = COMPARISON_ROUTES.find((r) => r.id === selectedRoute)!;
              return (
                <div className="space-y-4">
                  <p className="text-[13px] text-[#424245] leading-relaxed">
                    {current.description}
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs">
                    <div className="p-3 rounded-xl bg-[#fafafc] border border-[#e0e0e0]">
                      <span className="text-[10px] text-neutral-500 block">Transit Time</span>
                      <span className="text-[14px] font-bold text-[#1d1d1f]">{current.timeDays} Days</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#fafafc] border border-[#e0e0e0]">
                      <span className="text-[10px] text-neutral-500 block">Bunker Fuel</span>
                      <span className="text-[14px] font-bold text-amber-700">{current.fuelTons} MT</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#fafafc] border border-[#e0e0e0]">
                      <span className="text-[10px] text-neutral-500 block">Fuel Efficiency</span>
                      <span className="text-[14px] font-bold text-emerald-700">{current.fuelEfficiencyPct}%</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#fafafc] border border-[#e0e0e0]">
                      <span className="text-[10px] text-neutral-500 block">Risk Score (RIO)</span>
                      <span className="text-[14px] font-bold text-blue-700">+{current.rioScore} RIO</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#fafafc] border border-[#e0e0e0]">
                      <span className="text-[10px] text-neutral-500 block">Iceberg Incursions</span>
                      <span className="text-[14px] font-bold text-[#1d1d1f]">{current.icebergsInCorridor} Detected</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#fafafc] border border-[#e0e0e0]">
                      <span className="text-[10px] text-neutral-500 block">Ice Exposure</span>
                      <span className="text-[14px] font-bold text-[#1d1d1f]">{current.iceEncounterPct}%</span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => navigate('/explainable-ai')}
                      className="px-4 py-2 rounded-full bg-[#0066cc] text-white text-xs font-medium flex items-center gap-1.5 cursor-pointer shadow-xs hover:bg-[#0055b3]"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Inspect SHAP Explainability (Screen 9)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate('/routes')}
                      className="px-4 py-2 rounded-full bg-[#f5f5f7] text-[#1d1d1f] text-xs font-medium border border-[#e0e0e0] hover:bg-[#ebebed] cursor-pointer"
                    >
                      <span>Plot on Antarctic Chart</span>
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default RouteComparison;
