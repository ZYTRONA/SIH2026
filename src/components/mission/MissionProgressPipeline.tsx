import React from 'react';
import { PipelineStage } from '@/types';
import {
  Database,
  CloudSnow,
  ShieldAlert,
  Route,
  CheckCircle2,
  Loader2,
} from 'lucide-react';

interface MissionProgressPipelineProps {
  currentStage: PipelineStage;
  progressPct: number;
  message: string;
}

const stages: Array<{
  key: PipelineStage;
  label: string;
  sublabel: string;
  icon: React.ElementType;
}> = [
  {
    key: 'ingestion',
    label: 'Data Ingestion',
    sublabel: 'Sentinel-1 & ECMWF',
    icon: Database,
  },
  {
    key: 'forecasting',
    label: 'Forecasting',
    sublabel: 'Sea-Ice & Icebergs',
    icon: CloudSnow,
  },
  {
    key: 'risk',
    label: 'Risk Assessment',
    sublabel: 'POLAR Code RIO',
    icon: ShieldAlert,
  },
  {
    key: 'optimization',
    label: 'Route Optimization',
    sublabel: 'Pareto Synthesis',
    icon: Route,
  },
];

export const MissionProgressPipeline: React.FC<MissionProgressPipelineProps> = ({
  currentStage,
  progressPct,
  message,
}) => {
  const getStageStatus = (stageKey: PipelineStage) => {
    const stageOrder: PipelineStage[] = [
      'ingestion',
      'forecasting',
      'risk',
      'optimization',
      'completed',
    ];
    const currentIndex = stageOrder.indexOf(currentStage);
    const targetIndex = stageOrder.indexOf(stageKey);

    if (currentStage === 'completed' || targetIndex < currentIndex) {
      return 'completed';
    }
    if (targetIndex === currentIndex) {
      return 'active';
    }
    return 'pending';
  };

  return (
    <div className="polar-panel p-6 space-y-6 animate-fade-in border-ice-500/40">
      {/* Title & Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-polar-700/60">
        <div className="flex items-center gap-3">
          <Loader2 className="w-5 h-5 text-ice-400 animate-spin" />
          <div>
            <h3 className="text-sm font-bold text-slate-100 font-sans">
              Processing Antarctic Environmental Intelligence...
            </h3>
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">
              Autonomous Multi-Factor Solver Active
            </span>
          </div>
        </div>

        <span className="text-xs font-mono font-bold text-ice-400">
          {progressPct}% COMPLETED
        </span>
      </div>

      {/* 4-Step Pipeline Flow */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stages.map((st) => {
          const status = getStageStatus(st.key);
          const Icon = st.icon;

          return (
            <div
              key={st.key}
              className={`p-3 rounded-lg border transition-all ${
                status === 'completed'
                  ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300'
                  : status === 'active'
                  ? 'bg-ice-950/30 border-ice-400 shadow-lg shadow-ice-500/10 text-slate-100'
                  : 'bg-polar-900/50 border-polar-700/40 text-slate-400 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div
                  className={`p-1.5 rounded ${
                    status === 'completed'
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : status === 'active'
                      ? 'bg-ice-500/20 text-ice-300 animate-pulse'
                      : 'bg-polar-800 text-slate-400'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>

                {status === 'completed' && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                )}
                {status === 'active' && (
                  <Loader2 className="w-3.5 h-3.5 text-ice-400 animate-spin" />
                )}
              </div>

              <div className="text-xs font-bold font-sans">{st.label}</div>
              <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                {st.sublabel}
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress Bar & Subtext */}
      <div className="space-y-2">
        <div className="w-full h-2 rounded-full bg-polar-900 overflow-hidden border border-polar-700/60">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-ice-400 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        <p className="text-xs font-mono text-slate-300 text-center animate-pulse">
          {message}
        </p>
      </div>
    </div>
  );
};
