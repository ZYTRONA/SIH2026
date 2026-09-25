import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AntarcticMap } from '@/components/map/AntarcticMap';
import { MapLayerVisibility } from '@/types/map';
import {
  ShieldCheck,
  AlertTriangle,
  Navigation,
  CheckCircle2,
  RefreshCw,
  HardDrive,
  Layers,
  Crosshair,
  ArrowRight,
  Info,
  Check,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  // 1. Operational State
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [riskScore, setRiskScore] = useState<number>(28);

  // 2. Map Layer State & Layer Menu
  const [layerMenuOpen, setLayerMenuOpen] = useState<boolean>(false);
  const [mapLayers, setMapLayers] = useState<MapLayerVisibility>({
    seaIce: true,
    icebergs: true,
    routes: true,
    risk: false,
    oceanCurrents: false,
    weather: false,
    bathymetry: false,
    stations: true,
    navAids: false,
    aisTargets: true,
  });

  const allLayersActive = Object.values(mapLayers).every(Boolean);

  const toggleAllLayers = () => {
    const nextState = !allLayersActive;
    setMapLayers({
      seaIce: nextState,
      icebergs: nextState,
      routes: nextState,
      risk: nextState,
      oceanCurrents: nextState,
      weather: nextState,
      bathymetry: nextState,
      stations: nextState,
      navAids: nextState,
      aisTargets: nextState,
    });
  };

  // 3. AI Recommendation State
  const [acceptedRoute, setAcceptedRoute] = useState<boolean>(false);
  const [isRecalculating, setIsRecalculating] = useState<boolean>(false);
  const [recalculateFeedback, setRecalculateFeedback] = useState<string | null>(null);

  // Layer toggle helper
  const toggleLayer = (layerKey: keyof MapLayerVisibility) => {
    setMapLayers((prev) => ({
      ...prev,
      [layerKey]: !prev[layerKey],
    }));
  };

  // Recalculate safest route action
  const handleRecalculate = () => {
    setIsRecalculating(true);
    setRecalculateFeedback(null);
    setTimeout(() => {
      setIsRecalculating(false);
      setRiskScore(24);
      setRecalculateFeedback('Safest route recalculated: 14.2% bunker fuel reduction with 0 multi-year ice compression');
      setTimeout(() => setRecalculateFeedback(null), 5000);
    }, 1200);
  };

  return (
    <div className="w-full bg-[#f5f5f7] text-[#1d1d1f] antialiased selection:bg-[#0066cc] selection:text-white flex flex-col justify-between">
      {/* Recalculate Feedback Notification (Apple Action Blue Banner) */}
      <AnimatePresence>
        {recalculateFeedback && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-[#0066cc] text-white px-4 py-2.5 text-center text-[14px] font-normal flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-white" />
            <span>{recalculateFeedback}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 2. MAIN WORKSPACE CONTENT CONTAINER (PARCHMENT CANVAS #f5f5f7)            */}
      {/* ========================================================================= */}
      <main className="max-w-[1920px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6 flex-1">
        {/* ======================================================================= */}
        {/* 2. MAIN MAP (BIGGEST SECTION – 55–65% OF SCREEN HEIGHT)                 */}
        {/* ======================================================================= */}
        <div className="rounded-[18px] bg-[#272729] border border-neutral-700 overflow-hidden shadow-none relative flex flex-col">
          {/* Map Header */}
          <div className="px-5 py-3.5 bg-[#252527] border-b border-neutral-700 flex flex-wrap items-center justify-between gap-3 text-white">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-[17px] font-semibold text-white tracking-[-0.28px]">
                East Antarctic Tactical ECDIS Chart
              </span>
              <span className="hidden sm:inline text-neutral-600">|</span>
              <span className="hidden sm:inline text-[13px] text-[#cccccc] font-normal">
                Prydz Bay Corridor &bull; 68°34.8' S, 77°58.2' E
              </span>
            </div>

            <div className="flex items-center gap-3 text-[12px] font-mono text-neutral-400">
              <span className="px-2.5 py-1 rounded-full bg-[#272729] border border-neutral-700 text-[#2997ff]">
                {Object.values(mapLayers).filter(Boolean).length}/10 Layers Active
              </span>
              <span className="hidden sm:inline text-neutral-500">EPSG:3857 Polar ECDIS</span>
            </div>
          </div>

          {/* Interactive Antarctic Map (55-65% Viewport Height) */}
          <div className="relative w-full h-[480px] sm:h-[540px] lg:h-[600px] bg-[#1d1d1f]">
            <AntarcticMap
              controlledLayers={mapLayers}
              onLayerToggle={toggleLayer}
              heightClass="h-full"
              hideControls={true}
            />

            {/* Apple 44px Translucent Circular Control Chips + Layer Menu Drawer */}
            <div className="absolute top-4 right-4 z-[400] flex flex-col gap-2">
              <div className="relative">
                <button
                  onClick={() => setLayerMenuOpen(!layerMenuOpen)}
                  title="Toggle Tactical Map Layers List"
                  className={`btn-apple-icon transition-all duration-150 cursor-pointer ${
                    layerMenuOpen
                      ? '!bg-[#0066cc] text-white shadow-lg'
                      : '!bg-[rgba(210,210,215,0.64)] hover:!bg-[rgba(210,210,215,0.85)] text-[#1d1d1f]'
                  }`}
                >
                  <Layers className="w-5 h-5" />
                </button>

                {/* Layer Selection Popover Modal (Anchored to the Layer Icon) */}
                <AnimatePresence>
                  {layerMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, x: 10, y: 0 }}
                      animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, x: 10, y: 0 }}
                      className="absolute right-14 top-0 z-[500] w-[320px] sm:w-[380px] bg-[#272729] border border-neutral-700 rounded-[18px] p-4 text-white shadow-2xl space-y-3"
                    >
                      <div className="flex items-center justify-between pb-2.5 border-b border-neutral-700">
                        <div className="flex items-center gap-2">
                          <Layers className="w-4 h-4 text-[#2997ff]" />
                          <span className="text-[14px] font-semibold text-white">
                            Tactical Map Layers ({Object.values(mapLayers).filter(Boolean).length}/10)
                          </span>
                        </div>
                        <button
                          onClick={() => setLayerMenuOpen(false)}
                          className="text-neutral-400 hover:text-white text-[12px] font-semibold px-2 py-0.5 rounded-md hover:bg-neutral-800 cursor-pointer"
                        >
                          ✕ Close
                        </button>
                      </div>

                      {/* 10 Layers List */}
                      <div className="space-y-1.5 max-h-[340px] overflow-y-auto pr-1">
                        {[
                          { key: 'seaIce', label: 'Sea Ice Concentration', icon: '❄️', desc: 'ResUNet SAR Heatmap' },
                          { key: 'icebergs', label: 'Iceberg Radar Targets', icon: '⛰️', desc: '37 Active Hazards & 72h Cones' },
                          { key: 'risk', label: 'IMO POLARIS Risk Zones', icon: '🛡️', desc: 'RIO Limit Polygons' },
                          { key: 'routes', label: 'Pareto Candidate Routes', icon: '🧭', desc: 'NSGA-II Path Solutions' },
                          { key: 'oceanCurrents', label: 'Ocean Currents & Swell', icon: '🌊', desc: 'Ekman Velocity Vectors' },
                          { key: 'weather', label: 'ECMWF Wind Vectors', icon: '💨', desc: '10m Surface Wind Squalls' },
                          { key: 'bathymetry', label: 'Bathymetric Contours', icon: '🗺️', desc: 'GEBCO Depth Soundings' },
                          { key: 'aisTargets', label: 'AIS Fleet Transponders', icon: '🚢', desc: 'Live Polar Research Vessels' },
                          { key: 'stations', label: 'Antarctic Base Stations', icon: '📍', desc: 'Maitri, Bharati, McMurdo' },
                          { key: 'navAids', label: 'Nautical Aids & Beacons', icon: '⚓', desc: 'Approaches & Lighthouses' },
                        ].map((item) => {
                          const isActive = !!mapLayers[item.key as keyof MapLayerVisibility];
                          return (
                            <div
                              key={item.key}
                              onClick={() => toggleLayer(item.key as keyof MapLayerVisibility)}
                              className={`p-2.5 rounded-[12px] border transition-all cursor-pointer flex items-center justify-between gap-3 select-none ${
                                isActive
                                  ? 'bg-[#2a2a2c] border-[#0066cc] text-white shadow-inner'
                                  : 'bg-[#252527] border-neutral-700 text-neutral-400 hover:text-white hover:border-neutral-600'
                              }`}
                            >
                              <div className="flex items-center gap-2.5 overflow-hidden">
                                <span className="text-[17px]">{item.icon}</span>
                                <div className="text-left leading-tight">
                                  <span className={`text-[13px] font-semibold block ${isActive ? 'text-white' : 'text-neutral-400'}`}>
                                    {item.label}
                                  </span>
                                  <span className="text-[11px] text-neutral-500 font-normal block truncate">
                                    {item.desc}
                                  </span>
                                </div>
                              </div>
                              <span
                                className={`h-4 w-7 rounded-full flex items-center px-0.5 transition-colors shrink-0 ${
                                  isActive ? 'bg-[#0066cc] justify-end' : 'bg-neutral-700 justify-start'
                                }`}
                              >
                                <span className="h-3 w-3 rounded-full bg-white block" />
                              </span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Quick Actions Footer */}
                      <div className="pt-2 border-t border-neutral-700 flex items-center justify-between text-[12px]">
                        <button
                          onClick={toggleAllLayers}
                          className="text-[#2997ff] hover:underline cursor-pointer font-semibold"
                        >
                          {allLayersActive ? 'Disable All' : 'Enable All (10/10)'}
                        </button>
                        <button
                          onClick={() => {
                            setMapLayers({
                              seaIce: true,
                              icebergs: true,
                              routes: true,
                              risk: false,
                              oceanCurrents: false,
                              weather: false,
                              bathymetry: false,
                              stations: true,
                              navAids: false,
                              aisTargets: true,
                            });
                          }}
                          className="text-neutral-400 hover:text-white cursor-pointer"
                        >
                          Reset Default
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button
                onClick={() => {
                  const centerBtn = document.querySelector('.leaflet-control-zoom-in') as HTMLElement;
                  centerBtn?.click();
                }}
                title="Center on Own Ship"
                className="btn-apple-icon !bg-[rgba(210,210,215,0.64)] hover:!bg-[rgba(210,210,215,0.85)] text-[#1d1d1f]"
              >
                <Crosshair className="w-4 h-4 text-[#0066cc]" />
              </button>
            </div>

            {/* Map Legend Capsule (Bottom Left) */}
            <div className="absolute bottom-4 left-4 z-[400] px-4 py-2 rounded-full bg-[#272729]/80 border border-neutral-700 backdrop-blur-md text-[12px] text-[#cccccc] flex items-center gap-4 hidden sm:flex">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#2997ff]" />
                <span className="text-white">SA Agulhas II</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-1 w-5 bg-emerald-400 rounded-full" />
                <span>Active Route</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-rose-500" />
                <span>Critical Iceberg</span>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================================= */}
        {/* 3. KEY METRICS ROW (6 LARGE EASY-TO-READ APPLE CARDS IN ONE ROW)        */}
        {/* ======================================================================= */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {/* Card 1: Sea Ice */}
          <div className="apple-card p-5 space-y-1">
            <span className="text-[12px] text-neutral-500 font-normal uppercase block">
              Sea Ice
            </span>
            <div className="text-[34px] font-semibold text-[#1d1d1f] tracking-tight">
              42%
            </div>
            <span className="text-[12px] text-neutral-500 font-normal block">
              ResUNet Forecast
            </span>
          </div>

          {/* Card 2: Active Icebergs */}
          <div className="apple-card p-5 space-y-1">
            <span className="text-[12px] text-neutral-500 font-normal uppercase block">
              Active Icebergs
            </span>
            <div className="text-[34px] font-semibold text-[#1d1d1f] tracking-tight">
              37 <span className="text-[17px] text-rose-600 font-semibold">(7 Critical)</span>
            </div>
            <span className="text-[12px] text-neutral-500 font-normal block">
              Lagrangian Drift
            </span>
          </div>

          {/* Card 3: Risk Score (Highest Priority - Safe Emerald) */}
          <div className="apple-card p-5 space-y-1 bg-[#fafafc] border-emerald-300">
            <span className="text-[12px] text-emerald-800 font-semibold uppercase block">
              Risk Score (RIO)
            </span>
            <div className="text-[34px] font-semibold text-emerald-700 tracking-tight">
              {riskScore} <span className="text-[17px] text-neutral-400 font-normal">/ 100</span>
            </div>
            <span className="text-[12px] text-emerald-700 font-semibold block">
              Safe &bull; PC3 Valid
            </span>
          </div>

          {/* Card 4: Fuel Efficiency */}
          <div className="apple-card p-5 space-y-1">
            <span className="text-[12px] text-neutral-500 font-normal uppercase block">
              Fuel Efficiency
            </span>
            <div className="text-[34px] font-semibold text-[#1d1d1f] tracking-tight">
              88%
            </div>
            <span className="text-[12px] text-emerald-600 font-normal block">
              +14.2% Savings
            </span>
          </div>

          {/* Card 5: ETA */}
          <div className="apple-card p-5 space-y-1">
            <span className="text-[12px] text-neutral-500 font-normal uppercase block">
              ETA (Bharati Base)
            </span>
            <div className="text-[34px] font-semibold text-[#1d1d1f] tracking-tight">
              4d 06h
            </div>
            <span className="text-[12px] text-[#0066cc] font-normal block">
              14.8 kts SOG
            </span>
          </div>

          {/* Card 6: Distance Left */}
          <div className="apple-card p-5 space-y-1">
            <span className="text-[12px] text-neutral-500 font-normal uppercase block">
              Distance Left
            </span>
            <div className="text-[34px] font-semibold text-[#1d1d1f] tracking-tight">
              840 NM
            </div>
            <span className="text-[12px] text-neutral-500 font-normal block">
              Remaining Voyage
            </span>
          </div>
        </div>

        {/* ======================================================================= */}
        {/* 4 & 5. SPLIT INTELLIGENCE ROW: AI RECOMMENDATION + ALERTS PANEL        */}
        {/* ======================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* 4. AI Recommendation Card (Spans 6 cols) */}
          <div className="lg:col-span-6 apple-card p-6 flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-full bg-[#1d1d1f] text-white flex items-center justify-center font-bold">
                    <Navigation className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-[21px] font-semibold text-[#1d1d1f] tracking-[-0.28px]">
                      Recommended Route
                    </h3>
                    <span className="text-[12px] text-neutral-500 font-normal">
                      NSGA-II Pareto Optimal Solver
                    </span>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[12px] font-semibold">
                  Confidence: 94%
                </span>
              </div>

              {/* Route Details Box */}
              <div className="p-4 rounded-[14px] bg-[#f5f5f7] border border-[#e0e0e0] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[14px] text-neutral-600 font-normal">Route Candidate:</span>
                  <span className="text-[17px] font-semibold text-[#1d1d1f]">Balanced Route</span>
                </div>
                <p className="text-[14px] text-neutral-600 font-normal leading-[1.47]">
                  &ldquo;Best balance of safety and fuel&rdquo; &mdash; Exploits opening coastal leads off Prydz Bay to avoid a 2.2m compressive multi-year pack ice ridge.
                </p>
              </div>
            </div>

            {/* Big Action Blue Pill Button (btn-apple-primary) */}
            <div className="pt-2">
              <button
                onClick={() => {
                  setAcceptedRoute(true);
                  setTimeout(() => setAcceptedRoute(false), 4000);
                }}
                className="w-full btn-apple-primary !min-h-[48px] !h-[48px] !text-[17px] cursor-pointer"
              >
                {acceptedRoute ? (
                  <>
                    <Check className="w-5 h-5 text-white" />
                    <span>Route Accepted & Sent to Autopilot</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Accept Route</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* 5. Alerts Panel (Spans 6 cols - Max 3 Important Alerts) */}
          <div className="lg:col-span-6 apple-card p-6 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#e0e0e0] mb-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                  <h3 className="text-[21px] font-semibold text-[#1d1d1f] tracking-[-0.28px]">
                    Active Alerts
                  </h3>
                </div>
                <span className="text-[12px] text-neutral-500 font-normal">3 Priority Events</span>
              </div>

              {/* 3 Alerts List */}
              <div className="space-y-3">
                {/* Alert 1: RED (Critical Iceberg) */}
                <div className="p-3.5 rounded-[14px] bg-rose-50 border border-rose-200 flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-rose-200 text-rose-800 flex items-center justify-center shrink-0 mt-0.5 text-[12px] font-bold">
                    !
                  </div>
                  <div className="text-[14px] flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-rose-900">Critical Iceberg Approaching</span>
                      <span className="text-[11px] font-semibold text-rose-800 uppercase">
                        Immediate Action
                      </span>
                    </div>
                    <p className="text-neutral-700 text-[13px] mt-0.5 font-normal">
                      Target <strong>BERG-SA-04</strong> at <strong>4.2 NM</strong> &bull; Collision window: <strong>48 min</strong>.
                    </p>
                  </div>
                </div>

                {/* Alert 2: ORANGE (Rising Sea Ice) */}
                <div className="p-3.5 rounded-[14px] bg-amber-50 border border-amber-200 flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center shrink-0 mt-0.5 text-[12px] font-bold">
                    ⚠️
                  </div>
                  <div className="text-[14px] flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-amber-900">Rising Sea Ice on Route</span>
                      <span className="text-[11px] font-semibold text-amber-800 uppercase">
                        Caution
                      </span>
                    </div>
                    <p className="text-neutral-700 text-[13px] mt-0.5 font-normal">
                      First-year ice ridge concentration <strong>+15%</strong> ahead at <strong>68.2°S</strong>.
                    </p>
                  </div>
                </div>

                {/* Alert 3: BLUE (Cache / Offline) */}
                <div className="p-3.5 rounded-[14px] bg-blue-50 border border-blue-200 flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-blue-200 text-[#0066cc] flex items-center justify-center shrink-0 mt-0.5 text-[12px] font-bold">
                    <Info className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-[14px] flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[#0066cc]">Edge Cache Synchronized</span>
                      <span className="text-[11px] font-semibold text-[#0066cc] uppercase">
                        Information
                      </span>
                    </div>
                    <p className="text-neutral-700 text-[13px] mt-0.5 font-normal">
                      Jetson AGX Orin <strong>48.2 GB</strong> cryospheric cache ready for 100% offline dead-reckoning.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================================= */}
        {/* 6. PRIMARY ACTION BUTTONS (BOTTOM - 3 LARGE TOUCH-READY BUTTONS)       */}
        {/* ======================================================================= */}
        <div className="pt-2 pb-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Button 1: Primary Action Blue Pill */}
          <button
            onClick={handleRecalculate}
            disabled={isRecalculating}
            className="btn-apple-primary !min-h-[50px] !h-[50px] !text-[17px] cursor-pointer disabled:opacity-75"
          >
            {isRecalculating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
                <span>Recalculating NSGA-II Solver...</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-5 h-5 text-white" />
                <span>Recalculate Safest Route</span>
              </>
            )}
          </button>

          {/* Button 2: Secondary Ghost Pill */}
          <button
            onClick={() => navigate('/routes')}
            className="btn-apple-secondary !min-h-[50px] !h-[50px] !text-[17px] cursor-pointer"
          >
            <Navigation className="w-4 h-4 text-[#0066cc]" />
            <span>View All Routes</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Button 3: Dark Utility Button */}
          <button
            onClick={() => setIsOnline(!isOnline)}
            className="btn-apple-dark-utility !min-h-[50px] !h-[50px] !rounded-full !text-[17px] cursor-pointer"
          >
            <HardDrive className="w-4 h-4 text-white" />
            <span>{isOnline ? 'Go Offline Mode' : 'Switch to Online Mode'}</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
