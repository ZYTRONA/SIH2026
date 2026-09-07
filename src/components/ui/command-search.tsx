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
  Sparkles,
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
      <DialogContent className="max-w-2xl p-0 overflow-hidden bg-white border border-slate-200 shadow-2xl rounded-2xl">
        <DialogHeader className="p-4 pb-0 border-none">
          <DialogTitle className="sr-only">Quick Command Navigator</DialogTitle>
          <DialogDescription className="sr-only">Search modules, waypoints, and tools</DialogDescription>
          
          <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus-within:border-sky-500 focus-within:ring-2 focus-within:ring-sky-500/20 transition-all">
            <Search className="w-4 h-4 text-sky-600 flex-shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Antarctic modules, waypoints, sensors (e.g. 'iceberg', 'routes', 'risk')..."
              className="w-full bg-transparent text-xs font-mono text-slate-800 placeholder:text-slate-400 focus:outline-none"
              autoFocus
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-[10px] font-mono text-slate-400 hover:text-slate-700 font-semibold"
              >
                Clear
              </button>
            )}
          </div>
        </DialogHeader>

        <div className="p-4 pt-2 max-h-80 overflow-y-auto space-y-1">
          <div className="px-2 py-1.5 text-[10px] font-mono uppercase tracking-widest text-slate-400 font-semibold flex items-center justify-between">
            <span>Navigation Modules</span>
            <span className="text-[9px] text-slate-400">↑↓ to navigate</span>
          </div>

          {filtered.length === 0 ? (
            <div className="p-6 text-center text-xs font-mono text-slate-500">
              No matching modules found for &quot;{query}&quot;
            </div>
          ) : (
            filtered.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  onClick={() => handleSelect(item.path)}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl text-left hover:bg-sky-50/70 border border-transparent hover:border-sky-200 transition-all group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2 rounded-lg bg-slate-100 border border-slate-200 text-slate-600 group-hover:text-sky-700 group-hover:bg-white group-hover:border-sky-200 transition-colors shadow-xs">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-slate-800 group-hover:text-sky-900 font-sans truncate">
                        {item.label}
                      </div>
                      <div className="text-[10px] font-mono text-slate-500 truncate">
                        {item.category} • <span className="text-sky-600 font-medium">{item.path}</span>
                      </div>
                    </div>
                  </div>

                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-sky-600 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                </button>
              );
            })
          )}
        </div>

        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[10px] font-mono text-slate-500">
          <span className="flex items-center gap-1.5 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            POLARIS AI Quick Launch Console
          </span>
          <span>Press ESC to exit</span>
        </div>
      </DialogContent>
    </Dialog>
  );
};
