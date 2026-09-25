import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { AntarcticMap } from '@/components/map/AntarcticMap';
import {
  HIGH_PRIORITY_ICEBERGS,
  DetailedIceberg,
} from '@/data/icebergIntelligenceData';
import {
  ActiveIcebergsList,
  IcebergDetailPanel,
  IcebergTrajectoryChart,
  KeyMetricsPanel,
  IcebergModalCatalog,
} from '@/components/iceberg';
import {
  RefreshCw,
  Compass,
  Layers,
} from 'lucide-react';

export const IcebergIntelligence: React.FC = () => {
  const [selectedIceberg, setSelectedIceberg] = useState<DetailedIceberg>(
    HIGH_PRIORITY_ICEBERGS[0] // IB-023
  );
  const [catalogModalOpen, setCatalogModalOpen] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 800);
  };

  return (
    <PageContainer
      title="Iceberg Intelligence & Drift Tracking"
      subtitle="Sentinel-1 SAR radar fusion, Lagrangian multi-factor hydrodynamic drift kinematics, and 72-hour voyage collision assessment."
      badge="37 TRACKED • 7 WARNING TARGETS"
      badgeType="warning"
      actions={
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCatalogModalOpen(true)}
            className="btn-apple-secondary flex items-center gap-1.5 !h-9 !px-3.5 !text-[12px] cursor-pointer"
            title="Open Complete 37-Iceberg Catalog"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Full Catalog (37)</span>
          </button>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="btn-apple-primary flex items-center gap-1.5 !h-9 !px-4 !text-[12px] cursor-pointer"
            title="Trigger Sentinel-1 SAR telemetry ingestion"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Ingesting SAR...' : 'Sync Radar Pass'}</span>
          </button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* 1. Main Interactive Map & Active Target Deck (12-column grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Active Priority Targets List (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <ActiveIcebergsList
              icebergs={HIGH_PRIORITY_ICEBERGS}
              selectedIceberg={selectedIceberg}
              onSelectIceberg={(ib) => setSelectedIceberg(ib)}
              onViewAll={() => setCatalogModalOpen(true)}
            />
          </div>

          {/* Right: Modern Interactive Antarctic Chart with Icebergs & Vessel (8 cols) */}
          <div className="lg:col-span-8 space-y-3">
            {/* Map Header Sub-Bar */}
            <div className="flex items-center justify-between gap-2 px-1">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#0066cc]" />
                <h3 className="text-[14px] font-semibold text-[#1d1d1f]">
                  Antarctic Iceberg Radar & Drift Trajectory Chart
                </h3>
              </div>
              <span className="text-[11px] font-mono text-neutral-500 hidden sm:inline">
                Real-time Sentinel-1 SAR &bullet; 48 NM Collision Radar
              </span>
            </div>

            {/* Modern Interactive Antarctic Map with Leaflet & OpenSeaMap */}
            <AntarcticMap
              heightClass="h-[520px] sm:h-[580px] lg:h-[620px]"
            />
          </div>
        </div>

        {/* 2. Middle Row: Detailed Target Inspector & Key Telemetry Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Selected Iceberg Detail Inspector (7 cols) */}
          <div className="lg:col-span-7">
            <IcebergDetailPanel
              iceberg={selectedIceberg}
              onLockRadar={(code) => {
                alert(`ECMDIS collision radar lock confirmed on ${code}. Continuous 10Hz acoustic tracking active.`);
              }}
            />
          </div>

          {/* Right: Key Telemetry Metrics Panel (5 cols) */}
          <div className="lg:col-span-5">
            <KeyMetricsPanel
              totalActiveCount={37}
              highRiskCount={7}
              incursionsCount={12}
              sarTrackedPct={94}
            />
          </div>
        </div>

        {/* 3. Bottom Row: 72H Hydrodynamic Drift Trajectory & Distance Chart */}
        <IcebergTrajectoryChart iceberg={selectedIceberg} />
      </div>

      {/* 4. Complete 37-Iceberg Catalog Modal */}
      <IcebergModalCatalog
        isOpen={catalogModalOpen}
        onClose={() => setCatalogModalOpen(false)}
        selectedIceberg={selectedIceberg}
        onSelectIceberg={(ib) => setSelectedIceberg(ib)}
      />
    </PageContainer>
  );
};

export default IcebergIntelligence;
