import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Search,
  LayoutDashboard,
  Compass,
  Snowflake,
  Mountain,
  AlertTriangle,
  Route,
  BrainCircuit,
  Activity,
  Server,
  ArrowRight,
  Terminal,
} from 'lucide-react';

interface CommandSearchProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const quickNavLinks = [
  { path: '/dashboard', label: 'Mission Control Overview', icon: LayoutDashboard, category: 'Operational Deck' },
  { path: '/mission-planner', label: 'Voyage & Expedition Planner', icon: Compass, category: 'Tactical Planning' },
  { path: '/sea-ice', label: 'Spatiotemporal Sea-Ice Forecast', icon: Snowflake, category: 'SAR & Physics AI' },
  { path: '/icebergs', label: 'Iceberg Catalog & Drift Tracking', icon: Mountain, category: 'Hazard Tracking' },
  { path: '/risk', label: 'Antarctic POLARIS Risk Assessment', icon: AlertTriangle, category: 'Safety & RIO' },
  { path: '/routes', label: 'Pareto Route Optimization Center', icon: Route, category: 'Multi-Objective AI' },
  { path: '/explainability', label: 'Explainable AI (XAI) Attributions', icon: BrainCircuit, category: 'Decision Transparency' },
  { path: '/digital-twin', label: 'Antarctic Multi-Day Digital Twin', icon: Activity, category: 'Simulation Engine' },
  { path: '/system', label: 'Edge Telemetry & Cloud Pipelines', icon: Server, category: 'Infrastructure' },
];

export const CommandSearch: React.FC<CommandSearchProps> = ({ open, onOpenChange }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  // Keyboard shortcut listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onOpenChange]);

  const filtered = quickNavLinks.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase()) ||
    item.path.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (path: string) => {
    navigate(path);
    onOpenChange(false);
    setQuery('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden bg-white border border-[#e0e0e0] rounded-[18px]">
        <DialogHeader className="p-4 pb-0 border-none">
          <DialogTitle className="sr-only">Quick Command Navigator</DialogTitle>
          <DialogDescription className="sr-only">Search modules, waypoints, and tools</DialogDescription>
          
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-[#f5f5f7] border border-[#e0e0e0] focus-within:border-[#0066cc] focus-within:ring-2 focus-within:ring-[#0071e3] transition-all">
            <Search className="w-4 h-4 text-neutral-400 flex-shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Antarctic modules, waypoints, sensors (e.g. 'iceberg', 'routes', 'risk')..."
              className="w-full bg-transparent text-[14px] text-[#1d1d1f] placeholder:text-neutral-400 focus:outline-none font-normal tracking-[-0.224px]"
              autoFocus
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-[12px] text-neutral-400 hover:text-[#1d1d1f] font-normal"
              >
                Clear
              </button>
            )}
          </div>
        </DialogHeader>

        <div className="p-4 pt-2 max-h-80 overflow-y-auto space-y-1">
          <div className="px-2 py-1.5 text-[11px] uppercase tracking-wider text-neutral-400 font-semibold flex items-center justify-between">
            <span>Navigation Modules</span>
            <span className="text-[10px] text-neutral-400 font-normal">↑↓ to navigate</span>
          </div>

          {filtered.length === 0 ? (
            <div className="p-6 text-center text-[14px] text-neutral-500 font-normal">
              No matching modules found for &quot;{query}&quot;
            </div>
          ) : (
            filtered.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  onClick={() => handleSelect(item.path)}
                  className="w-full flex items-center justify-between p-3 rounded-[12px] text-left hover:bg-[#f5f5f7] border border-transparent hover:border-[#e0e0e0] transition-all group active:scale-95 cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2 rounded-[8px] bg-[#f5f5f7] border border-[#e0e0e0] text-[#1d1d1f] group-hover:text-white group-hover:bg-[#0066cc] group-hover:border-[#0066cc] transition-colors shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[14px] font-semibold text-[#1d1d1f] group-hover:text-[#0066cc] truncate tracking-[-0.224px]">
                        {item.label}
                      </div>
                      <div className="text-[12px] text-neutral-500 font-normal truncate">
                        {item.category} &bull; <span className="text-neutral-700 font-mono">{item.path}</span>
                      </div>
                    </div>
                  </div>

                  <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-[#0066cc] group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                </button>
              );
            })
          )}
        </div>

        <div className="px-5 py-3 bg-[#fafafc] border-t border-[#f0f0f0] flex items-center justify-between text-[12px] text-neutral-500">
          <span className="flex items-center gap-1.5 text-neutral-700 font-normal">
            <Terminal className="w-3.5 h-3.5 text-[#0066cc]" />
            POLARIS AI Quick Launch Console
          </span>
          <span>Press ESC to exit</span>
        </div>
      </DialogContent>
    </Dialog>
  );
};
