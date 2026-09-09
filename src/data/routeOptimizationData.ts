import { RoutePath } from '@/types/map';

export type RouteKey = 'SAFE' | 'FASTEST' | 'FUEL_EFFICIENT' | 'BALANCED';

export interface RouteCandidateDetail {
  id: string;
  key: RouteKey;
  name: string;
  subtitle: string;
  badgeLabel: string;
  isRecommended: boolean;
  recommendationTag?: string;
  recommendationReason?: string;
  distanceKm: number;
  distanceFormatted: string;
  etaHours: number;
  etaFormatted: string;
  fuelM3: number;
  fuelFormatted: string;
  riskScore: number;
  riskFormatted: string;
  riskTier: 'SAFE' | 'LOW' | 'MODERATE' | 'HIGH';
  color: string;
  strokeWidth: number;
  dashArray?: string;
  maxIceConcentrationPct: number;
  averageSpeedKts: number;
  icebreakerAssistance: boolean;
  characteristics: string[];
  routePath: RoutePath;
}

export interface RouteComparisonPoint {
  metric: string;
  unit: string;
  SAFE: number;
  FASTEST: number;
  FUEL_EFFICIENT: number;
  BALANCED: number;
  bestKey: RouteKey;
  lowerIsBetter: boolean;
}

export interface RouteRadarScore {
  metric: string;
  SAFE: number;
  FASTEST: number;
  FUEL_EFFICIENT: number;
  BALANCED: number;
  fullMark: number;
}

