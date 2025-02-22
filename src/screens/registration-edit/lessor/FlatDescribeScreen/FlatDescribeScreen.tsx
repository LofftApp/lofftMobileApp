import React from 'react';
import {View, StyleSheet, SafeAreaView, Animated} from 'react-native';

//hooks  🪝
import {useFlatDescribeScreen} from './useFlatDescribeScreen';

// Components 🪢
import HeadlineContainer from 'components/containers/HeadlineContainer';
import BackButton from 'components/buttons/BackButton';
import Divider from 'components/bars/Divider';
import NewUserPaginationBar from 'components/buttons/NewUserPaginationBar';
import NewUserJourneyContinueButton from 'components/buttons/NewUserJourneyContinueButton';
import CustomTextInput from 'components/coreComponents/inputField/inputs/CustomTextInput';
import LoadingComponent from 'components/LoadingAndNotFound/LoadingComponent';
import NotFoundComponent from 'components/LoadingAndNotFound/NotFoundComponent';
import LoadingButtonIcon from 'components/LoadingAndNotFound/LoadingButtonIcon';

// Styles 🖼️
import Color from 'styleSheets/lofftColorPallet.json';
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';

//Assets 🎨
import {RegistrationBackground} from 'assets';

//Constants  📊
import {MIN_DESCRIPTION_CHARS} from 'components/componentData/constants';
// Helpers 🤝
import {size} from 'react-native-responsive-sizes';
import NewUserScreensPopover from 'components/modals/NewUserScreensPopover';
import OpacityOverlay from 'components/modals/OpacityOverlay';

const FlatDescribeScreen = ({
  route,
}: {
  route?: {params: {edit: boolean; advertId: number; newValue: boolean}};
}) => {
  const edit = route?.params?.edit;
  const advertId = route?.params?.advertId;
  const newValue = route?.params?.newValue;

  const {
    text,
    textFocus,
    error,
    handleOnChange,
    handleOnFocus,
    handleOnBlur,
    handleContinue,
    handleBackButton,
    fadeInAnim,
    isAdvertLoading,
    isAdvertError,
    isEditFlatLoading,
    isNewUserLessor,
    isLessor,
    showPopover,
    setShowPopover,
  } = useFlatDescribeScreen(edit, advertId, newValue);
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
    <SafeAreaView style={CoreStyleSheet.safeAreaViewShowContainer}>
      <BackButton onPress={handleBackButton} />
      <RegistrationBackground
        height="100%"
        width="100%"
        style={CoreStyleSheet.backgroundImage}
      />

      <View style={CoreStyleSheet.screenContainer}>
        <HeadlineContainer
          headlineText={"It's your turn!"}
          subDescription={
            'Describe your flat in a short text. This can be edited later!'
          }
        />
        <View style={styles.mainContainer}>
          <Animated.View style={{opacity: fadeInAnim}}>
            <CustomTextInput
              text={text}
              textFocus={textFocus}
              error={error}
              handleOnChange={handleOnChange}
              handleOnFocus={handleOnFocus}
              handleOnBlur={handleOnBlur}
              placeholder={'Tell us about your lofft.'}
              isFlat={isNewUserLessor || isLessor}
            />
          </Animated.View>
        </View>

        <View style={styles.footerContainer}>
          <Divider />
          {!edit && <NewUserPaginationBar />}
          <NewUserJourneyContinueButton
            value={
              edit ? (
                isEditFlatLoading ? (
                  <LoadingButtonIcon />
                ) : (
                  'Save'
                )
              ) : (
                'Continue'
              )
            }
            disabled={text.length < MIN_DESCRIPTION_CHARS || isEditFlatLoading}
            onPress={handleContinue}
          />
        </View>
      </View>
      <NewUserScreensPopover
        showPopover={showPopover}
        setShowPopover={setShowPopover}
      />
      <OpacityOverlay loadingState={isEditFlatLoading} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 4,
  },

  minText: {
    color: Color.Black[80],
  },

  inputText: {
    borderWidth: 2,
    paddingLeft: size(10),
    paddingVertical: size(5),
    borderRadius: 12,
    height: size(10),
  },
  footerContainer: {
    flex: 1,
    paddingTop: size(20),
    gap: size(10),
  },
});

export default FlatDescribeScreen;
