import {Advert} from 'reduxFeatures/adverts/types';
import type {RootTabParamsList} from '../../../../navigationStacks/types';
import type {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {CompositeNavigationProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

type FavoriteStackParamsList = {
  favorite: undefined;
  applicationshow: {advert: Advert; active?: boolean};
};

type FavoriteScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<RootTabParamsList, 'favorite'>,
  StackNavigationProp<FavoriteStackParamsList>
>;
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
};
