export type NodeHealth = 'ONLINE' | 'CONNECTED' | 'STANDBY' | 'READY' | 'CACHED' | 'OFFLINE';

export interface SystemServiceItem {
  id: string;
  name: string;
  category: 'cloud' | 'edge' | 'source';
  status: NodeHealth;
  statusText: string;
  description: string;
  metrics: string;
  latencyMs?: number;
  iconName: string;
}

export interface ArchitectureNode {
  id: string;
  title: string;
  subtitle: string;
  items: string[];
  type: 'source' | 'cloud' | 'analytics' | 'package' | 'edge' | 'dashboard';
  status: string;
}

// 1. Cloud Intelligence Engine Data
export const CLOUD_ENGINE_SERVICES: SystemServiceItem[] = [
  {
    id: 'cloud-data-proc',
    name: 'Data Processing',
    category: 'cloud',
    status: 'ONLINE',
    statusText: 'ONLINE',
    description: 'High-throughput SAR rasterization and meteorological grid alignment.',
    metrics: '4.2 GB/h Ingested',
    latencyMs: 120,
    iconName: 'Cpu',
  },
  {
    id: 'cloud-ai-forecast',
    name: 'AI Forecast Engine',
    category: 'cloud',
    status: 'ONLINE',
    statusText: 'ONLINE',
    description: 'ResUNet deep spatiotemporal sea-ice concentration forecasting.',
    metrics: '72h Inferencing Active',
    latencyMs: 340,
    iconName: 'Sparkles',
  },
  {
    id: 'cloud-risk-engine',
    name: 'Risk Engine',
    category: 'cloud',
    status: 'ONLINE',
    statusText: 'ONLINE',
    description: 'IMO POLARIS RIO multi-hazard spatial risk calculation.',
    metrics: 'PC1-PC7 Calibrated',
    latencyMs: 85,
    iconName: 'ShieldCheck',
  },
  {
    id: 'cloud-route-opt',
    name: 'Route Optimization',
    category: 'cloud',
    status: 'ONLINE',
    statusText: 'ONLINE',
    description: 'A* Continuous-Curvature pathfinding + NSGA-II Pareto optimizer.',
    metrics: '120 Pop / 85 Gen',
    latencyMs: 850,
    iconName: 'GitFork',
  },
];

// 2. Edge Engine Data
export const EDGE_ENGINE_SPEC = {
  statusOnline: 'CONNECTED' as NodeHealth,
  statusOffline: 'READY' as NodeHealth,
  offlineCache: 'READY' as NodeHealth,
  lastSyncFormatted: '2 min ago',
  packageSize: '2.4 MB (Compressed Protobuf)',
  hardware: 'NVIDIA Jetson AGX Orin Industrial (64GB)',
  storageAllocation: '48 GB Local Cryospheric Cache',
  localSolverStatus: 'A* Local Contingency Engine Active',
  satelliteLink: 'Starlink Polar Fleet Terminal (98° Inclination)',
};

// 3. Data Sources Data
export const DATA_SOURCES_SERVICES: SystemServiceItem[] = [
  {
    id: 'src-satellite',
    name: 'Satellite',
    category: 'source',
    status: 'CONNECTED',
    statusText: 'CONNECTED',
    description: 'Sentinel-1 SAR C-Band, AMSR2 Radiometer, CryoSat-2 Altimeter.',
    metrics: '100% Polar Coverage',
    latencyMs: 450,
    iconName: 'Satellite',
  },
  {
    id: 'src-meteo',
    name: 'Meteorological',
    category: 'source',
    status: 'CONNECTED',
    statusText: 'CONNECTED',
    description: 'ECMWF HRES 0.1° 10m Wind, Surface Temp, Air Pressure.',
    metrics: 'Updated 4x Daily',
    latencyMs: 180,
    iconName: 'Wind',
  },
  {
    id: 'src-ocean',
    name: 'Oceanographic',
    category: 'source',
    status: 'CONNECTED',
    statusText: 'CONNECTED',
    description: 'Copernicus Marine HYCOM Currents, Wave Swell & Tide Dynamics.',
    metrics: 'Boundary Layer Feed',
    latencyMs: 220,
    iconName: 'Compass',
  },
  {
    id: 'src-ais',
    name: 'AIS',
    category: 'source',
    status: 'CONNECTED',
    statusText: 'CONNECTED',
    description: 'Spire Global Satellite AIS + Vessel ECDIS Telemetry Stream.',
    metrics: 'Live Radar & Transponder',
    latencyMs: 95,
    iconName: 'Radio',
  },
];

// 4. Architecture Visual Flow Steps requested by Prompt
export const ARCHITECTURE_FLOW_TIERS: ArchitectureNode[] = [
  {
    id: 'tier-1-sources',
    title: 'Raw Polar Data Feeds',
    subtitle: 'High-Latitude Environmental & Telemetry Ingestion',
    type: 'source',
    status: 'STREAMING',
    items: ['Satellite Data', 'Weather Data', 'Ocean Data', 'AIS / Vessel Data'],
  },
  {
    id: 'tier-2-cloud',
    title: 'Cloud Intelligence Engine',
    subtitle: 'High-Performance Cryospheric Processing Core',
    type: 'cloud',
    status: 'HPC CLOUD',
    items: ['Multi-Sensor Rasterization', 'Atmospheric Physics Alignment', 'Continuous Data Pipeline'],
  },
  {
    id: 'tier-3-analytics',
    title: 'AI / ML Analytics & Solvers',
    subtitle: 'Predictive Cryospheric & Pathfinding Intelligence',
    type: 'analytics',
    status: 'SOLVING',
    items: ['Sea-Ice Forecast', 'Iceberg Prediction', 'Risk Assessment', 'Route Optimization'],
  },
  {
    id: 'tier-4-package',
    title: 'Compact Navigation Package',
    subtitle: 'Lightweight Compressed Tactical Bundle (< 5 MB)',
    type: 'package',
    status: 'COMPRESSED',
    items: ['Binary GeoJSON Grid', 'Lagrangian Vector Cones', 'Pareto Waypoint Set'],
  },
  {
    id: 'tier-5-edge',
    title: 'Edge Engine',
    subtitle: 'Shipboard Industrial Compute Node (NVIDIA Jetson AGX)',
    type: 'edge',
    status: 'ONBOARD',
    items: ['Offline Cache Sync', 'Local A* Contingency', 'Continuous Health Monitoring'],
  },
  {
    id: 'tier-6-dashboard',
    title: 'Vessel Dashboard',
    subtitle: 'Bridge Tactical ECDIS & Officer Decision Support',
    type: 'dashboard',
    status: 'BRIDGE UI',
    items: ['Mission Control', 'Tactical Polar Chart', 'Real-Time Hazard Alerting'],
  },
];
