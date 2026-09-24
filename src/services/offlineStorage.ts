// Offline Storage Engine for POLARIS AI (IndexedDB + LocalStorage Cryospheric Cache)

export interface OfflineSyncItem {
  id: string;
  type: 'route_plan' | 'waypoint_edit' | 'hazard_report' | 'vessel_telemetry';
  payload: any;
  timestamp: number;
  synced: boolean;
}

const DB_NAME = 'polaris_edge_db';
const DB_VERSION = 1;
const STORES = ['maps_cache', 'sea_ice_grids', 'icebergs_telemetry', 'routes_cache', 'sync_queue'];

class OfflineStorageService {
  private db: IDBDatabase | null = null;
  private isInitialized = false;

  async init(): Promise<boolean> {
    if (this.isInitialized && this.db) return true;
    if (typeof window === 'undefined' || !window.indexedDB) return false;

    return new Promise((resolve) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        STORES.forEach((storeName) => {
          if (!db.objectStoreNames.contains(storeName)) {
            db.createObjectStore(storeName, { keyPath: 'id' });
          }
        });
      };

      request.onsuccess = (event) => {
        this.db = (event.target as IDBOpenDBRequest).result;
        this.isInitialized = true;
        resolve(true);
      };

      request.onerror = () => {
        console.warn('IndexedDB unavailable, falling back to LocalStorage');
        resolve(false);
      };
    });
  }

  async setItem(storeName: string, id: string, data: any): Promise<void> {
    await this.init();
    if (this.db) {
      return new Promise((resolve, reject) => {
        const transaction = this.db!.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);
        const req = store.put({ id, data, updatedAt: Date.now() });
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
      });
    } else {
      localStorage.setItem(`polaris_${storeName}_${id}`, JSON.stringify(data));
    }
  }

  async getItem<T = any>(storeName: string, id: string): Promise<T | null> {
    await this.init();
    if (this.db) {
      return new Promise((resolve) => {
        const transaction = this.db!.transaction(storeName, 'readonly');
        const store = transaction.objectStore(storeName);
        const req = store.get(id);
        req.onsuccess = () => {
          resolve(req.result ? req.result.data : null);
        };
        req.onerror = () => resolve(null);
      });
    } else {
      const item = localStorage.getItem(`polaris_${storeName}_${id}`);
      return item ? JSON.parse(item) : null;
    }
  }

  async addToSyncQueue(item: Omit<OfflineSyncItem, 'id' | 'timestamp' | 'synced'>): Promise<string> {
    const id = `sync_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const syncItem: OfflineSyncItem = {
      ...item,
      id,
      timestamp: Date.now(),
      synced: false,
    };
    await this.setItem('sync_queue', id, syncItem);
    return id;
  }

  async getSyncQueue(): Promise<OfflineSyncItem[]> {
    await this.init();
    if (this.db) {
      return new Promise((resolve) => {
        const transaction = this.db!.transaction('sync_queue', 'readonly');
        const store = transaction.objectStore('sync_queue');
        const req = store.getAll();
        req.onsuccess = () => {
          const items = (req.result || []).map((r: any) => r.data as OfflineSyncItem);
          resolve(items);
        };
        req.onerror = () => resolve([]);
      });
    } else {
      const queue: OfflineSyncItem[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('polaris_sync_queue_')) {
          queue.push(JSON.parse(localStorage.getItem(key)!));
        }
      }
      return queue;
    }
  }

  async clearSyncQueue(): Promise<void> {
    await this.init();
    if (this.db) {
      const transaction = this.db!.transaction('sync_queue', 'readwrite');
      transaction.objectStore('sync_queue').clear();
    } else {
      Object.keys(localStorage)
        .filter((k) => k.startsWith('polaris_sync_queue_'))
        .forEach((k) => localStorage.removeItem(k));
    }
  }

  getStorageStats() {
    let totalBytes = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key) && key.startsWith('polaris_')) {
        totalBytes += (localStorage[key].length + key.length) * 2;
      }
    }
    return {
      usedKb: (totalBytes / 1024).toFixed(1),
      lastSync: new Date().toLocaleTimeString(),
    };
  }
}

export const offlineStorage = new OfflineStorageService();
