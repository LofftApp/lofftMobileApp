import React, {useMemo, useState} from 'react';
import {View, Text, SafeAreaView} from 'react-native';

// Redux 🏗️
import {useAppSelector} from 'reduxCore/hooks';
import {useGetApplicationsQuery} from 'reduxFeatures/applications/applicationApi';

// Screens 📺
import ListFlatApplicationComponent from './SubScreens/ListFlatApplicationComponent';

// Components 🪢
import HeaderPageContentSwitch from 'components/buttons/HeaderPageContentSwitch';

// StyleSheets 🖼️
import {fontStyles} from 'styleSheets/fontStyles';
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';

// helpers 🧰
import {applicationPartition} from 'helpers/applicationsPartition';

const ApplicationIndexScreen = () => {
  console.log('Application Index Screen RENDERED 😀');
  const currentUser = useAppSelector(state => state.user.user);
  const userType = currentUser.userType;

  const {data: applications, isError, isLoading} = useGetApplicationsQuery();
  console.log('applications in Application Index Screen', applications);

  const [screen, setScreen] = useState('thumbs-up');

  const setActiveScreen = (activeScreen: string) => {
    setScreen(activeScreen);
  };

  const [activeApplications, inactiveApplications] = useMemo(() => {
    return applicationPartition(applications ?? []);
  }, [applications]);

  return (
    <SafeAreaView style={CoreStyleSheet.safeAreaViewListContainer}>
      <View style={CoreStyleSheet.headerContainer}>
        <Text style={fontStyles.headerLarge}>My Applications</Text>
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
          isLessor={userType === 'lessor'}
          isLoading={isLoading}
          isError={isError}
        />
      </View>
    </SafeAreaView>
  );
};

export default ApplicationIndexScreen;
