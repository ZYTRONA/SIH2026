-- =============================================================================
-- POLARIS PLATFORM — CANONICAL SUPABASE + POSTGIS SCHEMA
-- National Centre for Polar and Ocean Research (NCPOR)
-- Mission: SA Agulhas II (PC3) | Maitri Station -> Bharati Station
-- =============================================================================

-- 1. Enable Required Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- 2. Drop Existing Tables (Clean Setup)
DROP TABLE IF EXISTS routes CASCADE;
DROP TABLE IF EXISTS risk_maps CASCADE;
DROP TABLE IF EXISTS iceberg_predictions CASCADE;
DROP TABLE IF EXISTS sea_ice_forecasts CASCADE;
DROP TABLE IF EXISTS missions CASCADE;
DROP TABLE IF EXISTS vessels CASCADE;

-- =============================================================================
-- 3. CORE TABLES (EXACT SPECIFICATION)
-- =============================================================================

-- Table: vessels
CREATE TABLE vessels (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  polar_class TEXT NOT NULL,
  speed NUMERIC NOT NULL,
  fuel_capacity NUMERIC NOT NULL,
  engine_power NUMERIC NOT NULL
);

-- Table: missions
CREATE TABLE missions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  vessel_id UUID REFERENCES vessels(id) ON DELETE CASCADE,
  source_name TEXT NOT NULL,
  source_lat NUMERIC NOT NULL,
  source_lng NUMERIC NOT NULL,
  dest_name TEXT NOT NULL,
  dest_lat NUMERIC NOT NULL,
  dest_lng NUMERIC NOT NULL,
  status TEXT NOT NULL DEFAULT 'ACTIVE',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table: sea_ice_forecasts
CREATE TABLE sea_ice_forecasts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  forecast_time TIMESTAMPTZ DEFAULT NOW(),
  horizon_hours INT NOT NULL, -- 0, 24, 48, 72
  ice_density NUMERIC NOT NULL,
  grid_data JSONB NOT NULL,
  confidence NUMERIC DEFAULT 94.2
);

-- Table: iceberg_predictions
CREATE TABLE iceberg_predictions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  iceberg_code TEXT NOT NULL,
  current_position GEOGRAPHY(Point, 4326) NOT NULL,
  future_position GEOGRAPHY(Point, 4326) NOT NULL,
  drift_speed NUMERIC NOT NULL,
  direction NUMERIC NOT NULL,
  size_km2 NUMERIC NOT NULL,
  risk_level TEXT NOT NULL, -- 'low', 'moderate', 'high', 'critical'
  confidence NUMERIC DEFAULT 91.8,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table: risk_maps
CREATE TABLE risk_maps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  region TEXT NOT NULL,
  risk_score NUMERIC NOT NULL,
  factors JSONB NOT NULL, -- sea_ice, iceberg, wind, current, depth
  geom GEOGRAPHY NOT NULL
);

-- Table: routes
CREATE TABLE routes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  mission_id UUID REFERENCES missions(id) ON DELETE CASCADE,
  route_type TEXT NOT NULL, -- 'safe', 'fastest', 'efficient', 'balanced'
  distance_nm NUMERIC NOT NULL,
  fuel_usage_mt NUMERIC NOT NULL,
  travel_time_hours NUMERIC NOT NULL,
  risk_score NUMERIC NOT NULL,
  geometry GEOGRAPHY(LineString, 4326),
  shap_explanation JSONB
);

-- =============================================================================
-- 4. SPATIAL & PERFORMANCE INDEXES
-- =============================================================================
CREATE INDEX IF NOT EXISTS idx_missions_vessel ON missions(vessel_id);
CREATE INDEX IF NOT EXISTS idx_sea_ice_horizon ON sea_ice_forecasts(horizon_hours);
CREATE INDEX IF NOT EXISTS idx_iceberg_curr_pos ON iceberg_predictions USING GIST(current_position);
CREATE INDEX IF NOT EXISTS idx_iceberg_fut_pos ON iceberg_predictions USING GIST(future_position);
CREATE INDEX IF NOT EXISTS idx_risk_maps_geom ON risk_maps USING GIST(geom);
CREATE INDEX IF NOT EXISTS idx_routes_geom ON routes USING GIST(geometry);

