import React from 'react';
import {
  LayoutDashboard,
  Compass,
  Snowflake,
  Mountain,
  AlertTriangle,
  Route,
  BrainCircuit,
  Activity,
  Server,
  Compass as PolarIcon,
  ChevronLeft,
  ChevronRight,
  X,
  Radio,
  Cloud,
  Cpu,
  RefreshCw,
} from 'lucide-react';
import { NavigationItem } from './NavigationItem';
import { StatusIndicator } from './StatusIndicator';
import { useAppStore } from '@/store/useAppStore';

export const navigationItems = [
  {
    path: '/dashboard',
    label: 'Mission Control',
    icon: LayoutDashboard,
    badge: 'LIVE',
    badgeType: 'safe' as const,
  },
  {
    path: '/mission-planner',
    label: 'Mission Planner',
    icon: Compass,
  },
  {
    path: '/sea-ice',
    label: 'Sea-Ice Forecast',
    icon: Snowflake,
    badge: 'SAR AI',
    badgeType: 'info' as const,
  },
  {
    path: '/icebergs',
    label: 'Iceberg Intelligence',
    icon: Mountain,
    badge: '7 WARN',
    badgeType: 'warning' as const,
  },
  {
    path: '/risk',
    label: 'Risk Intelligence',
    icon: AlertTriangle,
  },
  {
    path: '/routes',
    label: 'Route Optimization',
    icon: Route,
    badge: 'POLARIS',
    badgeType: 'info' as const,
  },
  {
    path: '/explainability',
    label: 'Explainable AI',
    icon: BrainCircuit,
  },
  {
    path: '/digital-twin',
    label: 'Digital Twin',
    icon: Activity,
  },
  {
    path: '/system',
    label: 'System Status',
    icon: Server,
  },
];

export const Sidebar: React.FC = () => {
  const {
    sidebarCollapsed,
    mobileSidebarOpen,
    toggleSidebar,
    setMobileSidebarOpen,
    systemOnline,
    cloudConnected,
    edgeConnected,
    lastSyncTime,
  } = useAppStore();

  const handleMobileNavClick = () => {
    setMobileSidebarOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Main Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col bg-polar-900 border-r border-polar-700/60 transition-all duration-200 ease-in-out ${
          /* Mobile Drawer */
          mobileSidebarOpen
            ? 'translate-x-0 w-[270px]'
            : '-translate-x-full lg:translate-x-0'
        } ${
          /* Desktop Responsive Width */
          sidebarCollapsed ? 'lg:w-20' : 'lg:w-[270px]'
        }`}
      >
        {/* Top Header / Branding */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-polar-700/60 bg-polar-950/40">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex items-center justify-center w-8 h-8 rounded bg-ice-500/10 border border-ice-500/30 text-ice-400 flex-shrink-0">
              <PolarIcon className="w-5 h-5 text-ice-400 animate-spin-slow" />
            </div>
            {!sidebarCollapsed && (
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-mono font-bold text-sm tracking-wider text-slate-100">
                    POLARIS AI
                  </span>
                  <span className="px-1 py-0.2 rounded text-[9px] font-mono font-bold bg-ice-500/20 text-ice-300 border border-ice-500/30">
                    v1.0
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-sans tracking-tight truncate leading-tight">
                  Polar Adaptive Route Intelligence System
                </span>
              </div>
            )}
          </div>

          {/* Desktop Collapse Toggle */}
          <button
            onClick={toggleSidebar}
            className="hidden lg:flex items-center justify-center w-6 h-6 rounded text-slate-400 hover:text-slate-200 hover:bg-polar-800/80 border border-polar-700/40 transition-colors"
            title={sidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {sidebarCollapsed ? (
              <ChevronRight className="w-3.5 h-3.5" />
            ) : (
              <ChevronLeft className="w-3.5 h-3.5" />
            )}
          </button>

          {/* Mobile Close Button */}
          <button
            onClick={() => setMobileSidebarOpen(false)}
            className="flex lg:hidden items-center justify-center w-7 h-7 rounded text-slate-400 hover:text-slate-200 hover:bg-polar-800 border border-polar-700/40"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Section */}
        <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {!sidebarCollapsed && (
            <div className="px-3 pb-2 text-[10px] font-mono uppercase tracking-widest text-slate-400 font-semibold">
              Mission Modules
            </div>
          )}
          <nav className="space-y-1">
            {navigationItems.map((item) => (
              <NavigationItem
                key={item.path}
                to={item.path}
                label={item.label}
                icon={item.icon}
                badge={item.badge}
                badgeType={item.badgeType}
                collapsed={sidebarCollapsed}
                onClick={handleMobileNavClick}
              />
            ))}
          </nav>
        </div>

        {/* Bottom Telemetry & Status Section */}
        <div className="p-3 border-t border-polar-700/60 bg-polar-950/70">
          {!sidebarCollapsed ? (
            <div className="space-y-2">
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold px-1">
                Telemetry Link
              </div>
              <div className="grid grid-cols-1 gap-1.5 p-2 rounded bg-polar-900/90 border border-polar-700/50">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <Radio className="w-3 h-3 text-emerald-400" />
                    System
                  </span>
                  <StatusIndicator
                    status={systemOnline ? 'safe' : 'critical'}
                    label={systemOnline ? 'Online' : 'Offline'}
                    size="sm"
                    pulse={systemOnline}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <Cloud className="w-3 h-3 text-sky-400" />
                    Cloud
                  </span>
                  <span className={`text-[10px] font-mono flex items-center gap-1 ${cloudConnected ? 'text-emerald-400' : 'text-rose-400'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${cloudConnected ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                    {cloudConnected ? 'Connected' : 'Offline'}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <Cpu className="w-3 h-3 text-cyan-400" />
                    Edge
                  </span>
                  <span className={`text-[10px] font-mono flex items-center gap-1 ${edgeConnected ? 'text-emerald-400' : 'text-rose-400'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${edgeConnected ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                    {edgeConnected ? 'Connected' : 'Offline'}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-1 border-t border-polar-700/40">
                  <span className="flex items-center gap-1">
                    <RefreshCw className="w-2.5 h-2.5 text-slate-400" />
                    Last Sync:
                  </span>
                  <span className="text-slate-300 font-medium">{lastSyncTime}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 py-1">
              <StatusIndicator
                status="safe"
                variant="dot"
                size="sm"
                className="hover:scale-125 transition-transform"
              />
              <span className="text-[9px] font-mono text-slate-400">SYNC</span>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
