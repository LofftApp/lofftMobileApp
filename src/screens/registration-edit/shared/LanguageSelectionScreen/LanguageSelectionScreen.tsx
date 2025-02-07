import React from 'react';
import {ScrollView, View, Text, StyleSheet, Animated} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

//Hooks 🪝
import {useLanguageSelectionScreen} from './useLanguageSelectionScreen';

// Styles 🎨
import {fontStyles} from 'styleSheets/fontStyles';
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';

// Components 🧰
import BackButton from 'components/buttons/BackButton';
import LanguagesCard from 'components/cards/LanguagesCard';
import InputFieldText from 'components/coreComponents/inputField/InputFieldText';
import HeadlineContainer from 'components/containers/HeadlineContainer';
import LoadingComponent from 'components/LoadingAndNotFound/LoadingComponent';
import Divider from 'components/bars/Divider';
import UserJourneyPaginationBar from 'components/buttons/NewUserPaginationBar';
import NewUserJourneyContinueButton from 'components/buttons/NewUserJourneyContinueButton';
import ErrorMessage from 'components/LoadingAndNotFound/ErrorMessage';
import NewUserScreensPopover from 'components/modals/NewUserScreensPopover';
import LoadingButtonIcon from 'components/LoadingAndNotFound/LoadingButtonIcon';
import NotFoundComponent from 'components/LoadingAndNotFound/NotFoundComponent';

//Assets 🎨
import {RegistrationBackground} from 'assets';

// Helpers 🥷🏻
import {size} from 'react-native-responsive-sizes';

const LanguageSelectionScreen = ({
  route,
}: {
  route?: {params: {edit: boolean; advertId: number}};
}) => {
  const edit = route?.params?.edit;
  const advertId = route?.params?.advertId;

  //safeArea
  const insets = useSafeAreaInsets();

  const {
    searchValue,
    handleSearch,
    handleClearSearch,
    languages,
    sortedLanguages,
    selectedLanguageNames,
    handleSelectedLanguages,
    error,
    isLoading,
    advertIsLoading,
    advertIsError,
    handleContinue,
    handleBackButton,
    fadeInAnim,
    scrollViewRef,
    isLessor,
    isNewUserLessor,
    showPopover,
    setShowPopover,
    isEditLoading,
    isEditError,
  } = useLanguageSelectionScreen(edit, advertId);

  if (isLoading || advertIsLoading) {
    return <LoadingComponent />;
  }

  if (advertIsError) {
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
          paddingBottom: insets.bottom,
        },
      ]}>
      <BackButton onPress={handleBackButton} />
      <RegistrationBackground
        height="100%"
        width="100%"
        style={CoreStyleSheet.backgroundImage}
      />
      <View style={styles.mainContainer}>
        <HeadlineContainer
          headlineText={
            isNewUserLessor || isLessor
              ? 'What are the common language(s) in your Lofft?'
              : 'What language(s) do you speak?'
          }
        />

        <Animated.View style={[styles.inputContainer, {opacity: fadeInAnim}]}>
          <InputFieldText
            type="search"
            placeholder="Search for your language"
            value={searchValue}
            onChangeText={handleSearch}
            onClear={handleClearSearch}
          />
        </Animated.View>

        <ScrollView ref={scrollViewRef}>
          {selectedLanguageNames && selectedLanguageNames.length > 0 && (
            <>
              <Text style={[fontStyles.headerSmall, styles.currentSelection]}>
                Your current Selection:
              </Text>
              <Animated.View
                style={[styles.languagesContainer, {opacity: fadeInAnim}]}>
                {selectedLanguageNames?.map(language => (
                  <LanguagesCard
                    key={language}
                    language={language}
                    selected={true}
                    handleSelectedLanguages={() =>
                      handleSelectedLanguages(
                        sortedLanguages?.find(l => l.name === language)?.id ||
                          0,
                      )
                    }
                  />
                ))}
              </Animated.View>
            </>
          )}
          <Divider />
          <View
            style={
              selectedLanguageNames &&
              selectedLanguageNames?.length > 0 &&
              styles.notSelected
            }>
            {selectedLanguageNames && selectedLanguageNames.length > 0 && (
              <Text style={fontStyles.headerSmall}>Other languages</Text>
            )}
            <Animated.View
              style={[styles.languagesContainer, {opacity: fadeInAnim}]}>
              {languages.map(language => (
                <LanguagesCard
                  key={language}
                  language={language}
                  selected={false}
                  handleSelectedLanguages={() =>
                    handleSelectedLanguages(
                      sortedLanguages?.find(l => l.name === language)?.id || 0,
                    )
                  }
                />
              ))}
            </Animated.View>
          </View>
        </ScrollView>
        <Divider />
      </View>
      <View style={styles.footerContainer}>
        {(error || isEditError) && <ErrorMessage message={error as string} />}
        {!edit && <UserJourneyPaginationBar />}

        <NewUserJourneyContinueButton
          value={
            edit ? isEditLoading ? <LoadingButtonIcon /> : 'Save' : 'Continue'
          }
          onPress={handleContinue}
        />
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
  mainContainer: {
    flex: 1,
    paddingVertical: size(20),
    paddingHorizontal: size(16),
  },
  inputContainer: {
    paddingTop: size(5),
    paddingBottom: size(10),
  },

  languagesContainer: {
    flex: 1,
    height: '100%',
    paddingHorizontal: size(10),
    width: '100%',
  },

  currentSelection: {
    marginBottom: size(8),
  },
  notSelected: {
    marginTop: size(16),
  },
  footerContainer: {
    paddingHorizontal: size(16),
    paddingBottom: size(20),
    alignItems: 'center',
    width: '100%',
  },
});

export default LanguageSelectionScreen;
