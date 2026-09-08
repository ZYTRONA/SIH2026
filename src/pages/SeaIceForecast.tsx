import React, { useState, useEffect, useMemo } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { AntarcticMap } from '@/components/map/AntarcticMap';
import {
  ForecastTimelineControls,
  SeaIceSummarySidebar,
  SeaIceForecastChart,
  AIForecastInsightCard,
  PolarCodeMatrix,
} from '@/components/forecast';
import {
  ForecastHorizonKey,
  SEA_ICE_SUMMARIES,
} from '@/data/seaIceData';
import {
  VESSEL_STATE_DATA,
  ROUTE_PATHS_DATA,
  ICEBERGS_DATA,
} from '@/data/mapData';
import { SeaIceConcentrationFeature } from '@/types/map';
import {
  RefreshCw,
  Download,
  Snowflake,
  Wind,
  Crosshair,
  Compass,
  AlertTriangle,
  Sliders,
  Navigation,
  Radio,
} from 'lucide-react';

const HORIZON_SEQUENCE: ForecastHorizonKey[] = ['Current', '+24h', '+48h', '+72h', '+7 Days'];

export const SeaIceForecast: React.FC = () => {
  const [activeHorizon, setActiveHorizon] = useState<ForecastHorizonKey>('Current');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [selectedRouteKey, setSelectedRouteKey] = useState<string>('route-balanced');
  const [sarThreshold, setSarThreshold] = useState<number>(-14.5);
  const [thicknessOverride, setThicknessOverride] = useState<number>(1.25);
  const [driftVelocityOverride, setDriftVelocityOverride] = useState<number>(1.2);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // Auto-play forecast horizon timeline progression
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setActiveHorizon((current) => {
          const currentIndex = HORIZON_SEQUENCE.indexOf(current);
          const nextIndex = (currentIndex + 1) % HORIZON_SEQUENCE.length;
          return HORIZON_SEQUENCE[nextIndex];
        });
      }, 2500);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);

  // Sync thickness slider with active horizon baseline
  useEffect(() => {
    const summary = SEA_ICE_SUMMARIES[activeHorizon];
    if (summary) {
      setThicknessOverride(summary.estimatedMeanThicknessM);
    }
  }, [activeHorizon]);

  // Dynamic Sea Ice Tiers adapted for the active horizon
  const dynamicSeaIceTiers: SeaIceConcentrationFeature[] = useMemo(() => {
    const summary = SEA_ICE_SUMMARIES[activeHorizon];
    const avg = summary.avgConcentrationPct;

    return [
      {
        id: 'ice-tier-1',
        zoneName: 'Southern Ocean Marginal Drift',
        concentrationTier: '0–20%',
        concentrationPct: Math.round(avg * 0.28),
        iceStage: 'Open Drift & Grease Ice',
        color: '#0284C7',
        fillOpacity: 0.18 + (activeHorizon !== 'Current' ? 0.04 : 0),
        polygonPoints: '150,80 400,120 700,100 880,180 820,320 540,240 220,200 120,120',
      },
      {
        id: 'ice-tier-2',
        zoneName: 'Outer Pack Channel (Bravo Corridor)',
        concentrationTier: '20–50%',
        concentrationPct: Math.round(avg * 0.55),
        iceStage: 'First-Year Thin Floes',
        color: '#0EA5E9',
        fillOpacity: 0.28 + (activeHorizon !== 'Current' ? 0.05 : 0),
        polygonPoints: '220,200 540,240 820,320 860,450 720,480 420,380 260,300',
      },
      {
        id: 'ice-tier-3',
        zoneName: 'Prydz Bay High-Density Pack',
        concentrationTier: '50–80%',
        concentrationPct: summary.easternApproachPct,
        iceStage: 'First-Year Medium/Thick Pack',
        color: '#38BDF8',
        fillOpacity: 0.38 + (activeHorizon !== 'Current' ? 0.06 : 0),
        polygonPoints: '260,300 420,380 720,480 780,620 640,600 440,520 320,420',
      },
      {
        id: 'ice-tier-4',
        zoneName: 'Coastal Fast Ice & Amery Shelf',
        concentrationTier: '80–100%',
        concentrationPct: summary.amerySectorPct,
        iceStage: 'Consolidated Multi-Year Fast Ice',
        color: '#BAE6FD',
        fillOpacity: 0.52 + (activeHorizon !== 'Current' ? 0.05 : 0),
        polygonPoints: '440,520 640,600 780,620 820,740 760,820 600,760 480,680',
      },
    ];
  }, [activeHorizon]);

  const handleRefreshData = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const handleExportData = () => {
    const jsonStr = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(
        {
          horizon: activeHorizon,
          summary: SEA_ICE_SUMMARIES[activeHorizon],
          vessel: VESSEL_STATE_DATA,
          seaIceTiers: dynamicSeaIceTiers,
          icebergsTracked: ICEBERGS_DATA.length,
          routes: ROUTE_PATHS_DATA,
          exportTimestamp: new Date().toISOString(),
        },
        null,
        2
      )
    )}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonStr);
    downloadAnchor.setAttribute('download', `POLARIS_SeaIce_Forecast_${activeHorizon}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const currentSummary = SEA_ICE_SUMMARIES[activeHorizon];

  return (
    <PageContainer
      title="Sea-Ice Forecast & Spatiotemporal Matrix"
      subtitle="High-resolution Sentinel-1 SAR radar fusion, ResUNet ConvLSTM spatiotemporal forecasting, hydrodynamic drift vectors, and voyage corridor analysis."
      badge={`FORECAST ${activeHorizon.toUpperCase()} ACTIVE`}
      badgeType="active"
      actions={
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportData}
            className="btn-apple-secondary flex items-center gap-1.5 !h-9 !px-3.5 !text-[12px] cursor-pointer"
            title="Export GeoTIFF and NetCDF4 Data Pack"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export Dataset</span>
          </button>
          <button
            onClick={handleRefreshData}
            disabled={isRefreshing}
            className="btn-apple-primary flex items-center gap-1.5 !h-9 !px-4 !text-[12px] cursor-pointer"
            title="Trigger Sentinel-1 & AMSR2 Ingestion Pipeline"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Ingesting SAR...' : 'Sync Radar Pass'}</span>
          </button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* 1. Top Master Timeline Controller Deck */}
        <ForecastTimelineControls
          activeHorizon={activeHorizon}
          onSelectHorizon={(h) => {
            setActiveHorizon(h);
            setIsPlaying(false);
          }}
          isPlaying={isPlaying}
          onTogglePlay={() => setIsPlaying(!isPlaying)}
          onReset={() => {
            setActiveHorizon('Current');
            setIsPlaying(false);
          }}
        />

        {/* 2. Main Map & Forecast Intelligence Deck */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Center / Left: Interactive Antarctic Sea-Ice & Nautical Map (8 cols) */}
          <div className="lg:col-span-8 space-y-3">
            {/* Map Header Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#0066cc]" />
                <h3 className="text-[14px] font-semibold text-[#1d1d1f]">
                  Antarctic Sea-Ice & Nautical Chart (OpenSeaMap)
                </h3>
              </div>

              <div className="flex items-center gap-3 text-[11px] font-mono text-neutral-500 flex-wrap">
                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#f5f5f7] border border-[#e0e0e0] text-[#1d1d1f]">
                  <Crosshair className="w-3 h-3 text-[#0066cc]" />
                  <span>SHIP: {Math.abs(VESSEL_STATE_DATA.lat).toFixed(2)}°S, {VESSEL_STATE_DATA.lng.toFixed(2)}°E</span>
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  <Radio className="w-3 h-3 text-emerald-600 animate-pulse" />
                  <span>HORIZON: {activeHorizon}</span>
                </div>
              </div>
            </div>

            {/* Interactive Antarctic Map with Live Ship, Sea-Ice Heatmap, Routes, Icebergs & Stations */}
            <AntarcticMap
              customSeaIce={dynamicSeaIceTiers}
              selectedRouteId={selectedRouteKey}
              onSelectRoute={setSelectedRouteKey}
              heightClass="h-[560px] sm:h-[620px] lg:h-[700px]"
            />

            {/* Quick Route Selector Sub-Bar */}
            <div className="p-3 rounded-[14px] bg-white border border-[#e0e0e0] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[12px]">
              <div className="flex items-center gap-2">
                <Navigation className="w-4 h-4 text-[#0066cc]" />
                <span className="font-semibold text-[#1d1d1f]">Corridor Traversal:</span>
                <span className="text-neutral-500">
                  Select Pareto route to verify ice lead penetration for {activeHorizon}
                </span>
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto">
                {ROUTE_PATHS_DATA.map((r) => {
                  const isSelected = r.id === selectedRouteKey;
                  return (
                    <button
                      key={r.id}
                      onClick={() => setSelectedRouteKey(r.id)}
                      className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer whitespace-nowrap active:scale-95 ${
                        isSelected
                          ? 'bg-[#0066cc] text-white shadow-xs'
                          : 'bg-[#f5f5f7] hover:bg-[#ebebed] text-[#1d1d1f] border border-[#e0e0e0]'
                      }`}
                    >
                      {r.name} ({r.safetyScore}%)
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Sea Ice Summary Sidebar & Physics Parameters (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Spatiotemporal Summary Card */}
            <SeaIceSummarySidebar activeHorizon={activeHorizon} />

            {/* Dynamic SAR & Physics Calibration Panel */}
            <div className="bg-white border border-[#e0e0e0] rounded-[18px] p-5 space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-[#f0f0f0]">
                <Sliders className="w-4 h-4 text-[#0066cc]" />
                <h4 className="text-[14px] font-semibold text-[#1d1d1f]">
                  Radar & Ice Physics Controls
                </h4>
              </div>

              <div className="space-y-4 text-[12px]">
                {/* SAR Backscatter Threshold */}
                <div className="p-3.5 rounded-[14px] bg-[#fafafc] border border-[#e0e0e0] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[#1d1d1f] font-semibold flex items-center gap-1.5">
                      <Radio className="w-3.5 h-3.5 text-[#0066cc]" />
                      SAR Backscatter Threshold (σ₀)
                    </span>
                    <span className="font-mono font-bold text-[#0066cc]">
                      {sarThreshold} dB
                    </span>
                  </div>
                  <input
                    type="range"
                    min={-24}
                    max={-8}
                    step={0.5}
                    value={sarThreshold}
                    onChange={(e) => setSarThreshold(Number(e.target.value))}
                    className="w-full h-1.5 bg-[#e0e0e0] rounded-full appearance-none cursor-pointer accent-[#0066cc]"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-neutral-400">
                    <span>-24 dB (Open Water)</span>
                    <span>-8 dB (Deformed Ridge)</span>
                  </div>
                </div>

                {/* Estimated Ice Thickness Slider */}
                <div className="p-3.5 rounded-[14px] bg-[#fafafc] border border-[#e0e0e0] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[#1d1d1f] font-semibold flex items-center gap-1.5">
                      <Snowflake className="w-3.5 h-3.5 text-[#0066cc]" />
                      Model Ice Thickness
                    </span>
                    <span className="font-mono font-bold text-[#0066cc]">
                      {thicknessOverride.toFixed(2)} m
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0.4}
                    max={3.0}
                    step={0.05}
                    value={thicknessOverride}
                    onChange={(e) => setThicknessOverride(Number(e.target.value))}
                    className="w-full h-1.5 bg-[#e0e0e0] rounded-full appearance-none cursor-pointer accent-[#0066cc]"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-neutral-400">
                    <span>0.4 m (Grease)</span>
                    <span>3.0 m (Multi-Year)</span>
                  </div>
                </div>

                {/* NSIDC Drift Velocity Slider */}
                <div className="p-3.5 rounded-[14px] bg-[#fafafc] border border-[#e0e0e0] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[#1d1d1f] font-semibold flex items-center gap-1.5">
                      <Wind className="w-3.5 h-3.5 text-emerald-600" />
                      Katabatic Drift Velocity
                    </span>
                    <span className="font-mono font-bold text-emerald-700">
                      {driftVelocityOverride.toFixed(1)} kts
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0.0}
                    max={4.0}
                    step={0.1}
                    value={driftVelocityOverride}
                    onChange={(e) => setDriftVelocityOverride(Number(e.target.value))}
                    className="w-full h-1.5 bg-[#e0e0e0] rounded-full appearance-none cursor-pointer accent-emerald-600"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-neutral-400">
                    <span>0.0 kts (Calm)</span>
                    <span>4.0 kts (Gale Drift)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Critical Compression Alert Card */}
            <div className="p-5 rounded-[18px] bg-rose-50/80 border border-rose-200 text-[#1d1d1f] space-y-2.5">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                <span className="text-[12px] uppercase tracking-wider font-semibold text-rose-800">
                  Critical Ice Compression Advisory
                </span>
              </div>
              <p className="text-[14px] font-semibold text-rose-950 font-mono">
                {activeHorizon === '+72h' || activeHorizon === '+7 Days'
                  ? 'Severe Convergence in Sector Bravo'
                  : 'Moderate Lead Closure in Eastern Approach'}
              </p>
              <p className="text-[12px] text-neutral-600 leading-relaxed font-normal">
                {currentSummary.insight}
              </p>
              <div className="pt-2 border-t border-rose-200/60 flex items-center justify-between text-[11px] font-mono">
                <span className="text-rose-700 font-semibold">Recommended Speed: &le; 10 kts</span>
                <span className="text-neutral-500">PC3 Operational</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Bottom Row: 72H Deep Spatiotemporal Chart & AI Insight Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Sea-Ice 72H Forecast Chart (7 cols) */}
          <div className="lg:col-span-7">
            <SeaIceForecastChart />
          </div>

          {/* Right: AI Forecast Model Architecture & Inputs (5 cols) */}
          <div className="lg:col-span-5">
            <AIForecastInsightCard activeHorizon={activeHorizon} />
          </div>
        </div>

        {/* 4. Polar Code PC1–PC7 Operability Matrix */}
        <PolarCodeMatrix activeHorizon={activeHorizon} />
      </div>
    </PageContainer>
  );
};

export default SeaIceForecast;
