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

export type {ListFlatApplicationCardProps, LofftHeaderPhotoProps};
