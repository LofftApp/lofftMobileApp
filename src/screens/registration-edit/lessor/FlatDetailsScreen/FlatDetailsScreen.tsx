import React from 'react';
import {View, StyleSheet, SafeAreaView, Animated, Text} from 'react-native';

//Hooks 🪝
import {useFlatDetailsScreen} from './useFlatDetailsScreen';

// Components 🪢
import HeadlineContainer from 'components/containers/HeadlineContainer';
import BackButton from 'components/buttons/BackButton';
import Divider from 'components/bars/Divider';
import NewUserPaginationBar from 'components/buttons/NewUserPaginationBar';
import NewUserJourneyContinueButton from 'components/buttons/NewUserJourneyContinueButton';
import NotFoundComponent from 'components/LoadingAndNotFound/NotFoundComponent';
import LoadingComponent from 'components/LoadingAndNotFound/LoadingComponent';

// Styles 🖼️
import Color from 'styleSheets/lofftColorPallet.json';
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';
import {fontStyles} from 'styleSheets/fontStyles';

//Assets 🎨
import {RegistrationBackground} from 'assets';

// Helpers 🤝
import {size as _size} from 'react-native-responsive-sizes';
import NewUserScreensPopover from 'components/modals/NewUserScreensPopover';
import DefaultInput from 'components/coreComponents/inputField/inputs/DefaultInput';

//Types 🏷️

const FlatDetailsScreen = ({
  route,
}: {
  route?: {params: {edit: boolean; advertId: number}};
}) => {
  const edit = route?.params?.edit;
  const advertId = route?.params?.advertId;
  const {
    tagLine,
    size,
    errorTagLine,
    errorSize,
    handleTagLineChange,
    handleSizeChange,
    handleContinue,
    handleBackButton,
    fadeInAnim,
    isLoading,
    isError,
    showPopover,
    setShowPopover,
  } = useFlatDetailsScreen(edit, advertId);

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (isError) {
    return (
      <NotFoundComponent
        message="We couldn't retrieve the advert details"
        backButton
        onPress={handleBackButton}
      />
    );
  }

  return (
    <SafeAreaView style={CoreStyleSheet.safeAreaViewShowContainer}>
      <BackButton onPress={handleBackButton} />
      <RegistrationBackground
        height="100%"
        width="100%"
        style={CoreStyleSheet.backgroundImage}
      />

      <View style={CoreStyleSheet.screenContainer}>
        <HeadlineContainer
          headlineText="Share some details about your flat"
          subDescription="Write a catchy headline to attract potential flatmates"
        />
        <View style={styles.mainContainer}>
          <View style={styles.centerContainer}>
            <Animated.View
              style={[styles.inputContainer, {opacity: fadeInAnim}]}>
              {/* <InputFieldText
                value={tagLine}
                onChangeText={handleTagLineChange}
                placeholder={'Awesome flat in Moabit'}
              /> */}

              <DefaultInput
                value={tagLine}
                onChangeText={handleTagLineChange}
                placeholder="Awesome flat in Moabit"
                errorMessage={errorTagLine}
              />

              {/* <ErrorMessage isInputField message={errorTagLine} /> */}
            </Animated.View>
            <Animated.View
              style={[styles.inputContainer, {opacity: fadeInAnim}]}>
              <Text style={[fontStyles.headerSmall, styles.minText]}>
                Flat size in m²
              </Text>

              <DefaultInput
                value={size}
                onChangeText={handleSizeChange}
                placeholder="68"
                errorMessage={errorSize}
              />
            </Animated.View>
          </View>

          <View style={styles.footerContainer}>
            <Divider />
            {!edit && <NewUserPaginationBar />}
            <NewUserJourneyContinueButton
              value="Continue"
              onPress={handleContinue}
            />
          </View>
        </View>
      </View>
      <NewUserScreensPopover
        showPopover={showPopover}
        setShowPopover={setShowPopover}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  centerContainer: {
    flex: 3,
    paddingHorizontal: _size(10),
    paddingVertical: _size(10),
    gap: _size(20),
  },

  minText: {
    color: Color.Black[80],
  },

  inputContainer: {
    gap: _size(10),
  },

  footerContainer: {
    paddingTop: _size(20),
    gap: _size(10),
  },
});

export default FlatDetailsScreen;
