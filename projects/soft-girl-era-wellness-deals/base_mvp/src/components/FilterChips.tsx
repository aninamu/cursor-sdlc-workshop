import type { DealCategory, DealTypeTag } from '../types/deal';
import { ALL_CATEGORIES, ALL_DEAL_TYPES, CATEGORY_LABELS, DEAL_TYPE_LABELS } from '../lib/taxonomy';
import type { FilterState } from '../lib/filters';

export interface FilterChipsProps {
  filters: FilterState;
  onChange: (next: FilterState) => void;
}

function toggle<T>(set: Set<T>, value: T): Set<T> {
  const next = new Set(set);
  if (next.has(value)) next.delete(value);
  else next.add(value);
  return next;
}

export function FilterChips({ filters, onChange }: FilterChipsProps) {
  return (
    <div className="filter-chips">
      <fieldset className="filter-chips__group">
        <legend>Categories</legend>
        <div className="filter-chips__row" role="group" aria-label="Filter by category">
          {ALL_CATEGORIES.map((c) => {
            const active = filters.categories.has(c);
            return (
              <button
                key={c}
                type="button"
                className={`chip ${active ? 'chip--active' : ''}`}
                aria-pressed={active}
                onClick={() =>
                  onChange({
                    ...filters,
                    categories: toggle(filters.categories, c as DealCategory),
                  })
                }
              >
                {CATEGORY_LABELS[c]}
              </button>
            );
          })}
        </div>
      </fieldset>
      <fieldset className="filter-chips__group">
        <legend>Deal types</legend>
        <div className="filter-chips__row" role="group" aria-label="Filter by deal type">
          {ALL_DEAL_TYPES.map((t) => {
            const active = filters.dealTypes.has(t);
            return (
              <button
                key={t}
                type="button"
                className={`chip chip--deal-type ${active ? 'chip--active' : ''}`}
                aria-pressed={active}
                onClick={() =>
                  onChange({
                    ...filters,
                    dealTypes: toggle(filters.dealTypes, t as DealTypeTag),
                  })
                }
              >
                {DEAL_TYPE_LABELS[t]}
              </button>
            );
          })}
        </div>
      </fieldset>
      <button
        type="button"
        className="filter-chips__clear"
        onClick={() =>
          onChange({ categories: new Set(), dealTypes: new Set() })
        }
      >
        Clear filters
      </button>
    </div>
  );
}
