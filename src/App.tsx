import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { LandingPage } from '@/pages/LandingPage';
import { Dashboard } from '@/pages/Dashboard';
import { MissionPlanner } from '@/pages/MissionPlanner';
import { SeaIceForecast } from '@/pages/SeaIceForecast';
import { IcebergIntelligence } from '@/pages/IcebergIntelligence';
import { RiskIntelligence } from '@/pages/RiskIntelligence';
import { RouteOptimization } from '@/pages/RouteOptimization';
import { ExplainableAI } from '@/pages/ExplainableAI';
import { DigitalTwin } from '@/pages/DigitalTwin';
import { SystemStatus } from '@/pages/SystemStatus';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public SEO & Product Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Mission Control Cockpit Deck */}
        <Route element={<AppLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="mission-planner" element={<MissionPlanner />} />
          <Route path="sea-ice" element={<SeaIceForecast />} />
          <Route path="icebergs" element={<IcebergIntelligence />} />
          <Route path="risk" element={<RiskIntelligence />} />
          <Route path="routes" element={<RouteOptimization />} />
          <Route path="explainability" element={<ExplainableAI />} />
          <Route path="digital-twin" element={<DigitalTwin />} />
          <Route path="system" element={<SystemStatus />} />
          {/* Catch-all fallback */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
