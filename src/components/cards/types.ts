import type {ViewToken} from 'react-native';
import type {Advert} from 'reduxFeatures/adverts/types';
import type {
  FavoriteScreenNavigationProp,
  SearchScreenNavigationProp,
} from 'screens/dashboard/renter/types';

type ListFlatApplicationCardProps = {
  navigation: FavoriteScreenNavigationProp;
  advert: Advert;
  posted?: boolean;
  isLessor: boolean;
};

type LofftHeaderPhotoProps = {
  imageContainerHeight: number;
  images: string[];
  activeBlur?: boolean;
};

type onViewableItemsChangedParams = {
  viewableItems: Array<ViewToken>;
  changed?: Array<ViewToken>;
};

type ListViewFlatCardProps = {
  navigation: SearchScreenNavigationProp;

  advert: Advert;
};

export type {
  ListFlatApplicationCardProps,
  LofftHeaderPhotoProps,
  onViewableItemsChangedParams,
  ListViewFlatCardProps,
};
