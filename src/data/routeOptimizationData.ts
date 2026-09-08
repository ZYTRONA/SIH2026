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
    distanceKm: 1342,
    distanceFormatted: '1,342 km',
    etaHours: 45.2,
    etaFormatted: '45h 12m',
    fuelM3: 88.2,
    fuelFormatted: '88.2 m³',
    riskScore: 12,
    riskFormatted: '12 / 100',
    riskTier: 'SAFE',
    color: '#10B981', // Emerald
    strokeWidth: 2.5,
    dashArray: '3,3',
    maxIceConcentrationPct: 42,
    averageSpeedKts: 11.2,
    icebreakerAssistance: false,
    characteristics: [
      'Circumnavigates heavy multi-year pack ice',
      'CPA to nearest iceberg cluster > 28 NM',
      'Lowest hull structural stress profile',
      'Extended voyage distance (+68 km vs Balanced)',
    ],
    routePath: {
      id: 'route-safe',
      name: 'SAFE ROUTE',
      type: 'SAFE',
      label: 'Safe Corridor (Outer Detour)',
      description: 'Maximum margin polar safety detour staying in open drift and low concentration leads.',
      color: '#10B981',
      strokeWidth: 2.5,
      dashArray: '3,3',
      distanceKm: 1342,
      etaFormatted: '45h 12m',
      fuelM3: 88.2,
      riskScore: 12,
      isRecommended: false,
      waypoints: [
        { id: 'wp-s0', name: 'Start (Southern Ocean)', lat: -60.1, lng: 58.2, x: 22, y: 18, iceConcentrationPct: 10 },
        { id: 'wp-s1', name: 'Outer Loop Alpha', lat: -63.5, lng: 64.0, x: 38, y: 20, iceConcentrationPct: 18 },
        { id: 'wp-s2', name: 'Outer Open Water Bravo', lat: -66.0, lng: 72.0, x: 62, y: 28, iceConcentrationPct: 24 },
        { id: 'wp-s3', name: 'East Shelf Margin', lat: -68.2, lng: 77.5, x: 78, y: 46, iceConcentrationPct: 35 },
        { id: 'wp-s4', name: 'Coastal Lead Inbound', lat: -69.1, lng: 78.0, x: 80, y: 62, iceConcentrationPct: 42 },
        { id: 'wp-s5', name: 'Bharati Station (Dest)', lat: -69.41, lng: 76.19, x: 74, y: 72, iceConcentrationPct: 40 },
      ],
    },
  },
  {
    id: 'route-fastest',
    key: 'FASTEST',
    name: 'Fastest Route',
    subtitle: 'Direct high-speed passage through central pack',
    badgeLabel: 'MIN DURATION',
    isRecommended: false,
    distanceKm: 1214,
    distanceFormatted: '1,214 km',
    etaHours: 38.67,
    etaFormatted: '38h 40m',
    fuelM3: 84.7,
    fuelFormatted: '84.7 m³',
    riskScore: 41,
    riskFormatted: '41 / 100',
    riskTier: 'MODERATE',
    color: '#F59E0B', // Amber
    strokeWidth: 2.5,
    dashArray: '6,4',
    maxIceConcentrationPct: 84,
    averageSpeedKts: 14.8,
    icebreakerAssistance: true,
    characteristics: [
      'Shortest geographical distance (1,214 km)',
      'Direct penetration of Prydz Bay heavy pack',
      'Elevated iceberg collision probability (41/100)',
      'Requires full ice-class continuous ramming mode',
    ],
    routePath: {
      id: 'route-fastest',
      name: 'FASTEST ROUTE',
      type: 'FASTEST',
      label: 'Direct Ice Edge Corridor',
      description: 'Minimum duration direct cut traversing heavy multi-year floes with higher engine load.',
      color: '#F59E0B',
      strokeWidth: 2.5,
      dashArray: '6,4',
      distanceKm: 1214,
      etaFormatted: '38h 40m',
      fuelM3: 84.7,
      riskScore: 41,
      isRecommended: false,
      waypoints: [
        { id: 'wp-f0', name: 'Start (Southern Ocean)', lat: -60.1, lng: 58.2, x: 22, y: 18, iceConcentrationPct: 10 },
        { id: 'wp-f1', name: 'Direct Cut Alpha', lat: -64.8, lng: 64.2, x: 38, y: 32, iceConcentrationPct: 62 },
        { id: 'wp-f2', name: 'Central Pack Incursion', lat: -67.8, lng: 69.8, x: 54, y: 48, iceConcentrationPct: 84 },
        { id: 'wp-f3', name: 'Prydz Direct Throat', lat: -68.8, lng: 73.2, x: 64, y: 60, iceConcentrationPct: 78 },
        { id: 'wp-f4', name: 'Bharati Station (Dest)', lat: -69.41, lng: 76.19, x: 74, y: 72, iceConcentrationPct: 65 },
      ],
    },
  },
  {
    id: 'route-fuel',
    key: 'FUEL_EFFICIENT',
    name: 'Fuel Efficient Route',
    subtitle: 'Current-assisted route minimizing hydrodynamic resistance',
    badgeLabel: 'MIN FUEL',
    isRecommended: false,
    distanceKm: 1280,
    distanceFormatted: '1,280 km',
    etaHours: 42.17,
    etaFormatted: '42h 10m',
    fuelM3: 79.4,
    fuelFormatted: '79.4 m³',
    riskScore: 26,
    riskFormatted: '26 / 100',
    riskTier: 'LOW',
    color: '#06B6D4', // Cyan
    strokeWidth: 2.5,
    dashArray: '5,3',
    maxIceConcentrationPct: 62,
    averageSpeedKts: 12.4,
    icebreakerAssistance: false,
    characteristics: [
      'Exploits Antarctic Divergence boundary currents (+1.4 kts assist)',
      'Lowest total fuel consumption (79.4 m³)',
      'Optimizes propeller torque and hydrodynamic slip',
      'Follows natural polynya formations',
    ],
    routePath: {
      id: 'route-fuel',
      name: 'FUEL EFFICIENT',
      type: 'FUEL_EFFICIENT',
      label: 'Hydrodynamic Current Stream Corridor',
      description: 'Current-assisted transit maximizing fuel economy through boundary flow streamlines.',
      color: '#06B6D4',
      strokeWidth: 2.5,
      dashArray: '5,3',
      distanceKm: 1280,
      etaFormatted: '42h 10m',
      fuelM3: 79.4,
      riskScore: 26,
      isRecommended: false,
      waypoints: [
        { id: 'wp-u0', name: 'Start (Southern Ocean)', lat: -60.1, lng: 58.2, x: 22, y: 18, iceConcentrationPct: 10 },
        { id: 'wp-u1', name: 'Current Assist Stream 1', lat: -64.2, lng: 61.5, x: 32, y: 26, iceConcentrationPct: 38 },
        { id: 'wp-u2', name: 'Divergence Drift Channel', lat: -67.2, lng: 66.8, x: 46, y: 40, iceConcentrationPct: 54 },
        { id: 'wp-u3', name: 'Cape Darnley Polynya', lat: -68.5, lng: 71.0, x: 58, y: 54, iceConcentrationPct: 62 },
        { id: 'wp-u4', name: 'Bharati Station (Dest)', lat: -69.41, lng: 76.19, x: 74, y: 72, iceConcentrationPct: 52 },
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
    recommendationReason: 'Provides the best trade-off between safety, fuel consumption and mission time.',
    distanceKm: 1274,
    distanceFormatted: '1,274 km',
    etaHours: 41.87,
    etaFormatted: '41h 52m',
    fuelM3: 82.6,
    fuelFormatted: '82.6 m³',
    riskScore: 24,
    riskFormatted: '24 / 100',
    riskTier: 'LOW',
    color: '#38BDF8', // Sky Blue / Ice Glow
    strokeWidth: 3.5,
    maxIceConcentrationPct: 58,
    averageSpeedKts: 12.8,
    icebreakerAssistance: false,
    characteristics: [
      'AI recommended Pareto-optimal convergence solution',
      'Balanced ETA (41h 52m) within 3.2h of fastest route',
      'Low composite risk (24/100) with safe structural RIO margin',
      'Modest fuel burn (82.6 m³) with zero icebreaker convoy requirement',
    ],
    routePath: {
      id: 'route-balanced',
      name: 'BALANCED ROUTE',
      type: 'BALANCED',
      label: 'Recommended Optimal Corridor (Balanced)',
      description: 'Multi-objective Pareto-optimal corridor balancing open leads, low iceberg proximity, and minimal fuel burn.',
      color: '#38BDF8',
      strokeWidth: 3.5,
      distanceKm: 1274,
      etaFormatted: '41h 52m',
      fuelM3: 82.6,
      riskScore: 24,
      isRecommended: true,
      waypoints: [
        { id: 'wp-b0', name: 'Start (Southern Ocean Entry)', lat: -60.1, lng: 58.2, x: 22, y: 18, iceConcentrationPct: 10 },
        { id: 'wp-b1', name: 'WP-Alpha (Open Pack Channel)', lat: -64.2, lng: 62.4, x: 34, y: 28, iceConcentrationPct: 45 },
        { id: 'wp-b2', name: 'WP-Bravo (Ice Lead Entry / Vessel)', lat: -68.45, lng: 67.8, x: 48, y: 42, iceConcentrationPct: 65 },
        { id: 'wp-b3', name: 'WP-Charlie (Prydz North Lead)', lat: -68.9, lng: 71.5, x: 60, y: 55, iceConcentrationPct: 58 },
        { id: 'wp-b4', name: 'WP-Delta (Larsemann Coast)', lat: -69.4, lng: 76.2, x: 74, y: 72, iceConcentrationPct: 55 },
      ],
    },
  },
];

// Recharts Visual Comparison Data
export const ROUTE_COMPARISON_METRICS: RouteComparisonPoint[] = [
  {
    metric: 'Safety Index (100 - Risk)',
    unit: 'pts',
    SAFE: 88, // 100 - 12
    FASTEST: 59, // 100 - 41
    FUEL_EFFICIENT: 74, // 100 - 26
    BALANCED: 76, // 100 - 24
    bestKey: 'SAFE',
    lowerIsBetter: false,
  },
  {
    metric: 'Navigation Risk Score',
    unit: '/100',
    SAFE: 12,
    FASTEST: 41,
    FUEL_EFFICIENT: 26,
    BALANCED: 24,
    bestKey: 'SAFE',
    lowerIsBetter: true,
  },
  {
    metric: 'Fuel Consumption',
    unit: 'm³',
    SAFE: 88.2,
    FASTEST: 84.7,
    FUEL_EFFICIENT: 79.4,
    BALANCED: 82.6,
    bestKey: 'FUEL_EFFICIENT',
    lowerIsBetter: true,
  },
  {
    metric: 'Estimated Transit Time',
    unit: 'hours',
    SAFE: 45.2,
    FASTEST: 38.67,
    FUEL_EFFICIENT: 42.17,
    BALANCED: 41.87,
    bestKey: 'FASTEST',
    lowerIsBetter: true,
  },
  {
    metric: 'Voyage Distance',
    unit: 'km',
    SAFE: 1342,
    FASTEST: 1214,
    FUEL_EFFICIENT: 1280,
    BALANCED: 1274,
    bestKey: 'FASTEST',
    lowerIsBetter: true,
  },
];

// Multi-Objective Radar Coverage Data
export const ROUTE_RADAR_DATA: RouteRadarScore[] = [
  { metric: 'Structural Safety', SAFE: 96, FASTEST: 52, FUEL_EFFICIENT: 78, BALANCED: 82, fullMark: 100 },
  { metric: 'Fuel Economy', SAFE: 64, FASTEST: 72, FUEL_EFFICIENT: 98, BALANCED: 90, fullMark: 100 },
  { metric: 'Transit Velocity', SAFE: 60, FASTEST: 96, FUEL_EFFICIENT: 74, BALANCED: 78, fullMark: 100 },
  { metric: 'Iceberg Clearance', SAFE: 94, FASTEST: 48, FUEL_EFFICIENT: 76, BALANCED: 80, fullMark: 100 },
  { metric: 'Weather Resilience', SAFE: 88, FASTEST: 65, FUEL_EFFICIENT: 82, BALANCED: 85, fullMark: 100 },
  { metric: 'Maneuvering Simplicity', SAFE: 84, FASTEST: 70, FUEL_EFFICIENT: 80, BALANCED: 88, fullMark: 100 },
];

export const ROUTE_ALGORITHM_SPEC = {
  name: 'A* Pathfinding + NSGA-II Multi-objective Optimization',
  version: 'POLARIS Pareto Engine v2.6',
  pathfinder: 'Hybrid Continuous-Curvature A* with Polar Dynamic Obstacle Constraints',
  optimizer: 'Non-dominated Sorting Genetic Algorithm II (NSGA-II)',
  disclaimer: 'Pareto-optimal candidate solutions calculated on operational polar grid graphs.',
  paretoObjectives: [
    { name: 'Objective 1: Safety Cost', formula: 'min \\int (RIO_{risk}(s) + P_{iceberg}(s)) \\, ds', weight: '35%' },
    { name: 'Objective 2: Fuel Consumption', formula: 'min \\int \\dot{m}_{fuel}(v, R_{ice}, R_{wave}) \\, dt', weight: '35%' },
    { name: 'Objective 3: Transit Duration', formula: 'min \\int \\frac{1}{v_{safe}(s)} \\, ds', weight: '30%' },
  ],
  simulationParams: {
    populationSize: 120,
    generations: 85,
    crossoverProbability: 0.85,
    mutationRate: 0.08,
    gridResolutionKm: 5.0,
  },
};
