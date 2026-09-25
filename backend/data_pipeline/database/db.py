"""
POLARIS AI Data Pipeline  Database Storage & Ingestion Interface
Persists harmonized observation grids, iceberg predictions, and sea ice forecasts
to Supabase / PostgreSQL tables, with resilient edge cache fallback.
"""

import os
import json
import datetime
from typing import Dict, Any, List, Optional

try:
    from backend.database.supabase_client import db_manager, is_supabase_configured
except ImportError:
    # Direct fallback if run standalone
    import sys
    from pathlib import Path
    sys.path.append(str(Path(__file__).resolve().parent.parent.parent.parent))
    from backend.database.supabase_client import db_manager, is_supabase_configured

class PipelineDatabase:
    def __init__(self):
        self.db = db_manager
        self._local_cache: Dict[str, Any] = {
            "sea_ice_forecasts": [],
            "iceberg_predictions": [],
            "risk_maps": [],
            "pipeline_runs": []
        }

    def save_sea_ice_forecast(
        self,
        horizon_hours: int,
        avg_density: float,
        grid_data: List[Dict[str, Any]],
        confidence: float = 94.2
    ) -> Dict[str, Any]:
        """
        Saves a sea ice forecast entry into `sea_ice_forecasts` table.
        """
        record = {
            "forecast_time": datetime.datetime.utcnow().isoformat() + "Z",
            "horizon_hours": horizon_hours,
            "ice_density": avg_density,
            "grid_data": grid_data,
            "confidence": confidence
        }

        if is_supabase_configured() and self.db.client:
            try:
                res = self.db.client.table("sea_ice_forecasts").insert(record).execute()
                if res.data:
                    return {"status": "SAVED_TO_SUPABASE", "record": res.data[0]}
            except Exception as e:
                print(f"[PipelineDB] Supabase insert error (sea_ice): {e}")

        # In-memory edge fallback
        self._local_cache["sea_ice_forecasts"].append(record)
        return {"status": "STORED_LOCALLY", "record": record}

    def save_iceberg_predictions(self, icebergs: List[Dict[str, Any]]) -> Dict[str, Any]:
        """
        Batch saves iceberg tracking and trajectory predictions into `iceberg_predictions`.
        """
        saved_count = 0
        for berg in icebergs:
            # PostGIS Point format: POINT(lon lat)
            curr_wkt = f"POINT({berg['lon']} {berg['lat']})"
            fut_wkt = f"POINT({berg.get('future_lon', berg['lon'])} {berg.get('future_lat', berg['lat'])})"
            
            record = {
                "iceberg_code": berg["iceberg_code"],
                "current_position": curr_wkt,
                "future_position": fut_wkt,
                "drift_speed": berg["drift_speed_kts"],
                "direction": berg["drift_direction_deg"],
                "size_km2": berg["size_km2"],
                "risk_level": berg["risk_level"],
                "confidence": berg.get("confidence", 91.8),
                "updated_at": datetime.datetime.utcnow().isoformat() + "Z"
            }

            if is_supabase_configured() and self.db.client:
                try:
                    self.db.client.table("iceberg_predictions").insert(record).execute()
                    saved_count += 1
                except Exception as e:
                    print(f"[PipelineDB] Error saving iceberg {berg['iceberg_code']}: {e}")
            else:
                self._local_cache["iceberg_predictions"].append(record)
                saved_count += 1

        return {
            "status": "SUCCESS",
            "saved_count": saved_count,
            "storage": "SUPABASE" if (is_supabase_configured() and self.db.client) else "LOCAL_EDGE_CACHE"
        }

    def log_pipeline_run(self, metadata: Dict[str, Any]):
        """Records pipeline run health and diagnostic telemetry."""
        entry = {
            "run_at": datetime.datetime.utcnow().isoformat() + "Z",
            **metadata
        }
        self._local_cache["pipeline_runs"].append(entry)
        # Keep last 50 runs in memory
        self._local_cache["pipeline_runs"] = self._local_cache["pipeline_runs"][-50:]

    def get_latest_metrics(self) -> Dict[str, Any]:
        return {
            "cached_sea_ice_runs": len(self._local_cache["sea_ice_forecasts"]),
            "cached_icebergs": len(self._local_cache["iceberg_predictions"]),
            "total_logged_runs": len(self._local_cache["pipeline_runs"]),
            "latest_run": self._local_cache["pipeline_runs"][-1] if self._local_cache["pipeline_runs"] else None
        }

pipeline_db = PipelineDatabase()
