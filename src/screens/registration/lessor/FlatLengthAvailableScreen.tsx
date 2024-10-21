import React, {useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView, Animated} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';

//Redux 🧠
import {useNewUserCurrentScreen} from 'reduxFeatures/registration/useNewUserCurrentScreen';
import {useNewUserDetails} from 'reduxFeatures/registration/useNewUserDetails';

// Screen 📺
import {newUserScreens} from 'navigationStacks/newUserScreens';

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

//Validation 🛡 ️
import {dateLengthSchema} from 'lib/zodSchema';

// Styles 🖼️
import {fontStyles} from 'styleSheets/fontStyles';
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';

// Helpers 🤝
import {size} from 'react-native-responsive-sizes';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
dayjs.extend(isToday);

// Types
import {NewUserJourneyStackNavigation} from 'navigationStacks/types';

const FlatLengthAvailableScreen = () => {
  // Navigation
  const navigation = useNavigation<NewUserJourneyStackNavigation>();

  // Local State
  const [selector, setSelector] = useState('');
  const [fromDate, setFromDate] = useState<Date | null>(new Date());
  const [fromDateSelected, setFromDateSelected] = useState(false);
  const [untilDate, setUntilDate] = useState<Date | null>(new Date());
  const [untilDateSelected, setUntilDateSelected] = useState(false);
  const [today, setToday] = useState(false);
  const [permanent, setPermanent] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorFromDate, setErrorFromDate] = useState('');
  const [errorUntilDate, setErrorUntilDate] = useState('');

  // Redux
  const {currentScreen, setCurrentScreen} = useNewUserCurrentScreen();
  const {newUserDetails, setNewUserDetails} = useNewUserDetails();
  const savedFromDate =
    newUserDetails.userType === 'lessor' && newUserDetails.fromDate;
  const savedUntilDate =
    newUserDetails.userType === 'lessor' && newUserDetails.untilDate;

  useEffect(() => {
    if (savedFromDate) {
      if (dayjs(new Date()).isToday()) {
        setToday(true);
      }
      setFromDate(new Date(savedFromDate));
      setFromDateSelected(true);
    }
    if (savedUntilDate) {
      setUntilDate(new Date(savedUntilDate));
      setUntilDateSelected(true);
    }
    if (savedUntilDate === null) {
      setPermanent(true);
      setUntilDateSelected(true);
    }
  }, [savedFromDate, savedUntilDate]);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleBackButton = () => {
    const previousScreen = currentScreen - 1;
    navigation.goBack();
    setCurrentScreen(previousScreen);
  };

  const handleFromDate = () => {
    setSelector('from');
    setIsModalOpen(true);
  };

  const handleUntilDate = () => {
    setSelector('until');
    setIsModalOpen(true);
  };

  const handleDateChange = (input: Date) => {
    setIsModalOpen(false);

    if (selector === 'from') {
      setFromDate(input);
      setFromDateSelected(true);
      setToday(dayjs(input).isToday());
      setErrorFromDate('');
    } else if (selector === 'until') {
      setUntilDate(input);
      setPermanent(false);
      setUntilDateSelected(true);
      setErrorUntilDate('');
    }

    setSelector('');
  };

  const handleToggleToday = () => {
    const isTodayDate = today ? fromDate : new Date();
    setFromDate(isTodayDate);
    setFromDateSelected(!today);
    setToday(prev => !prev);
    setErrorFromDate('');
  };

  const handleTogglePermanent = () => {
    setUntilDateSelected(!permanent);
    setUntilDate(null);
    setPermanent(prev => !prev);
    setErrorUntilDate('');
  };

  const handleCancelDate = () => {
    setIsModalOpen(false);
    setSelector('');
  };

  const handleContinue = () => {
    const result = dateLengthSchema.safeParse({
      fromDate: fromDateSelected ? fromDate : undefined,
      untilDate: untilDateSelected && !permanent ? untilDate : null,
      permanent: permanent,
    });

    if (!result.success) {
      const errFromDate = result.error?.flatten().fieldErrors.fromDate?.[0];
      const errUntilDate = result.error?.flatten().fieldErrors.untilDate?.[0];

      if (errFromDate) {
        setErrorFromDate(errFromDate);
      }

      if (errUntilDate) {
        setErrorUntilDate(errUntilDate);
      }

      return;
    }

    setCurrentScreen(currentScreen + 1);
    const screen = newUserScreens.lessor[currentScreen + 1];
    navigation.navigate(screen);

    setNewUserDetails({
      fromDate: fromDate?.toISOString(),
      untilDate: result.data.permanent ? null : untilDate?.toISOString(),
      permanent: result.data.permanent,
    });

    setErrorFromDate('');
    setErrorUntilDate('');
  };

  return (
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
                style={[styles.buttonContainer, {opacity: fadeAnim}]}>
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
              {errorFromDate && (
                <ErrorMessage isInputField message={errorFromDate} />
              )}
            </View>

            <View style={styles.datePickerContainer}>
              <Text style={fontStyles.headerSmall}>Until</Text>
              <Animated.View
                style={[styles.buttonContainer, {opacity: fadeAnim}]}>
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
              {errorUntilDate && (
                <ErrorMessage isInputField message={errorUntilDate} />
              )}
            </View>
          </View>
          <View style={styles.footerContainer}>
            <Divider />
            <NewUserPaginationBar />
            <NewUserJourneyContinueButton
              value="Continue"
              onPress={handleContinue}
            />
          </View>
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
    </SafeAreaView>
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
    paddingBottom: size(20),
    paddingHorizontal: size(16),
    gap: size(10),
  },
});

export default FlatLengthAvailableScreen;
