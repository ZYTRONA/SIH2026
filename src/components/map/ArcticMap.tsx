import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface ArcticMapProps {
  concentrationLayer?: boolean;
  className?: string;
}

// Sea-ice concentration color scale matching the screenshot
function getSicColor(value: number): string {
  if (value <= 0) return 'rgba(10, 25, 50, 0.0)';
  if (value <= 10) return 'rgba(200, 225, 245, 0.45)';
  if (value <= 20) return 'rgba(170, 215, 245, 0.5)';
  if (value <= 30) return 'rgba(140, 205, 240, 0.55)';
  if (value <= 40) return 'rgba(110, 200, 235, 0.6)';
  if (value <= 50) return 'rgba(90, 210, 210, 0.6)';
  if (value <= 60) return 'rgba(120, 215, 170, 0.6)';
  if (value <= 70) return 'rgba(175, 225, 120, 0.65)';
  if (value <= 80) return 'rgba(235, 195, 70, 0.7)';
  if (value <= 90) return 'rgba(245, 145, 45, 0.75)';
  return 'rgba(225, 65, 35, 0.8)';
}

// Generate organic sea-ice polygons centered on the North Pole
function generateSeaIcePolygons(): { rings: L.LatLngExpression[][]; value: number }[] {
  const result: { rings: L.LatLngExpression[][]; value: number }[] = [];
  const centerLat = 82;
  const centerLng = 10;

  // Each ring: { radiusDegrees, concentration value }
  // Outer rings = low concentration (blue), inner = high (red)
  const rings = [
    { r: 20, value: 10 },
    { r: 17.5, value: 20 },
    { r: 15.5, value: 30 },
    { r: 13.5, value: 40 },
    { r: 11.5, value: 50 },
    { r: 9.5, value: 60 },
    { r: 7.5, value: 70 },
    { r: 5.5, value: 80 },
    { r: 3.8, value: 90 },
    { r: 2, value: 95 },
  ];

  rings.forEach(({ r, value }) => {
    const points: L.LatLngExpression[] = [];
    const segments = 90;

    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * 2 * Math.PI;

      // Organic variation for natural ice edge look
      const noise1 = Math.sin(angle * 3 + value * 0.15) * 0.12;
      const noise2 = Math.cos(angle * 5 + value * 0.08) * 0.06;
      const noise3 = Math.sin(angle * 7 + 1.5) * 0.04;
      const variation = 1 + noise1 + noise2 + noise3;

      const latRadius = r * variation;
      // Compensate for longitude convergence at high latitudes
      const lngRadius = r * variation / Math.cos((centerLat * Math.PI) / 180);

      const lat = centerLat + latRadius * Math.cos(angle);
      const lng = centerLng + lngRadius * Math.sin(angle);

      points.push([lat, lng]);
    }

    result.push({ rings: [points], value });
  });

  return result;
}

export const ArcticMap: React.FC<ArcticMapProps> = ({
  concentrationLayer = true,
  className = '',
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      center: [78, 10],
      zoom: 3,
      zoomControl: false,
      attributionControl: true,
      minZoom: 2,
      maxZoom: 8,
      maxBoundsViscosity: 0.8,
      worldCopyJump: false,
    });

    // OpenStreetMap base tiles (free, no API key required)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      subdomains: 'abc',
      maxZoom: 19,
    }).addTo(map);

    // OpenSeaMap nautical seamarks tile layer (openseamap.org / openseamap.com)
    L.tileLayer('https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png', {
      attribution: 'Nautical data &copy; <a href="https://www.openseamap.org">OpenSeaMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);

    // Sea-ice concentration heatmap overlay
    if (concentrationLayer) {
      const polygons = generateSeaIcePolygons();
      polygons.forEach(({ rings, value }) => {
        L.polygon(rings, {
          color: 'transparent',
          fillColor: getSicColor(value),
          fillOpacity: 1,
          weight: 0,
          interactive: false,
        }).addTo(map);
      });
    }

    // Scale bar
    L.control.scale({ imperial: false, position: 'bottomleft' }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [concentrationLayer]);

  return (
    <div className={`relative ${className}`}>
      <div
        ref={mapRef}
        className="w-full h-full rounded-xl"
        style={{ minHeight: '460px' }}
      />
    </div>
  );
};
