import React, {useMemo, useState} from 'react';
import {View, Text, StyleSheet, Pressable, SafeAreaView} from 'react-native';

// Redux 🏗️
import {useAppSelector} from 'reduxCore/hooks';
import {useGetApplicationsQuery} from 'reduxFeatures/applications/applicationApi';

// Screens 📺
import ListFlatApplicationComponent from './SubScreens/ListFlatApplicationComponent';

// Components 🪢
import HeaderPageContentSwitch from 'components/buttons/HeaderPageContentSwitch';

// StyleSheets 🖼️
import {fontStyles} from 'styleSheets/fontStyles';
import Color from 'styleSheets/lofftColorPallet.json';

// helpers 🧰
import LofftIcon from 'components/lofftIcons/LofftIcon';
import {applicationPartition} from 'helpers/applicationsPartition';
import {size} from 'react-native-responsive-sizes';
import { logWithLocation } from 'helpers/logWithLocation';

const ApplicationIndexScreen = () => {
  const currentUser = useAppSelector(state => state.user.user);
  const userType = currentUser.userType;

  const {data: applications, error, isLoading} = useGetApplicationsQuery();
  logWithLocation('applications>>>>>>>', applications);

  const [screen, setScreen] = useState('thumbs-up');

  const setActiveScreen = (activeScreen: string) => {
    setScreen(activeScreen);
  };

  const [activeApplications, inactiveApplications] = useMemo(() => {
    return applicationPartition(applications ?? []);
  }, [applications]);

  if (isLoading) {
    return (
      <View style={styles.pageContainer}>
        <SafeAreaView style={styles.loadingErrorContainer}>
          <Text style={fontStyles.headerSmall}>Loading...</Text>
        </SafeAreaView>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.pageContainer}>
        <SafeAreaView style={styles.loadingErrorContainer}>
          <Text style={fontStyles.headerSmall}>
            There was an error getting your applications
          </Text>
        </SafeAreaView>
      </View>
    );
  }

  return (
    <View style={styles.pageContainer}>
      <SafeAreaView style={styles.headerText}>
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
      </SafeAreaView>
      {userType !== 'lessor' && (
        <HeaderPageContentSwitch
          toggleNames={['Active', 'Inactive']}
          toggleIcons={['thumbs-up', 'thumbs-down']}
          markers={['thumbs-up', 'thumbs-down']}
          activeScreen={screen}
          setActiveScreen={setActiveScreen}
        />
      )}
      <View style={styles.viewContainer}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    backgroundColor: Color.White[100],
    flex: 1,
  },
  viewContainer: {
    flex: 1,
  },

  inputField: {
    flex: 1,
  },
  headerText: {
    marginHorizontal: size(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: size(10),
  },
  addButton: {
    paddingVertical: size(7),
    paddingHorizontal: size(12),
    borderRadius: 12,
  },
  actionContainer: {
    flexDirection: 'row',
  },
  marginRight: {
    marginRight: size(20),
  },
  loadingErrorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ApplicationIndexScreen;
