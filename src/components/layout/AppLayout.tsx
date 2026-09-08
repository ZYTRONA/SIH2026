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
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-900 flex flex-col antialiased selection:bg-black selection:text-white">
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
        <main className="flex-1 bg-[#FAFAFA] overflow-x-hidden">
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
        <footer className="bg-white border-t border-zinc-200 px-4 sm:px-6 py-3">
          <div className="max-w-[1920px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs font-mono text-zinc-500">
            <div className="flex items-start sm:items-center gap-2 text-zinc-700">
              <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5 sm:mt-0" />
              <p className="text-[11px] leading-relaxed text-zinc-600 font-sans">
                <span className="text-black font-bold uppercase tracking-wider mr-1.5 font-mono text-[10px]">
                  Safety Disclaimer:
                </span>
                POLARIS AI provides decision-support recommendations based on available environmental and vessel data. Final navigation decisions remain with the vessel&apos;s qualified master.
              </p>
            </div>
            <div className="flex items-center gap-3 text-[10px] sm:text-[11px] text-zinc-400 flex-shrink-0">
              <span className="flex items-center gap-1 text-zinc-900 font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-zinc-900" />
                IMO POLAR CODE PC1–PC7
              </span>
              <span className="text-zinc-300">|</span>
              <span className="text-zinc-500 font-medium">SMART INDIA HACKATHON 2026</span>
              <span className="text-zinc-300">|</span>
              <span className="text-black font-extrabold bg-zinc-100 px-1.5 py-0.5 rounded border border-zinc-200">POLARIS v1.0</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

