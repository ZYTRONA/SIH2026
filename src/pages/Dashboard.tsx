import React from 'react';
import { AntarcticMap } from '@/components/map/AntarcticMap';
import { KPICard } from '@/components/dashboard/KPICard';
import { NavigationIntelligencePanel } from '@/components/dashboard/NavigationIntelligencePanel';
import { TacticalDecisionBanner } from '@/components/dashboard/TacticalDecisionBanner';
import { EnvironmentalForecastChart } from '@/components/dashboard/EnvironmentalForecastChart';
import { ActiveAlertsPanel } from '@/components/dashboard/ActiveAlertsPanel';
import { QuickActionsBar } from '@/components/dashboard/QuickActionsBar';
import { DASHBOARD_KPIS } from '@/data/dashboardData';
import { RotateCw, Compass, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  return (
    <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
      {/* Tier 1: Apple Page Header with SF Pro Display & Editorial Lead */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 pb-5 border-b border-[#e0e0e0]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[12px] uppercase tracking-wider text-neutral-500 font-semibold">
              Cockpit Telemetry
            </span>
            <span className="text-neutral-300">&bull;</span>
            <span className="apple-badge-safe">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              <span>IMO Polar Code Calibrated</span>
            </span>
          </div>
          <h1 className="text-[28px] sm:text-[34px] lg:text-[40px] font-semibold text-[#1d1d1f] tracking-[-0.28px] leading-[1.1]">
            Mission Control
          </h1>
          <p className="text-[14px] sm:text-[17px] text-neutral-600 font-normal mt-1 max-w-3xl leading-[1.47] tracking-[-0.374px]">
            Real-time hydrodynamic routing, SAR satellite iceberg tracking, and IMO POLARIS risk index compliance.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-2 text-[12px] text-neutral-600 bg-white border border-[#e0e0e0] px-3.5 py-1.5 rounded-full select-none">
            <RotateCw className="w-3.5 h-3.5 text-neutral-400" />
            <span className="font-normal text-[#1d1d1f]">Live Feed: 30s ago</span>
          </div>
          <Link to="/mission-planner" className="btn-apple-primary">
            <Compass className="w-4 h-4" />
            <span>Plan Route</span>
          </Link>
        </div>
      </div>

      {/* Tier 2: Tactical Decision & Priority Recommendation Banner */}
      <TacticalDecisionBanner />

      {/* Tier 3: 6-Column High-Density KPI Metric Grid with Sparklines */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {DASHBOARD_KPIS.map((kpi) => (
          <KPICard key={kpi.id} data={kpi} />
        ))}
      </div>

      {/* Tier 4: Split Content Area (8 Cols: Interactive Chart / 4 Cols: AI Intelligence) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Antarctic Map (spans 8 cols) */}
        <div className="lg:col-span-8 space-y-3">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <h2 className="text-[14px] font-semibold text-[#1d1d1f] tracking-tight">
                Antarctic Tactical Maritime Chart
              </h2>
            </div>
            <span className="text-[12px] font-mono text-neutral-500">
              EPSG:3857 &bull; Real-time Sentinel-1 & AIS
            </span>
          </div>
          <AntarcticMap heightClass="h-[480px] sm:h-[540px] lg:h-[620px]" />
        </div>

        {/* Right: Navigation Intelligence (spans 4 cols) */}
        <div className="lg:col-span-4">
          <NavigationIntelligencePanel />
        </div>
      </div>

      {/* Tier 5: Hazard Incursions, Environmental Dynamics & Quick Action Deck */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start pt-2">
        {/* Environmental 72H Dynamics Chart (spans 7 cols) */}
        <div className="lg:col-span-7">
          <EnvironmentalForecastChart />
        </div>

        {/* Active Hazards & Fast Launch (spans 5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <ActiveAlertsPanel />
          <QuickActionsBar />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
