import React from 'react';
import {
  Snowflake,
  Mountain,
  ShieldAlert,
  Wind,
  Ship,
  Clock,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import { KPICardData } from '@/data/dashboardData';

const iconMap = {
  Snowflake,
  Mountain,
  ShieldAlert,
  Wind,
  Ship,
  Clock,
};

interface KPICardProps {
  data: KPICardData;
}

export const KPICard: React.FC<KPICardProps> = ({ data }) => {
  const Icon = iconMap[data.iconName] || ShieldAlert;

  const getStatusClasses = () => {
    switch (data.status) {
      case 'warning':
        return {
          iconBg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
          badge: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
          indicator: 'bg-amber-400',
        };
      case 'critical':
        return {
          iconBg: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
          badge: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
          indicator: 'bg-rose-500',
        };
      case 'safe':
        return {
          iconBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
          badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
          indicator: 'bg-emerald-400',
        };
      default:
        return {
          iconBg: 'bg-ice-500/10 text-ice-400 border-ice-500/30',
          badge: 'bg-ice-500/15 text-ice-300 border-ice-500/30',
          indicator: 'bg-ice-400',
        };
    }
  };

  const colors = getStatusClasses();

  return (
    <div className="polar-panel p-4 flex flex-col justify-between hover:border-polar-600/80 transition-colors group">
      {/* Top Header */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="text-[11px] font-mono tracking-wider text-slate-400 font-semibold uppercase">
          {data.label}
        </span>
        <div
          className={`flex items-center justify-center w-7 h-7 rounded border ${colors.iconBg} flex-shrink-0`}
        >
          <Icon className="w-4 h-4" />
        </div>
      </div>

      {/* Primary Metric Value */}
      <div className="my-1 flex items-baseline justify-between gap-2">
        <span className="text-xl sm:text-2xl font-bold font-sans tracking-tight text-slate-100">
          {data.value}
        </span>

        {/* Status or Trend Badge */}
        {data.trend && (
          <span
            className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono border ${
              data.trendDirection === 'down'
                ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
            }`}
          >
            {data.trendDirection === 'up' && <TrendingUp className="w-3 h-3" />}
            {data.trendDirection === 'down' && <TrendingDown className="w-3 h-3" />}
            {data.trend}
          </span>
        )}

        {data.statusText && !data.trend && (
          <span
            className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono font-medium border ${colors.badge}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${colors.indicator}`} />
            {data.statusText}
          </span>
        )}
      </div>

      {/* Supporting Information Footer */}
      <div className="pt-2 mt-1 border-t border-polar-700/50 flex items-center justify-between text-[11px] text-slate-400 font-sans truncate">
        <span className="truncate">{data.supportingInfo}</span>
      </div>
    </div>
  );
};
