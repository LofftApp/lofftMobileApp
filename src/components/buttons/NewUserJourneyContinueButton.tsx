import React from 'react';

// Components 🪢
import {CoreButton} from 'components/buttons/CoreButton';
import {useNewUserCurrentScreen} from 'reduxFeatures/registration/useNewUserCurrentScreen';
import {NewUserJourneyContinueButtonProps} from './types';

const NewUserJourneyContinueButton = ({
  onPress,
  value,
  textStyle,
  disabled,
}: NewUserJourneyContinueButtonProps) => {
  const {currentScreen, setCurrentScreen} = useNewUserCurrentScreen();

  const handleOnPress = () => {
    const nextScreen = currentScreen + 1;
    setCurrentScreen(nextScreen);
    onPress();
  };
  return (
    <CoreButton
      value={value}
      textStyle={textStyle}
      disabled={disabled}
      onPress={handleOnPress}
    />
  );
};

export default NewUserJourneyContinueButton;
