import React, { useState } from 'react';
import {
  Ship,
  Shield,
  MapPin,
  Calendar,
  Clock,
  Sliders,
  Sparkles,
  Compass,
} from 'lucide-react';
import {
  MissionConfig,
  PolarCapability,
  NavigationPriority,
  ForecastHorizon,
} from '@/types';

interface MissionFormProps {
  onSubmit: (config: MissionConfig) => void;
  isLoading?: boolean;
}

const START_PRESETS = [
  { name: 'Southern Ocean Entry (60°S, 58°E)', lat: -60.1, lng: 58.2 },
  { name: 'Cape Town (-33.92, 18.42)', lat: -33.92, lng: 18.42 },
  { name: 'Punta Arenas (-53.16, -70.91)', lat: -53.16, lng: -70.91 },
  { name: 'Hobart (-42.88, 147.32)', lat: -42.88, lng: 147.32 },
];

const DESTINATION_PRESETS = [
  { name: 'Bharati Station (-69.41, 76.19)', lat: -69.4075, lng: 76.1947 },
  { name: 'Maitri Station (-70.77, 11.73)', lat: -70.77, lng: 11.73 },
  { name: 'McMurdo Station (-77.85, 166.67)', lat: -77.85, lng: 166.67 },
  { name: 'Davis Station (-68.58, 77.97)', lat: -68.58, lng: 77.97 },
];

