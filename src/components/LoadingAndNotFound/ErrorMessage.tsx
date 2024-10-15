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
};

const ErrorMessage = ({
  message,
  fontSize = fontStyles.bodySmall,
  style,
}: ErrorMessageProps) => {
  return (
    <View style={style ? style : styles.container}>
      <Text style={[fontSize, styles.errorText]}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: size(5),
    marginBottom: size(10),
  },
  errorText: {
    color: Color.Tomato[100],
    textAlign: 'center',
  },
});

export default ErrorMessage;
