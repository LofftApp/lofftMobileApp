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
import ScreenBackButton from '@Components/coreComponents/ScreenTemplates/ScreenBackButton';

// Components 🪢
import LofftIcon from '@Components/lofftIcons/LofftIcon';
import PaginationBar from '@Components/bars/PaginationBar';
import {CoreButton} from '@Components/buttons/CoreButton';

// Styles 🖼️
import {fontStyles} from '@StyleSheets/fontStyles';
import Color from '@StyleSheets/lofftColorPallet.json';

// Helpers 🤝
import {dateFormatConverter} from '@Helpers/dateFormatConverter';

const FlatLengthAvailableScreen = ({navigation}: any) => {
  const [fromDate, setFromDate] = useState(new Date());
  const [fromDateSelected, setFromDateSelected] = useState(false);
  const [untilDate, setUntilDate] = useState(new Date());
  const [untilDateSelected, setUntilDateSelected] = useState(false);
  const [perminant, setPerminant] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <ScreenBackButton nav={() => navigation.goBack()}>
      <View style={styles.bodyContainer}>
        <Text style={fontStyles.headerDisplay}>
          How long is the flat available for rent?
        </Text>

        <View style={styles.datePickerContainer}>
          <Text style={fontStyles.headerSmall}>From</Text>
          <View style={styles.buttonContainer}>
            <Pressable
              onPress={() => setModalOpen(true)}
              style={styles.dateField}>
              <LofftIcon name="calendar" size={18} />
              <Text style={[fontStyles.bodyMedium, styles.dateLabel]}>
                {fromDateSelected
                  ? dateFormatConverter({date: fromDate})
                  : 'First day'}
              </Text>
            </Pressable>
            <Text style={[fontStyles.bodyMedium, styles.orText]}>or</Text>
            <TouchableOpacity
              style={styles.setDateButton}
              onPress={() => {
                setFromDate(new Date());
                setFromDateSelected(true);
              }}>
              <Text style={fontStyles.bodyMedium}>Today</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.datePickerContainer}>
          <Text style={fontStyles.headerSmall}>Until</Text>
          <View style={styles.buttonContainer}>
            <Pressable
              onPress={() => setModalOpen(true)}
              style={styles.dateField}>
              <LofftIcon name="calendar" size={18} />
              <Text style={[fontStyles.bodyMedium, styles.dateLabel]}>
                {untilDateSelected
                  ? dateFormatConverter({date: untilDate})
                  : 'Last day'}
              </Text>
            </Pressable>
            <Text style={[fontStyles.bodyMedium, styles.orText]}>or</Text>
            <TouchableOpacity
              style={styles.setDateButton}
              onPress={() => setPerminant(true)}>
              <Text style={fontStyles.bodyMedium}>Perminant</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.footerContainer}>
          <PaginationBar screen={1} totalScreens={5} />
          <CoreButton
            value="Continue"
            textStyle={[fontStyles.headerSmall, {color: 'white'}]}
            onPress={() => navigation.navigate('FlatLengthAvailableScreen')}
          />
        </View>
        {/* Date Picker */}
        <DatePicker
          modal
          open={modalOpen}
          date={fromDate}
          onConfirm={date => {
            setModalOpen(false);
            setFromDate(date);
          }}
          onCancel={() => {
            setModalOpen(false);
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
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  footerContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    marginTop: 35,
    marginBottom: 10,
    paddingVertical: 10,
  },
});

export default FlatLengthAvailableScreen;
