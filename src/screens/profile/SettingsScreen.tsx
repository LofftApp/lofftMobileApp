import React, {useEffect, useState} from 'react';
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
import {useGetAdvertsQuery} from 'reduxFeatures/adverts/advertApi';
import {useNewUserDetails} from 'reduxFeatures/registration/useNewUserDetails';

const picUrl =
  'https://www.friendsoffriends.com/app/uploads/an-artists-farm-in-upstate-new-york-envisions-a-path-towards-food-sovereignty/Friends-of-Friends-SkyHighFarm-Tompkins-061.jpg.webp';
const flatImages = [
  {
    photo:
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    advertId: 3,
  },
  {
    photo: '',
    advertId: 4,
  },
  {
    photo:
      'https://images.unsplash.com/photo-1562663474-6cbb3eaa4d14?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    advertId: 5,
  },
  {
    photo:
      'https://images.unsplash.com/photo-1585128792020-803d29415281?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    advertId: 6,
  },
];

const SettingsScreen = () => {
  const {data: currentUser} = useGetUserQuery();
  const {isLessor} = useUserType();
  const {resetNewUserState} = useNewUserDetails(isLessor);
  const {data} = useGetAdvertsQuery(undefined, {skip: !isLessor});
  const adverts = data?.adverts;
  const {appLanguage} = useAppLanguage();
  const [signOut] = useSignOutMutation();
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation<SettingsScreenNavigationProp>();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const userView = isLessor ? 'tenant' : 'lessor';
  const appLang = appLanguage === 'EN' ? 'English' : 'Deutsch';
  const advertPhotos =
    adverts?.map(advert => ({
      photo: advert.flat.photos[0],
      advertId: advert.id,
    })) || [];

  const totalPhotos = [...flatImages, ...advertPhotos];

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

  const userImageUri = currentUser?.profile?.userPhotos?.[0] || picUrl;

  return (
    <SafeAreaView style={CoreStyleSheet.safeAreaViewShowContainer}>
      <Trail height="100%" width="100%" style={styles.backgroundImageExtra} />
      <RegistrationBackground
        height="100%"
        width="100%"
        style={CoreStyleSheet.backgroundImage}
      />
      <View style={CoreStyleSheet.headerContainer}>
        <Text style={fontStyles.headerLarge}>Settings</Text>
      </View>
      <View style={CoreStyleSheet.screenContainer}>
        <View style={styles.mainContainer}>
          <View style={styles.imagesContainer}>
            <SettingsUserImage
              userImageUri={userImageUri}
              isLoading={isLoading}
            />

            {isLessor && (
              <ImageSwiper
                imageContainerHeight={90}
                imageContainerWidth={90}
                images={totalPhotos.map(photo => photo.photo)}
                snapToInterval={30}
                editButton
                onPress={index => {
                  if (index !== undefined) {
                    handlePressImageSwiper(totalPhotos[index].advertId);
                  }
                }}
                isLoading={isLoading}
              />
            )}
          </View>
          <FlatList
            data={isLessor ? lessorSettingsData : tenantSettingsData}
            renderItem={({item}) => (
              <SettingsCard
                settingsData={item}
                hasArrowIds={[1, 2, 3, 4, 5, 6, 9]}
                isDeleteId={8}
              />
            )}
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
});

export default SettingsScreen;
