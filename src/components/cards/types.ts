import type {ViewToken} from 'react-native';
import type {Advert} from 'reduxFeatures/adverts/types';
import {Application} from 'reduxFeatures/applications/types';

type Message = {
  chatroomId: number;
  content: string;
  createdAt: string;
  id: number;
  read: boolean;
  updatedAt: string;
  userId: number;
};

type ChatRoomData = {
  id: number;
  matchScore: number;
  message: Message | null;
  name: string;
  userPhoto: string | null;
  advertTagLine: string;
};

type ChatCardProps = {
  chatroomData: ChatRoomData,
  isLessor: boolean
}

type ListFlatApplicationCardProps = {
  _advert?: Advert;
  application?: Application;
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
  ChatCardProps,
};
