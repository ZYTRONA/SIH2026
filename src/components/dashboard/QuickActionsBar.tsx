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
      accent: 'hover:border-black',
    },
    {
      label: 'View Sea-Ice Forecast',
      description: 'SAR ice thickness & drift modeling',
      path: '/sea-ice',
      icon: Snowflake,
      accent: 'hover:border-black',
    },
    {
      label: 'View Icebergs',
      description: '37 tracked icebergs & drift vectors',
      path: '/icebergs',
      icon: Mountain,
      accent: 'hover:border-black',
    },
    {
      label: 'Optimize Route',
      description: 'Multi-objective AI polar navigation',
      path: '/routes',
      icon: Route,
      accent: 'hover:border-black',
    },
  ];

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 space-y-3 shadow-xs">
      <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
        <h3 className="text-sm font-bold font-sans text-zinc-950">
          Command Quick Actions
        </h3>
        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider font-bold">
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
              className={`p-3.5 rounded-xl bg-white hover:bg-zinc-50 border border-zinc-200 text-left transition-all duration-200 group flex items-start justify-between gap-2 shadow-xs hover:shadow-md ${action.accent}`}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-zinc-100 border border-zinc-200 text-zinc-900 group-hover:bg-black group-hover:text-white transition-colors shadow-2xs">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold font-sans text-zinc-950 group-hover:text-black transition-colors">
                    {action.label}
                  </div>
                  <div className="text-[10px] font-sans text-zinc-500 mt-0.5 font-medium">
                    {action.description}
                  </div>
                </div>
              </div>

              <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0" />
            </button>
          );
        })}
      </div>
    </div>
  );
};
