import React, { useEffect } from 'react';
import { View, SafeAreaView, StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native';

// Components 🦾
import BackButton from 'components/buttons/BackButton';
import {CoreButton} from 'components/buttons/CoreButton';
import {RegistrationBackground} from 'assets';
import LofftIcon from 'components/lofftIcons/LofftIcon';
import HeadlineContainer from 'components/containers/HeadlineContainer';

// Stylesheets 🖼️
import {fontStyles} from 'styleSheets/fontStyles';
import Color from 'styleSheets/lofftColorPallet.json';
import { useNavigation } from '@react-navigation/native';
import { CoreStyleSheet } from 'styleSheets/CoreDesignStyleSheet';

// Redux 🧠
import {useSignOutMutation} from 'reduxFeatures/auth/authApi';
import {useGetUserQuery} from 'reduxFeatures/user/userApi';

// Types 🏷 ️
import {NewUserJourneyStackNavigation} from '../../navigationStacks/types';

// Helpers 🥷🏻
import {size} from 'react-native-responsive-sizes';

const ConfirmEmailScreen = () => {
  const { data, error, isLoading, refetch } = useGetUserQuery();
  const emailConfirmed = data?.user.confirmedEmail;
  const [signOut] = useSignOutMutation();
  const navigation = useNavigation<NewUserJourneyStackNavigation>();

  console.log(emailConfirmed);
  const handleSignOut = () => {
    signOut();
  };

  useEffect(() => {
    if (error) {
      console.log('Error fetching user profile:', error);
    }
  }, [error]);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Error fetching profile!</Text>;
  }

  return(
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
            headlineText={emailConfirmed ? "Let's Go 🚀" : 'Almost Ready ...'}
            subDescription={
              emailConfirmed ? 'Huston, we got your confirmation' : 'Please confirm your account via your email'
            }
          />
          <View style={styles.iconContainer}>
          {emailConfirmed ? (
            <View style={styles.postiveIconContainer}>
              <LofftIcon
                name="check-verified-02"
                size={65}
                color={Color.Mint[100]}
              />
              <Text style={[fontStyles.bodyMedium, styles.iconSubTextPostive]}>Email Confirmed</Text>
              </View>
            ) : (
              <TouchableOpacity
                onPress={() => refetch()}
                style={styles.refreshButtonContainer}
              >
                <LofftIcon
                  name="refresh-ccq-03"
                  size={33}
                  color={Color.White[100]}
                />
                <Text style={[fontStyles.bodyMedium, styles.iconSubText]}>
                  I have confirmed my email
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <CoreButton
        disabled={!emailConfirmed}
        value={emailConfirmed ? 'Continue' : 'eMail not confirmed'}
        onPress={() => navigation.navigate('NewUserJourney')}
         />
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: size(100),
    gap: size(20),
  },
  iconContainer: {
    alignItems: 'center',
    marginTop: size(150),
  },
  iconSubText: {
    marginLeft: 10,
    color: Color.White[100],
  },
  refreshButtonContainer: {
    backgroundColor: Color.Lavendar[100],
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  postiveIconContainer: {
    textAlign: 'center',
    alignItems: 'center',
  },
  iconSubTextPostive: {
    color: Color.Black[100],
    marginTop: 10,
  }
});

export default ConfirmEmailScreen;
