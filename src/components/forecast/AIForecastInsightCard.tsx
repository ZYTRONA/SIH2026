import React from 'react';
import { BrainCircuit, Satellite, Waves, CloudSun, CheckCircle2 } from 'lucide-react';
import { RESUNET_MODEL_CONFIG, ForecastHorizonKey } from '@/data/seaIceData';

interface AIForecastInsightCardProps {
  activeHorizon?: ForecastHorizonKey;
}

export const AIForecastInsightCard: React.FC<AIForecastInsightCardProps> = ({
  activeHorizon = '+48h',
}) => {
  return (
    <div className="polar-panel p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-polar-700/60">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded bg-ice-500/10 border border-ice-500/30 text-ice-400">
            <BrainCircuit className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold font-sans text-slate-100">
              AI Forecast Insight
            </h3>
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">
              Deep Spatiotemporal Feature Attribution
            </span>
          </div>
        </div>

        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-semibold">
          ACTIVE INFERENCE
        </span>
      </div>

      {/* Core AI Insight Readout Quote requested by Prompt */}
      <div className="p-3.5 rounded-lg bg-ice-950/30 border border-ice-500/40 space-y-1.5">
        <span className="text-[10px] font-mono uppercase tracking-wider text-ice-400 font-bold flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-ice-400" />
          Model Synthesized Insight
        </span>
        <p className="text-xs text-slate-100 font-sans leading-relaxed italic">
          "Model predicts increasing sea-ice concentration along the eastern approach during the next 48 hours."
        </p>
      </div>

      {/* Model Spec & Horizon Breakdown */}
      <div className="grid grid-cols-2 gap-2 text-xs font-mono">
        <div className="p-2.5 rounded bg-polar-900/80 border border-polar-700/50">
          <span className="text-[10px] text-slate-400 block">MODEL ARCHITECTURE</span>
          <span className="text-slate-200 font-bold text-sm">ResUNet</span>
          <span className="text-[9px] text-slate-400 block mt-0.5">Residual U-Net ConvLSTM</span>
        </div>

        <div className="p-2.5 rounded bg-polar-900/80 border border-polar-700/50">
          <span className="text-[10px] text-slate-400 block">FORECAST HORIZON</span>
          <span className="text-cyan-300 font-bold text-sm">
            {activeHorizon === 'Current' ? '72 hours' : activeHorizon === '+7 Days' ? '7 Days' : '72 hours'}
          </span>
          <span className="text-[9px] text-slate-400 block mt-0.5">2.5km Polar Grid</span>
        </div>
      </div>

      {/* Inputs Breakdown requested by Prompt */}
      <div className="space-y-2 pt-1 border-t border-polar-800">
        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold px-1">
          Multi-Modal Input Feeds
        </span>

        <div className="space-y-1.5 text-xs font-mono">
          {/* Satellite */}
          <div className="p-2 rounded bg-polar-900/60 border border-polar-700/40 flex items-start gap-2.5">
            <Satellite className="w-4 h-4 text-ice-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-slate-200 font-bold text-[11px]">Satellite</div>
              <div className="text-[10px] text-slate-400">
                Sentinel-1 SAR, AMSR2 Microwave, CryoSat-2 Altimetry
              </div>
            </div>
          </div>

          {/* Oceanographic */}
          <div className="p-2 rounded bg-polar-900/60 border border-polar-700/40 flex items-start gap-2.5">
            <Waves className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-slate-200 font-bold text-[11px]">Oceanographic</div>
              <div className="text-[10px] text-slate-400">
                HYCOM Ocean Currents, Copernicus Marine SST & Salinity
              </div>
            </div>
          </div>

          {/* Meteorological */}
          <div className="p-2 rounded bg-polar-900/60 border border-polar-700/40 flex items-start gap-2.5">
            <CloudSun className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-slate-200 font-bold text-[11px]">Meteorological</div>
              <div className="text-[10px] text-slate-400">
                ECMWF HRES 10m Wind Fields, 2m Air Temp, Surface Pressure
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Model Performance provenance */}
      <div className="p-2.5 rounded bg-polar-950/60 border border-polar-800 flex items-center justify-between text-[10px] font-mono text-slate-400">
        <span>DICE SCORE: {RESUNET_MODEL_CONFIG.accuracyMetrics.diceScore}</span>
        <span>MAE: {RESUNET_MODEL_CONFIG.accuracyMetrics.meanAbsoluteErrorPct}%</span>
        <span>F1: {RESUNET_MODEL_CONFIG.accuracyMetrics.f1Score}</span>
      </div>
    </div>
  );
};
