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
// DASHBOARD DATASETS
// ----------------------------------------------------

export const DASHBOARD_KPIS: KPICardData[] = [
  {
    id: 'kpi-sea-ice',
    label: 'SEA-ICE COVERAGE',
    value: '82.4%',
    trend: '+3.2%',
    trendDirection: 'up',
    status: 'warning',
    statusText: 'EXPANDING',
    supportingInfo: 'Prydz Bay Sector (Sentinel-1 SAR)',
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
    supportingInfo: 'Within 50 NM corridor radius',
    iconName: 'Mountain',
  },
  {
    id: 'kpi-risk',
    label: 'NAVIGATION RISK',
    value: '24 / 100',
    status: 'safe',
    statusText: 'LOW',
    supportingInfo: 'RIO Safety Margin: +18 (PC3 Compliant)',
    iconName: 'ShieldAlert',
  },
  {
    id: 'kpi-weather',
    label: 'WEATHER SEVERITY',
    value: 'MODERATE',
    status: 'info',
    statusText: '24 knots',
    supportingInfo: 'Wind: 24 kts SSE | Vis: 6.2 NM',
    iconName: 'Wind',
  },
  {
    id: 'kpi-vessel',
    label: 'CURRENT VESSEL',
    value: 'Polar Research Vessel',
    status: 'safe',
    statusText: 'PC3',
    supportingInfo: 'Capability: PC3 (Year-round sub-polar)',
    iconName: 'Ship',
  },
  {
    id: 'kpi-eta',
    label: 'MISSION ETA',
    value: '41h 52m',
    trend: '-3h 15m opt',
    trendDirection: 'down',
    status: 'info',
    statusText: 'NOMINAL',
    supportingInfo: 'Dest: Bharati Station | Dist: 418 NM',
    iconName: 'Clock',
  },
];

export const NAVIGATION_INTELLIGENCE_DATA: NavigationRecommendation = {
  recommendedRoute: 'BALANCED',
  confidencePct: 91,
  estimatedFuelSavingPct: 8.6,
  estimatedTimeDeltaHours: -3.2,
  safetyScore: 94,
  currentCondition:
    'Moderate sea-ice concentration detected along the eastern approach.',
  aiRationale:
    'POLARIS recommends the balanced route to reduce ice and iceberg exposure while maintaining fuel efficiency.',
  corridorRiskIndex: 24,
};

export const ACTIVE_ALERTS_DATA: ActiveAlert[] = [
  {
    id: 'alt-01',
    severity: 'WARNING',
    title: 'Increasing Sea-Ice Concentration',
    description: 'Increasing sea-ice concentration expected within 24 hours in Sector 7B.',
    timestamp: '14 min ago',
    sector: 'Prydz Bay / 69°E',
    actionRequired: 'Adjust waypoint Bravo 12 NM West',
  },
  {
    id: 'alt-02',
    severity: 'HIGH',
    title: 'Iceberg Drift Incursion',
    description: 'Iceberg IB-023 projected near planned corridor within 6 hours.',
    timestamp: '28 min ago',
    sector: 'Corridor Alpha / 70°S',
    actionRequired: 'Radar collision tracker locked',
  },
  {
    id: 'alt-03',
    severity: 'INFO',
    title: 'Atmospheric Front Approaching',
    description: 'Strong crosswind expected after 18:00 UTC (gusts up to 38 kts).',
    timestamp: '1 hr ago',
    sector: 'Southern Ocean Grid 4',
  },
];

export const ENVIRONMENTAL_FORECAST_72H: EnvironmentalForecastPoint[] = [
  { hour: '00h', seaIceConcentration: 76, windSpeed: 18, riskScore: 18, iceThicknessM: 1.1 },
  { hour: '06h', seaIceConcentration: 78, windSpeed: 21, riskScore: 20, iceThicknessM: 1.2 },
  { hour: '12h', seaIceConcentration: 81, windSpeed: 24, riskScore: 23, iceThicknessM: 1.2 },
  { hour: '18h', seaIceConcentration: 83, windSpeed: 28, riskScore: 28, iceThicknessM: 1.3 },
  { hour: '24h', seaIceConcentration: 85, windSpeed: 32, riskScore: 34, iceThicknessM: 1.4 },
  { hour: '30h', seaIceConcentration: 86, windSpeed: 30, riskScore: 36, iceThicknessM: 1.4 },
  { hour: '36h', seaIceConcentration: 84, windSpeed: 27, riskScore: 31, iceThicknessM: 1.3 },
  { hour: '42h', seaIceConcentration: 82, windSpeed: 23, riskScore: 26, iceThicknessM: 1.3 },
  { hour: '48h', seaIceConcentration: 79, windSpeed: 20, riskScore: 22, iceThicknessM: 1.2 },
  { hour: '54h', seaIceConcentration: 77, windSpeed: 19, riskScore: 20, iceThicknessM: 1.1 },
  { hour: '60h', seaIceConcentration: 75, windSpeed: 22, riskScore: 19, iceThicknessM: 1.1 },
  { hour: '66h', seaIceConcentration: 73, windSpeed: 25, riskScore: 21, iceThicknessM: 1.0 },
  { hour: '72h', seaIceConcentration: 70, windSpeed: 20, riskScore: 17, iceThicknessM: 1.0 },
];

export const MAP_TACTICAL_DATA = {
  vessel: {
    name: 'R/V Polar Sentinel',
    type: 'Polar Research Vessel',
    iceClass: 'PC3',
    lat: -68.45,
    lng: 67.8,
    x: 48,
    y: 42,
    speedKts: 12.4,
    headingDeg: 142,
  },
  destination: {
    name: 'Bharati Station (Larsemann Hills)',
    lat: -69.4075,
    lng: 76.1947,
    x: 74,
    y: 72,
    status: 'Operational Base',
  },
  origin: {
    name: 'Cape Town Transit Corridor',
    lat: -60.1,
    lng: 58.2,
    x: 22,
    y: 18,
  },
  waypoints: [
    { id: 'wp-1', name: 'WP-Alpha (Open Pack)', x: 34, y: 28, lat: -64.2, lng: 62.4 },
    { id: 'wp-2', name: 'WP-Bravo (Ice Lead Entry)', x: 48, y: 42, lat: -68.45, lng: 67.8 },
    { id: 'wp-3', name: 'WP-Charlie (Prydz North)', x: 60, y: 55, lat: -68.9, lng: 71.5 },
    { id: 'wp-4', name: 'WP-Delta (Larsemann Approach)', x: 74, y: 72, lat: -69.4, lng: 76.2 },
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
      driftHeadingDeg: 290,
      riskLevel: 'critical',
    },
    {
      id: 'ib-2',
      code: 'IB-041',
      name: 'Iceberg IB-041',
      x: 68,
      y: 38,
      sizeClass: 'Medium',
      driftSpeedKts: 0.8,
      driftHeadingDeg: 310,
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
      driftHeadingDeg: 275,
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
      driftHeadingDeg: 260,
      riskLevel: 'warning',
    },
  ],
  riskZones: [
    {
      id: 'rz-1',
      label: 'Multi-Year Pressure Ridge Zone',
      color: 'rgba(239, 68, 68, 0.18)',
      borderColor: 'rgba(239, 68, 68, 0.6)',
      points: '50,30 65,35 62,52 46,46',
    },
    {
      id: 'rz-2',
      label: 'Fast Ice Coastal Margin',
      color: 'rgba(245, 158, 11, 0.14)',
      borderColor: 'rgba(245, 158, 11, 0.5)',
      points: '60,60 85,62 82,85 58,80',
    },
  ],
};
