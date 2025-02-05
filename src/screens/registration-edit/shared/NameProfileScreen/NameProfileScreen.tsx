import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  SafeAreaView,
  Animated,
} from 'react-native';

// Components 🪢
import HeadlineContainer from 'components/containers/HeadlineContainer';
import BackButton from 'components/buttons/BackButton';
import Divider from 'components/bars/Divider';
import NewUserPaginationBar from 'components/buttons/NewUserPaginationBar';
import NewUserJourneyContinueButton from 'components/buttons/NewUserJourneyContinueButton';
import ErrorMessage from 'components/LoadingAndNotFound/ErrorMessage';
import InputFieldText from 'components/coreComponents/inputField/InputFieldText';
import DatePicker from 'react-native-date-picker';
import DatePickerInput from 'components/coreComponents/inputField/inputs/DatePickerInput';

// Styles 🖼️
import Color from 'styleSheets/lofftColorPallet.json';
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';
import {fontStyles} from 'styleSheets/fontStyles';

//Assets 🎨
import {RegistrationBackground} from 'assets';

// Helpers 🤝
import {size} from 'react-native-responsive-sizes';

//Types 🏷 ️

import {useFadeInAnimation} from 'hooks/useFadeInAnimation';

import EditScreensPopover from 'components/modals/EditScreensPopover';
import {useNameProfileScreen} from './useNameProfileScreen';

const NameProfileScreen = ({route}: {route?: {params: {edit: boolean}}}) => {
  const edit = route?.params?.edit;

  const {
    showPopover,
    setShowPopover,
    handleFirstName,
    handleLastName,
    handleOnPressDatePicker,
    handleDateChange,
    handleCancelDate,
    handleBackButton,
    handleContinue,
    firstName,
    lastName,
    date,
    isDateSelected,
    isDatePickerOpen,
    errorFirstName,
    errorLastName,
    errorDate,
    errorImage,
  } = useNameProfileScreen(edit);

  const {fadeInAnim} = useFadeInAnimation();

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
          headlineText="A bit more about you..."
          subDescription="How others should call you?"
        />
        <View style={styles.mainContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.centerContainer}>
              <Animated.View
                style={[styles.inputContainer, {opacity: fadeInAnim}]}>
                <Text style={[fontStyles.headerSmall, styles.minText]}>
                  First Name
                </Text>
                <InputFieldText
                  placeholder="Which name do you go by?"
                  value={firstName}
                  onChangeText={handleFirstName}
                  errorMessage={errorFirstName}
                />
                {errorFirstName && (
                  <ErrorMessage isInputField message={errorFirstName} />
                )}
              </Animated.View>
              <Animated.View
                style={[styles.inputContainer, {opacity: fadeInAnim}]}>
                <Text style={[fontStyles.headerSmall, styles.minText]}>
                  Last Name
                </Text>
                <InputFieldText
                  placeholder="To be more authentic"
                  value={lastName}
                  onChangeText={handleLastName}
                  errorMessage={errorLastName}
                />
                {errorLastName && (
                  <ErrorMessage isInputField message={errorLastName} />
                )}
              </Animated.View>
              <Animated.View
                style={[styles.inputContainer, {opacity: fadeInAnim}]}>
                <Text style={[fontStyles.headerSmall, styles.minText]}>
                  Date of Birth
                </Text>
                <DatePickerInput
                  date={date}
                  handleOnPress={handleOnPressDatePicker}
                  error={errorDate}
                  dateSelected={isDateSelected}
                />
                {errorDate && <ErrorMessage isInputField message={errorDate} />}
              </Animated.View>
              <DatePicker
                modal
                mode="date"
                open={isDatePickerOpen}
                date={date}
                onConfirm={handleDateChange}
                onCancel={handleCancelDate}
              />
            </View>
          </ScrollView>
        </View>

        <View style={styles.footerContainer}>
          <Divider />
          {errorImage && <ErrorMessage message={errorImage} />}
          {!edit && <NewUserPaginationBar />}
          <NewUserJourneyContinueButton
            value={'Continue'}
            onPress={handleContinue}
            disabled={!isDateSelected || !firstName || !lastName}
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
    flex: 1,
  },
  centerContainer: {
    paddingHorizontal: size(10),
    paddingVertical: size(10),
    gap: size(20),
  },
  inputContainer: {
    gap: size(10),
  },

  minText: {
    color: Color.Black[100],
  },

  imagesContainer: {
    gap: size(20),
  },

  footerContainer: {
    gap: size(10),
  },
});

export default NameProfileScreen;
