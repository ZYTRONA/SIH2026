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
        `relative group flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all duration-200 select-none ${
          isActive
            ? 'bg-sky-50 text-sky-900 font-semibold border-l-2 border-sky-600 pl-[11px] shadow-xs'
            : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100/80 border-l-2 border-transparent pl-[11px]'
        } ${collapsed ? 'justify-center !px-0 !pl-0 !border-l-0' : ''}`
      }
      title={collapsed ? label : undefined}
    >
      {({ isActive }) => (
        <>
          {/* Active subtle background */}
          {isActive && (
            <motion.div
              layoutId="activeNavBackground"
              className="absolute inset-0 bg-sky-50 rounded-lg border border-sky-200/80 -z-10"
              transition={{ type: 'spring', stiffness: 450, damping: 35 }}
            />
          )}

          <Icon
            className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 group-hover:scale-110 ${
              isActive
                ? 'text-sky-600'
                : 'text-slate-400 group-hover:text-slate-700'
            }`}
          />

          {!collapsed && (
            <span className="flex-1 truncate tracking-tight font-sans">{label}</span>
          )}

          {!collapsed && badge && (
            <span
              className={`px-1.5 py-0.5 text-[9px] font-mono rounded-md border font-semibold tracking-wider ${
                badgeType === 'warning'
                  ? 'bg-amber-50 border-amber-200 text-amber-700'
                  : badgeType === 'safe'
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                  : 'bg-sky-50 border-sky-200 text-sky-700'
              }`}
            >
              {badge}
            </span>
          )}

          {/* Active dot beacon when collapsed */}
          {collapsed && isActive && (
            <span className="absolute right-2 top-2 w-1.5 h-1.5 rounded-full bg-sky-600 animate-pulse" />
          )}
        </>
      )}
    </NavLink>
  );
};

