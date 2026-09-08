export interface ShapFeatureContribution {
  feature: string;
  category: 'Safety' | 'Environmental' | 'Kinetic' | 'Navigation';
  shapValue: number; // Positive = favorable contribution towards recommendation, Negative = penalty
  importancePct: number;
  rawFeatureValue: string;
  impactDescription: string;
  color: string;
}

export interface ReasoningPoint {
  id: string;
  title: string;
  summary: string;
  detail: string;
  metric: string;
  iconName: 'Snowflake' | 'Mountain' | 'Wind' | 'Fuel' | 'Clock' | 'ShieldCheck';
  badge: string;
  badgeType: 'safe' | 'info' | 'warning';
}

export interface ConfidenceMetric {
  id: string;
  title: string;
  valuePct: number;
  model: string;
  source: string;
  sampleSize: string;
  status: string;
  description: string;
}

export interface ModelInfoCard {
  subsystem: string;
  modelName: string;
  architecture: string;
  purpose: string;
  inputs: string[];
  latency: string;
  accuracyMetric: string;
}

export interface RouteCostItem {
  name: string;
  costPct: number;
  rawCost: string;
  description: string;
  color: string;
}

export const EXPLAINABILITY_HEADER = {
  title: 'Decision Intelligence & Rationale',
  question: 'Why did POLARIS recommend this route?',
  recommendedRouteName: 'Balanced Route',
  overallConfidencePct: 91,
  rationaleSummary:
    'POLARIS selected the Balanced Route because it provides the optimal Pareto trade-off: minimizing severe sea-ice and iceberg collision hazards while preserving fuel kinetics and maintaining an acceptable ETA.',
};

// 5 Core Reasoning Points requested by Prompt
export const CORE_REASONING_POINTS: ReasoningPoint[] = [
  {
    id: 'reason-sea-ice',
    title: 'Lower sea-ice exposure',
    summary: 'Traverses outer open leads with 58% maximum concentration.',
    detail:
      'Avoids central Prydz Bay compression ridges (84% multi-year pack), reducing structural hull stress by 42% compared to the direct route.',
    metric: 'Max 58% SIC (vs 84% direct)',
    iconName: 'Snowflake',
    badge: 'SAFE PACK TRANSIT',
    badgeType: 'safe',
  },
  {
    id: 'reason-iceberg',
    title: 'Reduced iceberg encounter probability',
    summary: 'Maintains 18+ NM buffer from tracked tabular clusters.',
    detail:
      'Trajectory avoids projected drift vector of giant tabular iceberg IB-023 and Cape Darnley bergy bit swarms, dropping collision risk from 7.4% to 1.8%.',
    metric: '18 NM CPA (P_coll 1.8%)',
    iconName: 'Mountain',
    badge: 'COLLISION BUFFER',
    badgeType: 'safe',
  },
  {
    id: 'reason-weather',
    title: 'Moderate wind conditions',
    summary: 'Favorable track angle relative to 24-knot SSE gale.',
    detail:
      'Aligns vessel course to reduce beam crosswinds and lateral leeway drift, mitigating superstructure sea-spray icing risks.',
    metric: 'SSE 24 kts (Beam angle < 30°)',
    iconName: 'Wind',
    badge: 'OPTIMAL HEADING',
    badgeType: 'info',
  },
  {
    id: 'reason-fuel',
    title: 'Lower estimated fuel consumption',
    summary: 'Consumes 82.6 m³ total heavy fuel oil.',
    detail:
      'Only 3.2 m³ above the hydrodynamically assisted route, while avoiding the massive 15+ tons fuel penalty of continuous icebreaker ramming.',
    metric: '82.6 m³ total burn',
    iconName: 'Fuel',
    badge: 'EFFICIENT KINETICS',
    badgeType: 'info',
  },
  {
    id: 'reason-eta',
    title: 'Acceptable ETA',
    summary: 'Total transit duration of 41 hours 52 minutes.',
    detail:
      'Arrives at Bharati Station within 3.2 hours of the high-risk direct cut, keeping research station resupply logistics on schedule.',
    metric: '41h 52m (+3.2h vs Fastest)',
    iconName: 'Clock',
    badge: 'SCHEDULE COMPLIANT',
    badgeType: 'safe',
  },
];

