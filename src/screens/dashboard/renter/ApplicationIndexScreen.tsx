import React, {useMemo, useState} from 'react';
import {View, Text, StyleSheet, Pressable, SafeAreaView} from 'react-native';

// Redux 🏗️
import {useAppSelector} from 'reduxCore/hooks';
import {useGetApplicationsQuery} from 'reduxFeatures/applications/applicationApi';

// Screens 📺
import ListFlatApplicationComponent from './SubScreens/ListFlatApplicationComponent';

// Components 🪢
import HeaderPageContentSwitch from 'components/buttons/HeaderPageContentSwitch';
import LoadingComponent from 'components/LoadingAndNotFound/LoadingComponent';
import NotFoundComponent from 'components/LoadingAndNotFound/NotFoundComponent';

// StyleSheets 🖼️
import {fontStyles} from 'styleSheets/fontStyles';
import Color from 'styleSheets/lofftColorPallet.json';
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';

// helpers 🧰
import LofftIcon from 'components/lofftIcons/LofftIcon';
import {applicationPartition} from 'helpers/applicationsPartition';
import {size} from 'react-native-responsive-sizes';

const ApplicationIndexScreen = () => {
  const currentUser = useAppSelector(state => state.user.user);
  const userType = currentUser.userType;

  const {data: applications, error, isLoading} = useGetApplicationsQuery();
  console.log('applications', applications);

  const [screen, setScreen] = useState('thumbs-up');

  const setActiveScreen = (activeScreen: string) => {
    setScreen(activeScreen);
  };

  const [activeApplications, inactiveApplications] = useMemo(() => {
    return applicationPartition(applications ?? []);
  }, [applications]);

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (error) {
    return (
      <NotFoundComponent
        backButton
        message="There was an error getting your applications"
      />
    );
  }

  return (
    <SafeAreaView style={CoreStyleSheet.safeAreaViewListContainer}>
      <View style={CoreStyleSheet.headerContainer}>
        {userType === 'lessor' ? (
          <>
            <Text style={fontStyles.headerLarge}>My Listings</Text>
            <View style={styles.actionContainer}>
              <Pressable style={[styles.addButton, styles.marginRight]}>
                <LofftIcon
                  name="message-circle"
                  size={33}
                  color={Color.Lavendar[100]}
                />
              </Pressable>
              <Pressable style={styles.addButton}>
                <LofftIcon name="plus" size={33} color={Color.Lavendar[100]} />
              </Pressable>
            </View>
          </>
        ) : (
          <>
            <Text style={fontStyles.headerLarge}>My Applications</Text>
          </>
        )}
      </View>
      {userType !== 'lessor' && (
        <HeaderPageContentSwitch
          toggleNames={['Active', 'Inactive']}
          toggleIcons={['thumbs-up', 'thumbs-down']}
          markers={['thumbs-up', 'thumbs-down']}
          activeScreen={screen}
          setActiveScreen={setActiveScreen}
        />
      )}
      <View style={CoreStyleSheet.screenContainer}>
        <ListFlatApplicationComponent
          applications={
            userType === 'lessor'
              ? applications ?? []
              : screen === 'thumbs-down'
              ? inactiveApplications
              : activeApplications
          }
          isLessor={userType === 'lessor'}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    backgroundColor: Color.White[100],
    flex: 1,
  },
  actionContainer: {
    flexDirection: 'row',
  },

  inputField: {
    flex: 1,
  },

  addButton: {
    paddingVertical: size(7),
    paddingHorizontal: size(12),
    borderRadius: 12,
  },

  marginRight: {
    marginRight: size(20),
  },
});

export default ApplicationIndexScreen;
