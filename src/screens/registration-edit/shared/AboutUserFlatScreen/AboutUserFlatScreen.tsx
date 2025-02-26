import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

//Screens 📺
import {useAboutUserFlatScreen} from './useAboutUserFlatScreen';

// Components 🪢
import NewUserPaginationBar from 'components/buttons/NewUserPaginationBar';
import HeadlineContainer from 'components/containers/HeadlineContainer';
import SelectionButton from 'components/buttons/SelectionButton';
import Divider from 'components/bars/Divider';
import BackButton from 'components/buttons/BackButton';
import NewUserJourneyContinueButton from 'components/buttons/NewUserJourneyContinueButton';
import ErrorMessage from 'components/LoadingAndNotFound/ErrorMessage';
import LoadingComponent from 'components/LoadingAndNotFound/LoadingComponent';
import NotFoundComponent from 'components/LoadingAndNotFound/NotFoundComponent';
import NewUserScreensPopover from 'components/modals/NewUserScreensPopover';

// StylesSheet 🖼️
import {fontStyles} from 'styleSheets/fontStyles';
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';

//Assets 🎨
import {RegistrationBackground} from 'assets';

// Constants 📊
import {
  MAX_SELECTED_CHARS,
  MIN_SELECTED_CHARS,
} from 'components/componentData/constants';

// Helper 🤝
import {size} from 'react-native-responsive-sizes';

// Types 🏷 ️

const AboutUserFlatScreen = ({
  route,
}: {
  route?: {params: {edit: boolean; advertId: number}};
}) => {
  const edit = route?.params?.edit;
  const advertId = route?.params?.advertId;

  //Safe Area
  const insets = useSafeAreaInsets();

  const {
    selectedCharsIds,
    handleSelectChars,
    handleContinue,
    handleBackButton,
    error,
    isAdvertLoading,
    isAdvertError,
    characteristics,
    showPopover,
    setShowPopover,
    isLessor,
    isNewUserLessor,
  } = useAboutUserFlatScreen(edit, advertId);

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
              ? 'Tell us a bit about your flat'
              : 'Tell us a bit about yourself'
          }
          subDescription={
            isNewUserLessor || isLessor
              ? `Select at least ${MIN_SELECTED_CHARS} tags that describe your Lofft lifestyles. More tags selected, more likelihood you'll find the right crowd!`
              : `Select at least ${MIN_SELECTED_CHARS} tags that describe who you are and your lifestyles. More tags selected, more likelihood you'll find the right crowd in a Lofft!`
          }
        />

        <FlatList
          data={characteristics}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.selectionContainer}
          renderItem={({item}) => (
            <View style={styles.buttonsContainer}>
              <SelectionButton
                id={item.id}
                emojiIcon={item.emoji}
                value={item.name}
                toggle={selectedCharsIds.includes(item.id)}
                selectFn={handleSelectChars}
                disabled={
                  selectedCharsIds.length === MAX_SELECTED_CHARS &&
                  !selectedCharsIds.includes(item.id)
                }
                isReady={!isAdvertLoading}
              />
            </View>
          )}
        />

        <Divider />
        <View style={[styles.footerContainer]}>
          <View style={styles.tagInfoContainer}>
            <Text
              style={
                fontStyles.bodySmall
              }>{`* Select at least ${MIN_SELECTED_CHARS} tags`}</Text>
          </View>
          {error ||
            (selectedCharsIds.length === MAX_SELECTED_CHARS && (
              <ErrorMessage
                message={
                  error ||
                  `You have selected maximum of ${MAX_SELECTED_CHARS} tags`
                }
              />
            ))}
          {!edit && <NewUserPaginationBar />}

          <NewUserJourneyContinueButton
            value="Continue"
            disabled={selectedCharsIds.length < MIN_SELECTED_CHARS}
            onPress={handleContinue}
          />
        </View>
      </View>

      <NewUserScreensPopover
        showPopover={showPopover}
        setShowPopover={setShowPopover}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  zIndex: {
    zIndex: 1,
  },

  buttonsContainer: {
    flex: 1,
    marginVertical: size(4),
  },

  selectionContainer: {
    marginTop: size(10),
    paddingHorizontal: size(8),
  },

  columnWrapper: {
    alignItems: 'center',
    gap: size(10),
  },
  tagInfoContainer: {
    marginBottom: size(5),
  },
  footerContainer: {
    paddingTop: size(20),
  },
});

export default AboutUserFlatScreen;
