import React from 'react';
import { NavLink } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface NavigationItemProps {
  to: string;
  label: string;
  icon: LucideIcon | React.ComponentType<{ className?: string }>;
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
  const navLink = (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        cn(
          'flex items-center gap-3 rounded-lg transition-all duration-150 relative min-h-[40px]',
          collapsed ? 'justify-center px-0 py-2' : 'px-3 py-2',
          isActive
            ? 'bg-zinc-900 text-white font-semibold shadow-sm'
            : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900'
        )
      }
    >
      {({ isActive }) => (
        <>
          {/* Icon */}
          <Icon
            className={cn(
              'h-[18px] w-[18px] flex-shrink-0',
              isActive ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-600'
            )}
          />

          {/* Label + Badge */}
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-1 items-center justify-between min-w-0"
            >
              <span className={cn(
                'text-[13px] font-semibold truncate',
                isActive ? 'text-white' : 'text-zinc-600'
              )}>
                {label}
              </span>

              {badge && (
                <span className={cn(
                  'ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center',
                  badgeType === 'warning'
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-zinc-100 text-zinc-600'
                )}>
                  {badge}
                </span>
              )}
            </motion.div>
          )}

          {/* Collapsed Badge */}
          {collapsed && badge && (
            <span className={cn(
              'absolute -top-0.5 -right-0.5 min-w-[16px] h-4 flex items-center justify-center rounded-full text-[9px] font-bold px-1',
              badgeType === 'warning'
                ? 'bg-amber-500 text-white'
                : 'bg-zinc-500 text-white'
            )}>
              {badge}
            </span>
          )}
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
            className="flex items-center gap-2 bg-zinc-900 text-white text-xs font-semibold px-3 py-2 rounded-lg shadow-xl"
          >
            <span>{label}</span>
            {badge && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/20 font-bold">
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
