import React, { useState } from 'react';
import {
  DetailedIceberg,
  DETAILED_ICEBERGS_CATALOG,
} from '@/data/icebergIntelligenceData';
import { Mountain, Search, ArrowRight } from 'lucide-react';

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
    <div className="bg-white border border-zinc-200/90 shadow-xs rounded-xl p-5 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-zinc-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-zinc-100 border border-zinc-200 text-zinc-900">
            <Mountain className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold font-sans text-zinc-950">
              Antarctic Iceberg Catalog
            </h3>
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider font-bold">
              {filteredIcebergs.length} of {DETAILED_ICEBERGS_CATALOG.length} Objects Tracked
            </span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 flex-wrap">
          {['ALL', 'HIGH_THREAT', 'CRITICAL', 'HIGH', 'WARNING', 'SAFE'].map((tier) => (
            <button
              key={tier}
              onClick={() => setFilterRisk(tier)}
              className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-bold transition-colors ${
                filterRisk === tier
                  ? 'bg-black text-white shadow-xs'
                  : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700 border border-zinc-200'
              }`}
            >
              {tier}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-2.5" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by code (e.g. IB-023), name, or sector..."
          className="w-full bg-zinc-50 border border-zinc-200 rounded-lg pl-9 pr-3 py-2 text-xs font-mono text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all shadow-xs"
        />
      </div>

      {/* Iceberg List */}
      <div className="max-h-72 overflow-y-auto space-y-1.5 pr-1 divide-y divide-zinc-100">
        {filteredIcebergs.map((ib) => {
          const isSelected = selectedId === ib.id;
          const isCritical = ib.riskLevel === 'CRITICAL';
          const isHigh = ib.riskLevel === 'HIGH';
          const isWarning = ib.riskLevel === 'WARNING';

          return (
            <div
              key={ib.id}
              onClick={() => onSelectIceberg(ib)}
              className={`p-2.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                isSelected
                  ? 'bg-zinc-50 border-black shadow-xs ring-1 ring-black'
                  : 'bg-white hover:bg-zinc-50/70 border-zinc-200'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                    isCritical
                      ? 'bg-rose-500 animate-ping'
                      : isHigh
                      ? 'bg-orange-500'
                      : isWarning
                      ? 'bg-amber-500'
                      : 'bg-emerald-500'
                  }`}
                />

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold font-mono text-zinc-950">
                      {ib.code}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500 truncate">
                      {ib.sizeCategory} ({ib.lengthKm} km)
                    </span>
                  </div>
                  <div className="text-[10px] font-mono text-zinc-500 truncate">
                    Drift: {ib.velocityMs} m/s @ {ib.directionCompass} | Route Dist: {ib.routeDistanceKm} km
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <span
                  className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold border ${
                    isCritical
                      ? 'bg-rose-50 text-rose-900 border-rose-300'
                      : isHigh
                      ? 'bg-orange-50 text-orange-900 border-orange-300'
                      : isWarning
                      ? 'bg-amber-50 text-amber-900 border-amber-300'
                      : 'bg-emerald-50 text-emerald-900 border-emerald-300'
                  }`}
                >
                  {ib.riskLevel}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
