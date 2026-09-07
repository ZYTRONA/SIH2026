export interface IcebergTrajectoryPoint {
  stage: 'Current Position' | '+24h' | '+48h' | '+72h';
  hourOffset: number;
  lat: number;
  lng: number;
  x: number; // 0-100 chart percentage
  y: number;
  routeDistanceKm: number;
  driftVelocityMs: number;
  windDragMs: number;
  oceanCurrentVelocityMs: number;
}

export interface DetailedIceberg {
  id: string;
  code: string;
  name: string;
  lat: number;
  lng: number;
  x: number;
  y: number;
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
// 32 DETAILED MOCK ICEBERGS (REALISTIC ANTARCTIC COORDINATES)
// ----------------------------------------------------
export const DETAILED_ICEBERGS_CATALOG: DetailedIceberg[] = [
  {
    id: 'ib-023',
    code: 'IB-023',
    name: 'Iceberg IB-023 (Corridor Incursion)',
    lat: -68.52,
    lng: 69.10,
    x: 55,
    y: 46,
    lengthKm: 1.8,
    widthKm: 1.1,
    thicknessM: 240,
    areaKm2: 42.6,
    sizeCategory: 'Giant Tabular',
    velocityMs: 0.42,
    velocityKts: 0.82,
    directionCompass: 'NE',
    directionDeg: 45,
    riskLevel: 'HIGH',
    collisionProbabilityPct: 7.4,
    routeDistanceKm: 12.3,
    detectionSource: 'Sentinel-1 SAR',
    nearestStation: 'Bharati Station (46 NM)',
    aiExplanation: 'Trajectory is primarily influenced by ocean current and surface wind.',
    modelName: 'Physics-based Lagrangian Drift + XGBoost residual correction',
    confidencePct: 86,
    oceanCurrentForcingPct: 58,
    windDragForcingPct: 32,
    coriolisForcingPct: 10,
    trajectory: [
      { stage: 'Current Position', hourOffset: 0, lat: -68.52, lng: 69.10, x: 55.0, y: 46.0, routeDistanceKm: 12.3, driftVelocityMs: 0.42, windDragMs: 0.18, oceanCurrentVelocityMs: 0.35 },
      { stage: '+24h', hourOffset: 24, lat: -68.44, lng: 69.32, x: 56.5, y: 44.8, routeDistanceKm: 9.8, driftVelocityMs: 0.45, windDragMs: 0.22, oceanCurrentVelocityMs: 0.38 },
      { stage: '+48h', hourOffset: 48, lat: -68.35, lng: 69.58, x: 58.2, y: 43.4, routeDistanceKm: 7.2, driftVelocityMs: 0.48, windDragMs: 0.25, oceanCurrentVelocityMs: 0.41 },
      { stage: '+72h', hourOffset: 72, lat: -68.25, lng: 69.85, x: 60.0, y: 42.0, routeDistanceKm: 14.5, driftVelocityMs: 0.40, windDragMs: 0.16, oceanCurrentVelocityMs: 0.32 },
    ],
  },
  {
    id: 'ib-041',
    code: 'IB-041',
    name: 'Iceberg IB-041',
    lat: -67.85,
    lng: 71.40,
    x: 66,
    y: 36,
    lengthKm: 2.4,
    widthKm: 1.4,
    thicknessM: 160,
    areaKm2: 8.2,
    sizeCategory: 'Medium',
    velocityMs: 0.46,
    velocityKts: 0.90,
    directionCompass: 'NW',
    directionDeg: 310,
    riskLevel: 'WARNING',
    collisionProbabilityPct: 4.8,
    routeDistanceKm: 24.1,
    detectionSource: 'Sentinel-1 SAR',
    nearestStation: 'Zhongshan Station (62 NM)',
    aiExplanation: 'Antarctic Coastal Current counter-clockwise gyre pushing drift northwest.',
    modelName: 'Physics-based Lagrangian Drift + XGBoost residual correction',
    confidencePct: 88,
    oceanCurrentForcingPct: 62,
    windDragForcingPct: 28,
    coriolisForcingPct: 10,
    trajectory: [
      { stage: 'Current Position', hourOffset: 0, lat: -67.85, lng: 71.40, x: 66.0, y: 36.0, routeDistanceKm: 24.1, driftVelocityMs: 0.46, windDragMs: 0.14, oceanCurrentVelocityMs: 0.39 },
      { stage: '+24h', hourOffset: 24, lat: -67.76, lng: 71.18, x: 64.5, y: 34.5, routeDistanceKm: 26.8, driftVelocityMs: 0.48, windDragMs: 0.16, oceanCurrentVelocityMs: 0.42 },
      { stage: '+48h', hourOffset: 48, lat: -67.66, lng: 70.92, x: 63.0, y: 33.0, routeDistanceKm: 31.0, driftVelocityMs: 0.51, windDragMs: 0.19, oceanCurrentVelocityMs: 0.45 },
      { stage: '+72h', hourOffset: 72, lat: -67.55, lng: 70.65, x: 61.2, y: 31.2, routeDistanceKm: 38.5, driftVelocityMs: 0.47, windDragMs: 0.15, oceanCurrentVelocityMs: 0.40 },
    ],
  },
  {
    id: 'a-76a-f4',
    code: 'A-76A-F4',
    name: 'A-76A Fragment 04',
    lat: -69.12,
    lng: 63.80,
    x: 36,
    y: 58,
    lengthKm: 9.6,
    widthKm: 4.8,
    thicknessM: 280,
    areaKm2: 84.0,
    sizeCategory: 'Giant Tabular',
    velocityMs: 0.57,
    velocityKts: 1.10,
    directionCompass: 'W',
    directionDeg: 275,
    riskLevel: 'HIGH',
    collisionProbabilityPct: 6.2,
    routeDistanceKm: 35.6,
    detectionSource: 'CryoSat-2',
    nearestStation: 'Mawson Station (78 NM)',
    aiExplanation: 'Deep keel hydrodynamic drag interacting with continental shelf slope.',
    modelName: 'Physics-based Lagrangian Drift + XGBoost residual correction',
    confidencePct: 91,
    oceanCurrentForcingPct: 74,
    windDragForcingPct: 18,
    coriolisForcingPct: 8,
    trajectory: [
      { stage: 'Current Position', hourOffset: 0, lat: -69.12, lng: 63.80, x: 36.0, y: 58.0, routeDistanceKm: 35.6, driftVelocityMs: 0.57, windDragMs: 0.11, oceanCurrentVelocityMs: 0.52 },
      { stage: '+24h', hourOffset: 24, lat: -69.10, lng: 63.25, x: 34.2, y: 58.2, routeDistanceKm: 42.0, driftVelocityMs: 0.59, windDragMs: 0.13, oceanCurrentVelocityMs: 0.55 },
      { stage: '+48h', hourOffset: 48, lat: -69.08, lng: 62.68, x: 32.4, y: 58.5, routeDistanceKm: 49.5, driftVelocityMs: 0.62, windDragMs: 0.15, oceanCurrentVelocityMs: 0.58 },
      { stage: '+72h', hourOffset: 72, lat: -69.05, lng: 62.10, x: 30.5, y: 58.8, routeDistanceKm: 58.0, driftVelocityMs: 0.58, windDragMs: 0.12, oceanCurrentVelocityMs: 0.54 },
    ],
  },
  {
    id: 'ib-089',
    code: 'IB-089',
    name: 'Bergy Cluster 089',
    lat: -69.25,
    lng: 74.30,
    x: 68,
    y: 66,
    lengthKm: 0.45,
    widthKm: 0.28,
    thicknessM: 65,
    areaKm2: 1.4,
    sizeCategory: 'Bergy Bit',
    velocityMs: 0.26,
    velocityKts: 0.50,
    directionCompass: 'WSW',
    directionDeg: 260,
    riskLevel: 'WARNING',
    collisionProbabilityPct: 8.9,
    routeDistanceKm: 9.4,
    detectionSource: 'Shipboard Radar',
    nearestStation: 'Bharati Station (14 NM)',
    aiExplanation: 'Surface wind and tidal oscillations dominating small bergy bit drift velocity.',
    modelName: 'Physics-based Lagrangian Drift + XGBoost residual correction',
    confidencePct: 84,
    oceanCurrentForcingPct: 40,
    windDragForcingPct: 50,
    coriolisForcingPct: 10,
    trajectory: [
      { stage: 'Current Position', hourOffset: 0, lat: -69.25, lng: 74.30, x: 68.0, y: 66.0, routeDistanceKm: 9.4, driftVelocityMs: 0.26, windDragMs: 0.24, oceanCurrentVelocityMs: 0.18 },
      { stage: '+24h', hourOffset: 24, lat: -69.28, lng: 73.85, x: 66.8, y: 66.6, routeDistanceKm: 8.1, driftVelocityMs: 0.28, windDragMs: 0.26, oceanCurrentVelocityMs: 0.20 },
      { stage: '+48h', hourOffset: 48, lat: -69.31, lng: 73.38, x: 65.5, y: 67.2, routeDistanceKm: 7.5, driftVelocityMs: 0.31, windDragMs: 0.29, oceanCurrentVelocityMs: 0.22 },
      { stage: '+72h', hourOffset: 72, lat: -69.34, lng: 72.90, x: 64.1, y: 67.8, routeDistanceKm: 11.2, driftVelocityMs: 0.25, windDragMs: 0.21, oceanCurrentVelocityMs: 0.16 },
    ],
  },
  {
    id: 'ib-118',
    code: 'IB-118',
    name: 'Iceberg IB-118 (Larsemann Incursion)',
    lat: -68.90,
    lng: 72.80,
    x: 62,
    y: 56,
    lengthKm: 2.1,
    widthKm: 1.3,
    thicknessM: 190,
    areaKm2: 12.4,
    sizeCategory: 'Medium',
    velocityMs: 0.62,
    velocityKts: 1.20,
    directionCompass: 'NW',
    directionDeg: 305,
    riskLevel: 'CRITICAL',
    collisionProbabilityPct: 14.2,
    routeDistanceKm: 5.8,
    detectionSource: 'Sentinel-1 SAR',
    nearestStation: 'Zhongshan Station (22 NM)',
    aiExplanation: 'Strong katabatic storm outflow accelerating drift directly across Corridor Bravo.',
    modelName: 'Physics-based Lagrangian Drift + XGBoost residual correction',
    confidencePct: 89,
    oceanCurrentForcingPct: 48,
    windDragForcingPct: 44,
    coriolisForcingPct: 8,
    trajectory: [
      { stage: 'Current Position', hourOffset: 0, lat: -68.90, lng: 72.80, x: 62.0, y: 56.0, routeDistanceKm: 5.8, driftVelocityMs: 0.62, windDragMs: 0.38, oceanCurrentVelocityMs: 0.44 },
      { stage: '+24h', hourOffset: 24, lat: -68.78, lng: 72.35, x: 60.5, y: 54.2, routeDistanceKm: 4.1, driftVelocityMs: 0.66, windDragMs: 0.42, oceanCurrentVelocityMs: 0.48 },
      { stage: '+48h', hourOffset: 48, lat: -68.65, lng: 71.88, x: 58.8, y: 52.4, routeDistanceKm: 3.2, driftVelocityMs: 0.70, windDragMs: 0.46, oceanCurrentVelocityMs: 0.52 },
      { stage: '+72h', hourOffset: 72, lat: -68.52, lng: 71.40, x: 57.0, y: 50.5, routeDistanceKm: 6.8, driftVelocityMs: 0.58, windDragMs: 0.32, oceanCurrentVelocityMs: 0.40 },
    ],
  },
  {
    id: 'ib-150',
    code: 'IB-150',
    name: 'Growler Swarm 150',
    lat: -68.10,
    lng: 66.40,
    x: 44,
    y: 38,
    lengthKm: 0.12,
    widthKm: 0.08,
    thicknessM: 40,
    areaKm2: 0.8,
    sizeCategory: 'Growler',
    velocityMs: 0.51,
    velocityKts: 1.00,
    directionCompass: 'WNW',
    directionDeg: 300,
    riskLevel: 'WARNING',
    collisionProbabilityPct: 9.1,
    routeDistanceKm: 3.8,
    detectionSource: 'Shipboard Radar',
    nearestStation: 'Prydz Bay Lead (12 NM)',
    aiExplanation: 'Low freeboard growlers partially submerged, posing radar detection clutter.',
    modelName: 'Physics-based Lagrangian Drift + XGBoost residual correction',
    confidencePct: 82,
    oceanCurrentForcingPct: 45,
    windDragForcingPct: 45,
    coriolisForcingPct: 10,
    trajectory: [
      { stage: 'Current Position', hourOffset: 0, lat: -68.10, lng: 66.40, x: 44.0, y: 38.0, routeDistanceKm: 3.8, driftVelocityMs: 0.51, windDragMs: 0.30, oceanCurrentVelocityMs: 0.35 },
      { stage: '+24h', hourOffset: 24, lat: -68.02, lng: 65.95, x: 42.6, y: 36.8, routeDistanceKm: 4.5, driftVelocityMs: 0.54, windDragMs: 0.33, oceanCurrentVelocityMs: 0.38 },
      { stage: '+48h', hourOffset: 48, lat: -67.93, lng: 65.48, x: 41.1, y: 35.5, routeDistanceKm: 6.2, driftVelocityMs: 0.57, windDragMs: 0.36, oceanCurrentVelocityMs: 0.41 },
      { stage: '+72h', hourOffset: 72, lat: -67.84, lng: 65.00, x: 39.5, y: 34.2, routeDistanceKm: 12.0, driftVelocityMs: 0.48, windDragMs: 0.26, oceanCurrentVelocityMs: 0.33 },
    ],
  },
  // Additional 26 mock icebergs to reach 32+ objects
  ...Array.from({ length: 26 }).map((_, i): DetailedIceberg => {
    const num = i + 101;
    const lats = [-66.3, -67.1, -71.4, -65.8, -67.4, -70.1, -69.8, -66.9, -68.7, -69.5, -67.6, -68.3, -69.0, -70.6, -65.2, -66.8, -69.3, -71.0, -68.0, -67.2, -68.8, -70.4, -66.5, -69.7, -71.2, -67.9];
    const lngs = [60.5, 64.2, 58.0, 70.2, 76.5, 70.8, 78.4, 73.0, 61.2, 75.8, 58.5, 78.9, 68.4, 65.0, 66.0, 75.2, 62.1, 74.5, 63.5, 77.1, 70.0, 68.8, 62.8, 72.4, 59.5, 74.8];
    const sizes: DetailedIceberg['sizeCategory'][] = ['Giant Tabular', 'Medium', 'Bergy Bit', 'Growler'];
    const risks: DetailedIceberg['riskLevel'][] = ['LOW', 'SAFE', 'MODERATE', 'WARNING', 'LOW', 'SAFE'];
    const compasses: DetailedIceberg['directionCompass'][] = ['NW', 'W', 'WSW', 'NNE', 'NE', 'WNW'];

    const chosenLat = lats[i % lats.length];
    const chosenLng = lngs[i % lngs.length];
    const chosenRisk = risks[i % risks.length];
    const sizeCat = sizes[i % sizes.length];
    const distKm = Math.round(15 + (i * 3.7));

    return {
      id: `ib-${num}`,
      code: `IB-${num}`,
      name: `Iceberg IB-${num}`,
      lat: chosenLat,
      lng: chosenLng,
      x: 20 + ((i * 2.3) % 65),
      y: 15 + ((i * 2.7) % 70),
      lengthKm: Number((0.3 + (i * 0.15)).toFixed(2)),
      widthKm: Number((0.2 + (i * 0.08)).toFixed(2)),
      thicknessM: 80 + (i * 7),
      areaKm2: Number((0.5 + (i * 1.8)).toFixed(1)),
      sizeCategory: sizeCat,
      velocityMs: Number((0.25 + ((i % 5) * 0.08)).toFixed(2)),
      velocityKts: Number((0.5 + ((i % 5) * 0.15)).toFixed(2)),
      directionCompass: compasses[i % compasses.length],
      directionDeg: (260 + (i * 12)) % 360,
      riskLevel: chosenRisk,
      collisionProbabilityPct: Number((1.2 + ((i % 4) * 1.8)).toFixed(1)),
      routeDistanceKm: distKm,
      detectionSource: (i % 2 === 0 ? 'Sentinel-1 SAR' : 'Landsat-9 Optical') as DetailedIceberg['detectionSource'],
      nearestStation: 'Prydz Bay Sector Base',
      aiExplanation: 'Hydrodynamic flow deflection along the Antarctic Divergence boundary layer.',
      modelName: 'Physics-based Lagrangian Drift + XGBoost residual correction',
      confidencePct: 85 + (i % 8),
      oceanCurrentForcingPct: 55,
      windDragForcingPct: 35,
      coriolisForcingPct: 10,
      trajectory: [
        { stage: 'Current Position' as const, hourOffset: 0, lat: chosenLat, lng: chosenLng, x: 20 + ((i * 2.3) % 65), y: 15 + ((i * 2.7) % 70), routeDistanceKm: distKm, driftVelocityMs: 0.35, windDragMs: 0.15, oceanCurrentVelocityMs: 0.28 },
        { stage: '+24h' as const, hourOffset: 24, lat: chosenLat + 0.1, lng: chosenLng - 0.4, x: 19 + ((i * 2.3) % 65), y: 14 + ((i * 2.7) % 70), routeDistanceKm: distKm + 4, driftVelocityMs: 0.38, windDragMs: 0.18, oceanCurrentVelocityMs: 0.30 },
        { stage: '+48h' as const, hourOffset: 48, lat: chosenLat + 0.2, lng: chosenLng - 0.8, x: 18 + ((i * 2.3) % 65), y: 13 + ((i * 2.7) % 70), routeDistanceKm: distKm + 8, driftVelocityMs: 0.41, windDragMs: 0.21, oceanCurrentVelocityMs: 0.33 },
        { stage: '+72h' as const, hourOffset: 72, lat: chosenLat + 0.3, lng: chosenLng - 1.2, x: 17 + ((i * 2.3) % 65), y: 12 + ((i * 2.7) % 70), routeDistanceKm: distKm + 14, driftVelocityMs: 0.36, windDragMs: 0.16, oceanCurrentVelocityMs: 0.29 },
      ],
    };
  }),
];
