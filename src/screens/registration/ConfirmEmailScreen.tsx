import React, {useEffect, useRef, useState} from 'react';
import {View, SafeAreaView, StyleSheet, ActivityIndicator} from 'react-native';

// Components 🦾
import BackButton from 'components/buttons/BackButton';
import {CoreButton} from 'components/buttons/CoreButton';
import {RegistrationBackground} from 'assets';
import HeadlineContainer from 'components/containers/HeadlineContainer';

// Stylesheets 🖼️
import Color from 'styleSheets/lofftColorPallet.json';
import {useNavigation} from '@react-navigation/native';
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';
import NotFoundComponent from 'components/LoadingAndNotFound/NotFoundComponent';

// Redux 🧠
import {useSignOutMutation} from 'reduxFeatures/auth/authApi';
import {useGetUserQuery} from 'reduxFeatures/user/userApi';
import { useSelector } from 'react-redux';
import { RootState } from 'reduxCore/store';

// Types 🏷 ️
import {NewUserJourneyStackNavigation} from '../../navigationStacks/types';

// Helpers 🥷🏻
import {size} from 'react-native-responsive-sizes';
import IconButton from 'components/buttons/IconButton';
import LoadingComponent from 'components/LoadingAndNotFound/LoadingComponent';
import ErrorMessage from 'components/LoadingAndNotFound/ErrorMessage';

const ConfirmEmailScreen = () => {
  const {data, isError, isLoading, refetch} = useGetUserQuery();
  const emailConfirmed = data?.confirmedEmail;
  const confirmRef = useRef(emailConfirmed);
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const colors = isDarkMode ? Color.Dark : Color.Light;
  const coreStyles = CoreStyleSheet();

  const [error, setError] = useState('');

  const [signOut] = useSignOutMutation();
  const navigation = useNavigation<NewUserJourneyStackNavigation>();

  useEffect(() => {
    const timer = setTimeout(() => {
      setError('');
    }, 5000);
    return () => clearTimeout(timer);
  }, [error]);

  const handleSignOut = () => {
    signOut();
  };

  const handleRefresh = async () => {
    const result = await refetch();
    if (confirmRef.current === result.data?.confirmedEmail) {
      setError('Email was not confirmed yet. Please confirm it and try again');
    }
  };

  const handleContinue = () => {
    navigation.navigate('NewUserJourney');
  };

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (isError) {
    return <NotFoundComponent message="Error while getting profile" />;
  }

  const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      justifyContent: 'flex-start',
      paddingTop: size(100),
      gap: size(20),
    },
    iconContainer: {
      alignItems: 'center',
      marginTop: size(50),
    },
    iconSubText: {
      marginLeft: size(10),
      color: colors.White[100],
    },

    positiveIconContainer: {
      textAlign: 'center',
      alignItems: 'center',
    },
    iconSubTextPositive: {
      color: colors.Black[100],
      marginTop: 10,
    },
  });

  return (
    <SafeAreaView style={coreStyles.safeAreaViewShowContainer}>
      <BackButton onPress={handleSignOut} />
      <RegistrationBackground
        height="100%"
        width="100%"
        style={coreStyles.backgroundImage}
      />
      <View style={coreStyles.screenContainer}>
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
              <ActivityIndicator size="large" color={colors.Black[100]} />
            ) : emailConfirmed ? (
              <IconButton
                icon="check-verified-02"
                iconSize={65}
                text="Email confirmed"
                isActive
                color={colors.Mint[100]}
                onPress={() => {}}
              />
            ) : (
              <View>
                <IconButton
                  icon="refresh-ccq-03"
                  iconSize={33}
                  text="I have confirmed my email"
                  onPress={handleRefresh}
                  isActive={true}
                  color={colors.Tomato[100]}
                />
                <ErrorMessage message={error} />
              </View>
            )}
          </View>
        </View>
        {emailConfirmed && (
          <CoreButton
            disabled={!emailConfirmed}
            value={emailConfirmed ? 'Continue' : 'Email not confirmed'}
            onPress={handleContinue}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default ConfirmEmailScreen;
