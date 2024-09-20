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
  route: RouteProp<SearchStackParamsList, 'flatShow'>;
};

type ApplicationIndexScreenProp = {
  navigation: FavoriteScreenNavigationProp;
};

type ApplicationShowScreenProp = {
  navigation: FavoriteScreenNavigationProp;
  route: {params: {advert: Advert}};
};

type ApplyForFlatScreenProp = {
  navigation: SearchScreenNavigationProp;
  route: {params: {id: number | null}};
};

export type {
  ApplicationIndexScreenProp,
  ApplicationShowScreenProp,
  FlatFindScreenProp,
  FlatShowScreenProp,
  ApplyForFlatScreenProp,
};
