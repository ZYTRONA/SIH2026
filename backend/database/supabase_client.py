"""
POLARIS Platform - Supabase Database & Auth Connector
Reads configuration directly from environment variables.
"""

import os
from pathlib import Path
from typing import Optional, Dict, Any, List

# Safely load .env
def _load_env_file():
    try:
        from dotenv import load_dotenv
        env_path = Path(__file__).resolve().parent.parent.parent / '.env'
        if env_path.exists():
            load_dotenv(dotenv_path=env_path)
        else:
            load_dotenv()
    except ImportError:
        # Simple pure Python .env parser fallback
        env_path = Path(__file__).resolve().parent.parent.parent / '.env'
        if env_path.exists():
            try:
                with open(env_path, 'r', encoding='utf-8') as f:
                    for line in f:
                        line = line.strip()
                        if line and not line.startswith('#') and '=' in line:
                            k, v = line.split('=', 1)
                            os.environ.setdefault(k.strip(), v.strip().strip('"').strip("'"))
            except Exception:
                pass

_load_env_file()

SUPABASE_URL = os.getenv("SUPABASE_URL", os.getenv("VITE_SUPABASE_URL", ""))
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY", os.getenv("SUPABASE_KEY", os.getenv("VITE_SUPABASE_ANON_KEY", "")))
DATABASE_URL = os.getenv("DATABASE_URL", "")

def is_supabase_configured() -> bool:
    return (
        bool(SUPABASE_URL) and
        bool(SUPABASE_KEY) and
        not "xyzcompany" in SUPABASE_URL and
        not "your-project-ref" in SUPABASE_URL and
        SUPABASE_URL.startswith("https://")
    )

class SupabaseManager:
    def __init__(self):
        self._client = None
        self._init_client()

    def _init_client(self):
        if is_supabase_configured():
            try:
                from supabase import create_client, Client
                self._client: Optional[Client] = create_client(SUPABASE_URL, SUPABASE_KEY)
                print(f"[Supabase] Connected successfully to {SUPABASE_URL}")
            except Exception as e:
                print(f"[Supabase] Client init warning: {e}")
                self._client = None
        else:
            self._client = None

    @property
    def client(self):
        if self._client is None and is_supabase_configured():
            self._init_client()
        return self._client

    def get_vessels(self) -> List[Dict[str, Any]]:
        if not self.client:
            return []
        try:
            res = self.client.table("vessels").select("*").execute()
            return res.data or []
        except Exception as e:
            print(f"[Supabase] Error fetching vessels: {e}")
            return []

    def get_missions(self) -> List[Dict[str, Any]]:
        if not self.client:
            return []
        try:
            res = self.client.table("missions").select("*").order("created_at", desc=True).execute()
            return res.data or []
        except Exception as e:
            print(f"[Supabase] Error fetching missions: {e}")
            return []

    def get_sea_ice_forecasts(self, horizon_hours: Optional[int] = None) -> List[Dict[str, Any]]:
        if not self.client:
            return []
        try:
            query = self.client.table("sea_ice_forecasts").select("*")
            if horizon_hours is not None:
                query = query.eq("horizon_hours", horizon_hours)
            res = query.execute()
            return res.data or []
        except Exception as e:
            print(f"[Supabase] Error fetching sea ice forecasts: {e}")
            return []

    def get_iceberg_predictions(self) -> List[Dict[str, Any]]:
        if not self.client:
            return []
        try:
            res = self.client.table("iceberg_predictions").select("*").execute()
            return res.data or []
        except Exception as e:
            print(f"[Supabase] Error fetching iceberg predictions: {e}")
            return []

    def save_route(self, route_data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        if not self.client:
            return None
        try:
            res = self.client.table("routes").insert(route_data).execute()
            return res.data[0] if res.data else None
        except Exception as e:
            print(f"[Supabase] Error saving route: {e}")
            return None

db_manager = SupabaseManager()
