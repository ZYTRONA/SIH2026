import React, { useState, useEffect } from 'react';
import {
  Menu,
  Clock,
  Wifi,
  Bell,
  User,
  Shield,
  CheckCheck,
  Search,
  ChevronDown,
  Database,
  Radio,
  Compass,
} from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CommandSearch } from '@/components/ui/command-search';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { StatusIndicator } from './StatusIndicator';
import { cn } from '@/lib/utils';

const PAGE_TITLES: Record<string, { title: string; ctaText: string; ctaPath: string; coordinates?: string }> = {
  '/dashboard': { title: 'Mission Control', ctaText: 'Plan Route', ctaPath: '/mission-planner', coordinates: "LAT 69°24'S • LON 76°11'E" },
  '/mission-planner': { title: 'Mission Planner', ctaText: 'Launch Simulation', ctaPath: '/digital-twin', coordinates: "LAT 69°24'S • LON 76°11'E" },
  '/sea-ice': { title: 'Sea-Ice Forecast', ctaText: 'Risk Analysis', ctaPath: '/risk', coordinates: "LAT 70°15'S • LON 72°30'E" },
  '/icebergs': { title: 'Iceberg Intelligence', ctaText: 'Drift Tracking', ctaPath: '/icebergs', coordinates: "LAT 68°50'S • LON 74°45'E" },
  '/risk': { title: 'Risk Intelligence', ctaText: 'Optimize Path', ctaPath: '/routes', coordinates: "LAT 69°05'S • LON 75°20'E" },
  '/routes': { title: 'Route Optimization', ctaText: 'Explain Choices', ctaPath: '/explainability', coordinates: "LAT 69°24'S • LON 76°11'E" },
  '/explainability': { title: 'Explainable AI', ctaText: 'System Health', ctaPath: '/system', coordinates: "LAT 69°24'S • LON 76°11'E" },
  '/digital-twin': { title: 'Digital Twin Simulation', ctaText: 'Re-Plan Route', ctaPath: '/routes', coordinates: "LAT 69°24'S • LON 76°11'E" },
  '/system': { title: 'System & Edge Status', ctaText: 'Mission Control', ctaPath: '/dashboard', coordinates: "LAT 69°24'S • LON 76°11'E" },
  '/settings': { title: 'System Settings', ctaText: 'Dashboard', ctaPath: '/dashboard', coordinates: "LAT 69°24'S • LON 76°11'E" },
};

