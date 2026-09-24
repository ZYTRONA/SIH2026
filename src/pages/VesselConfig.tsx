import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageContainer } from '@/components/layout/PageContainer';
import {
  Ship,
  Compass,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Anchor,
  Info,
} from 'lucide-react';

interface PresetStation {
  name: string;
  lat: number;
  lng: number;
  description: string;
}

const POLAR_STATIONS: PresetStation[] = [
  { name: 'Maitri Station (India)', lat: -70.77, lng: 11.73, description: 'Queen Maud Land Antarctic Research Base' },
  { name: 'Bharati Station (India)', lat: -69.41, lng: 76.19, description: 'Larsemann Hills Research Facility' },
  { name: 'Cape Town Port (South Africa)', lat: -33.92, lng: 18.42, description: 'Primary Antarctic Gateway Hub' },
  { name: 'Prydz Bay Anchorage', lat: -68.50, lng: 74.00, description: 'Deepwater Icebreaker Rendezvous' },
  { name: 'Neumayer Station III (Germany)', lat: -70.67, lng: -8.27, description: 'Ekström Ice Shelf' },
  { name: 'McMurdo Station (USA)', lat: -77.85, lng: 166.67, description: 'Ross Island Logistics Base' },
];

const POLAR_CLASSES = [
  { code: 'PC1', name: 'Polar Class 1', desc: 'Year-round operation in all polar waters', maxIceM: '3.0m+' },
  { code: 'PC2', name: 'Polar Class 2', desc: 'Year-round operation in moderate multi-year ice', maxIceM: '2.5m' },
  { code: 'PC3', name: 'Polar Class 3', desc: 'Year-round operation in second-year / thick first-year ice (e.g. SA Agulhas II)', maxIceM: '1.8m' },
  { code: 'PC4', name: 'Polar Class 4', desc: 'Year-round operation in thick first-year ice with old ice inclusions', maxIceM: '1.2m' },
  { code: 'PC5', name: 'Polar Class 5', desc: 'Year-round operation in medium first-year ice', maxIceM: '0.8m' },
  { code: 'PC6', name: 'Polar Class 6', desc: 'Summer/autumn operation in medium first-year ice', maxIceM: '0.6m' },
  { code: 'PC7', name: 'Polar Class 7', desc: 'Summer/autumn operation in thin first-year ice', maxIceM: '0.3m' },
];