// SHAP Feature Contributions for the ML Risk Model (Labeled specifically as requested)
export const SHAP_FEATURE_CONTRIBUTIONS: ShapFeatureContribution[] = [
  {
    feature: 'Sea Ice',
    category: 'Environmental',
    shapValue: 0.34,
    importancePct: 34,
    rawFeatureValue: '58% SIC (First-year leads)',
    impactDescription: 'Lower concentration significantly decreases structural hull risk',
    color: '#06B6D4', // Cyan
  },
  {
    feature: 'Iceberg Risk',
    category: 'Safety',
    shapValue: 0.28,
    importancePct: 28,
    rawFeatureValue: '18 NM CPA (IB-023 avoided)',
    impactDescription: 'Generous safety corridor avoids active tabular drift cones',
    color: '#38BDF8', // Sky Blue
  },
  {
    feature: 'Fuel',
    category: 'Kinetic',
    shapValue: 0.18,
    importancePct: 18,
    rawFeatureValue: '82.6 m³ estimated burn',
    impactDescription: 'Smooth open-lead cruising avoids high engine surge loads',
    color: '#10B981', // Emerald
  },
  {
    feature: 'Weather',
    category: 'Environmental',
    shapValue: 0.16,
    importancePct: 16,
    rawFeatureValue: '24 kts SSE (Moderate)',
    impactDescription: 'Course alignment minimizes crosswind roll and icing drag',
    color: '#F59E0B', // Amber
  },
  {
    feature: 'Ocean Current',
    category: 'Environmental',
    shapValue: 0.12,
    importancePct: 12,
    rawFeatureValue: '+1.2 kts boundary assist',
    impactDescription: 'Antarctic Divergence streamline provides positive kinetic push',
    color: '#6366F1', // Indigo
  },
  {
    feature: 'Bathymetry',
    category: 'Safety',
    shapValue: 0.08,
    importancePct: 8,
    rawFeatureValue: '> 850m mean sounding',
    impactDescription: 'Deep ocean transit well clear of shallow coastal ridges',
    color: '#8B5CF6', // Purple
  },
  {
    feature: 'Distance',
    category: 'Navigation',
    shapValue: -0.14,
    importancePct: 14,
    rawFeatureValue: '1,274 km (+60 km vs direct)',
    impactDescription: 'Minor distance penalty accepted to bypass severe pack hazards',
    color: '#F97316', // Orange
  },
];

// Confidence Metrics requested by Prompt
export const CONFIDENCE_METRICS_DATA: ConfidenceMetric[] = [
  {
    id: 'conf-forecast',
    title: 'Forecast Confidence',
    valuePct: 89,
    model: 'ResUNet Sea-Ice Spatiotemporal Model',
    source: 'Sentinel-1 SAR + AMSR2 Multi-sensor Feed',
    sampleSize: '72h temporal forecast horizon',
    status: 'HIGH ACCURACY',
    description: 'Ensemble model validated against cryospheric observation stations.',
  },
  {
    id: 'conf-risk',
    title: 'Risk Confidence',
    valuePct: 86,
    model: 'IMO POLARIS RIO & Sensor Fusion Matrix',
    source: 'Multi-factor Environmental Hazard Aggregator',
    sampleSize: '100% corridor coverage',
    status: 'CALIBRATED',
    description: 'Deterministic safety rules verified against PC3 hull stress limits.',
  },
  {
    id: 'conf-route',
    title: 'Route Confidence',
    valuePct: 87,
    model: 'NSGA-II Multi-objective Pareto Engine',
    source: 'Continuous-Curvature A* Grid Pathfinder',
    sampleSize: '120 population / 85 generations',
    status: 'CONVERGED',
    description: 'Rank-1 non-dominated Pareto solution with 99.4% hypervolume coverage.',
  },
];

