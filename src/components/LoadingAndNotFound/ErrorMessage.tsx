import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { size } from 'react-native-responsive-sizes';
import { createFontStyles } from 'styleSheets/fontStyles';
import Color from 'styleSheets/lofftColorPallet.json';
import { useTheme } from 'components/themes/ThemeContext'; // Assuming you have a ThemeContext

type ErrorMessageProps = {
  message: string;
  fontSize?: {
    fontFamily: string;
    color: string;
    fontSize: number;
    lineHeight: number;
  };
  style?: StyleProp<ViewStyle>;
  isInputField?: boolean;
};

const ErrorMessage = ({
  message,
  fontSize,
  style,
  isInputField = false,
}: ErrorMessageProps) => {
  const { isDarkMode } = useTheme(); // Accessing isDarkMode from ThemeContext
  const dynamicFontStyles = createFontStyles(isDarkMode);
  const textAlign = isInputField ? 'left' : 'center';

  return (
    <View
      style={
        style
          ? style
          : isInputField
          ? styles.inputFieldErrorContainer
          : styles.container
      }>
      <Text
        style={[
          fontSize || dynamicFontStyles.bodySmall,
          { textAlign },
          { color: Color.Dark.Tomato[100] },
        ]}>
        {message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  inputFieldErrorContainer: {
    marginLeft: size(10),
    height: size(23),
  },
  container: {
    marginTop: size(5),
    marginBottom: size(10),
    height: size(23),
    textAlign: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default ErrorMessage;
