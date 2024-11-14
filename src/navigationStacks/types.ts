import type {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import type {CompositeNavigationProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {StackNavigationProp} from '@react-navigation/stack';

// tenant Navigator Stack

type TenantTabParamsList = {
  searchTab: undefined;
  applicationTab: undefined;
  userTab: undefined;
  adminTab: undefined;
  alertsTab: undefined;
  tempTab: undefined;
  favoritesTab: undefined;
};

type RootStackParamsList = {
  admin: undefined;
  newuser: undefined;
  profileFlow: undefined;
  dashboardLessor: undefined;
  dashboard: undefined;
};

type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamsList>;

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
  | 'SelfFlatDescribeScreen'
  | 'ConditionsOfUseScreen'
  | 'FinderBudgetScreen'
  | 'NameProfileScreen'
  | 'FlatImageUploadScreen'
  | 'FlatDetailsScreen'
  | 'SafeSpaceForScreen';

type NewUserScreens = {
  tenant: Record<number, NewUserScreenNames>;
  lessor: Record<number, NewUserScreenNames>;
};

type NewUserStackParamsList = Record<NewUserScreenNames, undefined>;

type GuestStackParamsList = {
  SignInScreen: undefined;
  SignUpScreen: undefined;
};

type GuestStackScreenNavigationProp = StackNavigationProp<GuestStackParamsList>;

type ApplicationStackParamsList = {
  ApplicationsIndexScreen: undefined;
  ApplicationShowScreen: {id: number};
  LessorChatScreen: undefined;
};

type SearchStackParamsList = {
  flatOverview: undefined;
  flatShow: {advertId: number};
  applyforflat: undefined;
  applications: {screen: 'ApplicationsIndexScreen'};
};

type ApplicationScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TenantTabParamsList, 'applicationTab'>,
  StackNavigationProp<ApplicationStackParamsList>
>;

type SearchScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TenantTabParamsList, 'searchTab'>,
  StackNavigationProp<SearchStackParamsList>
>;

type LessorTabParamsList = {
  lessorIndex: undefined;
  lessorAction: undefined;
  user: undefined;
  admin: undefined;
};

type LessorNavigatorStackParamsList = {
  ListingsScreen: undefined;
  LessorAction: undefined;
  ApplicationShowScreen: {id: number};
  SeeApplicantsScreen: {advertId: number};
  SeeProfilesScreen: {
    advertId: number;
  };
  SelectionConfirmedScreen: {
    advertId: number;
    round1?: boolean;
    round2?: boolean;
  };
  ApplicantProfileScreen: {
    advertId: number;
    applicantId: number;
    applicationId: number;
  };
  LessorChatScreen: undefined;
};

type LessorNavigatorScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<LessorTabParamsList, 'lessorIndex'>,
  StackNavigationProp<LessorNavigatorStackParamsList>
>;

type NewUserJourneyStackNavigation =
  StackNavigationProp<NewUserStackParamsList>;

export type {
  TenantTabParamsList,
  ApplicationStackParamsList,
  SearchStackParamsList,
  ApplicationScreenNavigationProp,
  SearchScreenNavigationProp,
  LessorTabParamsList,
  LessorNavigatorStackParamsList,
  LessorNavigatorScreenNavigationProp,
  NewUserJourneyStackNavigation,
  NewUserStackParamsList,
  NewUserScreenNames,
  NewUserScreens,
  GuestStackParamsList,
  GuestStackScreenNavigationProp,
  RootStackNavigationProp,
};
