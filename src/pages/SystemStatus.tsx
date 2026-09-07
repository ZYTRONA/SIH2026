import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import {
  OfflineModeToggleBanner,
  CloudEngineStatusCard,
  EdgeEngineStatusCard,
  DataSourcesStatusCard,
  ArchitectureFlowDiagram,
  SimulationDisclaimerBanner,
} from '@/components/system';

export const SystemStatus: React.FC = () => {
  const [isOffline, setIsOffline] = useState<boolean>(false);

  return (
    <PageContainer
      title="System Status"
      subtitle="Cloud-to-edge data ingestion pipelines, AI compute engines, offline caching, and satellite links"
      badge={isOffline ? 'OFFLINE EDGE MODE' : 'ALL SYSTEMS OPERATIONAL'}
      badgeType={isOffline ? 'warning' : 'safe'}
    >
      <div className="space-y-6">
        {/* 1. Offline Mode Toggle Banner with Interactive Switch */}
        <OfflineModeToggleBanner
          isOffline={isOffline}
          onToggle={(offline) => setIsOffline(offline)}
          lastSyncFormatted="2 min ago"
        />

        {/* 2. Three Main Status Cards Grid: Cloud Engine, Edge Engine, Data Sources */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Cloud Intelligence Engine */}
          <CloudEngineStatusCard isOffline={isOffline} />

          {/* Edge Engine */}
          <EdgeEngineStatusCard isOffline={isOffline} />

          {/* Data Sources */}
          <DataSourcesStatusCard isOffline={isOffline} />
        </div>

        {/* 3. System Architecture End-to-End Visual Flow Diagram */}
        <ArchitectureFlowDiagram isOffline={isOffline} />

        {/* 4. Mandatory Prototype Disclaimer Banner */}
        <SimulationDisclaimerBanner />
      </div>
    </PageContainer>
  );
};
