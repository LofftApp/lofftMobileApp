import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

// Redux 🏗️
import {useAppSelector} from '@ReduxCore/hooks';
import {createSelector} from '@reduxjs/toolkit';
// Screens 📺
import FlatListComponent from '@Screens/dashboard/renter/SubScreens/FlatListComponent';

// Components 🪢
import HeaderPageContentSwitch from '@Components/buttons/HeaderPageContentSwitch';

// StyleSheets 🖼️
import {fontStyles} from '@StyleSheets/fontStyles';
import Color from '@StyleSheets/lofftColorPallet.json';
// helpers 🧰
import {advertPartition} from '@Helpers/advertPartition';
import LofftIcon from '@Components/lofftIcons/LofftIcon';

const ApplicationIndexScreen = ({navigation}: any) => {
  const getUserType = (state: any) => state.user.user.userType;
  const getAdverts = (state: any) => state.adverts.adverts;

  const selectUserTypeAndAdverts = createSelector(
    [getUserType, getAdverts],
    (userType, adverts) => {
      let userAdverts = adverts;
      if (userType === 'tenant') {
        userAdverts = userAdverts.filter((advert: any) => advert.applied);
      }
      return [userType, userAdverts];
    },
  );

  const [userType, adverts] = useAppSelector(selectUserTypeAndAdverts);

  const [activeAdverts, inactiveAdverts] = advertPartition(adverts);

  const [screen, setScreen] = useState('thumbs-up');

  const setActiveScreen = (screen: string) => {
    setScreen(screen);
  };

  return (
    <View style={styles.pageContainer}>
      <View style={styles.headerText}>
        {userType === 'lessor' ? (
          <>
            <Text style={fontStyles.headerLarge}>My Listings</Text>
            <View style={styles.actionContainer}>
              <Pressable style={[styles.addButton, {marginRight: 15}]}>
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
      {userType === 'lessor' ? null : (
        <HeaderPageContentSwitch
          toggleNames={['Active', 'Inactive']}
          toggleIcons={['thumbs-up', 'thumbs-down']}
          markers={['thumbs-up', 'thumbs-down']}
          activeScreen={screen}
          setActiveScreen={(screen: string) => setActiveScreen(screen)}
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
    marginVertical: 15,
    position: 'relative',
  },

  inputField: {
    flex: 1,
  },
  searchContainer: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    marginTop: 68, // Needs to be added to core view file, though not working when built
  },
  headerText: {
    marginTop: 70,
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addButton: {
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  actionContainer: {
    flexDirection: 'row',
  },
});

export default ApplicationIndexScreen;
