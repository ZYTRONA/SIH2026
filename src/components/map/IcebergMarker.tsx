import React from 'react';
import { IcebergFeature, RiskSeverity } from '@/types/map';

interface IcebergMarkerProps {
  iceberg: IcebergFeature;
  toSvg: (pct: number) => number;
  isSelected?: boolean;
  onClick: (iceberg: IcebergFeature) => void;
}

const getRiskColor = (risk: RiskSeverity) => {
  switch (risk) {
    case 'critical':
      return { fill: '#EF4444', stroke: '#FCA5A5', halo: 'rgba(239, 68, 68, 0.25)' };
    case 'high':
      return { fill: '#F97316', stroke: '#FDBA74', halo: 'rgba(249, 115, 22, 0.2)' };
    case 'warning':
    case 'moderate':
      return { fill: '#F59E0B', stroke: '#FDE68A', halo: 'rgba(245, 158, 11, 0.18)' };
    case 'low':
      return { fill: '#38BDF8', stroke: '#BAE6FD', halo: 'rgba(56, 189, 248, 0.15)' };
    case 'safe':
    default:
      return { fill: '#10B981', stroke: '#6EE7B7', halo: 'rgba(16, 185, 129, 0.12)' };
  }
};

export const IcebergMarker: React.FC<IcebergMarkerProps> = ({
  iceberg,
  toSvg,
  isSelected = false,
  onClick,
}) => {
  const ix = toSvg(iceberg.x);
  const iy = toSvg(iceberg.y);
  const colors = getRiskColor(iceberg.riskLevel);

  // Vector drift endpoint
  const driftRad = (iceberg.driftDirectionDeg * Math.PI) / 180;
  const vectorLength = Math.max(14, iceberg.driftSpeedKts * 12);
  const dx = ix + Math.sin(driftRad) * vectorLength;
  const dy = iy - Math.cos(driftRad) * vectorLength;

  return (
    <g
      className="cursor-pointer group"
      onClick={(e) => {
        e.stopPropagation();
        onClick(iceberg);
      }}
    >
      {/* 1. Danger Halo */}
      <circle
        cx={ix}
        cy={iy}
        r={isSelected ? '22' : '16'}
        fill={colors.halo}
        stroke={colors.fill}
        strokeWidth={isSelected ? '2' : '1'}
        strokeDasharray={iceberg.riskLevel === 'critical' ? '3,3' : undefined}
      >
        {iceberg.riskLevel === 'critical' && (
          <animate
            attributeName="r"
            values="14;20;14"
            dur="2s"
            repeatCount="indefinite"
          />
        )}
      </circle>

      {/* 2. Drift Velocity Vector Line */}
      <line
        x1={ix}
        y1={iy}
        x2={dx}
        y2={dy}
        stroke={colors.fill}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx={dx} cy={dy} r="2" fill={colors.fill} />

      {/* 3. Iceberg Shape based on Size Class */}
      {iceberg.sizeClass === 'Giant Tabular' && (
        <polygon
          points={`${ix - 8},${iy - 5} ${ix + 8},${iy - 5} ${ix + 6},${iy + 6} ${ix - 6},${iy + 6}`}
          fill={colors.fill}
          stroke="#FFFFFF"
          strokeWidth="1.5"
        />
      )}

      {iceberg.sizeClass === 'Medium' && (
        <polygon
          points={`${ix},${iy - 7} ${ix + 7},${iy + 5} ${ix - 7},${iy + 5}`}
          fill={colors.fill}
          stroke="#FFFFFF"
          strokeWidth="1.5"
        />
      )}

      {iceberg.sizeClass === 'Bergy Bit' && (
        <polygon
          points={`${ix},${iy - 5} ${ix + 5},${iy + 3} ${ix - 5},${iy + 3}`}
          fill={colors.fill}
          stroke="#FFFFFF"
          strokeWidth="1.5"
        />
      )}

      {iceberg.sizeClass === 'Growler' && (
        <polygon
          points={`${ix},${iy - 4} ${ix + 4},${iy} ${ix},${iy + 4} ${ix - 4},${iy}`}
          fill={colors.fill}
          stroke="#FFFFFF"
          strokeWidth="1"
        />
      )}

      {/* 4. Code Tag with Light Badge */}
      <g transform={`translate(${ix + 8}, ${iy - 14})`}>
        <rect
          x="0"
          y="0"
          width="48"
          height="16"
          rx="4"
          fill="#FFFFFF"
          stroke={colors.fill}
          strokeWidth="1"
          filter="drop-shadow(0 1px 2px rgba(0,0,0,0.1))"
        />
        <text
          x="24"
          y="11"
          fill={colors.fill}
          fontSize="9"
          fontFamily="monospace"
          fontWeight="bold"
          textAnchor="middle"
          className="select-none"
        >
          {iceberg.code}
        </text>
      </g>
    </g>
  );
};
