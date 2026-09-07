import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useAppStore } from '@/store/useAppStore';
import { AlertTriangle, ShieldCheck } from 'lucide-react';

export const AppLayout: React.FC = () => {
  const { sidebarCollapsed } = useAppStore();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-polar-950 text-slate-200 flex flex-col antialiased selection:bg-ice-500/30 selection:text-ice-100">
      {/* Fixed Left Sidebar */}
      <Sidebar />

      {/* Main App Canvas */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-200 ease-in-out ${
          sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-[270px]'
        }`}
      >
        {/* Top Header */}
        <Header />

        {/* Dynamic Page Content with Subtle Smooth Transition */}
        <main className="flex-1 bg-polar-950 overflow-x-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="w-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Persistent Global Safety Disclaimer Footer */}
        <footer className="bg-polar-950/95 border-t border-polar-800/80 px-4 sm:px-6 py-3">
          <div className="max-w-[1920px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs font-mono text-slate-400">
            <div className="flex items-start sm:items-center gap-2 text-slate-300">
              <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5 sm:mt-0" />
              <p className="text-[11px] leading-relaxed text-slate-400">
                <span className="text-slate-200 font-semibold uppercase tracking-wider mr-1.5">
                  Safety Disclaimer:
                </span>
                POLARIS AI provides decision-support recommendations based on available environmental and vessel data. Final navigation decisions remain with the vessel&apos;s qualified operator.
              </p>
            </div>
            <div className="flex items-center gap-3 text-[10px] sm:text-[11px] text-slate-500 flex-shrink-0">
              <span className="flex items-center gap-1 text-emerald-400 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                IMO POLAR CODE PC1–PC7
              </span>
              <span className="text-polar-700">|</span>
              <span>SMART INDIA HACKATHON 2026</span>
              <span className="text-polar-700">|</span>
              <span className="text-ice-400 font-semibold">POLARIS v1.0</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

