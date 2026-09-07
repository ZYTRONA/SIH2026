import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { AntarcticMap } from '@/components/map/AntarcticMap';
import {
  RiskScoreBreakdown,
  ActiveHazardsList,
  RiskTimelineChart,
  RiskEngineSpecCard,
  RiskLayerToggleBar,
  RiskScaleLegend,
  RiskLayersState,
} from '@/components/risk';
import { MapLayerVisibility } from '@/types/map';
import { ShieldCheck, Sparkles, Activity } from 'lucide-react';

export const RiskIntelligence: React.FC = () => {
  // 5 Layer state requested by prompt: Sea-Ice Risk, Iceberg Risk, Weather Risk, Ocean Risk, Bathymetry Risk
  const [riskLayers, setRiskLayers] = useState<RiskLayersState>({
    seaIceRisk: true,
    icebergRisk: true,
    weatherRisk: true,
    oceanRisk: true,
    bathymetryRisk: false,
  });

  const handleToggleRiskLayer = (layerKey: keyof RiskLayersState) => {
    setRiskLayers((prev) => ({
      ...prev,
      [layerKey]: !prev[layerKey],
    }));
  };

  // Synchronize riskLayers with the AntarcticMap layer visibility
  const mapLayers: MapLayerVisibility = {
    seaIce: riskLayers.seaIceRisk,
    icebergs: riskLayers.icebergRisk,
    risk: true,
    weather: riskLayers.weatherRisk,
    oceanCurrents: riskLayers.oceanRisk,
    bathymetry: riskLayers.bathymetryRisk,
    routes: true,
  };

  const handleMapLayerToggle = (key: keyof MapLayerVisibility) => {
    if (key === 'seaIce') {
      setRiskLayers((prev) => ({ ...prev, seaIceRisk: !prev.seaIceRisk }));
    } else if (key === 'icebergs') {
      setRiskLayers((prev) => ({ ...prev, icebergRisk: !prev.icebergRisk }));
    } else if (key === 'weather') {
      setRiskLayers((prev) => ({ ...prev, weatherRisk: !prev.weatherRisk }));
    } else if (key === 'oceanCurrents') {
      setRiskLayers((prev) => ({ ...prev, oceanRisk: !prev.oceanRisk }));
    } else if (key === 'bathymetry') {
      setRiskLayers((prev) => ({ ...prev, bathymetryRisk: !prev.bathymetryRisk }));
    }
  };

  return (
    <PageContainer
      title="Antarctic Risk Intelligence"
      subtitle="Multi-factor environmental hazard aggregation, POLARIS RIO structural limit indexing, and active transit threat tracking"
      badge="IMO POLARIS COMPLIANT"
      badgeType="safe"
    >
      <div className="space-y-6">
        {/* 1. Risk Scale Reference Banner (0-20 to 80-100) */}
        <RiskScaleLegend currentScore={24} />

        {/* 2. Combined Risk Heatmap & Main Antarctic Map Section */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-rose-400" />
              <h2 className="text-sm font-bold font-sans uppercase tracking-wider text-slate-100">
                Combined Antarctic Risk Heatmap & Transit Corridor
              </h2>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>IMO Polar Code Calibrated: PC3 Structural Limit</span>
            </div>
          </div>

          {/* Interactive Layer Toggle Bar */}
          <RiskLayerToggleBar
            layers={riskLayers}
            onToggle={handleToggleRiskLayer}
          />

          {/* Antarctic Map with Controlled Layers */}
          <AntarcticMap
            controlledLayers={mapLayers}
            onLayerToggle={handleMapLayerToggle}
            heightClass="h-[520px] sm:h-[580px] lg:h-[640px]"
          />
        </div>

        {/* 3. Operational Risk Summary & Hazard Intelligence Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column: Mission Risk Summary & Risk Engine Specs */}
          <div className="space-y-6">
            {/* Mission Risk Summary with clean horizontal visualizations */}
            <RiskScoreBreakdown />

            {/* Risk Engine Specifications & 6 Inputs Breakdown */}
            <RiskEngineSpecCard />
          </div>

          {/* Right Column: Active Hazards & 72-Hour Risk Dynamics */}
          <div className="space-y-6">
            {/* Active Hazards List */}
            <ActiveHazardsList />

            {/* 72-Hour Risk Dynamics Timeline Chart */}
            <RiskTimelineChart />
          </div>
        </div>

        {/* 4. Bottom Footer Security & Compliance Notice */}
        <div className="p-3.5 rounded-lg bg-polar-900/60 border border-polar-700/50 flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono text-slate-400 gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-ice-400" />
            <span className="text-slate-300">
              POLARIS AI Risk Decision Engine
            </span>
            <span>—</span>
            <span>Deterministic RIO structural calculations updated continuous live feed</span>
          </div>
          <span className="text-emerald-400 font-bold">
            CURRENT VOYAGE STATUS: PERMITTED TRANSIT (RIO &gt; 0)
          </span>
        </div>
      </div>
    </PageContainer>
  );
};
