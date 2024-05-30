import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

// Redux 🏗️
import {useAppSelector} from 'reduxCore/hooks';
import {createSelector} from '@reduxjs/toolkit';

// Screens 📺
import FlatListComponent from 'screens/dashboard/renter/SubScreens/FlatListComponent';

// Components 🪢
import HeaderPageContentSwitch from 'components/buttons/HeaderPageContentSwitch';

// StyleSheets 🖼️
import {fontStyles} from 'styleSheets/fontStyles';
import Color from 'styleSheets/lofftColorPallet.json';

// helpers 🧰
import {advertPartition} from 'helpers/advertPartition';
import LofftIcon from 'components/lofftIcons/LofftIcon';
import {size} from 'react-native-responsive-sizes';

// Types 🏷
import type {ApplicationIndexScreenProp} from './types';
import type {UserState} from 'reduxFeatures/user/types';
import type {AdvertState, Advert} from 'reduxFeatures/adverts/types';

const ApplicationIndexScreen = ({navigation}: ApplicationIndexScreenProp) => {
  const getUserType = (state: {user: UserState}) => state.user.user.userType;

  const getAdverts = (state: {adverts: AdvertState}) => {
    console.log(state.adverts.adverts);
    return state.adverts.adverts;
  };

  const selectUserTypeAndAdverts = createSelector(
    [getUserType, getAdverts],
    (userType, adverts): [string | null, Advert[]] => {
      let userAdverts = adverts;
      if (userType === 'tenant') {
        userAdverts = userAdverts.filter(advert => advert.applied);
      }
      return [userType, userAdverts];
    },
  );

  const [userType, adverts] = useAppSelector(selectUserTypeAndAdverts);

  const [activeAdverts, inactiveAdverts] = advertPartition(adverts);

  const [screen, setScreen] = useState('thumbs-up');

  const setActiveScreen = (activeScreen: string) => {
    setScreen(activeScreen);
  };

  return (
    <View style={styles.pageContainer}>
      <View style={styles.headerText}>
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
      <View style={styles.viewContainer}>
        <FlatListComponent
          // ! Thumbs down is ambiguous, please rename
          adverts={
            userType === 'lessor'
              ? adverts
              : screen === 'thumbs-down'
              ? inactiveAdverts
              : activeAdverts
          }
          navigation={navigation}
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
    marginVertical: size(15),
    position: 'relative',
  },

  inputField: {
    flex: 1,
  },
  searchContainer: {
    paddingHorizontal: size(16),
    flexDirection: 'row',
    marginTop: size(68), // Needs to be added to core view file, though not working when built
  },
  headerText: {
    marginTop: size(70),
    marginHorizontal: size(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
});

export default ApplicationIndexScreen;
