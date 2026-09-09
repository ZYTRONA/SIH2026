import React, { useState, useEffect, useRef } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { AntarcticMap } from '@/components/map/AntarcticMap';
import {
  TimelineControls,
  LiveStatsPanel,
  RouteRecalculationOverlay,
  RecalculationStage,
} from '@/components/digital-twin';
import {
  DIGITAL_TWIN_DAYS,
  RECALCULATED_SAFER_ROUTE,
  HAZARD_SCENARIO_SPEC,
} from '@/data/digitalTwinData';
import { RoutePath } from '@/types/map';
import { Activity, Compass } from 'lucide-react';

export const DigitalTwin: React.FC = () => {
  const [currentDayIndex, setCurrentDayIndex] = useState<number>(3);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [recalcStage, setRecalcStage] = useState<RecalculationStage>('idle');

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying) {
      const intervalMs = Math.max(500, 1800 / playbackSpeed);
      timerRef.current = setInterval(() => {
        setCurrentDayIndex((prev) => (prev + 1) % DIGITAL_TWIN_DAYS.length);
      }, intervalMs);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, playbackSpeed]);

  const currentState = DIGITAL_TWIN_DAYS[currentDayIndex];

  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);
  const handleReset = () => {
    setIsPlaying(false);
    setCurrentDayIndex(0);
    setRecalcStage('idle');
  };

  const handleSelectDay = (dayIndex: number) => {
    setCurrentDayIndex(dayIndex);
  };

  const handleChangeSpeed = (speed: number) => {
    setPlaybackSpeed(speed);
  };

  const handleTriggerRecalculate = () => {
    setIsPlaying(false);
    setRecalcStage('hazard_detected');

    setTimeout(() => {
      setRecalcStage('recalculating');

      setTimeout(() => {
        setRecalcStage('safer_route');
      }, 2000);
    }, 2200);
  };

  const handleResetRecalculate = () => {
    setRecalcStage('idle');
  };

  const getMapRoutes = (): RoutePath[] => {
    if (recalcStage === 'safer_route') {
      return [
        {
          ...currentState.activeRoute,
          id: 'ghost-old-route',
          name: 'OLD CORRIDOR [INCURSION]',
          color: '#DC2626',
          dashArray: '4,4',
          strokeWidth: 2,
          isRecommended: false,
        },
        RECALCULATED_SAFER_ROUTE,
      ];
    }

    if (recalcStage === 'hazard_detected') {
      return [
        {
          ...currentState.activeRoute,
          color: '#D97706',
          strokeWidth: 3.5,
        },
      ];
    }

    return [currentState.activeRoute];
  };

  const renderCustomOverlay = () => {
    if (recalcStage === 'hazard_detected') {
      const hx = HAZARD_SCENARIO_SPEC.hazardX * 10;
      const hy = HAZARD_SCENARIO_SPEC.hazardY * 10;

      return (
        <g className="animate-pulse">
          <circle cx={hx} cy={hy} r="32" fill="rgba(220, 38, 38, 0.2)" stroke="#DC2626" strokeWidth="2" strokeDasharray="4,4" />
          <circle cx={hx} cy={hy} r="18" fill="rgba(220, 38, 38, 0.35)" stroke="#DC2626" strokeWidth="1.5" />
          <circle cx={hx} cy={hy} r="4" fill="#DC2626" />
          <text x={hx + 12} y={hy - 10} fill="#991B1B" fontSize="10" fontFamily="monospace" fontWeight="bold">
            HAZARD INCURSION: IB-023
          </text>
        </g>
      );
    }

    if (recalcStage === 'safer_route') {
      const wx = 44 * 10;
      const wy = 46 * 10;

      return (
        <g>
          <circle cx={wx} cy={wy} r="20" fill="rgba(16, 185, 129, 0.2)" stroke="#059669" strokeWidth="1.5" strokeDasharray="3,3" />
          <circle cx={wx} cy={wy} r="6" fill="#FFFFFF" stroke="#059669" strokeWidth="2" />
          <circle cx={wx} cy={wy} r="2.5" fill="#059669" />
          <text x={wx + 10} y={wy + 4} fill="#065F46" fontSize="10" fontFamily="monospace" fontWeight="bold">
            WP-BRAVO-ALT [AVOIDANCE]
          </text>
        </g>
      );
    }

    return null;
  };

  return (
    <PageContainer
      title="Dynamic Simulation"
      subtitle="Interactive dynamic multi-day simulation of North Atlantic ice, iceberg kinematics, vessel telemetry, and route adaptation."
      badge="SIMULATION ACTIVE"
      badgeType="active"
    >
      <div className="space-y-6">
        {/* 1. Timeline Controls */}
        <TimelineControls
          currentDayIndex={currentDayIndex}
          isPlaying={isPlaying}
          playbackSpeed={playbackSpeed}
          onPlay={handlePlay}
          onPause={handlePause}
          onReset={handleReset}
          onSelectDay={handleSelectDay}
          onChangeSpeed={handleChangeSpeed}
        />

        {/* 3. Main Atlantic Simulation Map View */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#0066cc]" />
              <h3 className="text-[14px] font-semibold text-[#1d1d1f]">
                Dynamic Atlantic Voyage Simulation Chart (WGS84)
              </h3>
            </div>

            <div className="flex items-center gap-2 text-[12px] text-[#86868b] font-mono">
              <Activity className="w-3.5 h-3.5 text-[#0066cc]" />
              <span>
                Status: <strong className="text-[#1d1d1f] font-semibold">{currentState.phaseName}</strong>
              </span>
            </div>
          </div>

          <AntarcticMap
            customVessel={currentState.vessel}
            customIcebergs={currentState.icebergs}
            customSeaIce={currentState.seaIceTiers}
            customRiskZones={currentState.riskZones}
            customRoutes={getMapRoutes()}
            customOverlay={renderCustomOverlay()}
            heightClass="h-[520px] sm:h-[600px] lg:h-[680px]"
          />
        </div>

        {/* 4. Live Stats Panel & Telemetry Stream */}
        <LiveStatsPanel
          currentState={currentState}
          onRecalculateRouteClick={recalcStage === 'idle' ? handleTriggerRecalculate : undefined}
        />

        {/* 5. Dynamic Route Recalculation Stepper Engine */}
        <RouteRecalculationOverlay
          stage={recalcStage}
          onTriggerRecalculate={handleTriggerRecalculate}
          onResetRecalculate={handleResetRecalculate}
        />
      </div>
    </PageContainer>
  );
};

export default DigitalTwin;
