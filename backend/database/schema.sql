-- ====================================================================
-- POLARIS PLATFORM — POSTGRESQL + POSTGIS DATABASE SCHEMA
-- Polar Adaptive Route Intelligence System (NCPOR & IMO Compliant)
-- ====================================================================

-- 1. Enable PostGIS Spatial Extensions
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Vessels Table (IMO Polar Class & Hydrodynamic Profiles)
CREATE TABLE IF NOT EXISTS vessels (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(120) NOT NULL,
    polar_class VARCHAR(20) NOT NULL, -- PC1 through PC7
    call_sign VARCHAR(30),
    mmsi VARCHAR(20),
    speed_knots NUMERIC(5, 2) NOT NULL DEFAULT 14.0,
    fuel_capacity_mt NUMERIC(8, 2) NOT NULL DEFAULT 1850.0,
    current_fuel_pct NUMERIC(5, 2) DEFAULT 85.0,
    engine_power_mw NUMERIC(6, 2) DEFAULT 24.0,
    max_ice_thickness_m NUMERIC(4, 2) DEFAULT 1.8,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Missions Table (Antarctic Expedition Legs)
CREATE TABLE IF NOT EXISTS missions (
    mission_id VARCHAR(60) PRIMARY KEY,
    vessel_id UUID REFERENCES vessels(id) ON DELETE SET NULL,
    vessel_name VARCHAR(120) NOT NULL,
    source_name VARCHAR(120) NOT NULL,
    source_geom GEOMETRY(Point, 4326) NOT NULL,
    destination_name VARCHAR(120) NOT NULL,
    destination_geom GEOMETRY(Point, 4326) NOT NULL,
    status VARCHAR(30) DEFAULT 'ACTIVE', -- 'PLANNED', 'ACTIVE', 'COMPLETED', 'ARCHIVED'
    departure_time TIMESTAMP WITH TIME ZONE,
    estimated_arrival TIMESTAMP WITH TIME ZONE,
    priority VARCHAR(30) DEFAULT 'Safest',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Sea Ice Forecasts Table (ResUNet Multi-Temporal Grids)
CREATE TABLE IF NOT EXISTS sea_ice_forecasts (
    forecast_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    forecast_date TIMESTAMP WITH TIME ZONE NOT NULL,
    horizon_hours INT NOT NULL, -- 24, 48, 72
    satellite_source VARCHAR(60) DEFAULT 'Sentinel-1 SAR / AMSR2',
    model_version VARCHAR(60) DEFAULT 'ResUNet-v3.2-Edge',
    mean_ice_density NUMERIC(5, 2) NOT NULL,
    grid_data JSONB NOT NULL,
    bounding_box GEOMETRY(Polygon, 4326),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Iceberg Predictions Table (Hydrodynamic Physics + XGBoost)
CREATE TABLE IF NOT EXISTS iceberg_predictions (
    iceberg_id VARCHAR(60) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    dimension_class VARCHAR(40), -- 'Very Large Tabular', 'Medium Pinnacled', etc.
    length_m NUMERIC(8, 2),
    height_m NUMERIC(6, 2),
    current_position GEOMETRY(Point, 4326) NOT NULL,
    current_lat NUMERIC(8, 4) NOT NULL,
    current_lng NUMERIC(8, 4) NOT NULL,
    future_position GEOMETRY(Point, 4326) NOT NULL,
    future_lat NUMERIC(8, 4) NOT NULL,
    future_lng NUMERIC(8, 4) NOT NULL,
    drift_speed_kts NUMERIC(5, 2) NOT NULL,
    drift_direction_deg NUMERIC(5, 1) NOT NULL,
    confidence_score NUMERIC(5, 2) DEFAULT 92.0,
    predicted_trajectory_linestring GEOMETRY(LineString, 4326),
    confidence_cone GEOMETRY(Polygon, 4326),
    last_sar_detection TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Dynamic Risk Maps Table (IMO Polar Code RIO Assessment)
CREATE TABLE IF NOT EXISTS risk_maps (
    risk_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    risk_score NUMERIC(5, 2) NOT NULL,
    risk_level VARCHAR(30) NOT NULL, -- 'LOW', 'MODERATE', 'HIGH', 'EXTREME'
    rio_index INT NOT NULL,
    sea_ice_factor NUMERIC(4, 2),
    iceberg_proximity_factor NUMERIC(4, 2),
    wind_factor NUMERIC(4, 2),
    ocean_current_factor NUMERIC(4, 2),
    depth_factor NUMERIC(4, 2),
    region VARCHAR(100) NOT NULL,
    region_geom GEOMETRY(Polygon, 4326) NOT NULL,
    computed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Route Optimization Table (A* + NSGA-II Solutions)
CREATE TABLE IF NOT EXISTS routes (
    route_id VARCHAR(60) PRIMARY KEY,
    mission_id VARCHAR(60) REFERENCES missions(mission_id) ON DELETE CASCADE,
    name VARCHAR(120) NOT NULL,
    optimization_mode VARCHAR(40) NOT NULL, -- 'Safest', 'Fastest', 'Fuel Efficient'
    distance_nm NUMERIC(8, 2) NOT NULL,
    travel_time_days NUMERIC(5, 2) NOT NULL,
    fuel_usage_mt NUMERIC(7, 2) NOT NULL,
    fuel_efficiency_pct NUMERIC(5, 2) NOT NULL,
    risk_score NUMERIC(5, 2) NOT NULL,
    rio_score INT NOT NULL,
    icebergs_encountered INT DEFAULT 0,
    ice_coverage_pct NUMERIC(5, 2) DEFAULT 0.0,
    is_recommended BOOLEAN DEFAULT FALSE,
    algorithm VARCHAR(100) DEFAULT 'A* + NSGA-II Hybrid',
    route_linestring GEOMETRY(LineString, 4326) NOT NULL,
    waypoints_geojson JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. Supporting Offline Sync & SHAP Explanation Logs
CREATE TABLE IF NOT EXISTS shap_explanations (
    explanation_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    route_id VARCHAR(60) REFERENCES routes(route_id) ON DELETE CASCADE,
    iceberg_proximity_pct NUMERIC(5, 2) DEFAULT 40.0,
    sea_ice_concentration_pct NUMERIC(5, 2) DEFAULT 30.0,
    wind_severity_pct NUMERIC(5, 2) DEFAULT 20.0,
    ocean_current_pct NUMERIC(5, 2) DEFAULT 10.0,
    explanation_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS edge_sync_queue (
    sync_id VARCHAR(100) PRIMARY KEY,
    vessel_id UUID REFERENCES vessels(id) ON DELETE CASCADE,
    payload_type VARCHAR(60) NOT NULL,
    payload JSONB NOT NULL,
    status VARCHAR(30) DEFAULT 'PENDING',
    queued_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    synced_at TIMESTAMP WITH TIME ZONE
);

-- Spatial Indexes for High-Performance Geospatial Queries
CREATE INDEX IF NOT EXISTS idx_missions_source_geom ON missions USING GIST(source_geom);
CREATE INDEX IF NOT EXISTS idx_missions_dest_geom ON missions USING GIST(destination_geom);
CREATE INDEX IF NOT EXISTS idx_icebergs_curr_geom ON iceberg_predictions USING GIST(current_position);
CREATE INDEX IF NOT EXISTS idx_icebergs_traj_geom ON iceberg_predictions USING GIST(predicted_trajectory_linestring);
CREATE INDEX IF NOT EXISTS idx_risk_maps_geom ON risk_maps USING GIST(region_geom);
CREATE INDEX IF NOT EXISTS idx_routes_geom ON routes USING GIST(route_linestring);

-- Sample Data Ingestion for NCPOR Operational Vessel SA Agulhas II
INSERT INTO vessels (id, name, polar_class, call_sign, mmsi, speed_knots, fuel_capacity_mt, current_fuel_pct, engine_power_mw, max_ice_thickness_m)
VALUES 
    ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'SA Agulhas II', 'PC3', 'ZR6352', '601614000', 14.5, 1850.0, 88.0, 24.0, 1.8),
    ('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'R/V Polar Sentinel', 'PC3', 'VUWS', '419001420', 13.2, 2100.0, 82.4, 22.0, 1.8)
ON CONFLICT (id) DO NOTHING;

INSERT INTO missions (mission_id, vessel_id, vessel_name, source_name, source_geom, destination_name, destination_geom, status, departure_time, priority)
VALUES (
    'MISSION-NCPOR-44',
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'SA Agulhas II',
    'Maitri Station (India)',
    ST_SetSRID(ST_MakePoint(11.73, -70.77), 4326),
    'Bharati Station (India)',
    ST_SetSRID(ST_MakePoint(76.19, -69.41), 4326),
    'ACTIVE',
    CURRENT_TIMESTAMP,
    'Safest'
) ON CONFLICT (mission_id) DO NOTHING;
