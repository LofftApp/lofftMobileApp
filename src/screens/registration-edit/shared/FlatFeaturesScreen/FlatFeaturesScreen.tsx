import React from 'react';
import {View, StyleSheet, ScrollView, Text} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

// Components 🪢
import HeadlineContainer from 'components/containers/HeadlineContainer';
import SelectionButton from 'components/buttons/SelectionButton';
import BackButton from 'components/buttons/BackButton';
import NewUserJourneyContinueButton from 'components/buttons/NewUserJourneyContinueButton';
import Divider from 'components/bars/Divider';
import ErrorMessage from 'components/LoadingAndNotFound/ErrorMessage';
import NewUserPaginationBar from 'components/buttons/NewUserPaginationBar';
import NotFoundComponent from 'components/LoadingAndNotFound/NotFoundComponent';
import LoadingComponent from 'components/LoadingAndNotFound/LoadingComponent';
import LoadingButtonIcon from 'components/LoadingAndNotFound/LoadingButtonIcon';
import {useFlatFeaturesScreen} from './useFlatFeaturesScreen';

//Assets 🎨
import {RegistrationBackground} from 'assets';

// Styles 🖼  ️
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';
import {fontStyles} from 'styleSheets/fontStyles';

// Helper 🤝
import {size} from 'react-native-responsive-sizes';

//Constants 📊
import {MIN_SELECTED_FEATURES} from 'components/componentData/constants';
import NewUserScreensPopover from 'components/modals/NewUserScreensPopover';

const FlatFeaturesScreen = ({
  route,
}: {
  route?: {params: {edit: boolean; advertId: number; newValue: boolean}};
}) => {
  const edit = route?.params?.edit;
  const advertId = route?.params?.advertId;
  const newValue = route?.params?.newValue;

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
    isEditProfileError,
    isEditProfileLoading,
    isEditFlatLoading,
    isEditFlatError,
    features,
    isLessor,
    isNewUserLessor,
    showPopover,
    setShowPopover,
  } = useFlatFeaturesScreen(edit, advertId, newValue);

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
        styles.zIndex,
        {
          paddingTop: insets.top,
          paddingBottom: !edit ? insets.bottom : undefined,
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
          {(error || isEditProfileError || isEditFlatError) && (
            <ErrorMessage message={error as string} />
          )}
          {!edit && <NewUserPaginationBar />}
          <NewUserJourneyContinueButton
            value={
              edit ? (
                isEditProfileLoading || isEditFlatLoading ? (
                  <LoadingButtonIcon />
                ) : (
                  'Save'
                )
              ) : (
                'Continue'
              )
            }
            disabled={
              selectedFeaturesIds.length < MIN_SELECTED_FEATURES ||
              isEditProfileLoading ||
              isEditFlatLoading
            }
            onPress={handleContinue}
          />
        </View>
      </View>
      <NewUserScreensPopover
        showPopover={showPopover}
        setShowPopover={setShowPopover}
        save={edit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  zIndex: {
    zIndex: 1,
  },
  selectionContainer: {
    marginTop: size(10),
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: size(10),
    zIndex: -1,
  },
  tagInfoContainer: {
    marginBottom: size(5),
  },
  footerContainer: {
    paddingTop: size(20),
  },
});

export default FlatFeaturesScreen;
