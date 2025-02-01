import React from 'react';
import {useNavigation} from '@react-navigation/native';
import BackButton from 'components/buttons/BackButton';
import AppLanguageCard from 'components/cards/AppLanguageCard';
import {SettingsScreenNavigationProp} from 'navigationStacks/types';
import {SafeAreaView, StyleSheet, Text, View, FlatList} from 'react-native';

import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';
import {size} from 'react-native-responsive-sizes';
import {ArmsInL} from 'assets';
const appLanguages = [
  {
    id: 1,
    name: 'English',
  },
  {
    id: 2,
    name: 'Deutsch',
  },
];

const AppLanguageScreen = () => {
  const navigation = useNavigation<SettingsScreenNavigationProp>();

  return (
    <SafeAreaView style={[CoreStyleSheet.safeAreaViewShowContainer]}>
      <BackButton title="App Language" onPress={navigation.goBack} />
      <View style={styles.screenContainer}>
        <FlatList
          data={appLanguages}
          renderItem={({item}) => <AppLanguageCard languageData={item} />}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
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
    marginLeft: size(100),
    marginVertical: size(20),
    gap: size(10),
  },

  image: {
    position: 'absolute',
    top: size(90),
    zIndex: -1,
    left: 0,
    opacity: 0.9,
  },
});

export default AppLanguageScreen;
