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
    <div className="polar-panel p-5 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-polar-700/60">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <Mountain className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold font-sans text-slate-100">
              Antarctic Iceberg Catalog
            </h3>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
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
              className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold transition-colors ${
                filterRisk === tier
                  ? 'bg-amber-500 text-polar-950'
                  : 'bg-polar-900 hover:bg-polar-800 text-slate-400 border border-polar-700/60'
              }`}
            >
              {tier}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by code (e.g. IB-023), name, or sector..."
          className="w-full bg-polar-900 border border-polar-700 rounded-md pl-9 pr-3 py-1.5 text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-ice-500"
        />
      </div>

      {/* Iceberg List */}
      <div className="max-h-72 overflow-y-auto space-y-1.5 pr-1 divide-y divide-polar-800">
        {filteredIcebergs.map((ib) => {
          const isSelected = selectedId === ib.id;
          const isCritical = ib.riskLevel === 'CRITICAL';
          const isHigh = ib.riskLevel === 'HIGH';
          const isWarning = ib.riskLevel === 'WARNING';

          return (
            <div
              key={ib.id}
              onClick={() => onSelectIceberg(ib)}
              className={`p-2.5 rounded-lg border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                isSelected
                  ? 'bg-amber-950/40 border-amber-500/60 shadow-md'
                  : 'bg-polar-900/60 hover:bg-polar-850 border-polar-700/40'
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
                      ? 'bg-amber-400'
                      : 'bg-emerald-400'
                  }`}
                />

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold font-mono text-slate-100">
                      {ib.code}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 truncate">
                      {ib.sizeCategory} ({ib.lengthKm} km)
                    </span>
                  </div>
                  <div className="text-[10px] font-mono text-slate-400 truncate">
                    Drift: {ib.velocityMs} m/s @ {ib.directionCompass} | Route Dist: {ib.routeDistanceKm} km
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <span
                  className={`px-1.5 py-0.2 rounded text-[9px] font-mono font-bold border ${
                    isCritical
                      ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                      : isHigh
                      ? 'bg-orange-500/20 text-orange-300 border-orange-500/40'
                      : isWarning
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  }`}
                >
                  {ib.riskLevel}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
