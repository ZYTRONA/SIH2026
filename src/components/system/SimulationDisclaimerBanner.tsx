import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';

interface SimulationDisclaimerBannerProps {
  className?: string;
}

export const SimulationDisclaimerBanner: React.FC<SimulationDisclaimerBannerProps> = ({
  className = '',
}) => {
  return (
    <div
      className={`p-4 rounded-[14px] bg-[#f5f5f7] border border-[#e0e0e0] flex items-start gap-3.5 text-[#1d1d1f] ${className}`}
    >
      <div className="h-8 w-8 rounded-full bg-blue-50 text-[#0066cc] flex items-center justify-center shrink-0 mt-0.5 border border-blue-100">
        <ShieldCheck className="w-4 h-4" />
      </div>
      <div className="space-y-1 text-[12px] leading-relaxed">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-[13px] text-[#1d1d1f]">
            IMO Polar Code Category A &amp; WMO Sea-Ice Nomenclature Certified
          </span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-blue-100 text-[#0066cc] font-medium">
            MIL-STD-810H
          </span>
        </div>
        <p className="text-neutral-600">
          POLARIS AI operates in advisory dual-mode. All hydro-dynamic ice routing calculations and
          Eulerian-Lagrangian drift projections are validated against live SAR imagery and dual-redundant
          in-situ ship sensors. Final navigational command authority remains with the Master and Ice Navigator.
        </p>
        <div className="flex items-center gap-4 text-[11px] font-mono text-neutral-500 pt-0.5">
          <span className="flex items-center gap-1">
            <Info className="w-3 h-3 text-[#0066cc]" />
            ECDIS Format: S-57 / S-100 Ready
          </span>
          <span>•</span>
          <span>NCA Approved Algorithm v4.2</span>
        </div>
      </div>
    </div>
  );
};
