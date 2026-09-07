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
    <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
      {/* Label */}
      <div className="flex items-center gap-2.5 text-xs font-mono text-slate-700">
        <div className="p-1.5 rounded-lg bg-sky-50 border border-sky-200 text-sky-600">
          <Clock className="w-3.5 h-3.5" />
        </div>
        <span className="font-bold uppercase tracking-wider text-slate-900">
          FORECAST TIMELINE HORIZON:
        </span>
      </div>

      {/* Modern Segmented Control Pills */}
      <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 border border-slate-200 shadow-2xs flex-wrap justify-center">
        {horizons.map((horizon) => {
          const isActive = activeHorizon === horizon;

          return (
            <button
              key={horizon}
              onClick={() => onSelectHorizon(horizon)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all duration-200 select-none ${
                isActive
                  ? 'bg-sky-600 text-white shadow-xs border border-sky-600 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
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
            className="font-mono gap-1.5 font-semibold"
            title={isPlaying ? 'Pause timeline progression' : 'Auto-play forecast sequence'}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-emerald-600" />
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
            className="h-8 w-8 text-slate-500 hover:text-slate-800"
            title="Reset to Current observation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </Button>
        )}
      </div>
    </div>
  );
};

