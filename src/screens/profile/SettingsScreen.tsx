import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// Redux
import {useGetUserQuery} from 'reduxFeatures/user/userApi';
import {useSignOutMutation} from 'reduxFeatures/auth/authApi';

//Hooks
import {useUserType} from 'hooks/useUserType';

//Components
import {RegistrationBackground, Trail} from 'assets';
import ImageCarroussel from 'components/cards/ImageCarroussel';
import SettingsUserImage from 'components/images/SettingsUserImages';
import SettingsCard from 'components/cards/SettingsCard';

//Styles
import {fontStyles} from 'styleSheets/fontStyles';
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';

//Helpers
import {size} from 'react-native-responsive-sizes';

//Types
import {SettingsScreenNavigationProp} from 'navigationStacks/types';

const picUrl =
  'https://www.friendsoffriends.com/app/uploads/an-artists-farm-in-upstate-new-york-envisions-a-path-towards-food-sovereignty/Friends-of-Friends-SkyHighFarm-Tompkins-061.jpg.webp';
const flatImages = [
  'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1586105251261-72a756497a11?q=80&w=1258&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1562663474-6cbb3eaa4d14?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1585128792020-803d29415281?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
];

const SettingsScreen = () => {
  const {data: currentUser} = useGetUserQuery();
  const {isLessor} = useUserType();
  const [signOut] = useSignOutMutation();

  const navigation = useNavigation<SettingsScreenNavigationProp>();

  const userView = isLessor ? 'tenant' : 'lessor';
  const settingsData = [
    {
      id: 1,
      title: 'Get Tokens',
      subtitle: `You have ${currentUser?.credits} tokens`,
      navigate: () => navigation.navigate('GetTokensScreen'),
      icon: 'coins-stacked',
    },
    {
      id: 2,
      title: 'App Language',
      subtitle: 'English',
      navigate: () => navigation.navigate('AppLanguageScreen'),
      icon: 'translate',
    },
    {
      id: 3,
      title: 'Send Feedback',
      subtitle: '',
      navigate: () => navigation.navigate('SendFeedbackScreen'),
      icon: 'announcement',
    },
    {
      id: 4,
      title: 'Terms and Conditions',
      navigate: () => navigation.navigate('TermsAndConditionsScreen'),
      icon: 'file',
    },
    {
      id: 5,
      title: `Switch to ${userView} view`,
      navigate: () => navigation.navigate('SwitchUserScreen'),
      icon: 'refresh-ccq-03',
    },
    {
      id: 6,
      title: 'Sign Out',
      navigate: () => signOut(),
      icon: 'log-out',
    },
    {
      id: 7,
      title: 'Delete Account',
      navigate: () => {},
      icon: 'trash',
    },
  ];

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
        <Text style={fontStyles.headerLarge}>Profile and Settings</Text>
      </View>
      <View style={CoreStyleSheet.screenContainer}>
        <View style={styles.mainContainer}>
          <View style={styles.imagesContainer}>
            <SettingsUserImage userImageUri={userImageUri} />
            <ImageCarroussel
              imageContainerHeight={90}
              imageContainerWidth={90}
              images={flatImages}
              snapToInterval={30}
            />
          </View>
          <FlatList
            data={settingsData}
            renderItem={({item}) => <SettingsCard settingsData={item} />}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.cardsContainer}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>

      {/* <Text style={fontStyles.headerLarge}>
          Current Credits: {userCredits}
        </Text> */}
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

export default SettingsScreen;
