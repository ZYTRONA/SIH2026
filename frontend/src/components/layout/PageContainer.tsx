import React from 'react';
import { ShieldCheck, AlertTriangle, ShieldAlert, Info } from 'lucide-react';

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
  const getBadgeIcon = () => {
    switch (badgeType) {
      case 'critical':
        return <ShieldAlert className="w-3.5 h-3.5 shrink-0 text-rose-600" />;
      case 'warning':
        return <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-amber-600" />;
      case 'safe':
        return <ShieldCheck className="w-3.5 h-3.5 shrink-0 text-emerald-600" />;
      default:
        return <Info className="w-3.5 h-3.5 shrink-0 text-neutral-500" />;
    }
  };

  const getBadgeClasses = () => {
    switch (badgeType) {
      case 'warning':
        return 'bg-amber-50 border-amber-200 text-amber-900';
      case 'critical':
        return 'bg-rose-50 border-rose-200 text-rose-900';
      case 'safe':
        return 'bg-emerald-50 border-emerald-200 text-emerald-900';
      case 'active':
        return 'bg-[#0066cc] border-[#0066cc] text-white';
      default:
        return 'bg-[#f5f5f7] border-[#e0e0e0] text-[#1d1d1f]';
    }
  };

  return (
    <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
      {/* Apple Display Headline & Editorial Lead Subtitle */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 pb-5 border-b border-[#e0e0e0]">
        <div className="space-y-1.5 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-[28px] sm:text-[34px] lg:text-[40px] font-semibold tracking-[-0.28px] text-[#1d1d1f] leading-[1.1]">
              {title}
            </h1>
            {badge && (
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-normal border ${getBadgeClasses()}`}
              >
                {badgeType === 'safe' || badgeType === 'active' ? (
                  <span className="relative flex h-2 w-2 mr-0.5 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                ) : (
                  getBadgeIcon()
                )}
                <span>{badge}</span>
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-[14px] sm:text-[17px] text-neutral-600 max-w-4xl leading-[1.47] tracking-[-0.374px] font-normal">
              {subtitle}
            </p>
          )}
        </div>

        {actions && (
          <div className="flex items-center gap-2.5 flex-wrap shrink-0 self-start md:self-auto">
            {actions}
          </div>
        )}
      </div>

      {/* Page Content Body */}
      <div className="w-full space-y-6">{children}</div>
    </div>
  );
};
