import {Advert} from 'reduxFeatures/adverts/types';
import type {
  FavoriteScreenNavigationProp,
  SearchScreenNavigationProp,
} from '../types';

type FlatListComponentProps = {
  adverts: Advert[];
  navigation: FavoriteScreenNavigationProp;
  isLessor: boolean;
};

type FlatListSubScreenProps = {
  navigation: SearchScreenNavigationProp;
};

export type {FlatListComponentProps, FlatListSubScreenProps};
