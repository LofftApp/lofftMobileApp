import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

// Redux
import {useGetUserQuery} from 'reduxFeatures/user/userApi';
import {useSignOutMutation} from 'reduxFeatures/auth/authApi';
import {useUserType} from 'reduxFeatures/user/useUserType';
import {useGetAdvertsQuery} from 'reduxFeatures/adverts/advertApi';
import {useNewUserDetails} from 'reduxFeatures/registration/useNewUserDetails';
import {useAppLanguage} from 'reduxFeatures/settings/useAppLanguage';

//Types
import {SettingsScreenNavigationProp} from 'navigationStacks/types';
import {UserType} from 'reduxFeatures/user/types';

export const useSettingsScreen = () => {
  //Navigation
  const navigation = useNavigation<SettingsScreenNavigationProp>();

  //Redux
  const {
    data: currentUser,
    isLoading: isProfileLoading,
    isError: isProfileError,
    refetch: profileRefetch,
  } = useGetUserQuery();
  const {isLessor} = useUserType();
  const {resetNewUserState} = useNewUserDetails();
  const {
    data,
    isLoading: isAdvertLoading,
    isError: isAdvertError,
    refetch: advertRefetch,
  } = useGetAdvertsQuery(undefined, {skip: !isLessor});
  const {appLanguage} = useAppLanguage();
  const [signOut] = useSignOutMutation();
  const adverts = data?.adverts;

  const insets = useSafeAreaInsets();
  console.log('data Advertisement', data);

  const userView = isLessor ? UserType.LESSOR : UserType.TENANT;
  const appLang = appLanguage === 'EN' ? 'English' : 'Deutsch';
  const advertPhotos =
    adverts
      ?.map(advert => ({
        photo: advert?.flat?.mainPic,
        advertId: advert?.id,
      }))
      ?.filter(item => item.photo) || [];

  const tenantSettingsData = [
    {
      id: 1,
      title: 'Edit Profile',
      subtitle: 'Profile details, Match Tags and more',
      onPress: () => navigation.navigate('EditProfileScreen'),
      icon: 'user-edit',
    },
    {
      id: 2,
      title: 'Get Tokens',
      subtitle: `You have ${currentUser?.credits} tokens`,
      onPress: () => navigation.navigate('GetTokensScreen'),
      icon: 'coins-stacked',
    },
    {
      id: 3,
      title: 'App Language',
      subtitle: appLang,
      onPress: () => navigation.navigate('AppLanguageScreen'),
      icon: 'translate',
    },
    {
      id: 4,
      title: 'Send Feedback',
      subtitle: '',
      onPress: () => navigation.navigate('SendFeedbackScreen'),
      icon: 'announcement',
    },
    {
      id: 5,
      title: 'Terms and Conditions',
      onPress: () => navigation.navigate('TermsAndConditionsScreen'),
      icon: 'file',
    },
    {
      id: 6,
      title: `Switch to ${userView} view`,
      onPress: () => navigation.navigate('SwitchUserScreen'),
      icon: 'refresh-ccq-03',
    },
    {
      id: 7,
      title: 'Sign Out',
      onPress: () => signOut(),
      icon: 'log-out',
    },
    {
      id: 8,
      title: 'Delete Account',
      onPress: () => {},
      icon: 'trash',
    },
  ];

  const lessorExtraData = {
    id: 9,
    title: 'Archived Adverts',
    subtitle: '',
    onPress: () => {},
    icon: 'archive',
  };

  const indexToInsert = 4;
  const lessorSettingsData = [
    ...tenantSettingsData.slice(0, indexToInsert),
    lessorExtraData,
    ...tenantSettingsData.slice(indexToInsert),
  ];

  const handlePressImageSwiper = (advertId: number) => {
    navigation.navigate('EditAdvertScreen', {advertId});
    resetNewUserState();
  };

  const userImageUri = currentUser?.profile?.avatar?.uri;
  console.log(
    'currentUser.profile.avatar.uri',
    currentUser?.profile?.avatar?.uri,
  );
  console.log('currentUser', currentUser);
  console.log('userImageUri', userImageUri);
  return {
    currentUser,
    isProfileLoading,
    isProfileError,
    profileRefetch,
    isLessor,

    isAdvertLoading,
    isAdvertError,
    advertRefetch,
    insets,
    advertPhotos,
    tenantSettingsData,
    lessorSettingsData,
    handlePressImageSwiper,
    userImageUri,
  };
};
