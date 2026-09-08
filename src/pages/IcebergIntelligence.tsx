import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { AntarcticMap } from '@/components/map/AntarcticMap';
import {
  IcebergDetailPanel,
  IcebergTrajectoryChart,
  IcebergCatalogTable,
} from '@/components/iceberg';
import {
  DETAILED_ICEBERGS_CATALOG,
  DetailedIceberg,
} from '@/data/icebergIntelligenceData';
import {
  Mountain,
  Radar,
  ShieldAlert,
  Compass,
  Radio,
  Sparkles,
} from 'lucide-react';

export const IcebergIntelligence: React.FC = () => {
  // Default to IB-023 as specified in prompt
  const [selectedIceberg, setSelectedIceberg] = useState<DetailedIceberg>(
    DETAILED_ICEBERGS_CATALOG[0]
  );
  const [lockedRadars, setLockedRadars] = useState<string[]>(['IB-023']);

  const handleLockRadar = (code: string) => {
    if (!lockedRadars.includes(code)) {
      setLockedRadars((prev) => [...prev, code]);
    }
  };

  const highThreatCount = DETAILED_ICEBERGS_CATALOG.filter(
    (ib) => ib.riskLevel === 'CRITICAL' || ib.riskLevel === 'HIGH'
  ).length;

  return (
    <PageContainer
      title="Iceberg Intelligence & Drift Tracking"
      subtitle="Automated SAR/Optical Detection, Hydrodynamic Lagrangian Trajectory Forecasting & Collision Incursion Warnings"
      actions={
        <div className="flex items-center gap-2">
          {/* Simulation Disclaimer */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black text-white text-xs font-mono font-bold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span>Prototype AI Simulation</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-zinc-200 text-xs font-mono text-zinc-700 shadow-xs">
            <Radio className="w-3.5 h-3.5 text-black animate-pulse" />
            <span>RADAR TRACKER: <strong className="text-zinc-950 font-bold">{lockedRadars.length} TARGETS LOCKED</strong></span>
          </div>
        </div>
      }
    >
      <div className="space-y-6">
        {/* 1. Quick Telemetry KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-4 rounded-xl bg-white border border-zinc-200/90 shadow-xs space-y-1">
            <div className="flex items-center justify-between text-zinc-500 text-xs font-mono font-bold">
              <span>TRACKED OBJECTS</span>
              <Mountain className="w-4 h-4 text-black" />
            </div>
            <div className="text-2xl font-extrabold font-sans text-zinc-950">
              {DETAILED_ICEBERGS_CATALOG.length}
            </div>
            <span className="text-[10px] font-mono text-zinc-500 font-medium">Sentinel-1 & Optical SAR</span>
          </div>

          <div className="p-4 rounded-xl bg-white border border-zinc-200/90 shadow-xs space-y-1">
            <div className="flex items-center justify-between text-zinc-500 text-xs font-mono font-bold">
              <span>HIGH THREAT BERGS</span>
              <ShieldAlert className="w-4 h-4 text-rose-600" />
            </div>
            <div className="text-2xl font-extrabold font-sans text-rose-900">
              {highThreatCount} Active
            </div>
            <span className="text-[10px] font-mono text-rose-700 font-medium">Corridor Proximity &lt; 25 NM</span>
          </div>

          <div className="p-4 rounded-xl bg-white border border-zinc-200/90 shadow-xs space-y-1">
            <div className="flex items-center justify-between text-zinc-500 text-xs font-mono font-bold">
              <span>NEAREST INCURSION</span>
              <Radar className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-2xl font-extrabold font-sans text-amber-900">
              {selectedIceberg.routeDistanceKm} km
            </div>
            <span className="text-[10px] font-mono text-amber-800 font-medium">Target: {selectedIceberg.code}</span>
          </div>

          <div className="p-4 rounded-xl bg-white border border-zinc-200/90 shadow-xs space-y-1">
            <div className="flex items-center justify-between text-zinc-500 text-xs font-mono font-bold">
              <span>DRIFT MODEL CONFIDENCE</span>
              <Compass className="w-4 h-4 text-black" />
            </div>
            <div className="text-2xl font-extrabold font-sans text-zinc-950">
              {selectedIceberg.confidencePct}%
            </div>
            <span className="text-[10px] font-mono text-zinc-500 font-medium">Lagrangian + XGBoost</span>
          </div>
        </div>

        {/* 2. Main 2-Column Operational Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Dominant Map & Recharts Trajectory Dynamics Graph */}
          <div className="lg:col-span-7 space-y-6">
            {/* Interactive Antarctic Tactical Map */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono px-1">
                <span className="text-zinc-950 font-bold flex items-center gap-1.5">
                  <Radio className="w-3.5 h-3.5 text-black animate-pulse" />
                  HYDRODYNAMIC DRIFT FIELD & 72H TRAJECTORY VECTORS
                </span>
                <span className="text-zinc-900 font-extrabold bg-zinc-100 px-2 py-0.5 rounded border border-zinc-200">
                  SELECTED: {selectedIceberg.code}
                </span>
              </div>
              <AntarcticMap />
            </div>

            {/* Hydrodynamic Trajectory & Environmental Forcing Chart */}
            <IcebergTrajectoryChart iceberg={selectedIceberg} />
          </div>

          {/* Right Column: Iceberg Detail Inspection Panel & Full Catalog Table */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            {/* Selected Iceberg Detail Panel */}
            <IcebergDetailPanel
              iceberg={selectedIceberg}
              onLockRadar={handleLockRadar}
            />

            {/* 32+ Iceberg Catalog & Quick Search Table */}
            <IcebergCatalogTable
              selectedId={selectedIceberg.id}
              onSelectIceberg={(ib) => setSelectedIceberg(ib)}
            />
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default IcebergIntelligence;
