export type DealCategory =
  | 'pilates'
  | 'yoga'
  | 'barre'
  | 'dance_fitness'
  | 'mobility'
  | 'massage'
  | 'facial'
  | 'body_treatment'
  | 'acupuncture'
  | 'tea_ritual';

export type DealTypeTag =
  | 'first_time'
  | 'seasonal'
  | 'limited_time'
  | 'intro_package';

export interface DealRecord {
  id: string;
  title: string;
  venue_name: string;
  lat: number;
  lng: number;
  categories: DealCategory[];
  deal_types: DealTypeTag[];
  headline: string;
  terms_summary: string;
  valid_through?: string;
  source_url: string;
}

export interface DealWithDistance extends DealRecord {
  distanceMiles: number | null;
}
