import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Animated,
} from 'react-native';
import DatePicker from 'react-native-date-picker';

// Screen 📺
import ScreenBackButton from 'components/coreComponents/ScreenTemplates/ScreenBackButton';

// Components 🪢
import LofftIcon from 'components/lofftIcons/LofftIcon';
import FooterNavBarWithPagination from 'components/bars/FooterNavBarWithPagination';

// Styles 🖼️
import {fontStyles} from 'styleSheets/fontStyles';
import Color from 'styleSheets/lofftColorPallet.json';

// Helpers 🤝
import {dateFormatConverter} from 'helpers/dateFormatConverter';
import {useNewUserCurrentScreen} from 'reduxFeatures/registration/useNewUserCurrentScreen';
import {newUserScreens} from 'components/componentData/newUserScreens';
import {useNavigation} from '@react-navigation/native';
import {NewUserJourneyStackNavigation} from 'navigationStacks/types';
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';
import BackButton from 'components/buttons/BackButton';
import {RegistrationBackground} from 'assets';
import HeadlineContainer from 'components/containers/HeadlineContainer';
import DatePickerInput from 'components/coreComponents/inputField/inputs/DatePickerInput';
import {size} from 'react-native-responsive-sizes';
import IconButton from 'components/buttons/IconButton';

const FlatLengthAvailableScreen = () => {
  const navigation = useNavigation<NewUserJourneyStackNavigation>();
  const [selector, setSelector] = useState('');
  const [fromDate, setFromDate] = useState(new Date());
  const [fromDateSelected, setFromDateSelected] = useState(false);
  const [untilDate, setUntilDate] = useState(new Date());
  const [untilDateSelected, setUntilDateSelected] = useState(false);
  const [today, setToday] = useState(false);
  const [perminant, setPerminant] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {currentScreen, setCurrentScreen} = useNewUserCurrentScreen();
  const [errorDate, setErrorDate] = useState('');

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

  const handleDateChange = (input: Date) => {
    setIsModalOpen(false);
    if (selector === 'from') {
      setFromDate(input);
      setFromDateSelected(true);
    } else if (selector === 'until') {
      setUntilDate(input);
      setPerminant(false);
      setUntilDateSelected(true);
    }
    setSelector('');
  };

  const handleToggleToday = () => {
    setFromDate(new Date());
    setFromDateSelected(prev => !prev);
    setToday(prev => !prev);
  };

  const handleTogglePerminant = () => {
    setUntilDateSelected(prev => !prev);
    setPerminant(prev => !prev);
  };

  const handleCancelDate = () => {
    setIsModalOpen(false);
    setSelector('');
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

        <View style={styles.datePickerContainer}>
          <Text style={fontStyles.headerSmall}>From</Text>
          <Animated.View style={[styles.buttonContainer, {opacity: fadeAnim}]}>
            <DatePickerInput
              date={fromDate}
              setOpen={setIsModalOpen}
              error={errorDate}
              placeholder="First Day"
              height={60}
              dateSelected={fromDateSelected}
            />

            <Text style={[fontStyles.bodyMedium, styles.orText]}>or</Text>
            <IconButton
              text="Today"
              onPress={handleToggleToday}
              isActive={today}
              style={styles.setDateButton}
            />
          </Animated.View>
        </View>

        <View style={styles.datePickerContainer}>
          <Text style={fontStyles.headerSmall}>Until</Text>
          <Animated.View style={[styles.buttonContainer, {opacity: fadeAnim}]}>
            <DatePickerInput
              date={untilDate}
              setOpen={setIsModalOpen}
              error={errorDate}
              placeholder="Last Day"
              height={60}
              disabled={perminant}
            />

            <Text style={[fontStyles.bodyMedium, styles.orText]}>or</Text>
            <IconButton
              text="Perminant"
              onPress={handleTogglePerminant}
              isActive={perminant}
              style={styles.setDateButton}
            />
          </Animated.View>
        </View>
        <FooterNavBarWithPagination
          disabled={!(fromDateSelected && untilDateSelected)}
          onPress={() => {
            navigation.navigate(newUserScreens.lessor[currentScreen + 1]);
            setCurrentScreen(currentScreen + 1);
          }}
          details={{
            fromDate: String(fromDate),
            untilDate: String(untilDate),
            perminant,
          }}
        />
        {/* Date Picker */}
        <DatePicker
          modal
          mode="date"
          open={isModalOpen}
          date={fromDate}
          onConfirm={handleDateChange}
          onCancel={handleCancelDate}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  datePickerContainer: {
    marginTop: size(26),
    gap: size(5),
  },
  dateField: {
    minWidth: 183,
    flexDirection: 'row',
    borderWidth: 2,
    paddingVertical: 14,
    paddingHorizontal: 19,
    borderRadius: 16,
    alignItems: 'center',
  },
  dateLabel: {
    marginLeft: 11,
    color: Color.Black[30],
  },
  setDateButton: {
    borderWidth: 2,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  orText: {
    marginHorizontal: 8,
  },
  selectedDate: {
    color: Color.Black[100],
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: Color.Lavendar[100],
  },
  activeButtonText: {
    color: Color.White[100],
  },
});

export default FlatLengthAvailableScreen;
