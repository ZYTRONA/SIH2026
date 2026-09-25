"""
POLARIS AI Data Pipeline  Master Orchestration & Ingestion Engine
National Centre for Polar & Ocean Research (NCPOR) & IMO Polar Code System.

Orchestrates multi-sensor data collectors (Cryo, Hydro, Meteo, Bathymetry),
normalizes spatial grids, executes physics-based validation, and persists
harmonized ocean intelligence to Supabase / PostGIS storage.
"""

import os
import sys
import time
import argparse
import datetime
from pathlib import Path
from typing import Dict, Any, Optional

# Ensure project root is in python path
current_dir = Path(__file__).resolve().parent
backend_dir = current_dir.parent
root_dir = backend_dir.parent
for p in [str(root_dir), str(backend_dir), str(current_dir)]:
    if p not in sys.path:
        sys.path.insert(0, p)

from backend.data_pipeline.collectors.sea_ice import SeaIceCollector
from backend.data_pipeline.collectors.ice_motion import IceMotionCollector
from backend.data_pipeline.collectors.iceberg import IcebergCollector
from backend.data_pipeline.collectors.currents import OceanCurrentCollector
from backend.data_pipeline.collectors.waves import OceanWaveCollector
from backend.data_pipeline.collectors.wind import WindCollector
from backend.data_pipeline.collectors.weather import PolarWeatherCollector
from backend.data_pipeline.collectors.gebco import GebcoBathymetryCollector

from backend.data_pipeline.processors.normalize import DataNormalizer
from backend.data_pipeline.processors.validate import DataValidator
from backend.data_pipeline.database.db import pipeline_db
from backend.data_pipeline.scheduler import pipeline_scheduler

class PolarisDataPipeline:
    def __init__(self):
        # Initialize collectors
        self.sea_ice_col = SeaIceCollector()
        self.ice_motion_col = IceMotionCollector()
        self.iceberg_col = IcebergCollector()
        self.currents_col = OceanCurrentCollector()
        self.waves_col = OceanWaveCollector()
        self.wind_col = WindCollector()
        self.weather_col = PolarWeatherCollector()
        self.gebco_col = GebcoBathymetryCollector()

        # Initialize processors
        self.normalizer = DataNormalizer()
        self.validator = DataValidator()
        self.db = pipeline_db

    def execute_ingestion_cycle(
        self,
        bbox: Optional[Dict[str, float]] = None,
        forecast_horizon_hours: int = 72
    ) -> Dict[str, Any]:
        """
        Executes an end-to-end ingestion and synthesis cycle across all 8 polar data streams.
        """
        start_time = time.time()
        print(f"\n[DataPipeline] Starting Ingestion Cycle at {datetime.datetime.utcnow().isoformat()}Z...")

        # 1. Collect raw feeds in parallel / sequence
        raw_sea_ice = self.sea_ice_col.fetch(bbox=bbox, forecast_hours=forecast_horizon_hours)
        raw_ice_motion = self.ice_motion_col.fetch(bbox=bbox)
        raw_icebergs = self.iceberg_col.fetch()
        raw_currents = self.currents_col.fetch(bbox=bbox)
        raw_waves = self.waves_col.fetch(bbox=bbox)
        raw_wind = self.wind_col.fetch(bbox=bbox)
        raw_weather = self.weather_col.fetch(bbox=bbox)
        raw_gebco = self.gebco_col.fetch(bbox=bbox)

        # 2. Normalize and merge multi-modal grid
        unified_grid = self.normalizer.merge_to_unified_grid(
            sea_ice_data=raw_sea_ice["data"],
            ice_motion_data=raw_ice_motion["data"],
            currents_data=raw_currents["data"],
            waves_data=raw_waves["data"],
            wind_data=raw_wind["data"],
            weather_data=raw_weather["data"],
            gebco_data=raw_gebco["data"]
        )

        # 3. Apply Quality Assurance & Physical Boundary Validation
        validated_grid, val_report = self.validator.sanitize_and_filter(unified_grid)

        # 4. Persist to Database / Supabase
        sea_ice_save = self.db.save_sea_ice_forecast(
            horizon_hours=forecast_horizon_hours,
            avg_density=raw_sea_ice["average_ice_density_pct"],
            grid_data=validated_grid
        )

        iceberg_save = self.db.save_iceberg_predictions(raw_icebergs["data"])

        duration = round(time.time() - start_time, 2)

        summary = {
            "cycle_status": "COMPLETED",
            "execution_duration_sec": duration,
            "timestamp": datetime.datetime.utcnow().isoformat() + "Z",
            "forecast_horizon_hours": forecast_horizon_hours,
            "streams_collected": 8,
            "total_grid_cells_generated": len(unified_grid),
            "validated_cells": val_report["valid_count"],
            "rejected_cells": val_report["rejected_count"],
            "icebergs_tracked": len(raw_icebergs["data"]),
            "average_ice_density_pct": raw_sea_ice["average_ice_density_pct"],
            "max_wave_height_m": raw_waves["max_wave_height_m"],
            "max_wind_speed_kts": raw_wind["max_wind_kts"],
            "database_storage": iceberg_save.get("storage", "UNKNOWN")
        }

        # Log run telemetry
        self.db.log_pipeline_run(summary)
        print(f"[DataPipeline] Cycle completed in {duration}s. Valid cells: {val_report['valid_count']}. Tracked Icebergs: {len(raw_icebergs['data'])}.")

        return summary

# Global instance
pipeline_engine = PolarisDataPipeline()

def run_pipeline() -> Dict[str, Any]:
    """Helper for scheduled or API-driven execution."""
    return pipeline_engine.execute_ingestion_cycle()

def init_scheduler():
    """Binds task and starts daemon."""
    pipeline_scheduler.set_task(run_pipeline)
    pipeline_scheduler.start()

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="POLARIS Master Data Ingestion Pipeline")
    parser.add_argument("--run-once", action="store_true", help="Execute single ingestion cycle and exit")
    parser.add_argument("--horizon", type=int, default=72, help="Forecast horizon hours (0, 24, 48, 72)")
    parser.add_argument("--start-scheduler", action="store_true", help="Run background continuous scheduler")
    args = parser.parse_args()

    if args.start_scheduler:
        print("[POLARIS Pipeline] Starting autonomous scheduling daemon...")
        init_scheduler()
        try:
            while True:
                time.sleep(1)
        except KeyboardInterrupt:
            pipeline_scheduler.stop()
            print("\nScheduler shut down gracefully.")
    else:
        summary = pipeline_engine.execute_ingestion_cycle(forecast_horizon_hours=args.horizon)
        print("\n=== EXECUTION SUMMARY ===")
        for k, v in summary.items():
            print(f"  {k}: {v}")
