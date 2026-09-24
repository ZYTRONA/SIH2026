export type RiskTier = 'SAFE' | 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';

export interface RiskScaleItem {
  range: string;
  tier: RiskTier;
  color: string;
  badgeBg: string;
  badgeBorder: string;
  textColor: string;
  description: string;
}

export interface RiskSubsystemScore {
  id: string;
  name: string;
  score: number; // 0 - 100
  tier: RiskTier;
  weightPct: number;
  trend: 'increasing' | 'stable' | 'decreasing';
  trendDelta: string;
  description: string;
  iconName: 'Snowflake' | 'Mountain' | 'Wind' | 'Compass' | 'Anchor' | 'Shield';
}

export interface ActiveHazardItem {
  id: string;
  severity: 'HIGH' | 'WARNING' | 'MODERATE';
  title: string;
  detail: string;
  sector: string;
  proximityInfo: string;
  mitigation: string;
  timestamp: string;
}

export interface RiskChartPoint {
  timeLabel: string;
  hourOffset: number;
  compositeRisk: number;
  seaIceRisk: number;
  icebergRisk: number;
  weatherRisk: number;
  oceanRisk: number;
  bathymetryRisk: number;
}

export const RISK_SCALE_TIERS: RiskScaleItem[] = [
  { range: '0–20', tier: 'SAFE', color: '#10B981', badgeBg: 'bg-emerald-500/15', badgeBorder: 'border-emerald-500/40', textColor: 'text-emerald-300', description: 'Nominal conditions. Full maneuvering capability.' },
  { range: '20–40', tier: 'LOW', color: '#06B6D4', badgeBg: 'bg-cyan-500/15', badgeBorder: 'border-cyan-500/40', textColor: 'text-cyan-300', description: 'Manageable drift. Continuous watch required.' },
  { range: '40–60', tier: 'MODERATE', color: '#F59E0B', badgeBg: 'bg-amber-500/15', badgeBorder: 'border-amber-500/40', textColor: 'text-amber-300', description: 'Increased hull resistance. Speed reduction advised.' },
  { range: '60–80', tier: 'HIGH', color: '#F97316', badgeBg: 'bg-orange-500/15', badgeBorder: 'border-orange-500/40', textColor: 'text-orange-300', description: 'Severe pack convergence. Dynamic route deviation recommended.' },
  { range: '80–100', tier: 'CRITICAL', color: '#EF4444', badgeBg: 'bg-rose-500/15', badgeBorder: 'border-rose-500/40', textColor: 'text-rose-300', description: 'Extreme structural hazard. Immediate avoidance mandatory.' },
];

// Mission Risk Summary for East Antarctic Corridor (Maitri to Bharati)
export const MISSION_RISK_SUMMARY = {
  overallScore: 22, // 22 / 100 (LOW)
  overallTier: 'LOW' as RiskTier,
  rioMargin: '+16 NOMINAL (PC3)',
  vesselCapability: 'SA Agulhas II (PC3 Polar Class)',
  lastEvaluated: '12 min ago',
  subsystems: [
    {
      id: 'sub-weather',
      name: 'Weather Risk',
      score: 32,
      tier: 'LOW' as RiskTier,
      weightPct: 25,
      trend: 'increasing' as const,
      trendDelta: '+4 in 24h',
      description: 'Katabatic off-shore winds 24 kts SSE with gusts up to 34 kts.',
      iconName: 'Wind' as const,
    },
    {
      id: 'sub-ocean',
      name: 'Ocean Risk',
      score: 20,
      tier: 'SAFE' as RiskTier,
      weightPct: 15,
      trend: 'stable' as const,
      trendDelta: '±0.3 kts',
      description: 'Antarctic Coastal Current westbound streamline with 1.8m swell.',
      iconName: 'Compass' as const,
    },
    {
      id: 'sub-iceberg',
      name: 'Iceberg Risk',
      score: 24,
      tier: 'LOW' as RiskTier,
      weightPct: 25,
      trend: 'increasing' as const,
      trendDelta: '+2 detected',
      description: 'Giant Tabular A-76A trajectory 4.8 NM from planned waypoint Bravo.',
      iconName: 'Mountain' as const,
    },
    {
      id: 'sub-sea-ice',
      name: 'Sea-Ice Risk',
      score: 16,
      tier: 'SAFE' as RiskTier,
      weightPct: 25,
      trend: 'stable' as const,
      trendDelta: '+1.2% conc',
      description: 'Princess Astrid polynya open lead (35.4% max concentration).',
      iconName: 'Snowflake' as const,
    },
    {
      id: 'sub-bathy',
      name: 'Bathymetry Risk',
      score: 10,
      tier: 'SAFE' as RiskTier,
      weightPct: 10,
      trend: 'stable' as const,
      trendDelta: 'Deep sounding',
      description: 'Mean sounding > 1800m along continental slope corridor.',
      iconName: 'Anchor' as const,
    },
  ],
};

