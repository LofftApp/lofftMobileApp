import type {ViewToken} from 'react-native';
import type {Advert} from 'reduxFeatures/adverts/types';
import type {FavoriteScreenNavigationProp} from 'screens/dashboard/renter/types';

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

export type {
  ListFlatApplicationCardProps,
  LofftHeaderPhotoProps,
  onViewableItemsChangedParams,
};
