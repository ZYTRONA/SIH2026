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
      accent: 'hover:border-sky-300',
    },
    {
      label: 'View Sea-Ice Forecast',
      description: 'SAR ice thickness & drift modeling',
      path: '/sea-ice',
      icon: Snowflake,
      accent: 'hover:border-sky-300',
    },
    {
      label: 'View Icebergs',
      description: '37 tracked icebergs & drift vectors',
      path: '/icebergs',
      icon: Mountain,
      accent: 'hover:border-amber-300',
    },
    {
      label: 'Optimize Route',
      description: 'Multi-objective AI polar navigation',
      path: '/routes',
      icon: Route,
      accent: 'hover:border-emerald-300',
    },
  ];

  return (
    <div className="bg-white border border-slate-200/90 rounded-xl p-5 space-y-3 shadow-xs">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <h3 className="text-sm font-bold font-sans text-slate-900">
          Command Quick Actions
        </h3>
        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-semibold">
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
              className={`p-3 rounded-xl bg-slate-50 hover:bg-white border border-slate-200 text-left transition-all duration-200 group flex items-start justify-between gap-2 shadow-2xs hover:shadow-md ${action.accent}`}
            >
              <div className="flex items-start gap-2.5">
                <div className="p-1.5 rounded-lg bg-white border border-slate-200 text-sky-600 group-hover:bg-sky-50 group-hover:border-sky-200 transition-colors shadow-2xs">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold font-sans text-slate-900 group-hover:text-sky-700 transition-colors">
                    {action.label}
                  </div>
                  <div className="text-[10px] font-sans text-slate-500 mt-0.5">
                    {action.description}
                  </div>
                </div>
              </div>

              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0" />
            </button>
          );
        })}
      </div>
    </div>
  );
};
