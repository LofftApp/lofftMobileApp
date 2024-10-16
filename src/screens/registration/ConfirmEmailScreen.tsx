import React, { useEffect } from 'react';
import { View, SafeAreaView, StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native';

// Components 🦾
import BackButton from 'components/buttons/BackButton';
import { CoreButton } from 'components/buttons/CoreButton';
import { RegistrationBackground } from 'assets';
import LofftIcon from 'components/lofftIcons/LofftIcon';
import HeadlineContainer from 'components/containers/HeadlineContainer';

// Stylesheets 🖼️
import { fontStyles } from 'styleSheets/fontStyles';
import Color from 'styleSheets/lofftColorPallet.json';
import { useNavigation } from '@react-navigation/native';
import { CoreStyleSheet } from 'styleSheets/CoreDesignStyleSheet';

// Redux 🧠
import { useSignOutMutation } from 'reduxFeatures/auth/authApi';
import { useGetUserQuery } from 'reduxFeatures/user/userApi';

// Types 🏷 ️
import { NewUserJourneyStackNavigation } from '../../navigationStacks/types';

// Helpers 🥷🏻
import { size } from 'react-native-responsive-sizes';

const ConfirmEmailScreen = () => {
  const { data, error, isLoading, refetch } = useGetUserQuery();

  const emailConfirmed = data?.user?.confirmedEmail || false;
  const [signOut] = useSignOutMutation();
  const navigation = useNavigation<NewUserJourneyStackNavigation>();

  useEffect(() => {
    if (error) {
      console.error('Error fetching user profile:', error);
    }
  }, [error]);

  const handleSignOut = () => {
    signOut();
  };

  if (isLoading) {
    return (
      <SafeAreaView style={CoreStyleSheet.safeAreaViewShowContainer}>
        <ActivityIndicator size="large" color={Color.White[100]} />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={CoreStyleSheet.safeAreaViewShowContainer}>
        <Text>Error fetching profile!</Text>
      </SafeAreaView>
    );
  }

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
            headlineText={emailConfirmed ? "Let's Go 🚀" : 'Almost Ready ...'}
            subDescription={
              emailConfirmed
                ? 'Huston, we got your confirmation'
                : 'Please confirm your account via your email'
            }
          />
          <View style={styles.iconContainer}>
            {isLoading ? (
              <ActivityIndicator size="large" color={Color.Black[100]} />
            ) : emailConfirmed ? (
              <View style={styles.positiveIconContainer}>
                <LofftIcon
                  name="check-verified-02"
                  size={65}
                  color={Color.Mint[100]}
                />
                <Text style={[fontStyles.bodyMedium, styles.iconSubTextPositive]}>
                  Email Confirmed
                </Text>
              </View>
            ) : (
              <TouchableOpacity
                onPress={refetch}
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
          value={emailConfirmed ? 'Continue' : 'Email not confirmed'}
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
  positiveIconContainer: {
    textAlign: 'center',
    alignItems: 'center',
  },
  iconSubTextPositive: {
    color: Color.Black[100],
    marginTop: 10,
  },
});

export default ConfirmEmailScreen;
