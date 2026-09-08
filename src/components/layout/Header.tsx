import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Menu,
  Ship,
  Clock,
  Wifi,
  Bell,
  User,
  Shield,
  CheckCheck,
  Search,
  Radio,
  ChevronDown,
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
    title: 'Mission Control',
    category: 'Real-Time Deck',
  },
  '/mission-planner': {
    title: 'Mission Planner',
    category: 'Tactical Planning',
  },
  '/sea-ice': {
    title: 'Sea-Ice Forecast',
    category: 'SAR AI Dynamics',
  },
  '/icebergs': {
    title: 'Iceberg Intelligence',
    category: 'Hazard Tracking',
  },
  '/risk': {
    title: 'Risk Intelligence',
    category: 'IMO POLARIS RIO',
  },
  '/routes': {
    title: 'Route Optimization',
    category: 'Multi-Objective AI',
  },
  '/explainability': {
    title: 'Explainable AI',
    category: 'SHAP Transparency',
  },
  '/digital-twin': {
    title: 'Digital Twin',
    category: 'Physics Simulation',
  },
  '/system': {
    title: 'System Status',
    category: 'Cloud & Edge Links',
  },
};

export const Header: React.FC = () => {
  const location = useLocation();
  const {
    sidebarCollapsed,
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

  // Live UTC Clock updater
  useEffect(() => {
    const update = () => {
      const now = new Date();
      setUtcTime(
        now.toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
          timeZone: 'UTC',
        })
      );
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const currentRouteMeta = routeTitleMap[location.pathname] || {
    title: 'Mission Control',
    category: 'Polar Intelligence',
  };

  const unread = unreadCount();

  return (
    <>
      <motion.header
        initial={{ y: -12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="sticky top-0 z-30 h-14 border-b border-zinc-200/90 bg-white/80 backdrop-blur-xl shadow-xs"
      >
        <div className="flex h-full items-center justify-between gap-3 px-4 sm:px-5">
          {/* ========== LEFT: Mobile Trigger + Module Logo & Title (Fixed Proportion & No Overflow) ========== */}
          <div className="flex items-center gap-2.5 shrink-0 min-w-0 max-w-[200px] sm:max-w-[240px] md:max-w-[280px]">
            {/* Mobile Drawer Trigger Button */}
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="flex lg:hidden items-center justify-center h-8 w-8 rounded-lg text-zinc-700 hover:text-black hover:bg-zinc-100 border border-zinc-200 transition-colors shrink-0"
              aria-label="Open navigation menu"
            >
              <Menu className="w-4 h-4" />
            </button>

            {/* Radio / Status Icon Badge */}
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-white shrink-0 shadow-xs">
              <Radio className="h-4 w-4" />
            </div>

            {/* Adaptive Title */}
            <div className="min-w-0 flex flex-col justify-center">
              <div className="flex items-center gap-1.5 leading-tight">
                <span className="text-xs sm:text-sm font-bold tracking-tight text-zinc-950 font-sans truncate">
                  {currentRouteMeta.title}
                </span>
                <span className="hidden sm:inline-block rounded bg-zinc-100 px-1.5 py-0.5 text-[9px] font-mono font-bold text-zinc-800 border border-zinc-200 shrink-0">
                  v1.0
                </span>
              </div>
              <p className="truncate text-[10px] font-mono font-medium text-zinc-500 uppercase tracking-wider leading-tight">
                {currentRouteMeta.category}
              </p>
            </div>
          </div>

          {/* ========== CENTER: Search + Context Chips (Uniform h-8 & Clean Responsive Hiding) ========== */}
          <div className="flex flex-1 items-center justify-center gap-2 min-w-0 max-w-3xl">
            {/* Quick Search Palette Trigger */}
            <button
              onClick={() => setCommandSearchOpen(true)}
              className="relative flex items-center w-full max-w-[260px] h-8 rounded-lg border border-zinc-200 bg-zinc-50/90 pl-8 pr-9 text-xs font-mono text-zinc-500 hover:bg-white hover:border-zinc-300 hover:text-zinc-900 transition-all shadow-2xs group text-left"
            >
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400 group-hover:text-black transition-colors" />
              <span className="truncate flex-1 font-medium">Search Polar Modules...</span>
              <kbd className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center rounded border border-zinc-300 bg-white px-1.5 py-0.5 text-[9px] font-bold text-zinc-700 shadow-2xs">
                ⌘K
              </kbd>
            </button>

            {/* Mission Chip */}
            <div className="hidden lg:flex items-center gap-1.5 h-8 rounded-lg border border-zinc-200 bg-white px-2.5 whitespace-nowrap shadow-2xs">
              <motion.span
                className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0"
                animate={{ scale: [1, 1.35, 1], opacity: [1, 0.6, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
              <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase">
                MISSION:
              </span>
              <span className="text-xs font-bold text-zinc-900 font-sans truncate max-w-[180px]">
                {missionName}
              </span>
            </div>

            {/* Vessel Chip */}
            <div className="hidden xl:flex items-center gap-1.5 h-8 rounded-lg border border-zinc-200 bg-white px-2.5 whitespace-nowrap shadow-2xs">
              <Ship className="h-3.5 w-3.5 text-zinc-600 shrink-0" />
              <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase">
                VESSEL:
              </span>
              <span className="text-xs font-bold text-zinc-900 font-sans truncate max-w-[150px]">
                {vesselName}
              </span>
              <span className="rounded bg-black text-white px-1.5 py-0.5 text-[10px] font-mono font-bold shadow-2xs">
                {vesselClass.split(' ')[0] || 'PC4'}
              </span>
            </div>
          </div>

          {/* ========== RIGHT: Status + Live UTC + User (Uniform h-8 & Gap-2) ========== */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Live UTC Clock */}
            <div className="hidden sm:flex items-center gap-1.5 h-8 rounded-lg border border-zinc-200 bg-white px-2.5 shadow-2xs">
              <Clock className="h-3.5 w-3.5 text-zinc-400" />
              <span className="font-mono text-xs font-bold tabular-nums text-zinc-900">
                {utcTime || '00:00:00'}
              </span>
              <span className="text-[10px] font-mono font-bold text-zinc-400">UTC</span>
            </div>

            {/* Uplink Status Chip with Live Pulsing Micro-Animation */}
            <div
              className="flex items-center gap-1.5 h-8 rounded-lg border border-emerald-300 bg-emerald-50 px-2.5 shadow-2xs"
              title="Starlink Polar Uplink: 98.4% Nominal"
            >
              <motion.div
                className="h-1.5 w-1.5 rounded-full bg-emerald-600 shrink-0"
                animate={{ scale: [1, 1.35, 1], opacity: [1, 0.6, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
              <Wifi className="h-3.5 w-3.5 text-emerald-700 shrink-0" />
              <span className="text-xs font-mono font-bold text-emerald-950">
                UPLINK OK
              </span>
            </div>

            {/* Notifications Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-700 hover:text-black hover:bg-zinc-50 hover:border-zinc-300 transition-all focus:outline-none focus:ring-2 focus:ring-black shadow-2xs shrink-0"
                  aria-label="Notifications"
                >
                  <Bell className="h-4 w-4" />
                  {unread > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-black text-[9px] font-mono font-bold text-white shadow-xs px-1">
                      {unread}
                    </span>
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-80 sm:w-96 p-0 overflow-hidden bg-white border-zinc-200 shadow-2xl rounded-2xl"
              >
                <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200 bg-zinc-50">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-zinc-950 font-mono">
                      POLARIS ALERTS & LOGS
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-black text-white font-bold">
                      {unread} New
                    </span>
                  </div>
                  {unread > 0 && (
                    <button
                      onClick={markAllNotificationsRead}
                      className="text-[11px] text-zinc-600 hover:text-black font-mono flex items-center gap-1 font-bold transition-colors"
                    >
                      <CheckCheck className="w-3 h-3" />
                      Mark all read
                    </button>
                  )}
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-zinc-100">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`p-3 text-xs transition-colors ${
                        n.read ? 'bg-white' : 'bg-zinc-50/80'
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
                          <span className="font-bold text-zinc-950 font-sans">
                            {n.title}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-zinc-400 font-medium">
                          {n.timestamp}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-600 pl-3 leading-relaxed font-sans">
                        {n.message}
                      </p>
                    </div>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Operator Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 h-8 rounded-lg border border-zinc-200 bg-white py-1 pl-1 pr-2 hover:bg-zinc-50 hover:border-zinc-300 transition-all focus:outline-none focus:ring-2 focus:ring-black shadow-2xs shrink-0">
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-black text-[10px] font-mono font-bold text-white shadow-2xs shrink-0">
                    RN
                  </div>
                  <div className="hidden md:block text-left leading-tight">
                    <p className="text-xs font-bold font-sans text-zinc-950 leading-tight">
                      {operatorName}
                    </p>
                    <p className="text-[10px] font-mono font-medium text-zinc-500 leading-tight truncate max-w-[120px]">
                      {operatorRole}
                    </p>
                  </div>
                  <ChevronDown className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-64 bg-white border-zinc-200 p-2 shadow-2xl rounded-2xl"
              >
                <DropdownMenuLabel>
                  <p className="text-xs font-bold text-zinc-950 font-sans">{operatorName}</p>
                  <p className="text-[10px] text-zinc-500 font-mono font-medium">{operatorRole}</p>
                  <p className="text-[10px] text-zinc-400 font-mono mt-1">Station: Bharati / Maitri Antarctica</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2 text-xs text-zinc-800 hover:text-black font-semibold cursor-pointer">
                  <Shield className="w-3.5 h-3.5 text-black" />
                  <span>Security Clearance: Level 4</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2 text-xs text-zinc-800 hover:text-black font-semibold cursor-pointer">
                  <User className="w-3.5 h-3.5 text-black" />
                  <span>Bridge Navigator Settings</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </motion.header>

      {/* Global Quick Command Palette Modal */}
      <CommandSearch open={commandSearchOpen} onOpenChange={setCommandSearchOpen} />
    </>
  );
};
