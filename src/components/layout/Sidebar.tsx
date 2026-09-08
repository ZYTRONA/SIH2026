import React from 'react';
import {
  LayoutDashboard,
  Compass,
  Snowflake,
  TriangleAlert,
  Route,
  Brain,
  Network,
  Server,
  PanelLeft,
  X,
  Radio,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavigationItem } from './NavigationItem';
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
    icon: TriangleAlert,
    badge: '7 WARN',
    badgeType: 'warning' as const,
  },
  {
    path: '/risk',
    label: 'Risk Intelligence',
    icon: TriangleAlert,
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
    icon: Brain,
  },
  {
    path: '/digital-twin',
    label: 'Digital Twin',
    icon: Network,
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
  } = useAppStore();

  const handleMobileNavClick = () => {
    setMobileSidebarOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Main Sidebar with Motion Spring Physics */}
      <motion.aside
        initial={false}
        animate={{
          width: sidebarCollapsed ? 72 : 256,
          transition: {
            type: 'spring',
            stiffness: 350,
            damping: 32,
            mass: 0.8,
          },
        }}
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col border-r border-zinc-200 bg-white shadow-xs overflow-hidden ${
          /* Mobile Drawer Positioning */
          mobileSidebarOpen
            ? 'translate-x-0 !w-64'
            : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top Header / Branding */}
        <div className={`flex h-14 items-center border-b border-zinc-200 shrink-0 ${sidebarCollapsed ? 'justify-center px-0' : 'justify-between px-3.5'}`}>
          <div className="flex items-center gap-2.5 overflow-hidden min-w-0">
            {/* Logo Badge */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-black text-white shrink-0 shadow-xs cursor-pointer"
            >
              <Radio className="h-4 w-4" />
            </motion.div>

            {/* Platform Branding Text (Smooth Staggered Reveal) */}
            <AnimatePresence initial={false}>
              {!sidebarCollapsed && (
                <motion.div
                  key="branding-text"
                  initial={{ opacity: 0, x: -12, filter: 'blur(2px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: -10, filter: 'blur(2px)', transition: { duration: 0.12 } }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="min-w-0 overflow-hidden"
                >
                  <div className="flex items-center gap-1.5">
                    <span className="font-sans font-extrabold text-sm tracking-tight text-black whitespace-nowrap">
                      POLARIS AI
                    </span>
                    <span className="rounded bg-zinc-100 px-1.5 py-0.5 text-[9px] font-mono font-bold text-zinc-900 border border-zinc-200 shrink-0">
                      v1.0
                    </span>
                  </div>
                  <p className="truncate text-[10px] text-zinc-500 font-sans font-medium whitespace-nowrap">
                    Polar Route Intelligence
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Close Button */}
          <button
            onClick={() => setMobileSidebarOpen(false)}
            className="flex lg:hidden items-center justify-center h-8 w-8 rounded-lg text-zinc-500 hover:text-black hover:bg-zinc-100 border border-zinc-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Items Section */}
        <nav className="flex-1 space-y-1.5 p-2 overflow-y-auto overflow-x-hidden">
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

        {/* Bottom Desktop Collapse Toggle Button with Micro-Motion */}
        <div className="p-2 border-t border-zinc-200 shrink-0">
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={toggleSidebar}
            className={`flex items-center justify-center rounded-xl border border-zinc-200 text-zinc-600 hover:bg-zinc-100 hover:text-black transition-colors ${
              sidebarCollapsed
                ? 'h-10 w-10 mx-auto'
                : 'w-full py-2.5 gap-2.5 px-3 text-xs font-medium font-sans overflow-hidden'
            }`}
            title={sidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            <motion.div
              animate={{ rotate: sidebarCollapsed ? 0 : 180 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
            >
              <PanelLeft className="h-4 w-4" />
            </motion.div>

            <AnimatePresence initial={false}>
              {!sidebarCollapsed && (
                <motion.span
                  key="collapse-label"
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -6, transition: { duration: 0.1 } }}
                  transition={{ duration: 0.2 }}
                  className="whitespace-nowrap font-semibold text-xs tracking-tight"
                >
                  Collapse Sidebar
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.aside>
    </>
  );
};
