"""
POLARIS AI Data Pipeline  Multi-Modal Data Normalizer
Harmonizes heterogeneous cryogenic, hydrodynamic, atmospheric, and bathymetric data
into unified spatial cells (WGS84 EPSG:4326) with standardized units and timestamps.
"""

import math
import datetime
from typing import Dict, Any, List, Optional

class DataNormalizer:
    @staticmethod
    def normalize_coordinates(lat: float, lon: float) -> tuple[float, float]:
        """Clamps and normalizes latitude [-90, 90] and longitude [-180, 180]."""
        clamped_lat = max(-90.0, min(90.0, float(lat)))
        # Normalize lon to [-180, 180]
        norm_lon = ((float(lon) + 180.0) % 360.0) - 180.0
        return round(clamped_lat, 4), round(norm_lon, 4)

    @staticmethod
    def knots_to_ms(knots: float) -> float:
        """Converts knots to meters/second."""
        return round(float(knots) * 0.514444, 3)

    @staticmethod
    def ms_to_knots(ms: float) -> float:
        """Converts meters/second to knots."""
        return round(float(ms) * 1.94384, 2)

    def merge_to_unified_grid(
        self,
        sea_ice_data: List[Dict[str, Any]],
        ice_motion_data: List[Dict[str, Any]],
        currents_data: List[Dict[str, Any]],
        waves_data: List[Dict[str, Any]],
        wind_data: List[Dict[str, Any]],
        weather_data: List[Dict[str, Any]],
        gebco_data: List[Dict[str, Any]]
    ) -> List[Dict[str, Any]]:
        """
        Fuses disparate sensor layers into coherent high-density tactical ocean navigation cells.
        Indexed by spatial key: f"{round(lat,1)}_{round(lon,1)}"
        """
        cell_map: Dict[str, Dict[str, Any]] = {}

        def get_or_create(lat: float, lon: float) -> Dict[str, Any]:
            n_lat, n_lon = self.normalize_coordinates(lat, lon)
            key = f"{round(n_lat, 1):.1f}_{round(n_lon, 1):.1f}"
            if key not in cell_map:
                cell_map[key] = {
                    "grid_id": key,
                    "lat": round(n_lat, 2),
                    "lon": round(n_lon, 2),
                    "timestamp": datetime.datetime.utcnow().isoformat() + "Z",
                    "sea_ice_concentration_pct": 0.0,
                    "sea_ice_thickness_m": 0.0,
                    "ice_stage": "Open Water",
                    "ice_drift_speed_kts": 0.0,
                    "ice_drift_dir_deg": 0.0,
                    "current_speed_kts": 0.0,
                    "current_direction_deg": 0.0,
                    "sst_celsius": -1.5,
                    "wave_height_m": 1.0,
                    "wave_period_s": 10.0,
                    "wind_speed_kts": 15.0,
                    "wind_direction_deg": 270.0,
                    "air_temp_c": -10.0,
                    "visibility_km": 10.0,
                    "icing_hazard": "None",
                    "bathymetry_depth_m": 3000.0,
                    "grounding_risk": False,
                    "composite_risk_score": 0.1
                }
            return cell_map[key]

        # Ingest sea ice
        for item in sea_ice_data:
            cell = get_or_create(item["lat"], item["lon"])
            cell["sea_ice_concentration_pct"] = item.get("ice_concentration_pct", 0.0)
            cell["sea_ice_thickness_m"] = item.get("ice_thickness_m", 0.0)
            cell["ice_stage"] = item.get("ice_stage", "Open Water")

        # Ingest ice motion
        for item in ice_motion_data:
            cell = get_or_create(item["lat"], item["lon"])
            cell["ice_drift_speed_kts"] = item.get("drift_speed_kts", 0.0)
            cell["ice_drift_dir_deg"] = item.get("drift_direction_deg", 0.0)

        # Ingest currents
        for item in currents_data:
            cell = get_or_create(item["lat"], item["lon"])
            cell["current_speed_kts"] = item.get("current_speed_kts", 0.0)
            cell["current_direction_deg"] = item.get("current_direction_deg", 0.0)
            cell["sst_celsius"] = item.get("sst_celsius", -1.5)

        # Ingest waves
        for item in waves_data:
            cell = get_or_create(item["lat"], item["lon"])
            cell["wave_height_m"] = item.get("significant_wave_height_m", 1.0)
            cell["wave_period_s"] = item.get("peak_period_s", 10.0)

        # Ingest wind
        for item in wind_data:
            cell = get_or_create(item["lat"], item["lon"])
            cell["wind_speed_kts"] = item.get("wind_speed_kts", 15.0)
            cell["wind_direction_deg"] = item.get("wind_direction_deg", 270.0)

        # Ingest weather
        for item in weather_data:
            cell = get_or_create(item["lat"], item["lon"])
            cell["air_temp_c"] = item.get("air_temperature_c", -10.0)
            cell["visibility_km"] = item.get("visibility_km", 10.0)
            cell["icing_hazard"] = item.get("icing_hazard_level", "None")

        # Ingest gebco bathymetry
        for item in gebco_data:
            cell = get_or_create(item["lat"], item["lon"])
            cell["bathymetry_depth_m"] = item.get("depth_m", 3000.0)
            cell["grounding_risk"] = item.get("shoal_warning", False)

        # Compute composite risk score for each merged cell (0.0=clear, 1.0=impassable)
        for cell in cell_map.values():
            sic_weight = (cell["sea_ice_concentration_pct"] / 100.0) * 0.45
            sit_weight = min(1.0, cell["sea_ice_thickness_m"] / 3.0) * 0.20
            wave_weight = min(1.0, cell["wave_height_m"] / 8.0) * 0.15
            wind_weight = min(1.0, cell["wind_speed_kts"] / 50.0) * 0.10
            icing_weight = 0.10 if cell["icing_hazard"] == "Severe Freezing Spray" else (0.05 if cell["icing_hazard"] == "Moderate Freezing Spray" else 0.0)
            
            raw_risk = sic_weight + sit_weight + wave_weight + wind_weight + icing_weight
            cell["composite_risk_score"] = round(min(0.99, max(0.05, raw_risk)), 3)

        return list(cell_map.values())

if __name__ == "__main__":
    normalizer = DataNormalizer()
    print("Normalizer initialized successfully.")
