import {Advert} from 'reduxFeatures/adverts/types';

type FlatInfoContainerProps = {
  advert: Advert;
  button: boolean;
  navigation: any;
  characteristicsTags?: string[];
  featuresTags?: string[];
};

export type {FlatInfoContainerProps};
