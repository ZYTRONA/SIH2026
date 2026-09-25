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
// 7 HIGH-PRIORITY ICEBERGS IN THE EAST ANTARCTIC CORRIDOR
// ----------------------------------------------------
export const HIGH_PRIORITY_ICEBERGS: DetailedIceberg[] = [
  {
    id: 'ib-a76a',
    code: 'A-76A',
    name: 'Giant Iceberg A-76A (Princess Astrid Gateway)',
    seaLocation: 'Princess Astrid Coast / Lazarev Sea',
    sizeKm2: 42.6,
    driftSpeedKmh: 2.59,
    riskCategory: 'HIGH RISK',
    themeColor: '#DC2626', // Red
    lat: -68.20,
    lng: 24.50,
    mapX: 430,
    mapY: 325,
    lengthKm: 8.5,
    widthKm: 5.0,
    thicknessM: 240,
    areaKm2: 42.6,
    sizeCategory: 'Giant Tabular',
    velocityMs: 0.72,
    velocityKts: 1.40,
    directionCompass: 'WNW',
    directionDeg: 285,
    riskLevel: 'CRITICAL',
    collisionProbabilityPct: 18.4,
    routeDistanceKm: 8.8,
    detectionSource: 'Sentinel-1 SAR',
    nearestStation: 'Maitri Station (140 NM)',
    aiExplanation: 'Lagrangian hydrodynamic model indicates rapid westward advection propelled by Antarctic Coastal Current jet and 34 kt katabatic squall directly crossing the corridor.',
    modelName: 'Polaris Iceberg Drift v2.4 (Lagrangian + XGBoost)',
    confidencePct: 94,
    oceanCurrentForcingPct: 58,
    windDragForcingPct: 32,
    coriolisForcingPct: 10,
    trajectory: [
      { stage: 'Current Position', hourOffset: 0, lat: -68.20, lng: 24.50, x: 430, y: 325, routeDistanceKm: 8.8, driftVelocityMs: 0.72, windDragMs: 0.35, oceanCurrentVelocityMs: 0.65 },
      { stage: '+24h', hourOffset: 24, lat: -68.05, lng: 23.60, x: 450, y: 310, routeDistanceKm: 6.5, driftVelocityMs: 0.76, windDragMs: 0.38, oceanCurrentVelocityMs: 0.70 },
      { stage: '+48h', hourOffset: 48, lat: -67.85, lng: 22.50, x: 480, y: 298, routeDistanceKm: 5.1, driftVelocityMs: 0.81, windDragMs: 0.42, oceanCurrentVelocityMs: 0.75 },
      { stage: '+72h', hourOffset: 72, lat: -67.60, lng: 21.20, x: 510, y: 290, routeDistanceKm: 12.8, driftVelocityMs: 0.74, windDragMs: 0.32, oceanCurrentVelocityMs: 0.62 },
    ],
  },
  {
    id: 'ib-prydz-09',
    code: 'IB-PRYDZ-09',
    name: 'Iceberg IB-PRYDZ-09 (Amery Calving Margin)',
    seaLocation: 'Prydz Bay Continental Margin',
    sizeKm2: 8.45,
    driftSpeedKmh: 1.67,
    riskCategory: 'HIGH RISK',
    themeColor: '#EA580C', // Orange
    lat: -67.80,
    lng: 71.50,
    mapX: 510,
    mapY: 290,
    lengthKm: 3.8,
    widthKm: 2.2,
    thicknessM: 190,
    areaKm2: 8.45,
    sizeCategory: 'Giant Tabular',
    velocityMs: 0.46,
    velocityKts: 0.90,
    directionCompass: 'W',
    directionDeg: 260,
    riskLevel: 'HIGH',
    collisionProbabilityPct: 14.8,
    routeDistanceKm: 12.5,
    detectionSource: 'Sentinel-1 SAR',
    nearestStation: 'Bharati Station (85 NM)',
    aiExplanation: 'Antarctic Coastal Current streamline steering tabular berg westward across the Prydz Bay entry corridor.',
    modelName: 'Polaris Iceberg Drift v2.4 (Lagrangian + XGBoost)',
    confidencePct: 91,
    oceanCurrentForcingPct: 62,
    windDragForcingPct: 28,
    coriolisForcingPct: 10,
    trajectory: [
      { stage: 'Current Position', hourOffset: 0, lat: -67.80, lng: 71.50, x: 510, y: 290, routeDistanceKm: 12.5, driftVelocityMs: 0.46, windDragMs: 0.24, oceanCurrentVelocityMs: 0.49 },
      { stage: '+24h', hourOffset: 24, lat: -67.75, lng: 70.40, x: 540, y: 285, routeDistanceKm: 10.2, driftVelocityMs: 0.50, windDragMs: 0.26, oceanCurrentVelocityMs: 0.52 },
      { stage: '+48h', hourOffset: 48, lat: -67.65, lng: 69.20, x: 575, y: 282, routeDistanceKm: 9.4, driftVelocityMs: 0.53, windDragMs: 0.29, oceanCurrentVelocityMs: 0.55 },
      { stage: '+72h', hourOffset: 72, lat: -67.50, lng: 67.90, x: 610, y: 288, routeDistanceKm: 16.0, driftVelocityMs: 0.49, windDragMs: 0.25, oceanCurrentVelocityMs: 0.50 },
    ],
  },
  {
    id: 'ib-d30',
    code: 'D-30',
    name: 'Iceberg D-30 (Riiser-Larsen Drift)',
    seaLocation: 'Riiser-Larsen Sea',
    sizeKm2: 12.2,
    driftSpeedKmh: 1.30,
    riskCategory: 'ELEVATED',
    themeColor: '#EAB308', // Yellow/Gold
    lat: -66.50,
    lng: 38.00,
    mapX: 636,
    mapY: 300,
    lengthKm: 4.5,
    widthKm: 2.7,
    thicknessM: 210,
    areaKm2: 12.2,
    sizeCategory: 'Giant Tabular',
    velocityMs: 0.36,
    velocityKts: 0.70,
    directionCompass: 'WNW',
    directionDeg: 295,
    riskLevel: 'WARNING',
    collisionProbabilityPct: 8.2,
    routeDistanceKm: 24.7,
    detectionSource: 'Landsat-9 Optical',
    nearestStation: 'Showa Station (160 NM)',
    aiExplanation: 'Coastal drift outflow steering tabular slab westward along the continental slope margin.',
    modelName: 'Polaris Iceberg Drift v2.4 (Lagrangian + XGBoost)',
    confidencePct: 88,
    oceanCurrentForcingPct: 68,
    windDragForcingPct: 22,
    coriolisForcingPct: 10,
    trajectory: [
      { stage: 'Current Position', hourOffset: 0, lat: -66.50, lng: 38.00, x: 636, y: 300, routeDistanceKm: 24.7, driftVelocityMs: 0.36, windDragMs: 0.18, oceanCurrentVelocityMs: 0.42 },
      { stage: '+24h', hourOffset: 24, lat: -66.35, lng: 36.80, x: 655, y: 330, routeDistanceKm: 26.2, driftVelocityMs: 0.39, windDragMs: 0.20, oceanCurrentVelocityMs: 0.45 },
      { stage: '+48h', hourOffset: 48, lat: -66.15, lng: 35.40, x: 672, y: 365, routeDistanceKm: 28.5, driftVelocityMs: 0.42, windDragMs: 0.22, oceanCurrentVelocityMs: 0.48 },
      { stage: '+72h', hourOffset: 72, lat: -65.90, lng: 33.80, x: 688, y: 405, routeDistanceKm: 34.0, driftVelocityMs: 0.38, windDragMs: 0.19, oceanCurrentVelocityMs: 0.43 },
    ],
  },
  {
    id: 'ib-amery-04',
    code: 'IB-AMERY-04',
    name: 'Iceberg IB-AMERY-04 (Cape Darnley Incursion)',
    seaLocation: 'Cape Darnley Polynya',
    sizeKm2: 3.2,
    driftSpeedKmh: 0.95,
    riskCategory: 'MODERATE',
    themeColor: '#10B981', // Emerald Green
    lat: -68.40,
    lng: 68.20,
    mapX: 704,
    mapY: 512,
    lengthKm: 2.1,
    widthKm: 1.5,
    thicknessM: 160,
    areaKm2: 3.2,
    sizeCategory: 'Medium',
    velocityMs: 0.26,
    velocityKts: 0.51,
    directionCompass: 'W',
    directionDeg: 270,
    riskLevel: 'MODERATE',
    collisionProbabilityPct: 5.4,
    routeDistanceKm: 32.4,
    detectionSource: 'Sentinel-1 SAR',
    nearestStation: 'Zhongshan Station (110 NM)',
    aiExplanation: 'Polynya wind stress and shallow grounding along the Amery ridge retarding westward velocity.',
    modelName: 'Polaris Iceberg Drift v2.4 (Lagrangian + XGBoost)',
    confidencePct: 86,
    oceanCurrentForcingPct: 75,
    windDragForcingPct: 18,
    coriolisForcingPct: 7,
    trajectory: [
      { stage: 'Current Position', hourOffset: 0, lat: -68.40, lng: 68.20, x: 704, y: 512, routeDistanceKm: 32.4, driftVelocityMs: 0.26, windDragMs: 0.14, oceanCurrentVelocityMs: 0.31 },
      { stage: '+24h', hourOffset: 24, lat: -68.35, lng: 67.20, x: 695, y: 560, routeDistanceKm: 34.1, driftVelocityMs: 0.28, windDragMs: 0.16, oceanCurrentVelocityMs: 0.33 },
      { stage: '+48h', hourOffset: 48, lat: -68.25, lng: 66.10, x: 678, y: 610, routeDistanceKm: 37.0, driftVelocityMs: 0.30, windDragMs: 0.18, oceanCurrentVelocityMs: 0.35 },
      { stage: '+72h', hourOffset: 72, lat: -68.10, lng: 64.90, x: 655, y: 660, routeDistanceKm: 42.5, driftVelocityMs: 0.27, windDragMs: 0.15, oceanCurrentVelocityMs: 0.32 },
    ],
  },
  {
    id: 'ib-cosmo-02',
    code: 'IB-COSMO-02',
    name: 'Iceberg IB-COSMO-02 (Cosmonaut Marginal)',
    seaLocation: 'Cosmonaut Sea Margin',
    sizeKm2: 1.8,
    driftSpeedKmh: 0.72,
    riskCategory: 'MODERATE',
    themeColor: '#10B981', // Emerald Green
    lat: -66.80,
    lng: 52.40,
    mapX: 406,
    mapY: 642,
    lengthKm: 1.5,
    widthKm: 1.2,
    thicknessM: 130,
    areaKm2: 1.8,
    sizeCategory: 'Medium',
    velocityMs: 0.20,
    velocityKts: 0.39,
    directionCompass: 'WSW',
    directionDeg: 250,
    riskLevel: 'MODERATE',
    collisionProbabilityPct: 4.1,
    routeDistanceKm: 38.6,
    detectionSource: 'Sentinel-1 SAR',
    nearestStation: 'Molodezhnaya Station (95 NM)',
    aiExplanation: 'Subpolar gyre damping constraining daily drift radius to under 12 km in open pack.',
    modelName: 'Polaris Iceberg Drift v2.4 (Lagrangian + XGBoost)',
    confidencePct: 89,
    oceanCurrentForcingPct: 44,
    windDragForcingPct: 46,
    coriolisForcingPct: 10,
    trajectory: [
      { stage: 'Current Position', hourOffset: 0, lat: -66.80, lng: 52.40, x: 406, y: 642, routeDistanceKm: 38.6, driftVelocityMs: 0.20, windDragMs: 0.16, oceanCurrentVelocityMs: 0.22 },
      { stage: '+24h', hourOffset: 24, lat: -66.75, lng: 51.50, x: 395, y: 590, routeDistanceKm: 39.8, driftVelocityMs: 0.22, windDragMs: 0.17, oceanCurrentVelocityMs: 0.24 },
      { stage: '+48h', hourOffset: 48, lat: -66.65, lng: 50.40, x: 385, y: 535, routeDistanceKm: 43.2, driftVelocityMs: 0.24, windDragMs: 0.19, oceanCurrentVelocityMs: 0.26 },
      { stage: '+72h', hourOffset: 72, lat: -66.50, lng: 49.20, x: 380, y: 480, routeDistanceKm: 47.0, driftVelocityMs: 0.21, windDragMs: 0.16, oceanCurrentVelocityMs: 0.23 },
    ],
  },
  {
    id: 'ib-astrid-07',
    code: 'IB-ASTRID-07',
    name: 'Iceberg IB-ASTRID-07 (Princess Astrid Ridge)',
    seaLocation: 'Princess Astrid Shelf',
    sizeKm2: 0.95,
    driftSpeedKmh: 0.52,
    riskCategory: 'LOW',
    themeColor: '#0284C7', // Blue
    lat: -69.20,
    lng: 16.50,
    mapX: 478,
    mapY: 728,
    lengthKm: 1.1,
    widthKm: 0.86,
    thicknessM: 95,
    areaKm2: 0.95,
    sizeCategory: 'Bergy Bit',
    velocityMs: 0.14,
    velocityKts: 0.28,
    directionCompass: 'W',
    directionDeg: 275,
    riskLevel: 'LOW',
    collisionProbabilityPct: 2.1,
    routeDistanceKm: 44.2,
    detectionSource: 'Landsat-9 Optical',
    nearestStation: 'Novolazarevskaya Station (60 NM)',
    aiExplanation: 'Fast ice anchoring small fragments along coastal bathymetry, keeping fairway open.',
    modelName: 'Polaris Iceberg Drift v2.4 (Lagrangian + XGBoost)',
    confidencePct: 92,
    oceanCurrentForcingPct: 40,
    windDragForcingPct: 50,
    coriolisForcingPct: 10,
    trajectory: [
      { stage: 'Current Position', hourOffset: 0, lat: -69.20, lng: 16.50, x: 478, y: 728, routeDistanceKm: 44.2, driftVelocityMs: 0.14, windDragMs: 0.11, oceanCurrentVelocityMs: 0.16 },
      { stage: '+24h', hourOffset: 24, lat: -69.18, lng: 15.80, x: 490, y: 760, routeDistanceKm: 46.1, driftVelocityMs: 0.15, windDragMs: 0.12, oceanCurrentVelocityMs: 0.17 },
      { stage: '+48h', hourOffset: 48, lat: -69.15, lng: 15.00, x: 505, y: 790, routeDistanceKm: 48.8, driftVelocityMs: 0.16, windDragMs: 0.13, oceanCurrentVelocityMs: 0.18 },
      { stage: '+72h', hourOffset: 72, lat: -69.10, lng: 14.10, x: 520, y: 820, routeDistanceKm: 52.0, driftVelocityMs: 0.14, windDragMs: 0.11, oceanCurrentVelocityMs: 0.15 },
    ],
  },
  {
    id: 'ib-prydz-giant',
    code: 'IB-PRYDZ-01',
    name: 'Iceberg IB-PRYDZ-01 (Amery Shelf Calving Giant)',
    seaLocation: 'Outer Prydz Bay',
    sizeKm2: 18.5,
    driftSpeedKmh: 1.85,
    riskCategory: 'HIGH RISK',
    themeColor: '#DC2626', // Red
    lat: -67.10,
    lng: 74.80,
    mapX: 568,
    mapY: 765,
    lengthKm: 5.8,
    widthKm: 3.2,
    thicknessM: 260,
    areaKm2: 18.5,
    sizeCategory: 'Giant Tabular',
    velocityMs: 0.51,
    velocityKts: 1.00,
    directionCompass: 'WNW',
    directionDeg: 290,
    riskLevel: 'CRITICAL',
    collisionProbabilityPct: 16.5,
    routeDistanceKm: 14.4,
    detectionSource: 'Sentinel-1 SAR',
    nearestStation: 'Bharati Station (120 NM)',
    aiExplanation: 'Massive tabular slab detached from Amery Ice Shelf advecting west-northwest at 1.0 kts into primary approach corridor.',
    modelName: 'Polaris Iceberg Drift v2.4 (Lagrangian + XGBoost)',
    confidencePct: 95,
    oceanCurrentForcingPct: 60,
    windDragForcingPct: 30,
    coriolisForcingPct: 10,
    trajectory: [
      { stage: 'Current Position', hourOffset: 0, lat: -67.10, lng: 74.80, x: 568, y: 765, routeDistanceKm: 14.4, driftVelocityMs: 0.51, windDragMs: 0.28, oceanCurrentVelocityMs: 0.48 },
      { stage: '+24h', hourOffset: 24, lat: -66.95, lng: 73.60, x: 550, y: 730, routeDistanceKm: 15.8, driftVelocityMs: 0.54, windDragMs: 0.30, oceanCurrentVelocityMs: 0.51 },
      { stage: '+48h', hourOffset: 48, lat: -66.75, lng: 72.20, x: 530, y: 690, routeDistanceKm: 17.5, driftVelocityMs: 0.57, windDragMs: 0.32, oceanCurrentVelocityMs: 0.54 },
      { stage: '+72h', hourOffset: 72, lat: -66.50, lng: 70.80, x: 505, y: 650, routeDistanceKm: 21.0, driftVelocityMs: 0.52, windDragMs: 0.27, oceanCurrentVelocityMs: 0.49 },
    ],
  },
];

export const ICEBERG_TOTAL_COUNT = 37;
export const CRITICAL_ICEBERG_COUNT = 7;
export const DRIFT_MODELS_ACTIVE = 4;
export const DETAILED_ICEBERGS_CATALOG: DetailedIceberg[] = HIGH_PRIORITY_ICEBERGS;
