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
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'WARNING':
      case 'MODERATE':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    }
  };

  return (
    <div className="bg-white border border-slate-200/90 shadow-xs rounded-xl p-5 space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-amber-50 border border-amber-200 text-amber-700">
            <Mountain className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold font-mono text-slate-900">
                {iceberg.code}
              </h3>
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${getRiskBadge()}`}>
                {iceberg.riskLevel} RISK
              </span>
            </div>
            <span className="text-[11px] font-mono text-slate-500 font-medium">
              {iceberg.name} | {iceberg.detectionSource}
            </span>
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* 4 Core Dimensions & Kinematics: Length, Velocity, Direction, Risk */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
        {/* Length */}
        <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 space-y-0.5">
          <div className="flex items-center gap-1 text-[10px] text-slate-500">
            <Ruler className="w-3 h-3 text-sky-600" />
            <span>LENGTH</span>
          </div>
          <div className="text-sm font-bold text-slate-900">
            {iceberg.lengthKm} km
          </div>
          <span className="text-[9px] text-slate-500">Area: {iceberg.areaKm2} km²</span>
        </div>

        {/* Velocity */}
        <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 space-y-0.5">
          <div className="flex items-center gap-1 text-[10px] text-slate-500">
            <Gauge className="w-3 h-3 text-teal-600" />
            <span>VELOCITY</span>
          </div>
          <div className="text-sm font-bold text-teal-700">
            {iceberg.velocityMs} m/s
          </div>
          <span className="text-[9px] text-slate-500">({iceberg.velocityKts} kts)</span>
        </div>

        {/* Direction */}
        <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 space-y-0.5">
          <div className="flex items-center gap-1 text-[10px] text-slate-500">
            <Compass className="w-3 h-3 text-amber-600" />
            <span>DIRECTION</span>
          </div>
          <div className="text-sm font-bold text-amber-700">
            {iceberg.directionCompass} ({iceberg.directionDeg}°)
          </div>
          <span className="text-[9px] text-slate-500">True Heading</span>
        </div>

        {/* Risk */}
        <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 space-y-0.5">
          <div className="flex items-center gap-1 text-[10px] text-slate-500">
            <ShieldAlert className="w-3 h-3 text-rose-600" />
            <span>RISK</span>
          </div>
          <div className="text-sm font-bold text-rose-600">
            {iceberg.riskLevel}
          </div>
          <span className="text-[9px] text-slate-500">Threat Assessment</span>
        </div>
      </div>

      {/* Collision Risk & Route Proximity */}
      <div className="grid grid-cols-2 gap-3 p-3.5 rounded-lg bg-slate-50 border border-slate-200">
        <div className="space-y-1">
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block font-semibold">
            Collision Probability
          </span>
          <div className="text-xl font-bold font-sans text-rose-600">
            {iceberg.collisionProbabilityPct}%
          </div>
          <span className="text-[10px] font-mono text-slate-500">
            Calculated within 72h corridor
          </span>
        </div>

        <div className="space-y-1 border-l border-slate-200 pl-3">
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block font-semibold">
            Route Distance
          </span>
          <div className="text-xl font-bold font-sans text-sky-700">
            {iceberg.routeDistanceKm} km
          </div>
          <span className="text-[10px] font-mono text-slate-500">
            Closest Point of Approach (CPA)
          </span>
        </div>
      </div>

      {/* Trajectory Timeline: Current Position, +24h, +48h, +72h */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-slate-700 font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Navigation className="w-3.5 h-3.5 text-sky-600" />
            Predicted 72-Hour Drift Trajectory
          </span>
          <span className="text-[10px] text-sky-700 font-bold">4 STAGES</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {iceberg.trajectory.map((pt, idx) => (
            <div
              key={pt.stage}
              className={`p-2.5 rounded-lg border text-xs font-mono space-y-1 ${
                idx === 0
                  ? 'bg-sky-50 border-sky-300 shadow-xs'
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-sky-800">
                  {pt.stage}
                </span>
                <span className="text-[9px] text-slate-500 font-semibold">
                  T+{pt.hourOffset}h
                </span>
              </div>
              <div className="text-[11px] text-slate-800 font-mono font-medium">
                {Math.abs(pt.lat).toFixed(2)}°S, {pt.lng.toFixed(2)}°E
              </div>
              <div className="text-[10px] text-amber-700 font-medium">
                Route: {pt.routeDistanceKm} km
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Explanation Card */}
      <div className="p-3.5 rounded-lg bg-sky-50/70 border border-sky-200/80 space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase tracking-wider text-sky-700 font-bold flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-sky-600" />
            AI Drift Explanation
          </span>
          <span className="text-xs font-mono font-bold text-emerald-700">
            Confidence: {iceberg.confidencePct}%
          </span>
        </div>

        {/* AI Quote */}
        <p className="text-xs text-slate-800 leading-relaxed italic font-sans font-medium">
          "{iceberg.aiExplanation}"
        </p>

        {/* Model Spec */}
        <div className="pt-2 border-t border-sky-200/60 space-y-1 text-[11px] font-mono text-slate-600">
          <div className="flex items-center justify-between">
            <span>Model:</span>
            <span className="text-slate-900 font-semibold">{iceberg.modelName}</span>
          </div>

          {/* Forcing Weights */}
          <div className="grid grid-cols-3 gap-1 pt-1 text-[10px] text-center">
            <div className="p-1.5 rounded-md bg-white border border-slate-200 shadow-2xs">
              <span className="text-slate-500 block">Ocean Current</span>
              <span className="text-emerald-700 font-bold">{iceberg.oceanCurrentForcingPct}%</span>
            </div>
            <div className="p-1.5 rounded-md bg-white border border-slate-200 shadow-2xs">
              <span className="text-slate-500 block">Wind Drag</span>
              <span className="text-teal-700 font-bold">{iceberg.windDragForcingPct}%</span>
            </div>
            <div className="p-1.5 rounded-md bg-white border border-slate-200 shadow-2xs">
              <span className="text-slate-500 block">Coriolis / Wave</span>
              <span className="text-sky-700 font-bold">{iceberg.coriolisForcingPct}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="pt-1 flex items-center gap-2">
        <button
          onClick={() => onLockRadar && onLockRadar(iceberg.code)}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-slate-900 hover:bg-slate-800 text-white shadow-xs text-xs font-mono font-medium transition-colors"
        >
          <Radar className="w-4 h-4 text-sky-400" />
          <span>Lock ECDIS Collision Tracker on {iceberg.code}</span>
        </button>
      </div>
    </div>
  );
};
