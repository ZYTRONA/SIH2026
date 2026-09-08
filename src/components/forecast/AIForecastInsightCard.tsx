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
    <div className="bg-white border border-[#e0e0e0] rounded-[18px] p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#f0f0f0]">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-full bg-[#f5f5f7] border border-[#e0e0e0] text-[#0066cc]">
            <BrainCircuit className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-[15px] font-semibold text-[#1d1d1f] tracking-[-0.2px]">
              AI Forecast Insight
            </h3>
            <span className="text-[11px] text-neutral-500 font-normal">
              Deep Spatiotemporal Feature Attribution
            </span>
          </div>
        </div>

        <span className="px-3 py-0.5 rounded-full text-[11px] font-semibold bg-[#f0f7ff] text-[#0066cc] border border-[#d0e6ff]">
          ACTIVE INFERENCE
        </span>
      </div>

      {/* Core AI Insight Readout Quote */}
      <div className="p-4 rounded-[14px] bg-[#fafafc] border border-[#e0e0e0] space-y-1.5">
        <span className="text-[11px] uppercase tracking-wider text-[#1d1d1f] font-semibold flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#0066cc]" />
          Model Synthesized Insight
        </span>
        <p className="text-[13px] text-neutral-700 leading-relaxed italic font-normal">
          &quot;Model predicts increasing sea-ice concentration along the eastern approach during the next 48 hours.&quot;
        </p>
      </div>

      {/* Model Spec & Horizon Breakdown */}
      <div className="grid grid-cols-2 gap-2 text-[12px]">
        <div className="p-3 rounded-[12px] bg-[#fafafc] border border-[#e0e0e0]">
          <span className="text-[11px] text-neutral-500 block font-normal">MODEL ARCHITECTURE</span>
          <span className="text-[#1d1d1f] font-semibold text-[15px]">ResUNet</span>
          <span className="text-[10px] text-neutral-500 block mt-0.5 font-normal">Residual U-Net ConvLSTM</span>
        </div>

        <div className="p-3 rounded-[12px] bg-[#fafafc] border border-[#e0e0e0]">
          <span className="text-[11px] text-neutral-500 block font-normal">FORECAST HORIZON</span>
          <span className="text-[#1d1d1f] font-semibold text-[15px]">
            {activeHorizon === 'Current' ? '72 hours' : activeHorizon === '+7 Days' ? '7 Days' : '72 hours'}
          </span>
          <span className="text-[10px] text-neutral-500 block mt-0.5 font-normal">2.5km Polar Grid</span>
        </div>
      </div>

      {/* Inputs Breakdown */}
      <div className="space-y-2 pt-2 border-t border-[#f0f0f0]">
        <span className="text-[11px] uppercase tracking-wider text-neutral-500 font-semibold px-1">
          Multi-Modal Input Feeds
        </span>

        <div className="space-y-2 text-[12px]">
          {/* Satellite */}
          <div className="p-3 rounded-[12px] bg-[#fafafc] border border-[#e0e0e0] flex items-start gap-2.5">
            <Satellite className="w-4 h-4 text-[#0066cc] shrink-0 mt-0.5" />
            <div>
              <div className="text-[#1d1d1f] font-semibold text-[12px]">Satellite Feeds</div>
              <div className="text-[11px] text-neutral-500 font-normal">
                Sentinel-1 SAR, AMSR2 Microwave, CryoSat-2 Altimetry
              </div>
            </div>
          </div>

          {/* Oceanographic */}
          <div className="p-3 rounded-[12px] bg-[#fafafc] border border-[#e0e0e0] flex items-start gap-2.5">
            <Waves className="w-4 h-4 text-[#0066cc] shrink-0 mt-0.5" />
            <div>
              <div className="text-[#1d1d1f] font-semibold text-[12px]">Oceanographic Model</div>
              <div className="text-[11px] text-neutral-500 font-normal">
                HYCOM Ocean Currents, Copernicus Marine SST & Salinity
              </div>
            </div>
          </div>

          {/* Meteorological */}
          <div className="p-3 rounded-[12px] bg-[#fafafc] border border-[#e0e0e0] flex items-start gap-2.5">
            <CloudSun className="w-4 h-4 text-[#0066cc] shrink-0 mt-0.5" />
            <div>
              <div className="text-[#1d1d1f] font-semibold text-[12px]">Meteorological Grid</div>
              <div className="text-[11px] text-neutral-500 font-normal">
                ECMWF HRES 10m Wind Fields, 2m Air Temp, Surface Pressure
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Model Performance provenance */}
      <div className="p-3 rounded-[12px] bg-[#fafafc] border border-[#e0e0e0] flex items-center justify-between text-[11px] text-neutral-600">
        <span>DICE: <strong className="text-[#1d1d1f] font-semibold">{RESUNET_MODEL_CONFIG.accuracyMetrics.diceScore}</strong></span>
        <span>MAE: <strong className="text-[#1d1d1f] font-semibold">{RESUNET_MODEL_CONFIG.accuracyMetrics.meanAbsoluteErrorPct}%</strong></span>
        <span>F1: <strong className="text-[#1d1d1f] font-semibold">{RESUNET_MODEL_CONFIG.accuracyMetrics.f1Score}</strong></span>
      </div>
    </div>
  );
};
