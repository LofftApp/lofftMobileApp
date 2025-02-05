import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  useWindowDimensions,
} from 'react-native';

// Redux 🏗️
import {useGetFavoritesAdvertsQuery} from 'reduxFeatures/adverts/advertApi';
import {useGetUserQuery} from 'reduxFeatures/user/userApi';

// Styles 🖼️
import {fontStyles} from 'styleSheets/fontStyles';
import Color from 'styleSheets/lofftColorPallet.json';
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';

// Assets 🪴
import LofftIcon from 'components/lofftIcons/LofftIcon';

// Screens 📺
import FavoritesSubScreen from './SubScreens/FavoritesSubScreen';

// Components  🪢
import LoadingComponent from 'components/LoadingAndNotFound/LoadingComponent';
import {CoreButton} from 'components/buttons/CoreButton';
import Popover, {
  PopoverMode,
  PopoverPlacement,
  Rect,
} from 'react-native-popover-view';

// Helpers 🥷 🏻
import {size} from 'react-native-responsive-sizes';
import PopoverContent from 'components/modals/CustomPopover';

const FIRST_APPLY_KEY = 'hasShownFirstApply';

const FavoritesScreen = () => {
  const {data, isLoading, isError} = useGetFavoritesAdvertsQuery();
  const favorites = data?.favorites;
  const {data: currentUser} = useGetUserQuery();
  const credits = currentUser?.credits;
  const {height, width} = useWindowDimensions();

  // Popover state
  const [showPopover, setShowPopover] = useState(false);
  const [hasCheckedStorage, setHasCheckedStorage] = useState(false);

  // Check if any favorite has been applied
  const isApplied = favorites?.some(favorite => favorite.applied);

  useEffect(() => {
    // Check AsyncStorage for first-time display of popover (only once)
    const checkFirstApply = async () => {
      try {
        const hasShown = await AsyncStorage.getItem(FIRST_APPLY_KEY);
        console.log('hasShown:', hasShown);
        if (!hasShown && isApplied) {
          setShowPopover(true);
          await AsyncStorage.setItem(FIRST_APPLY_KEY, 'true');
        }
        setHasCheckedStorage(true);
      } catch (error) {
        console.error('Error checking popover state:', error);
        setHasCheckedStorage(true);
      }
    };

    if (!hasCheckedStorage && favorites) {
      checkFirstApply();
    }
  }, [favorites, isApplied, hasCheckedStorage]);
  console.log('isApplied:', isApplied);
  console.log('hasCheckedStorage:', hasCheckedStorage);

  useEffect(() => {
    if (isApplied && hasCheckedStorage) {
      setShowPopover(true);
    }
  }, [isApplied, hasCheckedStorage]);
  useEffect(() => {
    console.log('showPopover:', showPopover);
  }, [showPopover]);

  if (isLoading) {
    return <LoadingComponent />;
  }
  return (
    <SafeAreaView
      style={CoreStyleSheet.safeAreaViewListContainer}
      testID="favorites-screen">
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
        popoverStyle={[
          styles.popoverContainer,
          {width: width * 0.95, height: height * 0.14},
        ]}
        from={new Rect(width * 0.29, height * 0.9, 0, 0)}
        isVisible={showPopover}
        placement={PopoverPlacement.TOP}
        onRequestClose={() => setShowPopover(false)}>
        <PopoverContent
          text1={'Applied. You can find the listings in My Applications.'}
          icon1="check-verified-02"
          text2={`Remaning Tokens: ${credits}`}
          icon2="wallet"
          setShowPopover={setShowPopover}
          button
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  popoverContent: {
    flex: 1,
    paddingHorizontal: size(8),
    justifyContent: 'center',
    gap: size(10),
  },
  popoverText: {flexDirection: 'row', alignItems: 'center', gap: size(5)},

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
