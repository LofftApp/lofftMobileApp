import React from 'react';
import {View, Text, StyleSheet, Pressable, SafeAreaView} from 'react-native';

// Screens 📺
import ListFlatApplicationComponent from '../tenant/SubScreens/ListFlatApplicationComponent';

// Helpers 🧰
import {size} from 'react-native-responsive-sizes';

// Redux
import {useGetAdvertsQuery} from 'reduxFeatures/adverts/advertApi';

// StyleSheets 🖼️
import * as Color from 'styleSheets/lofftColorPallet.json';
import { useTheme } from 'components/themes/ThemeContext';
import { createFontStyles } from 'styleSheets/fontStyles';

// Assets
import LofftIcon from 'components/lofftIcons/LofftIcon';
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';
import { useNavigation } from '@react-navigation/native';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamsList } from 'navigationStacks/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamsList>;

const LessorIndexScreen = () => {
   //CoreStyles
  const coreStyles = CoreStyleSheet();
  const {isDarkMode} = useTheme();
  const colors = isDarkMode ? Color.Dark : Color.Light;
  const fontStyles = createFontStyles(isDarkMode);

  const {data, isError, isLoading} = useGetAdvertsQuery(undefined);
  const navigation = useNavigation<NavigationProp>();
  const adverts = data?.adverts;

  return (
    <SafeAreaView style={coreStyles.safeAreaViewListContainer}>
      <View style={coreStyles.headerContainer}>
        <Text style={fontStyles.headerLarge}>My Listings</Text>
        <View style={styles.actionContainer}>
          <Pressable onPress={() => navigation.navigate('ChatroomsNavigator', { screen: 'ChatIndex' })} style={styles.addButton}>
            <LofftIcon
              name={'annotation-heart'}
              size={33}
              color={colors.Lavendar[100]}
            />
          </Pressable>
          <Pressable style={styles.addButton}>
            <LofftIcon name={'plus'} size={33} color={colors.Lavendar[100]} />
          </Pressable>
        </View>
      </View>

      <View style={coreStyles.screenContainer}>
        <ListFlatApplicationComponent
          adverts={adverts}
          isLoading={isLoading}
          isError={isError}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  addButton: {
    paddingHorizontal: size(12),
    borderRadius: 12,
  },
  actionContainer: {
    flexDirection: 'row',
  },
});

export default LessorIndexScreen;
