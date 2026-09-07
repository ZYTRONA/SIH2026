import React from 'react';
import { RiskZoneFeature } from '@/types/map';

interface RiskLayerProps {
  riskZones: RiskZoneFeature[];
  onSelectZone: (zone: RiskZoneFeature) => void;
}

export const RiskLayer: React.FC<RiskLayerProps> = ({
  riskZones,
  onSelectZone,
}) => {
  return (
    <g>
      {riskZones.map((zone) => (
        <g
          key={zone.id}
          className="cursor-pointer group"
          onClick={(e) => {
            e.stopPropagation();
            onSelectZone(zone);
          }}
        >
          <polygon
            points={zone.polygonPoints}
            fill={zone.color}
            stroke={zone.borderColor}
            strokeWidth="1.5"
            strokeDasharray="4,3"
            className="transition-all hover:stroke-white hover:stroke-[2px]"
          />
        </g>
      ))}
    </g>
  );
};
