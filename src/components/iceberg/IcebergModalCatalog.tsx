import React, { useState } from 'react';
import {
  DetailedIceberg,
  DETAILED_ICEBERGS_CATALOG,
} from '@/data/icebergIntelligenceData';
import {
  Mountain,
  Search,
  X,
  Radar,
  Compass,
  Gauge,
  Ruler,
  ShieldAlert,
  Zap,
} from 'lucide-react';
import { IcebergTrajectoryChart } from './IcebergTrajectoryChart';

interface IcebergModalCatalogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedIceberg: DetailedIceberg;
  onSelectIceberg: (iceberg: DetailedIceberg) => void;
}

export const IcebergModalCatalog: React.FC<IcebergModalCatalogProps> = ({
  isOpen,
  onClose,
  selectedIceberg,
  onSelectIceberg,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterRisk, setFilterRisk] = useState<string>('ALL');
  const [lockedTargets, setLockedTargets] = useState<string[]>(['IB-023']);

  if (!isOpen) return null;

  const handleToggleLock = (code: string) => {
    setLockedTargets((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
  };

  const filtered = DETAILED_ICEBERGS_CATALOG.filter((ib) => {
    const matchesRisk =
      filterRisk === 'ALL' ||
      (filterRisk === 'HIGH_RISK' && (ib.riskCategory === 'HIGH RISK' || ib.riskLevel === 'CRITICAL' || ib.riskLevel === 'HIGH')) ||
      ib.riskCategory === filterRisk ||
      ib.riskLevel === filterRisk;
    const matchesSearch =
      ib.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ib.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ib.seaLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ib.nearestStation.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRisk && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-6xl max-h-[92vh] bg-white rounded-[20px] border border-[#e0e0e0] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#f0f0f0] flex items-center justify-between bg-[#fafafc] shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-[#f5f5f7] border border-[#e0e0e0] text-[#0066cc]">
              <Mountain className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h3 className="text-[17px] font-semibold text-[#1d1d1f] tracking-tight">
                  Antarctic Iceberg Catalog & SAR Telemetry
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#f0f7ff] text-[#0066cc] border border-[#d0e6ff]">
                  37 Active Targets
                </span>
              </div>
              <p className="text-[12px] text-neutral-500 font-normal">
                Lagrangian Hydrodynamic Drift Simulation & Collision Incursion Analytics
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-neutral-400 hover:text-[#1d1d1f] hover:bg-[#f5f5f7] transition-colors active:scale-95"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body - 2 Columns */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#f0f0f0]">
          {/* Left Column: Search & 37 Object List */}
          <div className="lg:col-span-5 flex flex-col h-full overflow-hidden p-4 space-y-3 bg-[#fafafc]">
            {/* Search & Filter Bar */}
            <div className="space-y-2 shrink-0">
              <div className="relative">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search code, sea sector, station..."
                  className="w-full h-9 bg-white border border-[#e0e0e0] rounded-[11px] pl-9 pr-3 text-[12px] placeholder:text-neutral-400 focus:outline-none focus:border-[#0066cc]"
                />
              </div>

              {/* Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px]">
                {['ALL', 'HIGH_RISK', 'ELEVATED', 'MODERATE', 'LOW'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilterRisk(cat)}
                    className={`px-3 py-1 rounded-full border font-normal transition-colors whitespace-nowrap active:scale-95 ${
                      filterRisk === cat
                        ? 'bg-[#0066cc] text-white border-[#0066cc]'
                        : 'bg-white text-neutral-700 border-[#e0e0e0] hover:bg-[#f5f5f7]'
                    }`}
                  >
                    {cat === 'ALL' ? 'All (37)' : cat.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Scrollable List */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              {filtered.map((ib) => {
                const isSelected = selectedIceberg.id === ib.id || selectedIceberg.code === ib.code;

                return (
                  <div
                    key={ib.id}
                    onClick={() => onSelectIceberg(ib)}
                    className={`p-3 rounded-[12px] border transition-all cursor-pointer flex items-center justify-between gap-3 active:scale-95 ${
                      isSelected
                        ? 'bg-white border-[#0066cc] ring-1 ring-[#0066cc]'
                        : 'bg-white hover:bg-[#f5f5f7] border-[#e0e0e0]'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className="w-2 h-8 rounded-full shrink-0"
                        style={{ backgroundColor: ib.themeColor || '#0066cc' }}
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[13px] font-semibold font-mono text-[#1d1d1f]">
                            {ib.code}
                          </span>
                          <span className="text-[11px] text-neutral-500 truncate font-normal">
                            {ib.seaLocation}
                          </span>
                        </div>
                        <div className="text-[11px] text-neutral-500 mt-0.5 truncate font-normal">
                          {ib.sizeKm2} km² &bull; {ib.driftSpeedKmh} km/h &bull; CPA: {ib.routeDistanceKm} km
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span
                        className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold border"
                        style={{
                          backgroundColor: `${ib.themeColor}15`,
                          color: ib.themeColor,
                          borderColor: `${ib.themeColor}40`,
                        }}
                      >
                        {ib.riskCategory}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: In-Depth Telemetry & Trajectory Analysis */}
          <div className="lg:col-span-7 flex flex-col h-full overflow-y-auto p-5 space-y-5 bg-white">
            {/* Top Identity Card */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#f0f0f0]">
              <div>
                <div className="flex items-center gap-2.5">
                  <h4 className="text-[20px] font-semibold font-mono text-[#1d1d1f]">
                    {selectedIceberg.code}
                  </h4>
                  <span
                    className="px-3 py-0.5 rounded-full text-[11px] font-semibold border"
                    style={{
                      backgroundColor: `${selectedIceberg.themeColor}15`,
                      color: selectedIceberg.themeColor,
                      borderColor: `${selectedIceberg.themeColor}40`,
                    }}
                  >
                    {selectedIceberg.riskCategory}
                  </span>
                </div>
                <p className="text-[12px] text-neutral-500 font-normal mt-0.5">
                  {selectedIceberg.name} &bull; Location: {selectedIceberg.seaLocation}
                </p>
              </div>

              <button
                onClick={() => handleToggleLock(selectedIceberg.code)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-semibold transition-all active:scale-95 ${
                  lockedTargets.includes(selectedIceberg.code)
                    ? 'bg-emerald-600 text-white'
                    : 'btn-apple-primary'
                }`}
              >
                <Radar className="w-4 h-4" />
                <span>
                  {lockedTargets.includes(selectedIceberg.code)
                    ? 'RADAR LOCKED'
                    : 'LOCK RADAR TARGET'}
                </span>
              </button>
            </div>

            {/* 4 Core Dimensions */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-[12px]">
              <div className="p-3 rounded-[12px] bg-[#fafafc] border border-[#e0e0e0]">
                <div className="flex items-center gap-1.5 text-neutral-500 text-[10px] font-normal">
                  <Ruler className="w-3.5 h-3.5 text-[#0066cc]" />
                  <span>DIMENSIONS</span>
                </div>
                <div className="text-[15px] font-semibold text-[#1d1d1f] mt-1">
                  {selectedIceberg.sizeKm2} km²
                </div>
                <div className="text-[10px] text-neutral-500 mt-0.5 font-normal">
                  L: {selectedIceberg.lengthKm}k × W: {selectedIceberg.widthKm}k
                </div>
              </div>

              <div className="p-3 rounded-[12px] bg-[#fafafc] border border-[#e0e0e0]">
                <div className="flex items-center gap-1.5 text-neutral-500 text-[10px] font-normal">
                  <Gauge className="w-3.5 h-3.5 text-[#0066cc]" />
                  <span>DRIFT SPEED</span>
                </div>
                <div className="text-[15px] font-semibold text-[#1d1d1f] mt-1">
                  {selectedIceberg.driftSpeedKmh} km/h
                </div>
                <div className="text-[10px] text-neutral-500 mt-0.5 font-normal">
                  {selectedIceberg.velocityMs} m/s
                </div>
              </div>

              <div className="p-3 rounded-[12px] bg-[#fafafc] border border-[#e0e0e0]">
                <div className="flex items-center gap-1.5 text-neutral-500 text-[10px] font-normal">
                  <Compass className="w-3.5 h-3.5 text-[#0066cc]" />
                  <span>HEADING</span>
                </div>
                <div className="text-[15px] font-semibold text-[#1d1d1f] mt-1">
                  {selectedIceberg.directionCompass} ({selectedIceberg.directionDeg}°)
                </div>
                <div className="text-[10px] text-neutral-500 mt-0.5 font-normal">
                  True Bearing
                </div>
              </div>

              <div className="p-3 rounded-[12px] bg-[#fafafc] border border-[#e0e0e0]">
                <div className="flex items-center gap-1.5 text-amber-600 text-[10px] font-normal">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                  <span>CPA DISTANCE</span>
                </div>
                <div className="text-[15px] font-semibold text-rose-700 mt-1">
                  {selectedIceberg.routeDistanceKm} km
                </div>
                <div className="text-[10px] text-neutral-500 mt-0.5 font-normal">
                  Prob: {selectedIceberg.collisionProbabilityPct}%
                </div>
              </div>
            </div>

            {/* AI Explanation */}
            <div className="p-4 rounded-[14px] bg-[#fafafc] border border-[#e0e0e0] space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[12px] font-semibold text-[#1d1d1f]">
                  <Zap className="w-3.5 h-3.5 text-[#0066cc]" />
                  <span>AI HYDRODYNAMIC DRIFT DIAGNOSTIC</span>
                </div>
                <span className="text-[11px] font-semibold bg-[#f0f7ff] text-[#0066cc] px-2.5 py-0.5 rounded-full border border-[#d0e6ff]">
                  Confidence: {selectedIceberg.confidencePct}%
                </span>
              </div>
              <p className="text-[13px] text-neutral-700 leading-relaxed italic font-normal">
                &quot;{selectedIceberg.aiExplanation}&quot;
              </p>
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#f0f0f0] text-center text-[11px]">
                <div className="p-2 rounded-[10px] bg-white border border-[#e0e0e0]">
                  <span className="text-neutral-500 text-[10px] block font-normal">OCEAN CURRENT</span>
                  <span className="font-semibold text-[#1d1d1f]">{selectedIceberg.oceanCurrentForcingPct}%</span>
                </div>
                <div className="p-2 rounded-[10px] bg-white border border-[#e0e0e0]">
                  <span className="text-neutral-500 text-[10px] block font-normal">WIND DRAG</span>
                  <span className="font-semibold text-[#1d1d1f]">{selectedIceberg.windDragForcingPct}%</span>
                </div>
                <div className="p-2 rounded-[10px] bg-white border border-[#e0e0e0]">
                  <span className="text-neutral-500 text-[10px] block font-normal">CORIOLIS / WAVES</span>
                  <span className="font-semibold text-[#1d1d1f]">{selectedIceberg.coriolisForcingPct}%</span>
                </div>
              </div>
            </div>

            {/* Trajectory Hydrodynamics Chart */}
            <div>
              <IcebergTrajectoryChart iceberg={selectedIceberg} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
