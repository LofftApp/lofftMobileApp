import React, {useState} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import ScreenBackButton from '../../../components/coreComponents/CoreScreens/ScreenBackButton';
import DatePicker from 'react-native-date-picker';
import {fontStyles} from '../../../styles/fontStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import InputFieldText from '../../../components/coreComponents/inputField/InputFieldText';
import PaginationBar from '../../../components/bars/PaginationBar';
import {CoreButton} from '../../../components/buttons/CoreButton';
import Color from '../../../styles/lofftColorPallet.json';
import {dateFormatConverter} from '../../../helpers/dateFormatConverter';

const FlatLengthAvailableScreen = ({navigation}) => {
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
          <Pressable
            onPress={() => setModalOpen(true)}
            style={styles.dateField}>
            <Icon name="calendar-outline" size={18} />
            <Text style={[fontStyles.bodyMedium, styles.dateLabel]}>
              {fromDateSelected
                ? dateFormatConverter({date: fromDate})
                : 'First day'}
            </Text>
          </Pressable>
        </View>

        <View style={styles.datePickerContainer}>
          <Text style={fontStyles.headerSmall}>Until</Text>
          <Pressable
            onPress={() => setModalOpen(true)}
            style={styles.dateField}>
            <Icon name="calendar-outline" size={18} />
            <Text style={[fontStyles.bodyMedium, styles.dateLabel]}>
              {untilDateSelected
                ? dateFormatConverter({date: untilDate})
                : 'Last day'}
            </Text>
          </Pressable>
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
    flexDirection: 'row',
    marginTop: 8,
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
  footerContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    marginTop: 35,
    marginBottom: 10,
    paddingVertical: 10,
  },
});

export default FlatLengthAvailableScreen;