import type {ViewToken} from 'react-native';
import type {Advert} from 'reduxFeatures/adverts/types';
import {Application} from 'reduxFeatures/applications/types';

type ListFlatApplicationCardProps = {
  _advert?: Advert;
  application?: Application;
  isLessor: boolean;
};

type LofftHeaderPhotoProps = {
  imageContainerHeight: number;
  images: string[];
  activeBlur?: boolean;
};

type OnViewableItemsChangedParams = {
  viewableItems: Array<ViewToken>;
  changed?: Array<ViewToken>;
};

type ApplicantCardRound1Props = {
  currentSelectedNums: number;
  selectApplication: (id: number) => void;
  application: Application;
};

type ApplicantCardRound2Props = {
  currentSelectedNums: number;
  selectApplication: (id: number) => void;
  application: Application;
};

type LanguagesCardProps = {
  language: string;
  selected: boolean;
  isSelected?: boolean;
  handleSelectedLanguages: (chosenLangugage: string) => void;
};

export type {
  ListFlatApplicationCardProps,
  LofftHeaderPhotoProps,
  OnViewableItemsChangedParams,
  ApplicantCardRound1Props,
  ApplicantCardRound2Props,
  LanguagesCardProps,
};
