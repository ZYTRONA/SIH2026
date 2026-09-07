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
      subtitle="Configure expedition waypoints, vessel ice-class capability, and multi-objective routing priorities"
      actions={
        <div className="flex items-center gap-2">
          {/* Simulation Label */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-xs font-mono text-sky-700 font-semibold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>Prototype AI Simulation</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700 shadow-xs">
            {pipelineState === 'completed' ? (
              <>
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-bold">PLAN READY</span>
              </>
            ) : (
              <>
                <Radio className="w-3.5 h-3.5 text-sky-600 animate-pulse" />
                <span className="font-semibold text-slate-700">SOLVER STANDBY</span>
              </>
            )}
          </div>
        </div>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Form / Progress Pipeline / Result Card */}
        <div className="lg:col-span-6 space-y-6">
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
        <div className="lg:col-span-6 space-y-4">
          <AntarcticMap />
        </div>
      </div>
    </PageContainer>
  );
};

export default MissionPlanner;
