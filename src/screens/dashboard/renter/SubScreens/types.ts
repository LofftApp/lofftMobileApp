import {Advert} from 'reduxFeatures/adverts/types';
import type {FavoriteScreenNavigationProp} from '../types';

type FlatListComponentProps = {
  adverts: Advert[];
  navigation: FavoriteScreenNavigationProp;
  isLessor: boolean;
};

export type {FlatListComponentProps};
