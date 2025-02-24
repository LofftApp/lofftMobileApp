import React, {useMemo, useState} from 'react';
import {View, Text, SafeAreaView, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

// Redux 🏗️
import {useGetApplicationsQuery} from 'reduxFeatures/applications/applicationApi';

// Screens 📺
import ListFlatApplicationComponent from './SubScreens/ListFlatApplicationComponent';

// Components 🪢
import HeaderPageContentSwitch from 'components/buttons/HeaderPageContentSwitch';
import LofftIcon from 'components/lofftIcons/LofftIcon';

// StyleSheets 🖼️
import {fontStyles} from 'styleSheets/fontStyles';
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';
import Color from 'styleSheets/lofftColorPallet.json';

// helpers 🧰
import {applicationPartition} from 'helpers/applicationsPartition';

// types 🦄
import {ApplicationStackParamsList} from 'navigationStacks/types';

type ApplicationNavigationProp =
  NativeStackNavigationProp<ApplicationStackParamsList>;

const ApplicationsIndexScreen = () => {
  const {
    data: applications,
    isError,
    isLoading,
  } = useGetApplicationsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  console.log('applications', applications);
  const navigation = useNavigation<ApplicationNavigationProp>();
  const [screen, setScreen] = useState('thumbs-up');

  const setActiveScreen = (activeScreen: string) => {
    setScreen(activeScreen);
  };

  const [activeApplications, inactiveApplications] = useMemo(() => {
    return applicationPartition(applications);
  }, [applications]);

  return (
    <SafeAreaView style={CoreStyleSheet.safeAreaViewListContainer}>
      <View style={CoreStyleSheet.headerContainer}>
        <Text style={fontStyles.headerLarge}>My Applications</Text>
        <Pressable
          onPress={() =>
            navigation.navigate('ChatroomsNavigator', {screen: 'ChatIndex'})
          }>
          <LofftIcon
            name={'annotation-heart'}
            size={33}
            color={Color.Lavendar[100]}
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

      <View style={CoreStyleSheet.screenContainer}>
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
