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
      subtitle="Multi-objective Pareto-optimal Antarctic navigation paths, fuel optimization, and polar hazard avoidance"
      badge="PARETO FRONTIER"
      badgeType="active"
    >
      <div className="space-y-6">
        {/* 1. Voyage Origin & Target Telemetry Banner */}
        <div className="bg-white border border-zinc-200/90 shadow-xs rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs font-mono">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 text-zinc-900 font-bold">
              <Ship className="w-4 h-4 text-black" />
              <span className="text-zinc-500 font-normal">VESSEL:</span>
              <span>Polar Research Vessel (PC3 Ice-Class)</span>
            </div>
            <div className="hidden sm:inline-block text-zinc-300">|</div>
            <div className="flex items-center gap-2 text-zinc-700">
              <MapPin className="w-3.5 h-3.5 text-zinc-500" />
              <span>ORIGIN: Southern Ocean (60.10°S, 58.20°E)</span>
            </div>
            <div className="hidden sm:inline-block text-zinc-300">|</div>
            <div className="flex items-center gap-2 text-zinc-700">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>DEST: Bharati Station (69.41°S, 76.19°E)</span>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="px-2.5 py-1 rounded-lg bg-black text-white flex items-center gap-1.5 font-bold shadow-xs">
              <Sparkles className="w-3 h-3 text-zinc-300" />
              ACTIVE: {selectedRoute.name}
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
              <Compass className="w-4 h-4 text-black" />
              <h3 className="text-sm font-bold font-sans text-zinc-950 uppercase tracking-wider">
                Multi-Route Polar Stereographic Chart
              </h3>
            </div>

            {/* Quick Route Switcher Filter */}
            <div className="flex items-center gap-1.5 bg-zinc-100 p-1 rounded-xl border border-zinc-200 text-xs font-mono overflow-x-auto">
              <span className="text-zinc-600 px-2 flex items-center gap-1 font-bold">
                <Layers className="w-3.5 h-3.5 text-black" />
                ROUTE FOCUS:
              </span>
              {ROUTE_CANDIDATES.map((r) => {
                const isActive = r.key === selectedRouteKey;
                return (
                  <button
                    key={r.key}
                    onClick={() => handleSelectRoute(r.key)}
                    className={`px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-all flex-shrink-0 cursor-pointer ${
                      isActive
                        ? 'bg-black text-white font-bold shadow-xs'
                        : 'text-zinc-700 hover:text-zinc-950 hover:bg-zinc-200/80 font-medium'
                    }`}
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: isActive ? '#FFFFFF' : r.color }}
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

