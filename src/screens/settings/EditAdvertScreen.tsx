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
import {fontStyles} from 'styleSheets/fontStyles';
import Color from 'styleSheets/lofftColorPallet.json';
import LoadingButtonIcon from 'components/LoadingAndNotFound/LoadingButtonIcon';
import ErrorMessage from 'components/LoadingAndNotFound/ErrorMessage';

const EditAdvertScreen = ({route}: {route?: {params: {advertId: number}}}) => {
  const advertId = route?.params?.advertId;
  console.log('advertId', advertId);
  const {
    data: advert,
    isLoading,
    isError,
  } = useGetAdvertByIdQuery(advertId ?? 0, {
    refetchOnMountOrArgChange: true,
  });
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
          params: {edit: true, advertId},
        }),
      icon: 'annotation-heart',
    },
    {
      id: 2,
      title: 'Location and Rent',
      subtitle: 'City, address and rent price',
      onPress: () =>
        navigation.navigate('NewUserNavigator', {
          screen: 'SelectCityScreen',
          params: {edit: true, advertId},
        }),
      icon: 'map',
    },

    {
      id: 3,
      title: 'Flat Details',
      subtitle: 'Headline, size and description',
      onPress: () =>
        navigation.navigate('NewUserNavigator', {
          screen: 'FlatDetailsScreen',
          params: {edit: true, advertId},
        }),
      icon: 'building',
    },

    {
      id: 4,
      title: 'Upload Photos',
      subtitle: 'Show off your flat',
      onPress: () =>
        navigation.navigate('NewUserNavigator', {
          screen: 'FlatImageUploadScreen',
          params: {edit: true, advertId},
        }),
      icon: 'upload',
    },
    {
      id: 5,
      title: 'Availability',
      subtitle: 'The languages spoken in the flat',
      onPress: () =>
        navigation.navigate('NewUserNavigator', {
          screen: 'FlatLengthAvailableScreen',
          params: {edit: true, advertId},
        }),
      icon: 'calendar',
    },
    {
      id: 6,
      title: 'Safe Space',
      subtitle: 'To help you find the right tenant',
      onPress: () =>
        navigation.navigate('NewUserNavigator', {
          screen: 'SafeSpaceForScreen',
          params: {edit: true, advertId},
        }),
      icon: 'face-wink',
    },

    {
      id: 7,
      title: 'Languages',
      subtitle: 'The languages spoken in the flat',
      onPress: () =>
        navigation.navigate('NewUserNavigator', {
          screen: 'LanguageSelectionScreen',
          params: {edit: true, advertId},
        }),
      icon: 'home-smile',
    },

    {
      id: 8,
      title: 'Delete Advert',
      subtitle: '',
      onPress: () => {},
      icon: 'trash',
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
        {isLoading ? (
          <LoadingButtonIcon />
        ) : isError ? (
          <ErrorMessage message="We couldn't retrieve the advert details" />
        ) : (
          <Text style={[fontStyles.bodyMedium, styles.titleAddress]}>
            {advert?.flat.address || 'Rudi-Dutschke-Str. 26, 10969'} -{' '}
            {advert?.flat.city.name || 'Berlin'}
          </Text>
        )}
        <View style={styles.mainContainer}>
          <FlatList
            data={editAdvertData}
            renderItem={({item}) => (
              <SettingsCard
                settingsData={item}
                hasArrowIds={[1, 2, 3, 4, 5, 6, 7]}
                isDeleteId={8}
              />
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

  titleAddress: {
    color: Color.Black[100],
    paddingTop: size(0),
    paddingBottom: size(10),
    textAlign: 'center',
    minHeight: size(60),
    flexWrap: 'wrap',
    flexShrink: 1,
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
