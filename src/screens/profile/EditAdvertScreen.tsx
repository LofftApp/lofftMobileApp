import React from 'react';
import {View, StyleSheet, SafeAreaView, FlatList, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

//Hooks
import {useUserType} from 'reduxFeatures/user/useUserType';

//Components
import {RegistrationBackground} from 'assets';
import SettingsCard from 'components/cards/SettingsCard';
import BackButton from 'components/buttons/BackButton';

//Styles
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';

//Helpers
import {size} from 'react-native-responsive-sizes';

//Types
import {SettingsScreenNavigationProp} from 'navigationStacks/types';
import {useGetUserQuery} from 'reduxFeatures/user/userApi';
import {
  useGetAdvertByIdQuery,
  useGetAdvertsQuery,
} from 'reduxFeatures/adverts/advertApi';
import HeadlineContainer from 'components/containers/HeadlineContainer';
import {fontStyles} from 'styleSheets/fontStyles';
import Color from 'styleSheets/lofftColorPallet.json';

const EditAdvertScreen = ({route}: {route?: {params: {advertId: number}}}) => {
  const advertId = route?.params.advertId;
  console.log('advertId', advertId);
  const {data: advert} = useGetAdvertByIdQuery(advertId ?? 0);
  const {isLessor} = useUserType();

  const navigation = useNavigation<SettingsScreenNavigationProp>();

  const editAdvertData = [
    {
      id: 1,
      title: 'Match Tags',
      subtitle: 'Boost your flat profile to find the perfect tenant',
      onPress: () =>
        navigation.navigate('NewUserNavigator', {
          screen: 'AboutUserFlatScreen',
          params: {edit: true},
        }),
      icon: 'annotation-heart',
    },
    {
      id: 2,
      title: 'Location',
      subtitle: 'City and address',
      onPress: () =>
        navigation.navigate('NewUserNavigator', {
          screen: 'NameProfileScreen',
          params: {edit: true},
        }),
      icon: 'map',
    },
    {
      id: 3,
      title: 'Gender Identity',
      subtitle: 'To get you closer to the right community',
      onPress: () =>
        navigation.navigate('NewUserNavigator', {
          screen: 'GenderIdentityScreen',
          params: {edit: true},
        }),
      icon: 'face-wink',
    },
    {
      id: 4,
      title: 'Search Preferences',
      subtitle: 'City, budget, and more',
      onPress: () =>
        navigation.navigate('NewUserNavigator', {
          screen: 'SelectCityScreen',
          params: {edit: true},
        }),
      icon: 'search-sm',
    },
    {
      id: 5,
      title: 'Languages',
      subtitle: 'The languages spoken in the flat',
      onPress: () =>
        navigation.navigate('NewUserNavigator', {
          screen: 'LanguageSelectionScreen',
          params: {edit: true},
        }),
      icon: 'home-smile',
    },
  ];

  return (
    <SafeAreaView style={CoreStyleSheet.safeAreaViewShowContainer}>
      <BackButton title="Edit Advert" onPress={navigation.goBack} />

      <RegistrationBackground
        height="100%"
        width="100%"
        style={CoreStyleSheet.backgroundImage}
      />

      <View style={CoreStyleSheet.screenContainer}>
        <Text style={[fontStyles.bodyMedium, styles.title]}>
          {advert?.flat.address || 'Rudi-Dutschke-Str. 26, 10969'} - {advert?.flat.city || 'Berlin'}
        </Text>
        <View style={styles.mainContainer}>
          <FlatList
            data={editAdvertData}
            renderItem={({item}) => (
              <SettingsCard settingsData={item} hasArrowIds={[1, 2, 3, 4, 5]} />
            )}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.cardsContainer}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    gap: size(24),
  },

  title: {
    color: Color.Black[100],
    paddingTop: size(0),
    paddingBottom: size(10),
    textAlign: 'center',
  },

  backgroundImageExtra: {
    position: 'absolute',
    top: size(-25),
    zIndex: -1,
    left: 0,
    opacity: 0.7,
  },
  imagesContainer: {
    gap: size(20),
  },

  cardsContainer: {
    alignItems: 'center',
  },

  coreButtonStyle: {
    width: '40%',
    marginTop: 20,
  },
});

export default EditAdvertScreen;