export const ROUTE_CANDIDATES: RouteCandidateDetail[] = [
  {
    id: 'route-safe',
    key: 'SAFE',
    name: 'Safe Route',
    subtitle: 'Maximized sea-ice & iceberg avoidance detour',
    badgeLabel: 'MAX SAFETY',
    isRecommended: false,
    distanceKm: 1815,
    distanceFormatted: '1,815 km',
    etaHours: 49.5,
    etaFormatted: '49h 30m',
    fuelM3: 92.4,
    fuelFormatted: '92.4 m³',
    riskScore: 12,
    riskFormatted: '12 / 100',
    riskTier: 'SAFE',
    color: '#064E3B', // Deep Pine Green (Proper dark color)
    strokeWidth: 2.8,
    dashArray: '4,4',
    maxIceConcentrationPct: 15,
    averageSpeedKts: 13.8,
    icebreakerAssistance: false,
    characteristics: [
      'Circumnavigates the Grand Banks iceberg drift cone to the south',
      'CPA to nearest iceberg cluster > 36 NM in warm open water',
      'Lowest hull structural stress and wave impact profile',
      'Extended voyage distance (+260 km vs Balanced corridor)',
    ],
    routePath: {
      id: 'route-safe',
      name: 'SAFE ROUTE',
      type: 'SAFE',
      label: 'Safe Corridor (South Loop Detour)',
      description: 'Maximum margin Atlantic safety detour staying in warm open water and low concentration margins.',
      color: '#064E3B',
      strokeWidth: 2.8,
      dashArray: '4,4',
      distanceKm: 1815,
      etaFormatted: '49h 30m',
      fuelM3: 92.4,
      riskScore: 12,
      isRecommended: false,
      waypoints: [
        { id: 'wp-s0', name: 'Start (Atlantic Entry)', lat: 59.0, lng: -32.0, x: 22, y: 18, iceConcentrationPct: 8 },
        { id: 'wp-s1', name: 'South Loop Alpha', lat: 53.5, lng: -37.0, x: 38, y: 20, iceConcentrationPct: 12 },
        { id: 'wp-s2', name: 'Open Water South Bravo', lat: 47.5, lng: -44.0, x: 62, y: 28, iceConcentrationPct: 6 },
        { id: 'wp-s3', name: 'Avalon South Fairway', lat: 46.2, lng: -50.5, x: 78, y: 46, iceConcentrationPct: 10 },
        { id: 'wp-s4', name: "St. John's Port (Dest)", lat: 47.5675, lng: -52.7072, x: 74, y: 72, iceConcentrationPct: 15 },
      ],
    },
  },
  {
    id: 'route-fastest',
    key: 'FASTEST',
    name: 'Fastest Route',
    subtitle: 'Direct high-speed passage through northern ice shelf edge',
    badgeLabel: 'MIN DURATION',
    isRecommended: false,
    distanceKm: 1416,
    distanceFormatted: '1,416 km',
    etaHours: 37.2,
    etaFormatted: '37h 12m',
    fuelM3: 98.5,
    fuelFormatted: '98.5 m³',
    riskScore: 41,
    riskFormatted: '41 / 100',
    riskTier: 'MODERATE',
    color: '#991B1B', // Deep Dark Crimson (Proper dark color)
    strokeWidth: 2.8,
    dashArray: '6,4',
    maxIceConcentrationPct: 78,
    averageSpeedKts: 15.2,
    icebreakerAssistance: true,
    characteristics: [
      'Shortest geographical distance across the Atlantic corridor (1,416 km)',
      'Traverses northern Labrador ice shelf edge with elevated wave-ice coupling',
      'Higher proximity to drifting tabular icebergs (41/100 risk score)',
      'Requires continuous hull monitoring and higher engine thrust output',
    ],
    routePath: {
      id: 'route-fastest',
      name: 'FASTEST ROUTE',
      type: 'FASTEST',
      label: 'Direct Ice Edge Corridor',
      description: 'Minimum duration direct cut traversing northern Labrador ice edge with elevated engine load.',
      color: '#991B1B',
      strokeWidth: 2.8,
      dashArray: '6,4',
      distanceKm: 1416,
      etaFormatted: '37h 12m',
      fuelM3: 98.5,
      riskScore: 41,
      isRecommended: false,
      waypoints: [
        { id: 'wp-f0', name: 'Start (Atlantic Entry)', lat: 59.0, lng: -32.0, x: 22, y: 18, iceConcentrationPct: 8 },
        { id: 'wp-f1', name: 'Direct Cut 1 (Labrador Basin)', lat: 55.2, lng: -43.5, x: 38, y: 32, iceConcentrationPct: 68 },
        { id: 'wp-f2', name: 'Direct Cut 2 (Outer Flemish Basin)', lat: 51.5, lng: -48.5, x: 54, y: 48, iceConcentrationPct: 78 },
        { id: 'wp-f3', name: 'Avalon Offshore Fairway', lat: 48.2, lng: -51.5, x: 68, y: 64, iceConcentrationPct: 25 },
        { id: 'wp-f4', name: "St. John's Harbor (Dest)", lat: 47.5675, lng: -52.7072, x: 74, y: 72, iceConcentrationPct: 20 },
      ],
    },
  },
  {
    id: 'route-fuel',
    key: 'FUEL_EFFICIENT',
    name: 'Fuel Efficient Route',
    subtitle: 'Current-assisted route utilizing North Atlantic flow streamlines',
    badgeLabel: 'MIN FUEL',
    isRecommended: false,
    distanceKm: 1620,
    distanceFormatted: '1,620 km',
    etaHours: 43.25,
    etaFormatted: '43h 15m',
    fuelM3: 76.8,
    fuelFormatted: '76.8 m³',
    riskScore: 26,
    riskFormatted: '26 / 100',
    riskTier: 'LOW',
    color: '#155E75', // Deep Dark Ocean Teal (Proper dark color)
    strokeWidth: 2.8,
    dashArray: '5,3',
    maxIceConcentrationPct: 42,
    averageSpeedKts: 13.0,
    icebreakerAssistance: false,
    characteristics: [
      'Utilizes favorable Labrador Current boundary streamlines (+1.6 kts speed assist)',
      'Lowest total bunker fuel consumption across voyage (76.8 m³)',
      'Optimizes engine RPM and hydrodynamic slip ratio',
      'Navigates natural open leads in Flemish Pass',
    ],
    routePath: {
      id: 'route-fuel',
      name: 'FUEL EFFICIENT',
      type: 'FUEL_EFFICIENT',
      label: 'Hydrodynamic Current Stream Corridor',
      description: 'Current-assisted transit maximizing fuel economy through Atlantic boundary flow streamlines.',
      color: '#155E75',
      strokeWidth: 2.8,
      dashArray: '5,3',
      distanceKm: 1620,
      etaFormatted: '43h 15m',
      fuelM3: 76.8,
      riskScore: 26,
      isRecommended: false,
      waypoints: [
        { id: 'wp-u0', name: 'Start (Atlantic Entry)', lat: 59.0, lng: -32.0, x: 22, y: 18, iceConcentrationPct: 8 },
        { id: 'wp-u1', name: 'Current Assist Stream 1', lat: 56.5, lng: -41.0, x: 32, y: 26, iceConcentrationPct: 28 },
        { id: 'wp-u2', name: 'Labrador Stream Channel', lat: 52.5, lng: -46.5, x: 46, y: 40, iceConcentrationPct: 38 },
        { id: 'wp-u3', name: 'Flemish Pass Lead', lat: 49.5, lng: -49.5, x: 58, y: 54, iceConcentrationPct: 42 },
        { id: 'wp-u4', name: "St. John's Approach (Dest)", lat: 47.5675, lng: -52.7072, x: 74, y: 72, iceConcentrationPct: 15 },
      ],
    },
  },
  {
    id: 'route-balanced',
    key: 'BALANCED',
    name: 'Balanced Route',
    subtitle: 'Pareto-optimal trade-off between safety, fuel, and mission time',
    badgeLabel: 'AI RECOMMENDED',
    isRecommended: true,
    recommendationTag: 'AI RECOMMENDED',
    recommendationReason: 'Provides the optimal trade-off between safety, fuel consumption, and transit time across the Atlantic corridor.',
    distanceKm: 1555,
    distanceFormatted: '1,555 km',
    etaHours: 41.87,
    etaFormatted: '41h 52m',
    fuelM3: 82.6,
    fuelFormatted: '82.6 m³',
    riskScore: 24,
    riskFormatted: '24 / 100',
    riskTier: 'LOW',
    color: '#0A2540', // Deep Midnight Navy (Proper dark high-contrast color)
    strokeWidth: 3.8,
    maxIceConcentrationPct: 48,
    averageSpeedKts: 13.2,
    icebreakerAssistance: false,
    characteristics: [
      'POLARIS AI recommended Pareto-optimal convergence solution',
      'Balanced ETA (41h 52m) within 4.5h of fastest route with 41% lower risk',
      'Low composite collision risk (24/100) with safe structural RIO margin',
      'Modest fuel burn (82.6 m³) with zero icebreaker convoy requirement',
    ],
    routePath: {
      id: 'route-balanced',
      name: 'BALANCED ROUTE',
      type: 'BALANCED',
      label: 'Recommended Route (Balanced)',
      description: 'Optimal multi-objective corridor balancing open leads, low iceberg proximity, and minimal fuel consumption.',
      color: '#0A2540',
      strokeWidth: 3.8,
      distanceKm: 1555,
      etaFormatted: '41h 52m',
      fuelM3: 82.6,
      riskScore: 24,
      isRecommended: true,
      waypoints: [
        { id: 'wp-b0', name: 'Start (Atlantic Entry)', lat: 59.0, lng: -32.0, x: 22, y: 18, iceConcentrationPct: 8 },
        { id: 'wp-b1', name: 'WP-Alpha (Mid-Atlantic Corridor)', lat: 56.0, lng: -39.5, x: 34, y: 28, iceConcentrationPct: 22 },
        { id: 'wp-b2', name: 'WP-Bravo (Iceberg Alley / Vessel)', lat: 52.85, lng: -45.4, x: 48, y: 42, iceConcentrationPct: 48 },
        { id: 'wp-b3', name: 'WP-Charlie (Flemish Pass Channel)', lat: 49.8, lng: -49.2, x: 60, y: 55, iceConcentrationPct: 35 },
        { id: 'wp-b4', name: "WP-Delta (St. John's Approach)", lat: 47.5675, lng: -52.7072, x: 74, y: 72, iceConcentrationPct: 15 },
      ],
    },
  },
];

