export type ForecastHorizonKey = 'Current' | '+24h' | '+48h' | '+72h' | '+7 Days';

export interface SeaIceHorizonSummary {
  horizon: ForecastHorizonKey;
  avgConcentrationPct: number;
  easternApproachPct: number;
  amerySectorPct: number;
  outerDriftPct: number;
  confidencePct: number;
  expansionRatePctPerDay: number;
  estimatedMeanThicknessM: number;
  insight: string;
}

export interface SeaIceChartPoint {
  timeLabel: string;
  hourOffset: number;
  sicPredicted: number; // Mean predicted %
  sicLower: number; // 5% lower uncertainty bound %
  sicUpper: number; // 95% upper uncertainty bound %
  uncertaintyBand: [number, number]; // [lower, upper] for area chart
  thicknessM: number;
  driftVelocityKts: number;
}

export const SEA_ICE_SUMMARIES: Record<ForecastHorizonKey, SeaIceHorizonSummary> = {
  Current: {
    horizon: 'Current',
    avgConcentrationPct: 67,
    easternApproachPct: 64,
    amerySectorPct: 82,
    outerDriftPct: 22,
    confidencePct: 94,
    expansionRatePctPerDay: 2.8,
    estimatedMeanThicknessM: 1.15,
    insight: 'Current baseline concentration observed across Labrador Sea and Flemish Pass sectors.',
  },
  '+24h': {
    horizon: '+24h',
    avgConcentrationPct: 70,
    easternApproachPct: 69,
    amerySectorPct: 85,
    outerDriftPct: 26,
    confidencePct: 92,
    expansionRatePctPerDay: 3.1,
    estimatedMeanThicknessM: 1.22,
    insight: 'Northwesterly wind event driving offshore pack convergence into shipping corridor Bravo.',
  },
  '+48h': {
    horizon: '+48h',
    avgConcentrationPct: 74,
    easternApproachPct: 75,
    amerySectorPct: 88,
    outerDriftPct: 30,
    confidencePct: 89,
    expansionRatePctPerDay: 3.4,
    estimatedMeanThicknessM: 1.31,
    insight: 'Model predicts increasing sea-ice concentration along the eastern approach during the next 48 hours.',
  },
  '+72h': {
    horizon: '+72h',
    avgConcentrationPct: 76,
    easternApproachPct: 78,
    amerySectorPct: 91,
    outerDriftPct: 34,
    confidencePct: 86,
    expansionRatePctPerDay: 2.2,
    estimatedMeanThicknessM: 1.38,
    insight: 'Consolidated first-year pack reaching maximum weekly extent before temperature moderation.',
  },
  '+7 Days': {
    horizon: '+7 Days',
    avgConcentrationPct: 82,
    easternApproachPct: 84,
    amerySectorPct: 94,
    outerDriftPct: 40,
    confidencePct: 78,
    expansionRatePctPerDay: 1.5,
    estimatedMeanThicknessM: 1.55,
    insight: 'Long-range ensemble suggests stable coastal fast-ice expansion along Newfoundland Coast.',
  },
};

export const SEA_ICE_CHART_DATA: SeaIceChartPoint[] = [
  { timeLabel: 'T+00h (Now)', hourOffset: 0, sicPredicted: 67, sicLower: 65, sicUpper: 69, uncertaintyBand: [65, 69], thicknessM: 1.15, driftVelocityKts: 0.8 },
  { timeLabel: 'T+12h', hourOffset: 12, sicPredicted: 68.5, sicLower: 66, sicUpper: 71, uncertaintyBand: [66, 71], thicknessM: 1.18, driftVelocityKts: 0.9 },
  { timeLabel: 'T+24h', hourOffset: 24, sicPredicted: 70.0, sicLower: 67, sicUpper: 73, uncertaintyBand: [67, 73], thicknessM: 1.22, driftVelocityKts: 1.2 },
  { timeLabel: 'T+36h', hourOffset: 36, sicPredicted: 72.2, sicLower: 68, sicUpper: 76, uncertaintyBand: [68, 76], thicknessM: 1.27, driftVelocityKts: 1.4 },
  { timeLabel: 'T+48h', hourOffset: 48, sicPredicted: 74.0, sicLower: 69, sicUpper: 78.5, uncertaintyBand: [69, 78.5], thicknessM: 1.31, driftVelocityKts: 1.3 },
  { timeLabel: 'T+60h', hourOffset: 60, sicPredicted: 75.1, sicLower: 70, sicUpper: 80.2, uncertaintyBand: [70, 80.2], thicknessM: 1.35, driftVelocityKts: 1.1 },
  { timeLabel: 'T+72h', hourOffset: 72, sicPredicted: 76.0, sicLower: 70.5, sicUpper: 81.8, uncertaintyBand: [70.5, 81.8], thicknessM: 1.38, driftVelocityKts: 0.9 },
  { timeLabel: 'T+4 Days', hourOffset: 96, sicPredicted: 78.0, sicLower: 71, sicUpper: 84.5, uncertaintyBand: [71, 84.5], thicknessM: 1.44, driftVelocityKts: 0.8 },
  { timeLabel: 'T+5 Days', hourOffset: 120, sicPredicted: 79.5, sicLower: 72, sicUpper: 86.8, uncertaintyBand: [72, 86.8], thicknessM: 1.49, driftVelocityKts: 0.7 },
  { timeLabel: 'T+6 Days', hourOffset: 144, sicPredicted: 81.0, sicLower: 73, sicUpper: 89.0, uncertaintyBand: [73, 89.0], thicknessM: 1.52, driftVelocityKts: 0.6 },
  { timeLabel: 'T+7 Days', hourOffset: 168, sicPredicted: 82.0, sicLower: 73.5, sicUpper: 90.5, uncertaintyBand: [73.5, 90.5], thicknessM: 1.55, driftVelocityKts: 0.5 },
];

export const RESUNET_MODEL_CONFIG = {
  name: 'ResUNet-Polar-v3.2',
  architecture: 'Deep Residual U-Net with Spatiotemporal ConvLSTM',
  resolutionKm: '2.5 km High-Resolution Grid',
  trainingEpochs: 180,
  lossFunction: 'Dice Loss + Weighted Focal Loss',
  inputs: [
    { name: 'Satellite Feeds', details: 'Sentinel-1 C-Band SAR, AMSR2 Dual-Polarized Passive Microwave, CryoSat-2 SIRAL-2' },
    { name: 'Oceanographic Feeds', details: 'HYCOM Ocean Currents, Copernicus Marine SST & Salinity Profiles' },
    { name: 'Meteorological Feeds', details: 'ECMWF HRES 10m Wind Fields, 2m Air Temp, Surface Pressure' },
  ],
  accuracyMetrics: {
    meanAbsoluteErrorPct: 3.8,
    diceScore: 0.924,
    f1Score: 0.912,
  },
};
