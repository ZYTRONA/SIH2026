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
    dotColor: 'bg-emerald-500',
    pulseColor: 'bg-emerald-400/50',
    badgeBg: 'bg-emerald-50',
    badgeBorder: 'border-emerald-200',
    textColor: 'text-emerald-700',
    defaultLabel: 'Operational',
  },
  warning: {
    dotColor: 'bg-amber-500',
    pulseColor: 'bg-amber-400/50',
    badgeBg: 'bg-amber-50',
    badgeBorder: 'border-amber-200',
    textColor: 'text-amber-700',
    defaultLabel: 'Caution',
  },
  critical: {
    dotColor: 'bg-rose-500',
    pulseColor: 'bg-rose-400/50',
    badgeBg: 'bg-rose-50',
    badgeBorder: 'border-rose-200',
    textColor: 'text-rose-700',
    defaultLabel: 'Hazard',
  },
  info: {
    dotColor: 'bg-sky-500',
    pulseColor: 'bg-sky-400/50',
    badgeBg: 'bg-sky-50',
    badgeBorder: 'border-sky-200',
    textColor: 'text-sky-700',
    defaultLabel: 'Info',
  },
  active: {
    dotColor: 'bg-sky-600',
    pulseColor: 'bg-sky-400/50',
    badgeBg: 'bg-sky-50',
    badgeBorder: 'border-sky-200',
    textColor: 'text-sky-800',
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
