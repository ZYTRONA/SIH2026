import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Read credentials from Vite environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

// Check if valid production or sandbox credentials are provided
export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    supabaseUrl &&
    supabaseAnonKey &&
    !supabaseUrl.includes('xyzcompany') &&
    !supabaseUrl.includes('your-project-ref') &&
    supabaseUrl.startsWith('https://')
  );
};

// Initialize Supabase Client (singleton)
export const supabase: SupabaseClient | null = ((): SupabaseClient | null => {
  if (isSupabaseConfigured() && supabaseUrl && supabaseAnonKey) {
    try {
      return createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
        },
      });
    } catch (err) {
      console.warn('[POLARIS Supabase] Initialization error:', err);
      return null;
    }
  }
  return null;
})();

// -----------------------------------------------------------------------------
// Database Query Interfaces & Helpers
// -----------------------------------------------------------------------------

export interface DbVessel {
  id: string;
  name: string;
  polar_class: string;
  speed: number;
  fuel_capacity: number;
  engine_power: number;
}

export interface DbMission {
  id: string;
  vessel_id: string;
  source_name: string;
  source_lat: number;
  source_lng: number;
  dest_name: string;
  dest_lat: number;
  dest_lng: number;
  status: string;
  created_at: string;
}

export interface DbSeaIceForecast {
  id: string;
  forecast_time: string;
  horizon_hours: number;
  ice_density: number;
  grid_data: any;
  confidence: number;
}

export interface DbIcebergPrediction {
  id: string;
  iceberg_code: string;
  drift_speed: number;
  direction: number;
  size_km2: number;
  risk_level: string;
  confidence: number;
  updated_at: string;
}

export interface DbRoute {
  id: string;
  mission_id: string;
  route_type: string;
  distance_nm: number;
  fuel_usage_mt: number;
  travel_time_hours: number;
  risk_score: number;
  shap_explanation: any;
}

/**
 * Fetch vessels from Supabase or fallback
 */
export async function getVessels(): Promise<DbVessel[]> {
  if (!supabase) return [];
  const { data, error } = await supabase.from('vessels').select('*');
  if (error) {
    console.error('[Supabase] Error fetching vessels:', error.message);
    return [];
  }
  return data || [];
}

/**
 * Fetch active missions for SA Agulhas II
 */
export async function getActiveMissions(): Promise<DbMission[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('missions')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) {
    console.error('[Supabase] Error fetching missions:', error.message);
    return [];
  }
  return data || [];
}

/**
 * Fetch sea ice forecasts by horizon
 */
export async function getSeaIceForecasts(horizonHours?: number): Promise<DbSeaIceForecast[]> {
  if (!supabase) return [];
  let query = supabase.from('sea_ice_forecasts').select('*');
  if (horizonHours !== undefined) {
    query = query.eq('horizon_hours', horizonHours);
  }
  const { data, error } = await query;
  if (error) {
    console.error('[Supabase] Error fetching sea ice forecasts:', error.message);
    return [];
  }
  return data || [];
}

/**
 * Fetch iceberg predictions with risk assessments
 */
export async function getIcebergPredictions(): Promise<DbIcebergPrediction[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('iceberg_predictions')
    .select('*')
    .order('confidence', { ascending: false });
  if (error) {
    console.error('[Supabase] Error fetching icebergs:', error.message);
    return [];
  }
  return data || [];
}

/**
 * Fetch optimized routes for a mission
 */
export async function getMissionRoutes(missionId?: string): Promise<DbRoute[]> {
  if (!supabase) return [];
  let query = supabase.from('routes').select('*');
  if (missionId) {
    query = query.eq('mission_id', missionId);
  }
  const { data, error } = await query;
  if (error) {
    console.error('[Supabase] Error fetching routes:', error.message);
    return [];
  }
  return data || [];
}
