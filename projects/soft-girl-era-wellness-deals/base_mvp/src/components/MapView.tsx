import { useEffect } from 'react';
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import type { DealWithDistance } from '../types/deal';
import { applyLeafletDefaultIcon } from '../lib/leafletDefaultIcon';

const OSM_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';

function MapController({
  center,
  zoom,
  animate,
}: {
  center: [number, number];
  zoom: number;
  animate: boolean;
}) {
  const map = useMap();
  useEffect(() => {
    if (animate) {
      map.flyTo(center, zoom, { duration: 0.5 });
    } else {
      map.setView(center, zoom, { animate: false });
    }
  }, [animate, center[0], center[1], map, zoom]);
  return null;
}

function MapInvalidate({ visible }: { visible: boolean }) {
  const map = useMap();
  useEffect(() => {
    if (!visible) return;
    const id = window.setTimeout(() => {
      map.invalidateSize();
    }, 0);
    return () => window.clearTimeout(id);
  }, [map, visible]);
  return null;
}

export interface MapViewProps {
  deals: DealWithDistance[];
  center: [number, number];
  zoom: number;
  selectedId: string | null;
  onSelectDeal: (id: string) => void;
  reduceMotion: boolean;
  /** When false, the map is not visible (e.g. list tab); invalidate when shown. */
  visible: boolean;
}

export function MapView({
  deals,
  center,
  zoom,
  selectedId,
  onSelectDeal,
  reduceMotion,
  visible,
}: MapViewProps) {
  useEffect(() => {
    applyLeafletDefaultIcon();
  }, []);

  const animate = !reduceMotion;

  return (
    <div className="map-view" role="application" aria-label="Deal locations map">
      <MapContainer
        center={center}
        zoom={zoom}
        className="map-view__leaflet"
        scrollWheelZoom
        zoomControl
        zoomAnimation={animate}
        fadeAnimation={animate}
        markerZoomAnimation={animate}
      >
        <TileLayer attribution={OSM_ATTRIBUTION} url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapController center={center} zoom={zoom} animate={animate} />
        <MapInvalidate visible={visible} />
        {deals.map((d) => (
          <Marker
            key={d.id}
            position={[d.lat, d.lng]}
            zIndexOffset={selectedId === d.id ? 500 : 0}
            title={d.venue_name}
            eventHandlers={{
              click: () => onSelectDeal(d.id),
            }}
          />
        ))}
      </MapContainer>
    </div>
  );
}
