export interface GeocodeResult {
  lat: number;
  lng: number;
  displayName: string;
}

/**
 * Resolves a place query to coordinates. In dev, requests go through the Vite
 * proxy so a descriptive User-Agent is attached server-side (OSM policy).
 */
export async function geocodePlace(query: string): Promise<GeocodeResult | null> {
  const trimmed = query.trim();
  if (!trimmed) return null;

  const params = new URLSearchParams({
    format: 'json',
    limit: '1',
    q: trimmed,
  });

  const url = import.meta.env.DEV
    ? `/api/nominatim?${params}`
    : `https://nominatim.openstreetmap.org/search?${params}`;

  const res = await fetch(url, {
    headers: { Accept: 'application/json' },
  });

  if (!res.ok) return null;

  const data = (await res.json()) as Array<{
    lat: string;
    lon: string;
    display_name: string;
  }>;

  const first = data[0];
  if (!first) return null;

  return {
    lat: parseFloat(first.lat),
    lng: parseFloat(first.lon),
    displayName: first.display_name,
  };
}
