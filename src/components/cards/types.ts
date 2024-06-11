import type {ViewToken} from 'react-native';
import type {Advert} from 'reduxFeatures/adverts/types';

type ListFlatApplicationCardProps = {
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

type LanguagesCardProps = {
  language: string;
  selected: boolean;
  handleSelectedLanguages: (chosenLangugage: string) => void;
};

export type {
  ListFlatApplicationCardProps,
  LofftHeaderPhotoProps,
  onViewableItemsChangedParams,
  LanguagesCardProps,
};
