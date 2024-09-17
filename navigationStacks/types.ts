import type {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import type {CompositeNavigationProp} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import type {Advert} from 'reduxFeatures/adverts/types';
import {
  AdvertApplicantWithSelected,
  SecondRoundApplicantWithSelected,
} from 'screens/dashboard/landlord/SubScreens/types';

// Renter Navigator Stack

type RootTabParamsList = {
  search: undefined;
  favorite: undefined;
  alerts: undefined;
  user: undefined;
  admin: undefined;
};

type newUserNavigatorParamsList = {
  LanguageSelectionScreen: [string, string];
};

type newUserNavigationParamsList = {
  AboutYouFlatHuntScreen: undefined;
  LanguageSelectionScreen: undefined;
  dashboard: undefined;
};

type FavoriteStackParamsList = {
  favorite: undefined;
  applicationshow: {id: number};
};

type SearchStackParamsList = {
  search: undefined;
  flatOverview: undefined;
  flatShow: {id: number};
  applyforflat: {id: number};
  applicationshow: {id: number};
};

type FavoriteScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<RootTabParamsList, 'favorite'>,
  StackNavigationProp<FavoriteStackParamsList>
>;

type SearchScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<RootTabParamsList, 'search'>,
  StackNavigationProp<SearchStackParamsList>
>;

// Lessor Navigator Stack

type LessorTabParamsList = {
  lessorIndex: undefined;
  lessorAction: undefined;
  user: undefined;
  admin: undefined;
};

type LessorNavigatorStackParamsList = {
  LessorIndex: undefined;
  LessorAction: undefined;
  applicationshow: {advert: Advert};
  allApplicants: {advert: Advert};
  shortlist: {
    secondRoundApplicants: AdvertApplicantWithSelected[];
    currentAdvert: Advert;
  };
  ApplicantProfile: {
    applicantName: string | undefined;
    handleClickCheckbox: () => void;
    secondRoundProfile: SecondRoundApplicantWithSelected;
    currentAdvert: Advert;
  };
};

type LessorNavigatorScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<LessorTabParamsList, 'lessorIndex'>,
  StackNavigationProp<LessorNavigatorStackParamsList>
>;

type NewUserNavigatorProp = StackNavigationProp<
  newUserNavigatorParamsList,
  'LanguageSelectionScreen'
>;

type NewUserJourneyStackNavigation =
  StackNavigationProp<newUserNavigationParamsList>;

export type {
  RootTabParamsList,
  FavoriteStackParamsList,
  SearchStackParamsList,
  FavoriteScreenNavigationProp,
  SearchScreenNavigationProp,
  LessorTabParamsList,
  LessorNavigatorStackParamsList,
  LessorNavigatorScreenNavigationProp,
  NewUserNavigatorProp,
  NewUserJourneyStackNavigation,
};
