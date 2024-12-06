import type {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import type {CompositeNavigationProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {StackNavigationProp} from '@react-navigation/stack';

// Root Navigator
type RootStackParamsList = {
  AdminStack: undefined;
  NewUserStack: undefined;
  LessorDashboardStack: undefined;
  TenantDashboardStack: undefined;
};

type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamsList>;

// Guest Navigator
type GuestStackParamsList = {
  SignInScreen: undefined;
  SignUpScreen: undefined;
};
type GuestStackScreenNavigationProp = StackNavigationProp<GuestStackParamsList>;

// Tenant Navigator
type TenantTabParamsList = {
  SearchTab: undefined;
  ApplicationsTab: undefined;
  UserTab: undefined;
  AdminTab: undefined;
  AlertsTab: undefined;
  tempTab: undefined;
  FavoritesTab: undefined;
};
type ApplicationStackParamsList = {
  ApplicationsIndexScreen: undefined;
  ApplicationShowScreen: {id: number};
  LessorChatScreen: undefined;
};

type SearchStackParamsList = {
  FlatFindScreen: undefined;
  FlatShowScreen: {advertId: number};
  ApplyForFlatScreen: undefined;
  ApplicationNavigator: {screen: 'ApplicationsIndexScreen'};
};

type ApplicationScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TenantTabParamsList, 'ApplicationsTab'>,
  StackNavigationProp<ApplicationStackParamsList>
>;

type SearchScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TenantTabParamsList, 'SearchTab'>,
  StackNavigationProp<SearchStackParamsList>
>;

// Lessor Navigator

type LessorTabParamsList = {
  LessorIndexNavigator: undefined;
  AlertsTab: undefined;
  UserTab: undefined;
  AdminTab: undefined;
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
  BottomTabNavigationProp<LessorTabParamsList, 'LessorIndexNavigator'>,
  StackNavigationProp<LessorNavigatorStackParamsList>
>;

//NewUser Navigator
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
  | 'SafeSpaceForScreen'
  | 'ConfirmEmail';

type NewUserScreens = {
  tenant: Record<number, NewUserScreenNames>;
  lessor: Record<number, NewUserScreenNames>;
};

type NewUserStackParamsList = Record<NewUserScreenNames, undefined>;

type NewUserJourneyStackNavigation =
  StackNavigationProp<NewUserStackParamsList>;

//Admin Navigator
type AdminStackParamsList = {
  AdminScreen: undefined;
};

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
  RootStackParamsList,
  AdminStackParamsList,
};
