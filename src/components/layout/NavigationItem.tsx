import React from 'react';
import { NavLink } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

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
  const getDotColor = () => {
    switch (badgeType) {
      case 'warning':
        return 'bg-amber-500 ring-2 ring-white animate-pulse';
      case 'safe':
        return 'bg-emerald-500 ring-2 ring-white';
      default:
        return 'bg-black ring-2 ring-white';
    }
  };

  const navLink = (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `group relative flex items-center h-10 select-none overflow-hidden transition-colors ${
          collapsed
            ? 'w-10 mx-auto justify-center rounded-xl'
            : 'w-full gap-3 px-3 rounded-xl text-xs font-medium'
        } ${
          isActive
            ? 'bg-black text-white font-bold shadow-xs'
            : 'text-zinc-600 hover:bg-zinc-100/90 hover:text-black'
        }`
      }
    >
      {({ isActive }) => (
        <>
          {/* Smooth layout transition for active background */}
          {isActive && (
            <motion.div
              layoutId="activeNavBackground"
              className="absolute inset-0 bg-black rounded-xl -z-10 shadow-xs"
              transition={{ type: 'spring', stiffness: 400, damping: 32 }}
            />
          )}

          {/* Icon with subtle hover scale */}
          <Icon
            className={`h-5 w-5 shrink-0 transition-transform duration-200 group-hover:scale-105 ${
              isActive ? 'text-white' : 'text-zinc-500 group-hover:text-black'
            }`}
          />

          {/* Animated Text Label & Badge (Smooth reveal on expand) */}
          <AnimatePresence initial={false}>
            {!collapsed && (
              <motion.div
                key="label-container"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10, transition: { duration: 0.12 } }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-1 items-center justify-between min-w-0 overflow-hidden"
              >
                <span className="truncate font-sans tracking-tight font-semibold text-xs">
                  {label}
                </span>

                {badge && (
                  <span
                    className={`ml-auto text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border ${
                      isActive
                        ? 'bg-white/20 text-white border-white/30'
                        : badgeType === 'warning'
                        ? 'bg-amber-100 text-amber-900 border-amber-300'
                        : badgeType === 'safe'
                        ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                        : 'bg-zinc-200 text-zinc-900 border-zinc-300'
                    }`}
                  >
                    {badge}
                  </span>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Clean micro indicator dot when collapsed */}
          <AnimatePresence>
            {collapsed && badge && (
              <motion.span
                key="collapsed-dot"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.18 }}
                className={`absolute top-1.5 right-1.5 w-2 h-2 rounded-full shadow-xs ${getDotColor()}`}
              />
            )}
          </AnimatePresence>
        </>
      )}
    </NavLink>
  );

  if (collapsed) {
    return (
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>{navLink}</TooltipTrigger>
          <TooltipContent
            side="right"
            sideOffset={12}
            className="flex items-center gap-2 bg-zinc-950 text-white border-zinc-800 text-xs font-mono font-bold px-2.5 py-1.5 rounded-lg shadow-2xl animate-in fade-in-0 zoom-in-95"
          >
            <span>{label}</span>
            {badge && (
              <span
                className={`text-[9px] px-1.5 py-0.5 rounded font-mono font-bold ${
                  badgeType === 'warning'
                    ? 'bg-amber-400 text-black'
                    : badgeType === 'safe'
                    ? 'bg-emerald-400 text-black'
                    : 'bg-zinc-700 text-white'
                }`}
              >
                {badge}
              </span>
            )}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return navLink;
};
