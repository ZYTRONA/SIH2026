import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { KPICard } from '@/components/dashboard/KPICard';
import { AntarcticMap } from '@/components/map/AntarcticMap';
import { NavigationIntelligencePanel } from '@/components/dashboard/NavigationIntelligencePanel';
import { ActiveAlertsPanel } from '@/components/dashboard/ActiveAlertsPanel';
import { EnvironmentalForecastChart } from '@/components/dashboard/EnvironmentalForecastChart';
import { QuickActionsBar } from '@/components/dashboard/QuickActionsBar';
import { DASHBOARD_KPIS } from '@/data/dashboardData';
import { Radio, ShieldAlert } from 'lucide-react';

export const Dashboard: React.FC = () => {
  return (
    <PageContainer
      title="Mission Control"
      subtitle="Antarctic Navigation Decision Support — Multi-Sensor Intelligence, Iceberg Tracking & Fuel-Optimal Route Recommendation"
      actions={
        <div className="flex items-center gap-2">
          {/* Small Status Indicator */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black text-white text-xs font-mono font-bold shadow-xs">
            <Radio className="w-3.5 h-3.5 text-white animate-pulse" />
            <span>LIVE SIMULATION / ACTIVE</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-zinc-200 text-xs font-mono text-zinc-700 shadow-xs">
            <ShieldAlert className="w-3.5 h-3.5 text-black" />
            <span>RIO MARGIN: <strong className="text-zinc-950 font-bold">+18 NOMINAL</strong></span>
          </div>
        </div>
      }
    >
      <div className="space-y-6">
        {/* 1. 6 KPI Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5">
          {DASHBOARD_KPIS.map((kpi) => (
            <KPICard key={kpi.id} data={kpi} />
          ))}
        </div>

        {/* 2. Main Operational Layout Grid: Dominant Map on Left, Intelligence & Alerts on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Dominant Left/Center Column: Antarctic Map + 72-Hour Environmental Forecast */}
          <div className="lg:col-span-8 space-y-6">
            {/* Main Antarctic Map (Dominant Visual Element) */}
            <AntarcticMap />

            {/* 72-Hour Environmental Dynamics & Risk Forecast Chart */}
            <EnvironmentalForecastChart />
          </div>

          {/* Right Column: Navigation Intelligence Panel, Active Alerts & Fast Launch Quick Actions */}
          <div className="lg:col-span-4 space-y-6 flex flex-col justify-between">
            {/* Navigation Intelligence Panel */}
            <NavigationIntelligencePanel />

            {/* Active Alerts Panel */}
            <ActiveAlertsPanel />

            {/* Quick Actions Bar */}
            <QuickActionsBar />
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default Dashboard;
