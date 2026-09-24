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
    distanceKm: 2840,
    distanceFormatted: '2,840 km',
    etaHours: 112.5,
    etaFormatted: '112h 30m',
    fuelM3: 168.4,
    fuelFormatted: '168.4 m³',
    riskScore: 12,
    riskFormatted: '12 / 100',
    riskTier: 'SAFE',
    color: '#064E3B', // Deep Pine Green
    strokeWidth: 2.8,
    dashArray: '4,4',
    maxIceConcentrationPct: 15,
    averageSpeedKts: 13.8,
    icebreakerAssistance: false,
    characteristics: [
      'Circumnavigates the heavy fast ice and A-76A drift corridor to the north',
      'CPA to nearest iceberg cluster > 45 NM in lower concentration open pack',
      'Lowest hull structural stress and minimal ice resistance profile',
      'Extended voyage distance (+390 km vs Balanced corridor)',
    ],
    routePath: {
      id: 'route-safe',
      name: 'SAFE ROUTE',
      type: 'SAFE',
      label: 'Safe Corridor (North Arc Detour)',
      description: 'Maximum margin East Antarctic safety detour keeping vessel in low concentration pack ice and open water leads.',
      color: '#064E3B',
      strokeWidth: 2.8,
      dashArray: '4,4',
      distanceKm: 2840,
      etaFormatted: '112h 30m',
      fuelM3: 168.4,
      riskScore: 12,
      isRecommended: false,
      waypoints: [
        { id: 'wp-s0', name: 'Maitri Offshore Fairway', lat: -69.80, lng: 11.90, x: 22, y: 18, iceConcentrationPct: 20 },
        { id: 'wp-s1', name: 'North Arc Alpha', lat: -66.20, lng: 28.00, x: 38, y: 20, iceConcentrationPct: 12 },
        { id: 'wp-s2', name: 'Enderby North Fairway', lat: -65.50, lng: 48.00, x: 62, y: 28, iceConcentrationPct: 8 },
        { id: 'wp-s3', name: 'Prydz Bay Outer Approach', lat: -66.80, lng: 68.00, x: 78, y: 46, iceConcentrationPct: 14 },
        { id: 'wp-s4', name: 'Bharati Anchorage (Dest)', lat: -69.41, lng: 76.19, x: 74, y: 72, iceConcentrationPct: 18 },
      ],
    },
  },
  {
    id: 'route-fastest',
    key: 'FASTEST',
    name: 'Fastest Route',
    subtitle: 'Direct high-speed passage through coastal fast-ice margin',
    badgeLabel: 'MIN DURATION',
    isRecommended: false,
    distanceKm: 2310,
    distanceFormatted: '2,310 km',
    etaHours: 86.2,
    etaFormatted: '86h 12m',
    fuelM3: 182.5,
    fuelFormatted: '182.5 m³',
    riskScore: 41,
    riskFormatted: '41 / 100',
    riskTier: 'MODERATE',
    color: '#991B1B', // Deep Dark Crimson
    strokeWidth: 2.8,
    dashArray: '6,4',
    maxIceConcentrationPct: 78,
    averageSpeedKts: 14.8,
    icebreakerAssistance: true,
    characteristics: [
      'Shortest geographical distance across the East Antarctic corridor (2,310 km)',
      'Traverses coastal fast-ice margin along Princess Astrid Coast',
      'Higher proximity to tabular iceberg calving fronts (41/100 risk score)',
      'Requires continuous hull monitoring and higher engine thrust output',
    ],
    routePath: {
      id: 'route-fastest',
      name: 'FASTEST ROUTE',
      type: 'FASTEST',
      label: 'Direct Ice Edge Corridor',
      description: 'Minimum duration direct cut traversing coastal fast-ice margins with elevated engine load.',
      color: '#991B1B',
      strokeWidth: 2.8,
      dashArray: '6,4',
      distanceKm: 2310,
      etaFormatted: '86h 12m',
      fuelM3: 182.5,
      riskScore: 41,
      isRecommended: false,
      waypoints: [
        { id: 'wp-f0', name: 'Maitri Offshore Fairway', lat: -69.80, lng: 11.90, x: 22, y: 18, iceConcentrationPct: 20 },
        { id: 'wp-f1', name: 'Princess Ragnhild Cut', lat: -68.40, lng: 28.50, x: 38, y: 32, iceConcentrationPct: 68 },
        { id: 'wp-f2', name: 'Enderby Coastal Trench', lat: -67.20, lng: 50.00, x: 54, y: 48, iceConcentrationPct: 78 },
        { id: 'wp-f3', name: 'Amery Shelf Boundary', lat: -68.10, lng: 69.50, x: 68, y: 64, iceConcentrationPct: 45 },
        { id: 'wp-f4', name: 'Bharati Anchorage (Dest)', lat: -69.41, lng: 76.19, x: 74, y: 72, iceConcentrationPct: 25 },
      ],
    },
  },
  {
    id: 'route-fuel',
    key: 'FUEL_EFFICIENT',
    name: 'Fuel Efficient Route',
    subtitle: 'Current-assisted route utilizing East Wind Drift streamlines',
    badgeLabel: 'MIN FUEL',
    isRecommended: false,
    distanceKm: 2540,
    distanceFormatted: '2,540 km',
    etaHours: 98.5,
    etaFormatted: '98h 30m',
    fuelM3: 142.8,
    fuelFormatted: '142.8 m³',
    riskScore: 26,
    riskFormatted: '26 / 100',
    riskTier: 'LOW',
    color: '#155E75', // Deep Dark Ocean Teal
    strokeWidth: 2.8,
    dashArray: '5,3',
    maxIceConcentrationPct: 42,
    averageSpeedKts: 13.0,
    icebreakerAssistance: false,
    characteristics: [
      'Utilizes favorable Antarctic Coastal Current flow vectors (+1.8 kts speed assist)',
      'Lowest total bunker fuel consumption across voyage (142.8 m³)',
      'Optimizes engine RPM and hydrodynamic slip ratio',
      'Navigates natural open polynya leads off Cape Darnley',
    ],
    routePath: {
      id: 'route-fuel',
      name: 'FUEL EFFICIENT',
      type: 'FUEL_EFFICIENT',
      label: 'Hydrodynamic Current Stream Corridor',
      description: 'Current-assisted transit maximizing fuel economy through East Wind Drift boundary streamlines.',
      color: '#155E75',
      strokeWidth: 2.8,
      dashArray: '5,3',
      distanceKm: 2540,
      etaFormatted: '98h 30m',
      fuelM3: 142.8,
      riskScore: 26,
      isRecommended: false,
      waypoints: [
        { id: 'wp-u0', name: 'Maitri Offshore Fairway', lat: -69.80, lng: 11.90, x: 22, y: 18, iceConcentrationPct: 20 },
        { id: 'wp-u1', name: 'East Drift Stream 1', lat: -67.50, lng: 30.00, x: 32, y: 26, iceConcentrationPct: 28 },
        { id: 'wp-u2', name: 'Cosmonaut Polynya Lead', lat: -66.80, lng: 48.00, x: 46, y: 40, iceConcentrationPct: 35 },
        { id: 'wp-u3', name: 'Cape Darnley Channel', lat: -67.90, lng: 69.80, x: 58, y: 54, iceConcentrationPct: 38 },
        { id: 'wp-u4', name: 'Bharati Anchorage (Dest)', lat: -69.41, lng: 76.19, x: 74, y: 72, iceConcentrationPct: 20 },
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
    recommendationReason: 'Provides the optimal trade-off between safety, fuel consumption, and transit time across the East Antarctic corridor.',
    distanceKm: 2450,
    distanceFormatted: '2,450 km',
    etaHours: 94.2,
    etaFormatted: '94h 12m',
    fuelM3: 152.6,
    fuelFormatted: '152.6 m³',
    riskScore: 22,
    riskFormatted: '22 / 100',
    riskTier: 'LOW',
    color: '#0A2540', // Deep Midnight Navy
    strokeWidth: 3.8,
    maxIceConcentrationPct: 48,
    averageSpeedKts: 13.5,
    icebreakerAssistance: false,
    characteristics: [
      'POLARIS AI recommended Pareto-optimal convergence solution for SA Agulhas II',
      'Balanced ETA (94h 12m) within 8h of fastest route with 46% lower risk',
      'Low composite collision risk (22/100) with safe structural PC3 RIO margin',
      'Modest fuel burn (152.6 m³) with zero icebreaker escort requirement',
    ],
    routePath: {
      id: 'route-balanced',
      name: 'BALANCED ROUTE',
      type: 'BALANCED',
      label: 'Recommended Route (Balanced)',
      description: 'Optimal multi-objective corridor balancing open leads, low iceberg proximity, and minimal fuel consumption.',
      color: '#0A2540',
      strokeWidth: 3.8,
      distanceKm: 2450,
      etaFormatted: '94h 12m',
      fuelM3: 152.6,
      riskScore: 22,
      isRecommended: true,
      waypoints: [
        { id: 'wp-b0', name: 'Maitri Offshore Fairway', lat: -69.80, lng: 11.90, x: 22, y: 18, iceConcentrationPct: 20 },
        { id: 'wp-b1', name: 'WP-Alpha (Princess Astrid Ridge)', lat: -67.80, lng: 26.50, x: 34, y: 28, iceConcentrationPct: 25 },
        { id: 'wp-b2', name: 'WP-Bravo (Enderby Lead / Vessel)', lat: -66.90, lng: 48.50, x: 48, y: 42, iceConcentrationPct: 45 },
        { id: 'wp-b3', name: 'WP-Charlie (Prydz North Gate)', lat: -67.50, lng: 70.20, x: 60, y: 55, iceConcentrationPct: 30 },
        { id: 'wp-b4', name: 'WP-Delta (Bharati Roadstead)', lat: -69.41, lng: 76.19, x: 74, y: 72, iceConcentrationPct: 18 },
      ],
    },
  },
];

export const ROUTE_COMPARISON_METRICS: RouteComparisonPoint[] = [
  {
    metric: 'Total Distance',
    unit: 'km',
    SAFE: 2840,
    FASTEST: 2310,
    FUEL_EFFICIENT: 2540,
    BALANCED: 2450,
    bestKey: 'FASTEST',
    lowerIsBetter: true,
  },
  {
    metric: 'Estimated Transit Time',
    unit: 'hours',
    SAFE: 112.5,
    FASTEST: 86.2,
    FUEL_EFFICIENT: 98.5,
    BALANCED: 94.2,
    bestKey: 'FASTEST',
    lowerIsBetter: true,
  },
  {
    metric: 'Bunker Fuel Consumption',
    unit: 'm³',
    SAFE: 168.4,
    FASTEST: 182.5,
    FUEL_EFFICIENT: 142.8,
    BALANCED: 152.6,
    bestKey: 'FUEL_EFFICIENT',
    lowerIsBetter: true,
  },
  {
    metric: 'POLARIS RIO Risk Score',
    unit: '/ 100',
    SAFE: 12,
    FASTEST: 41,
    FUEL_EFFICIENT: 26,
    BALANCED: 22,
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
    FASTEST: 14.8,
    FUEL_EFFICIENT: 13.0,
    BALANCED: 13.5,
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

