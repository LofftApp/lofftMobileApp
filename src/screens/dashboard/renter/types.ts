import type {Advert} from 'reduxFeatures/adverts/types';
import type {RootTabParamsList} from '../../../../navigationStacks/types';
import type {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import type {CompositeNavigationProp} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';

type FavoriteStackParamsList = {
  favorite: undefined;
  applicationshow: {advert: Advert; active?: boolean};
};

type SearchStackParamsList = {
  search: undefined;
};

type FavoriteScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<RootTabParamsList, 'favorite'>,
  StackNavigationProp<FavoriteStackParamsList>
>;

type SearchScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<RootTabParamsList, 'search'>,
  StackNavigationProp<SearchStackParamsList>
>;

type FlatFindScreenProp = {
  navigation: SearchScreenNavigationProp;
};

type ApplicationIndexScreenProp = {
  navigation: FavoriteScreenNavigationProp;
};

type ApplicationShowScreenProp = {
  navigation: FavoriteScreenNavigationProp;
  route: {params: {advert: Advert}};
};

export type {
  FavoriteScreenNavigationProp,
  ApplicationIndexScreenProp,
  ApplicationShowScreenProp,
  FlatFindScreenProp,
  SearchScreenNavigationProp,
};
