import React from 'react';
import {View, StyleSheet, SafeAreaView, Animated} from 'react-native';

//Hooks 🪝
import {useFadeInAnimation} from 'hooks/useFadeInAnimation';
import {useUserDescribeScreen} from './useUserDescribeScreen';

// Components 🪢
import HeadlineContainer from 'components/containers/HeadlineContainer';
import BackButton from 'components/buttons/BackButton';
import Divider from 'components/bars/Divider';
import NewUserPaginationBar from 'components/buttons/NewUserPaginationBar';
import NewUserJourneyContinueButton from 'components/buttons/NewUserJourneyContinueButton';
import CustomTextInput from 'components/coreComponents/inputField/inputs/CustomTextInput';
import EditScreensPopover from 'components/modals/EditScreensPopover';
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
import ErrorMessage from 'components/LoadingAndNotFound/ErrorMessage';

const UserDescribeScreen = ({
  route,
}: {
  route?: {params: {edit: boolean; newValue: boolean}};
}) => {
  const edit = route?.params?.edit;
  const newValue = route?.params?.newValue;
  console.log('newValue in describe screen', newValue);
  //Animation
  const {fadeInAnim} = useFadeInAnimation();

  const {
    text,
    textFocus,
    error,
    handleOnChange,
    handleOnFocus,
    handleOnBlur,
    handleContinue,
    handleBackButton,
    isEditLoading,
    isEditError,
    showPopover,
    setShowPopover,
  } = useUserDescribeScreen(edit, newValue);

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
          headlineText={`In your own ${'\n'}words!`}
          subDescription={
            edit
              ? 'Describe yourself in a short text'
              : "Describe yourself in a short text. Don't worry, this can be updated later."
          }
        />
        <View style={styles.mainContainer}>
          <Animated.View style={{opacity: fadeInAnim}}>
            <CustomTextInput
              text={text}
              textFocus={textFocus}
              handleOnChange={handleOnChange}
              handleOnFocus={handleOnFocus}
              handleOnBlur={handleOnBlur}
              placeholder={'Who are you? What do you like?'}
            />
          </Animated.View>
        </View>

        <View style={styles.footerContainer}>
          <Divider />
          {(error || isEditError) && <ErrorMessage message={error} />}
          {!edit && <NewUserPaginationBar />}
          <NewUserJourneyContinueButton
            value={
              edit ? isEditLoading ? <LoadingButtonIcon /> : 'Save' : 'Continue'
            }
            disabled={text.length < MIN_DESCRIPTION_CHARS || isEditLoading}
            onPress={handleContinue}
          />
        </View>
      </View>
      <EditScreensPopover
        showPopover={showPopover}
        setShowPopover={setShowPopover}
      />
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
    paddingBottom: size(20),
    gap: size(10),
  },
});

export default UserDescribeScreen;
