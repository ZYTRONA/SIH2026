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
    <div className="bg-white border border-[#e0e0e0] rounded-[18px] p-4 flex flex-col sm:flex-row items-center justify-between gap-3 select-none">
      {/* Label */}
      <div className="flex items-center gap-2.5 text-[12px] text-[#1d1d1f]">
        <div className="p-1.5 rounded-full bg-[#f5f5f7] border border-[#e0e0e0] text-[#0066cc]">
          <Clock className="w-3.5 h-3.5" />
        </div>
        <span className="font-semibold uppercase tracking-wider text-[11px] text-neutral-500">
          FORECAST HORIZON:
        </span>
      </div>

      {/* Segmented Pill Container */}
      <div className="apple-segmented-container">
        {horizons.map((horizon) => (
          <button
            key={horizon}
            onClick={() => onSelectHorizon(horizon)}
            className={`apple-segmented-item ${
              activeHorizon === horizon ? 'apple-segmented-item-active' : ''
            }`}
          >
            {horizon}
          </button>
        ))}
      </div>

      {/* Playback & Reset Controls */}
      <div className="flex items-center gap-2">
        {onTogglePlay && (
          <button
            onClick={onTogglePlay}
            className={`flex items-center gap-1.5 h-9 px-4 rounded-full text-[13px] font-semibold transition-all active:scale-95 ${
              isPlaying
                ? 'bg-rose-600 hover:bg-rose-700 text-white'
                : 'btn-apple-primary'
            }`}
            title={isPlaying ? 'Pause timeline progression' : 'Auto-play forecast sequence'}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Animate</span>
              </>
            )}
          </button>
        )}

        {onReset && (
          <button
            onClick={onReset}
            className="flex items-center justify-center h-9 w-9 text-neutral-600 hover:text-[#1d1d1f] hover:bg-[#f5f5f7] border border-[#e0e0e0] rounded-full transition-colors active:scale-95"
            title="Reset to Current observation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};


