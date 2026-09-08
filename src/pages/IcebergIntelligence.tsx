import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  HIGH_PRIORITY_ICEBERGS,
  DetailedIceberg,
} from '@/data/icebergIntelligenceData';
import {
  PolarStereographicMap,
  ActiveIcebergsList,
  KeyMetricsPanel,
  IcebergModalCatalog,
} from '@/components/iceberg';
import {
  ShieldAlert,
  RotateCw,
  Bell,
  Settings,
  Clock,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const IcebergIntelligence: React.FC = () => {
  const [selectedIceberg, setSelectedIceberg] = useState<DetailedIceberg>(
    HIGH_PRIORITY_ICEBERGS[0] // IB-023
  );
  const [catalogModalOpen, setCatalogModalOpen] = useState<boolean>(false);
  const [lastUpdatedMin, setLastUpdatedMin] = useState<number>(2);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [notificationCount, setNotificationCount] = useState<number>(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setLastUpdatedMin((prev) => prev + 1);
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setLastUpdatedMin(0);
      setIsRefreshing(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f] flex flex-col justify-between selection:bg-[#0066cc] selection:text-white">
      {/* Top Banner / Navigation Header Bar */}
      <div className="bg-white border-b border-[#e0e0e0] sticky top-0 z-30 px-4 sm:px-6 py-3">
        <div className="max-w-[1920px] mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          {/* Left: Brand + Title + Threat Warning Badge */}
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-[8px] bg-[#1d1d1f] flex items-center justify-center text-white">
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3L2 19h20L12 3zm0 4.8l5.5 8.7h-11L12 7.8z" />
                  <path d="M12 9l3 5H9l3-5z" opacity="0.6" />
                </svg>
              </div>
              <span className="text-[14px] font-semibold text-[#1d1d1f]">
                POLARIS <span className="font-light text-neutral-500">AI</span>
              </span>
            </div>

            <div className="hidden sm:block h-4 w-px bg-[#e0e0e0]" />

            <h1 className="text-[16px] sm:text-[18px] font-semibold text-[#1d1d1f] tracking-[-0.224px]">
              Iceberg Intelligence & Drift Tracking
            </h1>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-50 border border-rose-200 text-rose-800 text-[12px] font-normal">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
              <span>7 Warning Targets</span>
            </div>
          </div>

          {/* Right: Refresh status + Notification Bell + Settings */}
          <div className="flex items-center gap-3 self-end md:self-auto text-[12px] text-neutral-600">
            <button
              onClick={handleRefresh}
              className="flex items-center gap-1.5 hover:text-[#1d1d1f] transition-colors py-1 px-2.5 rounded-full bg-[#f5f5f7] border border-[#e0e0e0]"
              title="Click to refresh telemetry feeds"
            >
              <RotateCw
                className={`w-3.5 h-3.5 text-neutral-500 ${
                  isRefreshing ? 'animate-spin text-[#0066cc]' : ''
                }`}
              />
              <span>
                {lastUpdatedMin === 0
                  ? 'Updated just now'
                  : `Updated ${lastUpdatedMin} min ago`}
              </span>
            </button>

            <div className="h-4 w-px bg-[#e0e0e0]" />

            {/* Notification Bell */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="relative p-1.5 rounded-full text-neutral-600 hover:text-[#1d1d1f] hover:bg-[#f5f5f7] transition-colors"
                  aria-label="Notifications"
                >
                  <Bell className="w-4 h-4" />
                  {notificationCount > 0 && (
                    <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-rose-500" />
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 p-0 bg-white border border-[#e0e0e0] shadow-xl rounded-[18px] overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-[#f0f0f0] bg-[#fafafc]">
                  <span className="text-[14px] font-semibold text-[#1d1d1f]">Drift Hazard Alerts</span>
                  <button
                    onClick={() => setNotificationCount(0)}
                    className="text-[12px] text-[#0066cc] hover:underline"
                  >
                    Clear all
                  </button>
                </div>
                <div className="divide-y divide-[#f0f0f0] max-h-60 overflow-y-auto text-[12px]">
                  <div className="p-3 hover:bg-[#fafafc] transition-colors">
                    <div className="flex items-center justify-between text-[11px] font-semibold text-rose-700 font-mono">
                      <span>IB-023 CPA ALERT</span>
                      <span className="text-neutral-400 font-normal">2m ago</span>
                    </div>
                    <p className="text-neutral-600 mt-1 leading-relaxed">
                      IB-023 predicted to cross transit corridor at 6.2 km. Collision probability 18.4%.
                    </p>
                  </div>
                  <div className="p-3 hover:bg-[#fafafc] transition-colors">
                    <div className="flex items-center justify-between text-[11px] font-semibold text-amber-700 font-mono">
                      <span>IB-041 DRIFT ACCELERATION</span>
                      <span className="text-neutral-400 font-normal">14m ago</span>
                    </div>
                    <p className="text-neutral-600 mt-1 leading-relaxed">
                      Drift speed increased to 0.98 km/h under Weddell Gyre acceleration.
                    </p>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="h-4 w-px bg-[#e0e0e0]" />

            {/* Settings Gear */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="p-1.5 rounded-full text-neutral-600 hover:text-[#1d1d1f] hover:bg-[#f5f5f7] transition-colors"
                  aria-label="Settings"
                >
                  <Settings className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 p-2 bg-white border border-[#e0e0e0] shadow-xl rounded-[18px]">
                <DropdownMenuLabel className="text-[14px] font-semibold text-[#1d1d1f]">
                  Sensor Feeds & Models
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-[12px] font-mono text-neutral-700 cursor-pointer">
                  Sentinel-1 SAR Feed: LIVE
                </DropdownMenuItem>
                <DropdownMenuItem className="text-[12px] font-mono text-neutral-700 cursor-pointer">
                  CryoSat-2 Altimetry: SYNCED
                </DropdownMenuItem>
                <DropdownMenuItem className="text-[12px] font-mono text-neutral-700 cursor-pointer">
                  Model: Polaris Drift v2.4
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Main Page Body */}
      <main className="flex-1 max-w-[1920px] w-full mx-auto px-4 sm:px-6 py-5 sm:py-6 space-y-5">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center text-[12px] text-neutral-500">
          <Link
            to="/dashboard"
            className="hover:text-[#0066cc] transition-colors"
          >
            Polaris AI Dashboard
          </Link>
          <span className="mx-2 text-neutral-300">/</span>
          <span className="text-[#1d1d1f] font-semibold">
            Iceberg Intelligence & Drift Tracking
          </span>
        </nav>

        {/* 3-Column Dashboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Column 1: Active Icebergs (Left Panel) */}
          <div className="lg:col-span-4 xl:col-span-3">
            <ActiveIcebergsList
              icebergs={HIGH_PRIORITY_ICEBERGS}
              selectedIceberg={selectedIceberg}
              onSelectIceberg={(ib) => setSelectedIceberg(ib)}
              onViewAll={() => setCatalogModalOpen(true)}
            />
          </div>

          {/* Column 2: Polar Stereographic Projection Map (Center Panel) */}
          <div className="lg:col-span-5 xl:col-span-6">
            <PolarStereographicMap
              icebergs={HIGH_PRIORITY_ICEBERGS}
              selectedIceberg={selectedIceberg}
              onSelectIceberg={(ib) => setSelectedIceberg(ib)}
            />
          </div>

          {/* Column 3: Key Metrics (Right Panel) */}
          <div className="lg:col-span-3 xl:col-span-3">
            <KeyMetricsPanel
              totalActiveCount={37}
              highRiskCount={7}
              incursionsCount={12}
              sarTrackedPct={94}
            />
          </div>
        </div>
      </main>

      {/* Footer Telemetry Strip */}
      <footer className="w-full bg-white border-t border-[#e0e0e0] px-4 sm:px-6 py-3.5 mt-6">
        <div className="max-w-[1920px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-[12px] text-neutral-500 font-mono">
          <div className="flex items-center gap-2 flex-wrap">
            <span>
              Data Source: Sentinel-1 SAR &bull; CryoSat-2 Altimetry &bull; Iceberg Drift AI
            </span>
            <span className="hidden md:inline text-neutral-300">|</span>
            <span className="text-[#1d1d1f] font-normal">
              Model: Polaris Iceberg Drift v2.4
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-1.5 text-neutral-600">
              <Clock className="w-3.5 h-3.5 text-neutral-400" />
              <span>All times calibrated in UTC</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Comprehensive 37 Iceberg Inspection Catalog Modal */}
      <IcebergModalCatalog
        isOpen={catalogModalOpen}
        onClose={() => setCatalogModalOpen(false)}
        selectedIceberg={selectedIceberg}
        onSelectIceberg={(ib) => setSelectedIceberg(ib)}
      />
    </div>
  );
};

export default IcebergIntelligence;
