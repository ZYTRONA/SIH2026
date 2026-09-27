import { create } from 'zustand';
import { RoutePath } from '@/types/map';
import { generateDynamicRoutes } from '@/utils/dynamicPolarRouting';

export interface AppNotification {
  id: string;
  type: 'critical' | 'warning' | 'info' | 'safe';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface OfflineCacheStats {
  sarIceGridCached: boolean;
  icebergsTracked: number;
  routesPrecomputed: number;
  cacheSize: string;
  lastSyncTimestamp: string;
  storageQuotaUsedPercent: number;
}

export interface VoyageLocation {
  name?: string;
  lat: number;
  lng: number;
  description?: string;
}

const getInitialVoyageConfig = () => {
  try {
    const raw = sessionStorage.getItem('polaris_active_mission');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.source && parsed.destination) {
        const origin: VoyageLocation = {
          name: parsed.source.name || 'Maitri Station (Offshore Fairway)',
          lat: Number(parsed.source.lat) || -70.77,
          lng: Number(parsed.source.lng) || 11.73,
        };
        const destination: VoyageLocation = {
          name: parsed.destination.name || 'Bharati Station (Larsemann Hills)',
          lat: Number(parsed.destination.lat) || -69.41,
          lng: Number(parsed.destination.lng) || 76.19,
        };
        const polarClass = parsed.polarClass || 'PC3';
        const speedKts = Number(parsed.speedKts) || 14.5;
        const vesselName = parsed.vesselName || 'SA Agulhas II';
        const routes = generateDynamicRoutes({
          origin,
          destination,
          polarClass,
          vesselSpeedKts: speedKts,
        });
        return { origin, destination, polarClass, speedKts, vesselName, routes };
      }
    }
  } catch (e) {
    console.warn('Failed to parse polaris_active_mission from sessionStorage', e);
  }

  const defaultOrigin: VoyageLocation = {
    name: 'Mormugao Port, Goa (India)',
    lat: 15.40,
    lng: 73.80,
    description: 'NCPOR / MoES Indian Antarctic Expedition Embarkation Port, Goa.',
  };
  const defaultDest: VoyageLocation = {
    name: 'Bharati Station (Larsemann Hills)',
    lat: -69.41,
    lng: 76.19,
    description: 'NCPOR Polar Research Base & Deep-Water Anchorage in Prydz Bay, Antarctica.',
  };
  const defaultRoutes = generateDynamicRoutes({
    origin: defaultOrigin,
    destination: defaultDest,
    polarClass: 'PC3',
    vesselSpeedKts: 14.5,
  });

  return {
    origin: defaultOrigin,
    destination: defaultDest,
    polarClass: 'PC3',
    speedKts: 14.5,
    vesselName: 'MV Vasiliy Golovnin (ISEA-44)',
    routes: defaultRoutes,
  };
};

const initialVoyage = getInitialVoyageConfig();

interface AppState {
  // Sidebar states
  sidebarCollapsed: boolean;
  mobileSidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setMobileSidebarOpen: (open: boolean) => void;

  // Active Mission & Waypoints
  departureLocation: VoyageLocation;
  destinationLocation: VoyageLocation;
  activeRoutes: RoutePath[];
  selectedRouteId: string;
  vesselSpeedKts: number;
  polarClass: string;
  setVoyageEndpoints: (
    origin: VoyageLocation,
    destination: VoyageLocation,
    polarClass?: string,
    speedKts?: number,
    vesselName?: string
  ) => void;
  setSelectedRouteId: (routeId: string) => void;
  setVesselSpeedKts: (speed: number) => void;

  // Mission & Vessel context
  missionName: string;
  vesselName: string;
  vesselClass: string;
  operatorName: string;
  operatorRole: string;

  // System & Offline Edge Resilience
  isOffline: boolean;
  systemOnline: boolean;
  cloudConnected: boolean;
  edgeConnected: boolean;
  lastSyncTime: string;
  offlineCache: OfflineCacheStats;
  toggleOfflineMode: () => void;
  setOffline: (offline: boolean) => void;
  syncOfflineCache: () => void;

  // Notifications
  notifications: AppNotification[];
  unreadCount: () => number;
  markAllNotificationsRead: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  sidebarCollapsed: false,
  mobileSidebarOpen: false,
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
  setMobileSidebarOpen: (open) => set({ mobileSidebarOpen: open }),

