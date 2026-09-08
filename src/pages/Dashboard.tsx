import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { KPICard } from '@/components/dashboard/KPICard';
import { AntarcticMap } from '@/components/map/AntarcticMap';
import { NavigationIntelligencePanel } from '@/components/dashboard/NavigationIntelligencePanel';
import { ActiveAlertsPanel } from '@/components/dashboard/ActiveAlertsPanel';
import { EnvironmentalForecastChart } from '@/components/dashboard/EnvironmentalForecastChart';
import { QuickActionsBar } from '@/components/dashboard/QuickActionsBar';
import { DASHBOARD_KPIS } from '@/data/dashboardData';

export const Dashboard: React.FC = () => {
  return (
    <PageContainer
      title="Mission Control"
      subtitle="Antarctic Navigation Decision Support — Multi-Sensor Intelligence, Iceberg Tracking & Fuel-Optimal Route"
      actions={
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-zinc-900 px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs">
            LIVE SIMULATION / ACTIVE
          </span>
          <span className="hidden sm:inline-flex rounded-full border border-zinc-200 bg-white px-3.5 py-1.5 text-xs font-medium text-zinc-700 shadow-2xs">
            RIO MARGIN: <strong className="ml-1 text-zinc-950 font-bold">+18 NOMINAL</strong>
          </span>
        </div>
      }
    >
      <div className="space-y-6">
        {/* 1. 6 KPI Cards Grid — Clean & Simple */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
          {DASHBOARD_KPIS.map((kpi) => (
            <KPICard key={kpi.id} data={kpi} />
          ))}
        </div>

        {/* 2. Map + Intelligence & Actions Grid */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          {/* Left / Center Column (Span 2): Antarctic Map & 72-Hour Environmental Dynamics */}
          <div className="xl:col-span-2 space-y-6">
            <AntarcticMap heightClass="h-[520px] sm:h-[580px] lg:h-[640px]" />
            <EnvironmentalForecastChart />
          </div>

          {/* Right Column: Navigation Intelligence + Alerts + Quick Fast Launch */}
          <div className="space-y-6 flex flex-col justify-between">
            <NavigationIntelligencePanel />
            <ActiveAlertsPanel />
            <QuickActionsBar />
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default Dashboard;
