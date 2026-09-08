import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import {
  OfflineModeToggleBanner,
  CloudEngineStatusCard,
  EdgeEngineStatusCard,
  DataSourcesStatusCard,
  ArchitectureFlowDiagram,
} from '@/components/system';
import { useAppStore } from '@/store/useAppStore';

export const SystemStatus: React.FC = () => {
  const { isOffline, setOffline, lastSyncTime } = useAppStore();

  return (
    <PageContainer
      title="System Status & Edge Telemetry"
      subtitle="Cloud-to-edge data ingestion pipelines, AI compute engines, offline cryospheric caching, and satellite links."
      badge={isOffline ? 'OFFLINE EDGE MODE' : 'ALL SYSTEMS OPERATIONAL'}
      badgeType={isOffline ? 'warning' : 'safe'}
    >
      <div className="space-y-6">
        {/* 1. Offline Mode Toggle Banner */}
        <OfflineModeToggleBanner
          isOffline={isOffline}
          onToggle={(offline) => setOffline(offline)}
          lastSyncFormatted={lastSyncTime}
        />

        {/* 2. Three Main Status Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <CloudEngineStatusCard isOffline={isOffline} />
          <EdgeEngineStatusCard isOffline={isOffline} />
          <DataSourcesStatusCard isOffline={isOffline} />
        </div>

        {/* 3. System Architecture Flow Diagram */}
        <ArchitectureFlowDiagram isOffline={isOffline} />
      </div>
    </PageContainer>
  );
};

export default SystemStatus;