export const Header: React.FC = () => {
  const {
    operatorName,
    operatorRole,
    notifications,
    unreadCount,
    markAllNotificationsRead,
    setMobileSidebarOpen,
    isOffline,
    toggleOfflineMode,
  } = useAppStore();

  const location = useLocation();
  const navigate = useNavigate();
  const [utcTime, setUtcTime] = useState<string>('');
  const [commandSearchOpen, setCommandSearchOpen] = useState<boolean>(false);

  const currentMeta = PAGE_TITLES[location.pathname] || {
    title: 'POLARIS Navigation',
    ctaText: 'Mission Control',
    ctaPath: '/dashboard',
    coordinates: "LAT 69°24'S • LON 76°11'E",
  };

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

  const unread = unreadCount();

  return (
    <>
      <header className="sticky top-0 z-30 w-full backdrop-blur-xl bg-white/90 border-b border-[#e0e0e0] select-none shadow-xs transition-all">
        <div className="w-full max-w-[1920px] mx-auto h-14 px-4 sm:px-6 flex items-center justify-between gap-3 sm:gap-4">
          {/* Left: Mobile hamburger + Page Title + Mission Badge */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="flex lg:hidden items-center justify-center h-8 w-8 rounded-full bg-[#f5f5f7] hover:bg-[#e0e0e0] border border-[#e0e0e0] text-[#1d1d1f] transition-colors active:scale-95 shrink-0 cursor-pointer"
              aria-label="Open menu"
            >
              <Menu className="w-4 h-4" />
            </button>

            {/* Compact Brand Icon for mobile view */}
            <Link to="/" className="flex lg:hidden items-center gap-1.5 shrink-0 group mr-1">
              <div className="h-7 w-7 rounded-[8px] bg-[#1d1d1f] text-white flex items-center justify-center font-bold shadow-xs">
                <Radio className="w-3.5 h-3.5" />
              </div>
            </Link>

            <div className="flex items-center gap-2.5 min-w-0">
              <h1 className="text-[16px] sm:text-[18px] font-semibold text-[#1d1d1f] tracking-tight leading-none truncate">
                {currentMeta.title}
              </h1>

              {/* Mission Pill Indicator */}
              <div className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#f5f5f7] border border-[#e0e0e0] text-[11px] text-neutral-600 shrink-0">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span className="text-neutral-500">Mission:</span>
                <span className="text-[#1d1d1f] font-semibold">ANT-2417</span>
                <span className="text-neutral-300 hidden xl:inline">&bull;</span>
                <span className="text-neutral-500 hidden xl:inline truncate max-w-[140px]">RV Polar Sentinel</span>
              </div>
            </div>
          </div>

          {/* Center: Apple Search Trigger */}
          <div className="flex-1 max-w-[260px] xl:max-w-[320px] hidden sm:block">
            <motion.button
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setCommandSearchOpen(true)}
              className="w-full flex items-center justify-between h-8 px-3 rounded-full bg-[#f5f5f7] hover:bg-[#ebebed] border border-[#e0e0e0] text-[12px] text-neutral-500 hover:text-[#1d1d1f] transition-all cursor-pointer shadow-2xs group"
            >
              <div className="flex items-center gap-2 truncate">
                <Search className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-600 shrink-0" />
                <span className="truncate">Search missions & bergs...</span>
              </div>
              <kbd className="hidden md:inline-block text-[10px] font-mono bg-white border border-[#e0e0e0] text-neutral-500 px-1.5 py-0.5 rounded font-semibold shrink-0 shadow-2xs">
                ⌘K
              </kbd>
            </motion.button>
          </div>

          {/* Right: Coordinates + UTC Clock + Uplink + Notifications + Profile + CTA */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Search Icon for Mobile */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => setCommandSearchOpen(true)}
              className="flex sm:hidden h-8 w-8 items-center justify-center rounded-full bg-[#f5f5f7] hover:bg-[#e0e0e0] border border-[#e0e0e0] text-[#1d1d1f] transition-colors cursor-pointer"
              aria-label="Search"
            >
              <Search className="w-3.5 h-3.5 text-neutral-600" />
            </motion.button>

            {/* Coordinates Badge */}
            <div className="hidden 2xl:flex items-center gap-1.5 text-[11px] font-mono text-neutral-500 bg-[#f5f5f7] border border-[#e0e0e0] px-2.5 py-1 rounded-full">
              <span>{currentMeta.coordinates || "LAT 69°24'S • LON 76°11'E"}</span>
            </div>

            {/* UTC Clock */}
            <div className="hidden lg:flex items-center gap-1.5 text-[11px] font-mono text-[#1d1d1f] bg-[#f5f5f7] border border-[#e0e0e0] px-2.5 py-1 rounded-full">
              <Clock className="w-3 h-3 text-[#0066cc]" />
              <span className="font-semibold">{utcTime || '00:00:00'} UTC</span>
            </div>

            {/* Satellite / Edge Uplink */}
            <TooltipProvider delayDuration={150}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.94 }}
                    onClick={toggleOfflineMode}
                    className={cn(
                      'flex items-center gap-1.5 h-8 px-2.5 rounded-full text-[11px] font-semibold border transition-all cursor-pointer',
                      isOffline
                        ? 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100'
                        : 'bg-emerald-50 text-emerald-900 border-emerald-200 hover:bg-emerald-100'
                    )}
                  >
                    {isOffline ? (
                      <>
                        <Database className="w-3 h-3 text-amber-700" />
                        <span className="hidden md:inline">Edge Mode</span>
                      </>
                    ) : (
                      <>
                        <Wifi className="w-3 h-3 text-emerald-700" />
                        <span className="hidden md:inline">Satellite OK</span>
                      </>
                    )}
                  </motion.button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="text-xs bg-white text-[#1d1d1f] border border-[#e0e0e0] shadow-md font-normal">
                  {isOffline ? 'Edge inference active (Jetson AGX Orin). Click to reconnect satellite uplink.' : 'Direct L-band Starlink polar satellite link active.'}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#f5f5f7] hover:bg-[#e0e0e0] border border-[#e0e0e0] text-[#1d1d1f] transition-all cursor-pointer"
                  aria-label="Notifications"
                >
                  <Bell className="w-3.5 h-3.5 text-neutral-600" />
                  {unread > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-rose-600 text-[9px] font-bold text-white px-1 shadow-xs">
                      {unread}
                    </span>
                  )}
                </motion.button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 p-0 bg-white text-[#1d1d1f] border border-[#e0e0e0] shadow-2xl rounded-[18px] overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-[#e0e0e0] bg-[#f5f5f7]">
                  <span className="text-[14px] font-semibold text-[#1d1d1f]">Notifications</span>
                  {unread > 0 && (
                    <button
                      onClick={markAllNotificationsRead}
                      className="text-[12px] text-[#0066cc] hover:underline flex items-center gap-1 font-normal cursor-pointer"
                    >
                      <CheckCheck className="w-3.5 h-3.5" />
                      Mark all read
                    </button>
                  )}
                </div>
                <div className="max-h-72 overflow-y-auto divide-y divide-[#f0f0f0]">
                  {notifications.map((n) => (
                    <div key={n.id} className={`p-3 text-[12px] ${n.read ? 'bg-white' : 'bg-[#fafafc]'}`}>
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2">
                          <StatusIndicator status={n.type} variant="dot" size="sm" pulse={!n.read} />
                          <span className="font-semibold text-[#1d1d1f]">{n.title}</span>
                        </div>
                        <span className="text-[10px] text-neutral-400 font-mono">{n.timestamp}</span>
                      </div>
                      <p className="text-[12px] text-neutral-600 pl-3.5 leading-relaxed">{n.message}</p>
                    </div>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Profile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.94 }}
                  className="flex items-center gap-1.5 h-8 rounded-full bg-[#f5f5f7] hover:bg-[#e0e0e0] border border-[#e0e0e0] pl-1 pr-2 text-[#1d1d1f] transition-all cursor-pointer"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1d1d1f] text-white text-[10px] font-semibold">
                    EM
                  </div>
                  <ChevronDown className="w-3 h-3 text-neutral-500" />
                </motion.button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white border border-[#e0e0e0] p-2 shadow-xl rounded-[18px]">
                <DropdownMenuLabel>
                  <p className="text-[14px] font-semibold text-[#1d1d1f]">{operatorName}</p>
                  <p className="text-[12px] text-neutral-500 font-normal">{operatorRole}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2 text-[13px] text-neutral-700 hover:bg-[#f5f5f7] rounded-[10px] cursor-pointer">
                  <Shield className="w-4 h-4 text-neutral-400" />
                  <span>Security Level 4</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2 text-[13px] text-neutral-700 hover:bg-[#f5f5f7] rounded-[10px] cursor-pointer">
                  <User className="w-4 h-4 text-neutral-400" />
                  <span>Bridge Profile</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Action CTA */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => navigate(currentMeta.ctaPath)}
              className="btn-apple-primary !min-h-[34px] !h-[34px] !px-3.5 sm:!px-4 !py-1 !text-[12px] sm:!text-[13px] whitespace-nowrap shadow-xs cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>{currentMeta.ctaText}</span>
            </motion.button>
          </div>
        </div>
      </header>

      <CommandSearch open={commandSearchOpen} onOpenChange={setCommandSearchOpen} />
    </>
  );
};
