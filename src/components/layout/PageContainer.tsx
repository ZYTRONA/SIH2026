import React from 'react';
import { Sparkles } from 'lucide-react';

interface PageContainerProps {
  title: string;
  subtitle?: string;
  badge?: string;
  badgeType?: 'safe' | 'warning' | 'critical' | 'info' | 'active';
  children: React.ReactNode;
  actions?: React.ReactNode;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  title,
  subtitle,
  badge,
  badgeType = 'info',
  children,
  actions,
}) => {
  return (
    <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Standardized Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4 border-b border-zinc-200">
        <div className="space-y-1 min-w-0">
          <div className="flex items-center gap-2.5 flex-wrap">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-zinc-950 font-sans">
              {title}
            </h2>
            {badge && (
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold border ${
                  badgeType === 'warning'
                    ? 'bg-amber-50 border-amber-300 text-amber-900'
                    : badgeType === 'critical'
                    ? 'bg-rose-50 border-rose-300 text-rose-900'
                    : badgeType === 'safe'
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                    : badgeType === 'active'
                    ? 'bg-black border-black text-white'
                    : 'bg-zinc-100 border-zinc-300 text-zinc-900'
                }`}
              >
                <Sparkles className="w-3 h-3" />
                {badge}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-xs sm:text-sm text-zinc-600 max-w-4xl leading-relaxed font-normal">
              {subtitle}
            </p>
          )}
        </div>

        {actions && (
          <div className="flex items-center gap-2 flex-wrap shrink-0 self-start md:self-auto">
            {actions}
          </div>
        )}
      </div>

      {/* Page Content Body */}
      <div className="w-full">{children}</div>
    </div>
  );
};
