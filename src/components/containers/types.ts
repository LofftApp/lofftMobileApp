import {Advert} from 'reduxFeatures/adverts/types';
import {FavoriteScreenNavigationProp} from 'screens/dashboard/renter/types';

type FlatInfoContainerProps = {
  advert: Advert;
  button: boolean;
  navigation: any;
  characteristicsTags?: string[];
  featuresTags?: string[];
};

type HighlightButtonsProps = {
  goBack?: boolean;
  navigation: FavoriteScreenNavigationProp;
  heartPresent?: boolean;
  color?: string | null;
  favorite?: boolean;
  onPressHeart?: () => void;
};

export type {FlatInfoContainerProps, HighlightButtonsProps};
