import React from 'react';
import {View, StyleSheet, ScrollView, Text} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

//Redux 📦
import {useNewUserDetails} from 'reduxFeatures/registration/useNewUserDetails';

// Components 🪢
import HeadlineContainer from 'components/containers/HeadlineContainer';
import SelectionButton from 'components/buttons/SelectionButton';
import BackButton from 'components/buttons/BackButton';
import NewUserJourneyContinueButton from 'components/buttons/NewUserJourneyContinueButton';
import Divider from 'components/bars/Divider';
import ErrorMessage from 'components/LoadingAndNotFound/ErrorMessage';
import NewUserPaginationBar from 'components/buttons/NewUserPaginationBar';

//Assets 🎨
import {RegistrationBackground} from 'assets';

// Styles 🖼  ️
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';
import {fontStyles} from 'styleSheets/fontStyles';

// Helper 🤝
import {size} from 'react-native-responsive-sizes';

//Constants 📊
import {MIN_SELECTED_FEATURES} from 'components/componentData/constants';

// Types 🧩

import {useUserType} from 'reduxFeatures/user/useUserType';
import NotFoundComponent from 'components/LoadingAndNotFound/NotFoundComponent';
import LoadingComponent from 'components/LoadingAndNotFound/LoadingComponent';

import LoadingButtonIcon from 'components/LoadingAndNotFound/LoadingButtonIcon';

import {useFlatFeaturesScreen} from './useFlatFeaturesScreen';

const FlatFeaturesScreen = ({
  route,
}: {
  route?: {params: {edit: boolean; advertId: number; newValue: boolean}};
}) => {
  const edit = route?.params?.edit;
  const advertId = route?.params?.advertId;
  const newValue = route?.params?.newValue;
  console.log('newValue', newValue);
  // Navigation

  //Safe Area
  const insets = useSafeAreaInsets();

  const {
    selectedFeaturesIds,
    handleSelectFeatures,
    handleContinue,
    handleBackButton,
    error,
    isAdvertLoading,
    isAdvertError,
    isEditLoading,
    features,
  } = useFlatFeaturesScreen(edit, advertId, newValue);

  const {isLessor} = useUserType();
  const {isNewUserLessor} = useNewUserDetails(isLessor, edit);

  const featuresButtons = features?.map(feat => {
    return (
      <SelectionButton
        key={feat.id}
        id={feat.id}
        emojiIcon={feat.emoji}
        value={feat.name}
        toggle={selectedFeaturesIds.includes(feat.id)}
        selectFn={handleSelectFeatures}
      />
    );
  });

  if (isAdvertLoading) {
    return <LoadingComponent />;
  }

  if (isAdvertError) {
    return (
      <NotFoundComponent
        message="We couldn't retrieve the advert details"
        backButton
        onPress={handleBackButton}
      />
    );
  }

  return (
    <View
      style={[
        CoreStyleSheet.safeAreaViewShowContainer,
        {
          paddingTop: insets.top,
          // paddingBottom: insets.bottom,
        },
      ]}>
      <BackButton onPress={handleBackButton} />
      <RegistrationBackground
        height="100%"
        width="100%"
        style={CoreStyleSheet.backgroundImage}
      />
      <View style={CoreStyleSheet.screenContainer}>
        <HeadlineContainer
          headlineText={
            isNewUserLessor || isLessor
              ? 'What is your flat like?'
              : 'What is your ideal flat like?'
          }
          subDescription={
            isNewUserLessor || isLessor
              ? 'Select all the tags that match your place.'
              : 'Select all the tags that match the place you are looking for.'
          }
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.selectionContainer}>{featuresButtons}</View>
        </ScrollView>

        <Divider />
        <View style={styles.footerContainer}>
          <View style={styles.tagInfoContainer}>
            <Text
              style={
                fontStyles.bodySmall
              }>{`* Select at least ${MIN_SELECTED_FEATURES} tags`}</Text>
          </View>
          {error && <ErrorMessage message={error} />}
          {!edit && <NewUserPaginationBar />}
          <NewUserJourneyContinueButton
            value={
              edit ? isEditLoading ? <LoadingButtonIcon /> : 'Save' : 'Continue'
            }
            disabled={
              selectedFeaturesIds.length < MIN_SELECTED_FEATURES ||
              isEditLoading
            }
            onPress={handleContinue}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  selectionContainer: {
    marginTop: size(10),
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: size(10),
  },
  tagInfoContainer: {
    marginBottom: size(5),
  },
  footerContainer: {
    paddingTop: size(20),
  },
});

export default FlatFeaturesScreen;