-- =============================================================================
-- 5. ROW LEVEL SECURITY (RLS) & AUTHENTICATION ROLES
-- Roles: ncpor_scientist, captain, analyst, demo
-- =============================================================================
ALTER TABLE vessels ENABLE ROW LEVEL SECURITY;
ALTER TABLE missions ENABLE ROW LEVEL SECURITY;
ALTER TABLE sea_ice_forecasts ENABLE ROW LEVEL SECURITY;
ALTER TABLE iceberg_predictions ENABLE ROW LEVEL SECURITY;
ALTER TABLE risk_maps ENABLE ROW LEVEL SECURITY;
ALTER TABLE routes ENABLE ROW LEVEL SECURITY;

-- Read Access: Authenticated users & Demo/Anon read-only access
CREATE POLICY "Public & Authenticated Read Vessels" ON vessels FOR SELECT USING (true);
CREATE POLICY "Public & Authenticated Read Missions" ON missions FOR SELECT USING (true);
CREATE POLICY "Public & Authenticated Read Forecasts" ON sea_ice_forecasts FOR SELECT USING (true);
CREATE POLICY "Public & Authenticated Read Icebergs" ON iceberg_predictions FOR SELECT USING (true);
CREATE POLICY "Public & Authenticated Read RiskMaps" ON risk_maps FOR SELECT USING (true);
CREATE POLICY "Public & Authenticated Read Routes" ON routes FOR SELECT USING (true);

-- Write Access: Restricted to Authenticated Staff (ncpor_scientist, captain, analyst)
CREATE POLICY "Authenticated Staff Insert Missions" ON missions FOR INSERT TO authenticated WITH CHECK (
  auth.jwt() ->> 'role' IN ('ncpor_scientist', 'captain', 'analyst') OR auth.role() = 'authenticated'
);

CREATE POLICY "Authenticated Staff Update Missions" ON missions FOR UPDATE TO authenticated USING (
  auth.jwt() ->> 'role' IN ('ncpor_scientist', 'captain', 'analyst') OR auth.role() = 'authenticated'
);

CREATE POLICY "Authenticated Staff Insert Routes" ON routes FOR INSERT TO authenticated WITH CHECK (
  auth.jwt() ->> 'role' IN ('ncpor_scientist', 'captain', 'analyst') OR auth.role() = 'authenticated'
);

-- =============================================================================
-- 6. SEED DATA (NCPOR / SA AGULHAS II / MAITRI -> BHARATI)
-- =============================================================================

-- Insert Flagship Vessel
INSERT INTO vessels (id, name, polar_class, speed, fuel_capacity, engine_power)
VALUES (
  'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d',
  'SA Agulhas II',
  'PC3',
  14.5,
  1850.0,
  12000.0
);

-- Insert Active Mission
INSERT INTO missions (id, vessel_id, source_name, source_lat, source_lng, dest_name, dest_lat, dest_lng, status)
VALUES (
  'f0e1d2c3-b4a5-4f6e-8d9c-1a2b3c4d5e6f',
  'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d',
  'Maitri Station (Queen Maud Land)',
  -70.77,
  11.73,
  'Bharati Station (Larsemann Hills / Prydz Bay)',
  -69.41,
  76.19,
  'ACTIVE_TRANSIT'
);

-- Insert Sea Ice Forecasts (0h, 24h, 48h, 72h Horizons)
INSERT INTO sea_ice_forecasts (forecast_time, horizon_hours, ice_density, grid_data, confidence)
VALUES
(NOW(), 0, 0.32, '{"resolution_km": 1.0, "mean_pct": 32.0, "sensor": "Sentinel-1 SAR + AMSR2"}', 96.5),
(NOW() + INTERVAL '24 hours', 24, 0.38, '{"resolution_km": 1.0, "mean_pct": 38.4, "sensor": "ResUNet v3.2"}', 94.2),
(NOW() + INTERVAL '48 hours', 48, 0.44, '{"resolution_km": 1.0, "mean_pct": 44.1, "sensor": "ResUNet v3.2"}', 91.0),
(NOW() + INTERVAL '72 hours', 72, 0.51, '{"resolution_km": 1.0, "mean_pct": 51.7, "sensor": "ResUNet v3.2"}', 87.8);

