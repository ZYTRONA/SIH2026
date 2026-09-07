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
  Search,
  Command,
} from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { StatusIndicator } from './StatusIndicator';
import { CommandSearch } from '@/components/ui/command-search';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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
  const [commandSearchOpen, setCommandSearchOpen] = useState<boolean>(false);

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
    <>
      <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 sm:px-6 bg-white/95 border-b border-slate-200 backdrop-blur-md shadow-xs">
        {/* Left: Mobile Toggle & Dynamic Page Title */}
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="flex lg:hidden items-center justify-center p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Dynamic page title */}
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-sm sm:text-base font-bold text-slate-900 font-sans truncate tracking-tight">
                {currentRouteMeta.title}
              </h1>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-sky-700 font-semibold truncate">
              {currentRouteMeta.category}
            </span>
          </div>
        </div>

        {/* Center / Search & Telemetry Bar */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Global Quick Command Palette Trigger */}
          <button
            onClick={() => setCommandSearchOpen(true)}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-slate-600 hover:text-slate-900 text-xs font-mono transition-all shadow-xs group"
          >
            <Search className="w-3.5 h-3.5 text-sky-600 group-hover:scale-110 transition-transform" />
            <span className="hidden xl:inline">Search Polar Modules...</span>
            <kbd className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-white border border-slate-300 text-[10px] text-slate-600 shadow-2xs font-sans">
              <Command className="w-3 h-3" /> K
            </kbd>
          </button>

          {/* Current Mission */}
          <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-mono shadow-2xs">
            <Compass className="w-3.5 h-3.5 text-sky-600 flex-shrink-0" />
            <span className="text-slate-500 font-sans">MISSION:</span>
            <span className="text-slate-800 font-semibold">{missionName}</span>
          </div>

          {/* Vessel */}
          <div className="hidden 2xl:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-mono shadow-2xs">
            <Ship className="w-3.5 h-3.5 text-sky-600 flex-shrink-0" />
            <span className="text-slate-500 font-sans">VESSEL:</span>
            <span className="text-slate-800 font-semibold">{vesselName}</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-sky-100 text-sky-800 border border-sky-200 font-semibold">
              {vesselClass.split(' ')[0]}
            </span>
          </div>
        </div>

        {/* Right Controls & Operator Deck */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {/* UTC Live Clock */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-white shadow-xs">
            <Clock className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
            <span className="tabular-nums font-bold tracking-wider">{utcTime || '00:00:00 UTC'}</span>
          </div>

          {/* Satellite / Connection Indicator */}
          <div
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-mono shadow-2xs"
            title="Satellite Uplink Nominal (Inmarsat FleetBroadband / Starlink Polar)"
          >
            <Wifi className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-[10px] text-emerald-700 font-bold tracking-wider">UPLINK OK</span>
          </div>

          {/* Notifications Radix Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unread > 0 && (
                  <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[16px] h-4 px-1 rounded-full text-[9px] font-mono font-bold bg-rose-500 text-white shadow-xs">
                    {unread}
                  </span>
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 sm:w-96 p-0 overflow-hidden bg-white border-slate-200 shadow-xl">
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 bg-slate-50">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-900 font-mono">
                    POLARIS ALERTS & LOGS
                  </span>
                  <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-sky-100 text-sky-800 font-bold">
                    {unread} New
                  </span>
                </div>
                {unread > 0 && (
                  <button
                    onClick={markAllNotificationsRead}
                    className="text-[11px] text-sky-700 hover:text-sky-900 font-mono flex items-center gap-1 font-semibold"
                  >
                    <CheckCheck className="w-3 h-3" />
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-3 text-xs transition-colors ${
                      n.read ? 'bg-white' : 'bg-sky-50/40'
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
                        <span className="font-semibold text-slate-800 font-sans">
                          {n.title}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">
                        {n.timestamp}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 pl-3 leading-relaxed">
                      {n.message}
                    </p>
                  </div>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Operator Profile Radix Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2.5 pl-2 pr-2.5 py-1 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-2xs">
                <div className="flex items-center justify-center w-7 h-7 rounded-full bg-sky-100 border border-sky-300 text-sky-800 font-mono text-xs font-bold shadow-2xs">
                  RN
                </div>
                <div className="hidden md:flex flex-col">
                  <span className="text-xs font-semibold text-slate-800 font-sans leading-tight">
                    {operatorName}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 leading-tight">
                    {operatorRole}
                  </span>
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-60 bg-white border-slate-200 p-1.5 shadow-xl">
              <DropdownMenuLabel>
                <p className="text-xs font-semibold text-slate-900 font-sans">{operatorName}</p>
                <p className="text-[10px] text-sky-700 font-mono font-medium">{operatorRole}</p>
                <p className="text-[10px] text-slate-500 font-mono mt-1 font-normal">Link: Maitri / Bharati Station</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2 text-xs text-slate-700 hover:text-slate-900">
                <Shield className="w-3.5 h-3.5 text-sky-600" />
                <span>Security Clearance: Level 4</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2 text-xs text-slate-700 hover:text-slate-900">
                <User className="w-3.5 h-3.5 text-sky-600" />
                <span>Bridge Navigator Settings</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Global Quick Command Palette Modal */}
      <CommandSearch open={commandSearchOpen} onOpenChange={setCommandSearchOpen} />
    </>
  );
};

