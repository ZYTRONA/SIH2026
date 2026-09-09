import React, { useState } from 'react';
import { DetailedIceberg, HIGH_PRIORITY_ICEBERGS } from '@/data/icebergIntelligenceData';
import { Layers, Plus, Minus, Crosshair, Check, Navigation, Compass } from 'lucide-react';
import { AntarcticMap } from '@/components/map/AntarcticMap';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

interface PolarStereographicMapProps {
  icebergs?: DetailedIceberg[];
  selectedIceberg: DetailedIceberg;
  onSelectIceberg: (iceberg: DetailedIceberg) => void;
}

export const PolarStereographicMap: React.FC<PolarStereographicMapProps> = ({
  icebergs = HIGH_PRIORITY_ICEBERGS,
  selectedIceberg,
  onSelectIceberg,
}) => {
  const [mapMode, setMapMode] = useState<'openseamap' | 'polar'>('openseamap');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [showDriftVectors, setShowDriftVectors] = useState<boolean>(true);
  const [showTrajectories, setShowTrajectories] = useState<boolean>(true);
  const [showSeaLabels, setShowSeaLabels] = useState<boolean>(true);
  const [showGraticules, setShowGraticules] = useState<boolean>(true);
  const [showRadarGlow, setShowRadarGlow] = useState<boolean>(true);

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.2, 1.8));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.2, 0.8));
  const handleResetZoom = () => setZoomLevel(1);

  // Map nodes corresponding directly to the screenshot mockup
  const mapMarkers = [
    {
      id: 'ib-023-red',
      code: 'IB-023',
      iceberg: icebergs.find((i) => i.code === 'IB-023') || icebergs[0],
      x: 430,
      y: 325,
      color: '#DC2626', // Red
      textColor: '#FFFFFF',
      isPrimary: true,
      hasVector: true,
      vectorTarget: { x: 490, y: 295 },
      trajectoryStart: { x: 380, y: 610 },
    },
    {
      id: 'ib-041-orange',
      code: 'IB-041',
      iceberg: icebergs.find((i) => i.code === 'IB-041') || icebergs[1],
      x: 510,
      y: 290,
      color: '#EA580C', // Orange
      textColor: '#FFFFFF',
      isPrimary: false,
      hasVector: true,
      vectorTarget: { x: 570, y: 280 },
    },
    {
      id: 'ib-023-blue',
      code: 'IB-023',
      iceberg: icebergs.find((i) => i.code === 'IB-023') || icebergs[0],
      x: 636,
      y: 300,
      color: '#0284C7', // Blue
      textColor: '#FFFFFF',
      isPrimary: false,
      hasVector: false,
    },
    {
      id: 'ib-055-blue',
      code: 'IB-055',
      iceberg: icebergs.find((i) => i.code === 'IB-055') || icebergs[3],
      x: 704,
      y: 512,
      color: '#0284C7', // Blue
      textColor: '#FFFFFF',
      isPrimary: false,
      hasVector: false,
    },
    {
      id: 'ib-062-blue',
      code: 'IB-062',
      iceberg: icebergs.find((i) => i.code === 'IB-062') || icebergs[6],
      x: 568,
      y: 765,
      color: '#0284C7', // Blue
      textColor: '#FFFFFF',
      isPrimary: false,
      hasVector: false,
    },
    {
      id: 'ib-037-blue',
      code: 'IB-037',
      iceberg: icebergs.find((i) => i.code === 'IB-037') || icebergs[5],
      x: 478,
      y: 728,
      color: '#0284C7', // Blue
      textColor: '#FFFFFF',
      isPrimary: false,
      hasVector: false,
    },
    {
      id: 'ib-009-blue',
      code: 'IB-009',
      iceberg: icebergs.find((i) => i.code === 'IB-009') || icebergs[4],
      x: 406,
      y: 642,
      color: '#0284C7', // Blue
      textColor: '#FFFFFF',
      isPrimary: false,
      hasVector: false,
    },
  ];

  if (mapMode === 'openseamap') {
    return (
      <AntarcticMap heightClass="h-[520px] sm:h-[580px] lg:h-[620px]" />
    );
  }

  return (
    <div className="relative w-full h-[520px] sm:h-[580px] lg:h-[620px] rounded-2xl bg-[#EAF3F9] border border-slate-200/90 shadow-sm overflow-hidden flex items-center justify-center select-none group">
      {/* 1. Top Left Badge */}
      <div className="absolute top-4 left-4 z-20">
        <div className="px-3 py-1.5 rounded-lg bg-white/95 backdrop-blur-xs border border-slate-200 text-[11px] font-mono font-bold text-slate-800 tracking-wider shadow-xs">
          POLAR STEREOGRAPHIC PROJECTION
        </div>
      </div>

      {/* Top Right Chart Switcher */}
      <div className="absolute top-3 right-3 z-40 flex items-center gap-1 bg-white/95 backdrop-blur-xs p-1 rounded-full border border-slate-200 shadow-md select-none">
        <button
          onClick={() => setMapMode('openseamap')}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer"
        >
          <Navigation className="w-3 h-3 text-[#0066cc]" />
          <span>OpenSeaMap Nautical</span>
        </button>
        <button
          onClick={() => setMapMode('polar')}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-[#0066cc] text-white shadow-xs cursor-pointer"
        >
          <Compass className="w-3 h-3" />
          <span>Polar HUD</span>
        </button>
      </div>

      {/* 2. Top Meridian Coordinates */}
      <div className="absolute top-3 left-[53%] -translate-x-1/2 z-10 text-[11px] font-mono font-semibold text-slate-600">
        120°W
      </div>
      <div className="absolute top-4 right-[33%] z-10 text-[11px] font-mono font-semibold text-slate-600">
        60°E
      </div>

      {/* 3. Lateral Coordinates */}
      <div className="absolute top-[31%] left-4 z-10 text-[11px] font-mono font-semibold text-slate-600">
        60°S
      </div>
      <div className="absolute top-[31%] right-4 z-10 text-[11px] font-mono font-semibold text-slate-600">
        60°S
      </div>
      <div className="absolute bottom-[28%] left-4 z-10 text-[11px] font-mono font-semibold text-slate-600">
        20°S
      </div>

      {/* 4. Interactive Vector Projection Canvas */}
      <div
        className="w-full h-full flex items-center justify-center transition-transform duration-300 ease-out"
        style={{ transform: `scale(${zoomLevel})` }}
      >
        <svg
          viewBox="0 0 1000 1000"
          className="w-full h-full object-contain"
          style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.03))' }}
        >
          <defs>
            {/* Soft Ocean Gradient */}
            <radialGradient id="polarOceanGradient" cx="50%" cy="50%" r="52%">
              <stop offset="0%" stopColor="#E2EEF8" />
              <stop offset="60%" stopColor="#EAF3F9" />
              <stop offset="100%" stopColor="#DDEAF5" />
            </radialGradient>

            {/* Shaded Relief for Antarctica Continent */}
            <radialGradient id="antarcticaRelief" cx="48%" cy="52%" r="48%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="70%" stopColor="#F8FAFC" />
              <stop offset="95%" stopColor="#EFF4F8" />
              <stop offset="100%" stopColor="#DFE7EF" />
            </radialGradient>

            {/* Radar Beam */}
            <linearGradient id="radarSweep" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0284C7" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
            </linearGradient>

            {/* Arrow Marker Definitions */}
            <marker
              id="vectorArrowRed"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#DC2626" />
            </marker>

            <marker
              id="vectorArrowOrange"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#EA580C" />
            </marker>

            <marker
              id="vectorArrowNavy"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#0F172A" />
            </marker>

            <marker
              id="trajectoryArrowBlue"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M 0 2 L 7 5 L 0 8 z" fill="#0284C7" />
            </marker>
          </defs>

          {/* Ocean Base */}
          <rect width="1000" height="1000" fill="url(#polarOceanGradient)" />

          {/* Concentric Polar Graticules & Grids */}
          {showGraticules && (
            <g stroke="#CBD5E1" strokeWidth="1" strokeDasharray="4,4" opacity="0.65">
              {/* Polar coordinate circles */}
              <circle cx="500" cy="500" r="440" fill="none" />
              <circle cx="500" cy="500" r="340" fill="none" />
              <circle cx="500" cy="500" r="220" fill="none" />
              <circle cx="500" cy="500" r="100" fill="none" />

              {/* Radial Longitude Meridians */}
              <line x1="500" y1="60" x2="500" y2="940" />
              <line x1="60" y1="500" x2="940" y2="500" />
              <line x1="189" y1="189" x2="811" y2="811" />
              <line x1="189" y1="811" x2="811" y2="189" />
            </g>
          )}

          {/* Subtle Radar Sweep Scan Animation */}
          {showRadarGlow && (
            <g className="pointer-events-none" style={{ transformOrigin: '500px 500px' }}>
              <g className="animate-radar-spin" style={{ transformOrigin: '500px 500px' }}>
                <line x1="500" y1="500" x2="500" y2="60" stroke="#0284C7" strokeWidth="1" opacity="0.25" />
                <path d="M 500,500 L 500,60 A 440,440 0 0,1 630,80 Z" fill="url(#radarSweep)" opacity="0.2" />
              </g>
            </g>
          )}

          {/* High-Fidelity Vector Representation of Antarctica */}
          {/* Main Continent Shaded Base */}
          <path
            d="
              M 480,310
              C 540,315 580,335 630,375
              C 670,410 705,450 710,500
              C 715,555 690,610 655,650
              C 620,690 575,715 520,720
              C 470,725 435,705 400,670
              C 370,640 355,595 365,550
              C 370,520 390,495 405,465
              C 415,445 410,425 400,405
              C 385,375 395,345 425,325
              Z
            "
            fill="url(#antarcticaRelief)"
            stroke="#94A3B8"
            strokeWidth="1.5"
            style={{ filter: 'drop-shadow(0 4px 12px rgba(15,23,42,0.06))' }}
          />

          {/* Detailed Antarctic Peninsula (reaching towards top-left / Weddell) */}
          <path
            d="
              M 405,465
              C 385,440 375,410 380,380
              C 385,350 400,320 420,295
              C 425,288 435,285 438,292
              C 440,305 432,325 430,345
              C 428,370 435,395 448,415
              C 455,428 440,450 405,465
              Z
            "
            fill="#FFFFFF"
            stroke="#94A3B8"
            strokeWidth="1.5"
          />

          {/* Ronne-Filchner & Weddell Coast indentation */}
          <path
            d="
              M 430,345
              C 445,360 465,375 485,370
              C 505,365 520,345 515,330
              C 510,315 480,310 480,310
            "
            fill="#F1F5F9"
            stroke="#CBD5E1"
            strokeWidth="1"
            strokeDasharray="2,2"
          />

          {/* Ross Ice Shelf indentation */}
          <path
            d="
              M 520,720
              C 545,690 560,660 550,630
              C 540,600 510,590 480,600
              C 450,610 435,640 435,670
              C 435,705 470,725 520,720
              Z
            "
            fill="#EAF2F8"
            stroke="#94A3B8"
            strokeWidth="1"
            strokeDasharray="2,2"
          />

          {/* Transantarctic & Mountain Ridge details */}
          <g stroke="#CBD5E1" strokeWidth="1" fill="none" opacity="0.6">
            <path d="M 450,420 Q 480,480 500,560 T 520,640" />
            <path d="M 430,460 Q 460,500 480,580" />
            <path d="M 540,400 Q 570,450 580,520" />
          </g>

          {/* Ocean & Sea Labels */}
          {showSeaLabels && (
            <g
              fill="#0F172A"
              fontSize="11"
              fontFamily="sans-serif"
              fontWeight="800"
              letterSpacing="0.08em"
              textAnchor="middle"
              className="select-none pointer-events-none"
            >
              {/* NORTH ATLANTIC OCEAN */}
              <text x="500" y="115">
                NORTH ATLANTIC OCEAN
              </text>

              {/* LABRADOR SEA */}
              <text x="404" y="270">
                LABRADOR SEA
              </text>

              {/* FLEMISH PASS */}
              <text x="690" y="270">
                FLEMISH PASS
              </text>

              {/* GRAND BANKS */}
              <text x="345" y="535">
                GRAND
              </text>
              <text x="345" y="552">
                BANKS
              </text>

              {/* Inner SEA label */}
              <text x="445" y="420" fontSize="10" opacity="0.75">
                ICE ALLEY
              </text>

              {/* CAPE FAREWELL */}
              <text x="704" y="638">
                CAPE FAREWELL
              </text>

              {/* DAVIS STRAIT */}
              <text x="675" y="770">
                DAVIS STRAIT
              </text>
            </g>
          )}

          {/* Trajectory 5-Day Arcs (Dashed Blue & Red Curves) */}
          {showTrajectories && (
            <g fill="none">
              {/* Primary High-Risk Trajectory Loop around West Antarctica to Weddell (IB-023) */}
              <path
                d="M 380,610 C 370,540 375,440 405,370 C 420,340 435,330 460,320 C 480,310 500,305 525,305"
                stroke="#EA580C"
                strokeWidth="2"
                strokeDasharray="4,4"
                markerEnd="url(#vectorArrowOrange)"
              />

              {/* Secondary Red Corridor Incursion Trajectory */}
              <path
                d="M 406,642 C 385,580 395,490 425,430 C 430,375 430,325 430,325"
                stroke="#DC2626"
                strokeWidth="2.5"
                strokeDasharray="5,4"
                markerEnd="url(#vectorArrowRed)"
              />

              {/* Antarctic Circumpolar Current Major 5-Day Orbital Ring */}
              <path
                d="M 510,290 C 560,285 600,288 636,300"
                stroke="#0284C7"
                strokeWidth="2"
                strokeDasharray="4,4"
                markerEnd="url(#trajectoryArrowBlue)"
              />
              <path
                d="M 636,300 C 670,335 690,410 704,512"
                stroke="#0284C7"
                strokeWidth="2"
                strokeDasharray="4,4"
                markerEnd="url(#trajectoryArrowBlue)"
              />
              <path
                d="M 704,512 C 700,600 660,700 568,765"
                stroke="#0284C7"
                strokeWidth="2"
                strokeDasharray="4,4"
                markerEnd="url(#trajectoryArrowBlue)"
              />
              <path
                d="M 568,765 C 540,760 505,745 478,728"
                stroke="#0284C7"
                strokeWidth="2"
                strokeDasharray="4,4"
                markerEnd="url(#trajectoryArrowBlue)"
              />
              <path
                d="M 478,728 C 450,710 425,680 406,642"
                stroke="#0284C7"
                strokeWidth="2"
                strokeDasharray="4,4"
                markerEnd="url(#trajectoryArrowBlue)"
              />
            </g>
          )}

          {/* 24-Hour Drift Vectors (Arrows) */}
          {showDriftVectors && (
            <g fill="none">
              {/* IB-023 Drift Vector Arrow to IB-041 */}
              <path
                d="M 445,320 Q 475,305 498,295"
                stroke="#EA580C"
                strokeWidth="2.5"
                markerEnd="url(#vectorArrowOrange)"
              />

              {/* Additional tactical vectors */}
              <path
                d="M 525,288 L 565,282"
                stroke="#0284C7"
                strokeWidth="2"
                markerEnd="url(#trajectoryArrowBlue)"
              />
              <path
                d="M 648,310 L 675,340"
                stroke="#0284C7"
                strokeWidth="2"
                markerEnd="url(#trajectoryArrowBlue)"
              />
              <path
                d="M 700,530 L 685,580"
                stroke="#0284C7"
                strokeWidth="2"
                markerEnd="url(#trajectoryArrowBlue)"
              />
            </g>
          )}

          {/* Interactive Iceberg Markers */}
          {mapMarkers.map((marker) => {
            const isSelected = selectedIceberg.code === marker.code;
            const isPrimaryRed = marker.color === '#DC2626';
            const isPrimaryOrange = marker.color === '#EA580C';

            return (
              <g
                key={marker.id}
                className="cursor-pointer transition-all duration-200"
                onClick={() => onSelectIceberg(marker.iceberg)}
              >
                {/* Active Selection Glow Ring */}
                {isSelected && (
                  <circle
                    cx={marker.x}
                    cy={marker.y}
                    r={isPrimaryRed ? 28 : 22}
                    fill="none"
                    stroke={marker.color}
                    strokeWidth="2.5"
                    strokeDasharray="3,3"
                    className="animate-spin"
                    style={{ transformOrigin: `${marker.x}px ${marker.y}px`, animationDuration: '6s' }}
                  />
                )}

                {/* Outer Circular Marker */}
                <circle
                  cx={marker.x}
                  cy={marker.y}
                  r={isPrimaryRed ? 18 : isPrimaryOrange ? 16 : 14}
                  fill={marker.color}
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  className="transition-transform duration-150 hover:scale-110"
                  style={{
                    filter: isSelected
                      ? 'drop-shadow(0 4px 10px rgba(0,0,0,0.35))'
                      : 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
                    transformOrigin: `${marker.x}px ${marker.y}px`,
                  }}
                />

                {/* Marker Text Label */}
                <text
                  x={marker.x}
                  y={marker.y + (isPrimaryRed ? 3.5 : 3)}
                  fill={marker.textColor}
                  fontSize={isPrimaryRed ? '9' : isPrimaryOrange ? '8.5' : '8'}
                  fontFamily="sans-serif"
                  fontWeight="bold"
                  textAnchor="middle"
                  className="pointer-events-none select-none"
                >
                  {marker.code}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* 5. Bottom Left Map Legend */}
      <div className="absolute bottom-4 left-4 z-20">
        <div className="flex flex-col gap-1.5 p-3 rounded-xl bg-white/95 backdrop-blur-xs border border-slate-200/90 shadow-xs text-xs font-mono">
          <div className="flex items-center gap-2">
            {/* Arrow icon */}
            <svg className="w-5 h-3 text-slate-900" viewBox="0 0 20 12" fill="none">
              <path d="M 2 6 L 15 6 M 12 2 L 17 6 L 12 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-[11px] font-bold text-slate-800 tracking-tight">DRIFT VECTOR (24h)</span>
          </div>
          <div className="flex items-center gap-2">
            {/* Dashed line */}
            <svg className="w-5 h-3 text-[#0284C7]" viewBox="0 0 20 12" fill="none">
              <line x1="1" y1="6" x2="19" y2="6" stroke="currentColor" strokeWidth="2" strokeDasharray="3,3" strokeLinecap="round" />
            </svg>
            <span className="text-[11px] font-bold text-slate-800 tracking-tight">TRAJECTORY (5d)</span>
          </div>
        </div>
      </div>

      {/* 6. Bottom Longitude 0° label */}
      <div className="absolute bottom-3 left-[53%] -translate-x-1/2 z-10 text-[11px] font-mono font-semibold text-slate-600">
        0°
      </div>

      {/* 7. Bottom Right Map Controls */}
      <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 bg-white/95 backdrop-blur-xs p-1 rounded-xl border border-slate-200 shadow-xs">
        {/* Layer Toggle Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              title="Toggle Map Layers"
              aria-label="Map Layers"
            >
              <Layers className="w-4 h-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 p-1.5 bg-white border-slate-200 shadow-xl rounded-xl">
            <DropdownMenuLabel className="text-xs font-mono font-bold text-slate-900">Map Overlays</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => setShowDriftVectors(!showDriftVectors)}
              className="flex items-center justify-between text-xs font-mono cursor-pointer py-1.5"
            >
              <span>24h Drift Vectors</span>
              {showDriftVectors && <Check className="w-3.5 h-3.5 text-emerald-600" />}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setShowTrajectories(!showTrajectories)}
              className="flex items-center justify-between text-xs font-mono cursor-pointer py-1.5"
            >
              <span>5d Trajectory Arcs</span>
              {showTrajectories && <Check className="w-3.5 h-3.5 text-emerald-600" />}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setShowSeaLabels(!showSeaLabels)}
              className="flex items-center justify-between text-xs font-mono cursor-pointer py-1.5"
            >
              <span>Ocean & Sea Labels</span>
              {showSeaLabels && <Check className="w-3.5 h-3.5 text-emerald-600" />}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setShowGraticules(!showGraticules)}
              className="flex items-center justify-between text-xs font-mono cursor-pointer py-1.5"
            >
              <span>Polar Graticule Grid</span>
              {showGraticules && <Check className="w-3.5 h-3.5 text-emerald-600" />}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setShowRadarGlow(!showRadarGlow)}
              className="flex items-center justify-between text-xs font-mono cursor-pointer py-1.5"
            >
              <span>Radar Beam Sweep</span>
              {showRadarGlow && <Check className="w-3.5 h-3.5 text-emerald-600" />}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="w-px h-4 bg-slate-200 mx-0.5" />

        {/* Zoom Out */}
        <button
          onClick={handleZoomOut}
          className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          title="Zoom Out"
          aria-label="Zoom Out"
        >
          <Minus className="w-4 h-4" />
        </button>

        {/* Zoom In */}
        <button
          onClick={handleZoomIn}
          className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          title="Zoom In"
          aria-label="Zoom In"
        >
          <Plus className="w-4 h-4" />
        </button>

        {/* Recenter */}
        <button
          onClick={handleResetZoom}
          className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          title="Recenter Map"
          aria-label="Recenter"
        >
          <Crosshair className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
