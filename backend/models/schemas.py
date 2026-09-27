from pydantic import BaseModel, Field, field_validator
from typing import List, Optional, Literal
from datetime import datetime

# Maximum supported forecast horizon (7 days), shared by all prediction models.
MAX_FORECAST_HOURS = 168


class VesselBase(BaseModel):
    name: str
    polar_class: str
    speed_knots: float = Field(gt=0)
    fuel_capacity_mt: float = Field(gt=0)
    engine_power_mw: Optional[float] = Field(default=24.0, gt=0)

class MissionRequest(BaseModel):
    vessel_name: str
    polar_class: str
    start_station: str
    start_lat: float = Field(ge=-90, le=90)
    start_lng: float = Field(ge=-180, le=180)
    dest_station: str
    dest_lat: float = Field(ge=-90, le=90)
    dest_lng: float = Field(ge=-180, le=180)
    priority: str = "Safest"

class SeaIcePredictionRequest(BaseModel):
    horizon_hours: int = Field(default=72, ge=1, le=MAX_FORECAST_HOURS)
    satellite_source: Optional[str] = "Sentinel-1 SAR + AMSR2"

class IcebergPredictionRequest(BaseModel):
    iceberg_id: str = Field(min_length=1, max_length=64)
    horizon_hours: int = Field(default=72, ge=1, le=MAX_FORECAST_HOURS)

class RouteOptimizationRequest(BaseModel):
    vessel_name: str = "SA Agulhas II"
    polar_class: str = "PC3"
    speed_kts: float = Field(default=14.5, gt=0, le=60)
    fuel_capacity_mt: float = Field(default=1850.0, gt=0)
    start_lat: float = Field(default=-70.77, ge=-90, le=90)
    start_lng: float = Field(default=11.73, ge=-180, le=180)
    dest_lat: float = Field(default=-69.41, ge=-90, le=90)
    dest_lng: float = Field(default=76.19, ge=-180, le=180)
    mode: Literal["Safest", "Fastest", "Fuel Efficient", "Balanced"] = "Safest"
    forecast_horizon_hours: int = Field(default=72, ge=1, le=MAX_FORECAST_HOURS)

    @field_validator("mode", mode="before")
    @classmethod
    def _normalise_mode(cls, v: object) -> object:
        """Accept case-insensitive goal labels from older clients."""
        if isinstance(v, str):
            for valid in ("Safest", "Fastest", "Fuel Efficient", "Balanced"):
                if v.strip().lower() == valid.lower():
                    return valid
        return v

class RouteResult(BaseModel):
    id: str
    name: str
    mode: str
    distance_nm: float = Field(ge=0)
    travel_time_days: float = Field(ge=0)
    fuel_tons: float = Field(ge=0)
    fuel_efficiency_pct: float
    avg_risk_score: float
    rio_score: int
    risk_category: Literal["Low", "Moderate", "High", "Extreme"] = "Low"
    ice_encounter_pct: float
    iceberg_danger_count: int = Field(ge=0)
    waypoints: List[List[float]]

    @field_validator("waypoints")
    @classmethod
    def _valid_waypoints(cls, v: List[List[float]]) -> List[List[float]]:
        for wp in v:
            if len(wp) != 2:
                raise ValueError("each waypoint must be [lat, lng]")
            if not (-90 <= wp[0] <= 90 and -180 <= wp[1] <= 180):
                raise ValueError(f"waypoint {wp} outside WGS84 bounds")
        return v

class RouteOptimizationResponse(BaseModel):
    algorithm: str
    primary_route: RouteResult
    alternatives: List[RouteResult]
    computed_at: str

class ReportExportRequest(BaseModel):
    format: Literal["pdf", "csv"] = "pdf"
    vessel_name: str = Field(min_length=1, max_length=120)
    mission: str = Field(min_length=1, max_length=200)
    route_name: str = Field(min_length=1, max_length=120)
    distance_nm: float = Field(ge=0)
    travel_time_days: float = Field(ge=0)
    fuel_tons: float = Field(ge=0)
    risk_score: float = Field(ge=0, le=100)
    rio_score: int

    @field_validator("format", mode="before")
    @classmethod
    def _normalise_format(cls, v: object) -> object:
        """`CSV` / `Csv` must not silently fall through to the PDF branch."""
        if isinstance(v, str):
            return v.strip().lower()
        return v
