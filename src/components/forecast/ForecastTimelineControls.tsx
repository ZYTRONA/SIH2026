import React from 'react';
import { ForecastHorizonKey } from '@/data/seaIceData';
import { Clock, Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
    <div className="bg-white border border-zinc-200/90 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs select-none">
      {/* Label */}
      <div className="flex items-center gap-2.5 text-xs font-mono text-zinc-700">
        <div className="p-1.5 rounded-lg bg-zinc-100 border border-zinc-200 text-zinc-950">
          <Clock className="w-3.5 h-3.5" />
        </div>
        <span className="font-bold uppercase tracking-wider text-zinc-950">
          FORECAST HORIZON:
        </span>
      </div>

      {/* Radix UI Tabs for Segmented Control */}
      <Tabs
        value={activeHorizon}
        onValueChange={(val) => onSelectHorizon(val as ForecastHorizonKey)}
        className="w-auto"
      >
        <TabsList className="h-9 p-0.5 bg-zinc-100 border border-zinc-200 rounded-xl">
          {horizons.map((horizon) => (
            <TabsTrigger
              key={horizon}
              value={horizon}
              className="h-8 px-3.5 text-xs font-mono font-bold data-[state=active]:bg-black data-[state=active]:text-white transition-all"
            >
              {horizon}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Playback & Reset Controls */}
      <div className="flex items-center gap-2">
        {onTogglePlay && (
          <Button
            onClick={onTogglePlay}
            variant={isPlaying ? 'destructive' : 'default'}
            size="sm"
            className={`font-mono gap-1.5 font-bold rounded-xl shadow-xs cursor-pointer ${
              isPlaying ? 'bg-rose-600 hover:bg-rose-700' : 'bg-black hover:bg-zinc-800 text-white'
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
                <Play className="w-3.5 h-3.5 fill-current text-white" />
                <span>Animate</span>
              </>
            )}
          </Button>
        )}

        {onReset && (
          <Button
            onClick={onReset}
            variant="outline"
            size="icon"
            className="h-8 w-8 text-zinc-600 hover:text-black hover:bg-zinc-100 border-zinc-300 rounded-xl cursor-pointer"
            title="Reset to Current observation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </Button>
        )}
      </div>
    </div>
  );
};


