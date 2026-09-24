import React, { useState, useRef, useEffect } from 'react';
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
  Check,
  Play,
  Pause,
  Volume2,
  VolumeX,
  FileCheck,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface VideoFeed {
  id: string;
  name: string;
  badge: string;
  location: string;
  url: string;
  fallbackPoster: string;
}

const VIDEO_FEEDS: VideoFeed[] = [
  {
    id: 'feed-bow',
    name: 'Icebreaker Bow Camera',
    badge: '1080p Live',
    location: 'Prydz Bay Ice Shelf · 68°34.8\' S, 77°58.2\' E',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-cargo-ship-sailing-in-the-sea-41584-large.mp4',
    fallbackPoster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1920&q=80',
  },
  {
    id: 'feed-icebergs',
    name: 'Antarctic Cryosphere Zone',
    badge: 'Sentinel SAR Feed',
    location: 'Southern Ocean Corridor · 62°12.4\' S, 45°20.1\' E',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-icebergs-floating-in-the-antarctic-ocean-43224-large.mp4',
    fallbackPoster: 'https://images.unsplash.com/photo-1483181957632-8bda974cbc91?auto=format&fit=crop&w=1920&q=80',
  },
  {
    id: 'feed-swell',
    name: 'Roaring Forties Swell Dynamics',
    badge: 'ECMWF Stream',
    location: 'Drake & Agulhas Confluence · 54°18.0\' S, 20°00.0\' E',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-rough-sea-waves-crashing-against-rocks-42795-large.mp4',
    fallbackPoster: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80',
  },
];

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeFeed, setActiveFeed] = useState<VideoFeed>(VIDEO_FEEDS[0]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [briefingModalOpen, setBriefingModalOpen] = useState(false);
  const [briefingSubmitted, setBriefingSubmitted] = useState(false);
  const [briefingForm, setBriefingForm] = useState({
    name: '',
    role: 'Expedition Master Navigator',
    organization: 'National Centre for Polar and Ocean Research (NCPOR)',
    vesselClass: 'PC3 Heavy Icebreaker (SA Agulhas II)',
    destination: 'Bharati Antarctic Base, Prydz Bay (69.41°S, 76.19°E)',
  });

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, [activeFeed]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBriefingSubmitted(true);
    setTimeout(() => {
      setBriefingSubmitted(false);
      setBriefingModalOpen(false);
      navigate('/dashboard');
    }, 2000);
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      const navOffset = 70;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - navOffset,
        behavior: 'smooth',
      });
    }
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
      badge: 'Jetson AGX 64GB',
      description:
        'Shipboard edge inference running locally on NVIDIA Jetson AGX Orin hardware with preloaded 48.2 GB cryospheric caches to guarantee zero downtime during polar satellite blackouts.',
      path: '/edge-console',
      metric: '100% Offline Edge',
    },
    {
      icon: FileCheck,
      title: 'IMO PWOM Compliance Reports',
      badge: 'Regulatory Audit',
      description:
        'Automated generation of official Polar Water Operational Manual (PWOM) logs and Carbon Intensity Indicator (CII) verified records for maritime expedition authorities.',
      path: '/reports',
      metric: 'Audit Certified',
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f] antialiased selection:bg-[#0066cc] selection:text-white flex flex-col justify-between">
      {/* ========================================================================= */}
      {/* APPLE UNIFIED FROSTED GLASS NAVIGATION BAR (Sticky 56px)                  */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/85 border-b border-[#e0e0e0] text-[#1d1d1f]">
        <div className="max-w-[1440px] mx-auto h-14 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Mark */}
          <Link to="/" className="flex items-center gap-2.5 group select-none">
            <div className="h-7 w-7 rounded-[8px] bg-[#1d1d1f] text-white flex items-center justify-center font-bold">
              <Compass className="w-4 h-4 text-white" />
            </div>
            <span className="text-[15px] font-semibold tracking-[-0.12px] text-[#1d1d1f]">
              POLARIS <span className="font-light text-neutral-400">AI</span>
            </span>
          </Link>

          {/* Clean Section Navigation in SF Pro 13px */}
          <nav className="hidden md:flex items-center gap-8 text-[13px] font-normal text-neutral-600">
            <a
              href="#overview"
              onClick={(e) => scrollToSection(e, 'overview')}
              className="hover:text-[#0066cc] transition-colors cursor-pointer"
            >
              Overview
            </a>
            <a
              href="#ai-engine"
              onClick={(e) => scrollToSection(e, 'ai-engine')}
              className="hover:text-[#0066cc] transition-colors cursor-pointer"
            >
              Predictive Engine
            </a>
            <a
              href="#capabilities"
              onClick={(e) => scrollToSection(e, 'capabilities')}
              className="hover:text-[#0066cc] transition-colors cursor-pointer"
            >
              Capabilities
            </a>
            <a
              href="#architecture"
              onClick={(e) => scrollToSection(e, 'architecture')}
              className="hover:text-[#0066cc] transition-colors cursor-pointer"
            >
              Edge Architecture
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setBriefingModalOpen(true)}
              className="text-[13px] text-neutral-600 hover:text-[#0066cc] transition-colors hidden sm:inline-flex px-2 py-1 font-normal cursor-pointer"
            >
              Expedition Dossier
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="btn-apple-primary !min-h-[36px] !h-[36px] !px-4 !py-1 !text-[13px]"
            >
              <span>Launch Mission Control</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded-lg border border-[#e0e0e0] text-[#1d1d1f] hover:bg-[#f5f5f7]"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Compass className="w-4 h-4 text-[#0066cc]" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-[#e0e0e0] px-4 py-4 space-y-2 text-[14px]"
            >
              <a
                href="#overview"
                onClick={(e) => scrollToSection(e, 'overview')}
                className="block px-3 py-2 rounded-[8px] hover:bg-[#f5f5f7] text-[#1d1d1f] cursor-pointer"
              >
                Overview
              </a>
              <a
                href="#ai-engine"
                onClick={(e) => scrollToSection(e, 'ai-engine')}
                className="block px-3 py-2 rounded-[8px] hover:bg-[#f5f5f7] text-[#1d1d1f] cursor-pointer"
              >
                Predictive Engine
              </a>
              <a
                href="#capabilities"
                onClick={(e) => scrollToSection(e, 'capabilities')}
                className="block px-3 py-2 rounded-[8px] hover:bg-[#f5f5f7] text-[#1d1d1f] cursor-pointer"
              >
                Capabilities
              </a>
              <a
                href="#architecture"
                onClick={(e) => scrollToSection(e, 'architecture')}
                className="block px-3 py-2 rounded-[8px] hover:bg-[#f5f5f7] text-[#1d1d1f] cursor-pointer"
              >
                Edge Architecture
              </a>
              <div className="pt-2 border-t border-[#f0f0f0]">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/dashboard');
                  }}
                  className="w-full btn-apple-primary !min-h-[40px] !text-[14px]"
                >
                  <span>Launch Mission Control</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ========================================================================= */}
      {/* 3. HERO PRODUCT TILE (LIGHT CANVAS #ffffff)                               */}
      {/* ========================================================================= */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-16 bg-[#ffffff] scroll-mt-16" id="overview">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Pill Capsule Subtitle */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f5f5f7] border border-[#e0e0e0] text-[12px] text-neutral-700 font-normal">
            <span className="h-2 w-2 rounded-full bg-[#0066cc] animate-pulse" />
            <span>Autonomous Cryospheric Decision Intelligence</span>
          </div>

          {/* Hero Display Headline (56px / 600 / 1.07 line-height / -0.28px tracking) */}
          <h1 className="text-[36px] sm:text-[48px] lg:text-[56px] font-semibold text-[#1d1d1f] tracking-[-0.28px] leading-[1.07]">
            Antarctic Navigation. <br className="hidden sm:block" />
            <span className="font-normal text-neutral-600">Engineered for Extremes.</span>
          </h1>

          {/* Body Copy (17px / 400 / 1.47 line-height / -0.374px tracking) */}
          <p className="text-[17px] sm:text-[21px] text-neutral-600 max-w-2xl mx-auto font-normal leading-[1.47] tracking-[-0.374px]">
            POLARIS AI transforms satellite Synthetic Aperture Radar feeds, ResUNet v3.2 sea-ice forecasts, and hydrodynamic iceberg tracking into safe, fuel-optimal maritime routing across polar oceans.
          </p>

          {/* Action Blue Pill CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="btn-apple-primary !px-7 !py-3 !text-[17px]"
            >
              <Compass className="w-4 h-4" />
              <span>Launch Mission Control</span>
            </button>
            <button
              onClick={() => navigate('/routes')}
              className="btn-apple-secondary !px-7 !py-3 !text-[17px]"
            >
              <span>Explore Pareto Routing</span>
            </button>
          </div>
        </div>

        {/* ======================================================================= */}
        {/* MUSEUM-GALLERY POLAR VIDEO FRAME (Near-Black Tile 3 #252527)           */}
        {/* ======================================================================= */}
        <div className="max-w-[1280px] mx-auto mt-14 rounded-[18px] bg-[#252527] border border-neutral-700 overflow-hidden relative shadow-none">
          {/* Top Video Telemetry Ribbon */}
          <div className="px-6 py-3.5 bg-[#272729] border-b border-neutral-700 flex flex-wrap items-center justify-between gap-3 text-[12px] text-white">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-semibold text-white tracking-tight">POLAR STREAM FEED:</span>
              <span className="text-[#cccccc] font-normal">{activeFeed.location}</span>
            </div>

            <div className="flex items-center gap-4 text-[#cccccc]">
              <span>SOG: <strong className="text-white font-semibold">14.8 kts</strong></span>
              <span>HDG: <strong className="text-white font-semibold">164° T</strong></span>
              <span className="text-[#2997ff] font-semibold">RIO: +14.8 (Safe)</span>
            </div>
          </div>

          {/* Video Container */}
          <div className="relative aspect-video w-full max-h-[640px] bg-[#1d1d1f] overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              poster={activeFeed.fallbackPoster}
              className="w-full h-full object-cover filter brightness-[0.78] contrast-[1.08]"
            >
              <source src={activeFeed.url} type="video/mp4" />
            </video>

            {/* Video Tactical Overlay Information */}
            <div className="absolute top-6 left-6 p-4 rounded-[14px] bg-[#272729]/80 backdrop-blur-md border border-neutral-700 text-white max-w-xs space-y-1 hidden sm:block">
              <span className="text-[11px] text-[#2997ff] uppercase font-semibold block">Live Bridge Observation</span>
              <p className="text-[14px] font-semibold text-white">{activeFeed.name}</p>
              <p className="text-[12px] text-[#cccccc] font-normal">Dual-polarization Sentinel-1 radar correlation active.</p>
            </div>

            {/* Translucent Gray 44px Control Chips (Apple HIG) */}
            <div className="absolute bottom-6 right-6 flex items-center gap-3">
              <button
                onClick={togglePlay}
                title={isPlaying ? 'Pause Feed' : 'Play Feed'}
                className="btn-apple-icon !bg-[rgba(210,210,215,0.64)] hover:!bg-[rgba(210,210,215,0.85)] text-[#1d1d1f]"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-[#0066cc]" />}
              </button>

              <button
                onClick={toggleMute}
                title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                className="btn-apple-icon !bg-[rgba(210,210,215,0.64)] hover:!bg-[rgba(210,210,215,0.85)] text-[#1d1d1f]"
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-[#1d1d1f]" /> : <Volume2 className="w-4 h-4 text-[#0066cc]" />}
              </button>
            </div>
          </div>

          {/* Bottom Feed Selector Bar */}
          <div className="px-6 py-4 bg-[#2a2a2c] border-t border-neutral-700 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-[12px] text-neutral-400 mr-2 font-normal">Camera Feeds:</span>
              {VIDEO_FEEDS.map((feed) => {
                const isActive = activeFeed.id === feed.id;
                return (
                  <button
                    key={feed.id}
                    onClick={() => setActiveFeed(feed)}
                    className={`px-4 py-1.5 rounded-full text-[13px] font-normal transition-all duration-150 active:scale-95 ${isActive
                        ? 'bg-[#0066cc] text-white font-semibold'
                        : 'bg-[#272729] text-[#cccccc] hover:text-white border border-neutral-700'
                      }`}
                  >
                    <span>{feed.name}</span>
                  </button>
                );
              })}
            </div>

            <span className="text-[12px] text-neutral-400 font-normal">
              Continuous 60s Dead-Reckoning Ingest
            </span>
          </div>
        </div>

        {/* 4 Utility Metric Cards (18px radius, #e0e0e0 hairlines, zero shadows) */}
        <div className="pt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto text-center">
          <div className="apple-card p-5">
            <span className="text-[12px] text-neutral-500 block">SAR Ground Truth</span>
            <span className="text-[28px] font-semibold text-[#1d1d1f] tracking-tight">89.4%</span>
          </div>
          <div className="apple-card p-5">
            <span className="text-[12px] text-neutral-500 block">Tracked Icebergs</span>
            <span className="text-[28px] font-semibold text-[#1d1d1f] tracking-tight">37 Targets</span>
          </div>
          <div className="apple-card p-5">
            <span className="text-[12px] text-neutral-500 block">Fuel Reduction</span>
            <span className="text-[28px] font-semibold text-[#1d1d1f] tracking-tight">14.2%</span>
          </div>
          <div className="apple-card p-5">
            <span className="text-[12px] text-neutral-500 block">Edge Inference</span>
            <span className="text-[28px] font-semibold text-[#1d1d1f] tracking-tight">100% Offline</span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. PRODUCT TILE DARK (Near-Black Tile 1 #272729)                           */}
      {/* ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-[#272729] text-white scroll-mt-16" id="ai-engine">
        <div className="max-w-[1440px] mx-auto space-y-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-[14px] font-normal text-[#2997ff] uppercase tracking-wider">
              Core Predictive Engine
            </span>
            <h2 className="text-[34px] sm:text-[40px] font-semibold tracking-[-0.28px] text-white leading-tight">
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
              <p className="text-[14px] text-[#cccccc] leading-relaxed font-normal">
                Cross-verified against multi-temporal Sentinel-1 dual-polarization synthetic aperture radar.
              </p>
            </div>
            <div className="p-6 rounded-[18px] bg-[#2a2a2c] border border-neutral-700 space-y-2">
              <span className="text-[12px] text-neutral-400 font-normal">Drift Prediction Window</span>
              <p className="text-[34px] font-semibold text-white tracking-tight">72 Hours</p>
              <p className="text-[14px] text-[#cccccc] leading-relaxed font-normal">
                Continuous Lagrangian trajectory modeling updating every 60s with ocean current vectors.
              </p>
            </div>
            <div className="p-6 rounded-[18px] bg-[#2a2a2c] border border-neutral-700 space-y-2">
              <span className="text-[12px] text-neutral-400 font-normal">Heavy Bunker Fuel Savings</span>
              <p className="text-[34px] font-semibold text-white tracking-tight">14.2%</p>
              <p className="text-[14px] text-[#cccccc] leading-relaxed font-normal">
                Average reduction via intelligent open-water lead selection and icebreaker escort avoidance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. PRODUCT TILE PARCHMENT: MODULAR INTELLIGENCE SUITE (#f5f5f7)            */}
      {/* ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-[#f5f5f7] scroll-mt-16" id="capabilities">
        <div className="max-w-[1440px] mx-auto space-y-10">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-[14px] font-normal text-[#0066cc] uppercase tracking-wider">
              Intelligence Suite
            </span>
            <h2 className="text-[34px] sm:text-[40px] font-semibold tracking-tight text-[#1d1d1f]">
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
                  className="apple-card hover:border-neutral-400 flex flex-col justify-between cursor-pointer group min-h-[280px] active:scale-95"
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

      {/* ========================================================================= */}
      {/* 6. PRODUCT TILE DARK 2: EDGE DEPLOYMENT ARCHITECTURE (#2a2a2c)            */}
      {/* ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-[#2a2a2c] text-white scroll-mt-16" id="architecture">
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
              onClick={() => navigate('/edge-console')}
              className="btn-apple-primary"
            >
              <span>View System & Edge Telemetry</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. APPLE DENSE FOOTER (#f5f5f7, line-height 2.41)                         */}
      {/* ========================================================================= */}
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
              <li><Link to="/edge-console" className="hover:text-[#0066cc]">Edge Telemetry</Link></li>
              <li><Link to="/vessel-config" className="hover:text-[#0066cc]">Configuration</Link></li>
            </ul>
          </div>
        </div>

        <div className="max-w-[1440px] mx-auto mt-12 pt-8 border-t border-[#e0e0e0] flex flex-col sm:flex-row items-center justify-between text-[12px] text-[#7a7a7a] gap-2 font-normal">
          <span>&copy; 2026 POLARIS AI Polar Marine Research. All rights reserved.</span>
          <span>Universal Time Coordinated (UTC) Sync Enabled.</span>
        </div>
      </footer>

      {/* ========================================================================= */}
      {/* 8. EXPEDITION BRIEFING MODAL (Apple Card 18px radius)                      */}
      {/* ========================================================================= */}
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
                  className="p-1.5 rounded-full hover:bg-[#f5f5f7] text-neutral-500 hover:text-[#1d1d1f] cursor-pointer"
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
                  <p className="text-[14px] text-neutral-600 font-normal">
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
                      placeholder="Capt. V. Sharma (Expedition Master)"
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
                      value={briefingForm.organization}
                      onChange={(e) => setBriefingForm({ ...briefingForm, organization: e.target.value })}
                      className="w-full h-11 px-4 rounded-[11px] border border-[#e0e0e0] bg-[#f5f5f7] text-[#1d1d1f] focus:outline-none focus:border-[#0066cc]"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-semibold text-neutral-600 mb-1">
                      Vessel Ice-Class & Hull
                    </label>
                    <select
                      value={briefingForm.vesselClass}
                      onChange={(e) => setBriefingForm({ ...briefingForm, vesselClass: e.target.value })}
                      className="w-full h-11 px-4 rounded-[11px] border border-[#e0e0e0] bg-[#f5f5f7] text-[#1d1d1f] focus:outline-none focus:border-[#0066cc]"
                    >
                      <option>PC1 Polar Class (Year-round ice)</option>
                      <option>PC3 Heavy Icebreaker (SA Agulhas II)</option>
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
