import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass, Snowflake, Mountain, Route, ArrowUpRight } from 'lucide-react';

export const QuickActionsBar: React.FC = () => {
  const navigate = useNavigate();

  const actions = [
    {
      label: 'Plan Mission',
      description: 'Expedition waypoints & stations',
      path: '/mission-planner',
      icon: Compass,
      accent: 'text-ice-400 hover:border-ice-500/50',
    },
    {
      label: 'View Sea-Ice Forecast',
      description: 'SAR ice thickness & drift modeling',
      path: '/sea-ice',
      icon: Snowflake,
      accent: 'text-cyan-400 hover:border-cyan-500/50',
    },
    {
      label: 'View Icebergs',
      description: '37 tracked icebergs & drift vectors',
      path: '/icebergs',
      icon: Mountain,
      accent: 'text-amber-400 hover:border-amber-500/50',
    },
    {
      label: 'Optimize Route',
      description: 'Multi-objective AI polar navigation',
      path: '/routes',
      icon: Route,
      accent: 'text-emerald-400 hover:border-emerald-500/50',
    },
  ];

  return (
    <div className="polar-panel p-5 space-y-3">
      <div className="flex items-center justify-between pb-2 border-b border-polar-700/60">
        <h3 className="text-sm font-bold font-sans text-slate-100">
          Command Quick Actions
        </h3>
        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
          Module Fast Launch
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.path}
              onClick={() => navigate(action.path)}
              className={`p-3 rounded-lg bg-polar-900/90 border border-polar-700/60 hover:bg-polar-800 text-left transition-all group flex items-start justify-between gap-2 ${action.accent}`}
            >
              <div className="flex items-start gap-2.5">
                <div className="p-1.5 rounded bg-polar-800 border border-polar-700 group-hover:border-polar-600 transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold font-sans text-slate-200 group-hover:text-slate-100">
                    {action.label}
                  </div>
                  <div className="text-[10px] font-sans text-slate-400 mt-0.5">
                    {action.description}
                  </div>
                </div>
              </div>

              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-200 transition-colors flex-shrink-0" />
            </button>
          );
        })}
      </div>
    </div>
  );
};
