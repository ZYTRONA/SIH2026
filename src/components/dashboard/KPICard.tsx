import React from 'react';
import {
  Snowflake,
  Mountain,
  ShieldAlert,
  Wind,
  Ship,
  Clock,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { KPICardData } from '@/data/dashboardData';
import { cn } from '@/lib/utils';

const iconMap = {
  Snowflake,
  Mountain,
  ShieldAlert,
  Wind,
  Ship,
  Clock,
};

const sparklineData: Record<string, number[]> = {
  Snowflake: [62, 65, 68, 72, 76, 78, 80, 82, 82.4],
  Mountain: [28, 30, 31, 33, 34, 35, 36, 37, 37],
  ShieldAlert: [18, 20, 22, 21, 23, 24, 24, 24, 24],
  Wind: [18, 21, 24, 28, 32, 30, 27, 25, 24],
  Ship: [0, 0, 0, 0, 0, 0, 0, 0, 0],
  Clock: [48, 47, 46, 45, 44, 43, 42, 42, 41.87],
};

interface SparklineProps {
  data: number[];
  color?: string;
  width?: number;
  height?: number;
}

const Sparkline: React.FC<SparklineProps> = ({
  data,
  color = '#0066cc',
  width = 120,
  height = 24,
}) => {
  if (!data || data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const padding = 2;
  const usableHeight = height - padding * 2;
  const stepX = (width - padding * 2) / (data.length - 1);

  const points = data
    .map((val, idx) => {
      const x = padding + idx * stepX;
      const y = height - padding - ((val - min) / range) * usableHeight;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  return (
    <svg width={width} height={height} className="overflow-visible block">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
};

interface KPICardProps {
  data: KPICardData;
}

export const KPICard: React.FC<KPICardProps> = ({ data }) => {
  const Icon = iconMap[data.iconName] || ShieldAlert;
  const sparkData = sparklineData[data.iconName] || [];

  const getSubtitleBadge = () => {
    switch (data.status) {
      case 'safe':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'warning':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'critical':
        return 'bg-rose-50 text-rose-800 border-rose-200';
      default:
        return 'bg-[#f5f5f7] text-neutral-700 border-[#e0e0e0]';
    }
  };

  return (
    <motion.div
      whileHover={{ y: -3, transition: { type: 'spring', stiffness: 450, damping: 25 } }}
      whileTap={{ scale: 0.985 }}
      className="apple-card p-4 flex flex-col justify-between hover:border-neutral-400 cursor-default select-none min-h-[150px] shadow-2xs"
    >
      {/* Top: Icon + Label */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-full bg-[#f5f5f7] text-[#1d1d1f] flex items-center justify-center shrink-0 border border-[#e0e0e0]">
            <Icon className="w-3.5 h-3.5" />
          </div>
          <span className="text-[12px] text-neutral-500 font-normal leading-tight line-clamp-1">
            {data.label}
          </span>
        </div>
      </div>

      {/* Value + Subtitle */}
      <div className="mt-2">
        <p className="text-[24px] sm:text-[26px] font-semibold text-[#1d1d1f] tracking-tight tabular-nums leading-none">
          {data.value}
        </p>
        <div className="mt-2 flex items-center">
          <span className={cn('inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-normal border', getSubtitleBadge())}>
            {data.statusText || data.trend || ''}
          </span>
        </div>
      </div>

      {/* Sparkline */}
      <div className="mt-2 pt-1 border-t border-[#f0f0f0]">
        <Sparkline data={sparkData} color="#0066cc" width={120} height={20} />
      </div>
    </motion.div>
  );
};
