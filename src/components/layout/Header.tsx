import React, { useState, useEffect } from 'react';
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

export const Header: React.FC = () => {
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

  const unread = unreadCount();

  return (
    <>
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b border-zinc-200 bg-white/95 backdrop-blur-xl px-4 sm:px-6 shadow-xs">
        {/* Left: Mobile Sidebar Trigger + Global Quick Search */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="flex lg:hidden items-center justify-center h-8 w-8 rounded-lg text-zinc-600 hover:text-black hover:bg-zinc-100 border border-zinc-200"
            aria-label="Open navigation menu"
          >
            <Menu className="w-4 h-4" />
          </button>

          {/* Quick Search Palette Trigger Button */}
          <button
            onClick={() => setCommandSearchOpen(true)}
            className="relative flex items-center w-60 sm:w-72 h-9 rounded-xl border border-zinc-200 bg-zinc-50 hover:bg-white hover:border-zinc-300 pl-10 pr-10 text-xs font-mono text-zinc-500 hover:text-zinc-900 transition-all text-left group shadow-2xs"
          >
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400 group-hover:text-black transition-colors" />
            <span className="truncate font-medium">Search Polar Modules...</span>
            <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 inline-flex items-center rounded border border-zinc-200 bg-white px-1.5 py-0.5 text-[9px] font-bold text-zinc-700 shadow-2xs">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Center: Clean Rounded-Full Context Chips */}
        <div className="hidden lg:flex items-center gap-2.5">
          {/* Mission Chip */}
          <div className="flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200/80 px-3.5 py-1.5 text-xs font-medium text-emerald-800 shadow-2xs">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold text-[10px] font-mono text-emerald-600">MISSION:</span>
            <span className="font-semibold">{missionName}</span>
          </div>

          {/* Vessel Chip */}
          <div className="hidden xl:flex items-center gap-2 rounded-full bg-zinc-100 border border-zinc-200 px-3.5 py-1.5 text-xs font-medium text-zinc-700 shadow-2xs">
            <Ship className="h-3.5 w-3.5 text-zinc-600" />
            <span className="font-semibold text-zinc-900">{vesselName}</span>
            <span className="rounded bg-black px-1.5 py-0.5 text-[10px] font-mono font-bold text-white shadow-2xs">
              {vesselClass.split(' ')[0] || 'PC4'}
            </span>
          </div>
        </div>

        {/* Right: Live UTC Clock + Uplink Badge + Notifications + User */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {/* Live UTC Clock */}
          <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono font-medium text-zinc-700 bg-zinc-50 border border-zinc-200 px-3 py-1.5 rounded-full shadow-2xs">
            <Clock className="h-3.5 w-3.5 text-zinc-500 animate-pulse" />
            <span className="tabular-nums font-bold text-zinc-900">{utcTime || '00:00:00'}</span>
            <span className="text-[10px] text-zinc-400 font-bold">UTC</span>
          </div>

          {/* Uplink Status Chip */}
          <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1.5 text-xs font-semibold text-emerald-800 shadow-2xs">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-ping" />
            <Wifi className="h-3.5 w-3.5 text-emerald-700" />
            <span className="text-[11px] font-mono font-bold">UPLINK OK</span>
          </div>

          {/* Notifications Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="relative flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 hover:text-black transition-colors shadow-2xs"
                aria-label="Notifications"
              >
                <Bell className="h-4 w-4" />
                {unread > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-rose-500 text-[9px] font-mono font-bold text-white shadow-xs px-1">
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
              <button className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white py-1 pl-1 pr-3 hover:bg-zinc-50 transition-colors shadow-2xs">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-xs font-bold text-white shadow-2xs">
                  RN
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-xs font-bold text-zinc-950 leading-tight">
                    {operatorName}
                  </p>
                  <p className="text-[10px] text-zinc-500 font-medium leading-tight">
                    {operatorRole}
                  </p>
                </div>
                <ChevronDown className="h-3.5 w-3.5 text-zinc-400" />
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
      </header>

      {/* Global Quick Command Palette Modal */}
      <CommandSearch open={commandSearchOpen} onOpenChange={setCommandSearchOpen} />
    </>
  );
};
