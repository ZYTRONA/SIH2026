export interface KPICardData {
  id: string;
  label: string;
  value: string;
  trend?: string;
  trendDirection?: 'up' | 'down' | 'neutral';
  status: 'safe' | 'warning' | 'critical' | 'info';
  statusText?: string;
  supportingInfo: string;
  iconName: 'Snowflake' | 'Mountain' | 'ShieldAlert' | 'Wind' | 'Ship' | 'Clock';
}

export interface MapWaypoint {
  id: string;
  name: string;
  lat: number;
  lng: number;
  x: number; // SVG percentage coordinate
  y: number;
  type: 'origin' | 'waypoint' | 'destination' | 'hazard';
}

export interface IcebergData {
  id: string;
  code: string;
  name: string;
  lat: number;
  lng: number;
  x: number;
  y: number;
  sizeClass: 'Growler' | 'Bergy Bit' | 'Medium' | 'Giant Tabular';
  areaKm2: number;
  driftSpeedKts: number;
  driftHeadingDeg: number;
  riskLevel: 'critical' | 'warning' | 'low';
  closestPointOfApproachNm: number;
}

export interface IceZone {
  id: string;
  label: string;
  concentrationPct: number;
  type: 'Open Water' | 'Very Open Drift' | 'First-Year Thick' | 'Multi-Year Consolidated';
  points: string; // SVG polygon points
}

export interface NavigationRecommendation {
  recommendedRoute: 'BALANCED' | 'FASTEST' | 'MAX_SAFETY';
  confidencePct: number;
  estimatedFuelSavingPct: number;
  estimatedTimeDeltaHours: number;
  safetyScore: number;
  currentCondition: string;
  aiRationale: string;
  corridorRiskIndex: number;
}

export interface ActiveAlert {
  id: string;
  severity: 'HIGH' | 'WARNING' | 'INFO';
  title: string;
  description: string;
  timestamp: string;
  sector: string;
  actionRequired?: string;
}

export interface EnvironmentalForecastPoint {
  hour: string;
  seaIceConcentration: number; // 0 - 100 %
  windSpeed: number; // knots
  riskScore: number; // 0 - 100
  iceThicknessM: number; // meters
}

// ----------------------------------------------------
// DASHBOARD DATASETS (EAST ANTARCTIC NCPOR NAVIGATION THEATRE)
// ----------------------------------------------------

export const DASHBOARD_KPIS: KPICardData[] = [
  {
    id: 'kpi-sea-ice',
    label: 'SEA-ICE COVERAGE',
    value: '42.8%',
    trend: '+1.2%',
    trendDirection: 'up',
    status: 'warning',
    statusText: 'EXPANDING',
    supportingInfo: 'Princess Astrid & Prydz Bay (Sentinel-1 SAR)',
    iconName: 'Snowflake',
  },
  {
    id: 'kpi-icebergs',
    label: 'ACTIVE ICEBERGS',
    value: '37',
    trend: '+2 detected',
    trendDirection: 'up',
    status: 'warning',
    statusText: '7 CRITICAL',
    supportingInfo: 'East Antarctic Corridor (NIC / US National Ice Center)',
    iconName: 'Mountain',
  },
  {
    id: 'kpi-risk',
    label: 'NAVIGATION RISK',
    value: '22 / 100',
    status: 'safe',
    statusText: 'LOW',
    supportingInfo: 'RIO Safety Margin: +16 (PC3 Compliant)',
    iconName: 'ShieldAlert',
  },
  {
    id: 'kpi-weather',
    label: 'WEATHER SEVERITY',
    value: 'MODERATE',
    status: 'info',
    statusText: '24 knots',
    supportingInfo: 'Wind: 24 kts SSE | Vis: 12.0 NM',
    iconName: 'Wind',
  },
  {
    id: 'kpi-vessel',
    label: 'CURRENT VESSEL',
    value: 'SA Agulhas II',
    status: 'safe',
    statusText: 'PC3',
    supportingInfo: 'NCPOR Chartered Polar Research Vessel (PC3)',
    iconName: 'Ship',
  },
  {
    id: 'kpi-eta',
    label: 'MISSION ETA',
    value: '94h 12m',
    trend: '-8h 30m opt',
    trendDirection: 'down',
    status: 'info',
    statusText: 'NOMINAL',
    supportingInfo: 'Dest: Bharati Station | Dist: 1,850 NM',
    iconName: 'Clock',
  },
];

export const NAVIGATION_INTELLIGENCE_DATA: NavigationRecommendation = {
  recommendedRoute: 'BALANCED',
  confidencePct: 94,
  estimatedFuelSavingPct: 14.2,
  estimatedTimeDeltaHours: -8.5,
  safetyScore: 94,
  currentCondition:
    'Cosmonaut Sea polynya lead open with favorable westbound Antarctic Coastal Current streamline.',
  aiRationale:
    'POLARIS recommends the dark-navy balanced route to maintain maximum tabular iceberg clearance (A-76A) while exploiting boundary flow streamlines.',
  corridorRiskIndex: 22,
};

export const ACTIVE_ALERTS_DATA: ActiveAlert[] = [
  {
    id: 'alt-01',
    severity: 'WARNING',
    title: 'Princess Astrid Pack Ice Expansion',
    description: 'First-year pack ice concentration increasing along northern shelf edge.',
    timestamp: '14 min ago',
    sector: 'Princess Astrid Shelf / -68°S',
    actionRequired: 'Maintain Cosmonaut Sea open fairway',
  },
  {
    id: 'alt-02',
    severity: 'HIGH',
    title: 'Giant Iceberg A-76A Incursion',
    description: 'Tabular iceberg A-76A drifting NW at 1.4 kts across planned corridor.',
    timestamp: '28 min ago',
    sector: 'Enderby Basin / -67°S',
    actionRequired: 'Radar collision tracker locked (4.8 NM CPA)',
  },
  {
    id: 'alt-03',
    severity: 'INFO',
    title: 'Offshore Katabatic Gales Approaching',
    description: 'Moderate katabatic wind expected after 18:00 UTC (gusts up to 34 kts).',
    timestamp: '1 hr ago',
    sector: 'East Antarctic Grid 4 / -69°S',
  },
];

