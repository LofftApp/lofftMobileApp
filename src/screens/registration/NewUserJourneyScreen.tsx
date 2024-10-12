import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// Redux 🧠

import {useSignOutMutation} from 'reduxFeatures/auth/authApi';

// Components 🪢
import HeadlineContainer from 'components/containers/HeadlineContainer';
import BackButton from 'components/buttons/BackButton';
import NewUserJourneyButton from 'components/buttons/NewUserJourneyButton';

// Redux 🧠
import {useNewUserDetails} from 'reduxFeatures/registration/useNewUserDetails';
import {useNewUserCurrentScreen} from 'reduxFeatures/registration/useNewUserCurrentScreen';

// Styles 🖼️
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';

//Assets
import {RegistrationBackground} from 'assets';

// Helper
import {size} from 'react-native-responsive-sizes';

// Types 🏷 ️
import {NewUserNavigatorProp} from '../../../navigationStacks/types';

const NewUserJourneyScreen = () => {
  const navigation = useNavigation<NewUserNavigatorProp>();

  const {userType, setUserType} = useNewUserDetails();
  const {setCurrentScreen} = useNewUserCurrentScreen();

  const [signOut] = useSignOutMutation();

  const handleSignOut = () => {
    signOut();
  };

  const handleSelected = (type: string) => {
    setUserType(type);
    setCurrentScreen(1);
    setTimeout(() => {
      navigation.navigate('LanguageSelectionScreen');
    }, 400);
  };

  return (
    <SafeAreaView style={CoreStyleSheet.safeAreaViewShowContainer}>
      <BackButton onPress={handleSignOut} />

      <RegistrationBackground
        height="100%"
        width="100%"
        style={CoreStyleSheet.backgroundImage}
      />

      <View style={CoreStyleSheet.screenContainer}>
        <View style={styles.mainContainer}>
          <HeadlineContainer
            headlineText={'What brings you here?'}
            subDescription={
              'Tell us what you want to do on Lofft and we will create the matching experience!'
            }
          />
          <NewUserJourneyButton
            text="I'm looking for a flat"
            icon="search-sm"
            onPress={() => handleSelected('renter')}
            type="renter"
            isActive={userType === 'renter'}
          />
          <NewUserJourneyButton
            text="I have a room to rent"
            icon="home-door"
            onPress={() => handleSelected('lessor')}
            type="lessor"
            isActive={userType === 'lessor'}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: size(100),
    gap: size(30),
  },
});

export default NewUserJourneyScreen;