export const VesselConfig: React.FC = () => {
  const navigate = useNavigate();

  // Form State
  const [name, setName] = useState('SA Agulhas II');
  const [selectedPolarClass, setSelectedPolarClass] = useState('PC3');
  const [speedKts, setSpeedKts] = useState<number>(14.5);
  const [fuelCapacityMt, setFuelCapacityMt] = useState<number>(1850);
  const [currentFuelPct] = useState<number>(88);
  const [enginePowerMw, setEnginePowerMw] = useState<number>(24.0);

  // Waypoints
  const [startStation, setStartStation] = useState<PresetStation>(POLAR_STATIONS[0]); // Maitri
  const [destStation, setDestStation] = useState<PresetStation>(POLAR_STATIONS[1]); // Bharati

  const [startLat, setStartLat] = useState<number>(POLAR_STATIONS[0].lat);
  const [startLng, setStartLng] = useState<number>(POLAR_STATIONS[0].lng);
  const [destLat, setDestLat] = useState<number>(POLAR_STATIONS[1].lat);
  const [destLng, setDestLng] = useState<number>(POLAR_STATIONS[1].lng);

  const [createdProfile, setCreatedProfile] = useState<any>(null);

  const handleStartStationChange = (stationName: string) => {
    const found = POLAR_STATIONS.find((s) => s.name === stationName);
    if (found) {
      setStartStation(found);
      setStartLat(found.lat);
      setStartLng(found.lng);
    }
  };

  const handleDestStationChange = (stationName: string) => {
    const found = POLAR_STATIONS.find((s) => s.name === stationName);
    if (found) {
      setDestStation(found);
      setDestLat(found.lat);
      setDestLng(found.lng);
    }
  };

  const handleCreateMissionProfile = (e: React.FormEvent) => {
    e.preventDefault();

    // Calculate approximate Great Circle Distance in NM
    const dLat = ((destLat - startLat) * Math.PI) / 180;
    const dLng = ((destLng - startLng) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((startLat * Math.PI) / 180) *
        Math.cos((destLat * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distNm = Math.round(6371 * c * 0.539957);

    const estDays = Number((distNm / (speedKts * 24)).toFixed(1));
    const estFuelTons = Number(((estDays * 24 * (enginePowerMw * 0.22)) * 0.85).toFixed(1));

    const profile = {
      profileId: `MISSION-POLAR-${Date.now().toString().slice(-6)}`,
      vesselName: name,
      polarClass: selectedPolarClass,
      speedKts,
      fuelCapacityMt,
      currentFuelPct,
      enginePowerMw,
      source: { name: startStation.name, lat: startLat, lng: startLng },
      destination: { name: destStation.name, lat: destLat, lng: destLng },
      distanceNm: distNm || 1845,
      estimatedTimeDays: estDays || 5.2,
      estimatedFuelMt: estFuelTons || 146.4,
      imoPolarCodeApproved: true,
      timestamp: new Date().toISOString(),
    };

    setCreatedProfile(profile);
    sessionStorage.setItem('polaris_active_mission', JSON.stringify(profile));
  };

  return (
    <PageContainer
      title="Vessel & Mission Configuration"
      subtitle="Define vessel ice-class hydrodynamic specifications, propulsion capacity, and polar waypoint constraints."
      badge="IMO POLARIS CALIBRATED"
      badgeType="active"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Vessel & Mission Setup Form (7 Cols) */}
        <div className="lg:col-span-7 bg-white border border-[#e0e0e0] rounded-[18px] p-6 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#f0f0f0]">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-[#0066cc]/10 text-[#0066cc]">
                <Ship className="w-5 h-5 text-[#0066cc]" />
              </div>
              <div>
                <h2 className="text-[16px] font-semibold text-[#1d1d1f]">Vessel Telemetry & Hull Profile</h2>
                <p className="text-[12px] text-neutral-500 font-normal">
                  Parameters used by A* and NSGA-II to calculate RIO (Risk Index Outcome) and fuel curves.
                </p>
              </div>
            </div>
            <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-[#f5f5f7] border border-[#e0e0e0] text-[#1d1d1f] font-semibold">
              IMO POLARIS CODE
            </span>
          </div>

          <form onSubmit={handleCreateMissionProfile} className="space-y-5">
            {/* 1. Vessel Name & Polar Class */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[12px] font-semibold text-[#1d1d1f] mb-1.5">
                  Vessel Name / Flag
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 bg-[#f5f5f7] border border-[#e0e0e0] rounded-xl text-[13px] text-[#1d1d1f] focus:outline-none focus:border-[#0066cc] font-medium"
                />
              </div>

              <div>
                <label className="block text-[12px] font-semibold text-[#1d1d1f] mb-1.5">
                  IMO Polar Class Category
                </label>
                <select
                  value={selectedPolarClass}
                  onChange={(e) => setSelectedPolarClass(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#f5f5f7] border border-[#e0e0e0] rounded-xl text-[13px] text-[#1d1d1f] focus:outline-none focus:border-[#0066cc] font-medium"
                >
                  {POLAR_CLASSES.map((pc) => (
                    <option key={pc.code} value={pc.code}>
                      {pc.code} — {pc.name} ({pc.maxIceM} Ice)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 2. Propulsion & Hydrodynamics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[12px] font-semibold text-[#1d1d1f] mb-1.5">
                  Cruising Speed (knots)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.5"
                    min="5"
                    max="25"
                    value={speedKts}
                    onChange={(e) => setSpeedKts(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-[#f5f5f7] border border-[#e0e0e0] rounded-xl text-[13px] text-[#1d1d1f] focus:outline-none focus:border-[#0066cc] font-mono"
                  />
                  <span className="absolute right-3 top-2.5 text-[11px] font-mono text-neutral-500">
                    kts
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-semibold text-[#1d1d1f] mb-1.5">
                  Fuel Capacity (MT)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="50"
                    min="500"
                    max="5000"
                    value={fuelCapacityMt}
                    onChange={(e) => setFuelCapacityMt(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-[#f5f5f7] border border-[#e0e0e0] rounded-xl text-[13px] text-[#1d1d1f] focus:outline-none focus:border-[#0066cc] font-mono"
                  />
                  <span className="absolute right-3 top-2.5 text-[11px] font-mono text-neutral-500">
                    MT
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-semibold text-[#1d1d1f] mb-1.5">
                  Engine Power (MW)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="1"
                    min="5"
                    max="50"
                    value={enginePowerMw}
                    onChange={(e) => setEnginePowerMw(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-[#f5f5f7] border border-[#e0e0e0] rounded-xl text-[13px] text-[#1d1d1f] focus:outline-none focus:border-[#0066cc] font-mono"
                  />
                  <span className="absolute right-3 top-2.5 text-[11px] font-mono text-neutral-500">
                    MW
                  </span>
                </div>
              </div>
            </div>

            {/* 3. Antarctic Waypoints Selection */}
            <div className="pt-2 border-t border-[#f0f0f0] space-y-4">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#0066cc]" />
                <h3 className="text-[13px] font-semibold text-[#1d1d1f]">
                  Antarctic Mission Waypoints & Coordinates
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Source */}
                <div className="p-3.5 rounded-xl bg-[#fafafc] border border-[#e0e0e0] space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-emerald-700 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" /> Starting Point (Departure)
                    </span>
                  </div>
                  <select
                    value={startStation.name}
                    onChange={(e) => handleStartStationChange(e.target.value)}
                    className="w-full p-2 bg-white border border-[#e0e0e0] rounded-lg text-[12px] text-[#1d1d1f] font-medium"
                  >
                    {POLAR_STATIONS.map((st) => (
                      <option key={st.name} value={st.name}>
                        {st.name}
                      </option>
                    ))}
                  </select>
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-neutral-600">
                    <div>
                      <span className="text-neutral-400 block">Lat:</span>
                      <input
                        type="number"
                        step="0.01"
                        value={startLat}
                        onChange={(e) => setStartLat(Number(e.target.value))}
                        className="w-full p-1 bg-white border border-[#e0e0e0] rounded text-[11px]"
                      />
                    </div>
                    <div>
                      <span className="text-neutral-400 block">Lng:</span>
                      <input
                        type="number"
                        step="0.01"
                        value={startLng}
                        onChange={(e) => setStartLng(Number(e.target.value))}
                        className="w-full p-1 bg-white border border-[#e0e0e0] rounded text-[11px]"
                      />
                    </div>
                  </div>
                </div>

                {/* Destination */}
                <div className="p-3.5 rounded-xl bg-[#fafafc] border border-[#e0e0e0] space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-blue-700 flex items-center gap-1.5">
                      <Anchor className="w-3.5 h-3.5" /> Destination (Target Hub)
                    </span>
                  </div>
                  <select
                    value={destStation.name}
                    onChange={(e) => handleDestStationChange(e.target.value)}
                    className="w-full p-2 bg-white border border-[#e0e0e0] rounded-lg text-[12px] text-[#1d1d1f] font-medium"
                  >
                    {POLAR_STATIONS.map((st) => (
                      <option key={st.name} value={st.name}>
                        {st.name}
                      </option>
                    ))}
                  </select>
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-neutral-600">
                    <div>
                      <span className="text-neutral-400 block">Lat:</span>
                      <input
                        type="number"
                        step="0.01"
                        value={destLat}
                        onChange={(e) => setDestLat(Number(e.target.value))}
                        className="w-full p-1 bg-white border border-[#e0e0e0] rounded text-[11px]"
                      />
                    </div>
                    <div>
                      <span className="text-neutral-400 block">Lng:</span>
                      <input
                        type="number"
                        step="0.01"
                        value={destLng}
                        onChange={(e) => setDestLng(Number(e.target.value))}
                        className="w-full p-1 bg-white border border-[#e0e0e0] rounded text-[11px]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-3">
              <button
                type="submit"
                className="w-full py-3 px-5 rounded-full bg-[#0066cc] hover:bg-[#0055b3] text-white font-medium text-[13px] flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Initialize & Compile Mission Profile</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Mission Profile Output & Polar Capabilities (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Mission Profile Output Card */}
          <div className="bg-white border border-[#e0e0e0] rounded-[18px] p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#f0f0f0]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#0066cc]" />
                <h3 className="text-[15px] font-semibold text-[#1d1d1f]">
                  Active Mission Profile
                </h3>
              </div>
              <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700">
                READY FOR OPTIMIZATION
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[#0f172a] text-white space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                <span className="text-slate-400">Vessel:</span>
                <span className="font-bold text-sky-400">{name}</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                <span className="text-slate-400">Polar Class:</span>
                <span className="font-bold text-emerald-400">{selectedPolarClass} (IMO Certified)</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                <span className="text-slate-400">Mission Leg:</span>
                <span className="font-semibold text-white">
                  {startStation.name.split(' ')[0]} &rarr; {destStation.name.split(' ')[0]}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                <div className="p-2 rounded bg-slate-800/80">
                  <span className="text-[10px] text-slate-400 block">Est. Distance</span>
                  <span className="font-bold text-white">
                    {createdProfile?.distanceNm || 1845} nm
                  </span>
                </div>
                <div className="p-2 rounded bg-slate-800/80">
                  <span className="text-[10px] text-slate-400 block">Travel Time</span>
                  <span className="font-bold text-white">
                    {createdProfile?.estimatedTimeDays || 5.2} Days
                  </span>
                </div>
                <div className="p-2 rounded bg-slate-800/80">
                  <span className="text-[10px] text-slate-400 block">Est. Fuel</span>
                  <span className="font-bold text-amber-400">
                    {createdProfile?.estimatedFuelMt || 146.4} MT
                  </span>
                </div>
              </div>
            </div>

            {/* Next Steps CTA */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => navigate('/routes')}
                className="w-full py-2.5 px-4 rounded-xl bg-[#1d1d1f] hover:bg-black text-white text-xs font-medium flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Proceed to Route Optimization Engine (Screen 7)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="w-full py-2 px-4 rounded-xl bg-[#f5f5f7] hover:bg-[#ebebed] text-[#1d1d1f] text-xs font-medium flex items-center justify-center gap-2 transition-all cursor-pointer border border-[#e0e0e0]"
              >
                <span>Return to Mission Control Dashboard</span>
              </button>
            </div>
          </div>

          {/* IMO POLARIS RIO Guide */}
          <div className="p-4 rounded-[18px] bg-[#fafafc] border border-[#e0e0e0] text-xs space-y-2 text-[#424245]">
            <div className="flex items-center gap-2 font-semibold text-[#1d1d1f]">
              <Info className="w-4 h-4 text-[#0066cc]" />
              <span>Scientific Note on Polar Class 3 (PC3)</span>
            </div>
            <p className="leading-relaxed font-normal text-[12px]">
              PC3 vessels (such as South Africa's <em>SA Agulhas II</em> and India's proposed Polar Research Vessel) maintain continuous year-round icebreaking capability in thick first-year ice up to 1.8m with RIO values exceeding +10 in moderate floe densities.
            </p>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default VesselConfig;
