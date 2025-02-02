import type {ViewToken} from 'react-native';
import type {Advert} from 'reduxFeatures/adverts/types';
import {Application} from 'reduxFeatures/applications/types';
import {ImageFile} from 'reduxFeatures/registration/types';
import {AppLanguages} from 'reduxFeatures/settings/settingsSlice';

type ListFlatApplicationCardProps = {
  _advert?: Advert;
  application?: Application;
};

type LofftHeaderPhotoProps = {
  imageContainerHeight: number;
  images: string[];
  activeBlur?: boolean;
};

type ImageSwiperProps = {
  imageContainerHeight: number;
  imageContainerWidth: number;
  pagination?: boolean;
  snapToInterval: number;
  images: string[] | ImageFile[];
  activeBlur?: boolean;
  marginHorizontal?: number;
  editButton?: boolean;
  deleteImage?: (fileName: string) => void;
  onPress?: (index?: number) => void;
  isLoading?: boolean;
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

type SettingsData = {
  id: number;
  title: string;
  subtitle?: string;
  icon: string;
  onPress: () => void;
};

type SettingsCardProps = {
  settingsData: SettingsData;
  hasArrowIds?: number[];
  isDeleteId?: number;
};

type AppLanguageCardScreenProps = {
  languageData: {
    id: AppLanguages;
    name: string;
  };
};

export type {
  ListFlatApplicationCardProps,
  LofftHeaderPhotoProps,
  OnViewableItemsChangedParams,
  ApplicantCardRound1Props,
  ApplicantCardRound2Props,
  LanguagesCardProps,
  SettingsData,
  SettingsCardProps,
  ImageSwiperProps,
  AppLanguageCardScreenProps,
};
