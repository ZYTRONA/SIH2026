import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Menu,
  Ship,
  Compass,
  Clock,
  Wifi,
  Bell,
  User,
  Shield,
  CheckCheck,
} from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { StatusIndicator } from './StatusIndicator';

const routeTitleMap: Record<string, { title: string; category: string }> = {
  '/dashboard': {
    title: 'Mission Control & Real-Time Overview',
    category: 'Operational Deck',
  },
  '/mission-planner': {
    title: 'Mission & Expedition Planner',
    category: 'Tactical Planning',
  },
  '/sea-ice': {
    title: 'Sea-Ice Concentration & Dynamics Forecast',
    category: 'Spatiotemporal AI',
  },
  '/icebergs': {
    title: 'Iceberg Intelligence & Drift Forecast',
    category: 'Satellite SAR / Hazard Tracking',
  },
  '/risk': {
    title: 'Polar Operational Risk Assessment (POLARIS POLAR Code)',
    category: 'Compliance & Safety Intelligence',
  },
  '/routes': {
    title: 'Adaptive Route Optimization & Waypoint Engine',
    category: 'Multi-Objective AI Navigation',
  },
  '/explainability': {
    title: 'Explainable AI & Decision Transparency',
    category: 'SHAP / Attributions & Model Trust',
  },
  '/digital-twin': {
    title: 'Vessel Digital Twin & Hull-Ice Telemetry',
    category: 'Physics-Informed Modeling',
  },
  '/system': {
    title: 'System Status & Ingestion Pipelines',
    category: 'Telemetry Infrastructure',
  },
};

