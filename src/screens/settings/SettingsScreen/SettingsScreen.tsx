import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';

//Components
import {RegistrationBackground, Trail} from 'assets';
import ImageSwiper from 'components/images/ImageSwiper';
import SettingsUserImage from 'components/images/SettingsUserImages';
import SettingsCard from 'components/cards/SettingsCard';
import LoadingComponent from 'components/LoadingAndNotFound/LoadingComponent';
import NotFoundComponent from 'components/LoadingAndNotFound/NotFoundComponent';

//Styles
import {fontStyles} from 'styleSheets/fontStyles';
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';

//Helpers
import {size} from 'react-native-responsive-sizes';

//Types
import {ImageType} from 'reduxFeatures/imageHandling/types';
import {Messages} from 'reduxFeatures/settings/types';
import {ButtonValues} from 'components/buttons/types';
import {useSettingsScreen} from './useSettingsScreen';

const SettingsScreen = () => {
  const {
    isProfileLoading,
    isProfileError,
    profileRefetch,
    isLessor,
    isAdvertLoading,
    isAdvertError,
    advertRefetch,
    insets,
    advertPhotos,
    tenantSettingsData,
    lessorSettingsData,
    handlePressImageSwiper,
    userImageUri,
  } = useSettingsScreen();

  if (isAdvertLoading || isProfileLoading) {
    return <LoadingComponent />;
  }

  if (isAdvertError || isProfileError) {
    return (
      <NotFoundComponent
        message={Messages.CouldNotLoad}
        buttonValue={ButtonValues.TryAgain}
        onPress={() => {
          profileRefetch();
          advertRefetch();
        }}
      />
    );
  }
  return (
    <View
      style={[
        CoreStyleSheet.safeAreaViewShowContainer,
        styles.zIndex,

        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
      ]}>
      <Trail height="100%" width="100%" style={styles.backgroundImageExtra} />
      <RegistrationBackground
        height="100%"
        width="100%"
        style={CoreStyleSheet.backgroundImage}
      />
      <View style={CoreStyleSheet.headerContainer}>
        <Text style={fontStyles.headerLarge}>Settings</Text>
      </View>
      <View style={CoreStyleSheet.screenContainer}>
        <View style={styles.mainContainer}>
          <View style={styles.imagesContainer}>
            <SettingsUserImage userImageUri={userImageUri} />

            {isLessor && (
              <View style={styles.listingsContainer}>
                <Text style={styles.advertTitle}>Your active listings</Text>
                <ImageSwiper
                  imageContainerHeight={90}
                  imageContainerWidth={90}
                  images={advertPhotos.map(photo => photo.photo)}
                  snapToInterval={30}
                  editButton
                  onPress={index => {
                    if (index !== undefined) {
                      handlePressImageSwiper(advertPhotos[index].advertId);
                    }
                  }}
                  selectedIndex={null}
                  imageType={ImageType.Flat}
                  placeholder={4}
                />
              </View>
            )}
          </View>
          <FlatList
            data={isLessor ? lessorSettingsData : tenantSettingsData}
            renderItem={({item}) => (
              <SettingsCard
                settingsData={item}
                hasArrowIds={[1, 2, 3, 4, 5, 6, 9]}
                isDeleteId={8}
              />
            )}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.cardsContainer}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    gap: size(10),
  },
  zIndex: {
    zIndex: 1,
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
  listingsContainer: {
    gap: size(10),
  },
  advertTitle: {
    ...fontStyles.headerSmall,
    textAlign: 'center',
  },

  cardsContainer: {
    alignItems: 'center',
  },
});

export default SettingsScreen;
