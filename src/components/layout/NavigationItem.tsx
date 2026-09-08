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
        `relative group flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 select-none ${
          isActive
            ? 'bg-black text-white font-bold shadow-xs'
            : 'text-zinc-600 hover:text-black hover:bg-zinc-100'
        } ${collapsed ? 'justify-center !px-0' : ''}`
      }
      title={collapsed ? label : undefined}
    >
      {({ isActive }) => (
        <>
          {/* Active subtle background */}
          {isActive && (
            <motion.div
              layoutId="activeNavBackground"
              className="absolute inset-0 bg-black rounded-xl -z-10 shadow-xs"
              transition={{ type: 'spring', stiffness: 450, damping: 35 }}
            />
          )}

          <Icon
            className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 group-hover:scale-110 ${
              isActive
                ? 'text-white'
                : 'text-zinc-500 group-hover:text-black'
            }`}
          />

          {!collapsed && (
            <span className="flex-1 truncate tracking-tight font-sans font-medium">{label}</span>
          )}

          {!collapsed && badge && (
            <span
              className={`px-1.5 py-0.5 text-[9px] font-mono rounded-md border font-bold tracking-wider ${
                isActive
                  ? 'bg-white text-black border-white'
                  : badgeType === 'warning'
                  ? 'bg-amber-50 border-amber-200 text-amber-800'
                  : badgeType === 'safe'
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                  : 'bg-zinc-100 border-zinc-200 text-zinc-900'
              }`}
            >
              {badge}
            </span>
          )}

          {/* Active dot beacon when collapsed */}
          {collapsed && isActive && (
            <span className="absolute right-2 top-2 w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
          )}
        </>
      )}
    </NavLink>
  );
};

