import {Advert} from 'reduxFeatures/adverts/types';

type FlatInfoContainerProps = {
  advert: Advert;
  button: boolean;
};

type HighlightButtonsProps = {
  goBack?: boolean;
  heartPresent?: boolean;
  color?: string | null;
  favorite?: boolean;
  onPressHeart?: () => void;
};

export type {FlatInfoContainerProps, HighlightButtonsProps};
