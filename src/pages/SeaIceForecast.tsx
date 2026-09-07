import React, { useState, useEffect } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { AntarcticMap } from '@/components/map/AntarcticMap';
import {
  ForecastTimelineControls,
  SeaIceSummarySidebar,
  SeaIceForecastChart,
  AIForecastInsightCard,
} from '@/components/forecast';
import { ForecastHorizonKey } from '@/data/seaIceData';
import { Sparkles, Snowflake, Radio } from 'lucide-react';

export const SeaIceForecast: React.FC = () => {
  const [activeHorizon, setActiveHorizon] = useState<ForecastHorizonKey>('+48h');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Auto-play timer through horizons
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      const sequence: ForecastHorizonKey[] = [
        'Current',
        '+24h',
        '+48h',
        '+72h',
        '+7 Days',
      ];
      interval = setInterval(() => {
        setActiveHorizon((prev) => {
          const nextIndex = (sequence.indexOf(prev) + 1) % sequence.length;
          return sequence[nextIndex];
        });
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <PageContainer
      title="Sea-Ice Forecast Center"
      subtitle="Spatiotemporal AI Forecasting of Antarctic Sea-Ice Concentration, Thickness Dynamics & Uncertainty Boundaries"
      actions={
        <div className="flex items-center gap-2">
          {/* Prototype AI Simulation Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-xs font-mono text-sky-700 font-semibold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>Prototype AI Simulation</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-mono text-slate-700 shadow-2xs">
            <Snowflake className="w-3.5 h-3.5 text-sky-600" />
            <span>ResUNet v3.2 <strong className="text-sky-800">ENSEMBLE ACTIVE</strong></span>
          </div>
        </div>
      }
    >
      <div className="space-y-5">
        {/* 1. Top Horizontal Timeline Controls */}
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

        {/* 2. Main 2-Column Operational Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Dominant Antarctic Map & Recharts Forecast Chart */}
          <div className="lg:col-span-8 space-y-6">
            {/* Live Antarctic Tactical Map */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono px-1">
                <span className="text-slate-300 font-bold flex items-center gap-1.5">
                  <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                  ANTARCTIC SAR SEA-ICE PROJECTION [{activeHorizon.toUpperCase()}]
                </span>
                <span className="text-slate-400">
                  RESOLUTION: 2.5 KM POLAR GRID
                </span>
              </div>
              <AntarcticMap />
            </div>

            {/* Sea-Ice Concentration Forecast Chart with Uncertainty Range */}
            <SeaIceForecastChart />
          </div>

          {/* Right Column: Forecast Summary Sidebar & ResUNet AI Insights Card */}
          <div className="lg:col-span-4 space-y-6 flex flex-col justify-between">
            {/* Forecast Summary Matrix */}
            <SeaIceSummarySidebar activeHorizon={activeHorizon} />

            {/* AI Forecast Insight & Model Architecture Card */}
            <AIForecastInsightCard activeHorizon={activeHorizon} />
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default SeaIceForecast;
