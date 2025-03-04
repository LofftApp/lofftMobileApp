import {AdvertStatus} from 'reduxFeatures/adverts/types';
import {
  Applications,
  ApplicationStatus,
} from 'reduxFeatures/applications/types';

export const applicationPartition = (applications?: Applications) => {
  if (!applications) {
    return [[], []];
  }
  const active = applications.applications
    ?.filter(
      app =>
        app.status === ApplicationStatus.Active &&
        app.advert?.status !== AdvertStatus.Closed &&
        app.advert?.status !== AdvertStatus.Offered,
    )
    .sort((a, b) => (b.advert?.matchScore ?? 0) - (a.advert?.matchScore ?? 0));

  const inactive = applications.applications
    ?.filter(
      app =>
        app.status !== ApplicationStatus.Active ||
        app.advert?.status === AdvertStatus.Closed ||
        app.advert?.status === AdvertStatus.Offered,
    )
    .sort((a, b) => (b.advert?.matchScore ?? 0) - (a.advert?.matchScore ?? 0));

  return [active, inactive];
};
