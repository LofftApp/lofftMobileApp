import {AdvertStatus} from 'reduxFeatures/adverts/types';

export const advertStatusIndex = (status: AdvertStatus) => {
  return [
    AdvertStatus.Open,
    AdvertStatus.Review,
    AdvertStatus.Viewing,
    AdvertStatus.PreOffer,
    AdvertStatus.Offered,
    AdvertStatus.Closed,
  ].indexOf(status ?? AdvertStatus.Open);
};
