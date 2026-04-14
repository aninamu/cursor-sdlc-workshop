import type { DealWithDistance } from '../types/deal';

export interface DealListProps {
  deals: DealWithDistance[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  listLabelId: string;
}

export function DealList({
  deals,
  selectedId,
  onSelect,
  listLabelId,
}: DealListProps) {
  if (deals.length === 0) {
    return (
      <p className="deal-list__empty" role="status">
        No deals match these filters. Try clearing a filter or widening the radius.
      </p>
    );
  }

  return (
    <ul
      className="deal-list"
      role="list"
      aria-labelledby={listLabelId}
    >
      {deals.map((d) => {
        const selected = d.id === selectedId;
        return (
          <li key={d.id} className="deal-list__item">
            <button
              type="button"
              className={`deal-list__button ${selected ? 'deal-list__button--selected' : ''}`}
              aria-current={selected ? 'true' : undefined}
              onClick={() => onSelect(d.id)}
            >
              <span className="deal-list__venue">{d.venue_name}</span>
              <span className="deal-list__headline">{d.headline}</span>
              <span className="deal-list__distance">
                {d.distanceMiles == null
                  ? 'Distance after you set location'
                  : `${d.distanceMiles < 10 ? d.distanceMiles.toFixed(1) : Math.round(d.distanceMiles)} mi`}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
