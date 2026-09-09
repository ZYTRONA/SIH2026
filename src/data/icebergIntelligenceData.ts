export interface IcebergTrajectoryPoint {
  stage: 'Current Position' | '+24h' | '+48h' | '+72h';
  hourOffset: number;
  lat: number;
  lng: number;
  x: number; // Polar map x (0-1000)
  y: number; // Polar map y (0-1000)
  routeDistanceKm: number;
  driftVelocityMs: number;
  windDragMs: number;
  oceanCurrentVelocityMs: number;
}

export interface DetailedIceberg {
  id: string;
  code: string;
  name: string;
  seaLocation: string;
  sizeKm2: number;
  driftSpeedKmh: number;
  riskCategory: 'HIGH RISK' | 'ELEVATED' | 'MODERATE' | 'LOW';
  themeColor: string; // Hex color for marker & card stripe
  lat: number;
  lng: number;
  mapX: number; // Coordinates for Polar Stereographic Map (0-1000 viewBox)
  mapY: number;
  lengthKm: number;
  widthKm: number;
  thicknessM: number;
  areaKm2: number;
  sizeCategory: 'Giant Tabular' | 'Medium' | 'Bergy Bit' | 'Growler';
  velocityMs: number;
  velocityKts: number;
  directionCompass: 'N' | 'NNE' | 'NE' | 'ENE' | 'E' | 'ESE' | 'SE' | 'SSE' | 'S' | 'SSW' | 'SW' | 'WSW' | 'W' | 'WNW' | 'NW' | 'NNW';
  directionDeg: number;
  riskLevel: 'CRITICAL' | 'HIGH' | 'WARNING' | 'MODERATE' | 'LOW' | 'SAFE';
  collisionProbabilityPct: number;
  routeDistanceKm: number;
  detectionSource: 'Sentinel-1 SAR' | 'Landsat-9 Optical' | 'Shipboard Radar' | 'CryoSat-2';
  nearestStation: string;
  aiExplanation: string;
  modelName: string;
  confidencePct: number;
  oceanCurrentForcingPct: number;
  windDragForcingPct: number;
  coriolisForcingPct: number;
  trajectory: IcebergTrajectoryPoint[];
}

