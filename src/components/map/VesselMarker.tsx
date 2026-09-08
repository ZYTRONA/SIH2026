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

      {/* 4. Vessel Icon Body */}
      <circle
        cx={vx}
        cy={vy}
        r="10"
        fill="#FFFFFF"
        stroke="#10B981"
        strokeWidth="2.5"
      />
      <polygon
        points={`${vx},${vy - 7} ${vx + 4},${vy + 5} ${vx - 4},${vy + 5}`}
        fill="#10B981"
        transform={`rotate(${vessel.headingDeg}, ${vx}, ${vy})`}
      />

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
