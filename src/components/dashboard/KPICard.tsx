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
          iconBg: 'bg-amber-50 text-amber-900 border-amber-300',
          badge: 'bg-amber-50 text-amber-900 border-amber-300',
          indicator: 'bg-amber-500',
          borderHover: 'hover:border-zinc-400',
        };
      case 'critical':
        return {
          iconBg: 'bg-rose-50 text-rose-900 border-rose-300',
          badge: 'bg-rose-50 text-rose-900 border-rose-300',
          indicator: 'bg-rose-500',
          borderHover: 'hover:border-zinc-400',
        };
      case 'safe':
        return {
          iconBg: 'bg-emerald-50 text-emerald-900 border-emerald-300',
          badge: 'bg-emerald-50 text-emerald-900 border-emerald-300',
          indicator: 'bg-emerald-600',
          borderHover: 'hover:border-zinc-400',
        };
      default:
        return {
          iconBg: 'bg-zinc-100 text-zinc-900 border-zinc-200',
          badge: 'bg-zinc-100 text-zinc-900 border-zinc-300',
          indicator: 'bg-zinc-900',
          borderHover: 'hover:border-black/40',
        };
    }
  };

  const colors = getStatusClasses();

  return (
    <div
      className={`bg-white border border-zinc-200/90 rounded-xl p-4 flex flex-col justify-between h-full min-h-[148px] shadow-xs ${colors.borderHover} transition-all duration-200 group hover:-translate-y-0.5 hover:shadow-md`}
    >
      {/* Top Header */}
      <div className="flex items-start justify-between gap-2">
        <span className="text-[10px] sm:text-[11px] font-mono tracking-wider text-zinc-500 font-bold uppercase truncate">
          {data.label}
        </span>
        <div
          className={`flex items-center justify-center w-7 h-7 rounded-lg border ${colors.iconBg} shrink-0 transition-transform duration-200 group-hover:scale-105 shadow-2xs`}
        >
          <Icon className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Primary Metric Value */}
      <div className="my-1.5 flex items-baseline justify-between gap-2 flex-wrap">
        <span className="text-2xl sm:text-3xl font-extrabold font-sans tracking-tight text-zinc-950 tabular-nums">
          {data.value}
        </span>

        {/* Status or Trend Badge */}
        {data.trend && (
          <span
            className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-mono border font-bold ${
              data.trendDirection === 'down'
                ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                : 'bg-amber-50 text-amber-900 border-amber-300'
            }`}
          >
            {data.trendDirection === 'up' && <TrendingUp className="w-3 h-3" />}
            {data.trendDirection === 'down' && <TrendingDown className="w-3 h-3" />}
            {data.trend}
          </span>
        )}

        {data.statusText && !data.trend && (
          <span
            className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-mono font-bold border ${colors.badge}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${colors.indicator}`} />
            {data.statusText}
          </span>
        )}
      </div>

      {/* Supporting Information Footer */}
      <div className="pt-2.5 mt-1 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-600 font-sans font-medium truncate">
        <span className="truncate">{data.supportingInfo}</span>
      </div>
    </div>
  );
};
