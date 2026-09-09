export interface MapLayerVisibility {
  seaIce: boolean;
  icebergs: boolean;
  risk: boolean;
  weather: boolean;
  oceanCurrents: boolean;
  bathymetry: boolean;
  routes: boolean;
  aisTargets?: boolean;
  stations?: boolean;
  navAids?: boolean;
}

export type IcebergSizeClass = 'Growler' | 'Bergy Bit' | 'Medium' | 'Giant Tabular';
export type RiskSeverity = 'safe' | 'low' | 'moderate' | 'warning' | 'high' | 'critical';

export interface IcebergTrajectoryPoint {
  hoursAhead: number;
  lat: number;
  lng: number;
  predictedDriftKts: number;
}

export interface IcebergFeature {
  id: string;
  code: string;
  name: string;
  lat: number;
  lng: number;
  x: number; // 0-100 percentage in projected Antarctic/Atlantic chart
  y: number;
  sizeClass: IcebergSizeClass;
  areaKm2: number;
  thicknessM: number;
  massMt?: number; // Megatons
  draftM?: number; // Keel draft depth
  driftSpeedKts: number;
  driftDirectionDeg: number;
  riskLevel: RiskSeverity;
  nearestStation?: string;
  detectionSource: 'Sentinel-1 SAR' | 'Landsat-9 Optical' | 'Shipboard Radar' | 'CryoSat-2';
  closestApproachNm: number;
  firstObserved?: string;
  trajectory?: IcebergTrajectoryPoint[];
  dimensionsM?: { length: number; width: number; height: number };
  waterTempC?: number;
  collisionProbPct?: number;
}

export interface VesselState {
  name: string;
  type: string;
  iceClass: string;
  callSign?: string;
  mmsi?: string;
  imo?: string;
  lat: number;
  lng: number;
  x: number;
  y: number;
  headingDeg: number;
  cogDeg?: number; // Course Over Ground
  speedKts: number;
  destination: string;
  destLat: number;
  destLng: number;
  destX: number;
  destY: number;
  fuelCapacityPct: number;
  currentEngineLoadPct: number;
  radarRangeNm: number;
  depthUnderKeelM?: number; // Under Keel Clearance (UKC)
  rioIndex?: number; // Polar Code Risk Index Outcome
  thrustPowerMw?: number;
}

export interface AisVesselFeature {
  id: string;
  name: string;
  type: string;
  mmsi: string;
  imo: string;
  callSign: string;
  flag: string;
  flagCode: string;
  iceClass: string;
  lat: number;
  lng: number;
  headingDeg: number;
  cogDeg: number;
  speedKts: number;
  destination: string;
  eta: string;
  cpaNm: number; // Closest point of approach
  tcpaHours: number; // Time to CPA
  status: 'Underway using engine' | 'Moored / Ice Bound' | 'Scientific Operations' | 'Icebreaking Escort' | string;
  lengthM: number;
  beamM: number;
  draftM: number;
}

export interface AntarcticStationFeature {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  flag: string;
  type: 'Permanent Scientific Base' | 'Summer Research Base' | 'Automated Observatory' | string;
  lat: number;
  lng: number;
  elevationM: number;
  populationSummer: number;
  populationWinter: number;
  radioChannel: string;
  hfFrequencyKhz: string;
  runway: string;
  helipad: boolean;
  temperatureC: number;
  windKts: number;
  windDirDeg: number;
  isDest?: boolean;
  isOrigin?: boolean;
}

export interface NavigationalAidFeature {
  id: string;
  name: string;
  type: 'Safe Water Buoy' | 'Cardinal Mark (East)' | 'Cardinal Mark (North)' | 'Cardinal Mark (South)' | 'Lighthouse Beacon' | 'Virtual AIS AtoN' | 'Subsurface Acoustic Beacon' | string;
  lat: number;
  lng: number;
  lightCharacter: string; // e.g. 'Iso W 4s', 'Fl(3) W 10s'
  nominalRangeNm: number;
  status: 'Active / Operational' | 'Radio Synced' | string;
  depthM?: number;
  frequencyMhz?: number;
}

export interface WeatherPointFeature {
  id: string;
  lat: number;
  lng: number;
  windSpeedKts: number;
  windDirDeg: number;
  airTempC: number;
  seaTempC: number;
  swellHeightM: number;
  swellPeriodS: number;
  visibilityNm: number;
  pressureHpa: number;
  condition: string;
}

export interface RouteWaypoint {
  id: string;
  name: string;
  lat: number;
  lng: number;
  x: number;
  y: number;
  iceConcentrationPct: number;
  iceThicknessM?: number;
  rioScore?: number;
  legDistanceNm?: number;
  requiredThrustMw?: number;
  safeSpeedKts?: number;
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
  iceType?: string;
  ridgeHeightM?: number;
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
  eggCodeNotation?: string;
  thicknessM?: number;
  floeSizeClassification?: string;
}

export interface OceanCurrentVector {
  id: string;
  x: number;
  y: number;
  lat?: number;
  lng?: number;
  speedKts: number;
  directionDeg: number;
  label?: string;
  waterTempC?: number;
}

export interface BathymetryContour {
  id: string;
  depthM: number;
  points: string;
  label: string;
  dangerZone?: boolean;
}

export interface LiveSimulationState {
  isPlaying: boolean;
  speedMultiplier: 1 | 5 | 20;
  currentWpIndex: number;
  progressAlongLeg: number; // 0 to 1
  distanceTraveledNm: number;
  elapsedMinutes: number;
}

