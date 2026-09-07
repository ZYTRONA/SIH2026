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
      subtitle="Safe and fuel-efficient navigation planning"
      badge="PARETO FRONTIER"
      badgeType="info"
    >
      <div className="space-y-6">
        {/* 1. Voyage Origin & Target Telemetry Banner */}
        <div className="bg-white border border-slate-200/90 shadow-xs rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs font-mono">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 text-slate-700">
              <Ship className="w-4 h-4 text-sky-600" />
              <span className="font-semibold text-slate-500">VESSEL:</span>
              <span className="text-slate-900 font-bold">Polar Research Vessel (PC3 Ice-Class)</span>
            </div>
            <div className="hidden sm:inline-block text-slate-300">|</div>
            <div className="flex items-center gap-2 text-slate-600">
              <MapPin className="w-3.5 h-3.5 text-sky-600" />
              <span>ORIGIN: Southern Ocean (60.10°S, 58.20°E)</span>
            </div>
            <div className="hidden sm:inline-block text-slate-300">|</div>
            <div className="flex items-center gap-2 text-slate-600">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>DEST: Bharati Station (69.41°S, 76.19°E)</span>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="px-2.5 py-1 rounded-lg bg-sky-50 border border-sky-200 text-sky-700 flex items-center gap-1.5 font-bold">
              <Sparkles className="w-3 h-3 text-sky-600" />
              ACTIVE SELECTION: {selectedRoute.name}
            </span>
          </div>
        </div>

        {/* 2. Candidate Route Cards (Safe, Fastest, Fuel Efficient, Balanced) */}
        <RouteCardsGrid
          selectedRouteKey={selectedRouteKey}
          onSelectRoute={handleSelectRoute}
        />

        {/* 3. Interactive Antarctic Map with All 4 Candidate Routes */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-sky-600" />
              <h3 className="text-sm font-bold font-sans text-slate-900 uppercase tracking-wider">
                Multi-Route Polar Stereographic Chart
              </h3>
            </div>

            {/* Quick Route Switcher Filter */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-mono overflow-x-auto">
              <span className="text-slate-500 px-2 flex items-center gap-1 font-semibold">
                <Layers className="w-3.5 h-3.5 text-sky-600" />
                ROUTE FOCUS:
              </span>
              {ROUTE_CANDIDATES.map((r) => {
                const isActive = r.key === selectedRouteKey;
                return (
                  <button
                    key={r.key}
                    onClick={() => handleSelectRoute(r.key)}
                    className={`px-2.5 py-1 rounded-md flex items-center gap-1.5 transition-all flex-shrink-0 ${
                      isActive
                        ? 'bg-white shadow-xs font-bold text-slate-900 border border-slate-300'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                    }`}
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: r.color }}
                    />
                    <span>{r.name.split(' ')[0]}</span>
                    {isActive && <CheckCircle2 className="w-3 h-3 text-sky-600" />}
                  </button>
                );
              })}
            </div>
          </div>

          <AntarcticMap
            customRoutes={mapCandidateRoutes}
            selectedRouteId={selectedRoute.id}
            onSelectRoute={handleMapRouteSelect}
            heightClass="h-[540px] sm:h-[600px] lg:h-[680px]"
          />
        </div>

        {/* 4. Visual Comparison View (Safety, Fuel, ETA, Distance) */}
        <RouteComparisonView
          selectedRouteKey={selectedRouteKey}
          onSelectRoute={handleSelectRoute}
        />

        {/* 5. Algorithm Architecture Specification & Active Telemetry */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column: A* Pathfinding + NSGA-II Multi-objective Optimization Specs */}
          <AlgorithmSpecCard />

          {/* Right Column: Active Route Sequential Telemetry & Waypoints */}
          <SelectedRouteTelemetry selectedRouteKey={selectedRouteKey} />
        </div>
      </div>
    </PageContainer>
  );
};
