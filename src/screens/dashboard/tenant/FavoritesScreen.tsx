import React from 'react';
import {View, Text, StyleSheet, useWindowDimensions} from 'react-native';

// Redux 🏗️
import {useGetFavoritesAdvertsQuery} from 'reduxFeatures/adverts/advertApi';
import {useGetUserQuery} from 'reduxFeatures/user/userApi';
import {useAutoPopoverTrigger} from 'reduxFeatures/settings/useAutomaticPopoverTrigger';

// Styles 🖼️
import {fontStyles} from 'styleSheets/fontStyles';
import Color from 'styleSheets/lofftColorPallet.json';
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';

// Screens 📺
import FavoritesSubScreen from './SubScreens/FavoritesSubScreen';

// Components  🪢
import LoadingComponent from 'components/LoadingAndNotFound/LoadingComponent';
import PopoverContent from 'components/modals/PopoverContent';

// Lib 📚
import Popover, {
  PopoverMode,
  PopoverPlacement,
  Rect,
} from 'react-native-popover-view';
// Helpers 🥷 🏻
import {size} from 'react-native-responsive-sizes';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const FavoritesScreen = () => {
  const {data, isLoading, isError} = useGetFavoritesAdvertsQuery();
  const {data: currentUser} = useGetUserQuery();
  const {height, width} = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const credits = currentUser?.credits;
  const favorites = data?.favorites;
  const isApplied = favorites?.some(favorite => favorite.applied);

  const {showPopover, setShowPopover} = useAutoPopoverTrigger({
    userId: currentUser?.id ?? 0,
    key: 'firstApply',
    condition: isApplied ?? false,
  });

  if (isLoading) {
    return <LoadingComponent />;
  }
  return (
    <View
      testID="favorites-screen"
      style={[
        CoreStyleSheet.safeAreaViewShowContainer,
        {
          paddingTop: insets.top,
        },
      ]}>
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
        popoverStyle={[
          styles.popoverContainer,
          {width: width * 0.95, height: height * 0.15},
        ]}
        from={new Rect(width * 0.29, height * 0.9, 0, 0)}
        isVisible={showPopover}
        placement={PopoverPlacement.TOP}
        onRequestClose={() => setShowPopover(false)}>
        <PopoverContent
          text1={'Applied. You can find the listings in My Applications.'}
          icon1="check-verified-02"
          text2={`Remaning Tokens ${credits}`}
          icon2="wallet"
          setShowPopover={setShowPopover}
          button
        />
      </Popover>
    </View>
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
