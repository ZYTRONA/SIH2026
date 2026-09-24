import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { LandingPage } from '@/pages/LandingPage';
import { LoginPage } from '@/pages/LoginPage';
import { VesselConfig } from '@/pages/VesselConfig';
import { Dashboard } from '@/pages/Dashboard';
import { SeaIceForecast } from '@/pages/SeaIceForecast';
import { IcebergIntelligence } from '@/pages/IcebergIntelligence';
import { RiskIntelligence } from '@/pages/RiskIntelligence';
import { RouteOptimization } from '@/pages/RouteOptimization';
import { RouteComparison } from '@/pages/RouteComparison';
import { ExplainableAI } from '@/pages/ExplainableAI';
import { EdgeConsole } from '@/pages/EdgeConsole';
import { ReportsPage } from '@/pages/ReportsPage';
import { MissionPlanner } from '@/pages/MissionPlanner';
import { SystemStatus } from '@/pages/SystemStatus';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public & Access Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Mission Control Deck (Authenticated / Operational Layout) */}
        <Route element={<AppLayout />}>
          {/* Screen 3: Main Operations Dashboard (Judges & Captains first view) */}
          <Route path="dashboard" element={<Dashboard />} />

          {/* Screen 2: Vessel Configuration */}
          <Route path="vessel-config" element={<VesselConfig />} />
          <Route path="mission-planner" element={<MissionPlanner />} />

          {/* Screen 4: Sea Ice Forecasting (ResUNet) */}
          <Route path="sea-ice" element={<SeaIceForecast />} />

          {/* Screen 5: Iceberg Trajectory Prediction (XGBoost + Physics) */}
          <Route path="icebergs" element={<IcebergIntelligence />} />

          {/* Screen 6: Dynamic Risk Engine (IMO Polar Code RIO) */}
          <Route path="risk" element={<RiskIntelligence />} />

          {/* Screen 7: Route Optimization (A* + NSGA-II) */}
          <Route path="routes" element={<RouteOptimization />} />

          {/* Screen 8: Route Comparison */}
          <Route path="route-comparison" element={<RouteComparison />} />

          {/* Screen 9: Explainable AI (SHAP) */}
          <Route path="explainable-ai" element={<ExplainableAI />} />

          {/* Screen 10: Edge / Offline Console */}
          <Route path="edge-console" element={<EdgeConsole />} />

          {/* Screen 11: Reports & Export */}
          <Route path="reports" element={<ReportsPage />} />

          {/* System Telemetry */}
          <Route path="system" element={<SystemStatus />} />

          {/* Catch-all fallback */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
