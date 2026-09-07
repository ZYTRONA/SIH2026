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
    <div className="bg-white border border-slate-200/90 shadow-xs rounded-xl p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-sky-50 border border-sky-200 text-sky-700">
            <BrainCircuit className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold font-sans text-slate-900">
              AI Forecast Insight
            </h3>
            <span className="text-[10px] font-mono text-sky-700 uppercase tracking-wider font-semibold">
              Deep Spatiotemporal Feature Attribution
            </span>
          </div>
        </div>

        <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono bg-sky-50 text-sky-700 border border-sky-200 font-semibold">
          ACTIVE INFERENCE
        </span>
      </div>

      {/* Core AI Insight Readout Quote */}
      <div className="p-3.5 rounded-lg bg-sky-50/70 border border-sky-200/80 space-y-1.5">
        <span className="text-[10px] font-mono uppercase tracking-wider text-sky-700 font-bold flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-sky-600" />
          Model Synthesized Insight
        </span>
        <p className="text-xs text-slate-800 font-sans leading-relaxed italic font-medium">
          "Model predicts increasing sea-ice concentration along the eastern approach during the next 48 hours."
        </p>
      </div>

      {/* Model Spec & Horizon Breakdown */}
      <div className="grid grid-cols-2 gap-2 text-xs font-mono">
        <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
          <span className="text-[10px] text-slate-500 block">MODEL ARCHITECTURE</span>
          <span className="text-slate-900 font-bold text-sm">ResUNet</span>
          <span className="text-[9px] text-slate-500 block mt-0.5">Residual U-Net ConvLSTM</span>
        </div>

        <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
          <span className="text-[10px] text-slate-500 block">FORECAST HORIZON</span>
          <span className="text-sky-700 font-bold text-sm">
            {activeHorizon === 'Current' ? '72 hours' : activeHorizon === '+7 Days' ? '7 Days' : '72 hours'}
          </span>
          <span className="text-[9px] text-slate-500 block mt-0.5">2.5km Polar Grid</span>
        </div>
      </div>

      {/* Inputs Breakdown requested by Prompt */}
      <div className="space-y-2 pt-1 border-t border-slate-100">
        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold px-1">
          Multi-Modal Input Feeds
        </span>

        <div className="space-y-1.5 text-xs font-mono">
          {/* Satellite */}
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-2.5">
            <Satellite className="w-4 h-4 text-sky-600 flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-slate-800 font-bold text-[11px]">Satellite</div>
              <div className="text-[10px] text-slate-500">
                Sentinel-1 SAR, AMSR2 Microwave, CryoSat-2 Altimetry
              </div>
            </div>
          </div>

          {/* Oceanographic */}
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-2.5">
            <Waves className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-slate-800 font-bold text-[11px]">Oceanographic</div>
              <div className="text-[10px] text-slate-500">
                HYCOM Ocean Currents, Copernicus Marine SST & Salinity
              </div>
            </div>
          </div>

          {/* Meteorological */}
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-2.5">
            <CloudSun className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-slate-800 font-bold text-[11px]">Meteorological</div>
              <div className="text-[10px] text-slate-500">
                ECMWF HRES 10m Wind Fields, 2m Air Temp, Surface Pressure
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Model Performance provenance */}
      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between text-[10px] font-mono text-slate-600">
        <span>DICE SCORE: <strong className="text-slate-800">{RESUNET_MODEL_CONFIG.accuracyMetrics.diceScore}</strong></span>
        <span>MAE: <strong className="text-slate-800">{RESUNET_MODEL_CONFIG.accuracyMetrics.meanAbsoluteErrorPct}%</strong></span>
        <span>F1: <strong className="text-slate-800">{RESUNET_MODEL_CONFIG.accuracyMetrics.f1Score}</strong></span>
      </div>
    </div>
  );
};
