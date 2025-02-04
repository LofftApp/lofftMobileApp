import React from 'react';
import {useNavigation} from '@react-navigation/native';
import BackButton from 'components/buttons/BackButton';
import AppLanguageCard from 'components/cards/AppLanguageCard';
import {SettingsScreenNavigationProp} from 'navigationStacks/types';
import {SafeAreaView, StyleSheet, View, FlatList} from 'react-native';

import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';
import {size} from 'react-native-responsive-sizes';
import {ArmsInL, RegistrationBackground} from 'assets';
import {useAppLanguage} from 'reduxFeatures/settings/useAppLanguage';
import {AppLanguages} from 'reduxFeatures/settings/settingsSlice';

type AppLanguageData = {
  id: AppLanguages;
  name: string;
}[];

const appLanguages: AppLanguageData = [
  {
    id: 'EN',
    name: 'English',
  },
  {
    id: 'DE',
    name: 'Deutsch',
  },
];

const AppLanguageScreen = () => {
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const {appLanguage} = useAppLanguage();
  return (
    <SafeAreaView style={[CoreStyleSheet.safeAreaViewShowContainer]}>
      <BackButton title="App Language" onPress={navigation.goBack} />
      <RegistrationBackground
        height="100%"
        width="100%"
        style={CoreStyleSheet.backgroundImage}
      />
      <View style={styles.screenContainer}>
        <FlatList
          data={appLanguages}
          renderItem={({item}) => <AppLanguageCard languageData={item} />}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
          extraData={appLanguage}
        />
        <ArmsInL width="100%" height="100%" style={styles.image} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenContainer: StyleSheet.flatten([
    CoreStyleSheet.screenContainer,
    {paddingVertical: size(10)},
  ]),
  container: {
    alignItems: 'center',

    marginVertical: size(20),
    gap: size(5),
  },

  image: {
    position: 'absolute',
    top: size(90),
    left: size(10),
    zIndex: -1,
    opacity: 0.9,
  },
});

export default AppLanguageScreen;
