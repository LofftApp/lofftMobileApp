import LofftIcon from 'components/lofftIcons/LofftIcon';
import {dateFormatConverter} from 'helpers/dateFormatConverter';
import React, {useEffect, useRef, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {size} from 'react-native-responsive-sizes';
import {fontStyles} from 'styleSheets/fontStyles';
import Color from 'styleSheets/lofftColorPallet.json';

type DatePickerInputProps = {
  setOpen: (value: boolean) => void;
  date: Date | null;
  error?: string;
  placeholder?: string;
  height?: number;
  disabled?: boolean;
  dateSelected?: boolean;
};

const DatePickerInput = ({
  setOpen,
  date,
  error,
  placeholder = 'Select Date',
  height = 48,
  disabled,
  dateSelected = true,
}: DatePickerInputProps) => {
  const [selected, setSelected] = useState(false);
  const dateRef = useRef(date);

  useEffect(() => {
    if (date !== dateRef.current) {
      setSelected(true);
    }
    if (!dateSelected) {
      setSelected(false);
    }
  }, [date, dateSelected]);

  const handleOpen = () => {
    setOpen(true);
  };
  const dateColor = disabled
    ? Color.Black[10]
    : selected
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
      <Pressable disabled={disabled} onPress={handleOpen}>
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
            {selected && date ? dateFormatConverter({date: date}) : placeholder}
          </Text>
        </View>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  dateInput: {
    minWidth: size(200),
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: size(8),
    alignItems: 'center',
    flexDirection: 'row',
    gap: size(10),
    paddingLeft: size(15),
  },
  disabledStyle: {
    backgroundColor: Color.Black[10],
    borderColor: Color.Black[10],
  },

  dateText: {},
});

export default DatePickerInput;