export const ROUTE_COMPARISON_METRICS: RouteComparisonPoint[] = [
  {
    metric: 'Total Distance',
    unit: 'km',
    SAFE: 1815,
    FASTEST: 1416,
    FUEL_EFFICIENT: 1620,
    BALANCED: 1555,
    bestKey: 'FASTEST',
    lowerIsBetter: true,
  },
  {
    metric: 'Estimated Transit Time',
    unit: 'hours',
    SAFE: 49.5,
    FASTEST: 37.2,
    FUEL_EFFICIENT: 43.25,
    BALANCED: 41.87,
    bestKey: 'FASTEST',
    lowerIsBetter: true,
  },
  {
    metric: 'Bunker Fuel Consumption',
    unit: 'm³',
    SAFE: 92.4,
    FASTEST: 98.5,
    FUEL_EFFICIENT: 76.8,
    BALANCED: 82.6,
    bestKey: 'FUEL_EFFICIENT',
    lowerIsBetter: true,
  },
  {
    metric: 'POLARIS RIO Risk Score',
    unit: '/ 100',
    SAFE: 12,
    FASTEST: 41,
    FUEL_EFFICIENT: 26,
    BALANCED: 24,
    bestKey: 'SAFE',
    lowerIsBetter: true,
  },
  {
    metric: 'Max Ice Concentration',
    unit: '%',
    SAFE: 15,
    FASTEST: 78,
    FUEL_EFFICIENT: 42,
    BALANCED: 48,
    bestKey: 'SAFE',
    lowerIsBetter: true,
  },
  {
    metric: 'Average SOG Speed',
    unit: 'kts',
    SAFE: 13.8,
    FASTEST: 15.2,
    FUEL_EFFICIENT: 13.0,
    BALANCED: 13.2,
    bestKey: 'FASTEST',
    lowerIsBetter: false,
  },
];

