import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Navigation,
  ArrowUpDown,
  Crosshair,
  Sparkles,
  ShieldCheck,
  Zap,
  Fuel,
  Compass,
  Ship,
  Check,
  ChevronDown,
  Activity,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { POLAR_LOCATIONS, PolarLocation } from '@/data/polarLocations';
import { RouteCoordinates } from '@/utils/dynamicPolarRouting';

export type OptimizationGoal = 'BALANCED' | 'SAFE' | 'FASTEST' | 'FUEL_EFFICIENT';

export interface FromToRouteSelectorProps {
  origin: RouteCoordinates;
  destination: RouteCoordinates;
  onChangeOrigin: (coords: RouteCoordinates) => void;
  onChangeDestination: (coords: RouteCoordinates) => void;
  onSwapOriginDestination: () => void;
  onCalculateRoute: () => void;
  isCalculating?: boolean;
  selectedGoal?: OptimizationGoal;
  onSelectGoal?: (goal: OptimizationGoal) => void;
  isPickingMode?: 'origin' | 'dest' | null;
  onTogglePickMode?: (target: 'origin' | 'dest' | null) => void;
  polarClass?: string;
  onChangePolarClass?: (pc: string) => void;
  compact?: boolean;
}

export const FromToRouteSelector: React.FC<FromToRouteSelectorProps> = ({
  origin,
  destination,
  onChangeOrigin,
  onChangeDestination,
  onSwapOriginDestination,
  onCalculateRoute,
  isCalculating = false,
  selectedGoal = 'BALANCED',
  onSelectGoal,
  isPickingMode = null,
  onTogglePickMode,
  polarClass = 'PC3',
  onChangePolarClass,
  compact = false,
}) => {
  const [originMenuOpen, setOriginMenuOpen] = useState(false);
  const [destMenuOpen, setDestMenuOpen] = useState(false);
  const [regionFilter, setRegionFilter] = useState<'All' | 'India' | 'Antarctica' | 'Arctic' | 'Gateway'>('All');
  const [isExpanded, setIsExpanded] = useState(!compact);

  // Close menus when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.route-selector-menu')) {
        setOriginMenuOpen(false);
        setDestMenuOpen(false);
      }
    };
    window.addEventListener('mousedown', handleOutsideClick);
    return () => window.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const filteredLocations = POLAR_LOCATIONS.filter(
    (loc) => regionFilter === 'All' || loc.region === regionFilter
  );

  const handleSelectPreset = (target: 'origin' | 'dest', loc: PolarLocation) => {
    if (target === 'origin') {
      onChangeOrigin({
        name: loc.name,
        lat: loc.lat,
        lng: loc.lng,
      });
      setOriginMenuOpen(false);
    } else {
      onChangeDestination({
        name: loc.name,
        lat: loc.lat,
        lng: loc.lng,
      });
      setDestMenuOpen(false);
    }
  };

  const goals = [
    {
      id: 'BALANCED' as OptimizationGoal,
      label: 'Best Optimal',
      sublabel: 'Pareto Balanced',
      icon: Sparkles,
      color: 'text-[#0066cc]',
      activeClass: 'bg-[#0066cc] text-white',
    },
    {
      id: 'SAFE' as OptimizationGoal,
      label: 'Safest',
      sublabel: 'Max Open Water',
      icon: ShieldCheck,
      color: 'text-emerald-600',
      activeClass: 'bg-emerald-600 text-white',
    },
    {
      id: 'FASTEST' as OptimizationGoal,
      label: 'Fastest',
      sublabel: 'Direct Rhumb',
      icon: Zap,
      color: 'text-amber-600',
      activeClass: 'bg-amber-600 text-white',
    },
    {
      id: 'FUEL_EFFICIENT' as OptimizationGoal,
      label: 'Fuel-Optimal',
      sublabel: 'Current Assisted',
      icon: Fuel,
      color: 'text-purple-600',
      activeClass: 'bg-purple-600 text-white',
    },
  ];

  return (
    <div className="w-full bg-white/95 backdrop-blur-md border border-[#e0e0e0] rounded-[20px] shadow-sm p-4 transition-all">
      {/* Top Header / Mode Switcher */}
      <div className="flex items-center justify-between pb-3 border-b border-[#f0f0f0] gap-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-[#0066cc]/10 flex items-center justify-center text-[#0066cc]">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-[13px] font-semibold text-[#1d1d1f] flex items-center gap-1.5">
              <span>Dynamic Geodesic Route Engine</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-[#0066cc] font-medium border border-blue-200">
                A* + Pareto
              </span>
            </h3>
            <p className="text-[11px] text-[#86868b]">
              Configure origin & destination to plot polar navigation corridors
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onChangePolarClass && (
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#424245] bg-[#f5f5f7] px-2.5 py-1 rounded-full border border-[#e0e0e0]">
              <Ship className="w-3.5 h-3.5 text-[#0066cc]" />
              <select
                value={polarClass}
                onChange={(e) => onChangePolarClass(e.target.value)}
                aria-label="Vessel Ice Class"
                className="bg-transparent font-semibold text-[#1d1d1f] focus:outline-none cursor-pointer"
              >
                <option value="PC1">PC1 (Year-round All Polar Waters)</option>
                <option value="PC2">PC2 (Year-round Moderate Multi-year)</option>
                <option value="PC3">PC3 (Year-round Second-year Ice)</option>
                <option value="PC4">PC4 (Year-round Thick First-year)</option>
                <option value="PC5">PC5 (Year-round Medium First-year)</option>
                <option value="PC6">PC6 (Summer/Autumn Medium First-year)</option>
                <option value="PC7">PC7 (Summer/Autumn Thin First-year)</option>
              </select>
            </div>
          )}

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-full hover:bg-[#f5f5f7] text-[#86868b] hover:text-[#1d1d1f] transition-all cursor-pointer"
            title={isExpanded ? 'Collapse' : 'Expand'}
          >
            <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Body */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="pt-3 space-y-3"
          >
            {/* Origin & Destination Inputs Row */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              {/* FROM (Origin) */}
              <div className="md:col-span-5 relative route-selector-menu">
                <label className="text-[11px] font-semibold text-[#86868b] uppercase tracking-wider mb-1 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#0066cc]" />
                    FROM (Departure Point)
                  </span>
                  <button
                    type="button"
                    onClick={() => onTogglePickMode?.(isPickingMode === 'origin' ? null : 'origin')}
                    className={`text-[11px] font-medium flex items-center gap-1 px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                      isPickingMode === 'origin'
                        ? 'bg-blue-600 text-white animate-pulse'
                        : 'text-[#0066cc] hover:bg-blue-50'
                    }`}
                  >
                    <Crosshair className="w-3 h-3" />
                    {isPickingMode === 'origin' ? 'Click Map...' : 'Pick on Map'}
                  </button>
                </label>

                <div
                  onClick={() => setOriginMenuOpen(!originMenuOpen)}
                  className="w-full px-3.5 py-2.5 rounded-[14px] bg-[#f5f5f7] border border-[#e0e0e0] hover:border-[#0066cc]/50 transition-all cursor-pointer flex items-center justify-between gap-2"
                >
                  <div className="overflow-hidden">
                    <span className="text-[13px] font-semibold text-[#1d1d1f] block truncate">
                      {origin.name || 'Select Departure Station / Port'}
                    </span>
                    <span className="text-[11px] text-[#86868b] font-mono block">
                      {origin.lat.toFixed(4)}°, {origin.lng.toFixed(4)}°
                    </span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-[#86868b] shrink-0" />
                </div>

                {/* Dropdown Menu for Origin */}
                <AnimatePresence>
                  {originMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="absolute left-0 top-full mt-1.5 w-full sm:w-[360px] bg-white border border-[#e0e0e0] rounded-[16px] shadow-xl z-[700] p-3 space-y-2 max-h-[380px] overflow-hidden flex flex-col"
                    >
                      <div className="flex items-center justify-between pb-1.5 border-b border-[#f0f0f0]">
                        <span className="text-[12px] font-semibold text-[#1d1d1f]">Departure Preset</span>
                        <div className="flex items-center gap-1 text-[11px]">
                          {(['All', 'India', 'Antarctica', 'Gateway', 'Arctic'] as const).map((r) => (
                            <button
                              key={r}
                              type="button"
                              onClick={() => setRegionFilter(r)}
                              className={`px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                                regionFilter === r
                                  ? 'bg-[#0066cc] text-white font-medium'
                                  : 'text-[#86868b] hover:text-[#1d1d1f]'
                              }`}
                            >
                              {r === 'India' ? '🇮🇳 India' : r}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="overflow-y-auto space-y-1 pr-1 flex-1">
                        {filteredLocations.map((loc) => {
                          const isSelected = Math.abs(loc.lat - origin.lat) < 0.01 && Math.abs(loc.lng - origin.lng) < 0.01;
                          return (
                            <div
                              key={loc.id}
                              onClick={() => handleSelectPreset('origin', loc)}
                              className={`p-2 rounded-[10px] text-left transition-all cursor-pointer flex items-center justify-between gap-2 ${
                                isSelected ? 'bg-blue-50 border border-blue-200' : 'hover:bg-[#f5f5f7]'
                              }`}
                            >
                              <div className="overflow-hidden">
                                <div className="flex items-center gap-1.5">
                                  <span>{loc.flag}</span>
                                  <span className="text-[12px] font-semibold text-[#1d1d1f] truncate">
                                    {loc.name}
                                  </span>
                                </div>
                                <span className="text-[10px] text-[#86868b] block font-mono">
                                  {loc.lat > 0 ? `${loc.lat.toFixed(2)}°N` : `${Math.abs(loc.lat).toFixed(2)}°S`},{' '}
                                  {loc.lng > 0 ? `${loc.lng.toFixed(2)}°E` : `${Math.abs(loc.lng).toFixed(2)}°W`} &bull; {loc.type}
                                </span>
                              </div>
                              {isSelected && <Check className="w-3.5 h-3.5 text-[#0066cc]" />}
                            </div>
                          );
                        })}
                      </div>

                      <div className="pt-2 border-t border-[#f0f0f0] grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] text-[#86868b] font-medium block">Custom Lat</label>
                          <input
                            type="number"
                            step="0.0001"
                            value={origin.lat}
                            onChange={(e) =>
                              onChangeOrigin({
                                ...origin,
                                name: 'Custom Coordinates',
                                lat: parseFloat(e.target.value) || 0,
                              })
                            }
                            className="w-full px-2 py-1 text-[11px] rounded-[8px] bg-[#f5f5f7] border border-[#e0e0e0] font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-[#86868b] font-medium block">Custom Lng</label>
                          <input
                            type="number"
                            step="0.0001"
                            value={origin.lng}
                            onChange={(e) =>
                              onChangeOrigin({
                                ...origin,
                                name: 'Custom Coordinates',
                                lng: parseFloat(e.target.value) || 0,
                              })
                            }
                            className="w-full px-2 py-1 text-[11px] rounded-[8px] bg-[#f5f5f7] border border-[#e0e0e0] font-mono"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* SWAP BUTTON */}
              <div className="md:col-span-2 flex justify-center pt-2 md:pt-4">
                <button
                  type="button"
                  onClick={onSwapOriginDestination}
                  title="Swap Origin and Destination"
                  className="w-10 h-10 rounded-full bg-[#f5f5f7] hover:bg-[#e8e8ed] border border-[#e0e0e0] flex items-center justify-center text-[#424245] hover:text-[#1d1d1f] transition-all active:scale-95 cursor-pointer shadow-xs"
                >
                  <ArrowUpDown className="w-4 h-4" />
                </button>
              </div>

              {/* TO (Destination) */}
              <div className="md:col-span-5 relative route-selector-menu">
                <label className="text-[11px] font-semibold text-[#86868b] uppercase tracking-wider mb-1 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Navigation className="w-3.5 h-3.5 text-emerald-600" />
                    TO (Destination Point)
                  </span>
                  <button
                    type="button"
                    onClick={() => onTogglePickMode?.(isPickingMode === 'dest' ? null : 'dest')}
                    className={`text-[11px] font-medium flex items-center gap-1 px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                      isPickingMode === 'dest'
                        ? 'bg-emerald-600 text-white animate-pulse'
                        : 'text-emerald-600 hover:bg-emerald-50'
                    }`}
                  >
                    <Crosshair className="w-3 h-3" />
                    {isPickingMode === 'dest' ? 'Click Map...' : 'Pick on Map'}
                  </button>
                </label>

                <div
                  onClick={() => setDestMenuOpen(!destMenuOpen)}
                  className="w-full px-3.5 py-2.5 rounded-[14px] bg-[#f5f5f7] border border-[#e0e0e0] hover:border-emerald-600/50 transition-all cursor-pointer flex items-center justify-between gap-2"
                >
                  <div className="overflow-hidden">
                    <span className="text-[13px] font-semibold text-[#1d1d1f] block truncate">
                      {destination.name || 'Select Destination Station / Port'}
                    </span>
                    <span className="text-[11px] text-[#86868b] font-mono block">
                      {destination.lat.toFixed(4)}°, {destination.lng.toFixed(4)}°
                    </span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-[#86868b] shrink-0" />
                </div>

                {/* Dropdown Menu for Destination */}
                <AnimatePresence>
                  {destMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="absolute right-0 top-full mt-1.5 w-full sm:w-[360px] bg-white border border-[#e0e0e0] rounded-[16px] shadow-xl z-[700] p-3 space-y-2 max-h-[380px] overflow-hidden flex flex-col"
                    >
                      <div className="flex items-center justify-between pb-1.5 border-b border-[#f0f0f0]">
                        <span className="text-[12px] font-semibold text-[#1d1d1f]">Destination Preset</span>
                        <div className="flex items-center gap-1 text-[11px]">
                          {(['All', 'Antarctica', 'India', 'Gateway', 'Arctic'] as const).map((r) => (
                            <button
                              key={r}
                              type="button"
                              onClick={() => setRegionFilter(r)}
                              className={`px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                                regionFilter === r
                                  ? 'bg-emerald-600 text-white font-medium'
                                  : 'text-[#86868b] hover:text-[#1d1d1f]'
                              }`}
                            >
                              {r === 'India' ? '🇮🇳 India' : r}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="overflow-y-auto space-y-1 pr-1 flex-1">
                        {filteredLocations.map((loc) => {
                          const isSelected = Math.abs(loc.lat - destination.lat) < 0.01 && Math.abs(loc.lng - destination.lng) < 0.01;
                          return (
                            <div
                              key={loc.id}
                              onClick={() => handleSelectPreset('dest', loc)}
                              className={`p-2 rounded-[10px] text-left transition-all cursor-pointer flex items-center justify-between gap-2 ${
                                isSelected ? 'bg-emerald-50 border border-emerald-200' : 'hover:bg-[#f5f5f7]'
                              }`}
                            >
                              <div className="overflow-hidden">
                                <div className="flex items-center gap-1.5">
                                  <span>{loc.flag}</span>
                                  <span className="text-[12px] font-semibold text-[#1d1d1f] truncate">
                                    {loc.name}
                                  </span>
                                </div>
                                <span className="text-[10px] text-[#86868b] block font-mono">
                                  {loc.lat > 0 ? `${loc.lat.toFixed(2)}°N` : `${Math.abs(loc.lat).toFixed(2)}°S`},{' '}
                                  {loc.lng > 0 ? `${loc.lng.toFixed(2)}°E` : `${Math.abs(loc.lng).toFixed(2)}°W`} &bull; {loc.type}
                                </span>
                              </div>
                              {isSelected && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                            </div>
                          );
                        })}
                      </div>

                      <div className="pt-2 border-t border-[#f0f0f0] grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] text-[#86868b] font-medium block">Custom Lat</label>
                          <input
                            type="number"
                            step="0.0001"
                            value={destination.lat}
                            onChange={(e) =>
                              onChangeDestination({
                                ...destination,
                                name: 'Custom Coordinates',
                                lat: parseFloat(e.target.value) || 0,
                              })
                            }
                            className="w-full px-2 py-1 text-[11px] rounded-[8px] bg-[#f5f5f7] border border-[#e0e0e0] font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-[#86868b] font-medium block">Custom Lng</label>
                          <input
                            type="number"
                            step="0.0001"
                            value={destination.lng}
                            onChange={(e) =>
                              onChangeDestination({
                                ...destination,
                                name: 'Custom Coordinates',
                                lng: parseFloat(e.target.value) || 0,
                              })
                            }
                            className="w-full px-2 py-1 text-[11px] rounded-[8px] bg-[#f5f5f7] border border-[#e0e0e0] font-mono"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Quick Route Presets */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px]">
              <span className="font-semibold text-[#86868b] uppercase tracking-wider shrink-0 mr-1">
                Expeditions:
              </span>
              <button
                type="button"
                onClick={() => {
                  onChangeOrigin({ name: 'Mormugao Port, Goa (India)', lat: 15.4, lng: 73.8 });
                  onChangeDestination({ name: 'Bharati Station (Larsemann Hills)', lat: -69.41, lng: 76.19 });
                }}
                className="px-2.5 py-1 rounded-full bg-blue-50 hover:bg-blue-100 text-[#0066cc] font-medium border border-blue-200 shrink-0 transition-all cursor-pointer flex items-center gap-1"
              >
                <span>🇮🇳 Goa &rarr; ❄️ Bharati</span>
                <span className="text-[9px] bg-blue-200/60 px-1 rounded">ISEA-44 Flagship</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  onChangeOrigin({ name: 'Mormugao Port, Goa (India)', lat: 15.4, lng: 73.8 });
                  onChangeDestination({ name: 'Maitri Station (Queen Maud Land)', lat: -70.77, lng: 11.73 });
                }}
                className="px-2.5 py-1 rounded-full bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#1d1d1f] border border-[#e0e0e0] shrink-0 transition-all cursor-pointer"
              >
                🇮🇳 Goa &rarr; ❄️ Maitri
              </button>
              <button
                type="button"
                onClick={() => {
                  onChangeOrigin({ name: 'Cochin Port & Shipyard (India)', lat: 9.96, lng: 76.27 });
                  onChangeDestination({ name: 'Bharati Station (Larsemann Hills)', lat: -69.41, lng: 76.19 });
                }}
                className="px-2.5 py-1 rounded-full bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#1d1d1f] border border-[#e0e0e0] shrink-0 transition-all cursor-pointer"
              >
                🇮🇳 Cochin &rarr; ❄️ Bharati
              </button>
              <button
                type="button"
                onClick={() => {
                  onChangeOrigin({ name: 'Maitri Station (Queen Maud Land)', lat: -70.77, lng: 11.73 });
                  onChangeDestination({ name: 'Bharati Station (Larsemann Hills)', lat: -69.41, lng: 76.19 });
                }}
                className="px-2.5 py-1 rounded-full bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#1d1d1f] border border-[#e0e0e0] shrink-0 transition-all cursor-pointer"
              >
                ❄️ Maitri &rarr; ❄️ Bharati (Coastal)
              </button>
              <button
                type="button"
                onClick={() => {
                  onChangeOrigin({ name: 'Cape Town Port (South Africa)', lat: -33.92, lng: 18.42 });
                  onChangeDestination({ name: 'Bharati Station (Larsemann Hills)', lat: -69.41, lng: 76.19 });
                }}
                className="px-2.5 py-1 rounded-full bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#1d1d1f] border border-[#e0e0e0] shrink-0 transition-all cursor-pointer"
              >
                🇿🇦 Cape Town &rarr; ❄️ Bharati
              </button>
            </div>

            {/* Bottom Row: Optimization Priority Pills & Calculate CTA */}
            <div className="pt-2 border-t border-[#f0f0f0] flex flex-col lg:flex-row lg:items-center justify-between gap-3">
              {/* Goal Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
                <span className="text-[11px] font-semibold text-[#86868b] uppercase tracking-wider mr-1 shrink-0">
                  Priority:
                </span>
                {goals.map((g) => {
                  const Icon = g.icon;
                  const isActive = selectedGoal === g.id;
                  return (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => onSelectGoal?.(g.id)}
                      className={`px-3 py-1.5 rounded-full text-[12px] flex items-center gap-1.5 transition-all shrink-0 cursor-pointer ${
                        isActive
                          ? `${g.activeClass} font-semibold shadow-xs`
                          : 'bg-[#f5f5f7] text-[#424245] hover:text-[#1d1d1f] hover:bg-[#e8e8ed]'
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : g.color}`} />
                      <span>{g.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Action CTA */}
              <div className="flex items-center gap-2 self-end lg:self-auto">
                {isPickingMode && (
                  <span className="text-[11px] text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full flex items-center gap-1 animate-pulse">
                    <Crosshair className="w-3.5 h-3.5 text-amber-600" />
                    Click anywhere on the map to set {isPickingMode}
                  </span>
                )}

                <button
                  type="button"
                  onClick={onCalculateRoute}
                  disabled={isCalculating}
                  className="px-5 py-2 rounded-full bg-[#0066cc] hover:bg-[#0052a3] text-white flex items-center gap-2 font-semibold text-[13px] shadow-sm transition-all active:scale-95 cursor-pointer disabled:opacity-75"
                >
                  {isCalculating ? (
                    <>
                      <Activity className="w-4 h-4 animate-spin text-white" />
                      <span>Computing Routes...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-white" />
                      <span>Compute Optimal Route</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
