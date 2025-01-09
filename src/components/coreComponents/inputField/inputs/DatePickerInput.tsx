import LofftIcon from 'components/lofftIcons/LofftIcon';
import { useTheme } from 'components/themes/ThemeContext';
import {dateFormatConverter} from 'helpers/dateFormatConverter';
import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {size} from 'react-native-responsive-sizes';
import { createFontStyles } from 'styleSheets/fontStyles';
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
  // CoreStyles
  const {isDarkMode} = useTheme();
  const colors = isDarkMode ? Color.Dark : Color.Light;
  const fontStyles = createFontStyles(isDarkMode);

  const dateColor = disabled
    ? colors.Black[10]
    : dateSelected
    ? colors.Black[100]
    : colors.Black[30];
  const borderColor = disabled
    ? colors.Black[10]
    : error
    ? colors.Tomato[100]
    : colors.Black[50];

  const iconColor = disabled ? colors.Black[30] : colors.Black[100];

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
      backgroundColor: colors.Black[10],
      borderColor: colors.Black[10],
    },

    dateText: {},
  });

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

export default DatePickerInput;
