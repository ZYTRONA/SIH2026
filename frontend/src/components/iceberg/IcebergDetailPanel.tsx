import React from 'react';
import { DetailedIceberg } from '@/data/icebergIntelligenceData';
import {
  Mountain,
  Compass,
  Gauge,
  Ruler,
  ShieldAlert,
  Zap,
  Navigation,
  Radar,
  X,
} from 'lucide-react';

interface IcebergDetailPanelProps {
  iceberg: DetailedIceberg;
  onClose?: () => void;
  onLockRadar?: (code: string) => void;
}

export const IcebergDetailPanel: React.FC<IcebergDetailPanelProps> = ({
  iceberg,
  onClose,
  onLockRadar,
}) => {
  const getRiskBadge = () => {
    switch (iceberg.riskLevel) {
      case 'CRITICAL':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'HIGH':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'WARNING':
      case 'MODERATE':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    }
  };

  return (
    <div className="bg-white border border-[#e0e0e0] rounded-[18px] p-5 space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between pb-3 border-b border-[#f0f0f0]">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-full bg-[#f5f5f7] border border-[#e0e0e0] text-[#0066cc]">
            <Mountain className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-[17px] font-semibold text-[#1d1d1f] font-mono">
                {iceberg.code}
              </h3>
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${getRiskBadge()}`}>
                {iceberg.riskLevel} RISK
              </span>
            </div>
            <span className="text-[12px] text-neutral-500 font-normal">
              {iceberg.name} &bull; {iceberg.detectionSource}
            </span>
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-[#1d1d1f] rounded-full hover:bg-[#f5f5f7] transition-colors active:scale-95"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* 4 Core Dimensions & Kinematics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-[12px]">
        {/* Length */}
        <div className="p-3 rounded-[12px] bg-[#fafafc] border border-[#e0e0e0] space-y-0.5">
          <div className="flex items-center gap-1 text-[11px] text-neutral-500 font-normal">
            <Ruler className="w-3.5 h-3.5 text-[#0066cc]" />
            <span>LENGTH</span>
          </div>
          <div className="text-[16px] font-semibold text-[#1d1d1f]">
            {iceberg.lengthKm} km
          </div>
          <span className="text-[10px] text-neutral-400 font-normal">Area: {iceberg.areaKm2} km²</span>
        </div>

        {/* Velocity */}
        <div className="p-3 rounded-[12px] bg-[#fafafc] border border-[#e0e0e0] space-y-0.5">
          <div className="flex items-center gap-1 text-[11px] text-neutral-500 font-normal">
            <Gauge className="w-3.5 h-3.5 text-[#0066cc]" />
            <span>VELOCITY</span>
          </div>
          <div className="text-[16px] font-semibold text-[#1d1d1f]">
            {iceberg.velocityMs} m/s
          </div>
          <span className="text-[10px] text-neutral-400 font-normal">({iceberg.velocityKts} kts)</span>
        </div>

        {/* Direction */}
        <div className="p-3 rounded-[12px] bg-[#fafafc] border border-[#e0e0e0] space-y-0.5">
          <div className="flex items-center gap-1 text-[11px] text-neutral-500 font-normal">
            <Compass className="w-3.5 h-3.5 text-[#0066cc]" />
            <span>DIRECTION</span>
          </div>
          <div className="text-[16px] font-semibold text-[#1d1d1f]">
            {iceberg.directionCompass} ({iceberg.directionDeg}°)
          </div>
          <span className="text-[10px] text-neutral-400 font-normal">True Heading</span>
        </div>

        {/* Risk */}
        <div className="p-3 rounded-[12px] bg-[#fafafc] border border-[#e0e0e0] space-y-0.5">
          <div className="flex items-center gap-1 text-[11px] text-neutral-500 font-normal">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
            <span>RISK</span>
          </div>
          <div className="text-[16px] font-semibold text-rose-700">
            {iceberg.riskLevel}
          </div>
          <span className="text-[10px] text-neutral-400 font-normal">Threat Level</span>
        </div>
      </div>

      {/* Collision Risk & Route Proximity */}
      <div className="grid grid-cols-2 gap-3 p-4 rounded-[14px] bg-[#fafafc] border border-[#e0e0e0]">
        <div className="space-y-1">
          <span className="text-[11px] text-neutral-500 uppercase tracking-wider block font-normal">
            Collision Probability
          </span>
          <div className="text-[22px] font-semibold text-rose-700">
            {iceberg.collisionProbabilityPct}%
          </div>
          <span className="text-[11px] text-neutral-400 font-normal">
            Within 72h corridor
          </span>
        </div>

        <div className="space-y-1 border-l border-[#e0e0e0] pl-4">
          <span className="text-[11px] text-neutral-500 uppercase tracking-wider block font-normal">
            Route Distance
          </span>
          <div className="text-[22px] font-semibold text-[#1d1d1f]">
            {iceberg.routeDistanceKm} km
          </div>
          <span className="text-[11px] text-neutral-400 font-normal">
            Closest Point of Approach (CPA)
          </span>
        </div>
      </div>

      {/* Trajectory Timeline: Current Position, +24h, +48h, +72h */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-[12px]">
          <span className="text-[#1d1d1f] font-semibold uppercase tracking-wider flex items-center gap-1.5 text-[11px]">
            <Navigation className="w-3.5 h-3.5 text-[#0066cc]" />
            Predicted 72-Hour Drift Trajectory
          </span>
          <span className="text-[11px] text-[#0066cc] bg-[#f0f7ff] border border-[#d0e6ff] px-2 py-0.5 rounded-full font-semibold">4 STAGES</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {iceberg.trajectory.map((pt, idx) => (
            <div
              key={pt.stage}
              className={`p-3 rounded-[12px] border text-[11px] space-y-1 ${
                idx === 0
                  ? 'bg-[#f0f7ff] border-[#0066cc]'
                  : 'bg-[#fafafc] border-[#e0e0e0]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#1d1d1f]">
                  {pt.stage}
                </span>
                <span className="text-neutral-500 font-normal">
                  T+{pt.hourOffset}h
                </span>
              </div>
              <div className="text-[#1d1d1f] font-mono">
                {Math.abs(pt.lat).toFixed(2)}°S, {pt.lng.toFixed(2)}°E
              </div>
              <div className="text-amber-700 font-normal">
                Route: {pt.routeDistanceKm} km
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Explanation Card */}
      <div className="p-4 rounded-[14px] bg-[#fafafc] border border-[#e0e0e0] space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[11px] uppercase tracking-wider text-[#1d1d1f] font-semibold flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-[#0066cc]" />
            AI Drift Explanation
          </span>
          <span className="text-[11px] font-semibold text-[#0066cc] bg-[#f0f7ff] px-2.5 py-0.5 rounded-full border border-[#d0e6ff]">
            Confidence: {iceberg.confidencePct}%
          </span>
        </div>

        {/* AI Quote */}
        <p className="text-[13px] text-neutral-700 leading-relaxed italic font-normal">
          &quot;{iceberg.aiExplanation}&quot;
        </p>

        {/* Model Spec */}
        <div className="pt-2 border-t border-[#e0e0e0] space-y-1 text-[11px] text-neutral-600">
          <div className="flex items-center justify-between">
            <span>Model:</span>
            <span className="text-[#1d1d1f] font-semibold">{iceberg.modelName}</span>
          </div>

          {/* Forcing Weights */}
          <div className="grid grid-cols-3 gap-2 pt-1 text-[11px] text-center">
            <div className="p-2 rounded-[10px] bg-white border border-[#e0e0e0]">
              <span className="text-neutral-500 block font-normal text-[10px]">Current Drag</span>
              <span className="text-[#1d1d1f] font-semibold">{iceberg.oceanCurrentForcingPct}%</span>
            </div>
            <div className="p-2 rounded-[10px] bg-white border border-[#e0e0e0]">
              <span className="text-neutral-500 block font-normal text-[10px]">Wind Drag</span>
              <span className="text-[#1d1d1f] font-semibold">{iceberg.windDragForcingPct}%</span>
            </div>
            <div className="p-2 rounded-[10px] bg-white border border-[#e0e0e0]">
              <span className="text-neutral-500 block font-normal text-[10px]">Coriolis / Wave</span>
              <span className="text-[#1d1d1f] font-semibold">{iceberg.coriolisForcingPct}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="pt-1 flex items-center gap-2">
        <button
          onClick={() => onLockRadar && onLockRadar(iceberg.code)}
          className="btn-apple-primary w-full text-[13px]"
        >
          <Radar className="w-4 h-4" />
          <span>Lock ECDIS Collision Tracker on {iceberg.code}</span>
        </button>
      </div>
    </div>
  );
};
