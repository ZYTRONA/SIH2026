export type NodeHealth = 'ONLINE' | 'CONNECTED' | 'STANDBY' | 'READY' | 'CACHED' | 'OFFLINE';

export interface SystemServiceItem {
  id: string;
  name: string;
  category: 'cloud' | 'edge' | 'source' | 'ai';
  status: NodeHealth;
  statusText: string;
  description: string;
  metrics: string;
  latencyMs?: number;
  uptimePct: number;
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

export interface HardwareTelemetryMetric {
  name: string;
  value: number;
  max: number;
  unit: string;
  formattedValue: string;
  status: 'normal' | 'warning' | 'optimal';
  detail: string;
}

export interface CachedDatasetItem {
  id: string;
  name: string;
  type: string;
  size: string;
  entriesCount: string;
  validUntil: string;
  integrityHash: string;
  status: 'CURRENT' | 'SYNCED' | 'VERIFIED';
}

export interface SatelliteUplinkTelemetry {
  provider: string;
  orbitalType: string;
  inclination: string;
  downlinkSpeedMbps: number;
  uplinkSpeedMbps: number;
  latencyMs: number;
  snrDb: number;
  nextPassTime: string;
  nextPassTarget: string;
  backupStatus: string;
}

export interface SystemAuditLogEntry {
  id: string;
  timestamp: string;
  level: 'INFO' | 'SYNC' | 'INFERENCE' | 'WARN' | 'SUCCESS';
  module: string;
  message: string;
}

// 1. Cloud Intelligence Engine Data
export const CLOUD_ENGINE_SERVICES: SystemServiceItem[] = [
  {
    id: 'cloud-data-proc',
    name: 'SAR Rasterization Pipeline',
    category: 'cloud',
    status: 'ONLINE',
    statusText: 'ONLINE',
    description: 'High-throughput Sentinel-1 SAR geocoding, speckle filtering & polar grid alignment.',
    metrics: '4.2 GB/h Ingested',
    latencyMs: 120,
    uptimePct: 99.98,
    iconName: 'Cpu',
  },
  {
    id: 'cloud-ai-forecast',
    name: 'ResUNet Sea-Ice Engine',
    category: 'ai',
    status: 'ONLINE',
    statusText: 'ONLINE',
    description: 'Deep spatiotemporal convolution model predicting 72-hour sea-ice concentration grids.',
    metrics: '72h Inference Active',
    latencyMs: 340,
    uptimePct: 99.95,
    iconName: 'Sparkles',
  },
  {
    id: 'cloud-risk-engine',
    name: 'POLARIS RIO Engine',
    category: 'cloud',
    status: 'ONLINE',
    statusText: 'ONLINE',
    description: 'IMO POLARIS structural limit & multi-factor Risk Index Outcome computation.',
    metrics: 'PC1-PC7 Calibrated',
    latencyMs: 85,
    uptimePct: 100.0,
    iconName: 'ShieldCheck',
  },
  {
    id: 'cloud-route-opt',
    name: 'A* + NSGA-II Solver',
    category: 'ai',
    status: 'ONLINE',
    statusText: 'ONLINE',
    description: 'Multi-objective Pareto pathfinding optimizing fuel burn, risk exposure, and ETA.',
    metrics: '120 Pop / 85 Gen',
    latencyMs: 850,
    uptimePct: 99.92,
    iconName: 'GitFork',
  },
];

// 2. Edge Engine Hardware Telemetry
export const EDGE_HARDWARE_METRICS: HardwareTelemetryMetric[] = [
  {
    name: 'GPU / NVDLA Compute Load',
    value: 64,
    max: 100,
    unit: '%',
    formattedValue: '64%',
    status: 'optimal',
    detail: '2048 CUDA Cores • 64 Tensor Cores (DLA-0 Active)',
  },
  {
    name: 'Unified LPDDR5 Memory',
    value: 38.4,
    max: 64.0,
    unit: 'GB',
    formattedValue: '38.4 / 64.0 GB',
    status: 'optimal',
    detail: '60.0% Allocation • 204.8 GB/s Memory Bandwidth',
  },
  {
    name: 'NVMe Cryospheric Cache',
    value: 48.2,
    max: 128.0,
    unit: 'GB',
    formattedValue: '48.2 / 128.0 GB',
    status: 'normal',
    detail: '37.6% NVMe M.2 Allocation (Pre-cached GeoTIFFs)',
  },
  {
    name: 'SoC Thermal Envelope',
    value: 44.2,
    max: 85.0,
    unit: '°C',
    formattedValue: '44.2°C',
    status: 'normal',
    detail: '50W Max-N Industrial Profile • Fan at 42%',
  },
];

export const EDGE_ENGINE_SPEC = {
  statusOnline: 'CONNECTED' as NodeHealth,
  statusOffline: 'READY' as NodeHealth,
  offlineCache: 'READY' as NodeHealth,
  lastSyncFormatted: '2 min ago',
  packageSize: '2.4 MB (Compressed Protobuf)',
  hardware: 'NVIDIA Jetson AGX Orin Industrial (64GB 275 TOPS)',
  storageAllocation: '48.2 GB Local Cryospheric Cache',
  localSolverStatus: 'A* Local Contingency Engine Active',
  satelliteLink: 'Starlink Polar Fleet Terminal (98° Orbital Inclination)',
  inferenceLatency: '18.4 ms (TensorRT FP16)',
};

// 3. Cached Datasets Inventory
export const CACHED_DATASETS_INVENTORY: CachedDatasetItem[] = [
  {
    id: 'cache-sar-grid',
    name: 'Copernicus Sentinel-1 SAR Cryo-Grid',
    type: 'Raster Tensor',
    size: '34.8 GB',
    entriesCount: '12 Polar Sectors (5.0km)',
    validUntil: '+70h valid',
    integrityHash: 'sha256:8f2a9c...4b1e',
    status: 'VERIFIED',
  },
  {
    id: 'cache-iceberg-trajectories',
    name: 'Lagrangian Iceberg Kinematic Models',
    type: 'Vector GeoJSON',
    size: '4.8 MB',
    entriesCount: '37 Tracked Icebergs',
    validUntil: '+72h valid',
    integrityHash: 'sha256:3d1e7b...9a0c',
    status: 'SYNCED',
  },
  {
    id: 'cache-precomputed-routes',
    name: 'Precomputed A* Pareto Nav Corridor Set',
    type: 'Protobuf Graph',
    size: '2.4 MB',
    entriesCount: '4 Primary + 12 Contingency',
    validUntil: '+96h valid',
    integrityHash: 'sha256:7c9e1a...2f4d',
    status: 'CURRENT',
  },
  {
    id: 'cache-ecmwf-meteo',
    name: 'ECMWF HRES Wind & Wave Boundary Grids',
    type: 'GRIB2 Matrix',
    size: '10.9 GB',
    entriesCount: '0.1° High-Res 10m Velocity',
    validUntil: '+48h valid',
    integrityHash: 'sha256:5b8f2d...1e3a',
    status: 'VERIFIED',
  },
];

// 4. Data Sources Telemetry
export const DATA_SOURCES_SERVICES: SystemServiceItem[] = [
  {
    id: 'src-satellite',
    name: 'Copernicus Sentinel-1',
    category: 'source',
    status: 'CONNECTED',
    statusText: 'CONNECTED',
    description: 'Sentinel-1A/1B C-Band SAR, AMSR2 Radiometer, CryoSat-2 SIRAL Altimeter.',
    metrics: 'Pass #443 Ingested',
    latencyMs: 450,
    uptimePct: 99.99,
    iconName: 'Satellite',
  },
  {
    id: 'src-meteo',
    name: 'ECMWF & GFS Atmospheric',
    category: 'source',
    status: 'CONNECTED',
    statusText: 'CONNECTED',
    description: 'ECMWF HRES 0.1° 10m Surface Wind, Sea-Level Pressure, Air Temperature.',
    metrics: '4x Daily Sync Active',
    latencyMs: 180,
    uptimePct: 99.95,
    iconName: 'Wind',
  },
  {
    id: 'src-ocean',
    name: 'Copernicus Marine HYCOM',
    category: 'source',
    status: 'CONNECTED',
    statusText: 'CONNECTED',
    description: 'Hydrodynamic ocean currents, tidal currents, significant wave height & swell.',
    metrics: 'Boundary Layer Feed',
    latencyMs: 220,
    uptimePct: 99.9,
    iconName: 'Compass',
  },
  {
    id: 'src-ais',
    name: 'Spire Satellite AIS + ECDIS',
    category: 'source',
    status: 'CONNECTED',
    statusText: 'CONNECTED',
    description: 'Dual Satellite AIS constellation + RV Polar Sentinel Shipboard ECDIS Bridge.',
    metrics: 'Live Transponder 1Hz',
    latencyMs: 95,
    uptimePct: 100.0,
    iconName: 'Radio',
  },
];

// 5. Satellite Uplink Telemetry
export const SATELLITE_UPLINK_DATA: SatelliteUplinkTelemetry = {
  provider: 'Starlink Polar Maritime Fleet (Laser Inter-Satellite Mesh)',
  orbitalType: 'Low Earth Orbit (LEO)',
  inclination: '97.6° Polar Sun-Synchronous',
  downlinkSpeedMbps: 142.6,
  uplinkSpeedMbps: 22.4,
  latencyMs: 44,
  snrDb: 26.4,
  nextPassTime: '1h 42m',
  nextPassTarget: 'Sentinel-1B Orbit Pass #444',
  backupStatus: 'Iridium Certus 700 L-Band (Hot Standby)',
};

// 6. System Audit Logs
export const INITIAL_AUDIT_LOGS: SystemAuditLogEntry[] = [
  {
    id: 'log-1',
    timestamp: '07:54:32 UTC',
    level: 'SUCCESS',
    module: 'A* + NSGA-II',
    message: 'Pareto frontier solver converged on 4 rank-1 non-dominated corridors (850ms).',
  },
  {
    id: 'log-2',
    timestamp: '07:54:18 UTC',
    level: 'INFERENCE',
    module: 'ResUNet-v3.2',
    message: 'Executed deep spatiotemporal sea-ice forecast on Jetson AGX Orin DLA-0 (18.4ms, FP16).',
  },
  {
    id: 'log-3',
    timestamp: '07:54:05 UTC',
    level: 'SYNC',
    module: 'Cache Daemon',
    message: 'Offline Cryospheric Cache verified with SHA-256 checksum (48.2 GB NVMe block aligned).',
  },
  {
    id: 'log-4',
    timestamp: '07:53:48 UTC',
    level: 'INFO',
    module: 'Starlink LEO',
    message: 'Polar laser inter-satellite mesh handoff completed. Downlink: 142.6 Mbps, RTT: 44ms.',
  },
  {
    id: 'log-5',
    timestamp: '07:52:30 UTC',
    level: 'INFO',
    module: 'Sentinel-1 SAR',
    message: 'Copernicus pass #443 polarization dual-cross HH+HV ingested and calibrated.',
  },
  {
    id: 'log-6',
    timestamp: '07:50:12 UTC',
    level: 'SUCCESS',
    module: 'POLARIS Engine',
    message: 'RIO compliance checks passed for PC3 hull class across Labrador Sea fairway leads.',
  },
];

// 7. Architecture Visual Flow Steps
export const ARCHITECTURE_FLOW_TIERS: ArchitectureNode[] = [
  {
    id: 'tier-1-sources',
    title: 'Raw Polar Data Feeds',
    subtitle: 'High-Latitude Environmental & Telemetry Ingestion',
    type: 'source',
    status: 'STREAMING',
    items: ['Copernicus Sentinel-1', 'ECMWF Atmosphere', 'HYCOM Ocean Current', 'Satellite AIS Transponder'],
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
    items: ['ResUNet Sea-Ice Model', 'Lagrangian Drift AI', 'POLARIS RIO Matrix', 'A* + NSGA-II Solver'],
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
    title: 'Shipboard Edge Engine',
    subtitle: 'NVIDIA Jetson AGX Orin 64GB Industrial Unit',
    type: 'edge',
    status: 'ONBOARD',
    items: ['48.2 GB Local Cache', 'TensorRT FP16 Engine', 'Autonomous A* Contingency'],
  },
  {
    id: 'tier-6-dashboard',
    title: 'Bridge ECDIS Cockpit',
    subtitle: 'Tactical Real-Time Officer Decision Support',
    type: 'dashboard',
    status: 'BRIDGE UI',
    items: ['Mission Control Telemetry', 'Tactical Polar Chart', 'Real-Time Hazard Alerting'],
  },
];

