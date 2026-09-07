import React from 'react';
import { Shield, Sparkles } from 'lucide-react';

interface PageContainerProps {
  title: string;
  subtitle?: string;
  badge?: string;
  badgeType?: 'safe' | 'warning' | 'critical' | 'info';
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
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1920px] mx-auto min-h-[calc(100vh-4rem)] flex flex-col justify-between">
      <div className="space-y-6">
        {/* Standard Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4 border-b border-polar-700/60">
          <div className="space-y-1 min-w-0">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-100 font-sans">
                {title}
              </h2>
              {badge && (
                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono font-medium border ${
                    badgeType === 'warning'
                      ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                      : badgeType === 'critical'
                      ? 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                      : badgeType === 'safe'
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                      : 'bg-ice-500/10 border-ice-500/30 text-ice-300'
                  }`}
                >
                  <Sparkles className="w-3 h-3" />
                  {badge}
                </span>
              )}
            </div>
            {subtitle && (
              <p className="text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>

          {actions && (
            <div className="flex items-center gap-2 flex-wrap flex-shrink-0">
              {actions}
            </div>
          )}
        </div>

        {/* Page Content Body */}
        <div className="w-full">{children}</div>
      </div>

      {/* Subtle Operational Footer Indicator */}
      <div className="pt-6 border-t border-polar-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-slate-400 gap-2">
        <div className="flex items-center gap-2">
          <Shield className="w-3.5 h-3.5 text-ice-400" />
          <span>POLARIS DECISION PLATFORM</span>
          <span className="text-polar-700">|</span>
          <span>ANTARCTIC HIGH-LATITUDE OPERATIONS</span>
        </div>
        <div className="flex items-center gap-3">
          <span>IMO POLAR CODE PC4 COMPLIANT</span>
          <span className="text-polar-700">|</span>
          <span className="text-emerald-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            READY
          </span>
        </div>
      </div>
    </div>
  );
};
