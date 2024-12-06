import {Application} from 'reduxFeatures/applications/types';

export const applicationPartition = (applications: Application[]) => {
  const active = applications
    .filter(
      app =>
        app.status === 'active' &&
        app.advert?.status !== 'closed' &&
        app.advert?.status !== 'offered',
    )
    .sort((a, b) => (b.advert?.matchScore ?? 0) - (a.advert?.matchScore ?? 0));

  const inactive = applications
    .filter(
      app =>
        app.status !== 'active' ||
        app.advert?.status === 'closed' ||
        app.advert?.status === 'offered',
    )
    .sort((a, b) => (b.advert?.matchScore ?? 0) - (a.advert?.matchScore ?? 0));

  return [active, inactive];
};
