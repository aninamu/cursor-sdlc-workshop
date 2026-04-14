import { useCallback, useEffect, useMemo, useState } from 'react';
import rawDeals from './data/deals.json';
import { DealCard } from './components/DealCard';
import { DealList } from './components/DealList';
import { FilterChips } from './components/FilterChips';
import { LocationBar } from './components/LocationBar';
import { MapView } from './components/MapView';
import { PrivacyNote } from './components/PrivacyNote';
import {
  attachDistances,
  filterDeals,
  sortByDistance,
  withinRadius,
  type FilterState,
} from './lib/filters';
import { milesBetween } from './lib/distance';
import { geocodePlace } from './lib/geocode';
import type { DealRecord, DealWithDistance } from './types/deal';

const SEED_DEALS = rawDeals as DealRecord[];

const DEFAULT_CENTER: [number, number] = [34.0522, -118.2437];
const DEFAULT_ZOOM = 10;
const FOCUS_ZOOM = 14;

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

export default function App() {
  const reduceMotion = usePrefersReducedMotion();

  const [origin, setOrigin] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [mapCenter, setMapCenter] = useState<[number, number]>(DEFAULT_CENTER);
  const [mapZoom, setMapZoom] = useState(DEFAULT_ZOOM);

  const [filters, setFilters] = useState<FilterState>({
    categories: new Set(),
    dealTypes: new Set(),
  });

  const [selectedDealId, setSelectedDealId] = useState<string | null>(null);
  const [placeQuery, setPlaceQuery] = useState('');
  const [radiusMiles, setRadiusMiles] = useState(10);

  const [geoStatus, setGeoStatus] = useState<
    'idle' | 'loading' | 'error' | 'denied'
  >('idle');
  const [searchStatus, setSearchStatus] = useState<
    'idle' | 'loading' | 'error'
  >('idle');

  const [activePanel, setActivePanel] = useState<'map' | 'list'>('map');

  const withDistances: DealWithDistance[] = useMemo(
    () =>
      attachDistances(SEED_DEALS, origin, (ua, ul, la, ln) =>
        milesBetween(ua, ul, la, ln)
      ),
    [origin]
  );

  const filtered = useMemo(() => {
    const byChip = filterDeals(withDistances, filters);
    return sortByDistance(
      withinRadius(byChip, radiusMiles, origin != null)
    );
  }, [filters, origin, radiusMiles, withDistances]);

  const selectedDeal = useMemo(
    () => filtered.find((d) => d.id === selectedDealId) ?? null,
    [filtered, selectedDealId]
  );

  useEffect(() => {
    if (
      selectedDealId != null &&
      !filtered.some((d) => d.id === selectedDealId)
    ) {
      setSelectedDealId(null);
    }
  }, [filtered, selectedDealId]);

  const handleFindNearMe = useCallback(() => {
    setGeoStatus('loading');
    if (!navigator.geolocation) {
      setGeoStatus('error');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setOrigin({ lat, lng });
        setMapCenter([lat, lng]);
        setMapZoom(12);
        setGeoStatus('idle');
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          setGeoStatus('denied');
        } else {
          setGeoStatus('error');
        }
      },
      { enableHighAccuracy: false, timeout: 12_000, maximumAge: 60_000 }
    );
  }, []);

  const handleSearchPlace = useCallback(async () => {
    const q = placeQuery.trim();
    if (!q) {
      setSearchStatus('error');
      return;
    }
    setSearchStatus('loading');
    try {
      const result = await geocodePlace(q);
      if (!result) {
        setSearchStatus('error');
        return;
      }
      setOrigin({ lat: result.lat, lng: result.lng });
      setMapCenter([result.lat, result.lng]);
      setMapZoom(12);
      setSearchStatus('idle');
    } catch {
      setSearchStatus('error');
    }
  }, [placeQuery]);

  const selectDeal = useCallback(
    (id: string) => {
      setSelectedDealId(id);
      const deal = withDistances.find((d) => d.id === id);
      if (deal) {
        setMapCenter([deal.lat, deal.lng]);
        setMapZoom(FOCUS_ZOOM);
      }
    },
    [withDistances]
  );

  const onSelectFromMap = useCallback((id: string) => {
    setSelectedDealId(id);
  }, []);

  const listHeadingId = 'deal-list-heading';

  return (
    <div className="app">
      <header className="app__header">
        <p className="app__eyebrow">Soft girl era</p>
        <h1 className="app__title">Wellness deals near you</h1>
        <p className="app__lede">
          Calm, intentional movement and care — with intro offers and seasonal
          picks when you need a gentle reset.
        </p>
      </header>

      <LocationBar
        placeQuery={placeQuery}
        onPlaceQueryChange={setPlaceQuery}
        onSearchPlace={handleSearchPlace}
        onFindNearMe={handleFindNearMe}
        geoStatus={geoStatus}
        searchStatus={searchStatus}
        radiusMiles={radiusMiles}
        onRadiusChange={setRadiusMiles}
      />

      <FilterChips filters={filters} onChange={setFilters} />

      <p className="app__origin-hint" role="status">
        {origin == null
          ? 'Set your location to see distances and filter by radius.'
          : `Showing deals within ${radiusMiles} mi of your chosen area.`}
      </p>

      <div className="app__tabs" role="tablist" aria-label="Map or list view">
        <button
          type="button"
          role="tab"
          aria-selected={activePanel === 'map'}
          aria-controls="map-panel"
          id="tab-map"
          className={`app__tab ${activePanel === 'map' ? 'app__tab--active' : ''}`}
          onClick={() => setActivePanel('map')}
        >
          Map
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activePanel === 'list'}
          aria-controls="list-panel"
          id="tab-list"
          className={`app__tab ${activePanel === 'list' ? 'app__tab--active' : ''}`}
          onClick={() => setActivePanel('list')}
        >
          List
        </button>
      </div>

      <section
        id="map-panel"
        role="tabpanel"
        aria-labelledby="tab-map"
        hidden={activePanel !== 'map'}
        className="app__panel"
      >
        <MapView
          deals={filtered}
          center={mapCenter}
          zoom={mapZoom}
          selectedId={selectedDealId}
          onSelectDeal={onSelectFromMap}
          reduceMotion={reduceMotion}
          visible={activePanel === 'map'}
        />
      </section>

      <section
        id="list-panel"
        role="tabpanel"
        aria-labelledby="tab-list"
        hidden={activePanel !== 'list'}
        className="app__panel"
      >
        <h2 id={listHeadingId} className="visually-hidden">
          Deals by distance
        </h2>
        <DealList
          deals={filtered}
          selectedId={selectedDealId}
          onSelect={selectDeal}
          listLabelId={listHeadingId}
        />
      </section>

      {selectedDeal ? (
        <section className="app__detail" aria-live="polite">
          <h2 className="app__detail-heading">Selected offer</h2>
          <DealCard deal={selectedDeal} idPrefix="selected" />
        </section>
      ) : null}

      <PrivacyNote />
    </div>
  );
}
