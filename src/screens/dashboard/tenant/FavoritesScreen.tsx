import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';

// Styles 🖼️
import {fontStyles} from 'styleSheets/fontStyles';
import Color from 'styleSheets/lofftColorPallet.json';

// assets 🛠️
import {Looking} from '../../../assets';
import {useGetFavoritesAdvertsQuery} from 'reduxFeatures/adverts/advertApi';
import LoadingComponent from 'components/LoadingAndNotFound/LoadingComponent';
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';
import FavoritesSubScreen from './SubScreens/FavoritesSubScreen';
import Popover, {
  PopoverMode,
  PopoverPlacement,
  Rect,
} from 'react-native-popover-view';
import {size} from 'react-native-responsive-sizes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CoreButton} from 'components/buttons/CoreButton';
import {useGetUserQuery} from 'reduxFeatures/user/userApi';

const FIRST_APPLY_KEY = 'hasShownPopover';

const FavoritesScreen = () => {
  const {data, isLoading, isError} = useGetFavoritesAdvertsQuery();
  const favorites = data?.favorites;
  const {data: currentUser} = useGetUserQuery();
  const credits = currentUser?.credits;
  const [showPopover, setShowPopover] = useState(false); // Popover visibility state
  const [hasCheckedStorage, setHasCheckedStorage] = useState(false);

  // Determine if any favorite has been applied
  // const isApplied = favorites?.some(favorite => favorite.applied);

  // useEffect(() => {
  //   // Check AsyncStorage for first-time display of popover
  //   const checkFirstApply = async () => {
  //     try {
  //       const hasShown = await AsyncStorage.getItem(FIRST_APPLY_KEY);
  //       if (!hasShown && isApplied) {
  //         setShowPopover(true); // Show the popover
  //         await AsyncStorage.setItem(FIRST_APPLY_KEY, 'true');
  //       }
  //       setHasCheckedStorage(true); // Mark as checked
  //     } catch (error) {
  //       console.error('Error checking popover state:', error);
  //       setHasCheckedStorage(true);
  //     }
  //   };

  //   if (!hasCheckedStorage && favorites) {
  //     checkFirstApply();
  //   }
  // }, [favorites, isApplied, hasCheckedStorage]);

  // useEffect(() => {

  //   if (isApplied && hasCheckedStorage) {
  //     setShowPopover(true);
  //   }
  // }, [isApplied, hasCheckedStorage]);
    // Check if any favorite is applied (testing)
    const isApplied = favorites?.some(favorite => favorite.applied);

    useEffect(() => {
      if (isApplied) {
        setShowPopover(true);
      }
    }, [isApplied]);
  // console.log('Favorites>>>>>>>>>>>>', favorites);
  if (isLoading) {
    return <LoadingComponent />;
  }
  return (
    <SafeAreaView style={CoreStyleSheet.safeAreaViewListContainer}>
      <View style={CoreStyleSheet.headerContainer}>
        <Text style={fontStyles.headerLarge}>Saved Listings</Text>
      </View>
      <View style={CoreStyleSheet.screenContainer}>
        <FavoritesSubScreen
          favorites={favorites ?? []}
          isLoading={isLoading}
          isError={isError}
        />
      </View>
      <Popover
        mode={PopoverMode.TOOLTIP}
        popoverStyle={styles.popoverContainer}
        from={new Rect(size(120), size(800), 0, 0)}
        isVisible={showPopover}
        placement={PopoverPlacement.TOP}
        onRequestClose={() => setShowPopover(false)}>
        <View style={styles.popoverContent}>
          <Text style={fontStyles.bodyTiny}>
            ✅ Applied. You can find the listings in "My Applications" tab. ⚡️
            Remaining Tokens: {credits}
          </Text>
        </View>
        <CoreButton
          value="Got it"
          onPress={() => setShowPopover(false)}
          style={styles.buttonStyle}
          textSize={fontStyles.bodyTiny}
        />
      </Popover>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  popoverContainer: {
    backgroundColor: Color.Mint[20],
    paddingHorizontal: size(10),
    borderRadius: 12,
    borderColor: Color.Mint[20],
    width: size(385),
    height: size(90),
    flexDirection: 'row',
    alignItems: 'center',
  },
  popoverContent: {
    alignItems: 'center',
    paddingHorizontal: size(8),
  },
  buttonStyle: {
    backgroundColor: Color.Lavendar[100],
    borderColor: Color.Lavendar[100],
    borderRadius: 12,

    borderWidth: 2,
    width: size(70),
    height: size(41),
  },
});

export default FavoritesScreen;
