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
      subtitle="Multi-factor environmental hazard aggregation, POLARIS RIO structural limit indexing, and active transit threat tracking."
      badge="IMO POLARIS COMPLIANT"
      badgeType="safe"
    >
      <div className="space-y-6">
        {/* 1. Risk Scale Reference Banner */}
        <RiskScaleLegend currentScore={24} />

        {/* 2. Combined Risk Heatmap & Main Antarctic Map Section */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#0066cc]" />
              <h2 className="text-[14px] font-semibold text-[#1d1d1f]">
                Combined Antarctic Risk Heatmap & Transit Corridor
              </h2>
            </div>
            <div className="flex items-center gap-2 text-[12px] text-neutral-500 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
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
            <RiskScoreBreakdown />
            <RiskEngineSpecCard />
          </div>

          {/* Right Column: Active Hazards & 72-Hour Risk Dynamics */}
          <div className="space-y-6">
            <ActiveHazardsList />
            <RiskTimelineChart />
          </div>
        </div>

        {/* 4. Bottom Footer Security & Compliance Notice */}
        <div className="p-5 rounded-[18px] bg-white border border-[#e0e0e0] flex flex-col sm:flex-row sm:items-center justify-between text-[13px] text-[#1d1d1f] gap-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#0066cc]" />
            <span className="font-semibold">
              POLARIS AI Risk Decision Engine
            </span>
            <span className="text-neutral-300">&bull;</span>
            <span className="text-neutral-600">Deterministic RIO structural calculations updated continuous live feed</span>
          </div>
          <span className="px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200 text-[12px]">
            TRANSIT PERMITTED: RIO +18 &gt; 0
          </span>
        </div>
      </div>
    </PageContainer>
  );
};

export default RiskIntelligence;
