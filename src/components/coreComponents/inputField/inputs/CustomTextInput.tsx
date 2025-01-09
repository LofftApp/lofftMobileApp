import {MIN_DESCRIPTION_CHARS} from 'components/componentData/constants';
import ErrorMessage from 'components/LoadingAndNotFound/ErrorMessage';
import { useTheme } from 'components/themes/ThemeContext';
import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {size} from 'react-native-responsive-sizes';
import { createFontStyles } from 'styleSheets/fontStyles';
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
  // CoreStyles
  const {isDarkMode} = useTheme();
  const colors = isDarkMode ? Color.Dark : Color.Light;
  const fontStyles = createFontStyles(isDarkMode);

  const styles = StyleSheet.create({
    textContainer: {
      minHeight: '90%',
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
    minTextContainer: {
      flexDirection: 'row',
      height: size(20),
      flexWrap: 'wrap',
    },
    minText: {
      color: colors.Black[80],
    },
  });
  return (
    <View style={styles.textContainer}>
      <TextInput
        keyboardType="default"
        placeholder={placeholder}
        placeholderTextColor={colors.Black[50]}
        value={text}
        style={[
          styles.inputText,
          fontStyles.bodySmall,
          {
            borderColor: textFocus
              ? error
                ? colors.Tomato[100]
                : colors.Lavendar[100]
              : colors.Black[50],
          },
        ]}
        onChangeText={handleOnChange}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        multiline={true}
      />
      <View style={styles.minTextContainer}>
        <Text style={[fontStyles.bodySmall, styles.minText]}>
          {text.length < MIN_DESCRIPTION_CHARS &&
            !error &&
            `*Share your ${isFlat ? "flat's " : ''}story in ${
              MIN_DESCRIPTION_CHARS - text.length
            } word${MIN_DESCRIPTION_CHARS - text.length === 1 ? '' : 's'} or ${
              isFlat ? '  ' : ''
            }more`}
          {error && <ErrorMessage isInputField message={error} />}
        </Text>
      </View>
    </View>
  );
};

export default CustomTextInput;
