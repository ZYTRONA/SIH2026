import React from 'react';
import { ForecastHorizonKey } from '@/data/seaIceData';
import { Clock, Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ForecastTimelineControlsProps {
  activeHorizon: ForecastHorizonKey;
  onSelectHorizon: (horizon: ForecastHorizonKey) => void;
  isPlaying?: boolean;
  onTogglePlay?: () => void;
  onReset?: () => void;
}

const horizons: ForecastHorizonKey[] = ['Current', '+24h', '+48h', '+72h', '+7 Days'];

export const ForecastTimelineControls: React.FC<ForecastTimelineControlsProps> = ({
  activeHorizon,
  onSelectHorizon,
  isPlaying = false,
  onTogglePlay,
  onReset,
}) => {
  return (
    <div className="bg-white border border-zinc-200/90 rounded-xl p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
      {/* Label */}
      <div className="flex items-center gap-2.5 text-xs font-mono text-zinc-700">
        <div className="p-1.5 rounded-lg bg-zinc-100 border border-zinc-200 text-zinc-900">
          <Clock className="w-3.5 h-3.5" />
        </div>
        <span className="font-bold uppercase tracking-wider text-zinc-950">
          FORECAST TIMELINE HORIZON:
        </span>
      </div>

      {/* Modern Segmented Control Pills */}
      <div className="flex items-center gap-1.5 p-1 rounded-xl bg-zinc-100 border border-zinc-200 shadow-2xs flex-wrap justify-center">
        {horizons.map((horizon) => {
          const isActive = activeHorizon === horizon;

          return (
            <button
              key={horizon}
              onClick={() => onSelectHorizon(horizon)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all duration-200 select-none ${
                isActive
                  ? 'bg-black text-white shadow-xs border border-black font-bold'
                  : 'text-zinc-600 hover:text-black hover:bg-zinc-200/70'
              }`}
            >
              {horizon}
            </button>
          );
        })}
      </div>

      {/* Playback & Reset Controls */}
      <div className="flex items-center gap-2">
        {onTogglePlay && (
          <Button
            onClick={onTogglePlay}
            variant={isPlaying ? 'destructive' : 'secondary'}
            size="sm"
            className="font-mono gap-1.5 font-bold rounded-xl"
            title={isPlaying ? 'Pause timeline progression' : 'Auto-play forecast sequence'}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-black" />
                <span>Animate</span>
              </>
            )}
          </Button>
        )}

        {onReset && (
          <Button
            onClick={onReset}
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-zinc-500 hover:text-black hover:bg-zinc-100"
            title="Reset to Current observation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </Button>
        )}
      </div>
    </div>
  );
};

