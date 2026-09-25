import React from 'react';
import { VesselState } from '@/types/map';

interface VesselMarkerProps {
  vessel: VesselState;
  toSvg: (pct: number) => number;
  onClick?: (vessel: VesselState) => void;
}

export const VesselMarker: React.FC<VesselMarkerProps> = ({
  vessel,
  toSvg,
  onClick,
}) => {
  const vx = toSvg(vessel.x);
  const vy = toSvg(vessel.y);

  // Calculate heading vector endpoint (24px ahead)
  const headingRad = (vessel.headingDeg * Math.PI) / 180;
  const hx = vx + Math.sin(headingRad) * 28;
  const hy = vy - Math.cos(headingRad) * 28;

  return (
    <g
      className="cursor-pointer group"
      onClick={() => onClick && onClick(vessel)}
    >
      {/* 1. Outer Radar Sweep Pulse Ring */}
      <circle
        cx={vx}
        cy={vy}
        r="44"
        fill="none"
        stroke="#22D3EE"
        strokeWidth="1.5"
        opacity="0.3"
      >
        <animate
          attributeName="r"
          from="12"
          to="50"
          dur="3s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          from="0.8"
          to="0"
          dur="3s"
          repeatCount="indefinite"
        />
      </circle>

      {/* 2. Middle Range Ring */}
      <circle
        cx={vx}
        cy={vy}
        r="20"
        fill="rgba(34, 211, 238, 0.08)"
        stroke="#22D3EE"
        strokeWidth="1"
        strokeDasharray="2,2"
      />

      {/* 3. Heading Vector Line */}
      <line
        x1={vx}
        y1={vy}
        x2={hx}
        y2={hy}
        stroke="#22D3EE"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <polygon
        points={`${hx},${hy} ${hx - 4},${hy + 6} ${hx + 4},${hy + 6}`}
        fill="#22D3EE"
        transform={`rotate(${vessel.headingDeg}, ${hx}, ${hy})`}
      />

      {/* 4. Vessel Icon Body - Detailed Top-Down Icebreaker Hull */}
      <g transform={`translate(${vx}, ${vy}) rotate(${vessel.headingDeg})`}>
        {/* Reinforced Icebreaker Hull Outline */}
        <path
          d="M0,-24 C5,-18 12,-6 12,14 C12,22 9,25 6,26 L-6,26 C-9,25 -12,22 -12,14 C-12,-6 -5,-18 0,-24 Z"
          fill="#FFFFFF"
          stroke="#059669"
          strokeWidth="2"
        />
        {/* Ice-Breaking Stem Knife */}
        <line x1="0" y1="-22" x2="0" y2="-8" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
        <circle cx="0" cy="-20" r="1.5" fill="#10B981" />
        {/* Forward Cargo / Lab Hatch */}
        <rect x="-4" y="-7" width="8" height="5" rx="1" fill="#E6F4EA" stroke="#10B981" strokeWidth="0.8" />
        {/* Navigation Bridge / Wheelhouse */}
        <path d="M-6,0 L6,0 L5.5,10 L-5.5,10 Z" fill="#047857" stroke="#065F46" strokeWidth="0.8" />
        <rect x="-4.5" y="1.5" width="9" height="2.5" rx="0.5" fill="#A7F3D0" />
        {/* Radar Mast Beacon */}
        <circle cx="0" cy="6" r="1.5" fill="#34D399" />
        {/* Aft Helipad */}
        <circle cx="0" cy="18" r="4.5" fill="#F3F4F6" stroke="#10B981" strokeWidth="0.9" strokeDasharray="2,1.5" />
        <text x="0" y="20" textAnchor="middle" fontFamily="monospace" fontWeight="900" fontSize="5" fill="#047857">H</text>
        {/* Navigation Lights (Red Port / Green Starboard) */}
        <circle cx="-5.5" cy="0" r="1" fill="#EF4444" />
        <circle cx="5.5" cy="0" r="1" fill="#10B981" />
      </g>

      {/* 5. Telemetry Pill Label (Light Apple Badge) */}
      <g transform={`translate(${vx + 16}, ${vy - 16})`}>
        <rect
          x="0"
          y="0"
          width="170"
          height="32"
          rx="6"
          fill="#FFFFFF"
          stroke="#10B981"
          strokeWidth="1.5"
          filter="drop-shadow(0 2px 4px rgba(0,0,0,0.1))"
        />
        <text
          x="8"
          y="13"
          fill="#1d1d1f"
          fontSize="10"
          fontFamily="monospace"
          fontWeight="bold"
        >
          {vessel.name.toUpperCase()}
        </text>
        <text
          x="8"
          y="25"
          fill="#059669"
          fontSize="9"
          fontFamily="monospace"
          fontWeight="bold"
        >
          HDG: {vessel.headingDeg}° | SPD: {vessel.speedKts} KTS [PC3]
        </text>
      </g>
    </g>
  );
};
