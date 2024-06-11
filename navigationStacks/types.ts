import type {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import type {CompositeNavigationProp} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import type {Advert} from 'reduxFeatures/adverts/types';

type RootTabParamsList = {
  search: undefined;
  favorite: undefined;
  alerts: undefined;
  user: undefined;
  admin: undefined;
};

type newUserNavigatorParamsList = {
  LanguageSelectionScreen: [string, string];
};

type newUserNavigationParmsList = {
  AboutYouFlatHuntScreen: undefined;
  LanguageSelectionScreen: undefined;
};

type FavoriteStackParamsList = {
  favorite: undefined;
  applicationshow: {advert: Advert; active?: boolean} | {advert: Advert};
};

type SearchStackParamsList = {
  search: undefined;
  flatOverview: undefined;
  flatShow: {advert: Advert};
  applyforflat: {advert: Advert};
  applicationshow: {advert: Advert};
};

type FavoriteScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<RootTabParamsList, 'favorite'>,
  StackNavigationProp<FavoriteStackParamsList>
>;

type SearchScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<RootTabParamsList, 'search'>,
  StackNavigationProp<SearchStackParamsList>
>;

type NewUserNavigatorProp = StackNavigationProp<
  newUserNavigatorParamsList,
  'LanguageSelectionScreen'
>;

type StackNavigation = StackNavigationProp<newUserNavigationParmsList>;

export type {
  RootTabParamsList,
  FavoriteStackParamsList,
  SearchStackParamsList,
  FavoriteScreenNavigationProp,
  SearchScreenNavigationProp,
  NewUserNavigatorProp,
  StackNavigation,
};
