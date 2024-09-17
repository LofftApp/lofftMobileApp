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

type ApplicationShowScreenProp = {
  navigation: FavoriteScreenNavigationProp;
  route: {params: {advert: Advert}};
};

type ApplyForFlatScreenProp = {
  navigation: SearchScreenNavigationProp;
  route: {params: {id: number | null}};
};

export type {
  ApplicationShowScreenProp,
  FlatFindScreenProp,
  FlatShowScreenProp,
  ApplyForFlatScreenProp,
};
