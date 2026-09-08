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
        return 'bg-rose-50 text-rose-900 border-rose-300';
      case 'HIGH':
        return 'bg-orange-50 text-orange-900 border-orange-300';
      case 'WARNING':
      case 'MODERATE':
        return 'bg-amber-50 text-amber-900 border-amber-300';
      default:
        return 'bg-emerald-50 text-emerald-900 border-emerald-300';
    }
  };

  return (
    <div className="bg-white border border-zinc-200/90 shadow-xs rounded-xl p-5 space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between pb-3 border-b border-zinc-100">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-zinc-100 border border-zinc-200 text-zinc-900">
            <Mountain className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold font-mono text-zinc-950">
                {iceberg.code}
              </h3>
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${getRiskBadge()}`}>
                {iceberg.riskLevel} RISK
              </span>
            </div>
            <span className="text-[11px] font-mono text-zinc-500 font-medium">
              {iceberg.name} | {iceberg.detectionSource}
            </span>
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="p-1 text-zinc-400 hover:text-zinc-900 rounded hover:bg-zinc-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* 4 Core Dimensions & Kinematics: Length, Velocity, Direction, Risk */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
        {/* Length */}
        <div className="p-2.5 rounded-lg bg-zinc-50 border border-zinc-200 space-y-0.5">
          <div className="flex items-center gap-1 text-[10px] text-zinc-500 font-medium">
            <Ruler className="w-3.5 h-3.5 text-zinc-900" />
            <span>LENGTH</span>
          </div>
          <div className="text-sm font-bold text-zinc-950">
            {iceberg.lengthKm} km
          </div>
          <span className="text-[9px] text-zinc-500">Area: {iceberg.areaKm2} km²</span>
        </div>

        {/* Velocity */}
        <div className="p-2.5 rounded-lg bg-zinc-50 border border-zinc-200 space-y-0.5">
          <div className="flex items-center gap-1 text-[10px] text-zinc-500 font-medium">
            <Gauge className="w-3.5 h-3.5 text-zinc-900" />
            <span>VELOCITY</span>
          </div>
          <div className="text-sm font-bold text-zinc-950">
            {iceberg.velocityMs} m/s
          </div>
          <span className="text-[9px] text-zinc-500">({iceberg.velocityKts} kts)</span>
        </div>

        {/* Direction */}
        <div className="p-2.5 rounded-lg bg-zinc-50 border border-zinc-200 space-y-0.5">
          <div className="flex items-center gap-1 text-[10px] text-zinc-500 font-medium">
            <Compass className="w-3.5 h-3.5 text-black" />
            <span>DIRECTION</span>
          </div>
          <div className="text-sm font-bold text-zinc-950">
            {iceberg.directionCompass} ({iceberg.directionDeg}°)
          </div>
          <span className="text-[9px] text-zinc-500">True Heading</span>
        </div>

        {/* Risk */}
        <div className="p-2.5 rounded-lg bg-zinc-50 border border-zinc-200 space-y-0.5">
          <div className="flex items-center gap-1 text-[10px] text-zinc-500 font-medium">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
            <span>RISK</span>
          </div>
          <div className="text-sm font-bold text-rose-900">
            {iceberg.riskLevel}
          </div>
          <span className="text-[9px] text-zinc-500">Threat Assessment</span>
        </div>
      </div>

      {/* Collision Risk & Route Proximity */}
      <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-zinc-50 border border-zinc-200">
        <div className="space-y-1">
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block font-bold">
            Collision Probability
          </span>
          <div className="text-xl font-extrabold font-sans text-rose-900">
            {iceberg.collisionProbabilityPct}%
          </div>
          <span className="text-[10px] font-mono text-zinc-500">
            Calculated within 72h corridor
          </span>
        </div>

        <div className="space-y-1 border-l border-zinc-200 pl-3">
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block font-bold">
            Route Distance
          </span>
          <div className="text-xl font-extrabold font-sans text-zinc-950">
            {iceberg.routeDistanceKm} km
          </div>
          <span className="text-[10px] font-mono text-zinc-500">
            Closest Point of Approach (CPA)
          </span>
        </div>
      </div>

      {/* Trajectory Timeline: Current Position, +24h, +48h, +72h */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-zinc-950 font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Navigation className="w-3.5 h-3.5 text-black" />
            Predicted 72-Hour Drift Trajectory
          </span>
          <span className="text-[10px] text-zinc-950 font-bold bg-zinc-100 px-1.5 py-0.5 rounded border border-zinc-200">4 STAGES</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {iceberg.trajectory.map((pt, idx) => (
            <div
              key={pt.stage}
              className={`p-2.5 rounded-xl border text-xs font-mono space-y-1 ${
                idx === 0
                  ? 'bg-zinc-50 border-black shadow-xs ring-1 ring-black'
                  : 'bg-zinc-50/50 border-zinc-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-zinc-950">
                  {pt.stage}
                </span>
                <span className="text-[9px] text-zinc-500 font-bold">
                  T+{pt.hourOffset}h
                </span>
              </div>
              <div className="text-[11px] text-zinc-900 font-mono font-bold">
                {Math.abs(pt.lat).toFixed(2)}°S, {pt.lng.toFixed(2)}°E
              </div>
              <div className="text-[10px] text-amber-900 font-bold">
                Route: {pt.routeDistanceKm} km
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Explanation Card */}
      <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-300 space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-950 font-extrabold flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-black" />
            AI Drift Explanation
          </span>
          <span className="text-xs font-mono font-bold text-zinc-950 bg-zinc-200/80 px-2 py-0.5 rounded border border-zinc-300">
            Confidence: {iceberg.confidencePct}%
          </span>
        </div>

        {/* AI Quote */}
        <p className="text-xs text-zinc-800 leading-relaxed italic font-sans font-medium">
          "{iceberg.aiExplanation}"
        </p>

        {/* Model Spec */}
        <div className="pt-2 border-t border-zinc-200 space-y-1 text-[11px] font-mono text-zinc-600">
          <div className="flex items-center justify-between">
            <span>Model:</span>
            <span className="text-zinc-950 font-bold">{iceberg.modelName}</span>
          </div>

          {/* Forcing Weights */}
          <div className="grid grid-cols-3 gap-1.5 pt-1 text-[10px] text-center font-bold">
            <div className="p-2 rounded-lg bg-white border border-zinc-200 shadow-2xs">
              <span className="text-zinc-500 block font-medium">Ocean Current</span>
              <span className="text-zinc-950">{iceberg.oceanCurrentForcingPct}%</span>
            </div>
            <div className="p-2 rounded-lg bg-white border border-zinc-200 shadow-2xs">
              <span className="text-zinc-500 block font-medium">Wind Drag</span>
              <span className="text-zinc-950">{iceberg.windDragForcingPct}%</span>
            </div>
            <div className="p-2 rounded-lg bg-white border border-zinc-200 shadow-2xs">
              <span className="text-zinc-500 block font-medium">Coriolis / Wave</span>
              <span className="text-zinc-950">{iceberg.coriolisForcingPct}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="pt-1 flex items-center gap-2">
        <button
          onClick={() => onLockRadar && onLockRadar(iceberg.code)}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-black hover:bg-zinc-800 text-white shadow-xs text-xs font-mono font-bold transition-colors"
        >
          <Radar className="w-4 h-4 text-white" />
          <span>Lock ECDIS Collision Tracker on {iceberg.code}</span>
        </button>
      </div>
    </div>
  );
};
