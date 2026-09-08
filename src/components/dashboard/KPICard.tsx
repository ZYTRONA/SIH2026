import React from 'react';
import {
  Snowflake,
  Mountain,
  ShieldAlert,
  Wind,
  Ship,
  Clock,
  Info,
} from 'lucide-react';
import { KPICardData } from '@/data/dashboardData';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

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

  const getStatusBadge = () => {
    switch (data.status) {
      case 'safe':
        return 'bg-emerald-50 text-emerald-900 border-emerald-200';
      case 'warning':
        return 'bg-amber-50 text-amber-900 border-amber-200';
      case 'critical':
        return 'bg-rose-50 text-rose-900 border-rose-200';
      default:
        return 'bg-zinc-100 text-zinc-900 border-zinc-200';
    }
  };

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="group rounded-2xl border border-zinc-200/90 bg-white p-4 shadow-xs flex flex-col justify-between transition-all duration-200 hover:shadow-md hover:border-zinc-300 cursor-default select-none">
            {/* Top Header */}
            <div className="flex items-center justify-between gap-1">
              <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-500 truncate">
                {data.label}
              </p>
              <div className="p-1.5 rounded-lg bg-zinc-100/80 border border-zinc-200 text-zinc-800 group-hover:bg-black group-hover:text-white transition-colors">
                <Icon className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Primary Value */}
            <div className="mt-2.5 flex items-baseline justify-between gap-2">
              <p className="text-2xl sm:text-2xl font-extrabold font-sans text-zinc-950 tracking-tight tabular-nums">
                {data.value}
              </p>
              <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-bold border ${getStatusBadge()}`}>
                {data.trend || data.statusText || 'NOMINAL'}
              </span>
            </div>

            {/* Supporting Subtext */}
            <div className="mt-2.5 pt-2 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500 font-sans">
              <span className="truncate text-[11px] font-medium text-zinc-600">{data.supportingInfo}</span>
              <Info className="w-3 h-3 text-zinc-400 group-hover:text-zinc-700 shrink-0 ml-1" />
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent side="top" className="bg-zinc-950 text-white border-zinc-800 text-xs font-mono p-2.5 max-w-xs shadow-2xl">
          <p className="font-bold text-white mb-1">{data.label}: {data.value}</p>
          <p className="text-zinc-300 text-[11px] font-sans">{data.supportingInfo}</p>
          <p className="text-zinc-500 text-[10px] mt-1 pt-1 border-t border-zinc-800">Status: {data.status?.toUpperCase() || 'NOMINAL'} • Live Telemetry Feed</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

