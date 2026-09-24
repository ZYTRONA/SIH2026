from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime

class VesselBase(BaseModel):
    name: str
    polar_class: str
    speed_knots: float
    fuel_capacity_mt: float
    engine_power_mw: Optional[float] = 24.0

class MissionRequest(BaseModel):
    vessel_name: str
    polar_class: str
    start_station: str
    start_lat: float
    start_lng: float
    dest_station: str
    dest_lat: float
    dest_lng: float
    priority: str = "Safest"

class SeaIcePredictionRequest(BaseModel):
    horizon_hours: int = 72
    satellite_source: Optional[str] = "Sentinel-1 SAR + AMSR2"

class IcebergPredictionRequest(BaseModel):
    iceberg_id: str
    horizon_hours: int = 72

class RouteOptimizationRequest(BaseModel):
    vessel_name: str = "SA Agulhas II"
    polar_class: str = "PC3"
    speed_kts: float = 14.5
    fuel_capacity_mt: float = 1850.0
    start_lat: float = -70.77
    start_lng: float = 11.73
    dest_lat: float = -69.41
    dest_lng: float = 76.19
    mode: str = "Safest"
    forecast_horizon_hours: int = 72

class RouteResult(BaseModel):
    id: str
    name: str
    mode: str
    distance_nm: float
    travel_time_days: float
    fuel_tons: float
    fuel_efficiency_pct: float
    avg_risk_score: float
    rio_score: int
    ice_encounter_pct: float
    iceberg_danger_count: int
    waypoints: List[List[float]]

class RouteOptimizationResponse(BaseModel):
    algorithm: str
    primary_route: RouteResult
    alternatives: List[RouteResult]
    computed_at: str

class ReportExportRequest(BaseModel):
    format: str = "pdf"
    vessel_name: str
    mission: str
    route_name: str
    distance_nm: float
    travel_time_days: float
    fuel_tons: float
    risk_score: float
    rio_score: int
