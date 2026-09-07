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
          iconBg: 'bg-amber-50 text-amber-600 border-amber-200 shadow-2xs',
          badge: 'bg-amber-50 text-amber-700 border-amber-200',
          indicator: 'bg-amber-500',
          borderHover: 'hover:border-amber-300',
        };
      case 'critical':
        return {
          iconBg: 'bg-rose-50 text-rose-600 border-rose-200 shadow-2xs',
          badge: 'bg-rose-50 text-rose-700 border-rose-200',
          indicator: 'bg-rose-500',
          borderHover: 'hover:border-rose-300',
        };
      case 'safe':
        return {
          iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-200 shadow-2xs',
          badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          indicator: 'bg-emerald-500',
          borderHover: 'hover:border-emerald-300',
        };
      default:
        return {
          iconBg: 'bg-sky-50 text-sky-600 border-sky-200 shadow-2xs',
          badge: 'bg-sky-50 text-sky-700 border-sky-200',
          indicator: 'bg-sky-500',
          borderHover: 'hover:border-sky-300',
        };
    }
  };

  const colors = getStatusClasses();

  return (
    <div className={`bg-white border border-slate-200/90 rounded-xl p-4 flex flex-col justify-between shadow-xs ${colors.borderHover} transition-all duration-200 group hover:-translate-y-0.5 hover:shadow-md`}>
      {/* Top Header */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="text-[10px] sm:text-[11px] font-mono tracking-wider text-slate-500 font-semibold uppercase">
          {data.label}
        </span>
        <div
          className={`flex items-center justify-center w-7 h-7 rounded-lg border ${colors.iconBg} flex-shrink-0 transition-transform duration-200 group-hover:scale-105`}
        >
          <Icon className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Primary Metric Value */}
      <div className="my-1.5 flex items-baseline justify-between gap-2">
        <span className="text-xl sm:text-2xl font-bold font-sans tracking-tight text-slate-900 tabular-nums">
          {data.value}
        </span>

        {/* Status or Trend Badge */}
        {data.trend && (
          <span
            className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-mono border font-semibold ${
              data.trendDirection === 'down'
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : 'bg-amber-50 text-amber-700 border-amber-200'
            }`}
          >
            {data.trendDirection === 'up' && <TrendingUp className="w-3 h-3" />}
            {data.trendDirection === 'down' && <TrendingDown className="w-3 h-3" />}
            {data.trend}
          </span>
        )}

        {data.statusText && !data.trend && (
          <span
            className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold border ${colors.badge}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${colors.indicator}`} />
            {data.statusText}
          </span>
        )}
      </div>

      {/* Supporting Information Footer */}
      <div className="pt-2.5 mt-1 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-sans truncate">
        <span className="truncate">{data.supportingInfo}</span>
      </div>
    </div>
  );
};