// Active Hazards in East Antarctic Corridor
export const ACTIVE_HAZARDS_DATA: ActiveHazardItem[] = [
  {
    id: 'haz-01',
    severity: 'HIGH',
    title: 'Giant Iceberg A-76A Proximity',
    detail: 'Calved tabular berg A-76A projected drift vector closes to 4.8 NM from waypoint Bravo.',
    sector: 'Princess Astrid Sector 2B (-68.2°S, 24.5°E)',
    proximityInfo: '4.8 NM from route',
    mitigation: 'Adjust waypoint Bravo 8 NM North; lock continuous radar echo tracking.',
    timestamp: '14 min ago',
  },
  {
    id: 'haz-02',
    severity: 'WARNING',
    title: 'Amery Ice Shelf Pack Convergence',
    detail: 'Coastal current pushing thick multi-year ice floes into Prydz Bay entry fairway.',
    sector: 'Prydz Bay Continental Shelf (-68.5°S, 72.5°E)',
    proximityInfo: 'Expected +24h',
    mitigation: 'Traverse Cosmonaut Sea lead before 18:00 UTC.',
    timestamp: '28 min ago',
  },
  {
    id: 'haz-03',
    severity: 'MODERATE',
    title: 'Katabatic Gale Front',
    detail: 'Sustained offshore katabatic gale with gusts reaching 34 knots off Dronning Maud Land.',
    sector: 'East Antarctic Grid 4',
    proximityInfo: '24 knots',
    mitigation: 'Ballast trim adjusted; dynamic positioning ready.',
    timestamp: '1 hr ago',
  },
];

// 72-Hour Risk Dynamics Chart Data
export const RISK_TIMELINE_72H: RiskChartPoint[] = [
  { timeLabel: 'T+00h', hourOffset: 0, compositeRisk: 24, seaIceRisk: 18, icebergRisk: 26, weatherRisk: 34, oceanRisk: 22, bathymetryRisk: 10 },
  { timeLabel: 'T+12h', hourOffset: 12, compositeRisk: 27, seaIceRisk: 20, icebergRisk: 28, weatherRisk: 38, oceanRisk: 24, bathymetryRisk: 10 },
  { timeLabel: 'T+24h', hourOffset: 24, compositeRisk: 33, seaIceRisk: 24, icebergRisk: 33, weatherRisk: 46, oceanRisk: 25, bathymetryRisk: 11 },
  { timeLabel: 'T+36h', hourOffset: 36, compositeRisk: 38, seaIceRisk: 28, icebergRisk: 36, weatherRisk: 50, oceanRisk: 26, bathymetryRisk: 11 },
  { timeLabel: 'T+48h', hourOffset: 48, compositeRisk: 34, seaIceRisk: 26, icebergRisk: 32, weatherRisk: 42, oceanRisk: 24, bathymetryRisk: 10 },
  { timeLabel: 'T+60h', hourOffset: 60, compositeRisk: 26, seaIceRisk: 20, icebergRisk: 24, weatherRisk: 32, oceanRisk: 22, bathymetryRisk: 10 },
  { timeLabel: 'T+72h', hourOffset: 72, compositeRisk: 20, seaIceRisk: 16, icebergRisk: 18, weatherRisk: 24, oceanRisk: 18, bathymetryRisk: 9 },
];

export const RISK_ENGINE_SPEC = {
  name: 'POLARIS Deterministic Risk Engine v2.4',
  framework: 'IMO Polar Operational Limit Assessment Risk Indexing System (POLARIS RIO)',
  disclaimer: 'Deterministic mathematical & structural safety model for operational decision support.',
  inputs: [
    { name: 'Sea Ice', source: 'Sentinel-1 SAR / AMSR2', weight: '25%', formula: 'RIO = \\sum (C_i \\times RV_i)' },
    { name: 'Icebergs', source: 'SAR Catalog & Lagrangian Drift', weight: '25%', formula: 'P_{coll} \\times Area_{berg} / Dist^2' },
    { name: 'Weather', source: 'ECMWF HRES 10m Wind & Temp', weight: '25%', formula: 'Wind_{drag} + Superstructure_{icing}' },
    { name: 'Ocean', source: 'HYCOM Currents & Wave Swell', weight: '15%', formula: 'Swell_{drift} + Divergence_{shear}' },
    { name: 'Bathymetry', source: 'GEBCO High-Latitude Soundings', weight: '10%', formula: 'Underkeel_{clearance} / Depth_{min}' },
    { name: 'Vessel Capability', source: 'PC3 Ice-Class Hull Specification', weight: 'Constraint', formula: 'Hull Limit RIO > 0' },
  ],
};
