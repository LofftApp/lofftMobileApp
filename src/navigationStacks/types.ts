import type {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import type {CompositeNavigationProp} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';

// Renter Navigator Stack

type RootTabParamsList = {
  search: undefined;
  application: undefined;
  alerts: undefined;
  user: undefined;
  admin: undefined;
  language: undefined;
};

type NewUserScreenNames =
  | 'NewUserJourney'
  | 'LanguageSelectionScreen'
  | 'AboutUserFlatScreen'
  | 'GenderIdentityScreen'
  | 'WhereIsFlatScreen'
  | 'FlatLengthAvailableScreen'
  | 'SelectCityScreen'
  | 'FinderBudgetScreen'
  | 'FlatFeaturesScreen'
  | 'SelfDescribeScreen'
  | 'ConditionsOfUseScreen'
  | 'FinderBudgetScreen'
  | 'NameProfileScreen'
  | 'FlatDescribeScreen'
  | 'FlatImageUploadScreen';

type NewUserScreens = {
  renter: Record<number, NewUserScreenNames>;
  lessor: Record<number, NewUserScreenNames>;
};

type NewUserStackParamsList = Record<NewUserScreenNames, undefined>;

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
  applications: {screen: 'applicationsList'};
};

type ApplicationScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<RootTabParamsList, 'application'>,
  StackNavigationProp<ApplicationStackParamsList>
>;

type SearchScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<RootTabParamsList, 'search'>,
  StackNavigationProp<SearchStackParamsList>
>;

// type LanguageScreenNavigationProp = CompositeNavigationProp<
//   BottomTabNavigationProp<RootTabParamsList, 'language'>,
//   StackNavigationProp<LanguageStackParamsList>
// >;
// Lessor Navigator Stack

type RootTabParamList = {
  search: undefined;
  application: undefined;
  alerts: undefined;
  user: undefined;
  Ello: undefined;
  admin: undefined;
};

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
  seeApplicants: {advertId: number};
  seeProfiles: {
    advertId: number;
  };
  selectionConfirmed: {
    advertId: number;
    round1?: boolean;
    round2?: boolean;
  };
  ApplicantProfile: {
    advertId: number;
    applicantId: number;
    applicationId: number;
  };
  chat: undefined;
};

type LessorNavigatorScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<LessorTabParamsList, 'lessorIndex'>,
  StackNavigationProp<LessorNavigatorStackParamsList>
>;

type NewUserJourneyStackNavigation =
  StackNavigationProp<NewUserStackParamsList>;

export type {
  RootTabParamsList,
  ApplicationStackParamsList,
  SearchStackParamsList,
  ApplicationScreenNavigationProp,
  SearchScreenNavigationProp,
  RootTabParamList,
  LessorTabParamsList,
  LessorNavigatorStackParamsList,
  LessorNavigatorScreenNavigationProp,
  NewUserJourneyStackNavigation,
  NewUserStackParamsList,
  NewUserScreenNames,
  NewUserScreens,
};
