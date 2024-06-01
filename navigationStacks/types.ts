import {Advert} from 'reduxFeatures/adverts/types';

type RootTabParamsList = {
  search: undefined;
  favorite: undefined;
  alerts: undefined;
  user: undefined;
  admin: undefined;
};

type FavoriteStackParamsList = {
  favorite: undefined;
};

type SearchStackParamsList = {
  search: undefined;
  flatOverview: undefined;
  flatShow: {advert: Advert};
  applyforflat: {advert: Advert};
  applicationshow: {advert: Advert};
};

export type {RootTabParamsList, FavoriteStackParamsList, SearchStackParamsList};
