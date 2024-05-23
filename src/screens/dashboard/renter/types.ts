import type {RootTabParamsList} from '../../../../navigationStacks/types';
import type {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

type FavoriteScreenNavigationProp = BottomTabNavigationProp<
  RootTabParamsList,
  'favorite'
>;
type ApplicationIndexScreenProp = {
  navigation: FavoriteScreenNavigationProp;
};
export type {ApplicationIndexScreenProp};
