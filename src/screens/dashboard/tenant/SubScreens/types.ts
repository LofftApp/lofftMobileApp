import {Advert, Favorite, Favorites} from 'reduxFeatures/adverts/types';
import {Application} from 'reduxFeatures/applications/types';

type ListFlatApplicationComponentProps = {
  applications?: Application[];
  adverts?: Advert[];
  isLoading: boolean;
  isError: boolean;
};

type FlatListSubScreenProps = {
  adverts: Advert[];
  isError: boolean;
  isLoading: boolean;
  toggleModal: () => void;
};

type FavoritesSubScreenProps = {
  favorites: Favorite[];
  isError: boolean;
  isLoading: boolean;
};

export type {
  ListFlatApplicationComponentProps,
  FlatListSubScreenProps,
  FavoritesSubScreenProps,
};
