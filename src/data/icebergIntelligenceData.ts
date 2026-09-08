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
// 7 HIGH-PRIORITY ICEBERGS AS DISPLAYED IN THE UI MOCKUP
// ----------------------------------------------------
export const HIGH_PRIORITY_ICEBERGS: DetailedIceberg[] = [
  {
    id: 'ib-023',
    code: 'IB-023',
    name: 'Iceberg IB-023 (Amundsen Gateway)',
    seaLocation: 'Amundsen Sea',
    sizeKm2: 2.84,
    driftSpeedKmh: 1.32,
    riskCategory: 'HIGH RISK',
    themeColor: '#DC2626', // Red
    lat: -71.20,
    lng: -115.40,
    mapX: 430,
    mapY: 325,
    lengthKm: 2.2,
    widthKm: 1.3,
    thicknessM: 240,
    areaKm2: 2.84,
    sizeCategory: 'Giant Tabular',
    velocityMs: 0.37,
    velocityKts: 0.71,
    directionCompass: 'NE',
    directionDeg: 42,
    riskLevel: 'CRITICAL',
    collisionProbabilityPct: 18.4,
    routeDistanceKm: 6.2,
    detectionSource: 'Sentinel-1 SAR',
    nearestStation: 'Amundsen-Scott / Pine Island Base (42 NM)',
    aiExplanation: 'Lagrangian hydrodynamic model indicates rapid northward advection propelled by Antarctic Circumpolar Current divergence and 35 kt southwesterly katabatic squall.',
    modelName: 'Polaris Iceberg Drift v2.4 (Lagrangian + XGBoost)',
    confidencePct: 94,
    oceanCurrentForcingPct: 56,
    windDragForcingPct: 34,
    coriolisForcingPct: 10,
    trajectory: [
      { stage: 'Current Position', hourOffset: 0, lat: -71.20, lng: -115.40, x: 430, y: 325, routeDistanceKm: 6.2, driftVelocityMs: 0.37, windDragMs: 0.18, oceanCurrentVelocityMs: 0.35 },
      { stage: '+24h', hourOffset: 24, lat: -70.85, lng: -114.20, x: 450, y: 310, routeDistanceKm: 4.5, driftVelocityMs: 0.41, windDragMs: 0.22, oceanCurrentVelocityMs: 0.38 },
      { stage: '+48h', hourOffset: 48, lat: -70.40, lng: -112.80, x: 480, y: 298, routeDistanceKm: 3.1, driftVelocityMs: 0.44, windDragMs: 0.25, oceanCurrentVelocityMs: 0.41 },
      { stage: '+72h', hourOffset: 72, lat: -69.90, lng: -111.10, x: 510, y: 290, routeDistanceKm: 7.8, driftVelocityMs: 0.39, windDragMs: 0.16, oceanCurrentVelocityMs: 0.32 },
    ],
  },
  {
    id: 'ib-041',
    code: 'IB-041',
    name: 'Iceberg IB-041 (Weddell Gyre)',
    seaLocation: 'Weddell Sea',
    sizeKm2: 1.67,
    driftSpeedKmh: 0.98,
    riskCategory: 'HIGH RISK',
    themeColor: '#EA580C', // Orange
    lat: -69.40,
    lng: -45.20,
    mapX: 510,
    mapY: 290,
    lengthKm: 1.8,
    widthKm: 0.95,
    thicknessM: 190,
    areaKm2: 1.67,
    sizeCategory: 'Medium',
    velocityMs: 0.27,
    velocityKts: 0.53,
    directionCompass: 'ENE',
    directionDeg: 68,
    riskLevel: 'HIGH',
    collisionProbabilityPct: 14.8,
    routeDistanceKm: 8.9,
    detectionSource: 'Sentinel-1 SAR',
    nearestStation: 'Halley VI Research Station (58 NM)',
    aiExplanation: 'Clockwise Weddell Gyre circulation pushing tabular berg east-northeast directly across deep-water transit waypoint Alpha-4.',
    modelName: 'Polaris Iceberg Drift v2.4 (Lagrangian + XGBoost)',
    confidencePct: 91,
    oceanCurrentForcingPct: 62,
    windDragForcingPct: 28,
    coriolisForcingPct: 10,
    trajectory: [
      { stage: 'Current Position', hourOffset: 0, lat: -69.40, lng: -45.20, x: 510, y: 290, routeDistanceKm: 8.9, driftVelocityMs: 0.27, windDragMs: 0.14, oceanCurrentVelocityMs: 0.29 },
      { stage: '+24h', hourOffset: 24, lat: -69.10, lng: -43.60, x: 540, y: 285, routeDistanceKm: 7.2, driftVelocityMs: 0.30, windDragMs: 0.16, oceanCurrentVelocityMs: 0.32 },
      { stage: '+48h', hourOffset: 48, lat: -68.75, lng: -41.80, x: 575, y: 282, routeDistanceKm: 6.4, driftVelocityMs: 0.33, windDragMs: 0.19, oceanCurrentVelocityMs: 0.35 },
      { stage: '+72h', hourOffset: 72, lat: -68.30, lng: -39.90, x: 610, y: 288, routeDistanceKm: 11.0, driftVelocityMs: 0.29, windDragMs: 0.15, oceanCurrentVelocityMs: 0.30 },
    ],
  },
  {
    id: 'ib-017',
    code: 'IB-017',
    name: 'Iceberg IB-017 (Ross Bank Incursion)',
    seaLocation: 'Ross Sea',
    sizeKm2: 0.92,
    driftSpeedKmh: 0.71,
    riskCategory: 'ELEVATED',
    themeColor: '#EAB308', // Yellow/Gold
    lat: -74.80,
    lng: 175.20,
    mapX: 636,
    mapY: 300,
    lengthKm: 1.3,
    widthKm: 0.71,
    thicknessM: 140,
    areaKm2: 0.92,
    sizeCategory: 'Medium',
    velocityMs: 0.20,
    velocityKts: 0.38,
    directionCompass: 'SE',
    directionDeg: 135,
    riskLevel: 'WARNING',
    collisionProbabilityPct: 8.2,
    routeDistanceKm: 14.7,
    detectionSource: 'Landsat-9 Optical',
    nearestStation: 'McMurdo Station (82 NM)',
    aiExplanation: 'Tidal currents and bathymetric steering near Ross Bank creating localized oscillatory drift pattern.',
    modelName: 'Polaris Iceberg Drift v2.4 (Lagrangian + XGBoost)',
    confidencePct: 88,
    oceanCurrentForcingPct: 68,
    windDragForcingPct: 22,
    coriolisForcingPct: 10,
    trajectory: [
      { stage: 'Current Position', hourOffset: 0, lat: -74.80, lng: 175.20, x: 636, y: 300, routeDistanceKm: 14.7, driftVelocityMs: 0.20, windDragMs: 0.11, oceanCurrentVelocityMs: 0.24 },
      { stage: '+24h', hourOffset: 24, lat: -74.95, lng: 176.10, x: 655, y: 330, routeDistanceKm: 16.2, driftVelocityMs: 0.22, windDragMs: 0.13, oceanCurrentVelocityMs: 0.26 },
      { stage: '+48h', hourOffset: 48, lat: -75.12, lng: 177.30, x: 672, y: 365, routeDistanceKm: 18.5, driftVelocityMs: 0.24, windDragMs: 0.15, oceanCurrentVelocityMs: 0.28 },
      { stage: '+72h', hourOffset: 72, lat: -75.30, lng: 178.60, x: 688, y: 405, routeDistanceKm: 22.0, driftVelocityMs: 0.21, windDragMs: 0.12, oceanCurrentVelocityMs: 0.25 },
    ],
  },
  {
    id: 'ib-055',
    code: 'IB-055',
    name: 'Iceberg IB-055 (Scotia Arc Drift)',
    seaLocation: 'Scotia Sea',
    sizeKm2: 0.68,
    driftSpeedKmh: 0.53,
    riskCategory: 'MODERATE',
    themeColor: '#10B981', // Emerald Green
    lat: -58.60,
    lng: -42.10,
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
    nearestStation: 'Signy Research Base (64 NM)',
    aiExplanation: 'Deep Drake Passage outflow channel steering drift southeastward into open sub-Antarctic waters.',
    modelName: 'Polaris Iceberg Drift v2.4 (Lagrangian + XGBoost)',
    confidencePct: 86,
    oceanCurrentForcingPct: 75,
    windDragForcingPct: 18,
    coriolisForcingPct: 7,
    trajectory: [
      { stage: 'Current Position', hourOffset: 0, lat: -58.60, lng: -42.10, x: 704, y: 512, routeDistanceKm: 22.4, driftVelocityMs: 0.15, windDragMs: 0.08, oceanCurrentVelocityMs: 0.18 },
      { stage: '+24h', hourOffset: 24, lat: -59.10, lng: -41.40, x: 695, y: 560, routeDistanceKm: 24.1, driftVelocityMs: 0.17, windDragMs: 0.10, oceanCurrentVelocityMs: 0.20 },
      { stage: '+48h', hourOffset: 48, lat: -59.65, lng: -40.60, x: 678, y: 610, routeDistanceKm: 27.0, driftVelocityMs: 0.19, windDragMs: 0.12, oceanCurrentVelocityMs: 0.22 },
      { stage: '+72h', hourOffset: 72, lat: -60.20, lng: -39.70, x: 655, y: 660, routeDistanceKm: 32.5, driftVelocityMs: 0.16, windDragMs: 0.09, oceanCurrentVelocityMs: 0.19 },
    ],
  },
  {
    id: 'ib-009',
    code: 'IB-009',
    name: 'Iceberg IB-009 (Bellingshausen Marginal)',
    seaLocation: 'Bellingshausen Sea',
    sizeKm2: 0.45,
    driftSpeedKmh: 0.38,
    riskCategory: 'MODERATE',
    themeColor: '#10B981', // Emerald Green
    lat: -70.80,
    lng: -88.50,
    mapX: 406,
    mapY: 642,
    lengthKm: 0.85,
    widthKm: 0.53,
    thicknessM: 85,
    areaKm2: 0.45,
    sizeCategory: 'Bergy Bit',
    velocityMs: 0.11,
    velocityKts: 0.21,
    directionCompass: 'NNW',
    directionDeg: 335,
    riskLevel: 'MODERATE',
    collisionProbabilityPct: 4.1,
    routeDistanceKm: 28.6,
    detectionSource: 'Sentinel-1 SAR',
    nearestStation: 'Rothera Research Station (94 NM)',
    aiExplanation: 'Moderate pack ice damping and calm surface winds constraining daily drift radius to under 9 km.',
    modelName: 'Polaris Iceberg Drift v2.4 (Lagrangian + XGBoost)',
    confidencePct: 89,
    oceanCurrentForcingPct: 44,
    windDragForcingPct: 46,
    coriolisForcingPct: 10,
    trajectory: [
      { stage: 'Current Position', hourOffset: 0, lat: -70.80, lng: -88.50, x: 406, y: 642, routeDistanceKm: 28.6, driftVelocityMs: 0.11, windDragMs: 0.10, oceanCurrentVelocityMs: 0.12 },
      { stage: '+24h', hourOffset: 24, lat: -70.50, lng: -89.10, x: 395, y: 590, routeDistanceKm: 29.8, driftVelocityMs: 0.12, windDragMs: 0.11, oceanCurrentVelocityMs: 0.13 },
      { stage: '+48h', hourOffset: 48, lat: -70.18, lng: -89.80, x: 385, y: 535, routeDistanceKm: 33.2, driftVelocityMs: 0.13, windDragMs: 0.12, oceanCurrentVelocityMs: 0.14 },
      { stage: '+72h', hourOffset: 72, lat: -69.80, lng: -90.60, x: 380, y: 475, routeDistanceKm: 37.0, driftVelocityMs: 0.11, windDragMs: 0.09, oceanCurrentVelocityMs: 0.12 },
    ],
  },
  {
    id: 'ib-037',
    code: 'IB-037',
    name: 'Iceberg IB-037 (Davis Coastal Shelf)',
    seaLocation: 'Davis Sea',
    sizeKm2: 0.33,
    driftSpeedKmh: 0.29,
    riskCategory: 'LOW',
    themeColor: '#0284C7', // Blue
    lat: -66.10,
    lng: 92.40,
    mapX: 478,
    mapY: 728,
    lengthKm: 0.72,
    widthKm: 0.46,
    thicknessM: 70,
    areaKm2: 0.33,
    sizeCategory: 'Bergy Bit',
    velocityMs: 0.08,
    velocityKts: 0.16,
    directionCompass: 'W',
    directionDeg: 270,
    riskLevel: 'LOW',
    collisionProbabilityPct: 1.8,
    routeDistanceKm: 42.1,
    detectionSource: 'CryoSat-2',
    nearestStation: 'Davis Station (48 NM)',
    aiExplanation: 'Grounded keel interaction with West Ice Shelf moraine causing near-stationary holding position.',
    modelName: 'Polaris Iceberg Drift v2.4 (Lagrangian + XGBoost)',
    confidencePct: 92,
    oceanCurrentForcingPct: 80,
    windDragForcingPct: 12,
    coriolisForcingPct: 8,
    trajectory: [
      { stage: 'Current Position', hourOffset: 0, lat: -66.10, lng: 92.40, x: 478, y: 728, routeDistanceKm: 42.1, driftVelocityMs: 0.08, windDragMs: 0.05, oceanCurrentVelocityMs: 0.10 },
      { stage: '+24h', hourOffset: 24, lat: -66.12, lng: 91.90, x: 460, y: 720, routeDistanceKm: 43.5, driftVelocityMs: 0.09, windDragMs: 0.06, oceanCurrentVelocityMs: 0.11 },
      { stage: '+48h', hourOffset: 48, lat: -66.14, lng: 91.35, x: 440, y: 705, routeDistanceKm: 46.0, driftVelocityMs: 0.10, windDragMs: 0.07, oceanCurrentVelocityMs: 0.12 },
      { stage: '+72h', hourOffset: 72, lat: -66.16, lng: 90.75, x: 420, y: 680, routeDistanceKm: 51.2, driftVelocityMs: 0.08, windDragMs: 0.05, oceanCurrentVelocityMs: 0.09 },
    ],
  },
  {
    id: 'ib-062',
    code: 'IB-062',
    name: 'Iceberg IB-062 (Lazarev Divergence)',
    seaLocation: 'Lazarev Sea',
    sizeKm2: 0.21,
    driftSpeedKmh: 0.18,
    riskCategory: 'LOW',
    themeColor: '#0284C7', // Blue
    lat: -69.20,
    lng: 12.80,
    mapX: 568,
    mapY: 765,
    lengthKm: 0.58,
    widthKm: 0.36,
    thicknessM: 55,
    areaKm2: 0.21,
    sizeCategory: 'Growler',
    velocityMs: 0.05,
    velocityKts: 0.10,
    directionCompass: 'SW',
    directionDeg: 220,
    riskLevel: 'SAFE',
    collisionProbabilityPct: 0.6,
    routeDistanceKm: 68.4,
    detectionSource: 'Shipboard Radar',
    nearestStation: 'Novolazarevskaya Station (35 NM)',
    aiExplanation: 'Trapped inside thick fast-ice matrix along Queen Maud Land coastline; zero threat to primary shipping lane.',
    modelName: 'Polaris Iceberg Drift v2.4 (Lagrangian + XGBoost)',
    confidencePct: 95,
    oceanCurrentForcingPct: 50,
    windDragForcingPct: 40,
    coriolisForcingPct: 10,
    trajectory: [
      { stage: 'Current Position', hourOffset: 0, lat: -69.20, lng: 12.80, x: 568, y: 765, routeDistanceKm: 68.4, driftVelocityMs: 0.05, windDragMs: 0.04, oceanCurrentVelocityMs: 0.06 },
      { stage: '+24h', hourOffset: 24, lat: -69.25, lng: 12.40, x: 552, y: 760, routeDistanceKm: 69.8, driftVelocityMs: 0.05, windDragMs: 0.04, oceanCurrentVelocityMs: 0.06 },
      { stage: '+48h', hourOffset: 48, lat: -69.30, lng: 11.95, x: 535, y: 750, routeDistanceKm: 72.1, driftVelocityMs: 0.06, windDragMs: 0.05, oceanCurrentVelocityMs: 0.07 },
      { stage: '+72h', hourOffset: 72, lat: -69.35, lng: 11.45, x: 515, y: 740, routeDistanceKm: 76.5, driftVelocityMs: 0.05, windDragMs: 0.04, oceanCurrentVelocityMs: 0.05 },
    ],
  },
];

