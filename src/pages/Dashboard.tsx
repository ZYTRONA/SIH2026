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
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-ice-500/10 border border-ice-500/30 text-xs font-mono text-ice-300">
            <Radio className="w-3.5 h-3.5 text-ice-400 animate-pulse" />
            <span className="font-semibold">LIVE SIMULATION / DEMO MODE</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded bg-polar-900 border border-polar-700/60 text-xs font-mono text-slate-300">
            <ShieldAlert className="w-3.5 h-3.5 text-emerald-400" />
            <span>RIO MARGIN: +18 NOMINAL</span>
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
