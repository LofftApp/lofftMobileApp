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
  SettingsTab: undefined;
  AdminTab: undefined;
  NotificationsTab: undefined;
  tempTab: undefined;
  FavoritesTab: undefined;
};
type ApplicationStackParamsList = {
  ApplicationsIndexScreen: undefined;
  ApplicationShowScreen: {id: number};
  ChatroomsNavigator: {
    screen: keyof ChatroomsStackParamsList;
    params?: {chatroomId?: number};
  };
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

//Favorites Navigator
type FavoritesStackParamsList = {
  FavoritesScreen: undefined;
  ApplyForFlatScreen: undefined;
};

type FavoritesScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TenantTabParamsList, 'FavoritesTab'>,
  StackNavigationProp<FavoritesStackParamsList>
>;

// Lessor Navigator

type LessorTabParamsList = {
  LessorIndexNavigator: undefined;
  NotificationsTab: undefined;
  SettingsTab: undefined;
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
  };
  ApplicantProfileScreen: {
    advertId: number;
    applicantId: number;
    applicationId: number;
  };
  LessorChatScreen: undefined;
  ChatroomsNavigator: {
    screen: keyof ChatroomsStackParamsList;
    params?: {chatroomId?: number};
  };
  SettingsNavigator: {
    screen: keyof SettingsStackParamsList;
    params?: {edit?: boolean; advertId?: number};
  };
};

type LessorNavigatorScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<LessorTabParamsList, 'LessorIndexNavigator'>,
  StackNavigationProp<LessorNavigatorStackParamsList>
>;

// Chatrooms Navigator
type ChatroomsStackParamsList = {
  ChatIndex: undefined;
  ChatShow: {
    chatroomId: number;
  };
};
type ChatroomNavigationProps = StackNavigationProp<ChatroomsStackParamsList>;

//Notifications Navigator
type NotificationsTabParamsList = {
  NotificationsTab: undefined;
};
type NotificationsStackParamsList = {
  NotificationsScreen: undefined;
  ApplicationShowScreen: {id: number};
  FlatShowScreen: {advertId: number};
  SeeApplicantsScreen: {advertId: number};
  LessorIndexNavigator: {
    screen:
      | 'ApplicationShowScreen'
      | 'SeeApplicantsScreen'
      | 'LessorChatScreen'
      | 'SeeProfilesScreen';
    params?: {id?: number; advertId?: number};
  };
  ApplicationNavigator: {
    screen: 'ApplicationShowScreen' | 'LessorChatScreen';
    params?: {id: number};
  };
  ChatroomsNavigator: {
    screen: keyof ChatroomsStackParamsList;
    params?: {chatroomId?: number};
  };
};

type NotificationsScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<NotificationsTabParamsList, 'NotificationsTab'>,
  StackNavigationProp<NotificationsStackParamsList>
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
  | 'UserDescribeScreen'
  | 'FlatDescribeScreen'
  | 'ConditionsOfUseScreen'
  | 'FinderBudgetScreen'
  | 'NameProfileScreen'
  | 'FlatImageUploadScreen'
  | 'UserImageUploadScreen'
  | 'FlatDetailsScreen'
  | 'SafeSpaceForScreen'
  | 'ConfirmEmail';

type NewUserScreens = {
  tenant: Record<number, NewUserScreenNames>;
  lessor: Record<number, NewUserScreenNames>;
};

type NewUserStackParamsList = {
  [key in NewUserScreenNames]: undefined;
};

type NewUserJourneyStackNavigation =
  StackNavigationProp<NewUserStackParamsList>;

// Settings Navigator

type SettingsTabParamsList = {
  SettingsTab: undefined;
};
type SettingsStackParamsList = {
  SettingsScreen: undefined;
  EditProfileScreen: undefined;
  EditAdvertScreen: {advertId: number};
  GetTokensScreen: undefined;
  AppLanguageScreen: undefined;
  SwitchUserScreen: undefined;
  TermsAndConditionsScreen: undefined;
  SendFeedbackScreen: undefined;
  NewUserNavigator: {
    screen: keyof NewUserStackParamsList;
    params?: {edit?: boolean; advertId?: number};
  };
};

type SettingsScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<SettingsTabParamsList, 'SettingsTab'>,
  StackNavigationProp<SettingsStackParamsList>
>;

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
  NotificationsTabParamsList,
  NotificationsStackParamsList,
  NotificationsScreenNavigationProp,
  ChatroomsStackParamsList,
  ChatroomNavigationProps,
  FavoritesStackParamsList,
  FavoritesScreenNavigationProp,
  SettingsTabParamsList,
  SettingsStackParamsList,
  SettingsScreenNavigationProp,
};
