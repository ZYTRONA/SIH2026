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

// Mission Risk Summary requested by Prompt
export const MISSION_RISK_SUMMARY = {
  overallScore: 24, // 24 / 100 (LOW)
  overallTier: 'LOW' as RiskTier,
  rioMargin: '+18 NOMINAL',
  vesselCapability: 'PC3 Ice-Class',
  lastEvaluated: '12 min ago',
  subsystems: [
    {
      id: 'sub-weather',
      name: 'Weather Risk',
      score: 37,
      tier: 'LOW' as RiskTier,
      weightPct: 25,
      trend: 'increasing' as const,
      trendDelta: '+8 in 24h',
      description: 'Crosswind 24 kts SSE with gusts up to 34 kts.',
      iconName: 'Wind' as const,
    },
    {
      id: 'sub-ocean',
      name: 'Ocean Risk',
      score: 22,
      tier: 'LOW' as RiskTier,
      weightPct: 15,
      trend: 'stable' as const,
      trendDelta: '±0.5 kts',
      description: 'Antarctic Divergence boundary current with 1.8m swell.',
      iconName: 'Compass' as const,
    },
    {
      id: 'sub-iceberg',
      name: 'Iceberg Risk',
      score: 21,
      tier: 'LOW' as RiskTier,
      weightPct: 25,
      trend: 'increasing' as const,
      trendDelta: '+4 detected',
      description: 'IB-023 trajectory 12 km from planned corridor Bravo.',
      iconName: 'Mountain' as const,
    },
    {
      id: 'sub-sea-ice',
      name: 'Sea-Ice Risk',
      score: 18,
      tier: 'SAFE' as RiskTier,
      weightPct: 25,
      trend: 'increasing' as const,
      trendDelta: '+3.2% conc',
      description: 'First-year open pack (82.4% max concentration).',
      iconName: 'Snowflake' as const,
    },
    {
      id: 'sub-bathy',
      name: 'Bathymetry Risk',
      score: 11,
      tier: 'SAFE' as RiskTier,
      weightPct: 10,
      trend: 'stable' as const,
      trendDelta: 'Deep water',
      description: 'Mean sounding &gt; 850m along transit corridor.',
      iconName: 'Anchor' as const,
    },
  ],
};

// Active Hazards requested by Prompt
export const ACTIVE_HAZARDS_DATA: ActiveHazardItem[] = [
  {
    id: 'haz-01',
    severity: 'HIGH',
    title: 'Iceberg Proximity Incursion',
    detail: 'Iceberg IB-023 projected drift vector closes to 12 km from route corridor Bravo.',
    sector: 'Prydz Bay Sector 7B (68.5°S, 69.1°E)',
    proximityInfo: '12 km from route',
    mitigation: 'Adjust waypoint Bravo 8 NM West; lock continuous radar tracker.',
    timestamp: '14 min ago',
  },
  {
    id: 'haz-02',
    severity: 'WARNING',
    title: 'Increasing Sea-Ice Concentration',
    detail: 'Katabatic wind pushing multi-year floes into outer shipping lane.',
    sector: 'Eastern Approach Corridor (68.9°S, 72.8°E)',
    proximityInfo: 'Expected +24h',
    mitigation: 'Traverse open pack leads before 18:00 UTC.',
    timestamp: '28 min ago',
  },
  {
    id: 'haz-03',
    severity: 'MODERATE',
    title: 'Crosswind Atmospheric Front',
    detail: 'Sustained SSE gale force crosswind with gusts reaching 38 knots.',
    sector: 'Southern Ocean Grid 4',
    proximityInfo: '24 knots',
    mitigation: 'Ballast trim adjusted; dynamic positioning ready.',
    timestamp: '1 hr ago',
  },
];

// 72-Hour Risk Dynamics Chart Data
export const RISK_TIMELINE_72H: RiskChartPoint[] = [
  { timeLabel: 'T+00h', hourOffset: 0, compositeRisk: 24, seaIceRisk: 18, icebergRisk: 21, weatherRisk: 37, oceanRisk: 22, bathymetryRisk: 11 },
  { timeLabel: 'T+12h', hourOffset: 12, compositeRisk: 27, seaIceRisk: 20, icebergRisk: 24, weatherRisk: 42, oceanRisk: 24, bathymetryRisk: 11 },
  { timeLabel: 'T+24h', hourOffset: 24, compositeRisk: 34, seaIceRisk: 26, icebergRisk: 31, weatherRisk: 52, oceanRisk: 26, bathymetryRisk: 12 },
  { timeLabel: 'T+36h', hourOffset: 36, compositeRisk: 41, seaIceRisk: 32, icebergRisk: 38, weatherRisk: 58, oceanRisk: 28, bathymetryRisk: 12 },
  { timeLabel: 'T+48h', hourOffset: 48, compositeRisk: 38, seaIceRisk: 30, icebergRisk: 34, weatherRisk: 48, oceanRisk: 26, bathymetryRisk: 11 },
  { timeLabel: 'T+60h', hourOffset: 60, compositeRisk: 29, seaIceRisk: 24, icebergRisk: 26, weatherRisk: 36, oceanRisk: 23, bathymetryRisk: 11 },
  { timeLabel: 'T+72h', hourOffset: 72, compositeRisk: 22, seaIceRisk: 19, icebergRisk: 20, weatherRisk: 28, oceanRisk: 20, bathymetryRisk: 10 },
];

export const RISK_ENGINE_SPEC = {
  name: 'POLARIS Deterministic Risk Engine v2.4',
  framework: 'IMO Polar Operational Limit Assessment Risk Indexing System (POLARIS RIO)',
  disclaimer: 'Deterministic mathematical & structural safety model for prototype decision support.',
  inputs: [
    { name: 'Sea Ice', source: 'Sentinel-1 SAR / AMSR2', weight: '25%', formula: 'RIO = \\sum (C_i \\times RV_i)' },
    { name: 'Icebergs', source: 'SAR Catalog & Lagrangian Drift', weight: '25%', formula: 'P_{coll} \\times Area_{berg} / Dist^2' },
    { name: 'Weather', source: 'ECMWF HRES 10m Wind & Temp', weight: '25%', formula: 'Wind_{drag} + Superstructure_{icing}' },
    { name: 'Ocean', source: 'HYCOM Currents & Wave Swell', weight: '15%', formula: 'Swell_{drift} + Divergence_{shear}' },
    { name: 'Bathymetry', source: 'GEBCO High-Latitude Soundings', weight: '10%', formula: 'Underkeel_{clearance} / Depth_{min}' },
    { name: 'Vessel Capability', source: 'PC3 Ice-Class Hull Specification', weight: 'Constraint', formula: 'Hull Limit RIO &gt; 0' },
  ],
};
