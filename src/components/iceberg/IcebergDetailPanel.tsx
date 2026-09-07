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
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      case 'HIGH':
        return 'bg-orange-500/20 text-orange-300 border-orange-500/40';
      case 'WARNING':
      case 'MODERATE':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      default:
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
    }
  };

  return (
    <div className="polar-panel p-5 space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between pb-3 border-b border-polar-700/60">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <Mountain className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold font-mono text-slate-100">
                {iceberg.code}
              </h3>
              <span className={`px-2 py-0.2 rounded text-[10px] font-mono font-bold border ${getRiskBadge()}`}>
                {iceberg.riskLevel} RISK
              </span>
            </div>
            <span className="text-[11px] font-mono text-slate-400">
              {iceberg.name} | {iceberg.detectionSource}
            </span>
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-100 rounded hover:bg-polar-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* 4 Core Dimensions & Kinematics requested by prompt: Length, Velocity, Direction, Risk */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
        {/* Length */}
        <div className="p-2.5 rounded bg-polar-900/80 border border-polar-700/50 space-y-0.5">
          <div className="flex items-center gap-1 text-[10px] text-slate-400">
            <Ruler className="w-3 h-3 text-ice-400" />
            <span>LENGTH</span>
          </div>
          <div className="text-sm font-bold text-slate-100">
            {iceberg.lengthKm} km
          </div>
          <span className="text-[9px] text-slate-400">Area: {iceberg.areaKm2} km²</span>
        </div>

        {/* Velocity */}
        <div className="p-2.5 rounded bg-polar-900/80 border border-polar-700/50 space-y-0.5">
          <div className="flex items-center gap-1 text-[10px] text-slate-400">
            <Gauge className="w-3 h-3 text-cyan-400" />
            <span>VELOCITY</span>
          </div>
          <div className="text-sm font-bold text-cyan-300">
            {iceberg.velocityMs} m/s
          </div>
          <span className="text-[9px] text-slate-400">({iceberg.velocityKts} kts)</span>
        </div>

        {/* Direction */}
        <div className="p-2.5 rounded bg-polar-900/80 border border-polar-700/50 space-y-0.5">
          <div className="flex items-center gap-1 text-[10px] text-slate-400">
            <Compass className="w-3 h-3 text-amber-400" />
            <span>DIRECTION</span>
          </div>
          <div className="text-sm font-bold text-amber-300">
            {iceberg.directionCompass} ({iceberg.directionDeg}°)
          </div>
          <span className="text-[9px] text-slate-400">True Heading</span>
        </div>

        {/* Risk */}
        <div className="p-2.5 rounded bg-polar-900/80 border border-polar-700/50 space-y-0.5">
          <div className="flex items-center gap-1 text-[10px] text-slate-400">
            <ShieldAlert className="w-3 h-3 text-rose-400" />
            <span>RISK</span>
          </div>
          <div className="text-sm font-bold text-rose-400">
            {iceberg.riskLevel}
          </div>
          <span className="text-[9px] text-slate-400">Threat Assessment</span>
        </div>
      </div>

      {/* Collision Risk & Route Proximity requested by prompt */}
      <div className="grid grid-cols-2 gap-3 p-3.5 rounded-lg bg-polar-900/90 border border-polar-700/60">
        <div className="space-y-1">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
            Collision Probability
          </span>
          <div className="text-xl font-bold font-sans text-rose-400">
            {iceberg.collisionProbabilityPct}%
          </div>
          <span className="text-[10px] font-mono text-slate-400">
            Calculated within 72h corridor
          </span>
        </div>

        <div className="space-y-1 border-l border-polar-700/50 pl-3">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
            Route Distance
          </span>
          <div className="text-xl font-bold font-sans text-ice-300">
            {iceberg.routeDistanceKm} km
          </div>
          <span className="text-[10px] font-mono text-slate-400">
            Closest Point of Approach (CPA)
          </span>
        </div>
      </div>

      {/* Trajectory Timeline requested by prompt: Current Position, +24h, +48h, +72h */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-slate-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Navigation className="w-3.5 h-3.5 text-ice-400" />
            Predicted 72-Hour Drift Trajectory
          </span>
          <span className="text-[10px] text-cyan-400 font-semibold">4 STAGES</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {iceberg.trajectory.map((pt, idx) => (
            <div
              key={pt.stage}
              className={`p-2 rounded border text-xs font-mono space-y-1 ${
                idx === 0
                  ? 'bg-ice-950/40 border-ice-500/40'
                  : 'bg-polar-900/60 border-polar-700/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-ice-300">
                  {pt.stage}
                </span>
                <span className="text-[9px] text-slate-400">
                  T+{pt.hourOffset}h
                </span>
              </div>
              <div className="text-[11px] text-slate-200 font-mono">
                {Math.abs(pt.lat).toFixed(2)}°S, {pt.lng.toFixed(2)}°E
              </div>
              <div className="text-[10px] text-amber-400/90">
                Route: {pt.routeDistanceKm} km
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Explanation Card requested by prompt */}
      <div className="p-3.5 rounded-lg bg-ice-950/30 border border-ice-500/40 space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase tracking-wider text-ice-400 font-bold flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-ice-400" />
            AI Drift Explanation
          </span>
          <span className="text-xs font-mono font-bold text-emerald-400">
            Confidence: {iceberg.confidencePct}%
          </span>
        </div>

        {/* AI Quote */}
        <p className="text-xs text-slate-200 leading-relaxed italic font-sans">
          "{iceberg.aiExplanation}"
        </p>

        {/* Model Spec */}
        <div className="pt-2 border-t border-polar-700/40 space-y-1 text-[11px] font-mono text-slate-400">
          <div className="flex items-center justify-between">
            <span>Model:</span>
            <span className="text-slate-200 font-semibold">{iceberg.modelName}</span>
          </div>

          {/* Forcing Weights */}
          <div className="grid grid-cols-3 gap-1 pt-1 text-[10px] text-center">
            <div className="p-1 rounded bg-polar-900 border border-polar-700/50">
              <span className="text-slate-400 block">Ocean Current</span>
              <span className="text-emerald-400 font-bold">{iceberg.oceanCurrentForcingPct}%</span>
            </div>
            <div className="p-1 rounded bg-polar-900 border border-polar-700/50">
              <span className="text-slate-400 block">Wind Drag</span>
              <span className="text-cyan-400 font-bold">{iceberg.windDragForcingPct}%</span>
            </div>
            <div className="p-1 rounded bg-polar-900 border border-polar-700/50">
              <span className="text-slate-400 block">Coriolis / Wave</span>
              <span className="text-ice-400 font-bold">{iceberg.coriolisForcingPct}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="pt-2 flex items-center gap-2">
        <button
          onClick={() => onLockRadar && onLockRadar(iceberg.code)}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-md bg-polar-800 hover:bg-polar-750 text-ice-300 border border-polar-700 text-xs font-mono font-medium transition-colors"
        >
          <Radar className="w-4 h-4 text-ice-400" />
          <span>Lock ECDIS Collision Tracker on {iceberg.code}</span>
        </button>
      </div>
    </div>
  );
};
