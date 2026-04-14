import type { DealCategory, DealRecord, DealTypeTag, DealWithDistance } from '../types/deal';

export interface FilterState {
  categories: Set<DealCategory>;
  dealTypes: Set<DealTypeTag>;
}

export function filterDeals(
  deals: DealWithDistance[],
  filters: FilterState
): DealWithDistance[] {
  return deals.filter((d) => {
    const catOk =
      filters.categories.size === 0 ||
      d.categories.some((c) => filters.categories.has(c));
    const typeOk =
      filters.dealTypes.size === 0 ||
      d.deal_types.some((t) => filters.dealTypes.has(t));
    return catOk && typeOk;
  });
}

export function withinRadius(
  deals: DealWithDistance[],
  radiusMiles: number,
  hasOrigin: boolean
): DealWithDistance[] {
  if (!hasOrigin) return deals;
  return deals.filter(
    (d) => d.distanceMiles != null && d.distanceMiles <= radiusMiles
  );
}

export function attachDistances(
  deals: DealRecord[],
  origin: { lat: number; lng: number } | null,
  distanceFn: (
    userLat: number,
    userLng: number,
    lat: number,
    lng: number
  ) => number
): DealWithDistance[] {
  return deals.map((d) => ({
    ...d,
    distanceMiles:
      origin == null
        ? null
        : distanceFn(origin.lat, origin.lng, d.lat, d.lng),
  }));
}

export function sortByDistance(deals: DealWithDistance[]): DealWithDistance[] {
  return [...deals].sort((a, b) => {
    if (a.distanceMiles == null && b.distanceMiles == null) return 0;
    if (a.distanceMiles == null) return 1;
    if (b.distanceMiles == null) return -1;
    return a.distanceMiles - b.distanceMiles;
  });
}
