import type {Advert} from 'reduxFeatures/adverts/types';
import type {
  FavoriteScreenNavigationProp,
  SearchScreenNavigationProp,
  SearchStackParamsList,
} from '../../../../navigationStacks/types';
import type {RouteProp} from '@react-navigation/native';

type FlatFindScreenProp = {
  navigation: SearchScreenNavigationProp;
};

type FlatShowScreenProp = {
  navigation: SearchScreenNavigationProp;
  route: {params: {advertId: number | null}}
};

type ApplicationIndexScreenProp = {
  navigation: FavoriteScreenNavigationProp;
};

type ApplicationShowScreenProp = {
  navigation: FavoriteScreenNavigationProp;
  route: {params: {advertId: number}};
};

type ApplyForFlatScreenProp = {
  navigation: SearchScreenNavigationProp;
};

export type {
  ApplicationIndexScreenProp,
  ApplicationShowScreenProp,
  FlatFindScreenProp,
  FlatShowScreenProp,
  ApplyForFlatScreenProp,
};
