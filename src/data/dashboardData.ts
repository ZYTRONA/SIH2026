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
// DASHBOARD DATASETS (ATLANTIC OCEAN NAVIGATION THEATRE)
// ----------------------------------------------------

export const DASHBOARD_KPIS: KPICardData[] = [
  {
    id: 'kpi-sea-ice',
    label: 'SEA-ICE COVERAGE',
    value: '48.2%',
    trend: '+1.8%',
    trendDirection: 'up',
    status: 'warning',
    statusText: 'EXPANDING',
    supportingInfo: 'Labrador & Grand Banks (Sentinel-1 SAR)',
    iconName: 'Snowflake',
  },
  {
    id: 'kpi-icebergs',
    label: 'ACTIVE ICEBERGS',
    value: '37',
    trend: '+4 detected',
    trendDirection: 'up',
    status: 'warning',
    statusText: '7 CRITICAL',
    supportingInfo: 'Atlantic corridor (International Ice Patrol)',
    iconName: 'Mountain',
  },
  {
    id: 'kpi-risk',
    label: 'NAVIGATION RISK',
    value: '24 / 100',
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
    statusText: '20 knots',
    supportingInfo: 'Wind: 20 kts NW | Vis: 8.5 NM',
    iconName: 'Wind',
  },
  {
    id: 'kpi-vessel',
    label: 'CURRENT VESSEL',
    value: 'R/V Polar Sentinel',
    status: 'safe',
    statusText: 'PC3',
    supportingInfo: 'Polar Research Icebreaker (PC3 Certified)',
    iconName: 'Ship',
  },
  {
    id: 'kpi-eta',
    label: 'MISSION ETA',
    value: '41h 52m',
    trend: '-4h 30m opt',
    trendDirection: 'down',
    status: 'info',
    statusText: 'NOMINAL',
    supportingInfo: "Dest: St. John's | Dist: 840 NM",
    iconName: 'Clock',
  },
];

export const NAVIGATION_INTELLIGENCE_DATA: NavigationRecommendation = {
  recommendedRoute: 'BALANCED',
  confidencePct: 94,
  estimatedFuelSavingPct: 12.4,
  estimatedTimeDeltaHours: -4.5,
  safetyScore: 94,
  currentCondition:
    'Flemish Pass ice lead open with favorable southbound Labrador Current streamline.',
  aiRationale:
    'POLARIS recommends the dark-navy balanced route to maintain maximum iceberg clearance while exploiting boundary flow streamlines.',
  corridorRiskIndex: 24,
};

export const ACTIVE_ALERTS_DATA: ActiveAlert[] = [
  {
    id: 'alt-01',
    severity: 'WARNING',
    title: 'Labrador Pack Ice Expansion',
    description: 'First-year pack ice concentration increasing along northern shelf edge.',
    timestamp: '14 min ago',
    sector: 'Labrador Shelf / 54°N',
    actionRequired: 'Maintain Flemish Pass open fairway',
  },
  {
    id: 'alt-02',
    severity: 'HIGH',
    title: 'Tabular Iceberg Incursion',
    description: 'Iceberg IB-023 drifting south at 1.4 kts across planned corridor.',
    timestamp: '28 min ago',
    sector: 'Grand Banks / 53°N',
    actionRequired: 'Radar collision tracker locked (3.4 NM CPA)',
  },
  {
    id: 'alt-03',
    severity: 'INFO',
    title: 'Subpolar Westerlies Approaching',
    description: 'Moderate crosswind expected after 18:00 UTC (gusts up to 32 kts).',
    timestamp: '1 hr ago',
    sector: 'Atlantic Grid 3 / 52°N',
  },
];

