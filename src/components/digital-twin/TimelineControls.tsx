import React from 'react';
import { Play, Pause, RotateCcw, Clock, FastForward } from 'lucide-react';
import { DIGITAL_TWIN_DAYS } from '@/data/digitalTwinData';

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
    <div className="polar-panel p-4 space-y-3.5">
      {/* Top Controls Row: Play/Pause, Reset, Speed, Time Readout */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-polar-700/60">
        <div className="flex items-center gap-2">
          {/* Play / Pause Toggle Button */}
          {isPlaying ? (
            <button
              onClick={onPause}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-mono font-bold transition-all shadow-sm"
            >
              <Pause className="w-4 h-4 fill-current" />
              <span>Pause</span>
            </button>
          ) : (
            <button
              onClick={onPlay}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-400/50 text-xs font-mono font-bold transition-all shadow-sm group"
            >
              <Play className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
              <span>Play Simulation</span>
            </button>
          )}

          {/* Reset Button */}
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-polar-900 hover:bg-polar-800 text-slate-300 hover:text-white border border-polar-700/60 text-xs font-mono transition-all"
            title="Reset to Day 0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          {/* Playback Speed Toggles */}
          <div className="flex items-center gap-1 bg-polar-900/90 p-0.5 rounded-lg border border-polar-700/50 text-xs font-mono ml-1">
            <FastForward className="w-3 h-3 text-slate-400 ml-1.5" />
            {[1, 2, 4].map((spd) => (
              <button
                key={spd}
                onClick={() => onChangeSpeed(spd)}
                className={`px-2 py-0.5 rounded text-[10px] font-mono transition-all ${
                  playbackSpeed === spd
                    ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>
        </div>

        {/* Active Simulation Step Readout */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <Clock className="w-4 h-4 text-cyan-400" />
          <span className="text-slate-400">Simulation Temporal State:</span>
          <span className="px-2.5 py-0.5 rounded bg-polar-900 text-ice-300 border border-polar-700 font-bold">
            Day {currentDayIndex} ({DIGITAL_TWIN_DAYS[currentDayIndex].timeOffset})
          </span>
        </div>
      </div>

      {/* 8-Day Scrubber Buttons (Day 0 to Day 7) */}
      <div className="space-y-2">
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
          {DIGITAL_TWIN_DAYS.map((day) => {
            const isSelected = day.dayIndex === currentDayIndex;
            const isPast = day.dayIndex < currentDayIndex;

            return (
              <button
                key={day.dayIndex}
                onClick={() => onSelectDay(day.dayIndex)}
                className={`p-2.5 rounded-lg border text-center transition-all ${
                  isSelected
                    ? 'bg-cyan-500/20 border-cyan-400/80 text-cyan-200 shadow-md ring-1 ring-cyan-400/40'
                    : isPast
                    ? 'bg-polar-900/80 border-polar-700/70 text-slate-300 hover:border-polar-600'
                    : 'bg-polar-950/60 border-polar-800 text-slate-400 hover:border-polar-700 hover:text-slate-300'
                }`}
              >
                <span className="text-xs font-mono font-bold block">
                  {day.dayLabel}
                </span>
                <span className="text-[10px] font-mono opacity-80 block truncate">
                  {day.timeOffset}
                </span>
              </button>
            );
          })}
        </div>

        {/* Continuous Progress Bar Line */}
        <div className="w-full h-1.5 rounded-full bg-polar-950 overflow-hidden border border-polar-700/40 relative">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-ice-400 transition-all duration-300"
            style={{ width: `${(currentDayIndex / 7) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};
