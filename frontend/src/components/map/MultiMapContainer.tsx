import React, { useState } from 'react';
import { RoutePath } from '@/types/map';
import { AntarcticMap } from './AntarcticMap';
import { BasemapMode } from './MapControls';
import { PolarRegion, MapLayoutMode } from './MultiMapBar';
import { SplitSquareVertical } from 'lucide-react';

export interface MultiMapContainerProps {
  layoutMode: MapLayoutMode;
  region: PolarRegion;
  basemapMode: BasemapMode;
  onBasemapChange?: (mode: BasemapMode) => void;
  syncViews?: boolean;
  routes: RoutePath[];
  selectedRouteId: string;
  onSelectRoute: (routeId: string) => void;
  onMapClickCoordinate?: (lat: number, lng: number) => void;
  isPickingLocation?: 'origin' | 'dest' | null;
  heightClass?: string;
}

export const MultiMapContainer: React.FC<MultiMapContainerProps> = ({
  layoutMode,
  region,
  basemapMode,
  onBasemapChange,
  syncViews = true,
  routes,
  selectedRouteId,
  onSelectRoute,
  onMapClickCoordinate,
  isPickingLocation = null,
  heightClass = 'h-[540px] sm:h-[620px] lg:h-[700px]',
}) => {
  // Map B can have its own independent route selection and basemap for comparison
  const [mapBRouteId, setMapBRouteId] = useState<string>(
    routes[1]?.id || routes[0]?.id || selectedRouteId
  );
  const [mapBBasemap, setMapBBasemap] = useState<BasemapMode>('satellite');

  // Shared synchronized center state
  const [sharedCenter, setSharedCenter] = useState<{ lat: number; lng: number; zoom?: number } | null>(null);

  const handleCenterChangeA = (center: { lat: number; lng: number; zoom: number }) => {
    if (syncViews && layoutMode === 'split') {
      setSharedCenter(center);
    }
  };

  const activeRouteA = routes.find((r) => r.id === selectedRouteId) || routes[0];
  const activeRouteB = routes.find((r) => r.id === mapBRouteId) || routes[1] || routes[0];

  if (layoutMode === 'single') {
    return (
      <div className="w-full">
        <AntarcticMap
          customRoutes={routes}
          selectedRouteId={selectedRouteId}
          onSelectRoute={onSelectRoute}
          heightClass={heightClass}
          controlledBasemap={basemapMode}
          onBasemapChange={onBasemapChange}
          onMapClickCoordinate={onMapClickCoordinate}
          isPickingLocation={isPickingLocation}
          region={region}
          mapTitle={activeRouteA ? `${activeRouteA.name.split(' (')[0]}` : undefined}
        />
      </div>
    );
  }

  // Split-screen dual map layout
  return (
    <div className="space-y-3">
      {/* Map B Route Selector Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1 text-[12px]">
        <div className="flex items-center gap-2">
          <SplitSquareVertical className="w-4 h-4 text-[#0066cc]" />
          <span className="font-semibold text-[#1d1d1f]">
            Dual-Map Tactical Comparison Deck
          </span>
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-neutral-200 text-neutral-700 font-mono">
            {syncViews ? 'SYNCED VIEWS' : 'INDEPENDENT VIEWS'}
          </span>
        </div>

        {/* Map B Route Selector Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto">
          <span className="text-[#86868b] font-semibold text-[11px] mr-1">
            MAP B ROUTE:
          </span>
          {routes.map((r) => {
            const isSelected = r.id === mapBRouteId;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => setMapBRouteId(r.id)}
                className={`px-2.5 py-1 rounded-full text-[11px] flex items-center gap-1.5 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-neutral-800 text-white font-semibold shadow-xs'
                    : 'bg-white border border-[#e0e0e0] text-[#424245] hover:text-[#1d1d1f]'
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: r.color }}
                />
                <span>{r.name.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left Map: Map A (Primary Route) */}
        <div className="space-y-1.5">
          <AntarcticMap
            customRoutes={routes}
            selectedRouteId={selectedRouteId}
            onSelectRoute={onSelectRoute}
            heightClass="h-[480px] sm:h-[540px] lg:h-[620px]"
            controlledBasemap={basemapMode}
            onBasemapChange={onBasemapChange}
            onMapClickCoordinate={onMapClickCoordinate}
            isPickingLocation={isPickingLocation}
            region={region}
            mapTitle={`MAP A: ${activeRouteA?.name.split(' ')[0] || 'Primary'} (${basemapMode.toUpperCase()})`}
            onCenterChange={handleCenterChangeA}
            externalCenter={syncViews ? sharedCenter : null}
          />
        </div>

        {/* Right Map: Map B (Alternative Route or Alternative Layer) */}
        <div className="space-y-1.5">
          <AntarcticMap
            customRoutes={routes}
            selectedRouteId={mapBRouteId}
            onSelectRoute={(id) => setMapBRouteId(id)}
            heightClass="h-[480px] sm:h-[540px] lg:h-[620px]"
            controlledBasemap={mapBBasemap}
            onBasemapChange={(b) => setMapBBasemap(b)}
            onMapClickCoordinate={onMapClickCoordinate}
            isPickingLocation={isPickingLocation}
            region={region}
            mapTitle={`MAP B: ${activeRouteB?.name.split(' ')[0] || 'Alternative'} (${mapBBasemap.toUpperCase()})`}
            externalCenter={syncViews ? sharedCenter : null}
          />
        </div>
      </div>
    </div>
  );
};
