import React, { useState } from 'react';
import {
  DetailedIceberg,
  DETAILED_ICEBERGS_CATALOG,
} from '@/data/icebergIntelligenceData';
import { Mountain, Search, ArrowRight, Filter } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface IcebergCatalogTableProps {
  selectedId: string;
  onSelectIceberg: (iceberg: DetailedIceberg) => void;
}

export const IcebergCatalogTable: React.FC<IcebergCatalogTableProps> = ({
  selectedId,
  onSelectIceberg,
}) => {
  const [filterRisk, setFilterRisk] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredIcebergs = DETAILED_ICEBERGS_CATALOG.filter((ib) => {
    const matchesRisk =
      filterRisk === 'ALL' ||
      (filterRisk === 'HIGH_THREAT' && (ib.riskLevel === 'CRITICAL' || ib.riskLevel === 'HIGH')) ||
      ib.riskLevel === filterRisk;
    const matchesSearch =
      ib.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ib.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ib.nearestStation.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRisk && matchesSearch;
  });

  return (
    <div className="bg-white border border-[#e0e0e0] rounded-[18px] p-5 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#f0f0f0]">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-full bg-[#f5f5f7] border border-[#e0e0e0] text-[#0066cc]">
            <Mountain className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-[15px] font-semibold text-[#1d1d1f] tracking-tight">
              Antarctic Iceberg Catalog
            </h3>
            <span className="text-[11px] text-neutral-500 uppercase tracking-wider font-normal">
              {filteredIcebergs.length} of {DETAILED_ICEBERGS_CATALOG.length} Objects Tracked
            </span>
          </div>
        </div>

        {/* Filter Dropdown */}
        <div className="w-full sm:w-48">
          <Select value={filterRisk} onValueChange={setFilterRisk}>
            <SelectTrigger className="min-h-[38px] text-[12px] bg-[#f5f5f7] border-[#e0e0e0] text-[#1d1d1f] rounded-[11px]">
              <div className="flex items-center gap-2">
                <Filter className="w-3.5 h-3.5 text-neutral-500" />
                <SelectValue placeholder="Filter Threat" />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-white border-[#e0e0e0] rounded-[14px]">
              <SelectItem value="ALL">All Objects ({DETAILED_ICEBERGS_CATALOG.length})</SelectItem>
              <SelectItem value="HIGH_THREAT">▲ Critical & High (7)</SelectItem>
              <SelectItem value="CRITICAL">⬢ Critical Only</SelectItem>
              <SelectItem value="HIGH">▲ High Only</SelectItem>
              <SelectItem value="WARNING">◆ Warning</SelectItem>
              <SelectItem value="SAFE">✓ Safe / Distant</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by code (e.g. IB-023), name, or sector..."
          className="w-full min-h-[40px] bg-[#f5f5f7] border border-[#e0e0e0] rounded-[12px] pl-10 pr-3 py-2 text-[12px] text-[#1d1d1f] placeholder:text-neutral-400 focus:outline-none focus:border-[#0066cc] transition-all"
        />
      </div>

      {/* Iceberg List */}
      <div className="max-h-80 overflow-y-auto space-y-2 pr-1 divide-y divide-[#f0f0f0]">
        {filteredIcebergs.map((ib) => {
          const isSelected = selectedId === ib.id;
          const isCritical = ib.riskLevel === 'CRITICAL';
          const isHigh = ib.riskLevel === 'HIGH';
          const isWarning = ib.riskLevel === 'WARNING';

          return (
            <div
              key={ib.id}
              onClick={() => onSelectIceberg(ib)}
              className={`p-3 rounded-[12px] border cursor-pointer transition-all flex items-center justify-between gap-3 min-h-[50px] select-none active:scale-95 ${
                isSelected
                  ? 'bg-[#f0f7ff] border-[#0066cc]'
                  : 'bg-white hover:bg-[#fafafc] border-[#e0e0e0]'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                    isCritical
                      ? 'bg-rose-500 animate-pulse'
                      : isHigh
                      ? 'bg-amber-500'
                      : isWarning
                      ? 'bg-amber-400'
                      : 'bg-emerald-500'
                  }`}
                />

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-semibold font-mono text-[#1d1d1f]">
                      {ib.code}
                    </span>
                    <span className="text-[11px] text-neutral-500 truncate font-normal">
                      {ib.sizeCategory} ({ib.lengthKm} km)
                    </span>
                  </div>
                  <div className="text-[11px] text-neutral-500 truncate font-normal">
                    Drift: {ib.velocityMs} m/s @ {ib.directionCompass} &bull; Dist:{' '}
                    <strong className="text-[#1d1d1f] font-semibold">{ib.routeDistanceKm} km</strong>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border flex items-center gap-1 ${
                    isCritical
                      ? 'bg-rose-50 text-rose-700 border-rose-200'
                      : isHigh
                      ? 'bg-amber-50 text-amber-700 border-amber-200'
                      : isWarning
                      ? 'bg-amber-50 text-amber-700 border-amber-200'
                      : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  }`}
                >
                  <span>{ib.riskLevel}</span>
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
