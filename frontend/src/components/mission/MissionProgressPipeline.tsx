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
    <div className="bg-white border border-[#e0e0e0] rounded-[18px] p-6 space-y-6 animate-fade-in">
      {/* Title & Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#f0f0f0]">
        <div className="flex items-center gap-3">
          <Loader2 className="w-5 h-5 text-[#0066cc] animate-spin shrink-0" />
          <div>
            <h3 className="text-[16px] font-semibold text-[#1d1d1f] tracking-[-0.28px]">
              Processing Antarctic Environmental Intelligence
            </h3>
            <span className="text-[12px] text-neutral-500 font-normal">
              Autonomous Multi-Factor Ensemble Solver Active
            </span>
          </div>
        </div>

        <span className="text-[12px] font-semibold text-[#0066cc] bg-[#f0f7ff] border border-[#d0e6ff] px-3 py-1 rounded-full">
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
              className={`p-4 rounded-[14px] border transition-all ${
                status === 'completed'
                  ? 'bg-[#fafafc] border-[#e0e0e0] text-[#1d1d1f]'
                  : status === 'active'
                  ? 'bg-[#272729] border-[#272729] text-white'
                  : 'bg-[#f5f5f7] border-[#e0e0e0] text-neutral-400 opacity-70'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div
                  className={`p-2 rounded-full ${
                    status === 'completed'
                      ? 'bg-[#f0f0f2] text-[#1d1d1f]'
                      : status === 'active'
                      ? 'bg-neutral-700 text-white'
                      : 'bg-neutral-200 text-neutral-400'
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

              <div className={`text-[13px] font-semibold tracking-[-0.2px] ${status === 'active' ? 'text-white' : 'text-[#1d1d1f]'}`}>
                {st.label}
              </div>
              <div className={`text-[11px] font-normal mt-0.5 ${status === 'active' ? 'text-neutral-300' : 'text-neutral-500'}`}>
                {st.sublabel}
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress Bar & Subtext */}
      <div className="space-y-2">
        <div className="w-full h-2 rounded-full bg-[#f5f5f7] overflow-hidden border border-[#e0e0e0]">
          <div
            className="h-full bg-[#0066cc] rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        <p className="text-[12px] font-normal text-neutral-600 text-center tracking-[-0.2px]">
          {message}
        </p>
      </div>
    </div>
  );
};
