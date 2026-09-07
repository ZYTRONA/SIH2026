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
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-xs font-mono text-sky-700">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span className="font-semibold">Prototype AI Simulation</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-xs font-mono text-slate-700">
            <Radio className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
            <span>RADAR TRACKER: {lockedRadars.length} TARGETS LOCKED</span>
          </div>
        </div>
      }
    >
      <div className="space-y-6">
        {/* 1. Quick Telemetry KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-xs space-y-1">
            <div className="flex items-center justify-between text-slate-500 text-xs font-mono">
              <span>TRACKED OBJECTS</span>
              <Mountain className="w-4 h-4 text-sky-600" />
            </div>
            <div className="text-xl font-bold font-sans text-slate-900">
              {DETAILED_ICEBERGS_CATALOG.length}
            </div>
            <span className="text-[10px] font-mono text-slate-500">Sentinel-1 & Optical SAR</span>
          </div>

          <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-xs space-y-1">
            <div className="flex items-center justify-between text-slate-500 text-xs font-mono">
              <span>HIGH THREAT BERGS</span>
              <ShieldAlert className="w-4 h-4 text-rose-600" />
            </div>
            <div className="text-xl font-bold font-sans text-rose-600">
              {highThreatCount} Active
            </div>
            <span className="text-[10px] font-mono text-rose-600">Corridor Proximity &lt; 25 NM</span>
          </div>

          <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-xs space-y-1">
            <div className="flex items-center justify-between text-slate-500 text-xs font-mono">
              <span>NEAREST INCURSION</span>
              <Radar className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-xl font-bold font-sans text-amber-700">
              {selectedIceberg.routeDistanceKm} km
            </div>
            <span className="text-[10px] font-mono text-amber-600">Target: {selectedIceberg.code}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-xs space-y-1">
            <div className="flex items-center justify-between text-slate-500 text-xs font-mono">
              <span>DRIFT MODEL CONFIDENCE</span>
              <Compass className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-xl font-bold font-sans text-emerald-700">
              {selectedIceberg.confidencePct}%
            </div>
            <span className="text-[10px] font-mono text-slate-500">Lagrangian + XGBoost</span>
          </div>
        </div>

        {/* 2. Main 2-Column Operational Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Dominant Map & Recharts Trajectory Dynamics Graph */}
          <div className="lg:col-span-7 space-y-6">
            {/* Interactive Antarctic Tactical Map */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono px-1">
                <span className="text-slate-700 font-bold flex items-center gap-1.5">
                  <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                  HYDRODYNAMIC DRIFT FIELD & 72H TRAJECTORY VECTORS
                </span>
                <span className="text-amber-700 font-semibold">
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
