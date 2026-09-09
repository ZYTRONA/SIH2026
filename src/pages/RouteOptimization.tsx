import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { AntarcticMap } from '@/components/map/AntarcticMap';
import {
  RouteCardsGrid,
  RouteComparisonView,
  AlgorithmSpecCard,
  SelectedRouteTelemetry,
} from '@/components/routes';
import {
  ROUTE_CANDIDATES,
  RouteKey,
} from '@/data/routeOptimizationData';
import {
  Sparkles,
  MapPin,
  Ship,
  Layers,
  Compass,
  CheckCircle2,
} from 'lucide-react';

export const RouteOptimization: React.FC = () => {
  const [selectedRouteKey, setSelectedRouteKey] = useState<RouteKey>('BALANCED');

  // Convert all 4 candidate routes to map format
  const mapCandidateRoutes = ROUTE_CANDIDATES.map((c) => ({
    ...c.routePath,
    isRecommended: c.isRecommended,
  }));

  const selectedRoute =
    ROUTE_CANDIDATES.find((r) => r.key === selectedRouteKey) || ROUTE_CANDIDATES[3];

  const handleSelectRoute = (key: RouteKey) => {
    setSelectedRouteKey(key);
  };

  const handleMapRouteSelect = (routeId: string) => {
    const found = ROUTE_CANDIDATES.find((r) => r.id === routeId);
    if (found) {
      setSelectedRouteKey(found.key);
    }
  };

  return (
    <PageContainer
      title="Route Optimization Center"
      subtitle="Multi-objective Pareto-optimal North Atlantic navigation paths, bunker fuel reduction, and dynamic ice hazard avoidance."
      badge="PARETO OPTIMAL"
      badgeType="safe"
    >
      <div className="space-y-6">
        {/* 1. Voyage Origin & Target Telemetry Banner */}
        <div className="apple-card p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 text-[13px]">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 text-[#1d1d1f] font-semibold">
              <Ship className="w-4 h-4 text-[#0066cc]" />
              <span className="text-[#86868b] font-normal">VESSEL:</span>
              <span>RV Polar Sentinel (PC3 Icebreaker)</span>
            </div>
            <div className="hidden sm:inline-block text-[#e0e0e0]">|</div>
            <div className="flex items-center gap-2 text-[#424245]">
              <MapPin className="w-3.5 h-3.5 text-[#86868b]" />
              <span>ORIGIN: Atlantic Fairway (59.00°N, 32.00°W)</span>
            </div>
            <div className="hidden sm:inline-block text-[#e0e0e0]">|</div>
            <div className="flex items-center gap-2 text-[#424245]">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>DEST: St. John's Maritime Base (47.57°N, 52.71°W)</span>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="px-3.5 py-1.5 rounded-full bg-[#0066cc] text-white flex items-center gap-1.5 font-semibold text-[12px]">
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>SELECTED: {selectedRoute.name}</span>
            </span>
          </div>
        </div>

        {/* 2. Candidate Route Cards */}
        <RouteCardsGrid
          selectedRouteKey={selectedRouteKey}
          onSelectRoute={handleSelectRoute}
        />

        {/* 3. Interactive Atlantic Map with All 4 Candidate Routes */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#0066cc]" />
              <h3 className="text-[14px] font-semibold text-[#1d1d1f]">
                Multi-Route Atlantic Navigation Chart (WGS84)
              </h3>
            </div>

            {/* Quick Route Switcher Pill Tabs */}
            <div className="flex items-center gap-1 bg-white p-1 rounded-full border border-[#e0e0e0] text-[12px] overflow-x-auto">
              <span className="text-[#86868b] px-3 flex items-center gap-1 font-semibold text-[11px]">
                <Layers className="w-3.5 h-3.5 text-[#1d1d1f]" />
                ROUTE:
              </span>
              {ROUTE_CANDIDATES.map((r) => {
                const isActive = r.key === selectedRouteKey;
                return (
                  <button
                    key={r.key}
                    onClick={() => handleSelectRoute(r.key)}
                    className={`px-3 py-1 rounded-full flex items-center gap-1.5 transition-all flex-shrink-0 cursor-pointer text-[12px] active:scale-95 ${
                      isActive
                        ? 'bg-[#0066cc] text-white font-semibold'
                        : 'text-[#424245] hover:text-[#1d1d1f] hover:bg-[#f5f5f7] font-normal'
                    }`}
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: isActive ? '#ffffff' : r.color }}
                    />
                    <span>{r.name.split(' ')[0]}</span>
                    {isActive && <CheckCircle2 className="w-3 h-3 text-white" />}
                  </button>
                );
              })}
            </div>
          </div>

          <AntarcticMap
            customRoutes={mapCandidateRoutes}
            selectedRouteId={selectedRoute.id}
            onSelectRoute={handleMapRouteSelect}
            heightClass="h-[520px] sm:h-[600px] lg:h-[680px]"
          />
        </div>

        {/* 4. Visual Comparison View */}
        <RouteComparisonView
          selectedRouteKey={selectedRouteKey}
          onSelectRoute={handleSelectRoute}
        />

        {/* 5. Algorithm Architecture Specification & Active Telemetry */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AlgorithmSpecCard />
          <SelectedRouteTelemetry selectedRouteKey={selectedRouteKey} />
        </div>
      </div>
    </PageContainer>
  );
};

export default RouteOptimization;