export const ENVIRONMENTAL_FORECAST_72H: EnvironmentalForecastPoint[] = [
  { hour: '00h', seaIceConcentration: 42, windSpeed: 24, riskScore: 22, iceThicknessM: 1.2 },
  { hour: '06h', seaIceConcentration: 44, windSpeed: 26, riskScore: 24, iceThicknessM: 1.2 },
  { hour: '12h', seaIceConcentration: 46, windSpeed: 28, riskScore: 26, iceThicknessM: 1.3 },
  { hour: '18h', seaIceConcentration: 48, windSpeed: 32, riskScore: 30, iceThicknessM: 1.4 },
  { hour: '24h', seaIceConcentration: 50, windSpeed: 34, riskScore: 32, iceThicknessM: 1.4 },
  { hour: '30h', seaIceConcentration: 48, windSpeed: 28, riskScore: 28, iceThicknessM: 1.3 },
  { hour: '36h', seaIceConcentration: 44, windSpeed: 24, riskScore: 25, iceThicknessM: 1.2 },
  { hour: '42h', seaIceConcentration: 40, windSpeed: 22, riskScore: 22, iceThicknessM: 1.1 },
  { hour: '48h', seaIceConcentration: 36, windSpeed: 20, riskScore: 20, iceThicknessM: 1.0 },
  { hour: '54h', seaIceConcentration: 32, windSpeed: 18, riskScore: 18, iceThicknessM: 0.9 },
  { hour: '60h', seaIceConcentration: 28, windSpeed: 16, riskScore: 16, iceThicknessM: 0.8 },
  { hour: '66h', seaIceConcentration: 22, windSpeed: 14, riskScore: 14, iceThicknessM: 0.7 },
  { hour: '72h', seaIceConcentration: 18, windSpeed: 12, riskScore: 12, iceThicknessM: 0.6 },
];

export const MAP_TACTICAL_DATA = {
  vessel: {
    name: 'SA Agulhas II',
    type: 'Polar Research & Supply Vessel',
    iceClass: 'PC3',
    lat: -67.20,
    lng: 35.40,
    x: 48,
    y: 42,
    speedKts: 13.5,
    headingDeg: 105,
  },
  destination: {
    name: 'Bharati Station (Larsemann Hills / Prydz Bay)',
    lat: -69.41,
    lng: 76.19,
    x: 74,
    y: 72,
    status: 'Active NCPOR Outpost',
  },
  origin: {
    name: 'Maitri Station Offshore Fairway',
    lat: -69.80,
    lng: 11.90,
    x: 22,
    y: 18,
  },
  waypoints: [
    { id: 'wp-1', name: 'WP-Alpha (Princess Astrid Ridge)', x: 34, y: 28, lat: -67.80, lng: 26.50 },
    { id: 'wp-2', name: 'WP-Bravo (Enderby Lead / Vessel)', x: 48, y: 42, lat: -66.90, lng: 48.50 },
    { id: 'wp-3', name: 'WP-Charlie (Prydz North Gate)', x: 60, y: 55, lat: -67.50, lng: 70.20 },
    { id: 'wp-4', name: 'WP-Delta (Bharati Roadstead)', x: 74, y: 72, lat: -69.41, lng: 76.19 },
  ],
  alternateRouteWaypoints: [
    { x: 34, y: 28 },
    { x: 40, y: 48 },
    { x: 52, y: 64 },
    { x: 74, y: 72 },
  ],
  icebergs: [
    {
      id: 'ib-1',
      code: 'A-76A',
      name: 'Giant Iceberg A-76A',
      x: 56,
      y: 48,
      sizeClass: 'Giant Tabular',
      driftSpeedKts: 1.4,
      driftHeadingDeg: 285,
      riskLevel: 'critical',
    },
    {
      id: 'ib-2',
      code: 'IB-PRYDZ-09',
      name: 'Iceberg IB-PRYDZ-09',
      x: 68,
      y: 38,
      sizeClass: 'Medium',
      driftSpeedKts: 0.9,
      driftHeadingDeg: 260,
      riskLevel: 'warning',
    },
    {
      id: 'ib-3',
      code: 'D-30 Tabular',
      name: 'D-30 Fragment 02',
      x: 38,
      y: 60,
      sizeClass: 'Giant Tabular',
      driftSpeedKts: 1.1,
      driftHeadingDeg: 295,
      riskLevel: 'low',
    },
    {
      id: 'ib-4',
      code: 'IB-AMERY-04',
      name: 'Bergy Cluster Amery-04',
      x: 64,
      y: 65,
      sizeClass: 'Bergy Bit',
      driftSpeedKts: 0.5,
      driftHeadingDeg: 270,
      riskLevel: 'warning',
    },
  ],
  riskZones: [
    {
      id: 'rz-1',
      label: 'A-76A Tabular Incursion Sector',
      color: 'rgba(239, 68, 68, 0.18)',
      borderColor: 'rgba(239, 68, 68, 0.6)',
      points: '50,30 65,35 62,52 46,46',
    },
    {
      id: 'rz-2',
      label: 'Prydz Bay Heavy Pack Lead',
      color: 'rgba(245, 158, 11, 0.14)',
      borderColor: 'rgba(245, 158, 11, 0.5)',
      points: '60,60 85,62 82,85 58,80',
    },
  ],
};
