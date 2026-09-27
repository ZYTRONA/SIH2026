import React from 'react';
import {
  Globe,
  Compass,
  Navigation,
  Anchor,
  Moon,
  Layers,
  SplitSquareVertical,
  Maximize2,
  RefreshCw,
} from 'lucide-react';
import { BasemapMode } from './MapControls';

export type PolarRegion = 'Antarctica' | 'Arctic' | 'Global';
export type MapLayoutMode = 'single' | 'split';

export interface MultiMapBarProps {
  region: PolarRegion;
  onChangeRegion: (region: PolarRegion) => void;
  basemapMode: BasemapMode;
  onChangeBasemap: (mode: BasemapMode) => void;
  layoutMode: MapLayoutMode;
  onChangeLayoutMode: (mode: MapLayoutMode) => void;
  syncViews?: boolean;
  onToggleSyncViews?: () => void;
  onResetView?: () => void;
  activeRouteName?: string;
}

export const MultiMapBar: React.FC<MultiMapBarProps> = ({
  region,
  onChangeRegion,
  basemapMode,
  onChangeBasemap,
  layoutMode,
  onChangeLayoutMode,
  syncViews = true,
  onToggleSyncViews,
  onResetView,
  activeRouteName,
}) => {
  const regions: Array<{ id: PolarRegion; label: string; flag: string; badge: string }> = [
    { id: 'Antarctica', label: 'Antarctic Basin', flag: '🇦🇶', badge: 'Southern Ocean' },
    { id: 'Arctic', label: 'Arctic Basin', flag: '🌐', badge: 'NSR / NWP' },
    { id: 'Global', label: 'Global Transit', flag: '🗺️', badge: 'Gateways' },
  ];

  const basemaps: Array<{ id: BasemapMode; label: string; icon: React.ElementType }> = [
    { id: 'voyager', label: 'Nautical Topo', icon: Navigation },
    { id: 'satellite', label: 'Satellite SAR', icon: Globe },
    { id: 'esriOcean', label: 'Ocean Bathymetry', icon: Anchor },
    { id: 'dark', label: 'Dark Tactical', icon: Moon },
  ];

  return (
    <div className="w-full bg-[#1d1d1f] text-white px-4 py-2.5 rounded-[16px] border border-neutral-800 shadow-md flex flex-wrap items-center justify-between gap-3 text-[12px]">
      {/* Left: Region Switcher */}
      <div className="flex items-center gap-1.5 overflow-x-auto">
        <span className="text-neutral-400 font-semibold text-[11px] uppercase tracking-wider mr-1 flex items-center gap-1">
          <Globe className="w-3.5 h-3.5 text-[#2997ff]" />
          Region:
        </span>
        {regions.map((r) => {
          const isActive = region === r.id;
          return (
            <button
              key={r.id}
              type="button"
              onClick={() => onChangeRegion(r.id)}
              className={`px-3 py-1 rounded-full flex items-center gap-1.5 transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#2997ff] text-white font-semibold shadow-xs'
                  : 'bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 hover:text-white'
              }`}
            >
              <span>{r.flag}</span>
              <span>{r.label}</span>
            </button>
          );
        })}
      </div>

      {/* Middle: Basemap Selector */}
      <div className="flex items-center gap-1.5 overflow-x-auto">
        <span className="text-neutral-400 font-semibold text-[11px] uppercase tracking-wider mr-1 flex items-center gap-1">
          <Layers className="w-3.5 h-3.5 text-neutral-400" />
          Basemap:
        </span>
        {basemaps.map((b) => {
          const Icon = b.icon;
          const isActive = basemapMode === b.id;
          return (
            <button
              key={b.id}
              type="button"
              onClick={() => onChangeBasemap(b.id)}
              className={`px-2.5 py-1 rounded-full flex items-center gap-1.5 transition-all cursor-pointer ${
                isActive
                  ? 'bg-white text-[#1d1d1f] font-semibold shadow-xs'
                  : 'bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 hover:text-white'
              }`}
            >
              <Icon className="w-3 h-3" />
              <span>{b.label}</span>
            </button>
          );
        })}
      </div>

      {/* Right: Layout Switcher (Single vs Dual Split Screen) */}
      <div className="flex items-center gap-2">
        <div className="flex items-center bg-neutral-800 p-0.5 rounded-full border border-neutral-700">
          <button
            type="button"
            onClick={() => onChangeLayoutMode('single')}
            title="Single Tactical Map View"
            className={`px-3 py-1 rounded-full flex items-center gap-1.5 transition-all cursor-pointer ${
              layoutMode === 'single'
                ? 'bg-[#0066cc] text-white font-semibold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Single Map</span>
          </button>

          <button
            type="button"
            onClick={() => onChangeLayoutMode('split')}
            title="Dual Map Split Screen Comparison"
            className={`px-3 py-1 rounded-full flex items-center gap-1.5 transition-all cursor-pointer ${
              layoutMode === 'split'
                ? 'bg-[#0066cc] text-white font-semibold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <SplitSquareVertical className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Dual Split-Screen</span>
          </button>
        </div>

        {layoutMode === 'split' && onToggleSyncViews && (
          <button
            type="button"
            onClick={onToggleSyncViews}
            className={`px-2.5 py-1 rounded-full border transition-all cursor-pointer flex items-center gap-1 text-[11px] ${
              syncViews
                ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-400 font-medium'
                : 'bg-neutral-800 border-neutral-700 text-neutral-400 hover:text-white'
            }`}
          >
            <RefreshCw className={`w-3 h-3 ${syncViews ? 'text-emerald-400' : ''}`} />
            <span>Sync Pan/Zoom</span>
          </button>
        )}

        {onResetView && (
          <button
            type="button"
            onClick={onResetView}
            title="Recenter and Fit Route Bounds"
            className="p-1.5 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-all cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5" />
          </button>
        )}

        {activeRouteName && (
          <span className="hidden xl:inline-block px-2.5 py-0.5 rounded-full bg-neutral-800 text-neutral-400 font-mono text-[11px] truncate max-w-[160px]">
            {activeRouteName}
          </span>
        )}
      </div>
    </div>
  );
};
