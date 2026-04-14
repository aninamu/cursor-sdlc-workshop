export interface LocationBarProps {
  placeQuery: string;
  onPlaceQueryChange: (q: string) => void;
  onSearchPlace: () => void;
  onFindNearMe: () => void;
  geoStatus: 'idle' | 'loading' | 'error' | 'denied';
  searchStatus: 'idle' | 'loading' | 'error';
  radiusMiles: number;
  onRadiusChange: (miles: number) => void;
}

const RADIUS_OPTIONS = [5, 10, 25] as const;

export function LocationBar({
  placeQuery,
  onPlaceQueryChange,
  onSearchPlace,
  onFindNearMe,
  geoStatus,
  searchStatus,
  radiusMiles,
  onRadiusChange,
}: LocationBarProps) {
  const geoBusy = geoStatus === 'loading';
  const searchBusy = searchStatus === 'loading';

  return (
    <div className="location-bar">
      <div className="location-bar__row">
        <button
          type="button"
          className="btn btn--primary"
          onClick={onFindNearMe}
          disabled={geoBusy}
        >
          {geoBusy ? 'Finding…' : 'Find deals near me'}
        </button>
        {geoStatus === 'denied' ? (
          <p className="location-bar__hint" role="status">
            Location blocked — search for a neighborhood or city below.
          </p>
        ) : null}
        {geoStatus === 'error' ? (
          <p className="location-bar__hint location-bar__hint--warn" role="status">
            Could not read your location. Try search instead.
          </p>
        ) : null}
      </div>
      <form
        className="location-bar__search"
        onSubmit={(e) => {
          e.preventDefault();
          onSearchPlace();
        }}
      >
        <label htmlFor="place-search" className="visually-hidden">
          Search city, neighborhood, or address
        </label>
        <input
          id="place-search"
          type="search"
          className="location-bar__input"
          placeholder="Search neighborhood or city"
          value={placeQuery}
          onChange={(e) => onPlaceQueryChange(e.target.value)}
          autoComplete="street-address"
        />
        <button type="submit" className="btn" disabled={searchBusy}>
          {searchBusy ? 'Searching…' : 'Search place'}
        </button>
      </form>
      {searchStatus === 'error' ? (
        <p className="location-bar__hint location-bar__hint--warn" role="status">
          No results for that search. Try a broader place name.
        </p>
      ) : null}
      <div className="location-bar__radius">
        <span id="radius-label" className="location-bar__radius-label">
          Radius
        </span>
        <div
          className="location-bar__radius-options"
          role="group"
          aria-labelledby="radius-label"
        >
          {RADIUS_OPTIONS.map((m) => (
            <button
              key={m}
              type="button"
              className={`btn btn--small ${radiusMiles === m ? 'btn--active' : ''}`}
              aria-pressed={radiusMiles === m}
              onClick={() => onRadiusChange(m)}
            >
              {m} mi
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
