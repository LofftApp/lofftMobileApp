import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, Animated} from 'react-native';
import DatePicker from 'react-native-date-picker';

// Hooks 🪝
import {useFlatLengthAvailableScreen} from './useFlatLengthAvailableScreen';

// Assets 🎨
import {RegistrationBackground} from 'assets';

// Components 🪢
import BackButton from 'components/buttons/BackButton';
import DatePickerInput from 'components/coreComponents/inputField/inputs/DatePickerInput';
import HeadlineContainer from 'components/containers/HeadlineContainer';
import IconButton from 'components/buttons/IconButton';
import Divider from 'components/bars/Divider';
import NewUserPaginationBar from 'components/buttons/NewUserPaginationBar';
import NewUserJourneyContinueButton from 'components/buttons/NewUserJourneyContinueButton';
import ErrorMessage from 'components/LoadingAndNotFound/ErrorMessage';
import LoadingButtonIcon from 'components/LoadingAndNotFound/LoadingButtonIcon';
import NewUserScreensPopover from 'components/modals/NewUserScreensPopover';
import OpacityOverlay from 'components/modals/OpacityOverlay';
import LoadingComponent from 'components/LoadingAndNotFound/LoadingComponent';
import NotFoundComponent from 'components/LoadingAndNotFound/NotFoundComponent';

// Styles 🖼️
import {fontStyles} from 'styleSheets/fontStyles';
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';

// Helpers 🤝
import {size} from 'react-native-responsive-sizes';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
dayjs.extend(isToday);

// Types

const FlatLengthAvailableScreen = ({
  route,
}: {
  route?: {params: {edit: boolean; advertId: number}};
}) => {
  const edit = route?.params?.edit;
  const advertId = route?.params?.advertId;

  const {
    handleBackButton,
    handleContinue,
    fromDate,
    fromDateSelected,
    handleFromDate,
    errorFromDate,
    untilDate,
    untilDateSelected,
    handleUntilDate,
    errorUntilDate,
    handleToggleToday,
    handleTogglePermanent,
    today,
    permanent,
    handleDateChange,
    handleCancelDate,
    isModalOpen,
    isAdvertLoading,
    isAdvertError,
    isEditAdvertLoading,
    isEditAdvertError,
    fadeInAnim,
    showPopover,
    setShowPopover,
  } = useFlatLengthAvailableScreen(edit, advertId);
  console.log('isEditAdvertLoading: ', isEditAdvertLoading);

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
    <>
      <SafeAreaView style={CoreStyleSheet.safeAreaViewShowContainer}>
        <BackButton onPress={handleBackButton} />
        <RegistrationBackground
          height="100%"
          width="100%"
          style={CoreStyleSheet.backgroundImage}
        />

        <View style={CoreStyleSheet.screenContainer}>
          <HeadlineContainer headlineText="How long is the flat available for rent?" />
          <View style={styles.mainContainer}>
            <View>
              <View style={styles.datePickerContainer}>
                <Text style={fontStyles.headerSmall}>From</Text>
                <Animated.View
                  style={[styles.buttonContainer, {opacity: fadeInAnim}]}>
                  <DatePickerInput
                    date={fromDate}
                    error={errorFromDate}
                    placeholder="First Day"
                    height={60}
                    dateSelected={fromDateSelected}
                    disabled={today}
                    handleOnPress={handleFromDate}
                  />

                  <Text style={[fontStyles.bodyMedium, styles.orText]}>or</Text>
                  <IconButton
                    text="Today"
                    onPress={handleToggleToday}
                    isActive={today}
                    style={styles.setDateButton}
                  />
                </Animated.View>

                {(errorFromDate || isEditAdvertError) && (
                  <ErrorMessage isInputField message={errorFromDate} />
                )}
              </View>

              <View style={styles.datePickerContainer}>
                <Text style={fontStyles.headerSmall}>Until</Text>
                <Animated.View
                  style={[styles.buttonContainer, {opacity: fadeInAnim}]}>
                  <DatePickerInput
                    date={untilDate}
                    error={errorUntilDate}
                    placeholder="Last Day"
                    height={60}
                    disabled={permanent}
                    handleOnPress={handleUntilDate}
                    dateSelected={untilDateSelected}
                  />

                  <Text style={[fontStyles.bodyMedium, styles.orText]}>or</Text>
                  <IconButton
                    text="Permanent"
                    onPress={handleTogglePermanent}
                    isActive={permanent}
                    style={styles.setDateButton}
                  />
                </Animated.View>
              </View>

              {(errorUntilDate || isEditAdvertError) && (
                <ErrorMessage
                  style={styles.errorMessage}
                  isInputField
                  message={errorUntilDate}
                />
              )}
            </View>
          </View>
          <View style={styles.footerContainer}>
            <Divider />
            {!edit && <NewUserPaginationBar />}

            <NewUserJourneyContinueButton
              value={
                edit ? (
                  isEditAdvertLoading ? (
                    <LoadingButtonIcon />
                  ) : (
                    'Save'
                  )
                ) : (
                  'Continue'
                )
              }
              onPress={handleContinue}
              disabled={isEditAdvertLoading}
            />
          </View>
        </View>
        {/* Date Picker */}
        <DatePicker
          modal
          mode="date"
          open={isModalOpen}
          date={fromDate ?? new Date()}
          onConfirm={handleDateChange}
          onCancel={handleCancelDate}
        />
        <NewUserScreensPopover
          showPopover={showPopover}
          setShowPopover={setShowPopover}
        />
      </SafeAreaView>
      <OpacityOverlay loadingState={isEditAdvertLoading} />
    </>
  );
};

const styles = StyleSheet.create({
  datePickerContainer: {
    marginTop: size(26),
    gap: size(5),
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },

  setDateButton: {
    borderWidth: 2,
    paddingVertical: size(14),
    paddingHorizontal: size(16),
    borderRadius: 12,
  },
  orText: {
    marginHorizontal: size(8),
  },

  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  footerContainer: {
    paddingTop: size(20),
    gap: size(10),
  },
  errorMessage: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
});

export default FlatLengthAvailableScreen;
