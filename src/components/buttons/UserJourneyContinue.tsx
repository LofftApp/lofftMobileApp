import React, {useState} from 'react';
import {useAppSelector, useAppDispatch} from 'reduxCore/hooks';
import {
  setCurrentScreen,
  setDetails,
} from '../../features/registration/newUserSlice';

// Components 🪢
import {CoreButton} from 'components/buttons/CoreButton';

// Helpers 🤝
import {GetKeyByValue} from 'helpers/getKeyByValue';

const UserJourneyContinue = ({
  onPress,
  value,
  textStyle,
  disabled,
  details,
}: any) => {
  const currentScreen = useAppSelector(state => state.newUser.currentScreen);

  const dispatch = useAppDispatch();
  const handleOnPress = () => {
    const nextScreen = (Number(currentScreen) + 1).toString();
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

export default UserJourneyContinue;
