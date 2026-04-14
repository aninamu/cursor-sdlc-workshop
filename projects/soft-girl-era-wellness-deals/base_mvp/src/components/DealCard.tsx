import type { DealWithDistance } from '../types/deal';
import { CATEGORY_LABELS, DEAL_TYPE_LABELS } from '../lib/taxonomy';

function formatDistance(miles: number | null): string {
  if (miles == null) return '—';
  if (miles < 10) return `${miles.toFixed(1)} mi`;
  return `${Math.round(miles)} mi`;
}

function formatValidThrough(raw?: string): string | null {
  if (!raw) return null;
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return `Through ${raw}`;
  return `Through ${d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}`;
}

export interface DealCardProps {
  deal: DealWithDistance;
  variant?: 'full' | 'compact';
  idPrefix?: string;
}

export function DealCard({ deal, variant = 'full', idPrefix = 'deal' }: DealCardProps) {
  const valid = formatValidThrough(deal.valid_through);
  const headingId = `${idPrefix}-${deal.id}-title`;

  return (
    <article
      className={`deal-card deal-card--${variant}`}
      aria-labelledby={headingId}
    >
      <div className="deal-card__meta">
        <span className="deal-card__venue">{deal.venue_name}</span>
        <span className="deal-card__distance" aria-label="Distance from your location">
          {formatDistance(deal.distanceMiles)}
        </span>
      </div>
      <h3 className="deal-card__title" id={headingId}>
        {deal.headline}
      </h3>
      <p className="deal-card__terms">{deal.terms_summary}</p>
      {valid ? (
        <p className="deal-card__valid">{valid}</p>
      ) : null}
      <div className="deal-card__tags" aria-label="Categories">
        {deal.categories.map((c) => (
          <span key={c} className="chip chip--static">
            {CATEGORY_LABELS[c]}
          </span>
        ))}
      </div>
      <div className="deal-card__tags" aria-label="Deal types">
        {deal.deal_types.map((t) => (
          <span key={t} className="chip chip--deal-type">
            {DEAL_TYPE_LABELS[t]}
          </span>
        ))}
      </div>
      <a
        className="deal-card__cta"
        href={deal.source_url}
        target="_blank"
        rel="noopener noreferrer"
      >
        View venue / offer
      </a>
    </article>
  );
}
