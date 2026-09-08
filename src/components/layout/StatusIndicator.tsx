import React from 'react';
import {
  ShieldAlert,
  AlertTriangle,
  ShieldCheck,
  Info,
  Radio,
} from 'lucide-react';

export type StatusType = 'safe' | 'warning' | 'critical' | 'info' | 'active';

interface StatusIndicatorProps {
  status: StatusType;
  label?: string;
  variant?: 'dot' | 'badge' | 'pill' | 'glyph-badge';
  pulse?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const statusConfig: Record<
  StatusType,
  {
    glyph: string;
    icon: React.FC<{ className?: string }>;
    dotColor: string;
    pulseColor: string;
    badgeBg: string;
    badgeBorder: string;
    textColor: string;
    defaultLabel: string;
  }
> = {
  safe: {
    glyph: '✓',
    icon: ShieldCheck,
    dotColor: 'bg-emerald-600',
    pulseColor: 'bg-emerald-400/50',
    badgeBg: 'bg-emerald-50 dark:bg-emerald-950/80',
    badgeBorder: 'border-emerald-300 dark:border-emerald-700',
    textColor: 'text-emerald-900 dark:text-emerald-300',
    defaultLabel: 'SAFE / NOMINAL',
  },
  warning: {
    glyph: '▲',
    icon: AlertTriangle,
    dotColor: 'bg-amber-500',
    pulseColor: 'bg-amber-400/50',
    badgeBg: 'bg-amber-50 dark:bg-amber-950/80',
    badgeBorder: 'border-amber-300 dark:border-amber-700',
    textColor: 'text-amber-900 dark:text-amber-300',
    defaultLabel: 'CAUTION',
  },
  critical: {
    glyph: '⬢',
    icon: ShieldAlert,
    dotColor: 'bg-rose-600',
    pulseColor: 'bg-rose-400/50',
    badgeBg: 'bg-rose-50 dark:bg-rose-950/80',
    badgeBorder: 'border-rose-300 dark:border-rose-700',
    textColor: 'text-rose-900 dark:text-rose-300',
    defaultLabel: 'CRITICAL HAZARD',
  },
  info: {
    glyph: '●',
    icon: Info,
    dotColor: 'bg-sky-600',
    pulseColor: 'bg-sky-400/50',
    badgeBg: 'bg-sky-50 dark:bg-sky-950/80',
    badgeBorder: 'border-sky-300 dark:border-sky-700',
    textColor: 'text-sky-900 dark:text-sky-300',
    defaultLabel: 'ADVISORY',
  },
  active: {
    glyph: '◉',
    icon: Radio,
    dotColor: 'bg-zinc-950 dark:bg-sky-400',
    pulseColor: 'bg-zinc-400/50 dark:bg-sky-400/40',
    badgeBg: 'bg-zinc-100 dark:bg-zinc-800',
    badgeBorder: 'border-zinc-300 dark:border-zinc-700',
    textColor: 'text-zinc-950 dark:text-white',
    defaultLabel: 'ACTIVE FEED',
  },
};

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  label,
  variant = 'glyph-badge',
  pulse = true,
  size = 'md',
  className = '',
}) => {
  const config = statusConfig[status] || statusConfig.info;
  const displayLabel = label ?? config.defaultLabel;
  const Icon = config.icon;

  const dotSize =
    size === 'sm' ? 'w-1.5 h-1.5' : size === 'lg' ? 'w-2.5 h-2.5' : 'w-2 h-2';

  if (variant === 'dot') {
    return (
      <span className={`relative inline-flex items-center ${className}`} title={displayLabel}>
        {pulse && (
          <span
            className={`absolute inline-flex h-full w-full rounded-full animate-ping opacity-75 ${config.pulseColor}`}
          />
        )}
        <span className={`relative inline-block rounded-full ${dotSize} ${config.dotColor}`} />
      </span>
    );
  }

  if (variant === 'pill') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-semibold ${config.badgeBg} ${config.badgeBorder} border ${config.textColor} shadow-2xs select-none ${className}`}
      >
        <span className="font-semibold text-[12px] leading-none" aria-hidden="true">
          {config.glyph}
        </span>
        <span className="tracking-wide">{displayLabel}</span>
      </span>
    );
  }

  if (variant === 'badge') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-semibold ${config.badgeBg} ${config.badgeBorder} border ${config.textColor} shadow-2xs select-none ${className}`}
      >
        <span className={`relative inline-flex items-center`}>
          {pulse && (
            <span
              className={`absolute inline-flex h-full w-full rounded-full animate-ping opacity-75 ${config.pulseColor}`}
            />
          )}
          <span className={`relative inline-block rounded-full ${dotSize} ${config.dotColor}`} />
        </span>
        <span className="tracking-tight">{displayLabel}</span>
      </span>
    );
  }

  // Default: Maritime Colorblind-Safe Glyph Badge (Icon + Geometric Glyph + Text)
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-semibold ${config.badgeBg} ${config.badgeBorder} border ${config.textColor} shadow-2xs select-none ${className}`}
    >
      <Icon className="w-3.5 h-3.5 shrink-0" />
      <span className="font-semibold text-[11px] opacity-80" aria-hidden="true">
        [{config.glyph}]
      </span>
      <span className="tracking-tight">{displayLabel}</span>
    </span>
  );
};