export const Header: React.FC = () => {
  const location = useLocation();
  const {
    missionName,
    vesselName,
    vesselClass,
    operatorName,
    operatorRole,
    notifications,
    unreadCount,
    markAllNotificationsRead,
    setMobileSidebarOpen,
  } = useAppStore();

  const [utcTime, setUtcTime] = useState<string>('');
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [showProfileMenu, setShowProfileMenu] = useState<boolean>(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getUTCHours()).padStart(2, '0');
      const minutes = String(now.getUTCMinutes()).padStart(2, '0');
      const seconds = String(now.getUTCSeconds()).padStart(2, '0');
      setUtcTime(`${hours}:${minutes}:${seconds} UTC`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const currentRouteMeta = routeTitleMap[location.pathname] || {
    title: 'Command Center',
    category: 'Polar Intelligence',
  };

  const unread = unreadCount();

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 sm:px-6 bg-polar-900/95 border-b border-polar-700/60 backdrop-blur-md">
      {/* Left: Mobile Toggle & Dynamic Page Title */}
      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
        {/* Mobile menu button */}
        <button
          onClick={() => setMobileSidebarOpen(true)}
          className="flex lg:hidden items-center justify-center p-2 rounded text-slate-400 hover:text-slate-100 hover:bg-polar-800 border border-polar-700/50"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Dynamic page title */}
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="text-sm sm:text-base font-semibold text-slate-100 font-sans truncate tracking-tight">
              {currentRouteMeta.title}
            </h1>
          </div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-ice-400 truncate">
            {currentRouteMeta.category}
          </span>
        </div>
      </div>

      {/* Center / Right: Mission & Vessel Badges (Hidden on mobile/tablet screens) */}
      <div className="hidden xl:flex items-center gap-3">
        {/* Current Mission */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-polar-950/60 border border-polar-700/50 text-xs font-mono">
          <Compass className="w-3.5 h-3.5 text-ice-400 flex-shrink-0" />
          <span className="text-slate-400">MISSION:</span>
          <span className="text-slate-200 font-semibold">{missionName}</span>
        </div>

        {/* Vessel */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-polar-950/60 border border-polar-700/50 text-xs font-mono">
          <Ship className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
          <span className="text-slate-400">VESSEL:</span>
          <span className="text-slate-200 font-semibold">{vesselName}</span>
          <span className="text-[10px] px-1 py-0.2 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
            {vesselClass.split(' ')[0]}
          </span>
        </div>
      </div>

      {/* Right Controls & Operator Deck */}
      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
        {/* UTC Live Clock */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-polar-950/80 border border-polar-700/60 text-xs font-mono text-slate-300">
          <Clock className="w-3.5 h-3.5 text-ice-400" />
          <span className="tabular-nums font-medium">{utcTime || '00:00:00 UTC'}</span>
        </div>

        {/* Satellite / Connection Indicator */}
        <div
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded bg-polar-950/80 border border-polar-700/60 text-xs font-mono"
          title="Satellite Uplink Nominal (Inmarsat FleetBroadband / Starlink Polar)"
        >
          <Wifi className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-[11px] text-emerald-400 font-medium">UPLINK OK</span>
        </div>

        {/* Notifications Dropdown Toggle */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="relative p-2 rounded text-slate-400 hover:text-slate-100 hover:bg-polar-800 border border-polar-700/50 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unread > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[16px] h-4 px-1 rounded-full text-[9px] font-mono font-bold bg-ice-500 text-polar-950">
                {unread}
              </span>
            )}
          </button>

          {/* Notifications Flyout */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-lg bg-polar-900 border border-polar-700 shadow-xl z-50 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-polar-700/60 bg-polar-950/60">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-200 font-mono">
                    POLARIS ALERTS & LOGS
                  </span>
                  <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-ice-500/20 text-ice-300">
                    {unread} New
                  </span>
                </div>
                {unread > 0 && (
                  <button
                    onClick={markAllNotificationsRead}
                    className="text-[11px] text-ice-400 hover:text-ice-300 font-mono flex items-center gap-1"
                  >
                    <CheckCheck className="w-3 h-3" />
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-polar-700/40">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-3 text-xs transition-colors ${
                      n.read ? 'bg-polar-900/50' : 'bg-polar-850/90'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="flex items-center gap-1.5">
                        <StatusIndicator
                          status={n.type}
                          variant="dot"
                          size="sm"
                          pulse={!n.read}
                        />
                        <span className="font-medium text-slate-200 font-sans">
                          {n.title}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">
                        {n.timestamp}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 pl-3 leading-relaxed">
                      {n.message}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Operator Profile */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2.5 pl-2 pr-2.5 py-1 rounded bg-polar-950/80 hover:bg-polar-800 border border-polar-700/60 text-left transition-colors"
          >
            <div className="flex items-center justify-center w-7 h-7 rounded-full bg-ice-500/15 border border-ice-500/30 text-ice-400 font-mono text-xs font-semibold">
              RN
            </div>
            <div className="hidden md:flex flex-col">
              <span className="text-xs font-medium text-slate-200 font-sans leading-tight">
                {operatorName}
              </span>
              <span className="text-[10px] font-mono text-slate-400 leading-tight">
                {operatorRole}
              </span>
            </div>
          </button>

          {/* Profile Dropdown */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 rounded-lg bg-polar-900 border border-polar-700 shadow-xl z-50 p-2">
              <div className="px-3 py-2 border-b border-polar-700/60">
                <p className="text-xs font-semibold text-slate-200">{operatorName}</p>
                <p className="text-[10px] text-ice-400 font-mono">{operatorRole}</p>
                <p className="text-[10px] text-slate-400 font-mono mt-1">Station: Maitri / Bharati Link</p>
              </div>
              <div className="pt-2 space-y-1 text-xs text-slate-300">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded hover:bg-polar-800 text-slate-300 cursor-pointer">
                  <Shield className="w-3.5 h-3.5 text-ice-400" />
                  <span>Security Clearance: Level 4</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded hover:bg-polar-800 text-slate-300 cursor-pointer">
                  <User className="w-3.5 h-3.5 text-ice-400" />
                  <span>Navigator Settings</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
