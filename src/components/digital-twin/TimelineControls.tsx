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
    <div className="bg-white border border-[#e0e0e0] rounded-[18px] p-5 space-y-4">
      {/* Top Controls Row: Play/Pause, Reset, Speed, Time Readout */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-[#f0f0f0]">
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Play / Pause Toggle Button */}
          {isPlaying ? (
            <Button
              onClick={onPause}
              variant="destructive"
              size="sm"
              className="font-mono font-semibold gap-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-full cursor-pointer active:scale-95 transition-all"
            >
              <Pause className="w-3.5 h-3.5 fill-current" />
              <span>Pause</span>
            </Button>
          ) : (
            <Button
              onClick={onPlay}
              variant="default"
              size="sm"
              className="font-mono font-semibold gap-1.5 bg-[#0066cc] hover:bg-[#0071e3] text-white rounded-full cursor-pointer active:scale-95 transition-all"
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
            className="font-mono text-xs gap-1.5 border-[#e0e0e0] text-[#1d1d1f] hover:bg-[#f5f5f7] rounded-full cursor-pointer active:scale-95 transition-all"
            title="Reset to Day 0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </Button>

          {/* Playback Speed Toggles */}
          <div className="flex items-center gap-1 bg-[#f5f5f7] p-1 rounded-full border border-[#e0e0e0] text-xs font-mono ml-1">
            <FastForward className="w-3 h-3 text-[#86868b] ml-1.5" />
            {[1, 2, 4].map((spd) => (
              <button
                key={spd}
                onClick={() => onChangeSpeed(spd)}
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold transition-all cursor-pointer ${
                  playbackSpeed === spd
                    ? 'bg-[#0066cc] text-white'
                    : 'text-[#86868b] hover:text-[#1d1d1f]'
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>
        </div>

        {/* Active Simulation Step Readout */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <Clock className="w-4 h-4 text-[#0066cc]" />
          <span className="text-[#86868b] font-normal">Temporal State:</span>
          <span className="px-3 py-1 rounded-full bg-[#fafafc] text-[#1d1d1f] border border-[#e0e0e0] font-semibold tabular-nums">
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
                className={`p-2.5 rounded-xl border text-center transition-all select-none duration-200 cursor-pointer active:scale-95 ${
                  isSelected
                    ? 'bg-[#0066cc] border-[#0066cc] text-white ring-2 ring-[#0066cc]/20'
                    : isPast
                    ? 'bg-[#fafafc] border-[#e0e0e0] text-[#1d1d1f] hover:border-[#0066cc]/40'
                    : 'bg-white border-[#e0e0e0] text-[#86868b] hover:border-[#0066cc]/40 hover:text-[#1d1d1f]'
                }`}
              >
                <span className="text-xs font-mono font-semibold block">
                  {day.dayLabel}
                </span>
                <span className={`text-[10px] font-mono block truncate ${isSelected ? 'text-white/80' : 'text-[#86868b]'}`}>
                  {day.timeOffset}
                </span>
              </button>
            );
          })}
        </div>

        {/* Continuous Progress Bar Line */}
        <div className="w-full h-2 rounded-full bg-[#f0f0f0] overflow-hidden border border-[#e0e0e0] relative">
          <div
            className="h-full rounded-full bg-[#0066cc] transition-all duration-300"
            style={{ width: `${(currentDayIndex / 7) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};


