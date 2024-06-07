import type {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import type {CompositeNavigationProp} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import type {
  Advert,
  AdvertApplicant,
  AdvertUser,
} from 'reduxFeatures/adverts/types';

// Renter Navigator Stack

type RootTabParamsList = {
  search: undefined;
  favorite: undefined;
  alerts: undefined;
  user: undefined;
  admin: undefined;
};

type FavoriteStackParamsList = {
  favorite: undefined;
  applicationshow: {advert: Advert; active?: boolean} | {advert: Advert};
};

type SearchStackParamsList = {
  search: undefined;
  flatOverview: undefined;
  flatShow: {advert: Advert};
  applyforflat: {advert: Advert};
  applicationshow: {advert: Advert};
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
  shortlist: {secondRoundApplicants: AdvertUser[]; currentAdvert: Advert};
  ApplicantProfile: {
    applicant: AdvertApplicant;
    selectedProfile: {
      userId: number;
      selected: AdvertApplicant;
    };
    currentAdvert: Advert;
    selectProfilesFunc: (id: number) => void;
  };
};

type LessorNavigatorScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<LessorTabParamsList, 'lessorIndex'>,
  StackNavigationProp<LessorNavigatorStackParamsList>
>;

export type {
  RootTabParamsList,
  FavoriteStackParamsList,
  SearchStackParamsList,
  FavoriteScreenNavigationProp,
  SearchScreenNavigationProp,
  LessorTabParamsList,
  LessorNavigatorStackParamsList,
  LessorNavigatorScreenNavigationProp,
};
