import React, { useEffect } from 'react';
import {
  Compass,
  Snowflake,
  TriangleAlert,
  ShieldAlert,
  Route,
  Server,
  Radio,
  X,
  LayoutGrid,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { useIsDesktop } from '@/hooks';

interface NavItem {
  path: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  dot?: 'default' | 'warning' | 'teal';
}

const navigationItems: NavItem[] = [
  { path: '/mission-planner', label: 'Mission Planner', icon: Compass },
  { path: '/sea-ice', label: 'Sea-Ice Forecast', icon: Snowflake, dot: 'default' },
  { path: '/icebergs', label: 'Iceberg Intelligence', icon: TriangleAlert, dot: 'warning' },
  { path: '/risk', label: 'Risk Intelligence', icon: ShieldAlert },
  { path: '/routes', label: 'Route Optimization', icon: Route, dot: 'teal' },
  { path: '/system', label: 'System Status', icon: Server },
];

const dotColors = {
  default: 'bg-[#0066cc]',
  warning: 'bg-amber-500',
  teal: 'bg-emerald-500',
};

const sidebarVariants = {
  desktopCollapsed: { width: 72, x: 0 },
  desktopExpanded: { width: 240, x: 0 },
  mobileOpen: { width: 280, x: 0 },
  mobileClosed: { width: 280, x: '-100%' },
};

export const Sidebar: React.FC = () => {
  const {
    sidebarCollapsed,
    mobileSidebarOpen,
    setMobileSidebarOpen,
    toggleSidebar,
  } = useAppStore();

  const location = useLocation();
  const isDesktop = useIsDesktop();

  // Reset mobile sidebar when switching to desktop
  useEffect(() => {
    if (isDesktop && mobileSidebarOpen) {
      setMobileSidebarOpen(false);
    }
  }, [isDesktop, mobileSidebarOpen, setMobileSidebarOpen]);

  // Auto-close mobile sidebar on route change
  useEffect(() => {
    if (!isDesktop) {
      setMobileSidebarOpen(false);
    }
  }, [location.pathname, isDesktop, setMobileSidebarOpen]);

  // Prevent background scroll when mobile sidebar is open
  useEffect(() => {
    if (!isDesktop && mobileSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isDesktop, mobileSidebarOpen]);

  // On desktop, collapse state comes from user toggle; on mobile drawer, always render expanded
  const isCollapsed = isDesktop ? sidebarCollapsed : false;

  const handleNavClick = () => {
    if (!isDesktop) {
      setMobileSidebarOpen(false);
    }
  };

  const appleEasing = [0.32, 0.72, 0, 1] as const;

  return (
    <>
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {!isDesktop && mobileSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24, ease: appleEasing }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs lg:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar Container */}
      <motion.aside
        initial={false}
        animate={
          isDesktop
            ? isCollapsed
              ? 'desktopCollapsed'
              : 'desktopExpanded'
            : mobileSidebarOpen
            ? 'mobileOpen'
            : 'mobileClosed'
        }
        variants={sidebarVariants}
        transition={
          isDesktop
            ? { duration: 0.26, ease: appleEasing }
            : { type: 'spring', damping: 32, stiffness: 340, mass: 0.8 }
        }
        className={cn(
          'fixed top-0 bottom-0 left-0 z-50 flex flex-col bg-white border-r border-[#e0e0e0] select-none will-change-transform',
          !isDesktop && mobileSidebarOpen && 'shadow-[0_0_50px_rgba(0,0,0,0.12)]'
        )}
      >
        {/* Header / Brand & Mobile Close */}
        <div className={cn(
          'flex items-center shrink-0 h-14 transition-all duration-200',
          isCollapsed ? 'justify-center px-0' : 'justify-between px-4 sm:px-5'
        )}>
          <NavLink
            to="/dashboard"
            onClick={handleNavClick}
            className="flex items-center gap-3 group"
          >
            <motion.div
              whileHover={{ scale: 1.05, rotate: 3 }}
              whileTap={{ scale: 0.95 }}
              className="flex h-9 w-9 items-center justify-center rounded-[8px] bg-[#1d1d1f] text-white shrink-0 cursor-pointer shadow-xs"
            >
              <Radio className="h-4.5 w-4.5" />
            </motion.div>
            <AnimatePresence>
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
                  className="overflow-hidden whitespace-nowrap"
                >
                  <span className="font-semibold text-[15px] text-[#1d1d1f] tracking-tight">POLARIS AI</span>
                </motion.div>
              )}
            </AnimatePresence>
          </NavLink>

          {/* Mobile Close Button */}
          {!isDesktop && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileSidebarOpen(false)}
              className="flex lg:hidden items-center justify-center h-8 w-8 rounded-full text-neutral-500 hover:text-[#1d1d1f] hover:bg-[#f5f5f7] transition-colors cursor-pointer"
              aria-label="Close sidebar"
            >
              <X className="w-4 h-4" />
            </motion.button>
          )}
        </div>

        {/* Dashboard / Mission Control Button */}
        <div className={cn(
          'flex items-center shrink-0 pb-2 transition-all duration-200',
          isCollapsed ? 'justify-center px-0' : 'justify-start px-3'
        )}>
          <NavLink
            to="/dashboard"
            onClick={handleNavClick}
            className={({ isActive }) =>
              cn(
                'group relative flex items-center h-10 rounded-full transition-colors duration-150 overflow-hidden active:scale-95',
                isActive ? 'text-white font-semibold' : 'text-[#1d1d1f]'
              )
            }
            style={{ width: isCollapsed ? 44 : '100%' }}
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div
                    layoutId="sidebarActiveBackground"
                    className="absolute inset-0 rounded-full bg-[#0066cc]"
                    transition={{ type: 'spring', stiffness: 500, damping: 35, mass: 0.8 }}
                  />
                )}
                {!isActive && (
                  <div className="absolute inset-0 rounded-full bg-[#f5f5f7] group-hover:bg-[#ebebed] transition-colors" />
                )}
                <div className="relative z-10 flex items-center justify-center h-10 w-[44px] shrink-0">
                  <LayoutGrid className="w-4 h-4" />
                </div>
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -6 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      className="relative z-10 text-[14px] tracking-[-0.224px] whitespace-nowrap pr-4 font-normal"
                    >
                      Mission Control
                    </motion.span>
                  )}
                </AnimatePresence>
              </>
            )}
          </NavLink>
        </div>

        {/* Hairline Divider */}
        <div className={cn(
          'h-px bg-[#e0e0e0] shrink-0 mx-4 my-1',
          isCollapsed && 'mx-3'
        )} />

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto flex flex-col gap-1 py-2 px-3">
          {navigationItems.map((item) => {
            const Icon = item.icon;

            const link = (
              <NavLink
                to={item.path}
                onClick={handleNavClick}
                className={({ isActive }) =>
                  cn(
                    'group relative flex items-center h-10 rounded-full transition-colors duration-150 active:scale-95',
                    isCollapsed ? 'justify-center w-10 mx-auto' : 'justify-start px-3.5 gap-3 w-full',
                    isActive ? 'text-white font-semibold' : 'text-[#1d1d1f]'
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.div
                        layoutId="sidebarActiveBackground"
                        className="absolute inset-0 rounded-full bg-[#0066cc]"
                        transition={{ type: 'spring', stiffness: 500, damping: 35, mass: 0.8 }}
                      />
                    )}
                    {!isActive && (
                      <div className="absolute inset-0 rounded-full hover:bg-[#f5f5f7] transition-colors" />
                    )}
                    <div className="relative z-10 shrink-0 flex items-center justify-center w-4 h-4">
                      <Icon className="w-4 h-4" />
                      {item.dot && (
                        <span className={cn(
                          'absolute rounded-full ring-2 ring-white',
                          dotColors[item.dot],
                          isCollapsed
                            ? 'w-1.5 h-1.5 -right-1 -top-0.5'
                            : 'w-1.5 h-1.5 -right-1.5 top-1/2 -translate-y-1/2'
                        )} />
                      )}
                    </div>
                    <AnimatePresence>
                      {!isCollapsed && (
                        <motion.span
                          initial={{ opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -6 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                          className="relative z-10 text-[14px] tracking-[-0.224px] whitespace-nowrap font-normal"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </>
                )}
              </NavLink>
            );

            if (isCollapsed) {
              return (
                <TooltipProvider key={item.path} delayDuration={150}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex justify-center">{link}</div>
                    </TooltipTrigger>
                    <TooltipContent
                      side="right"
                      sideOffset={14}
                      className="bg-[#1d1d1f] text-white text-[12px] font-normal px-3 py-1.5 rounded-full shadow-lg border-0"
                    >
                      {item.label}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            }

            return <div key={item.path}>{link}</div>;
          })}
        </nav>

        {/* Footer: Manual Collapse/Expand Toggle (Desktop only) */}
        {isDesktop && (
          <div className={cn(
            'flex items-center shrink-0 py-3 transition-all duration-200 border-t border-[#f0f0f0]',
            isCollapsed ? 'justify-center px-0' : 'justify-end px-3'
          )}>
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={toggleSidebar}
              className="flex items-center justify-center w-10 h-10 rounded-full border border-[#e0e0e0] bg-white text-neutral-600 hover:bg-[#f5f5f7] hover:text-[#1d1d1f] shadow-2xs transition-colors cursor-pointer"
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </motion.button>
          </div>
        )}
      </motion.aside>
    </>
  );
};
