import React from 'react';
import { ForecastHorizonKey } from '@/data/seaIceData';
import { Clock, Play, Pause, RotateCcw } from 'lucide-react';

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
    <div className="polar-panel p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 border-polar-700/80">
      {/* Label */}
      <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
        <Clock className="w-4 h-4 text-ice-400" />
        <span className="font-bold uppercase tracking-wider text-slate-200">
          FORECAST TIMELINE HORIZON:
        </span>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-1.5 flex-wrap justify-center">
        {horizons.map((horizon) => {
          const isActive = activeHorizon === horizon;

          return (
            <button
              key={horizon}
              onClick={() => onSelectHorizon(horizon)}
              className={`px-3.5 py-1.5 rounded text-xs font-mono font-bold transition-all ${
                isActive
                  ? 'bg-ice-500 text-polar-950 shadow-md shadow-ice-500/20 scale-105'
                  : 'bg-polar-900 hover:bg-polar-800 text-slate-300 border border-polar-700/60 hover:text-slate-100'
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
          <button
            onClick={onTogglePlay}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-polar-900 hover:bg-polar-800 border border-polar-700 text-xs font-mono text-slate-200"
            title={isPlaying ? 'Pause timeline progression' : 'Auto-play forecast sequence'}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 text-amber-400" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-emerald-400" />
                <span>Animate</span>
              </>
            )}
          </button>
        )}

        {onReset && (
          <button
            onClick={onReset}
            className="p-1.5 rounded bg-polar-900 hover:bg-polar-800 border border-polar-700 text-slate-400 hover:text-slate-200"
            title="Reset to Current observation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