// Why Fastest Route was not selected (Alternative Route Section)
export const FASTEST_ROUTE_REJECTION = {
  title: 'Why fastest route was not selected',
  quote:
    'Fastest route has lower travel time but significantly higher environmental risk due to increasing sea-ice concentration and iceberg exposure.',
  comparison: {
    travelTime: { balanced: '41h 52m', fastest: '38h 40m', delta: '-3h 12m' },
    riskScore: { balanced: '24 / 100 (LOW)', fastest: '41 / 100 (MODERATE)', delta: '+17 pts Risk' },
    seaIceConcentration: { balanced: '58% max', fastest: '84% heavy pack', delta: '+26% Heavy Ice' },
    icebergCPA: { balanced: '18.0 NM clearance', fastest: '5.1 NM proximity', delta: 'Hazard Incursion' },
    icebreakerRequired: { balanced: 'Autonomous (No escort)', fastest: 'Mandatory Escort Advised', delta: 'High Dependency' },
  },
  verdict:
    'Trading a 3.2-hour delay for a 41% reduction in structural and iceberg collision risk represents the soundest navigational decision for autonomous and crewed polar research voyages.',
};

// Route Cost Breakdown (Separate from SHAP as explicitly required)
export const ROUTE_COST_BREAKDOWN: RouteCostItem[] = [
  {
    name: 'Fuel Kinetics Cost',
    costPct: 36.8,
    rawCost: '30.4 fuel cost units',
    description: 'Energy required to overcome hydrodynamic slip and thin ice leads at 12.8 kts.',
    color: '#06B6D4',
  },
  {
    name: 'Transit Duration Cost',
    costPct: 28.5,
    rawCost: '23.5 time cost units',
    description: 'Opportunity cost of voyage duration (41.87 hours total transit).',
    color: '#38BDF8',
  },
  {
    name: 'Safety Hazard Penalty',
    costPct: 24.2,
    rawCost: '20.0 RIO penalty units',
    description: 'Cumulative POLARIS risk index cost across transit waypoints.',
    color: '#10B981',
  },
  {
    name: 'Maneuvering & Turning Penalty',
    costPct: 10.5,
    rawCost: '8.7 curvature cost units',
    description: 'Rudder steering and yaw rate resistance across 4 navigation waypoints.',
    color: '#818CF8',
  },
];

// Model Architecture & Information Matrix
export const MODEL_INFORMATION_DATA: ModelInfoCard[] = [
  {
    subsystem: 'Sea Ice',
    modelName: 'ResUNet',
    architecture: 'Deep Residual Convolutional U-Net with Spatial Attention',
    purpose: 'Predicts high-resolution 72-hour Antarctic sea-ice concentration & drift.',
    inputs: ['Sentinel-1 SAR', 'AMSR2 Passive Microwave', 'ERA5 Surface Temp'],
    latency: '340 ms / inference grid',
    accuracyMetric: '0.94 SSIM / 89% Confidence',
  },
  {
    subsystem: 'Iceberg',
    modelName: 'Physics + XGBoost',
    architecture: 'Lagrangian Hydrodynamic Drift Engine + Gradient Boosted Residuals',
    purpose: 'Forecasts 72-hour iceberg movement vectors and proximity collision odds.',
    inputs: ['HYCOM Surface Currents', 'ECMWF 10m Wind', 'SAR Object Catalog'],
    latency: '120 ms / 32 objects',
    accuracyMetric: '92% Vector Correlation / 86% Conf',
  },
  {
    subsystem: 'Routing',
    modelName: 'A* + NSGA-II',
    architecture: 'Continuous-Curvature Grid A* with Non-dominated Sorting Genetic Algorithm II',
    purpose: 'Computes Pareto-optimal navigation routes balancing safety, fuel, and time.',
    inputs: ['ResUNet Ice Grid', 'Lagrangian Iceberg Buffers', 'POLARIS RIO Matrix'],
    latency: '850 ms (120 pop × 85 gen)',
    accuracyMetric: '99.4% Hypervolume / 87% Conf',
  },
  {
    subsystem: 'Explainability',
    modelName: 'SHAP',
    architecture: 'Kernel SHAP (SHapley Additive exPlanations) for Feature Attribution',
    purpose: 'Computes transparent feature contributions for the ML risk assessment model.',
    inputs: ['Risk Feature Vector', 'Model Predictions', 'Baseline Synthetic Samples'],
    latency: '45 ms / evaluation',
    accuracyMetric: 'Local Additive Efficiency Guaranteed',
  },
];