export const ENVIRONMENTAL_FORECAST_72H: EnvironmentalForecastPoint[] = [
  { hour: '00h', seaIceConcentration: 48, windSpeed: 20, riskScore: 24, iceThicknessM: 0.8 },
  { hour: '06h', seaIceConcentration: 50, windSpeed: 22, riskScore: 25, iceThicknessM: 0.9 },
  { hour: '12h', seaIceConcentration: 52, windSpeed: 24, riskScore: 27, iceThicknessM: 0.9 },
  { hour: '18h', seaIceConcentration: 54, windSpeed: 28, riskScore: 31, iceThicknessM: 1.0 },
  { hour: '24h', seaIceConcentration: 55, windSpeed: 30, riskScore: 33, iceThicknessM: 1.1 },
  { hour: '30h', seaIceConcentration: 52, windSpeed: 26, riskScore: 29, iceThicknessM: 1.0 },
  { hour: '36h', seaIceConcentration: 48, windSpeed: 24, riskScore: 26, iceThicknessM: 0.9 },
  { hour: '42h', seaIceConcentration: 45, windSpeed: 20, riskScore: 22, iceThicknessM: 0.8 },
  { hour: '48h', seaIceConcentration: 40, windSpeed: 18, riskScore: 20, iceThicknessM: 0.8 },
  { hour: '54h', seaIceConcentration: 35, windSpeed: 16, riskScore: 18, iceThicknessM: 0.7 },
  { hour: '60h', seaIceConcentration: 30, windSpeed: 16, riskScore: 16, iceThicknessM: 0.6 },
  { hour: '66h', seaIceConcentration: 24, windSpeed: 14, riskScore: 14, iceThicknessM: 0.5 },
  { hour: '72h', seaIceConcentration: 18, windSpeed: 12, riskScore: 12, iceThicknessM: 0.4 },
];

export const MAP_TACTICAL_DATA = {
  vessel: {
    name: 'R/V Polar Sentinel',
    type: 'Polar Research Vessel',
    iceClass: 'PC3',
    lat: 52.85,
    lng: -45.40,
    x: 48,
    y: 42,
    speedKts: 13.2,
    headingDeg: 245,
  },
  destination: {
    name: "St. John's Maritime Base (Newfoundland)",
    lat: 47.5675,
    lng: -52.7072,
    x: 74,
    y: 72,
    status: 'Operational Polar Hub',
  },
  origin: {
    name: 'North Atlantic Fairway Entry',
    lat: 59.0,
    lng: -32.0,
    x: 22,
    y: 18,
  },
  waypoints: [
    { id: 'wp-1', name: 'WP-Alpha (Mid-Atlantic)', x: 34, y: 28, lat: 56.0, lng: -39.5 },
    { id: 'wp-2', name: 'WP-Bravo (Iceberg Alley)', x: 48, y: 42, lat: 52.85, lng: -45.4 },
    { id: 'wp-3', name: 'WP-Charlie (Flemish Pass)', x: 60, y: 55, lat: 49.8, lng: -49.2 },
    { id: 'wp-4', name: "WP-Delta (St. John's Approach)", x: 74, y: 72, lat: 47.5675, lng: -52.7072 },
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
      code: 'IB-023',
      name: 'Iceberg IB-023',
      x: 56,
      y: 48,
      sizeClass: 'Giant Tabular',
      driftSpeedKts: 1.4,
      driftHeadingDeg: 165,
      riskLevel: 'critical',
    },
    {
      id: 'ib-2',
      code: 'IB-041',
      name: 'Iceberg IB-041',
      x: 68,
      y: 38,
      sizeClass: 'Medium',
      driftSpeedKts: 0.9,
      driftHeadingDeg: 150,
      riskLevel: 'warning',
    },
    {
      id: 'ib-3',
      code: 'A-76A Frag',
      name: 'A-76A Fragment 04',
      x: 38,
      y: 60,
      sizeClass: 'Giant Tabular',
      driftSpeedKts: 1.1,
      driftHeadingDeg: 195,
      riskLevel: 'low',
    },
    {
      id: 'ib-4',
      code: 'IB-089',
      name: 'Bergy Cluster 089',
      x: 64,
      y: 65,
      sizeClass: 'Bergy Bit',
      driftSpeedKts: 0.5,
      driftHeadingDeg: 140,
      riskLevel: 'warning',
    },
  ],
  riskZones: [
    {
      id: 'rz-1',
      label: 'Grand Banks Tabular Incursion Zone',
      color: 'rgba(239, 68, 68, 0.18)',
      borderColor: 'rgba(239, 68, 68, 0.6)',
      points: '50,30 65,35 62,52 46,46',
    },
    {
      id: 'rz-2',
      label: 'Flemish Pass Convergence Lead',
      color: 'rgba(245, 158, 11, 0.14)',
      borderColor: 'rgba(245, 158, 11, 0.5)',
      points: '60,60 85,62 82,85 58,80',
    },
  ],
};
