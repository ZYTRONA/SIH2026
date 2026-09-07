import { MissionConfig, MissionPlanResult, PipelineStage } from '@/types';

/**
 * Prototype AI Simulation Service for Antarctic Navigation Planning.
 * Orchestrates mock asynchronous ingestion, forecasting, risk assessment, and route optimization.
 * Structured for future 1-to-1 replacement with FastAPI endpoints.
 */
export const missionService = {
  async generateNavigationPlan(
    config: MissionConfig,
    onProgress?: (stage: PipelineStage, progressPct: number, message: string) => void
  ): Promise<MissionPlanResult> {
    // 1. Stage 1: Data Ingestion
    onProgress?.(
      'ingestion',
      25,
      'Ingesting multi-sensor satellite imagery (Sentinel-1 SAR, AMSR2) & ECMWF weather feeds...'
    );
    await new Promise((res) => setTimeout(res, 800));

    // 2. Stage 2: Spatiotemporal Forecasting
    onProgress?.(
      'forecasting',
      50,
      'Forecasting 72-hour Antarctic sea-ice concentration dynamics & iceberg drift vectors...'
    );
    await new Promise((res) => setTimeout(res, 850));

    // 3. Stage 3: Risk Assessment
    onProgress?.(
      'risk',
      75,
      `Computing IMO POLAR Code structural risk index (RIO) for ${config.polarCapability} capability...`
    );
    await new Promise((res) => setTimeout(res, 800));

    // 4. Stage 4: Multi-Objective Route Optimization
    onProgress?.(
      'optimization',
      95,
      `Synthesizing Pareto-optimal routes with priority: ${config.navigationPriority}...`
    );
    await new Promise((res) => setTimeout(res, 750));

    onProgress?.('completed', 100, 'Navigation Plan Ready');

    // Return synthesized result based on config
    const distanceNm = config.navigationPriority === 'Fastest' ? 382 : config.navigationPriority === 'Safest' ? 496 : 418;
    const etaFormatted = config.navigationPriority === 'Fastest' ? '37h 12m' : config.navigationPriority === 'Safest' ? '49h 30m' : '41h 52m';
    const fuelEstimateTons = config.navigationPriority === 'Fuel Efficient' ? 142.8 : config.navigationPriority === 'Fastest' ? 178.6 : 154.2;
    const riskScore = config.navigationPriority === 'Safest' ? 14 : config.navigationPriority === 'Fastest' ? 42 : 24;

    return {
      missionId: `PLAN-${Math.floor(1000 + Math.random() * 9000)}-POLAR`,
      generatedAt: new Date().toISOString(),
      config,
      recommendedRouteName:
        config.navigationPriority === 'Fastest'
          ? 'DIRECT ICE-EDGE SPEEDWAY'
          : config.navigationPriority === 'Safest'
          ? 'MAX SAFETY DETOUR CORRIDOR'
          : 'BALANCED SAFE ROUTE',
      distanceNm,
      etaHours: parseFloat(etaFormatted.replace('h', '.').replace('m', '')),
      etaFormatted,
      fuelEstimateTons,
      fuelSavingsPct: 8.6,
      averageRiskScore: riskScore,
      riskCategory: riskScore < 20 ? 'LOW' : riskScore < 40 ? 'LOW' : 'MODERATE',
      seaIceExposurePct: 34.2,
      icebergExposureCount: 2,
      weatherSeverity: 'MODERATE (24 knots peak)',
      waypointsCount: 5,
      confidencePct: 91.4,
      aiRationale:
        'POLARIS recommends the balanced route to minimize hull impact in multi-year pressure ridges while optimizing transit fuel kinetics.',
      alternatives: [
        {
          name: 'Alternative A (Fastest / Ice Edge)',
          distanceNm: 382,
          etaHours: 37.2,
          fuelTons: 178.6,
          riskScore: 42,
          tradeoff: '-4.6h transit time, +15.8% fuel burn, +18 risk',
        },
        {
          name: 'Alternative B (Max Safety Detour)',
          distanceNm: 496,
          etaHours: 49.5,
          fuelTons: 168.0,
          riskScore: 14,
          tradeoff: '-10 risk, +7.7h transit time, +8.9% fuel burn',
        },
      ],
    };
  },
};
