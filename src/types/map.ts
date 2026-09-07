export interface MapLayerVisibility {
  seaIce: boolean;
  icebergs: boolean;
  risk: boolean;
  weather: boolean;
  oceanCurrents: boolean;
  bathymetry: boolean;
  routes: boolean;
}

export type IcebergSizeClass = 'Growler' | 'Bergy Bit' | 'Medium' | 'Giant Tabular';
export type RiskSeverity = 'safe' | 'low' | 'moderate' | 'warning' | 'high' | 'critical';

export interface IcebergFeature {
  id: string;
  code: string;
  name: string;
  lat: number;
  lng: number;
  x: number; // 0-100 percentage in projected Antarctic chart
  y: number;
  sizeClass: IcebergSizeClass;
  areaKm2: number;
  thicknessM: number;
  driftSpeedKts: number;
  driftDirectionDeg: number;
  riskLevel: RiskSeverity;
  nearestStation?: string;
  detectionSource: 'Sentinel-1 SAR' | 'Landsat-9 Optical' | 'Shipboard Radar' | 'CryoSat-2';
  closestApproachNm: number;
  firstObserved: string;
}

export interface VesselState {
  name: string;
  type: string;
  iceClass: string;
  lat: number;
  lng: number;
  x: number;
  y: number;
  headingDeg: number;
  speedKts: number;
  destination: string;
  destLat: number;
  destLng: number;
  destX: number;
  destY: number;
  fuelCapacityPct: number;
  currentEngineLoadPct: number;
  radarRangeNm: number;
}

export interface RouteWaypoint {
  id: string;
  name: string;
  lat: number;
  lng: number;
  x: number;
  y: number;
  iceConcentrationPct: number;
}

export type RouteType = 'RECOMMENDED' | 'ALTERNATIVE_A' | 'ALTERNATIVE_B' | 'SAFE' | 'FASTEST' | 'FUEL_EFFICIENT' | 'BALANCED' | string;

export interface RoutePath {
  id: string;
  name: string;
  type: RouteType;
  label: string;
  description: string;
  color: string;
  strokeWidth: number;
  dashArray?: string;
  waypoints: RouteWaypoint[];
  totalDistanceNm?: number;
  distanceKm?: number;
  estDurationHours?: number;
  etaFormatted?: string;
  fuelBurnTons?: number;
  fuelM3?: number;
  safetyScore?: number;
  riskScore?: number;
  isRecommended: boolean;
}

export interface RiskZoneFeature {
  id: string;
  name: string;
  tier: 'SAFE (0-20)' | 'LOW (20-40)' | 'MODERATE (40-60)' | 'HIGH (60-80)' | 'CRITICAL (80-100)';
  riskScoreRange: string;
  riskScore: number;
  color: string;
  borderColor: string;
  polygonPoints: string;
  description: string;
}

export interface SeaIceConcentrationFeature {
  id: string;
  zoneName: string;
  concentrationTier: '0–20%' | '20–50%' | '50–80%' | '80–100%';
  concentrationPct: number;
  iceStage: string;
  color: string;
  fillOpacity: number;
  polygonPoints: string;
}

export interface OceanCurrentVector {
  id: string;
  x: number;
  y: number;
  speedKts: number;
  directionDeg: number;
  label?: string;
}

export interface BathymetryContour {
  id: string;
  depthM: number;
  points: string;
  label: string;
}
