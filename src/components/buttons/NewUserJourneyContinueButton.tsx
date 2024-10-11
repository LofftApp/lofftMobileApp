import React from 'react';
import {useAppDispatch} from 'reduxCore/hooks';
import {setCurrentScreen} from '../../features/registration/newUserSlice';

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
  const currentScreen = useNewUserCurrentScreen();
  const dispatch = useAppDispatch();
  const handleOnPress = () => {
    const nextScreen = currentScreen + 1;
    dispatch(setCurrentScreen(nextScreen));
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
