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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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
    <form onSubmit={handleSubmit} className="apple-card p-6 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-[#f0f0f0]">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-full bg-[#f5f5f7] border border-[#e0e0e0] text-[#1d1d1f]">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-[16px] font-semibold text-[#1d1d1f]">
              Expedition Parameters & Constraints
            </h3>
            <span className="text-[12px] text-neutral-500 font-normal">
              Antarctic High-Latitude Route Request
            </span>
          </div>
        </div>

        <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#f5f5f7] text-[#1d1d1f] border border-[#e0e0e0]">
          CONFIG DECK
        </span>
      </div>

      {/* 1. Vessel & Polar Capability */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Vessel Choice */}
        <div className="space-y-1.5">
          <label className="text-[12px] font-semibold text-neutral-600 flex items-center gap-1.5">
            <Ship className="w-3.5 h-3.5 text-[#1d1d1f]" />
            Vessel Profile
          </label>
          <Select
            value={vessel}
            onValueChange={(val) => setVessel(val as MissionConfig['vessel'])}
          >
            <SelectTrigger className="bg-[#f5f5f7] border-[#e0e0e0] text-[#1d1d1f] rounded-[11px] h-10">
              <SelectValue placeholder="Select vessel" />
            </SelectTrigger>
            <SelectContent className="bg-white border-[#e0e0e0] rounded-[14px]">
              <SelectItem value="Polar Research Vessel">Polar Research Vessel (R/V Sentinel)</SelectItem>
              <SelectItem value="Research Vessel Alpha">Research Vessel Alpha</SelectItem>
              <SelectItem value="Ice-Class Supply Vessel">Ice-Class Supply Vessel</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Polar Capability (PC1 - PC7) */}
        <div className="space-y-1.5">
          <label className="text-[12px] font-semibold text-neutral-600 flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-[#1d1d1f]" />
            Polar Class Capability
          </label>
          <Select
            value={polarCapability}
            onValueChange={(val) => setPolarCapability(val as PolarCapability)}
          >
            <SelectTrigger className="bg-[#f5f5f7] border-[#e0e0e0] text-[#1d1d1f] rounded-[11px] h-10">
              <SelectValue placeholder="Select Polar Class" />
            </SelectTrigger>
            <SelectContent className="bg-white border-[#e0e0e0] rounded-[14px]">
              <SelectItem value="PC1">PC1 — Year-round all polar waters</SelectItem>
              <SelectItem value="PC2">PC2 — Year-round moderate multi-year ice</SelectItem>
              <SelectItem value="PC3">PC3 — Year-round thick first-year ice</SelectItem>
              <SelectItem value="PC4">PC4 — Year-round thick first-year with old ice</SelectItem>
              <SelectItem value="PC5">PC5 — Year-round medium first-year ice</SelectItem>
              <SelectItem value="PC6">PC6 — Summer/autumn medium first-year ice</SelectItem>
              <SelectItem value="PC7">PC7 — Summer/autumn thin first-year ice</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 2. Start & Destination Coordinates */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#f0f0f0]">
        {/* Start Coordinates */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-[12px] font-semibold text-neutral-600 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#1d1d1f]" />
              Start Location (Origin)
            </label>
            <span className="text-[11px] text-neutral-400 font-mono">Lat / Lng</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              step="0.0001"
              value={startLat}
              onChange={(e) => setStartLat(parseFloat(e.target.value))}
              placeholder="Latitude"
              className="bg-[#f5f5f7] border border-[#e0e0e0] rounded-[11px] px-3 py-2 text-[12px] font-mono text-[#1d1d1f] focus:outline-none focus:border-[#0066cc]"
            />
            <input
              type="number"
              step="0.0001"
              value={startLng}
              onChange={(e) => setStartLng(parseFloat(e.target.value))}
              placeholder="Longitude"
              className="bg-[#f5f5f7] border border-[#e0e0e0] rounded-[11px] px-3 py-2 text-[12px] font-mono text-[#1d1d1f] focus:outline-none focus:border-[#0066cc]"
            />
          </div>

          {/* Quick Presets */}
          <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
            <span className="text-[10px] text-neutral-400 font-normal">Presets:</span>
            {START_PRESETS.map((p, idx) => (
              <button
                type="button"
                key={p.name}
                onClick={() => handleStartPreset(idx)}
                className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#f5f5f7] hover:bg-[#e0e0e0] text-[#1d1d1f] border border-[#e0e0e0] transition-colors"
              >
                {p.name.split(' (')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Destination Coordinates */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-[12px] font-semibold text-neutral-600 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#1d1d1f]" />
              Destination Station
            </label>
            <span className="text-[11px] text-neutral-400 font-mono">Lat / Lng</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              step="0.0001"
              value={destLat}
              onChange={(e) => setDestLat(parseFloat(e.target.value))}
              placeholder="Latitude"
              className="bg-[#f5f5f7] border border-[#e0e0e0] rounded-[11px] px-3 py-2 text-[12px] font-mono text-[#1d1d1f] focus:outline-none focus:border-[#0066cc]"
            />
            <input
              type="number"
              step="0.0001"
              value={destLng}
              onChange={(e) => setDestLng(parseFloat(e.target.value))}
              placeholder="Longitude"
              className="bg-[#f5f5f7] border border-[#e0e0e0] rounded-[11px] px-3 py-2 text-[12px] font-mono text-[#1d1d1f] focus:outline-none focus:border-[#0066cc]"
            />
          </div>

          {/* Quick Presets */}
          <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
            <span className="text-[10px] text-neutral-400 font-normal">Presets:</span>
            {DESTINATION_PRESETS.map((p, idx) => (
              <button
                type="button"
                key={p.name}
                onClick={() => handleDestPreset(idx)}
                className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#f5f5f7] hover:bg-[#e0e0e0] text-[#1d1d1f] border border-[#e0e0e0] transition-colors"
              >
                {p.name.split(' (')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Mission Timing & Priority Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 border-t border-[#f0f0f0]">
        {/* Mission Date */}
        <div className="space-y-1.5">
          <label className="text-[12px] font-semibold text-neutral-600 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#1d1d1f]" />
            Mission Date
          </label>
          <input
            type="date"
            value={missionDate}
            onChange={(e) => setMissionDate(e.target.value)}
            className="w-full bg-[#f5f5f7] border border-[#e0e0e0] rounded-[11px] px-3 py-2 text-[12px] font-mono text-[#1d1d1f] focus:outline-none focus:border-[#0066cc]"
          />
        </div>

        {/* Departure Time */}
        <div className="space-y-1.5">
          <label className="text-[12px] font-semibold text-neutral-600 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#1d1d1f]" />
            Departure Time
          </label>
          <input
            type="text"
            value={departureTime}
            onChange={(e) => setDepartureTime(e.target.value)}
            placeholder="06:00 UTC"
            className="w-full bg-[#f5f5f7] border border-[#e0e0e0] rounded-[11px] px-3 py-2 text-[12px] font-mono text-[#1d1d1f] focus:outline-none focus:border-[#0066cc]"
          />
        </div>

        {/* Navigation Priority */}
        <div className="space-y-1.5">
          <label className="text-[12px] font-semibold text-neutral-600 flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-[#1d1d1f]" />
            Navigation Priority
          </label>
          <Select
            value={navigationPriority}
            onValueChange={(val) => setNavigationPriority(val as NavigationPriority)}
          >
            <SelectTrigger className="bg-[#f5f5f7] border-[#e0e0e0] text-[#1d1d1f] rounded-[11px] h-10">
              <SelectValue placeholder="Select Priority" />
            </SelectTrigger>
            <SelectContent className="bg-white border-[#e0e0e0] rounded-[14px]">
              <SelectItem value="Balanced">Balanced (Default)</SelectItem>
              <SelectItem value="Safest">Safest (Minimum Risk)</SelectItem>
              <SelectItem value="Fastest">Fastest (Time Critical)</SelectItem>
              <SelectItem value="Fuel Efficient">Fuel Efficient</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Forecast Horizon */}
        <div className="space-y-1.5">
          <label className="text-[12px] font-semibold text-neutral-600 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#1d1d1f]" />
            Forecast Horizon
          </label>
          <Select
            value={forecastHorizon}
            onValueChange={(val) => setForecastHorizon(val as ForecastHorizon)}
          >
            <SelectTrigger className="bg-[#f5f5f7] border-[#e0e0e0] text-[#1d1d1f] rounded-[11px] h-10">
              <SelectValue placeholder="Select Horizon" />
            </SelectTrigger>
            <SelectContent className="bg-white border-[#e0e0e0] rounded-[14px]">
              <SelectItem value="24 hours">24 hours</SelectItem>
              <SelectItem value="48 hours">48 hours</SelectItem>
              <SelectItem value="72 hours">72 hours (Recommended)</SelectItem>
              <SelectItem value="7 days">7 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 4. Action Button */}
      <div className="pt-3 border-t border-[#f0f0f0] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-[12px] text-neutral-500 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Antarctic environmental ensemble solvers ready</span>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="btn-apple-primary w-full sm:w-auto"
        >
          <Sparkles className="w-4 h-4" />
          <span>Generate Navigation Plan</span>
        </button>
      </div>
    </form>
  );
};
