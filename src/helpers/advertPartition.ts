import type {Advert} from 'reduxFeatures/adverts/types';

export const advertPartition = (adverts: Advert[]) => {
  const active = adverts
    .filter(advert => advert.status === 'open')
    .sort((a, b) => (b.matchScore ?? 0) - (a.matchScore ?? 0));
  const inactive = adverts
    .filter(advert => advert.status !== 'open')
    .sort((a, b) => (b.matchScore ?? 0) - (a.matchScore ?? 0));
  return [active, inactive];
};
