import {useNavigation} from '@react-navigation/native';
import BackButton from 'components/buttons/BackButton';
import {CoreButton} from 'components/buttons/CoreButton';
import { useTheme } from 'components/themes/ThemeContext';
import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {size} from 'react-native-responsive-sizes';
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';
import { createFontStyles } from 'styleSheets/fontStylesTest';

type NotFoundComponentProps = {
  message: string;
  backButton?: boolean;
  buttonValue?: string;
  onPress?: () => void;
};

const NotFoundComponent = ({
  message,
  backButton,
  buttonValue,
  onPress,
}: NotFoundComponentProps) => {
  const coreStyles = CoreStyleSheet();
  const {isDarkMode} = useTheme();
  const fontStyles = createFontStyles(isDarkMode);
  const navigation = useNavigation();

  const onPressHandler = () => {
    if (onPress) {
      onPress();
    } else {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={coreStyles.safeAreaViewShowContainer}>
      {backButton && <BackButton onPress={onPressHandler} />}
      <View style={styles.ErrorContainer}>
        <Text style={[fontStyles.headerSmall, styles.textAlign]}>
          {message}
        </Text>
        {buttonValue && (
          <CoreButton value={buttonValue} onPress={onPressHandler} />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  ErrorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: size(16),
    gap: size(16),
    textAlign: 'center',
  },
  textAlign: {
    textAlign: 'center',
  },
});

export default NotFoundComponent;
