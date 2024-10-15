

import { RegistrationBackground } from 'assets';
import { CoreButton } from 'components/buttons/CoreButton';
import HeadlineContainer from 'components/containers/HeadlineContainer';
import LofftIcon from 'components/lofftIcons/LofftIcon';
import React, { useEffect } from 'react';
import { View, SafeAreaView, StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { size } from 'react-native-responsive-sizes';
import { CoreStyleSheet } from 'styleSheets/CoreDesignStyleSheet';
// Stylesheets 🖼️
import {fontStyles} from 'styleSheets/fontStyles';
import Color from 'styleSheets/lofftColorPallet.json';

// RTK
import { useGetUserQuery } from 'reduxFeatures/user/userApi';
import BackButton from 'components/buttons/BackButton';

// Redux 🧠
import {useSignOutMutation} from 'reduxFeatures/auth/authApi';

const ConfirmEmailScreen = () => {
  const { data, error, isLoading, refetch } = useGetUserQuery();
  const emailConfirmed = data.user.confirmedEmail;
  const [signOut] = useSignOutMutation();

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
            headlineText={'Almost Ready ...'}
            subDescription={
              'Please head to your email to confirm your account'
            }
          />
          <View style={styles.iconContainer}>
            <TouchableOpacity
            onPress={() => refetch()}
            style={styles.refreshButtonContainer}>
              <LofftIcon
              name="refresh-ccq-03"
              size={33}
              color={Color.White[100]} />
              <Text style={[fontStyles.bodyMedium,styles.iconSubText]}>Refresh</Text>
            </TouchableOpacity>
          </View>
        </View>

        <CoreButton disabled={!emailConfirmed} value={emailConfirmed ? 'Continue' : 'eMail not confirmed'} />
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
});

export default ConfirmEmailScreen;