export const MissionForm: React.FC<MissionFormProps> = ({
  onSubmit,
  isLoading = false,
}) => {
  const [vessel, setVessel] = useState<MissionConfig['vessel']>('Polar Research Vessel');
  const [polarCapability, setPolarCapability] = useState<PolarCapability>('PC3');
  const [startName, setStartName] = useState('Southern Ocean Entry');
  const [startLat, setStartLat] = useState(-60.1);
  const [startLng, setStartLng] = useState(58.2);
  const [destName, setDestName] = useState('Bharati Station (Larsemann Hills)');
  const [destLat, setDestLat] = useState(-69.4075);
  const [destLng, setDestLng] = useState(76.1947);
  const [missionDate, setMissionDate] = useState('2026-09-15');
  const [departureTime, setDepartureTime] = useState('06:00 UTC');
  const [navigationPriority, setNavigationPriority] = useState<NavigationPriority>('Balanced');
  const [forecastHorizon, setForecastHorizon] = useState<ForecastHorizon>('72 hours');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      vessel,
      polarCapability,
      startLocation: { name: startName, lat: startLat, lng: startLng },
      destination: { name: destName, lat: destLat, lng: destLng },
      missionDate,
      departureTime,
      navigationPriority,
      forecastHorizon,
    });
  };

  const handleStartPreset = (idx: number) => {
    const preset = START_PRESETS[idx];
    setStartName(preset.name.split(' (')[0]);
    setStartLat(preset.lat);
    setStartLng(preset.lng);
  };

  const handleDestPreset = (idx: number) => {
    const preset = DESTINATION_PRESETS[idx];
    setDestName(preset.name.split(' (')[0]);
    setDestLat(preset.lat);
    setDestLng(preset.lng);
  };

  return (
    <form onSubmit={handleSubmit} className="polar-panel p-5 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-polar-700/60">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded bg-ice-500/10 border border-ice-500/30 text-ice-400">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold font-sans text-slate-100">
              Expedition Parameters & Constraints
            </h3>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
              Antarctic Navigation Request Configuration
            </span>
          </div>
        </div>

        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-polar-800 text-ice-300 border border-polar-700">
          MISSION DECK
        </span>
      </div>

      {/* 1. Vessel & Polar Capability */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Vessel Choice */}
        <div className="space-y-1.5">
          <label className="text-xs font-mono font-medium text-slate-300 flex items-center gap-1.5">
            <Ship className="w-3.5 h-3.5 text-ice-400" />
            Vessel Profile
          </label>
          <select
            value={vessel}
            onChange={(e) => setVessel(e.target.value as MissionConfig['vessel'])}
            className="w-full bg-polar-900 border border-polar-700 rounded-md px-3 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-ice-500"
          >
            <option value="Polar Research Vessel">Polar Research Vessel (R/V Sentinel)</option>
            <option value="Research Vessel Alpha">Research Vessel Alpha</option>
            <option value="Ice-Class Supply Vessel">Ice-Class Supply Vessel</option>
          </select>
        </div>

        {/* Polar Capability (PC1 - PC7) */}
        <div className="space-y-1.5">
          <label className="text-xs font-mono font-medium text-slate-300 flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            Polar Class Capability
          </label>
          <select
            value={polarCapability}
            onChange={(e) => setPolarCapability(e.target.value as PolarCapability)}
            className="w-full bg-polar-900 border border-polar-700 rounded-md px-3 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-ice-500"
          >
            <option value="PC1">PC1 — Year-round all polar waters</option>
            <option value="PC2">PC2 — Year-round moderate multi-year ice</option>
            <option value="PC3">PC3 — Year-round thick first-year ice</option>
            <option value="PC4">PC4 — Year-round thick first-year with old ice</option>
            <option value="PC5">PC5 — Year-round medium first-year ice</option>
            <option value="PC6">PC6 — Summer/autumn medium first-year ice</option>
            <option value="PC7">PC7 — Summer/autumn thin first-year ice</option>
          </select>
        </div>
      </div>

      {/* 2. Start & Destination Coordinates */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 border-t border-polar-800">
        {/* Start Coordinates */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono font-medium text-slate-300 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-ice-400" />
              Start Location
            </label>
            <span className="text-[10px] font-mono text-slate-400">Lat / Lng</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              step="0.0001"
              value={startLat}
              onChange={(e) => setStartLat(parseFloat(e.target.value))}
              placeholder="Latitude"
              className="bg-polar-900 border border-polar-700 rounded px-2.5 py-1.5 text-xs font-mono text-slate-200 focus:outline-none focus:border-ice-500"
            />
            <input
              type="number"
              step="0.0001"
              value={startLng}
              onChange={(e) => setStartLng(parseFloat(e.target.value))}
              placeholder="Longitude"
              className="bg-polar-900 border border-polar-700 rounded px-2.5 py-1.5 text-xs font-mono text-slate-200 focus:outline-none focus:border-ice-500"
            />
          </div>

          {/* Quick Presets */}
          <div className="flex items-center gap-1 flex-wrap pt-0.5">
            <span className="text-[9px] font-mono text-slate-400 mr-1">Presets:</span>
            {START_PRESETS.map((p, idx) => (
              <button
                type="button"
                key={p.name}
                onClick={() => handleStartPreset(idx)}
                className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-polar-900 hover:bg-polar-800 text-slate-300 border border-polar-700"
              >
                {p.name.split(' (')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Destination Coordinates */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono font-medium text-slate-300 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              Destination
            </label>
            <span className="text-[10px] font-mono text-slate-400">Lat / Lng</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              step="0.0001"
              value={destLat}
              onChange={(e) => setDestLat(parseFloat(e.target.value))}
              placeholder="Latitude"
              className="bg-polar-900 border border-polar-700 rounded px-2.5 py-1.5 text-xs font-mono text-slate-200 focus:outline-none focus:border-ice-500"
            />
            <input
              type="number"
              step="0.0001"
              value={destLng}
              onChange={(e) => setDestLng(parseFloat(e.target.value))}
              placeholder="Longitude"
              className="bg-polar-900 border border-polar-700 rounded px-2.5 py-1.5 text-xs font-mono text-slate-200 focus:outline-none focus:border-ice-500"
            />
          </div>

          {/* Quick Presets */}
          <div className="flex items-center gap-1 flex-wrap pt-0.5">
            <span className="text-[9px] font-mono text-slate-400 mr-1">Presets:</span>
            {DESTINATION_PRESETS.map((p, idx) => (
              <button
                type="button"
                key={p.name}
                onClick={() => handleDestPreset(idx)}
                className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-polar-900 hover:bg-polar-800 text-slate-300 border border-polar-700"
              >
                {p.name.split(' (')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Mission Timing & Priority Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1 border-t border-polar-800">
        {/* Mission Date */}
        <div className="space-y-1.5">
          <label className="text-xs font-mono font-medium text-slate-300 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-ice-400" />
            Mission Date
          </label>
          <input
            type="date"
            value={missionDate}
            onChange={(e) => setMissionDate(e.target.value)}
            className="w-full bg-polar-900 border border-polar-700 rounded px-2.5 py-1.5 text-xs font-mono text-slate-200 focus:outline-none focus:border-ice-500"
          />
        </div>

        {/* Departure Time */}
        <div className="space-y-1.5">
          <label className="text-xs font-mono font-medium text-slate-300 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-ice-400" />
            Departure Time
          </label>
          <input
            type="text"
            value={departureTime}
            onChange={(e) => setDepartureTime(e.target.value)}
            placeholder="06:00 UTC"
            className="w-full bg-polar-900 border border-polar-700 rounded px-2.5 py-1.5 text-xs font-mono text-slate-200 focus:outline-none focus:border-ice-500"
          />
        </div>

        {/* Navigation Priority */}
        <div className="space-y-1.5">
          <label className="text-xs font-mono font-medium text-slate-300 flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-cyan-400" />
            Navigation Priority
          </label>
          <select
            value={navigationPriority}
            onChange={(e) => setNavigationPriority(e.target.value as NavigationPriority)}
            className="w-full bg-polar-900 border border-polar-700 rounded px-2.5 py-1.5 text-xs font-mono text-slate-200 focus:outline-none focus:border-ice-500"
          >
            <option value="Balanced">Balanced (Default)</option>
            <option value="Safest">Safest (Minimum Risk)</option>
            <option value="Fastest">Fastest (Time Critical)</option>
            <option value="Fuel Efficient">Fuel Efficient</option>
          </select>
        </div>

        {/* Forecast Horizon */}
        <div className="space-y-1.5">
          <label className="text-xs font-mono font-medium text-slate-300 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            Forecast Horizon
          </label>
          <select
            value={forecastHorizon}
            onChange={(e) => setForecastHorizon(e.target.value as ForecastHorizon)}
            className="w-full bg-polar-900 border border-polar-700 rounded px-2.5 py-1.5 text-xs font-mono text-slate-200 focus:outline-none focus:border-ice-500"
          >
            <option value="24 hours">24 hours</option>
            <option value="48 hours">48 hours</option>
            <option value="72 hours">72 hours (Recommended)</option>
            <option value="7 days">7 days</option>
          </select>
        </div>
      </div>

      {/* 4. Action Button */}
      <div className="pt-3 border-t border-polar-700/60 flex items-center justify-between gap-4">
        <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>Antarctic environmental ensemble models active</span>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-ice-500 hover:bg-ice-400 text-polar-950 font-mono font-bold text-xs shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-ice-500/20"
        >
          <Sparkles className="w-4 h-4" />
          <span>Generate Navigation Plan</span>
        </button>
      </div>
    </form>
  );
};
