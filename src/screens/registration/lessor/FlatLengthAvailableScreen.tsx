import React, {useState} from 'react';
import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  StyleSheet,
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

const FlatLengthAvailableScreen = () => {
  const navigation = useNavigation<NewUserJourneyStackNavigation>();
  const [selector, setSelector] = useState('');
  const [fromDate, setFromDate] = useState(new Date());
  const [fromDateSelected, setFromDateSelected] = useState(false);
  const [untilDate, setUntilDate] = useState(new Date());
  const [untilDateSelected, setUntilDateSelected] = useState(false);
  const [today, setToday] = useState(false);
  const [perminant, setPerminant] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const {currentScreen, setCurrentScreen} = useNewUserCurrentScreen();

  const handleBackButton = () => {
    const previousScreen = currentScreen - 1;
    navigation.goBack();
    setCurrentScreen(previousScreen);
  };

  return (
    <ScreenBackButton nav={handleBackButton}>
      <View style={styles.bodyContainer}>
        <Text style={fontStyles.headerDisplay}>
          How long is the flat available for rent?
        </Text>

        <View style={styles.datePickerContainer}>
          <Text style={fontStyles.headerSmall}>From</Text>
          <View style={styles.buttonContainer}>
            <Pressable
              onPress={() => {
                setModalOpen(true);
                setSelector('from');
                setToday(false);
              }}
              style={styles.dateField}>
              <LofftIcon name="calendar" size={18} />
              <Text
                style={[
                  fontStyles.bodyMedium,
                  styles.dateLabel,
                  fromDateSelected ? styles.selectedDate : null,
                ]}>
                {today
                  ? 'Today'
                  : fromDateSelected
                  ? dateFormatConverter({date: fromDate})
                  : 'Choose date'}
              </Text>
            </Pressable>
            <Text style={[fontStyles.bodyMedium, styles.orText]}>or</Text>
            <TouchableOpacity
              style={[styles.setDateButton, today ? styles.activeButton : null]}
              onPress={() => {
                setFromDate(new Date());
                setFromDateSelected(true);
                setToday(true);
              }}>
              <Text
                style={[
                  fontStyles.bodyMedium,
                  today ? styles.activeButtonText : null,
                ]}>
                Today
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.datePickerContainer}>
          <Text style={fontStyles.headerSmall}>Until</Text>
          <View style={styles.buttonContainer}>
            <Pressable
              onPress={() => {
                setModalOpen(true);
                setSelector('until');
              }}
              style={styles.dateField}>
              <LofftIcon name="calendar" size={18} />
              <Text
                style={[
                  fontStyles.bodyMedium,
                  styles.dateLabel,
                  untilDateSelected ? styles.selectedDate : null,
                ]}>
                {perminant
                  ? 'Choose date'
                  : untilDateSelected
                  ? dateFormatConverter({date: untilDate})
                  : 'Last day'}
              </Text>
            </Pressable>
            <Text style={[fontStyles.bodyMedium, styles.orText]}>or</Text>
            <TouchableOpacity
              style={[
                styles.setDateButton,
                perminant ? styles.activeButton : null,
              ]}
              onPress={() => {
                setPerminant(true);
                setUntilDateSelected(true);
              }}>
              <Text
                style={[
                  fontStyles.bodyMedium,
                  perminant ? styles.activeButtonText : null,
                ]}>
                Perminant
              </Text>
            </TouchableOpacity>
          </View>
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
          open={modalOpen}
          date={fromDate}
          onConfirm={date => {
            setModalOpen(false);
            if (selector === 'from') {
              setFromDate(date);
              setFromDateSelected(true);
            } else if (selector === 'until') {
              setUntilDate(date);
              setPerminant(false);
              setUntilDateSelected(true);
            }
            setSelector('');
          }}
          onCancel={() => {
            setModalOpen(false);
            setSelector('');
          }}
        />
      </View>
    </ScreenBackButton>
  );
};

const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
    marginTop: 82.5,
  },
  datePickerContainer: {
    marginTop: 24,
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
    marginTop: 8,
  },
  activeButton: {
    backgroundColor: Color.Lavendar[100],
  },
  activeButtonText: {
    color: Color.White[100],
  },
});

export default FlatLengthAvailableScreen;
