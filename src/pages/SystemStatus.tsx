import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import {
  OfflineModeToggleBanner,
  HardwareTelemetryDeck,
  CacheManagerDeck,
  SatelliteUplinkCard,
  CloudEngineStatusCard,
  EdgeEngineStatusCard,
  DataSourcesStatusCard,
  SystemLogsConsole,
  ArchitectureFlowDiagram,
} from '@/components/system';
import { useAppStore } from '@/store/useAppStore';

export const SystemStatus: React.FC = () => {
  const { isOffline, setOffline, lastSyncTime } = useAppStore();

  return (
    <PageContainer
      title="System Status & Edge Telemetry"
      subtitle="Autonomous shipboard compute unit, cloud-to-edge cryospheric pipelines, NVMe offline caches, and polar LEO satellite links."
      badge={isOffline ? 'OFFLINE EDGE MODE ACTIVE' : 'ALL SYSTEMS OPERATIONAL (100% HEALTH)'}
      badgeType={isOffline ? 'warning' : 'safe'}
      actions={
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#e0e0e0] text-[12px] text-neutral-600 font-mono">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="text-[#1d1d1f] font-semibold">Jetson AGX Orin • 275 TOPS</span>
          </div>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Tier 1: Interactive Network Telemetry & Offline Edge Mode Switch */}
        <OfflineModeToggleBanner
          isOffline={isOffline}
          onToggle={(offline) => setOffline(offline)}
          lastSyncFormatted={lastSyncTime}
        />

        {/* Tier 2: Shipboard Hardware Telemetry Cockpit (Jetson AGX Orin 64GB) */}
        <HardwareTelemetryDeck isOffline={isOffline} />

        {/* Tier 3: Offline Cryospheric Cache Management Station */}
        <CacheManagerDeck />

        {/* Tier 4: Polar Satellite Constellation & Ingestion Feeds */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          <SatelliteUplinkCard isOffline={isOffline} />
          <DataSourcesStatusCard isOffline={isOffline} />
        </div>

        {/* Tier 5: Cloud & Edge AI Compute Service Pods */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          <CloudEngineStatusCard isOffline={isOffline} />
          <EdgeEngineStatusCard isOffline={isOffline} />
        </div>

        {/* Tier 6: Live Terminal Pipeline Log Stream */}
        <SystemLogsConsole />

        {/* Tier 7: End-to-End Visual Architecture Pipeline Diagram */}
        <ArchitectureFlowDiagram isOffline={isOffline} />
      </div>
    </PageContainer>
  );
};

export default SystemStatus;

