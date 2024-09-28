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
  application: undefined;
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

type ApplicationStackParamsList = {
  application: undefined;
  applicationsList: undefined;
  applicationshow: {id: number};
  chat: undefined;
};

type SearchStackParamsList = {
  search: undefined;
  flatOverview: undefined;
  flatShow: {advertId: number};
  applyforflat: undefined;
};

type ApplicationScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<RootTabParamsList, 'application'>,
  StackNavigationProp<ApplicationStackParamsList>
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
  applicationshow: {id: number};
  seeApplicants: {id: number};
  seeProfiles: {
    // secondRoundApplicants: AdvertApplicantWithSelected[];
    // currentAdvert: Advert;
    advertId: number;
  };
  ApplicantProfile: {
    applicantName: string | undefined;
    handleClickCheckbox: () => void;
    secondRoundProfile: SecondRoundApplicantWithSelected;
    currentAdvert: Advert;
  };
  chat: undefined;
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
  ApplicationStackParamsList,
  SearchStackParamsList,
  ApplicationScreenNavigationProp,
  SearchScreenNavigationProp,
  LessorTabParamsList,
  LessorNavigatorStackParamsList,
  LessorNavigatorScreenNavigationProp,
  NewUserNavigatorProp,
  NewUserJourneyStackNavigation,
};
