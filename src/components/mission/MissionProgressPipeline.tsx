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
    <div className="bg-white border border-zinc-200/90 rounded-xl p-6 space-y-6 shadow-xs animate-fade-in">
      {/* Title & Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-zinc-100">
        <div className="flex items-center gap-3">
          <Loader2 className="w-5 h-5 text-black animate-spin" />
          <div>
            <h3 className="text-sm font-bold text-zinc-950 font-sans">
              Processing Antarctic Environmental Intelligence...
            </h3>
            <span className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider">
              Autonomous Multi-Factor Solver Active
            </span>
          </div>
        </div>

        <span className="text-xs font-mono font-bold text-zinc-950 bg-zinc-100 px-2 py-0.5 rounded border border-zinc-200">
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
              className={`p-3 rounded-xl border transition-all ${
                status === 'completed'
                  ? 'bg-zinc-50 border-zinc-300 text-zinc-900 font-medium'
                  : status === 'active'
                  ? 'bg-black border-black text-white shadow-md'
                  : 'bg-zinc-50/50 border-zinc-200 text-zinc-400 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div
                  className={`p-1.5 rounded-lg ${
                    status === 'completed'
                      ? 'bg-zinc-200 text-zinc-900'
                      : status === 'active'
                      ? 'bg-zinc-800 text-white'
                      : 'bg-zinc-200 text-zinc-400'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>

                {status === 'completed' && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                )}
                {status === 'active' && (
                  <Loader2 className="w-3.5 h-3.5 text-white animate-spin" />
                )}
              </div>

              <div className={`text-xs font-bold font-sans ${status === 'active' ? 'text-white' : 'text-zinc-950'}`}>
                {st.label}
              </div>
              <div className={`text-[10px] font-mono mt-0.5 ${status === 'active' ? 'text-zinc-300' : 'text-zinc-500'}`}>
                {st.sublabel}
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress Bar & Subtext */}
      <div className="space-y-2">
        <div className="w-full h-2 rounded-full bg-zinc-100 overflow-hidden border border-zinc-200">
          <div
            className="h-full bg-black rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        <p className="text-xs font-mono text-zinc-600 text-center font-semibold">
          {message}
        </p>
      </div>
    </div>
  );
};
