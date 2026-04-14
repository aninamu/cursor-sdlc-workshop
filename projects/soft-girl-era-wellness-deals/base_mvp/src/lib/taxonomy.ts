import type { DealCategory, DealTypeTag } from '../types/deal';

export const CATEGORY_LABELS: Record<DealCategory, string> = {
  pilates: 'Pilates',
  yoga: 'Yoga',
  barre: 'Barre',
  dance_fitness: 'Dance / fitness',
  mobility: 'Stretch / mobility',
  massage: 'Massage',
  facial: 'Facials',
  body_treatment: 'Body treatments',
  acupuncture: 'Acupuncture',
  tea_ritual: 'Tea / ritual',
};

export const DEAL_TYPE_LABELS: Record<DealTypeTag, string> = {
  first_time: 'First-time / new client',
  seasonal: 'Seasonal / holiday',
  limited_time: 'Limited-time',
  intro_package: 'Intro pack / trial',
};

export const ALL_CATEGORIES: DealCategory[] = [
  'pilates',
  'yoga',
  'barre',
  'dance_fitness',
  'mobility',
  'massage',
  'facial',
  'body_treatment',
  'acupuncture',
  'tea_ritual',
];

export const ALL_DEAL_TYPES: DealTypeTag[] = [
  'first_time',
  'seasonal',
  'limited_time',
  'intro_package',
];
