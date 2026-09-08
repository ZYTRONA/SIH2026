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
      <DialogContent className="max-w-2xl p-0 overflow-hidden bg-white border border-zinc-200 shadow-2xl rounded-2xl">
        <DialogHeader className="p-4 pb-0 border-none">
          <DialogTitle className="sr-only">Quick Command Navigator</DialogTitle>
          <DialogDescription className="sr-only">Search modules, waypoints, and tools</DialogDescription>
          
          <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 focus-within:border-black focus-within:ring-2 focus-within:ring-black/10 transition-all">
            <Search className="w-4 h-4 text-zinc-500 flex-shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Antarctic modules, waypoints, sensors (e.g. 'iceberg', 'routes', 'risk')..."
              className="w-full bg-transparent text-xs font-mono text-zinc-900 placeholder:text-zinc-400 focus:outline-none font-medium"
              autoFocus
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-[10px] font-mono text-zinc-400 hover:text-black font-bold"
              >
                Clear
              </button>
            )}
          </div>
        </DialogHeader>

        <div className="p-4 pt-2 max-h-80 overflow-y-auto space-y-1">
          <div className="px-2 py-1.5 text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold flex items-center justify-between">
            <span>Navigation Modules</span>
            <span className="text-[9px] text-zinc-400 font-bold">↑↓ to navigate</span>
          </div>

          {filtered.length === 0 ? (
            <div className="p-6 text-center text-xs font-mono text-zinc-500">
              No matching modules found for &quot;{query}&quot;
            </div>
          ) : (
            filtered.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  onClick={() => handleSelect(item.path)}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl text-left hover:bg-zinc-100 border border-transparent hover:border-zinc-300 transition-all group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2 rounded-lg bg-zinc-100 border border-zinc-200 text-zinc-800 group-hover:text-white group-hover:bg-black group-hover:border-black transition-colors shadow-2xs">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-zinc-950 group-hover:text-black font-sans truncate">
                        {item.label}
                      </div>
                      <div className="text-[10px] font-mono text-zinc-500 truncate">
                        {item.category} • <span className="text-zinc-900 font-bold">{item.path}</span>
                      </div>
                    </div>
                  </div>

                  <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-black group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                </button>
              );
            })
          )}
        </div>

        <div className="px-4 py-2.5 bg-zinc-50 border-t border-zinc-200 flex items-center justify-between text-[10px] font-mono text-zinc-500">
          <span className="flex items-center gap-1.5 font-bold text-zinc-700">
            <Terminal className="w-3.5 h-3.5 text-black" />
            POLARIS AI Quick Launch Console
          </span>
          <span className="font-semibold">Press ESC to exit</span>
        </div>
      </DialogContent>
    </Dialog>
  );
};
