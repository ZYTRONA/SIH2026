import React from 'react';
import { NavLink } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface NavigationItemProps {
  to: string;
  label: string;
  icon: LucideIcon;
  badge?: string;
  badgeType?: 'info' | 'warning' | 'safe';
  collapsed?: boolean;
  onClick?: () => void;
}

export const NavigationItem: React.FC<NavigationItemProps> = ({
  to,
  label,
  icon: Icon,
  badge,
  badgeType = 'info',
  collapsed = false,
  onClick,
}) => {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `relative group flex items-center gap-3 px-3 py-2.5 rounded-md text-xs font-medium transition-all duration-150 select-none ${
          isActive
            ? 'bg-polar-800 text-ice-300 font-semibold border-l-2 border-ice-400 pl-[10px] shadow-sm'
            : 'text-slate-400 hover:text-slate-100 hover:bg-polar-850/80 border-l-2 border-transparent pl-[10px]'
        } ${collapsed ? 'justify-center !px-0 !pl-0 !border-l-0' : ''}`
      }
      title={collapsed ? label : undefined}
    >
      {({ isActive }) => (
        <>
          {/* Subtle active background glow */}
          {isActive && (
            <motion.div
              layoutId="activeNavBackground"
              className="absolute inset-0 bg-ice-500/10 rounded-md -z-10"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}

          <Icon
            className={`w-4 h-4 flex-shrink-0 transition-colors ${
              isActive
                ? 'text-ice-400'
                : 'text-slate-400 group-hover:text-slate-200'
            }`}
          />

          {!collapsed && (
            <span className="flex-1 truncate tracking-tight">{label}</span>
          )}

          {!collapsed && badge && (
            <span
              className={`px-1.5 py-0.5 text-[10px] font-mono rounded border ${
                badgeType === 'warning'
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                  : badgeType === 'safe'
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                  : 'bg-ice-500/10 border-ice-500/30 text-ice-300'
              }`}
            >
              {badge}
            </span>
          )}

          {/* Active dot when collapsed */}
          {collapsed && isActive && (
            <span className="absolute right-1 top-1 w-1.5 h-1.5 rounded-full bg-ice-400" />
          )}
        </>
      )}
    </NavLink>
  );
};
