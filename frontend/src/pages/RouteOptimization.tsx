import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { useAppStore } from '@/store/useAppStore';
import {
  FromToRouteSelector,
  OptimizationGoal,
  MultiMapBar,
  MultiMapContainer,
  PolarRegion,
  MapLayoutMode,
  BasemapMode,
} from '@/components/map';
import {
  RouteCardsGrid,
  RouteComparisonView,
  AlgorithmSpecCard,
  SelectedRouteTelemetry,
} from '@/components/routes';
import {
  RouteCandidateDetail,
  RouteKey,
} from '@/data/routeOptimizationData';
import { polarisApi } from '@/services/api';
import {
  generateDynamicRoutes,
  RouteCoordinates,
  formatCoordinate,
} from '@/utils/dynamicPolarRouting';
import {
  Layers,
  Compass,
  CheckCircle2,
  Activity,
  Ship,
  Sparkles,
} from 'lucide-react';

export const RouteOptimization: React.FC = () => {
  // Connect to Global Mission Store (Source of Truth configured in Vessel Setup)
  const storeOrigin = useAppStore((s) => s.departureLocation);
  const storeDestination = useAppStore((s) => s.destinationLocation);
  const storePolarClass = useAppStore((s) => s.polarClass);
  const storeVesselName = useAppStore((s) => s.vesselName);
  const setVoyageEndpoints = useAppStore((s) => s.setVoyageEndpoints);

  // 1. Origin & Destination Coordinates State
  const [origin, setOrigin] = useState<RouteCoordinates>(storeOrigin);
  const [destination, setDestination] = useState<RouteCoordinates>(storeDestination);
  const [polarClass, setPolarClass] = useState<string>(storePolarClass || 'PC3');

  // Synchronize when store updates
  useEffect(() => {
    setOrigin(storeOrigin);
  }, [storeOrigin]);

  useEffect(() => {
    setDestination(storeDestination);
  }, [storeDestination]);

  // 2. Interactive Map Picking Mode
  const [isPickingMode, setIsPickingMode] = useState<'origin' | 'dest' | null>(null);

  // 3. Vessel and Solver Parameters
  const [selectedGoal, setSelectedGoal] = useState<OptimizationGoal>('BALANCED');
  const [selectedRouteKey, setSelectedRouteKey] = useState<RouteKey>('BALANCED');
  const [isSolving, setIsSolving] = useState(false);
  const [solveStats, setSolveStats] = useState<{
    latencyMs: number;
    algorithm: string;
    timestamp: string;
    distanceNm: number;
  } | null>(null);

  // 4. Multi-Map Configuration
  const [region, setRegion] = useState<PolarRegion>('Antarctica');
  const [basemapMode, setBasemapMode] = useState<BasemapMode>('voyager');
  const [layoutMode, setLayoutMode] = useState<MapLayoutMode>('single');
  const [syncViews, setSyncViews] = useState<boolean>(true);

  // 5. Generate Dynamic Pareto Routes based on current Origin & Destination
  const dynamicRoutes = useMemo(() => {
    return generateDynamicRoutes({
      origin,
      destination,
      polarClass,
      vesselSpeedKts: 14.5,
    });
  }, [origin, destination, polarClass]);

  // Map dynamic routes to RouteCandidateDetail format for cards & tables
  const candidateDetails: RouteCandidateDetail[] = useMemo(() => {
    return dynamicRoutes.map((r) => {
      let key: RouteKey = 'BALANCED';
      let badgeLabel = 'PARETO BALANCED';
      let riskTier: 'SAFE' | 'LOW' | 'MODERATE' | 'HIGH' = 'LOW';

      if (r.type === 'SAFE') {
        key = 'SAFE';
        badgeLabel = 'MAX SAFETY';
        riskTier = 'SAFE';
      } else if (r.type === 'FASTEST') {
        key = 'FASTEST';
        badgeLabel = 'DIRECT FAIRWAY';
        riskTier = 'MODERATE';
      } else if (r.type === 'FUEL_EFFICIENT') {
        key = 'FUEL_EFFICIENT';
        badgeLabel = 'CURRENT OPTIMAL';
        riskTier = 'LOW';
      }

      return {
        id: r.id,
        key,
        name: r.name.split(' (')[0],
        subtitle: r.description,
        badgeLabel,
        isRecommended: r.isRecommended,
        recommendationTag: r.isRecommended ? 'POLARIS TOP PICK' : undefined,
        recommendationReason: r.description,
        distanceKm: r.distanceKm || Math.round((r.totalDistanceNm || 0) * 1.852),
        distanceFormatted: `${r.totalDistanceNm || 0} NM (${r.distanceKm || Math.round((r.totalDistanceNm || 0) * 1.852)} km)`,
        etaHours: r.estDurationHours || 40,
        etaFormatted: r.etaFormatted || '40h',
        fuelM3: Math.round((r.fuelBurnTons || 100) * 1.15 * 10) / 10,
        fuelFormatted: `${r.fuelBurnTons || 0} MT (${Math.round((r.fuelBurnTons || 100) * 1.15)} m³)`,
        riskScore: r.riskScore || 20,
        riskFormatted: `${r.riskScore || 20} / 100`,
        riskTier,
        color: r.color,
        strokeWidth: r.strokeWidth,
        dashArray: r.dashArray,
        maxIceConcentrationPct: r.type === 'FASTEST' ? 55 : r.type === 'SAFE' ? 12 : 22,
        averageSpeedKts: r.type === 'FASTEST' ? 16.0 : r.type === 'SAFE' ? 13.5 : 14.5,
        icebreakerAssistance: r.type === 'FASTEST',
        characteristics: [
          r.description,
          `IMO Polar Code capability evaluated for ${polarClass}`,
          `Estimated transit duration: ${r.etaFormatted}`,
          `Safety confidence score: ${r.safetyScore || 90}%`,
        ],
        routePath: r,
      };
    });
  }, [dynamicRoutes, polarClass]);

  const selectedRoute = useMemo(() => {
    return (
      candidateDetails.find((c) => c.key === selectedRouteKey)?.routePath ||
      dynamicRoutes[0]
    );
  }, [candidateDetails, selectedRouteKey, dynamicRoutes]);

  const handleSelectRoute = (key: RouteKey) => {
    setSelectedRouteKey(key);
    const targetGoal = key as OptimizationGoal;
    setSelectedGoal(targetGoal);
  };

  const handleGoalSelect = (goal: OptimizationGoal) => {
    setSelectedGoal(goal);
    setSelectedRouteKey(goal as RouteKey);
  };

  const handleOriginChange = (newOrigin: RouteCoordinates) => {
    setOrigin(newOrigin);
    setVoyageEndpoints(newOrigin, destination, polarClass, 14.5);
  };

  const handleDestinationChange = (newDest: RouteCoordinates) => {
    setDestination(newDest);
    setVoyageEndpoints(origin, newDest, polarClass, 14.5);
  };

  const handleSwap = () => {
    const prevOrigin = origin;
    const prevDest = destination;
    setOrigin(prevDest);
    setDestination(prevOrigin);
    setVoyageEndpoints(prevDest, prevOrigin, polarClass, 14.5);
  };

  // Map Click handler for picking origin/destination directly on Leaflet map
  const handleMapClickCoordinate = useCallback(
    (lat: number, lng: number) => {
      if (isPickingMode === 'origin') {
        const newOrigin = {
          name: `Map Point (${formatCoordinate(lat, lng)})`,
          lat: Math.round(lat * 10000) / 10000,
          lng: Math.round(lng * 10000) / 10000,
        };
        setOrigin(newOrigin);
        setVoyageEndpoints(newOrigin, destination, polarClass, 14.5);
        setIsPickingMode(null);
      } else if (isPickingMode === 'dest') {
        const newDest = {
          name: `Map Point (${formatCoordinate(lat, lng)})`,
          lat: Math.round(lat * 10000) / 10000,
          lng: Math.round(lng * 10000) / 10000,
        };
        setDestination(newDest);
        setVoyageEndpoints(origin, newDest, polarClass, 14.5);
        setIsPickingMode(null);
      }
    },
    [isPickingMode, destination, origin, polarClass, setVoyageEndpoints]
  );

  // Compute Optimal Route Action
  const handleRunOptimization = async () => {
    setIsSolving(true);
    // Update global store so all maps across the app synchronize to these destinated routes
    setVoyageEndpoints(origin, destination, polarClass, 14.5);
    const startTime = performance.now();
    try {
      const mode =
        selectedGoal === 'FASTEST'
          ? 'Fastest'
          : selectedGoal === 'SAFE'
          ? 'Safest'
          : 'Fuel Efficient';

      const res = await polarisApi.optimizeRoute({
        vesselName: storeVesselName || 'MV Vasiliy Golovnin (ISEA-44)',
        polarClass,
        speedKts: 14.5,
        fuelCapacityMt: 1850.0,
        startLat: origin.lat,
        startLng: origin.lng,
        destLat: destination.lat,
        destLng: destination.lng,
        mode,
        forecastHorizonHours: 72,
      });

      const endTime = performance.now();
      setSolveStats({
        latencyMs: Math.round(endTime - startTime),
        algorithm: res.algorithm || 'A* + NSGA-II Multi-Objective Solver',
        timestamp: new Date().toLocaleTimeString(),
        distanceNm: selectedRoute.totalDistanceNm || 1845,
      });
    } catch {
      const endTime = performance.now();
      setSolveStats({
        latencyMs: Math.round(endTime - startTime),
        algorithm: 'A* + NSGA-II Solver (Cryo-Edge Fallback)',
        timestamp: new Date().toLocaleTimeString(),
        distanceNm: selectedRoute.totalDistanceNm || 1845,
      });
    } finally {
      setIsSolving(false);
    }
  };

  return (
    <PageContainer
      title="Route Optimization & Multi-Map Center"
      subtitle="Interactive From-To waypoint navigation, Pareto-optimal corridors, bunker fuel reduction, and multi-map tactical surveillance."
      badge="PARETO OPTIMAL"
      badgeType="safe"
    >
      <div className="space-y-6">
        {/* 1. Interactive From -> To Route Planning Capsule */}
        <FromToRouteSelector
          origin={origin}
          destination={destination}
          onChangeOrigin={handleOriginChange}
          onChangeDestination={handleDestinationChange}
          onSwapOriginDestination={handleSwap}
          onCalculateRoute={handleRunOptimization}
          isCalculating={isSolving}
          selectedGoal={selectedGoal}
          onSelectGoal={handleGoalSelect}
          isPickingMode={isPickingMode}
          onTogglePickMode={setIsPickingMode}
          polarClass={polarClass}
          onChangePolarClass={setPolarClass}
        />

        {/* 2. Solve Performance & Active Voyage Telemetry Banner */}
        <div className="apple-card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[13px] bg-white">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-[#1d1d1f] font-semibold">
              <Ship className="w-4 h-4 text-[#0066cc]" />
              <span className="text-[#86868b] font-normal">VESSEL:</span>
              <span>{storeVesselName || 'MV Vasiliy Golovnin (ISEA-44)'} ({polarClass} Polar Flagship)</span>
            </div>
            <div className="hidden sm:inline-block text-[#e0e0e0]">|</div>
            <div className="text-[#424245]">
              <span className="text-[#86868b]">CORRIDOR:</span>{' '}
              <span className="font-semibold text-[#1d1d1f]">
                {(origin.name || 'Origin').split(' (')[0]} &rarr; {(destination.name || 'Destination').split(' (')[0]}
              </span>{' '}
              <span className="text-[#86868b] font-mono text-[12px]">
                ({selectedRoute.totalDistanceNm} NM)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {solveStats ? (
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-medium flex items-center gap-1.5 animate-fadeIn">
                <Activity className="w-3.5 h-3.5 text-emerald-600" />
                Solved in {solveStats.latencyMs}ms ({solveStats.timestamp})
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full bg-blue-50 text-[#0066cc] border border-blue-200 text-[11px] font-medium flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#0066cc]" />
                Ready to Compute Pareto Routes
              </span>
            )}
          </div>
        </div>

        {/* 3. Candidate Route Cards (Dynamically Updated) */}
        <RouteCardsGrid
          selectedRouteKey={selectedRouteKey}
          onSelectRoute={handleSelectRoute}
          customCandidates={candidateDetails}
        />

        {/* 4. Multiple Maps Toolbar & Multi-Map Container */}
        <div className="space-y-3">
          {/* Multi-Map Toolstrip */}
          <MultiMapBar
            region={region}
            onChangeRegion={setRegion}
            basemapMode={basemapMode}
            onChangeBasemap={setBasemapMode}
            layoutMode={layoutMode}
            onChangeLayoutMode={setLayoutMode}
            syncViews={syncViews}
            onToggleSyncViews={() => setSyncViews(!syncViews)}
            onResetView={() => {
              const resetBtn = document.querySelector('.leaflet-control-zoom-in') as HTMLElement;
              resetBtn?.click();
            }}
            activeRouteName={selectedRoute.name}
          />

          {/* Map Header & Route Switcher Pill Tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#0066cc]" />
              <h3 className="text-[14px] font-semibold text-[#1d1d1f]">
                {region === 'Arctic'
                  ? 'Arctic Basin Tactical Chart (NSR / Northwest Passage)'
                  : region === 'Global'
                  ? 'Global Polar Transit Geodesic Chart'
                  : 'East Antarctic Tactical Chart (Maitri-Bharati Corridor)'}
              </h3>
            </div>

            {/* Quick Route Switcher Pill Tabs */}
            <div className="flex items-center gap-1 bg-white p-1 rounded-full border border-[#e0e0e0] text-[12px] overflow-x-auto shadow-xs">
              <span className="text-[#86868b] px-3 flex items-center gap-1 font-semibold text-[11px]">
                <Layers className="w-3.5 h-3.5 text-[#1d1d1f]" />
                ACTIVE:
              </span>
              {candidateDetails.map((c) => {
                const isActive = c.key === selectedRouteKey;
                return (
                  <button
                    key={c.key}
                    type="button"
                    onClick={() => handleSelectRoute(c.key)}
                    className={`px-3 py-1 rounded-full flex items-center gap-1.5 transition-all flex-shrink-0 cursor-pointer text-[12px] active:scale-95 ${
                      isActive
                        ? 'bg-[#0066cc] text-white font-semibold shadow-xs'
                        : 'text-[#424245] hover:text-[#1d1d1f] hover:bg-[#f5f5f7] font-normal'
                    }`}
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: isActive ? '#ffffff' : c.color }}
                    />
                    <span>{c.name.split(' ')[0]}</span>
                    {isActive && <CheckCircle2 className="w-3 h-3 text-white" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Multi-Map (Single View or Dual Split Screen) */}
          <MultiMapContainer
            layoutMode={layoutMode}
            region={region}
            basemapMode={basemapMode}
            onBasemapChange={setBasemapMode}
            syncViews={syncViews}
            routes={dynamicRoutes}
            selectedRouteId={selectedRoute.id}
            onSelectRoute={(id) => {
              const found = candidateDetails.find((c) => c.id === id);
              if (found) setSelectedRouteKey(found.key);
            }}
            onMapClickCoordinate={handleMapClickCoordinate}
            isPickingLocation={isPickingMode}
            heightClass="h-[520px] sm:h-[600px] lg:h-[680px]"
          />
        </div>

        {/* 5. Visual Comparison View (Radar Chart + Dynamic Metric Table) */}
        <RouteComparisonView
          selectedRouteKey={selectedRouteKey}
          onSelectRoute={handleSelectRoute}
          customCandidates={candidateDetails}
        />

        {/* 6. Algorithm Architecture Specification & Active Telemetry */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AlgorithmSpecCard />
          <SelectedRouteTelemetry selectedRouteKey={selectedRouteKey} />
        </div>
      </div>
    </PageContainer>
  );
};

export default RouteOptimization;
