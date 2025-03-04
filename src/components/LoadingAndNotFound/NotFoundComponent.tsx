import {useNavigation} from '@react-navigation/native';
import {Looking} from 'assets';
import BackButton from 'components/buttons/BackButton';
import {CoreButton} from 'components/buttons/CoreButton';
import BackgroundVector1 from 'components/vector/BackgroundVector1';
import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {size} from 'react-native-responsive-sizes';
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';
import {fontStyles} from 'styleSheets/fontStyles';
import Color from 'styleSheets/lofftColorPallet.json';

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
  const navigation = useNavigation();

  const onPressHandler = () => {
    if (onPress) {
      onPress();
    } else {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={CoreStyleSheet.safeAreaViewShowContainer}>
      {backButton && <BackButton onPress={onPressHandler} />}

      <View style={CoreStyleSheet.screenContainer}>
        <View style={styles.ErrorContainer}>
          <Looking height={'50%'} width={'100%'} />

          <BackgroundVector1 />
          <Text style={[fontStyles.headerSmall, styles.textAlign]}>
            {message}
          </Text>
          {buttonValue && (
            <CoreButton value={buttonValue} onPress={onPressHandler} />
          )}
        </View>
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
    marginBottom: size(100),
  },
  textAlign: {
    textAlign: 'center',
    color: Color.Black[50],
  },
  vector1: {
    position: 'absolute',
    top: '100%',
    zIndex: -1,
    left: '-40%',
    opacity: 0.9,
  },
  vector2: {
    position: 'absolute',
    top: '-10%',
    zIndex: -1,
    right: '-35%',
    opacity: 0.9,
  },
});

export default NotFoundComponent;
