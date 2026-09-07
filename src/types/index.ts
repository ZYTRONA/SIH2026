export interface NavigationItem {
  id: string;
  label: string;
  path: string;
  icon: string;
  badge?: string;
  description?: string;
}

export interface SystemTelemetry {
  serverStatus: 'online' | 'degraded' | 'offline';
  satelliteFeed: 'connected' | 'syncing' | 'delayed';
  aiModelStatus: 'ready' | 'computing' | 'idle';
  lastUpdated: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export type PolarCapability = 'PC1' | 'PC2' | 'PC3' | 'PC4' | 'PC5' | 'PC6' | 'PC7';
export type NavigationPriority = 'Safest' | 'Fastest' | 'Fuel Efficient' | 'Balanced';
export type ForecastHorizon = '24 hours' | '48 hours' | '72 hours' | '7 days';

export interface MissionConfig {
  vessel: 'Research Vessel Alpha' | 'Polar Research Vessel' | 'Ice-Class Supply Vessel';
  polarCapability: PolarCapability;
  startLocation: {
    name: string;
    lat: number;
    lng: number;
  };
  destination: {
    name: string;
    lat: number;
    lng: number;
  };
  missionDate: string;
  departureTime: string;
  navigationPriority: NavigationPriority;
  forecastHorizon: ForecastHorizon;
}

export type PipelineStage = 'ingestion' | 'forecasting' | 'risk' | 'optimization' | 'completed';

export interface MissionPlanResult {
  missionId: string;
  generatedAt: string;
  config: MissionConfig;
  recommendedRouteName: string;
  distanceNm: number;
  etaHours: number;
  etaFormatted: string;
  fuelEstimateTons: number;
  fuelSavingsPct: number;
  averageRiskScore: number;
  riskCategory: 'LOW' | 'MODERATE' | 'HIGH';
  seaIceExposurePct: number;
  icebergExposureCount: number;
  weatherSeverity: string;
  waypointsCount: number;
  confidencePct: number;
  aiRationale: string;
  alternatives: Array<{
    name: string;
    distanceNm: number;
    etaHours: number;
    fuelTons: number;
    riskScore: number;
    tradeoff: string;
  }>;
}
