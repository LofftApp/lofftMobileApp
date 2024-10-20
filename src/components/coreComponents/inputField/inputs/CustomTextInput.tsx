import {MIN_DESCRIPTION_CHARS} from 'components/componentData/constants';
import ErrorMessage from 'components/LoadingAndNotFound/ErrorMessage';
import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {size} from 'react-native-responsive-sizes';
import {fontStyles} from 'styleSheets/fontStyles';
import Color from 'styleSheets/lofftColorPallet.json';

type CustomTextInputProps = {
  text: string;
  textFocus: boolean;
  error: string;
  handleOnChange: (text: string) => void;
  handleOnFocus: () => void;
  handleOnBlur: () => void;
  placeholder: string;
  isFlat?: boolean;
};
const CustomTextInput = ({
  text,
  textFocus,
  error,
  handleOnChange,
  handleOnFocus,
  handleOnBlur,
  placeholder,
  isFlat,
}: CustomTextInputProps) => {
  return (
    <View style={styles.textContainer}>
      <TextInput
        keyboardType="default"
        placeholder={placeholder}
        placeholderTextColor={Color.Black[50]}
        value={text}
        style={[
          styles.inputText,
          fontStyles.bodySmall,
          {
            borderColor: textFocus
              ? error
                ? Color.Tomato[100]
                : Color.Lavendar[100]
              : Color.Black[50],
          },
        ]}
        onChangeText={handleOnChange}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        multiline={true}
      />
      <Text style={[fontStyles.bodySmall, styles.minText]}>
        {text.length < MIN_DESCRIPTION_CHARS &&
          !error &&
          `*Share your ${isFlat ? "flat's " : ''}story in ${
            MIN_DESCRIPTION_CHARS - text.length
          } word${
            MIN_DESCRIPTION_CHARS - text.length === 1 ? '' : 's'
          } or more`}
        {error && <ErrorMessage isInputField message={error} />}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    height: '70%',
    paddingHorizontal: size(10),
    paddingVertical: size(10),
    gap: size(10),
  },
  inputText: {
    borderWidth: 2,
    paddingLeft: size(10),
    paddingVertical: size(5),
    flex: 1,
    borderRadius: 12,
  },
  minText: {
    color: Color.Black[80],
  },
});

export default CustomTextInput;