export const ROUTE_RADAR_SCORES: RouteRadarScore[] = [
  { metric: 'Safety Margin', SAFE: 96, FASTEST: 54, FUEL_EFFICIENT: 78, BALANCED: 88, fullMark: 100 },
  { metric: 'Fuel Economy', SAFE: 68, FASTEST: 58, FUEL_EFFICIENT: 98, BALANCED: 86, fullMark: 100 },
  { metric: 'Speed / ETA', SAFE: 55, FASTEST: 98, FUEL_EFFICIENT: 70, BALANCED: 84, fullMark: 100 },
  { metric: 'Iceberg Clearance', SAFE: 95, FASTEST: 50, FUEL_EFFICIENT: 76, BALANCED: 85, fullMark: 100 },
  { metric: 'Hull Stress Relief', SAFE: 92, FASTEST: 48, FUEL_EFFICIENT: 80, BALANCED: 87, fullMark: 100 },
  { metric: 'Regulatory Compliance', SAFE: 98, FASTEST: 72, FUEL_EFFICIENT: 90, BALANCED: 95, fullMark: 100 },
];

export const ROUTE_RADAR_DATA = ROUTE_RADAR_SCORES;

export const ROUTE_ALGORITHM_SPEC = {
  version: '2.6',
  name: 'Continuous-Curvature A* Kinematic Pathfinder & NSGA-II Multi-Objective Solver',
  simulationParams: {
    populationSize: 120,
    generations: 80,
    crossoverProbability: 0.85,
    mutationRate: 0.08,
    gridResolutionKm: 5,
  },
};

