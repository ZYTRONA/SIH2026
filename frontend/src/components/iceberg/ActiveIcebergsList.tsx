import React from 'react';
import { DetailedIceberg, HIGH_PRIORITY_ICEBERGS } from '@/data/icebergIntelligenceData';
import { Mountain, ArrowRight } from 'lucide-react';

interface ActiveIcebergsListProps {
  icebergs?: DetailedIceberg[];
  selectedIceberg: DetailedIceberg;
  onSelectIceberg: (iceberg: DetailedIceberg) => void;
  onViewAll: () => void;
}

export const ActiveIcebergsList: React.FC<ActiveIcebergsListProps> = ({
  icebergs = HIGH_PRIORITY_ICEBERGS,
  selectedIceberg,
  onSelectIceberg,
  onViewAll,
}) => {
  const getBadgeStyle = (category: DetailedIceberg['riskCategory'], code: string) => {
    if (code === 'IB-023' || category === 'HIGH RISK') {
      return 'bg-rose-50 border-rose-200 text-rose-700';
    }
    if (code === 'IB-041' || category === 'ELEVATED') {
      return 'bg-amber-50 border-amber-200 text-amber-700';
    }
    return 'bg-emerald-50 border-emerald-200 text-emerald-700';
  };

  return (
    <div className="apple-card p-5 flex flex-col justify-between h-full space-y-4">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center gap-3 pb-2 border-b border-[#f0f0f0]">
          <div className="flex items-center justify-center h-9 w-9 rounded-full bg-[#f5f5f7] text-[#1d1d1f] shrink-0 border border-[#e0e0e0]">
            <Mountain className="h-4.5 w-4.5" />
          </div>
          <div>
            <h2 className="text-[14px] font-semibold text-[#1d1d1f] tracking-tight">
              Active Tracked Icebergs
            </h2>
            <p className="text-[12px] text-neutral-500 font-normal">
              Showing 7 priority collision targets
            </p>
          </div>
        </div>

        {/* Iceberg List */}
        <div className="space-y-2">
          {icebergs.slice(0, 7).map((ib) => {
            const isSelected = selectedIceberg.id === ib.id || selectedIceberg.code === ib.code;
            const badgeStyle = getBadgeStyle(ib.riskCategory, ib.code);

            return (
              <div
                key={ib.id}
                onClick={() => onSelectIceberg(ib)}
                className={`group relative overflow-hidden rounded-[14px] border transition-all duration-150 cursor-pointer p-3 flex items-center justify-between gap-2 select-none active:scale-95 ${
                  isSelected
                    ? 'bg-[#0066cc]/5 border-[#0066cc] ring-1 ring-[#0066cc]'
                    : 'bg-white hover:bg-[#f5f5f7] border-[#e0e0e0]'
                }`}
              >
                {/* Left: Code & Sea Location */}
                <div className="min-w-[105px] shrink-0">
                  <div className={`text-[13px] font-semibold font-mono ${isSelected ? 'text-[#0066cc]' : 'text-[#1d1d1f]'}`}>
                    {ib.code}
                  </div>
                  <div className="text-[11px] text-neutral-500 font-normal truncate max-w-[110px]">
                    {ib.seaLocation}
                  </div>
                </div>

                {/* Middle: Size & Drift Speed */}
                <div className="flex items-center gap-3 sm:gap-4 font-mono text-[11px]">
                  <div>
                    <div className="text-[9px] text-neutral-400 font-normal">Size</div>
                    <div className="font-semibold text-[#1d1d1f] whitespace-nowrap">
                      {ib.sizeKm2} km²
                    </div>
                  </div>

                  <div>
                    <div className="text-[9px] text-neutral-400 font-normal">Drift</div>
                    <div className="font-semibold text-[#1d1d1f] whitespace-nowrap">
                      {ib.driftSpeedKmh} km/h
                    </div>
                  </div>
                </div>

                {/* Right: Risk Badge */}
                <div className="shrink-0">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border font-mono ${badgeStyle}`}
                  >
                    {ib.riskCategory}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Button: View All Icebergs */}
      <div className="pt-3 border-t border-[#f0f0f0] mt-auto">
        <button
          onClick={onViewAll}
          className="btn-apple-secondary w-full !min-h-[38px] !h-[38px] !text-[13px]"
        >
          <span>View All 37 Icebergs Catalog</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