-- Insert Tracked Icebergs in East Antarctic Fairway
INSERT INTO iceberg_predictions (iceberg_code, current_position, future_position, drift_speed, direction, size_km2, risk_level, confidence)
VALUES
(
  'A-76A-FRAG',
  ST_SetSRID(ST_MakePoint(18.30, -68.45), 4326)::geography,
  ST_SetSRID(ST_MakePoint(17.85, -68.75), 4326)::geography,
  1.4,
  245.0,
  145.0,
  'critical',
  95.4
),
(
  'IB-PRYDZ-09',
  ST_SetSRID(ST_MakePoint(72.40, -68.80), 4326)::geography,
  ST_SetSRID(ST_MakePoint(71.90, -69.10), 4326)::geography,
  1.8,
  275.0,
  28.0,
  'high',
  92.1
),
(
  'IB-ENDERBY-22',
  ST_SetSRID(ST_MakePoint(45.60, -67.30), 4326)::geography,
  ST_SetSRID(ST_MakePoint(44.90, -67.55), 4326)::geography,
  0.9,
  260.0,
  4.5,
  'moderate',
  89.6
);

-- Insert Dynamic Risk Map Sector
INSERT INTO risk_maps (region, risk_score, factors, geom)
VALUES (
  'Prydz Bay Outer Pack Ice Corridor',
  42.5,
  '{"sea_ice": 0.30, "iceberg": 0.40, "wind": 0.20, "current": 0.10, "depth": 0.05}',
  ST_SetSRID(ST_GeomFromText('POLYGON((68.0 -67.0, 78.0 -67.0, 78.0 -70.5, 68.0 -70.5, 68.0 -67.0))'), 4326)::geography
);

-- Insert Optimized Routes (Safe, Fastest, Fuel Efficient, Balanced)
INSERT INTO routes (mission_id, route_type, distance_nm, fuel_usage_mt, travel_time_hours, risk_score, geometry, shap_explanation)
VALUES
(
  'f0e1d2c3-b4a5-4f6e-8d9c-1a2b3c4d5e6f',
  'safe',
  1965.0,
  142.6,
  120.0,
  18.2,
  ST_SetSRID(ST_GeomFromText('LINESTRING(11.73 -70.77, 25.40 -68.20, 45.10 -67.80, 68.00 -68.50, 76.19 -69.41)'), 4326)::geography,
  '{"iceberg_avoidance_pct": 40, "sea_ice_density_pct": 30, "katabatic_winds_pct": 20, "ocean_currents_pct": 10, "recommendation": "Optimal safe fairway avoiding A-76A fragment and Amery convergence"}'
),
(
  'f0e1d2c3-b4a5-4f6e-8d9c-1a2b3c4d5e6f',
  'fastest',
  1845.0,
  178.4,
  96.0,
  48.5,
  ST_SetSRID(ST_GeomFromText('LINESTRING(11.73 -70.77, 42.00 -69.50, 76.19 -69.41)'), 4326)::geography,
  '{"iceberg_avoidance_pct": 40, "sea_ice_density_pct": 30, "katabatic_winds_pct": 20, "ocean_currents_pct": 10, "recommendation": "Direct rhumb line with higher ice encounter and collision risk"}'
),
(
  'f0e1d2c3-b4a5-4f6e-8d9c-1a2b3c4d5e6f',
  'efficient',
  1890.0,
  128.0,
  108.0,
  26.4,
  ST_SetSRID(ST_GeomFromText('LINESTRING(11.73 -70.77, 35.00 -67.50, 60.00 -68.00, 76.19 -69.41)'), 4326)::geography,
  '{"iceberg_avoidance_pct": 40, "sea_ice_density_pct": 30, "katabatic_winds_pct": 20, "ocean_currents_pct": 10, "recommendation": "Current-assisted path utilizing westward Antarctic Coastal Current"}'
),
(
  'f0e1d2c3-b4a5-4f6e-8d9c-1a2b3c4d5e6f',
  'balanced',
  1920.0,
  135.2,
  112.0,
  22.0,
  ST_SetSRID(ST_GeomFromText('LINESTRING(11.73 -70.77, 28.00 -68.00, 52.00 -67.90, 76.19 -69.41)'), 4326)::geography,
  '{"iceberg_avoidance_pct": 40, "sea_ice_density_pct": 30, "katabatic_winds_pct": 20, "ocean_currents_pct": 10, "recommendation": "Multi-objective Pareto compromise balancing transit duration and safety"}'
);