// ----------------------------------------------------
// FULL 37 ACTIVE ICEBERGS CATALOG
// ----------------------------------------------------
export const DETAILED_ICEBERGS_CATALOG: DetailedIceberg[] = [
  ...HIGH_PRIORITY_ICEBERGS,
  // 30 additional icebergs for full 37 active items
  ...Array.from({ length: 30 }).map((_, i): DetailedIceberg => {
    const num = i + 101;
    const lats = [-66.3, -67.1, -71.4, -65.8, -67.4, -70.1, -69.8, -66.9, -68.7, -69.5, -67.6, -68.3, -69.0, -70.6, -65.2, -66.8, -69.3, -71.0, -68.0, -67.2, -68.8, -70.4, -66.5, -69.7, -71.2, -67.9, -68.4, -69.6, -70.8, -66.2];
    const lngs = [60.5, 64.2, 58.0, 70.2, 76.5, 70.8, 78.4, 73.0, 61.2, 75.8, 58.5, 78.9, 68.4, 65.0, 66.0, 75.2, 62.1, 74.5, 63.5, 77.1, 70.0, 68.8, 62.8, 72.4, 59.5, 74.8, 67.2, 73.4, 61.8, 76.0];
    const seas = ['Weddell Sea', 'Ross Sea', 'Amundsen Sea', 'Davis Sea', 'Scotia Sea', 'Bellingshausen Sea', 'Lazarev Sea', 'Prydz Bay', 'Cosmonaut Sea', 'Riiser-Larsen Sea'];
    const sizes: DetailedIceberg['sizeCategory'][] = ['Giant Tabular', 'Medium', 'Bergy Bit', 'Growler'];
    const risks: DetailedIceberg['riskLevel'][] = ['LOW', 'SAFE', 'MODERATE', 'WARNING', 'LOW', 'SAFE'];
    const categories: DetailedIceberg['riskCategory'][] = ['LOW', 'MODERATE', 'ELEVATED', 'LOW', 'LOW'];

    const chosenLat = lats[i % lats.length];
    const chosenLng = lngs[i % lngs.length];
    const chosenRisk = risks[i % risks.length];
    const chosenCategory = categories[i % categories.length];
    const chosenSea = seas[i % seas.length];
    const sizeCat = sizes[i % sizes.length];
    const distKm = Math.round(15 + (i * 3.7));
    const sizeKm2 = Number((0.18 + (i * 0.12)).toFixed(2));
    const speedKmh = Number((0.22 + (i * 0.04)).toFixed(2));

    const mapX = 300 + ((i * 37) % 400);
    const mapY = 300 + ((i * 41) % 400);

    return {
      id: `ib-${num}`,
      code: `IB-${num}`,
      name: `Iceberg IB-${num} (${chosenSea})`,
      seaLocation: chosenSea,
      sizeKm2,
      driftSpeedKmh: speedKmh,
      riskCategory: chosenCategory,
      themeColor: chosenCategory === 'HIGH RISK' ? '#DC2626' : chosenCategory === 'ELEVATED' ? '#EAB308' : chosenCategory === 'MODERATE' ? '#10B981' : '#0284C7',
      lat: chosenLat,
      lng: chosenLng,
      mapX,
      mapY,
      lengthKm: Number((0.3 + (i * 0.15)).toFixed(2)),
      widthKm: Number((0.2 + (i * 0.08)).toFixed(2)),
      thicknessM: 80 + (i * 7),
      areaKm2: sizeKm2,
      sizeCategory: sizeCat,
      velocityMs: Number((speedKmh / 3.6).toFixed(2)),
      velocityKts: Number((speedKmh * 0.539957).toFixed(2)),
      directionCompass: 'NW',
      directionDeg: (260 + (i * 12)) % 360,
      riskLevel: chosenRisk,
      collisionProbabilityPct: Number((1.2 + ((i % 4) * 1.8)).toFixed(1)),
      routeDistanceKm: distKm,
      detectionSource: (i % 2 === 0 ? 'Sentinel-1 SAR' : 'Landsat-9 Optical') as DetailedIceberg['detectionSource'],
      nearestStation: 'Prydz Bay Sector Base',
      aiExplanation: 'Lagrangian drift modeled along Antarctic Divergence boundary layer.',
      modelName: 'Polaris Iceberg Drift v2.4 (Lagrangian + XGBoost)',
      confidencePct: 85 + (i % 8),
      oceanCurrentForcingPct: 55,
      windDragForcingPct: 35,
      coriolisForcingPct: 10,
      trajectory: [
        { stage: 'Current Position' as const, hourOffset: 0, lat: chosenLat, lng: chosenLng, x: mapX, y: mapY, routeDistanceKm: distKm, driftVelocityMs: 0.35, windDragMs: 0.15, oceanCurrentVelocityMs: 0.28 },
        { stage: '+24h' as const, hourOffset: 24, lat: chosenLat + 0.1, lng: chosenLng - 0.4, x: mapX + 15, y: mapY - 10, routeDistanceKm: distKm + 4, driftVelocityMs: 0.38, windDragMs: 0.18, oceanCurrentVelocityMs: 0.30 },
        { stage: '+48h' as const, hourOffset: 48, lat: chosenLat + 0.2, lng: chosenLng - 0.8, x: mapX + 30, y: mapY - 20, routeDistanceKm: distKm + 8, driftVelocityMs: 0.41, windDragMs: 0.21, oceanCurrentVelocityMs: 0.33 },
        { stage: '+72h' as const, hourOffset: 72, lat: chosenLat + 0.3, lng: chosenLng - 1.2, x: mapX + 45, y: mapY - 30, routeDistanceKm: distKm + 14, driftVelocityMs: 0.36, windDragMs: 0.16, oceanCurrentVelocityMs: 0.29 },
      ],
    };
  }),
];
