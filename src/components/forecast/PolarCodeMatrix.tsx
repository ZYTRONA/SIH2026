import React from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';
import { ForecastHorizonKey } from '@/data/seaIceData';

interface PolarCodeMatrixProps {
  activeHorizon?: ForecastHorizonKey;
}

interface PolarClassSpec {
  code: string;
  name: string;
  iceCapability: string;
  maxSpeedKts: number;
  rioScore: number;
  status: 'optimal' | 'permitted' | 'caution' | 'escort' | 'prohibited';
  statusLabel: string;
  isCurrentVessel?: boolean;
}

const POLAR_CLASSES: PolarClassSpec[] = [
  {
    code: 'PC1',
    name: 'Heavy Icebreaker',
    iceCapability: 'Year-round operation in all polar waters (Thickness > 3.0 m)',
    maxSpeedKts: 16.0,
    rioScore: +34,
    status: 'optimal',
    statusLabel: 'UNRESTRICTED',
  },
  {
    code: 'PC2',
    name: 'Heavy Icebreaker',
    iceCapability: 'Year-round operation in moderate multi-year ice (2.0–3.0 m)',
    maxSpeedKts: 14.0,
    rioScore: +28,
    status: 'optimal',
    statusLabel: 'UNRESTRICTED',
  },
  {
    code: 'PC3',
    name: 'Polar Research Vessel (R/V Polar Sentinel)',
    iceCapability: 'Year-round in thick first-year ice with old ice inclusions (1.0–2.0 m)',
    maxSpeedKts: 12.4,
    rioScore: +18,
    status: 'permitted',
    statusLabel: 'TRANSIT PERMITTED',
    isCurrentVessel: true,
  },
  {
    code: 'PC4',
    name: 'Medium Icebreaker',
    iceCapability: 'Year-round in thick first-year ice (0.7–1.2 m)',
    maxSpeedKts: 9.5,
    rioScore: +8,
    status: 'permitted',
    statusLabel: 'PERMITTED',
  },
  {
    code: 'PC5',
    name: 'Medium Icebreaker / Cargo',
    iceCapability: 'Year-round in medium first-year ice (0.5–0.8 m)',
    maxSpeedKts: 7.0,
    rioScore: -2,
    status: 'caution',
    statusLabel: 'CAUTION PACK',
  },
  {
    code: 'PC6',
    name: 'Light Polar Vessel',
    iceCapability: 'Summer / autumn in medium first-year ice (0.3–0.5 m)',
    maxSpeedKts: 5.0,
    rioScore: -12,
    status: 'escort',
    statusLabel: 'ESCORT MANDATORY',
  },
  {
    code: 'PC7',
    name: 'Summer Polar Vessel',
    iceCapability: 'Summer / autumn in thin first-year ice (< 0.3 m)',
    maxSpeedKts: 0.0,
    rioScore: -26,
    status: 'prohibited',
    statusLabel: 'TRANSIT PROHIBITED',
  },
];

export const PolarCodeMatrix: React.FC<PolarCodeMatrixProps> = ({
  activeHorizon = 'Current',
}) => {
  return (
    <div className="bg-white border border-[#e0e0e0] rounded-[18px] p-5 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#f0f0f0]">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-full bg-[#f5f5f7] border border-[#e0e0e0] text-[#0066cc]">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-[15px] font-semibold text-[#1d1d1f] tracking-tight">
              IMO Polar Code (PC1–PC7) Operability Matrix
            </h3>
            <span className="text-[11px] text-neutral-500 font-normal">
              POLARIS Risk Index Outcome (RIO) against forecasted sea-ice pack ({activeHorizon})
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-mono">
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
            RIO &gt; 0 = SAFE
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-800 border border-rose-200 font-semibold">
            RIO &lt; 0 = PROHIBITED
          </span>
        </div>
      </div>

      {/* Table of Polar Classes */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-[12px]">
          <thead>
            <tr className="border-b border-[#e0e0e0] text-[11px] font-mono text-neutral-500 uppercase tracking-wider bg-[#fafafc]">
              <th className="py-2.5 px-3">Class</th>
              <th className="py-2.5 px-3">Vessel Classification</th>
              <th className="py-2.5 px-3">Ice Capability & Thickness</th>
              <th className="py-2.5 px-3 text-right">Max Speed</th>
              <th className="py-2.5 px-3 text-right">RIO Index</th>
              <th className="py-2.5 px-3 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f0f0f0]">
            {POLAR_CLASSES.map((pc) => {
              return (
                <tr
                  key={pc.code}
                  className={`transition-colors ${
                    pc.isCurrentVessel
                      ? 'bg-[#f0f7ff] hover:bg-[#e5f1ff] font-semibold'
                      : 'hover:bg-[#fafafc]'
                  }`}
                >
                  <td className="py-2.5 px-3 font-mono font-bold text-[#1d1d1f]">
                    <div className="flex items-center gap-1.5">
                      <span>{pc.code}</span>
                      {pc.isCurrentVessel && (
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#0066cc] text-white font-mono font-bold">
                          ACTIVE VESSEL
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-2.5 px-3 text-[#1d1d1f]">
                    {pc.name}
                  </td>
                  <td className="py-2.5 px-3 text-neutral-600 font-normal">
                    {pc.iceCapability}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono tabular-nums text-[#1d1d1f]">
                    {pc.maxSpeedKts > 0 ? `${pc.maxSpeedKts} kts` : '0 kts'}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold tabular-nums">
                    <span
                      className={
                        pc.rioScore > 0
                          ? 'text-emerald-700'
                          : pc.rioScore === 0
                          ? 'text-amber-700'
                          : 'text-rose-700'
                      }
                    >
                      {pc.rioScore > 0 ? `+${pc.rioScore}` : pc.rioScore}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                        pc.status === 'optimal'
                          ? 'bg-emerald-100 text-emerald-800'
                          : pc.status === 'permitted'
                          ? 'bg-blue-100 text-[#0066cc]'
                          : pc.status === 'caution'
                          ? 'bg-amber-100 text-amber-800'
                          : pc.status === 'escort'
                          ? 'bg-orange-100 text-orange-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {pc.statusLabel}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer Info Banner */}
      <div className="p-3 rounded-[12px] bg-[#fafafc] border border-[#e0e0e0] flex items-center justify-between text-[11px] text-neutral-600 flex-wrap gap-2">
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>
            R/V Polar Sentinel (PC3) is certified for all forecasted horizons up to +7 Days in Prydz Bay.
          </span>
        </div>
        <span className="font-mono text-neutral-500">
          Standard: IMO Res. MSC.385(94)
        </span>
      </div>
    </div>
  );
};

export default PolarCodeMatrix;
