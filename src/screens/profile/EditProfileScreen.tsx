import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// Redux
import {useGetUserQuery} from 'reduxFeatures/user/userApi';
import {useSignOutMutation} from 'reduxFeatures/auth/authApi';

//Hooks
import {useUserType} from 'reduxFeatures/user/useUserType';

//Components
import {RegistrationBackground, Trail} from 'assets';
import ImageSwiper from 'components/cards/ImageSwiper';
import SettingsUserImage from 'components/images/SettingsUserImages';
import SettingsCard from 'components/cards/SettingsCard';

//Styles
import {fontStyles} from 'styleSheets/fontStyles';
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';

//Helpers
import {size} from 'react-native-responsive-sizes';

//Types
import {SettingsScreenNavigationProp} from 'navigationStacks/types';
import {useAppLanguage} from 'reduxFeatures/settings/useAppLanguage';
import BackButton from 'components/buttons/BackButton';

const picUrl =
  'https://www.friendsoffriends.com/app/uploads/an-artists-farm-in-upstate-new-york-envisions-a-path-towards-food-sovereignty/Friends-of-Friends-SkyHighFarm-Tompkins-061.jpg.webp';
const flatImages = [
  'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1586105251261-72a756497a11?q=80&w=1258&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1562663474-6cbb3eaa4d14?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1585128792020-803d29415281?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
];

const EditProfileScreen = () => {
  const {data: currentUser} = useGetUserQuery();
  const {isLessor} = useUserType();
  const {appLanguage} = useAppLanguage();
  const [signOut] = useSignOutMutation();

  const navigation = useNavigation<SettingsScreenNavigationProp>();

  const userView = isLessor ? 'tenant' : 'lessor';
  const appLang = appLanguage === 'EN' ? 'English' : 'Deutsch';
  const editTenantProfile = [
    {
      id: 1,
      title: 'Match Tags',
      subtitle: 'Boost your profile to find the perfect flat',
      navigate: () =>
        navigation.navigate('NewUserNavigator', {
          screen: 'AboutUserFlatScreen',
          params: {edit: true},
        }),
      icon: 'annotation-heart',
    },
    {
      id: 2,
      title: 'Upload Pictures',
      subtitle: 'Show your best side',
      navigate: () =>
        navigation.navigate('NewUserNavigator', {
          screen: 'UserImageUploadScreen',
          params: {edit: true},
        }),
      icon: 'upload',
    },
    {
      id: 3,
      title: 'Personal Information',
      subtitle: 'Name and date of birth',
      navigate: () =>
        navigation.navigate('NewUserNavigator', {
          screen: 'NameProfileScreen',
          params: {edit: true},
        }),
      icon: 'user-edit',
    },
    {
      id: 4,
      title: 'Gender Identity',
      subtitle: 'To get you closer to the right community',
      navigate: () =>
        navigation.navigate('NewUserNavigator', {
          screen: 'GenderIdentityScreen',
          params: {edit: true},
        }),
      icon: 'face-wink',
    },
    {
      id: 5,
      title: 'Search Preferences',
      subtitle: 'City, budget, and more',
      navigate: () =>
        navigation.navigate('NewUserNavigator', {
          screen: 'SelectCityScreen',
          params: {edit: true},
        }),
      icon: 'search-sm',
    },
    {
      id: 6,
      title: 'Languages',
      subtitle: 'The languages spoken in the flat',
      navigate: () =>
        navigation.navigate('NewUserNavigator', {
          screen: 'LanguageSelectionScreen',
          params: {edit: true},
        }),
      icon: 'home-smile',
    },
  ];

  return (
    <SafeAreaView style={CoreStyleSheet.safeAreaViewShowContainer}>
      <BackButton title="Edit Profile" onPress={navigation.goBack} />

      <RegistrationBackground
        height="100%"
        width="100%"
        style={CoreStyleSheet.backgroundImage}
      />

      <View style={CoreStyleSheet.screenContainer}>
        <View style={styles.mainContainer}>
          <FlatList
            data={editTenantProfile}
            renderItem={({item}) => <SettingsCard settingsData={item} />}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.cardsContainer}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    gap: size(24),
  },

  backgroundImageExtra: {
    position: 'absolute',
    top: size(-25),
    zIndex: -1,
    left: 0,
    opacity: 0.7,
  },
  imagesContainer: {
    gap: size(20),
  },

  cardsContainer: {
    alignItems: 'center',
  },

  coreButtonStyle: {
    width: '40%',
    marginTop: 20,
  },
});

export default EditProfileScreen;
