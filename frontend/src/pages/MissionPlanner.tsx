import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { AntarcticMap } from '@/components/map/AntarcticMap';
import {
  MissionForm,
  MissionProgressPipeline,
  MissionResultCard,
} from '@/components/mission';
import { missionService } from '@/services/missionService';
import { MissionConfig, MissionPlanResult, PipelineStage } from '@/types';
import { Sparkles, Radio, CheckCircle } from 'lucide-react';

export const MissionPlanner: React.FC = () => {
  const [pipelineState, setPipelineState] = useState<'idle' | 'running' | 'completed'>('idle');
  const [currentStage, setCurrentStage] = useState<PipelineStage>('ingestion');
  const [progressPct, setProgressPct] = useState<number>(0);
  const [progressMessage, setProgressMessage] = useState<string>('');
  const [planResult, setPlanResult] = useState<MissionPlanResult | null>(null);

  const handleGeneratePlan = async (config: MissionConfig) => {
    setPipelineState('running');
    setProgressPct(0);
    setCurrentStage('ingestion');

    try {
      const result = await missionService.generateNavigationPlan(
        config,
        (stage, pct, msg) => {
          setCurrentStage(stage);
          setProgressPct(pct);
          setProgressMessage(msg);
        }
      );

      setPlanResult(result);
      setPipelineState('completed');
    } catch (err) {
      console.error('Mission planning error:', err);
      setPipelineState('idle');
    }
  };

  const handleReset = () => {
    setPipelineState('idle');
    setPlanResult(null);
  };

  return (
    <PageContainer
      title="Mission & Voyage Planner"
      subtitle="Configure expedition waypoints, vessel ice-class capability, and multi-objective routing priorities."
      actions={
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1d1d1f] text-white text-[12px] font-normal">
            <Sparkles className="w-3.5 h-3.5 text-[#2997ff]" />
            <span>A* + D* Lite AI Engine</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#e0e0e0] text-[12px] text-[#1d1d1f]">
            {pipelineState === 'completed' ? (
              <>
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span className="font-semibold">Plan Optimized</span>
              </>
            ) : (
              <>
                <Radio className="w-3.5 h-3.5 text-[#0066cc] animate-pulse" />
                <span className="text-neutral-600">Solver Standby</span>
              </>
            )}
          </div>
        </div>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Form / Progress Pipeline / Result Card */}
        <div className="lg:col-span-6 space-y-6">
          {/* Mission Parameter Briefing Card */}
          <div className="apple-card p-6 space-y-2 bg-[#f5f5f7]">
            <div className="flex items-center justify-between">
              <span className="text-[12px] uppercase tracking-wider text-neutral-500 font-semibold">
                Voyage Configuration Protocol
              </span>
              <span className="text-[11px] font-normal bg-white px-2.5 py-0.5 rounded-full border border-[#e0e0e0] text-[#1d1d1f]">
                IMO Polar Code
              </span>
            </div>
            <h3 className="text-[21px] font-semibold tracking-tight text-[#1d1d1f]">
              Autonomous Multimodal Route Optimization
            </h3>
            <p className="text-[14px] text-neutral-600 leading-relaxed font-normal">
              Select departing port, destination research station, icebreaker class (PC1–PC7), and multi-criteria balance between bunker fuel burn, ice risk index, and ETA.
            </p>
          </div>

          {pipelineState === 'idle' && (
            <MissionForm onSubmit={handleGeneratePlan} isLoading={false} />
          )}

          {pipelineState === 'running' && (
            <MissionProgressPipeline
              currentStage={currentStage}
              progressPct={progressPct}
              message={progressMessage}
            />
          )}

          {pipelineState === 'completed' && planResult && (
            <MissionResultCard result={planResult} onReset={handleReset} />
          )}
        </div>

        {/* Right Column: Interactive Antarctic Tactical Map */}
        <div className="lg:col-span-6 space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-[14px] font-semibold text-[#1d1d1f]">
              Antarctic Expedition Geodesic Chart
            </h2>
            <span className="text-[12px] font-mono text-neutral-500">
              Live AIS Waypoint Synchronization
            </span>
          </div>
          <AntarcticMap heightClass="h-[520px] sm:h-[600px] lg:h-[680px]" />
        </div>
      </div>
    </PageContainer>
  );
};

export default MissionPlanner;
