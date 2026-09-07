import React from 'react';

export type StatusType = 'safe' | 'warning' | 'critical' | 'info' | 'active';

interface StatusIndicatorProps {
  status: StatusType;
  label?: string;
  variant?: 'dot' | 'badge' | 'pill';
  pulse?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const statusConfig: Record<
  StatusType,
  {
    dotColor: string;
    pulseColor: string;
    badgeBg: string;
    badgeBorder: string;
    textColor: string;
    defaultLabel: string;
  }
> = {
  safe: {
    dotColor: 'bg-emerald-400',
    pulseColor: 'bg-emerald-400/40',
    badgeBg: 'bg-emerald-500/10',
    badgeBorder: 'border-emerald-500/30',
    textColor: 'text-emerald-400',
    defaultLabel: 'Operational',
  },
  warning: {
    dotColor: 'bg-amber-400',
    pulseColor: 'bg-amber-400/40',
    badgeBg: 'bg-amber-500/10',
    badgeBorder: 'border-amber-500/30',
    textColor: 'text-amber-400',
    defaultLabel: 'Caution',
  },
  critical: {
    dotColor: 'bg-rose-500',
    pulseColor: 'bg-rose-500/40',
    badgeBg: 'bg-rose-500/10',
    badgeBorder: 'border-rose-500/30',
    textColor: 'text-rose-400',
    defaultLabel: 'Hazard',
  },
  info: {
    dotColor: 'bg-sky-400',
    pulseColor: 'bg-sky-400/40',
    badgeBg: 'bg-sky-500/10',
    badgeBorder: 'border-sky-500/30',
    textColor: 'text-sky-400',
    defaultLabel: 'Info',
  },
  active: {
    dotColor: 'bg-cyan-400',
    pulseColor: 'bg-cyan-400/50',
    badgeBg: 'bg-cyan-500/10',
    badgeBorder: 'border-cyan-500/30',
    textColor: 'text-cyan-300',
    defaultLabel: 'Active',
  },
};

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  label,
  variant = 'badge',
  pulse = true,
  size = 'md',
  className = '',
}) => {
  const config = statusConfig[status];
  const displayLabel = label ?? config.defaultLabel;

  const dotSize =
    size === 'sm' ? 'w-1.5 h-1.5' : size === 'lg' ? 'w-2.5 h-2.5' : 'w-2 h-2';

  if (variant === 'dot') {
    return (
      <span className={`relative inline-flex items-center ${className}`}>
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
        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-mono font-medium ${config.badgeBg} ${config.badgeBorder} border ${config.textColor} ${className}`}
      >
        <span className={`relative inline-flex items-center`}>
          {pulse && (
            <span
              className={`absolute inline-flex h-full w-full rounded-full animate-ping opacity-75 ${config.pulseColor}`}
            />
          )}
          <span className={`relative inline-block rounded-full ${dotSize} ${config.dotColor}`} />
        </span>
        <span>{displayLabel}</span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-mono font-medium ${config.badgeBg} ${config.badgeBorder} border ${config.textColor} ${className}`}
    >
      <span className={`relative inline-flex items-center`}>
        {pulse && (
          <span
            className={`absolute inline-flex h-full w-full rounded-full animate-ping opacity-75 ${config.pulseColor}`}
          />
        )}
        <span className={`relative inline-block rounded-full ${dotSize} ${config.dotColor}`} />
      </span>
      <span>{displayLabel}</span>
    </span>
  );
};
