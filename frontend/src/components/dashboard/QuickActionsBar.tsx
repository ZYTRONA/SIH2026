import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass, Snowflake, Mountain, Route, ArrowUpRight, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export const QuickActionsBar: React.FC = () => {
  const navigate = useNavigate();

  const actions = [
    {
      label: 'Plan Mission',
      description: 'Expedition waypoints & stations',
      path: '/mission-planner',
      icon: Compass,
    },
    {
      label: 'Sea-Ice Forecast',
      description: 'SAR ice thickness & drift modeling',
      path: '/sea-ice',
      icon: Snowflake,
    },
    {
      label: 'Iceberg Radar',
      description: '37 tracked icebergs & drift vectors',
      path: '/icebergs',
      icon: Mountain,
    },
    {
      label: 'Route Optimizer',
      description: 'Multi-objective AI polar navigation',
      path: '/routes',
      icon: Route,
    },
  ];

  return (
    <div className="apple-card p-0 overflow-hidden select-none shadow-2xs">
      <div className="px-5 py-4 flex flex-row items-center justify-between border-b border-[#f0f0f0] bg-[#fafafc]">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-[8px] bg-white border border-[#e0e0e0] text-[#0066cc]">
            <Zap className="w-4 h-4" />
          </div>
          <h3 className="text-[15px] sm:text-[16px] font-semibold text-[#1d1d1f] tracking-tight">
            Tactical Quick Launch
          </h3>
        </div>
        <span className="text-[12px] text-neutral-500 font-normal">
          Bridge Fast Deck
        </span>
      </div>

      <div className="p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <motion.button
                key={action.path}
                whileHover={{ y: -2, scale: 1.01, transition: { type: 'spring', stiffness: 450, damping: 25 } }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate(action.path)}
                className="p-3.5 rounded-[14px] bg-[#fafafc] hover:bg-[#f5f5f7] border border-[#e0e0e0] hover:border-[#0066cc] text-left transition-colors duration-150 group flex items-start justify-between gap-2 min-h-[56px] select-none cursor-pointer"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className="p-2 rounded-[8px] bg-white border border-[#e0e0e0] text-[#1d1d1f] group-hover:bg-[#0066cc] group-hover:text-white group-hover:border-[#0066cc] transition-colors shrink-0 mt-0.5">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[14px] font-semibold text-[#1d1d1f] group-hover:text-[#0066cc] truncate tracking-[-0.224px]">
                      {action.label}
                    </div>
                    <div className="text-[12px] text-neutral-500 mt-0.5 font-normal truncate">
                      {action.description}
                    </div>
                  </div>
                </div>

                <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-[#0066cc] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-1" />
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

