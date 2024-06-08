import type {ViewToken} from 'react-native';
import type {Advert} from 'reduxFeatures/adverts/types';
import type {
  AdvertApplicantWithSelected,
  SecondRoundApplicantsWithSelected,
} from 'screens/dashboard/landlord/SubScreens/types';

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

type ApplicantCardProps = {
  currentSelectedNums: number;
  maxSelect: number;
  selectProfile: (id: number | null) => void;
  applicant: AdvertApplicantWithSelected;
};

type UserBlobCardProps = {
  secondRoundProfile: SecondRoundApplicantsWithSelected;
  currentAdvert: Advert;
  selectProfiles: (id: number | null) => void;
};

export type {
  ListFlatApplicationCardProps,
  LofftHeaderPhotoProps,
  onViewableItemsChangedParams,
  ApplicantCardProps,
  UserBlobCardProps,
};
