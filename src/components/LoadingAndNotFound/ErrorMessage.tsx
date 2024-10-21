import React from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {size} from 'react-native-responsive-sizes';
import {fontStyles} from 'styleSheets/fontStyles';
import Color from 'styleSheets/lofftColorPallet.json';

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
  fontSize = fontStyles.bodySmall,
  style,
  isInputField = false,
}: ErrorMessageProps) => {
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
        style={[fontSize, {textAlign: textAlign}, {color: Color.Tomato[100]}]}>
        {message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  inputFieldErrorContainer: {
    marginTop: size(0),
    marginBottom: size(0),
    marginLeft: size(10),
    height: size(23),
 
  },
  container: {
    marginTop: size(5),
    marginBottom: size(10),
    height: size(23),
  },
});

export default ErrorMessage;
