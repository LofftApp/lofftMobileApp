import type {Advert} from 'reduxFeatures/adverts/types';

interface AdvertWithCoordinates extends Advert {
  coordinates: number[];
}

export type {AdvertWithCoordinates};
