import {dateFormatConverter} from 'helpers/dateFormatConverter';
import React, {useEffect, useRef, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {size} from 'react-native-responsive-sizes';
import {fontStyles} from 'styleSheets/fontStyles';
import Color from 'styleSheets/lofftColorPallet.json';

type DatePickerInputProps = {
  setOpen: (value: boolean) => void;
  date: Date | null;
};

const DatePickerInput = ({setOpen, date}: DatePickerInputProps) => {
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
  return (
    <>
      <Pressable onPress={handleOpen}>
        <View style={styles.dateInput}>
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
    marginBottom: size(8),
    borderWidth: 2,
    borderRadius: 12,
    borderColor: Color.Black[50],
    paddingHorizontal: size(8),
    height: size(48),
    justifyContent: 'center',
  },

  dateText: {
    marginLeft: size(15),
  },
});

export default DatePickerInput;
