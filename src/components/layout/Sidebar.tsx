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
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col bg-white border-r border-slate-200 transition-all duration-200 ease-in-out shadow-xs ${
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
        <div className="flex items-center justify-between h-16 px-4 border-b border-slate-200 bg-slate-50/70">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-50 border border-sky-200 text-sky-600 flex-shrink-0 shadow-xs">
              <PolarIcon className="w-5 h-5 text-sky-600 animate-spin-slow" />
            </div>
            {!sidebarCollapsed && (
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-sans font-bold text-sm tracking-tight text-slate-900">
                    POLARIS AI
                  </span>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-sky-100 text-sky-800 border border-sky-200">
                    v1.0
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 font-sans tracking-tight truncate leading-tight">
                  Polar Adaptive Route Intelligence
                </span>
              </div>
            )}
          </div>

          {/* Desktop Collapse Toggle */}
          <button
            onClick={toggleSidebar}
            className="hidden lg:flex items-center justify-center w-6 h-6 rounded-md text-slate-500 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors"
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
            className="flex lg:hidden items-center justify-center w-7 h-7 rounded-md text-slate-500 hover:text-slate-900 hover:bg-slate-100 border border-slate-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Section */}
        <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {!sidebarCollapsed && (
            <div className="px-3 pb-2 text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
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
        <div className="p-3 border-t border-slate-200 bg-slate-50/60">
          {!sidebarCollapsed ? (
            <div className="space-y-2">
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold px-1">
                Telemetry Link
              </div>
              <div className="grid grid-cols-1 gap-1.5 p-2.5 rounded-lg bg-white border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between text-[11px] font-sans">
                  <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                    <Radio className="w-3 h-3 text-emerald-600" />
                    System
                  </span>
                  <StatusIndicator
                    status={systemOnline ? 'safe' : 'critical'}
                    label={systemOnline ? 'Online' : 'Offline'}
                    size="sm"
                    pulse={systemOnline}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] font-sans">
                  <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                    <Cloud className="w-3 h-3 text-sky-600" />
                    Cloud
                  </span>
                  <span className={`text-[10px] font-mono flex items-center gap-1 font-semibold ${cloudConnected ? 'text-emerald-700' : 'text-rose-700'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${cloudConnected ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                    {cloudConnected ? 'Connected' : 'Offline'}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] font-sans">
                  <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                    <Cpu className="w-3 h-3 text-sky-600" />
                    Edge
                  </span>
                  <span className={`text-[10px] font-mono flex items-center gap-1 font-semibold ${edgeConnected ? 'text-emerald-700' : 'text-rose-700'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${edgeConnected ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                    {edgeConnected ? 'Connected' : 'Offline'}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-1.5 border-t border-slate-100">
                  <span className="flex items-center gap-1">
                    <RefreshCw className="w-2.5 h-2.5 text-slate-400" />
                    Last Sync:
                  </span>
                  <span className="text-slate-800 font-medium">{lastSyncTime}</span>
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
              <span className="text-[9px] font-mono text-slate-500 font-semibold">SYNC</span>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
