import React, {useMemo, useState} from 'react';
import {View, Text, SafeAreaView, Pressable} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Redux 🏗️
import {useGetApplicationsQuery} from 'reduxFeatures/applications/applicationApi';

// Screens 📺
import ListFlatApplicationComponent from './SubScreens/ListFlatApplicationComponent';

// Components 🪢
import HeaderPageContentSwitch from 'components/buttons/HeaderPageContentSwitch';
import LofftIcon from 'components/lofftIcons/LofftIcon';

// StyleSheets 🖼️
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';
import Color from 'styleSheets/lofftColorPallet.json';

// helpers 🧰
import {applicationPartition} from 'helpers/applicationsPartition';

// types 🦄
import { ApplicationStackParamsList } from 'navigationStacks/types';
import { useTheme } from 'components/themes/ThemeContext';
import { createFontStyles } from 'styleSheets/fontStylesTest';

type ApplicationNavigationProp = NativeStackNavigationProp<ApplicationStackParamsList>;


const ApplicationsIndexScreen = () => {
  const {data: applications, isError, isLoading} = useGetApplicationsQuery(
    undefined,
    {
      refetchOnMountOrArgChange: true,

    },
  );
  const navigation =  useNavigation<ApplicationNavigationProp>();
  const [screen, setScreen] = useState('thumbs-up');

  const setActiveScreen = (activeScreen: string) => {
    setScreen(activeScreen);
  };

  const [activeApplications, inactiveApplications] = useMemo(() => {
    return applicationPartition(applications ?? []);
  }, [applications]);

  const coreStyles = CoreStyleSheet();
  const {isDarkMode}: any = useTheme();
  const colors = isDarkMode ? Color.Dark : Color.Light;
  const fontStyles = createFontStyles(isDarkMode);

  return (
    <SafeAreaView style={coreStyles.safeAreaViewListContainer}>
      <View style={coreStyles.headerContainer}>
        <Text style={fontStyles.headerLarge}>My Applications</Text>
        <Pressable onPress={() => navigation.navigate('ChatroomsNavigator', { screen: 'ChatIndex' })}>
            <LofftIcon
              name={'annotation-heart'}
              size={33}
              color={colors.Lavendar[100]}
            />
          </Pressable>
      </View>

      <HeaderPageContentSwitch
        toggleNames={['Active', 'Inactive']}
        toggleIcons={['thumbs-up', 'thumbs-down']}
        markers={['thumbs-up', 'thumbs-down']}
        activeScreen={screen}
        setActiveScreen={setActiveScreen}
      />

      <View style={coreStyles.screenContainer}>
        <ListFlatApplicationComponent
          applications={
            screen === 'thumbs-down' ? inactiveApplications : activeApplications
          }
          isLoading={isLoading}
          isError={isError}
        />
      </View>
    </SafeAreaView>
  );
};

export default ApplicationsIndexScreen;
