import { create } from 'zustand';

export interface AppNotification {
  id: string;
  type: 'critical' | 'warning' | 'info' | 'safe';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

interface AppState {
  // Sidebar states
  sidebarCollapsed: boolean;
  mobileSidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setMobileSidebarOpen: (open: boolean) => void;

  // Mission & Vessel context
  missionName: string;
  vesselName: string;
  vesselClass: string;
  operatorName: string;
  operatorRole: string;

  // System status
  systemOnline: boolean;
  cloudConnected: boolean;
  edgeConnected: boolean;
  lastSyncTime: string;

  // Notifications
  notifications: AppNotification[];
  unreadCount: () => number;
  markAllNotificationsRead: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  sidebarCollapsed: true, // Default collapsed as requested
  mobileSidebarOpen: false,
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
  setMobileSidebarOpen: (open) => set({ mobileSidebarOpen: open }),

  missionName: 'Antarctic Research Mission — 2026',
  vesselName: 'Polar Research Vessel',
  vesselClass: 'PC4 Ice-Class Expedition',
  operatorName: 'Dr. R. Nair',
  operatorRole: 'Chief Scientific Navigator',

  systemOnline: true,
  cloudConnected: true,
  edgeConnected: true,
  lastSyncTime: '2 min ago',

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
