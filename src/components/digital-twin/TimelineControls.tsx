import React from 'react';
import { Play, Pause, RotateCcw, Clock, FastForward } from 'lucide-react';
import { DIGITAL_TWIN_DAYS } from '@/data/digitalTwinData';
import { Button } from '@/components/ui/button';

interface TimelineControlsProps {
  currentDayIndex: number;
  isPlaying: boolean;
  playbackSpeed: number;
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  onSelectDay: (dayIndex: number) => void;
  onChangeSpeed: (speed: number) => void;
}

export const TimelineControls: React.FC<TimelineControlsProps> = ({
  currentDayIndex,
  isPlaying,
  playbackSpeed,
  onPlay,
  onPause,
  onReset,
  onSelectDay,
  onChangeSpeed,
}) => {
  return (
    <div className="bg-white border border-slate-200/90 shadow-xs rounded-xl p-4 sm:p-5 space-y-4">
      {/* Top Controls Row: Play/Pause, Reset, Speed, Time Readout */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-slate-200">
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Play / Pause Toggle Button */}
          {isPlaying ? (
            <Button
              onClick={onPause}
              variant="destructive"
              size="sm"
              className="font-mono font-bold gap-1.5 shadow-xs"
            >
              <Pause className="w-3.5 h-3.5 fill-current" />
              <span>Pause</span>
            </Button>
          ) : (
            <Button
              onClick={onPlay}
              variant="default"
              size="sm"
              className="font-mono font-bold gap-1.5 bg-sky-600 hover:bg-sky-700 text-white shadow-xs"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Play Simulation</span>
            </Button>
          )}

          {/* Reset Button */}
          <Button
            onClick={onReset}
            variant="outline"
            size="sm"
            className="font-mono text-xs gap-1.5 border-slate-200 text-slate-700 hover:bg-slate-50"
            title="Reset to Day 0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </Button>

          {/* Playback Speed Toggles */}
          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs font-mono ml-1">
            <FastForward className="w-3 h-3 text-slate-500 ml-1.5" />
            {[1, 2, 4].map((spd) => (
              <button
                key={spd}
                onClick={() => onChangeSpeed(spd)}
                className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold transition-all ${
                  playbackSpeed === spd
                    ? 'bg-white text-sky-700 border border-slate-200 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>
        </div>

        {/* Active Simulation Step Readout */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <Clock className="w-4 h-4 text-sky-600" />
          <span className="text-slate-500 font-medium">Temporal State:</span>
          <span className="px-2.5 py-1 rounded-md bg-sky-50 text-sky-800 border border-sky-200 font-bold tabular-nums shadow-xs">
            Day {currentDayIndex} ({DIGITAL_TWIN_DAYS[currentDayIndex].timeOffset})
          </span>
        </div>
      </div>

      {/* 8-Day Scrubber Buttons (Day 0 to Day 7) */}
      <div className="space-y-2.5">
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
          {DIGITAL_TWIN_DAYS.map((day) => {
            const isSelected = day.dayIndex === currentDayIndex;
            const isPast = day.dayIndex < currentDayIndex;

            return (
              <button
                key={day.dayIndex}
                onClick={() => onSelectDay(day.dayIndex)}
                className={`p-2.5 rounded-xl border text-center transition-all select-none duration-200 ${
                  isSelected
                    ? 'bg-sky-50 border-sky-400 text-sky-900 shadow-xs ring-2 ring-sky-500/20 scale-[1.02]'
                    : isPast
                    ? 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-100/80'
                    : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-800'
                }`}
              >
                <span className="text-xs font-mono font-bold block">
                  {day.dayLabel}
                </span>
                <span className="text-[10px] font-mono text-slate-500 block truncate">
                  {day.timeOffset}
                </span>
              </button>
            );
          })}
        </div>

        {/* Continuous Progress Bar Line */}
        <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden border border-slate-200 relative shadow-inner">
          <div
            className="h-full rounded-full bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500 shadow-xs transition-all duration-300"
            style={{ width: `${(currentDayIndex / 7) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

