import type {ViewToken} from 'react-native';
import type {Advert} from 'reduxFeatures/adverts/types';
import {Application} from 'reduxFeatures/applications/types';
import type {SecondRoundApplicantWithSelected} from 'screens/dashboard/landlord/SubScreens/types';

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

type ApplicantCardProps = {
  currentSelectedNums: number;
  selectApplication: (id: number) => void;
  application: Application;
};

type UserBlobCardProps = {
  secondRoundProfile: SecondRoundApplicantWithSelected;
  currentAdvert: Advert;
  selectProfiles: (id: number | null) => void;
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
  ApplicantCardProps,
  UserBlobCardProps,
  LanguagesCardProps,
};