// ----------------------------------------------------
// 7 HIGH-PRIORITY ICEBERGS IN THE ATLANTIC OCEAN CORRIDOR
// ----------------------------------------------------
export const HIGH_PRIORITY_ICEBERGS: DetailedIceberg[] = [
  {
    id: 'ib-023',
    code: 'IB-023',
    name: 'Iceberg IB-023 (Grand Banks Gateway)',
    seaLocation: 'Grand Banks / Flemish Pass',
    sizeKm2: 2.84,
    driftSpeedKmh: 1.32,
    riskCategory: 'HIGH RISK',
    themeColor: '#DC2626', // Red
    lat: 53.20,
    lng: -46.80,
    mapX: 430,
    mapY: 325,
    lengthKm: 2.2,
    widthKm: 1.3,
    thicknessM: 240,
    areaKm2: 2.84,
    sizeCategory: 'Giant Tabular',
    velocityMs: 0.37,
    velocityKts: 0.71,
    directionCompass: 'SSE',
    directionDeg: 165,
    riskLevel: 'CRITICAL',
    collisionProbabilityPct: 18.4,
    routeDistanceKm: 6.2,
    detectionSource: 'Sentinel-1 SAR',
    nearestStation: "St. John's Approach (180 NM)",
    aiExplanation: 'Lagrangian hydrodynamic model indicates rapid southward advection propelled by Labrador Current core and 32 kt northwesterly squall directly crossing the recommended route corridor.',
    modelName: 'Polaris Iceberg Drift v2.4 (Lagrangian + XGBoost)',
    confidencePct: 94,
    oceanCurrentForcingPct: 58,
    windDragForcingPct: 32,
    coriolisForcingPct: 10,
    trajectory: [
      { stage: 'Current Position', hourOffset: 0, lat: 53.20, lng: -46.80, x: 430, y: 325, routeDistanceKm: 6.2, driftVelocityMs: 0.37, windDragMs: 0.18, oceanCurrentVelocityMs: 0.35 },
      { stage: '+24h', hourOffset: 24, lat: 52.80, lng: -47.10, x: 450, y: 310, routeDistanceKm: 4.5, driftVelocityMs: 0.41, windDragMs: 0.22, oceanCurrentVelocityMs: 0.38 },
      { stage: '+48h', hourOffset: 48, lat: 52.35, lng: -47.45, x: 480, y: 298, routeDistanceKm: 3.1, driftVelocityMs: 0.44, windDragMs: 0.25, oceanCurrentVelocityMs: 0.41 },
      { stage: '+72h', hourOffset: 72, lat: 51.85, lng: -47.80, x: 510, y: 290, routeDistanceKm: 7.8, driftVelocityMs: 0.39, windDragMs: 0.16, oceanCurrentVelocityMs: 0.32 },
    ],
  },
  {
    id: 'ib-041',
    code: 'IB-041',
    name: 'Iceberg IB-041 (Labrador Sea Pinnacle)',
    seaLocation: 'Labrador Sea',
    sizeKm2: 1.67,
    driftSpeedKmh: 0.98,
    riskCategory: 'HIGH RISK',
    themeColor: '#EA580C', // Orange
    lat: 54.85,
    lng: -49.20,
    mapX: 510,
    mapY: 290,
    lengthKm: 1.8,
    widthKm: 0.95,
    thicknessM: 190,
    areaKm2: 1.67,
    sizeCategory: 'Medium',
    velocityMs: 0.27,
    velocityKts: 0.53,
    directionCompass: 'SSE',
    directionDeg: 150,
    riskLevel: 'HIGH',
    collisionProbabilityPct: 14.8,
    routeDistanceKm: 8.9,
    detectionSource: 'Sentinel-1 SAR',
    nearestStation: 'St. Anthony Radar Outpost (210 NM)',
    aiExplanation: 'Labrador Current streamline steering pinnacled berg southeastward directly across the northern transit waypoint Alpha-2.',
    modelName: 'Polaris Iceberg Drift v2.4 (Lagrangian + XGBoost)',
    confidencePct: 91,
    oceanCurrentForcingPct: 62,
    windDragForcingPct: 28,
    coriolisForcingPct: 10,
    trajectory: [
      { stage: 'Current Position', hourOffset: 0, lat: 54.85, lng: -49.20, x: 510, y: 290, routeDistanceKm: 8.9, driftVelocityMs: 0.27, windDragMs: 0.14, oceanCurrentVelocityMs: 0.29 },
      { stage: '+24h', hourOffset: 24, lat: 54.40, lng: -49.50, x: 540, y: 285, routeDistanceKm: 7.2, driftVelocityMs: 0.30, windDragMs: 0.16, oceanCurrentVelocityMs: 0.32 },
      { stage: '+48h', hourOffset: 48, lat: 53.95, lng: -49.85, x: 575, y: 282, routeDistanceKm: 6.4, driftVelocityMs: 0.33, windDragMs: 0.19, oceanCurrentVelocityMs: 0.35 },
      { stage: '+72h', hourOffset: 72, lat: 53.40, lng: -50.20, x: 610, y: 288, routeDistanceKm: 11.0, driftVelocityMs: 0.29, windDragMs: 0.15, oceanCurrentVelocityMs: 0.30 },
    ],
  },
  {
    id: 'ib-017',
    code: 'IB-017',
    name: 'Iceberg IB-017 (Cape Farewell Stream)',
    seaLocation: 'Cape Farewell Margin',
    sizeKm2: 0.92,
    driftSpeedKmh: 0.71,
    riskCategory: 'ELEVATED',
    themeColor: '#EAB308', // Yellow/Gold
    lat: 58.20,
    lng: -43.50,
    mapX: 636,
    mapY: 300,
    lengthKm: 1.3,
    widthKm: 0.71,
    thicknessM: 140,
    areaKm2: 0.92,
    sizeCategory: 'Medium',
    velocityMs: 0.20,
    velocityKts: 0.38,
    directionCompass: 'SSW',
    directionDeg: 210,
    riskLevel: 'WARNING',
    collisionProbabilityPct: 8.2,
    routeDistanceKm: 14.7,
    detectionSource: 'Landsat-9 Optical',
    nearestStation: 'Cape Farewell Weather Station (105 NM)',
    aiExplanation: 'East Greenland Current boundary outflow driving drift south-southwest towards outer shipping lane.',
    modelName: 'Polaris Iceberg Drift v2.4 (Lagrangian + XGBoost)',
    confidencePct: 88,
    oceanCurrentForcingPct: 68,
    windDragForcingPct: 22,
    coriolisForcingPct: 10,
    trajectory: [
      { stage: 'Current Position', hourOffset: 0, lat: 58.20, lng: -43.50, x: 636, y: 300, routeDistanceKm: 14.7, driftVelocityMs: 0.20, windDragMs: 0.11, oceanCurrentVelocityMs: 0.24 },
      { stage: '+24h', hourOffset: 24, lat: 57.75, lng: -43.90, x: 655, y: 330, routeDistanceKm: 16.2, driftVelocityMs: 0.22, windDragMs: 0.13, oceanCurrentVelocityMs: 0.26 },
      { stage: '+48h', hourOffset: 48, lat: 57.25, lng: -44.35, x: 672, y: 365, routeDistanceKm: 18.5, driftVelocityMs: 0.24, windDragMs: 0.15, oceanCurrentVelocityMs: 0.28 },
      { stage: '+72h', hourOffset: 72, lat: 56.70, lng: -44.80, x: 688, y: 405, routeDistanceKm: 22.0, driftVelocityMs: 0.21, windDragMs: 0.12, oceanCurrentVelocityMs: 0.25 },
    ],
  },
  {
    id: 'ib-055',
    code: 'IB-055',
    name: 'Iceberg IB-055 (Flemish Cap Incursion)',
    seaLocation: 'Flemish Cap',
    sizeKm2: 0.68,
    driftSpeedKmh: 0.53,
    riskCategory: 'MODERATE',
    themeColor: '#10B981', // Emerald Green
    lat: 50.80,
    lng: -48.60,
    mapX: 704,
    mapY: 512,
    lengthKm: 1.1,
    widthKm: 0.62,
    thicknessM: 110,
    areaKm2: 0.68,
    sizeCategory: 'Medium',
    velocityMs: 0.15,
    velocityKts: 0.29,
    directionCompass: 'SSE',
    directionDeg: 155,
    riskLevel: 'MODERATE',
    collisionProbabilityPct: 5.4,
    routeDistanceKm: 22.4,
    detectionSource: 'Sentinel-1 SAR',
    nearestStation: "St. John's Port (120 NM)",
    aiExplanation: 'Flemish Pass deep bathymetric trough channeling drift southeastward into deep Atlantic waters.',
    modelName: 'Polaris Iceberg Drift v2.4 (Lagrangian + XGBoost)',
    confidencePct: 86,
    oceanCurrentForcingPct: 75,
    windDragForcingPct: 18,
    coriolisForcingPct: 7,
    trajectory: [
      { stage: 'Current Position', hourOffset: 0, lat: 50.80, lng: -48.60, x: 704, y: 512, routeDistanceKm: 22.4, driftVelocityMs: 0.15, windDragMs: 0.08, oceanCurrentVelocityMs: 0.18 },
      { stage: '+24h', hourOffset: 24, lat: 50.40, lng: -48.85, x: 695, y: 560, routeDistanceKm: 24.1, driftVelocityMs: 0.17, windDragMs: 0.10, oceanCurrentVelocityMs: 0.20 },
      { stage: '+48h', hourOffset: 48, lat: 49.95, lng: -49.15, x: 678, y: 610, routeDistanceKm: 27.0, driftVelocityMs: 0.19, windDragMs: 0.12, oceanCurrentVelocityMs: 0.22 },
      { stage: '+72h', hourOffset: 72, lat: 49.45, lng: -49.50, x: 655, y: 660, routeDistanceKm: 32.5, driftVelocityMs: 0.16, windDragMs: 0.09, oceanCurrentVelocityMs: 0.19 },
    ],
  },
  {
    id: 'ib-009',
    code: 'IB-009',
    name: 'Iceberg IB-009 (Labrador Marginal)',
    seaLocation: 'Labrador Shelf',
    sizeKm2: 0.45,
    driftSpeedKmh: 0.38,
    riskCategory: 'MODERATE',
    themeColor: '#10B981', // Emerald Green
    lat: 55.60,
    lng: -42.80,
    mapX: 406,
    mapY: 642,
    lengthKm: 0.85,
    widthKm: 0.53,
    thicknessM: 85,
    areaKm2: 0.45,
    sizeCategory: 'Bergy Bit',
    velocityMs: 0.11,
    velocityKts: 0.21,
    directionCompass: 'S',
    directionDeg: 180,
    riskLevel: 'MODERATE',
    collisionProbabilityPct: 4.1,
    routeDistanceKm: 28.6,
    detectionSource: 'Sentinel-1 SAR',
    nearestStation: 'Nanortalik Ice Base (280 NM)',
    aiExplanation: 'Subpolar gyre damping and steady surface winds constraining daily drift radius to under 9 km.',
    modelName: 'Polaris Iceberg Drift v2.4 (Lagrangian + XGBoost)',
    confidencePct: 89,
    oceanCurrentForcingPct: 44,
    windDragForcingPct: 46,
    coriolisForcingPct: 10,
    trajectory: [
      { stage: 'Current Position', hourOffset: 0, lat: 55.60, lng: -42.80, x: 406, y: 642, routeDistanceKm: 28.6, driftVelocityMs: 0.11, windDragMs: 0.10, oceanCurrentVelocityMs: 0.12 },
      { stage: '+24h', hourOffset: 24, lat: 55.20, lng: -42.80, x: 395, y: 590, routeDistanceKm: 29.8, driftVelocityMs: 0.12, windDragMs: 0.11, oceanCurrentVelocityMs: 0.13 },
      { stage: '+48h', hourOffset: 48, lat: 54.80, lng: -42.85, x: 385, y: 535, routeDistanceKm: 33.2, driftVelocityMs: 0.13, windDragMs: 0.12, oceanCurrentVelocityMs: 0.14 },
      { stage: '+72h', hourOffset: 72, lat: 54.35, lng: -42.90, x: 380, y: 480, routeDistanceKm: 37.0, driftVelocityMs: 0.11, windDragMs: 0.10, oceanCurrentVelocityMs: 0.12 },
    ],
  },
  {
    id: 'ib-037',
    code: 'IB-037',
    name: 'Iceberg IB-037 (Avalon Outflow)',
    seaLocation: 'Avalon Channel',
    sizeKm2: 0.32,
    driftSpeedKmh: 0.28,
    riskCategory: 'LOW',
    themeColor: '#0284C7', // Blue
    lat: 49.50,
    lng: -49.80,
    mapX: 478,
    mapY: 728,
    lengthKm: 0.65,
    widthKm: 0.48,
    thicknessM: 70,
    areaKm2: 0.32,
    sizeCategory: 'Bergy Bit',
    velocityMs: 0.08,
    velocityKts: 0.15,
    directionCompass: 'SE',
    directionDeg: 145,
    riskLevel: 'LOW',
    collisionProbabilityPct: 2.1,
    routeDistanceKm: 34.2,
    detectionSource: 'Landsat-9 Optical',
    nearestStation: "St. John's Fairway (95 NM)",
    aiExplanation: 'Grand Banks shallow bathymetry grounding small fragments and retarding southward velocity.',
    modelName: 'Polaris Iceberg Drift v2.4 (Lagrangian + XGBoost)',
    confidencePct: 92,
    oceanCurrentForcingPct: 40,
    windDragForcingPct: 50,
    coriolisForcingPct: 10,
    trajectory: [
      { stage: 'Current Position', hourOffset: 0, lat: 49.50, lng: -49.80, x: 478, y: 728, routeDistanceKm: 34.2, driftVelocityMs: 0.08, windDragMs: 0.07, oceanCurrentVelocityMs: 0.09 },
      { stage: '+24h', hourOffset: 24, lat: 49.20, lng: -49.60, x: 490, y: 760, routeDistanceKm: 36.1, driftVelocityMs: 0.09, windDragMs: 0.08, oceanCurrentVelocityMs: 0.10 },
      { stage: '+48h', hourOffset: 48, lat: 48.85, lng: -49.35, x: 505, y: 790, routeDistanceKm: 38.8, driftVelocityMs: 0.10, windDragMs: 0.09, oceanCurrentVelocityMs: 0.11 },
      { stage: '+72h', hourOffset: 72, lat: 48.50, lng: -49.05, x: 520, y: 820, routeDistanceKm: 42.0, driftVelocityMs: 0.08, windDragMs: 0.07, oceanCurrentVelocityMs: 0.09 },
    ],
  },
  {
    id: 'ib-062',
    code: 'IB-062',
    name: 'Iceberg IB-062 (Davis Strait Giant)',
    seaLocation: 'Davis Strait Entry',
    sizeKm2: 3.12,
    driftSpeedKmh: 1.45,
    riskCategory: 'HIGH RISK',
    themeColor: '#DC2626', // Red
    lat: 59.30,
    lng: -45.00,
    mapX: 568,
    mapY: 765,
    lengthKm: 2.6,
    widthKm: 1.2,
    thicknessM: 270,
    areaKm2: 3.12,
    sizeCategory: 'Giant Tabular',
    velocityMs: 0.40,
    velocityKts: 0.78,
    directionCompass: 'S',
    directionDeg: 175,
    riskLevel: 'CRITICAL',
    collisionProbabilityPct: 16.5,
    routeDistanceKm: 9.4,
    detectionSource: 'Sentinel-1 SAR',
    nearestStation: 'Nuuk Corridor (240 NM)',
    aiExplanation: 'Massive tabular slab detached from West Greenland ice sheet advecting south at 0.78 kts into northern transatlantic fairway.',
    modelName: 'Polaris Iceberg Drift v2.4 (Lagrangian + XGBoost)',
    confidencePct: 95,
    oceanCurrentForcingPct: 60,
    windDragForcingPct: 30,
    coriolisForcingPct: 10,
    trajectory: [
      { stage: 'Current Position', hourOffset: 0, lat: 59.30, lng: -45.00, x: 568, y: 765, routeDistanceKm: 9.4, driftVelocityMs: 0.40, windDragMs: 0.20, oceanCurrentVelocityMs: 0.38 },
      { stage: '+24h', hourOffset: 24, lat: 58.75, lng: -45.05, x: 550, y: 730, routeDistanceKm: 10.8, driftVelocityMs: 0.42, windDragMs: 0.22, oceanCurrentVelocityMs: 0.40 },
      { stage: '+48h', hourOffset: 48, lat: 58.15, lng: -45.15, x: 530, y: 690, routeDistanceKm: 12.5, driftVelocityMs: 0.45, windDragMs: 0.24, oceanCurrentVelocityMs: 0.43 },
      { stage: '+72h', hourOffset: 72, lat: 57.50, lng: -45.25, x: 505, y: 650, routeDistanceKm: 15.0, driftVelocityMs: 0.41, windDragMs: 0.19, oceanCurrentVelocityMs: 0.39 },
    ],
  },
];

export const ICEBERG_TOTAL_COUNT = 37;
export const CRITICAL_ICEBERG_COUNT = 7;
export const DRIFT_MODELS_ACTIVE = 4;
export const DETAILED_ICEBERGS_CATALOG: DetailedIceberg[] = HIGH_PRIORITY_ICEBERGS;
