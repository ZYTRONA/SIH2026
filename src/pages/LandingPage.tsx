import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Compass,
  Navigation,
  Snowflake,
  Mountain,
  ShieldCheck,
  HardDrive,
  ArrowRight,
  Send,
  X,
  Radio,
  Check,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [briefingModalOpen, setBriefingModalOpen] = useState(false);
  const [briefingSubmitted, setBriefingSubmitted] = useState(false);
  const [briefingForm, setBriefingForm] = useState({
    name: '',
    role: '',
    organization: '',
    vesselClass: 'PC4 Ice-Class Expedition',
    destination: 'Bharati Antarctic Station (69.41°S, 76.19°E)',
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBriefingSubmitted(true);
    setTimeout(() => {
      setBriefingSubmitted(false);
      setBriefingModalOpen(false);
    }, 2500);
  };

  const capabilities = [
    {
      icon: Snowflake,
      title: 'Spatiotemporal Sea-Ice AI',
      badge: 'ResUNet v3.2',
      description:
        'Neural deep learning models ingest multi-temporal Copernicus Sentinel-1 SAR imagery to forecast sea-ice concentration, thickness, and floe convergence across 72-hour lookaheads.',
      path: '/sea-ice',
      metric: '89.4% Accuracy',
    },
    {
      icon: Mountain,
      title: 'Iceberg Drift & Radar Tracking',
      badge: 'Sentinel-1 SAR',
      description:
        'Continuous orbital detection and hydrodynamic Lagrangian trajectory modeling for 37+ tracked Antarctic icebergs, computing collision probabilities and incursion windows in real time.',
      path: '/icebergs',
      metric: '37+ Tracked Targets',
    },
    {
      icon: ShieldCheck,
      title: 'IMO POLARIS Risk Intelligence',
      badge: 'RIO Outcome Matrix',
      description:
        'Standardized IMO Polar Code methodology computing dynamic Risk Index Outcomes (RIO = Σ(Ci × RIVi)) across all vessel ice classes (PC1 through PC7) to safeguard hull structural integrity.',
      path: '/risk',
      metric: 'PC1–PC7 Compliant',
    },
    {
      icon: Navigation,
      title: 'Multi-Objective Pareto Routing',
      badge: 'A* + NSGA-II',
      description:
        'Evolutionary multi-objective pathfinding solving non-dominated Pareto trade-offs between transit duration, heavy marine fuel consumption, and cryospheric hazard exposure.',
      path: '/routes',
      metric: '14.2% Fuel Savings',
    },
    {
      icon: HardDrive,
      title: 'Autonomous Edge Resilience',
      badge: 'Jetson AGX 48GB',
      description:
        'Shipboard edge inference capability running locally on NVIDIA Jetson AGX Orin hardware with preloaded 48.2 GB cryospheric caches to guarantee zero downtime during polar satellite blackouts.',
      path: '/system',
      metric: '100% Offline Edge',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-[#1d1d1f] antialiased selection:bg-[#0066cc] selection:text-white flex flex-col justify-between">
      {/* 1. APPLE UNIFIED FROSTED NAV BAR */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/90 border-b border-[#e0e0e0] text-[#1d1d1f] shadow-xs">
        <div className="max-w-[1440px] mx-auto h-14 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Discrete Logo */}
          <Link to="/" className="flex items-center gap-2.5 group select-none">
            <div className="h-7 w-7 rounded-[8px] bg-[#1d1d1f] text-white flex items-center justify-center font-bold shadow-xs">
              <Radio className="w-3.5 h-3.5" />
            </div>
            <span className="text-[14px] font-semibold tracking-[-0.12px] text-[#1d1d1f]">
              POLARIS <span className="font-light text-neutral-400">AI</span>
            </span>
          </Link>

          {/* Nav Links in SF Pro Text 13px */}
          <nav className="hidden md:flex items-center gap-8 text-[13px] font-normal text-neutral-600">
            <a href="#overview" className="hover:text-[#0066cc] transition-colors">
              Overview
            </a>
            <a href="#ai-engine" className="hover:text-[#0066cc] transition-colors">
              AI Engine
            </a>
            <a href="#capabilities" className="hover:text-[#0066cc] transition-colors">
              Capabilities
            </a>
            <a href="#architecture" className="hover:text-[#0066cc] transition-colors">
              Edge Architecture
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setBriefingModalOpen(true)}
              className="text-[13px] text-neutral-600 hover:text-[#0066cc] transition-colors hidden sm:inline-flex px-2 py-1 font-normal cursor-pointer"
            >
              Expedition Briefing
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="btn-apple-primary !min-h-[34px] !h-[34px] !px-4 !py-1 !text-[13px]"
            >
              <span>Launch Cockpit</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* 3. HERO TILE (Product Tile Light #ffffff) */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 pb-20 bg-white" id="overview">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f5f5f7] border border-[#e0e0e0] text-[12px] text-neutral-700 font-normal">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Autonomous Cryospheric Navigation System</span>
          </div>

          {/* Hero Display 56px / 600 weight / negative tracking */}
          <h1 className="text-[36px] sm:text-[48px] lg:text-[56px] font-semibold text-[#1d1d1f] tracking-[-0.28px] leading-[1.07]">
            Antarctic Navigation. <br className="hidden sm:block" />
            <span className="font-normal text-neutral-600">Engineered for Extremes.</span>
          </h1>

          {/* Body 17px / 400 weight / 1.47 line-height / -0.374px letter-spacing */}
          <p className="text-[17px] sm:text-[21px] text-neutral-600 max-w-2xl mx-auto font-normal leading-[1.47] tracking-[-0.374px]">
            POLARIS AI turns satellite radar feeds, deep learning ice forecasts, and hydrodynamic iceberg tracking into safe, fuel-optimal maritime routing across polar oceans.
          </p>

          {/* Dual Action Blue Pill CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="btn-apple-primary !px-7 !py-3 !text-[17px]"
            >
              <Compass className="w-4 h-4" />
              <span>Launch Mission Control</span>
            </button>
            <button
              onClick={() => navigate('/icebergs')}
              className="btn-apple-secondary !px-7 !py-3 !text-[17px]"
            >
              <span>Inspect Iceberg Radar</span>
            </button>
          </div>

          {/* Subtle Telemetry Strip */}
          <div className="pt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto text-center">
            <div className="p-4 rounded-[18px] bg-[#f5f5f7] border border-[#e0e0e0]">
              <span className="text-[12px] text-neutral-500 block">SAR Ground Truth</span>
              <span className="text-[24px] font-semibold text-[#1d1d1f] tracking-tight">89.4%</span>
            </div>
            <div className="p-4 rounded-[18px] bg-[#f5f5f7] border border-[#e0e0e0]">
              <span className="text-[12px] text-neutral-500 block">Tracked Icebergs</span>
              <span className="text-[24px] font-semibold text-[#1d1d1f] tracking-tight">37+</span>
            </div>
            <div className="p-4 rounded-[18px] bg-[#f5f5f7] border border-[#e0e0e0]">
              <span className="text-[12px] text-neutral-500 block">Fuel Reduction</span>
              <span className="text-[24px] font-semibold text-[#1d1d1f] tracking-tight">14.2%</span>
            </div>
            <div className="p-4 rounded-[18px] bg-[#f5f5f7] border border-[#e0e0e0]">
              <span className="text-[12px] text-neutral-500 block">Edge Inference</span>
              <span className="text-[24px] font-semibold text-[#1d1d1f] tracking-tight">100% Offline</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PRODUCT TILE DARK (Near-Black Tile 1 #272729) */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-[#272729] text-white" id="ai-engine">
        <div className="max-w-[1440px] mx-auto space-y-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-[14px] font-normal text-[#2997ff] uppercase tracking-wider">
              Core Predictive Engine
            </span>
            <h2 className="text-[32px] sm:text-[40px] font-semibold tracking-[-0.28px] text-white leading-tight">
              High-Resolution Cryospheric Forecasting & Lagrangian Hydrodynamic Kinematics
            </h2>
            <p className="text-[17px] text-[#cccccc] font-normal leading-[1.47] tracking-[-0.374px]">
              Standard marine routing models fail in polar pack ice where mechanical floe deformation and sudden katabatic wind squalls create extreme compressive stress. POLARIS fuses high-frequency SAR radar with numerical ocean current vectors to predict opening leads 72 hours in advance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="p-6 rounded-[18px] bg-[#2a2a2c] border border-neutral-700 space-y-2">
              <span className="text-[12px] text-neutral-400 font-normal">Sea-Ice Concentration Accuracy</span>
              <p className="text-[34px] font-semibold text-white tracking-tight">89.4%</p>
              <p className="text-[14px] text-[#cccccc] leading-relaxed">
                Cross-verified against multi-temporal Sentinel-1 dual-polarization synthetic aperture radar.
              </p>
            </div>
            <div className="p-6 rounded-[18px] bg-[#2a2a2c] border border-neutral-700 space-y-2">
              <span className="text-[12px] text-neutral-400 font-normal">Drift Prediction Window</span>
              <p className="text-[34px] font-semibold text-white tracking-tight">72 Hours</p>
              <p className="text-[14px] text-[#cccccc] leading-relaxed">
                Continuous Lagrangian trajectory modeling updating every 60s with ocean current vectors.
              </p>
            </div>
            <div className="p-6 rounded-[18px] bg-[#2a2a2c] border border-neutral-700 space-y-2">
              <span className="text-[12px] text-neutral-400 font-normal">Heavy Bunker Fuel Savings</span>
              <p className="text-[34px] font-semibold text-white tracking-tight">14.2%</p>
              <p className="text-[14px] text-[#cccccc] leading-relaxed">
                Average reduction via intelligent open-water lead selection and icebreaker escort avoidance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PRODUCT TILE PARCHMENT: MODULAR INTELLIGENCE SUITE (#f5f5f7) */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-[#f5f5f7]" id="capabilities">
        <div className="max-w-[1440px] mx-auto space-y-10">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-[14px] font-normal text-[#0066cc] uppercase tracking-wider">
              Intelligence Suite
            </span>
            <h2 className="text-[32px] sm:text-[40px] font-semibold tracking-tight text-[#1d1d1f]">
              Modular Navigation Capabilities
            </h2>
            <p className="text-[17px] text-neutral-600 font-normal leading-[1.47] tracking-[-0.374px]">
              Every subsystem is engineered to meet stringent Arctic & Antarctic maritime safety regulations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap) => {
              const Icon = cap.icon;
              return (
                <div
                  key={cap.title}
                  onClick={() => navigate(cap.path)}
                  className="apple-card hover:border-neutral-400 flex flex-col justify-between cursor-pointer group min-h-[280px]"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="h-11 w-11 rounded-full bg-[#1d1d1f] text-white flex items-center justify-center group-hover:bg-[#0066cc] transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="px-3 py-1 rounded-full bg-[#f5f5f7] border border-[#e0e0e0] text-[12px] font-normal text-neutral-700">
                        {cap.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-[18px] font-semibold text-[#1d1d1f] tracking-tight">
                        {cap.title}
                      </h3>
                      <p className="text-[14px] text-neutral-600 leading-relaxed font-normal mt-2">
                        {cap.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#f0f0f0] flex items-center justify-between text-[14px]">
                    <span className="font-semibold text-[#1d1d1f]">{cap.metric}</span>
                    <span className="apple-link group-hover:translate-x-1 transition-transform">
                      Explore Module &rarr;
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. PRODUCT TILE DARK 2: EDGE DEPLOYMENT ARCHITECTURE (#2a2a2c) */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-[#2a2a2c] text-white" id="architecture">
        <div className="max-w-[1440px] mx-auto rounded-[18px] bg-[#252527] border border-neutral-700 p-8 sm:p-12 space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-[14px] font-normal text-[#2997ff] uppercase tracking-wider">
              Shipboard Edge Resilience
            </span>
            <span className="px-3 py-1 rounded-full bg-white text-[#1d1d1f] text-[12px] font-semibold">
              100% Offline Capability
            </span>
          </div>

          <h2 className="text-[28px] sm:text-[36px] font-semibold tracking-tight text-white max-w-3xl leading-tight">
            NVIDIA Jetson AGX Orin Edge Deployment with 48.2 GB Local Cryospheric Cache
          </h2>

          <p className="text-[17px] text-[#cccccc] max-w-4xl font-normal leading-[1.47] tracking-[-0.374px]">
            Polar satellite links are vulnerable to severe ionospheric scintillation and solar storm blackouts. POLARIS runs full inference on shipboard edge hardware, executing dynamic path re-planning in sub-second latency with zero cloud dependency.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => navigate('/system')}
              className="btn-apple-primary"
            >
              <span>View System & Edge Telemetry</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 7. APPLE DENSE FOOTER (#f5f5f7, line-height 2.41) */}
      <footer className="w-full bg-[#f5f5f7] border-t border-[#e0e0e0] px-4 sm:px-6 lg:px-8 py-16 text-[#333333]">
        <div className="max-w-[1440px] mx-auto grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 space-y-3">
            <span className="text-[21px] font-semibold tracking-tight text-[#1d1d1f]">
              POLARIS AI
            </span>
            <p className="text-[14px] text-neutral-600 leading-relaxed max-w-md font-normal">
              Polar Adaptive Route Intelligence System. Standardized IMO Polar Code methodology and multi-sensor machine learning for high-latitude autonomous voyage execution.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-[14px] font-semibold text-[#1d1d1f]">Navigation</h4>
            <ul className="text-[17px] leading-[2.41] text-neutral-600 font-normal">
              <li><Link to="/dashboard" className="hover:text-[#0066cc]">Mission Control</Link></li>
              <li><Link to="/mission-planner" className="hover:text-[#0066cc]">Route Planner</Link></li>
              <li><Link to="/routes" className="hover:text-[#0066cc]">Pareto Optimizer</Link></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="text-[14px] font-semibold text-[#1d1d1f]">Intelligence</h4>
            <ul className="text-[17px] leading-[2.41] text-neutral-600 font-normal">
              <li><Link to="/icebergs" className="hover:text-[#0066cc]">Iceberg Radar</Link></li>
              <li><Link to="/sea-ice" className="hover:text-[#0066cc]">Sea-Ice Forecast</Link></li>
              <li><Link to="/risk" className="hover:text-[#0066cc]">Risk Matrix (RIO)</Link></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="text-[14px] font-semibold text-[#1d1d1f]">System</h4>
            <ul className="text-[17px] leading-[2.41] text-neutral-600 font-normal">
              <li><Link to="/system" className="hover:text-[#0066cc]">Edge Telemetry</Link></li>
              <li><Link to="/settings" className="hover:text-[#0066cc]">Configuration</Link></li>
            </ul>
          </div>
        </div>

        <div className="max-w-[1440px] mx-auto mt-12 pt-8 border-t border-[#e0e0e0] flex flex-col sm:flex-row items-center justify-between text-[12px] text-[#7a7a7a] gap-2">
          <span>&copy; 2026 POLARIS AI Polar Marine Research. All rights reserved.</span>
          <span>Universal Time Coordinated (UTC) Sync Enabled.</span>
        </div>
      </footer>

      {/* Expedition Briefing Modal */}
      <AnimatePresence>
        {briefingModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="w-full max-w-lg bg-white rounded-[18px] border border-[#e0e0e0] shadow-2xl p-6 space-y-4 text-[#1d1d1f]"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#e0e0e0]">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-[#1d1d1f] text-white flex items-center justify-center">
                    <Send className="w-4 h-4" />
                  </div>
                  <h3 className="text-[18px] font-semibold text-[#1d1d1f]">
                    Expedition Briefing Request
                  </h3>
                </div>
                <button
                  onClick={() => setBriefingModalOpen(false)}
                  className="p-1.5 rounded-full hover:bg-[#f5f5f7] text-neutral-500 hover:text-[#1d1d1f]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {briefingSubmitted ? (
                <div className="py-8 text-center space-y-2">
                  <div className="h-12 w-12 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-[18px] font-semibold text-[#1d1d1f]">Briefing Dossier Generated</h4>
                  <p className="text-[14px] text-neutral-600">
                    Autonomous voyage telemetry profile dispatched to bridge ECDIS simulator.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4 text-[14px]">
                  <div>
                    <label className="block text-[12px] font-semibold text-neutral-600 mb-1">
                      Navigator Name / ID
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Capt. E. Shackleton"
                      value={briefingForm.name}
                      onChange={(e) => setBriefingForm({ ...briefingForm, name: e.target.value })}
                      className="w-full h-11 px-4 rounded-[11px] border border-[#e0e0e0] bg-[#f5f5f7] text-[#1d1d1f] focus:outline-none focus:border-[#0066cc]"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-semibold text-neutral-600 mb-1">
                      Organization
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="National Centre for Polar and Ocean Research"
                      value={briefingForm.organization}
                      onChange={(e) => setBriefingForm({ ...briefingForm, organization: e.target.value })}
                      className="w-full h-11 px-4 rounded-[11px] border border-[#e0e0e0] bg-[#f5f5f7] text-[#1d1d1f] focus:outline-none focus:border-[#0066cc]"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-semibold text-neutral-600 mb-1">
                      Vessel Ice-Class
                    </label>
                    <select
                      value={briefingForm.vesselClass}
                      onChange={(e) => setBriefingForm({ ...briefingForm, vesselClass: e.target.value })}
                      className="w-full h-11 px-4 rounded-[11px] border border-[#e0e0e0] bg-[#f5f5f7] text-[#1d1d1f] focus:outline-none focus:border-[#0066cc]"
                    >
                      <option>PC1 Polar Class (Year-round ice)</option>
                      <option>PC3 Heavy Icebreaker</option>
                      <option>PC4 Ice-Class Expedition</option>
                      <option>PC7 Light Summer Ice</option>
                    </select>
                  </div>

                  <div className="pt-2 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setBriefingModalOpen(false)}
                      className="btn-apple-secondary !min-h-[38px] !py-2 !text-[14px]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn-apple-primary !min-h-[38px] !py-2 !text-[14px]"
                    >
                      Generate Voyage Dossier
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LandingPage;
