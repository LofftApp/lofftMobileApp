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
};

const DatePickerInput = ({setOpen, date, error}: DatePickerInputProps) => {
  const [selected, setSelected] = useState(false);
  const dateRef = useRef(date);

  useEffect(() => {
    if (date !== dateRef.current) {
      setSelected(true);
    }
  }, [date]);

  const handleOpen = () => {
    setOpen(true);
  };
  const dateColor = selected ? Color.Black[100] : Color.Black[30];
  const borderColor = error ? Color.Tomato[100] : Color.Black[50];
  return (
    <>
      <Pressable onPress={handleOpen}>
        <View style={[styles.dateInput, {borderColor: borderColor}]}>
          <LofftIcon name="calendar" size={18} />
          <Text
            style={[
              fontStyles.bodyMedium,
              styles.dateText,
              {color: dateColor},
            ]}>
            {selected && date
              ? dateFormatConverter({date: date})
              : 'Select Date'}
          </Text>
        </View>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  dateInput: {
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: size(8),
    height: size(48),
    alignItems: 'center',
    flexDirection: 'row',
    gap: size(10),
    paddingLeft: size(15),
  },

  dateText: {
  },
});

export default DatePickerInput;
