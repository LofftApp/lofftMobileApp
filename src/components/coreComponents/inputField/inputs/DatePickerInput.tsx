import LofftIcon from 'components/lofftIcons/LofftIcon';
import {dateFormatConverter} from 'helpers/dateFormatConverter';
import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {size} from 'react-native-responsive-sizes';
import {fontStyles} from 'styleSheets/fontStyles';
import Color from 'styleSheets/lofftColorPallet.json';

type DatePickerInputProps = {
  handleOnPress: () => void;
  date: Date | null;
  error?: string;
  placeholder?: string;
  height?: number;
  disabled?: boolean;
  dateSelected?: boolean;
};

const DatePickerInput = ({
  handleOnPress,
  date,
  error,
  placeholder = 'Select Date',
  height = 48,
  disabled,
  dateSelected,
}: DatePickerInputProps) => {
  const dateColor = disabled
    ? Color.Black[10]
    : dateSelected
    ? Color.Black[100]
    : Color.Black[30];
  const borderColor = disabled
    ? Color.Black[10]
    : error
    ? Color.Tomato[100]
    : Color.Black[50];

  const iconColor = disabled ? Color.Black[30] : Color.Black[100];

  return (
    <>
      <Pressable disabled={disabled} onPress={handleOnPress}>
        <View
          style={[
            styles.dateInput,
            {borderColor: borderColor},
            {height: height},
          ]}>
          <LofftIcon name="calendar" size={18} color={iconColor} />
          <Text
            style={[
              fontStyles.bodyMedium,
              styles.dateText,
              {color: dateColor},
            ]}>
            {dateSelected && date
              ? dateFormatConverter({date: date})
              : placeholder}
          </Text>
        </View>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  dateInput: {
    minWidth: size(168),
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: size(8),
    alignItems: 'center',
    flexDirection: 'row',
    gap: size(10),
    paddingLeft: size(10),
  },
  disabledStyle: {
    backgroundColor: Color.Black[10],
    borderColor: Color.Black[10],
  },

  dateText: {},
});

export default DatePickerInput;
