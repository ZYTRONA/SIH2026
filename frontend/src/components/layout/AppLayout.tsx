import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useAppStore } from '@/store/useAppStore';
import { useIsDesktop } from '@/hooks';

export const AppLayout: React.FC = () => {
  const { sidebarCollapsed } = useAppStore();
  const location = useLocation();
  const isDesktop = useIsDesktop();

  const appleEasing = [0.32, 0.72, 0, 1] as const;

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f] antialiased">
      {/* Fixed Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <motion.div
        initial={false}
        animate={{
          marginLeft: isDesktop ? (sidebarCollapsed ? 72 : 240) : 0,
        }}
        transition={{ duration: 0.26, ease: appleEasing }}
        className="min-h-screen flex flex-col will-change-[margin-left]"
      >
        {/* Apple 2-Tier Sticky Header */}
        <Header />

        {/* Page Content with Smooth Apple View Transition */}
        <main className="flex-1 overflow-x-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18, ease: [0.2, 0.8, 0.2, 1] }}
              className="w-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </motion.div>
    </div>
  );
};