  // Active Voyage Endpoints and Destinated Routes (Source of Truth)
  departureLocation: initialVoyage.origin,
  destinationLocation: initialVoyage.destination,
  activeRoutes: initialVoyage.routes,
  selectedRouteId: initialVoyage.routes[0]?.id || 'route-optimal',
  vesselSpeedKts: initialVoyage.speedKts,
  polarClass: initialVoyage.polarClass,

  setVoyageEndpoints: (origin, destination, polarClass = 'PC3', speedKts = 14.5, vesselName) => {
    const routes = generateDynamicRoutes({
      origin,
      destination,
      polarClass,
      vesselSpeedKts: speedKts,
    });

    try {
      const existingRaw = sessionStorage.getItem('polaris_active_mission');
      const existing = existingRaw ? JSON.parse(existingRaw) : {};
      sessionStorage.setItem(
        'polaris_active_mission',
        JSON.stringify({
          ...existing,
          source: origin,
          destination,
          polarClass,
          speedKts,
          vesselName: vesselName || existing.vesselName || get().vesselName,
          timestamp: new Date().toISOString(),
        })
      );
    } catch (e) {
      console.warn('Failed to update sessionStorage', e);
    }

    set({
      departureLocation: origin,
      destinationLocation: destination,
      activeRoutes: routes,
      selectedRouteId: routes[0]?.id || 'route-optimal',
      polarClass,
      vesselSpeedKts: speedKts,
      ...(vesselName ? { vesselName } : {}),
    });
  },

  setSelectedRouteId: (routeId) => set({ selectedRouteId: routeId }),
  setVesselSpeedKts: (speedKts) => set({ vesselSpeedKts: speedKts }),

  missionName: '44th Indian Scientific Expedition to Antarctica (ISEA-44)',
  vesselName: initialVoyage.vesselName || 'MV Vasiliy Golovnin (ISEA-44)',
  vesselClass: 'PC3 Ice-Class Expedition / Cargo Icebreaker',
  operatorName: 'Dr. R. Nair',
  operatorRole: 'Chief Scientific Navigator',

  isOffline: false,
  systemOnline: true,
  cloudConnected: true,
  edgeConnected: true,
  lastSyncTime: '2 min ago',

  offlineCache: {
    sarIceGridCached: true,
    icebergsTracked: 32,
    routesPrecomputed: 4,
    cacheSize: '48.2 GB',
    lastSyncTimestamp: '2 min ago (Copernicus Pass #443)',
    storageQuotaUsedPercent: 62.4,
  },

  toggleOfflineMode: () => {
    const nextOffline = !get().isOffline;
    set({
      isOffline: nextOffline,
      cloudConnected: !nextOffline,
      systemOnline: true, // Edge inference still keeps system active
      edgeConnected: true,
    });
  },

  setOffline: (offline) => {
    set({
      isOffline: offline,
      cloudConnected: !offline,
      systemOnline: true,
      edgeConnected: true,
    });
  },

  syncOfflineCache: () => {
    const nowStr = 'Just now (Edge Verified)';
    set((state) => ({
      lastSyncTime: nowStr,
      offlineCache: {
        ...state.offlineCache,
        lastSyncTimestamp: nowStr,
      },
    }));
  },

  notifications: [
    {
      id: 'notif-1',
      type: 'warning',
      title: 'Ice Drift Accelerated',
      message: 'Multi-year floe sector 7B velocity increased to 1.8 kts',
      timestamp: '10 min ago',
      read: false,
    },
    {
      id: 'notif-2',
      type: 'info',
      title: 'Copernicus Sentinel-1 Sync',
      message: 'Synthetic Aperture Radar pass 443 ingested successfully',
      timestamp: '25 min ago',
      read: false,
    },
    {
      id: 'notif-3',
      type: 'safe',
      title: 'Route POLAR-OPT-A Approved',
      message: 'Optimal corridor verified with 14.2% fuel efficiency gain',
      timestamp: '1 hr ago',
      read: true,
    },
  ],

  unreadCount: () => get().notifications.filter((n) => !n.read).length,
  markAllNotificationsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
    })),
}));
