import React from 'react';
import { SeaIceConcentrationFeature } from '@/types/map';

interface SeaIceLayerProps {
  seaIceTiers: SeaIceConcentrationFeature[];
  onSelectTier?: (tier: SeaIceConcentrationFeature) => void;
}

export const SeaIceLayer: React.FC<SeaIceLayerProps> = ({
  seaIceTiers,
  onSelectTier,
}) => {
  return (
    <g opacity="0.75">
      {seaIceTiers.map((tier) => (
        <g
          key={tier.id}
          className="cursor-pointer"
          onClick={() => onSelectTier && onSelectTier(tier)}
        >
          <polygon
            points={tier.polygonPoints}
            fill={tier.color}
            fillOpacity={tier.fillOpacity}
            stroke={tier.color}
            strokeWidth="1"
            strokeOpacity="0.8"
          />
        </g>
      ))}
    </g>
  );
};
