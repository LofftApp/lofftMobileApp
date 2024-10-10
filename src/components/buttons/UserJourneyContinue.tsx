import React from 'react';
import {useAppSelector, useAppDispatch} from 'reduxCore/hooks';
import {setCurrentScreen} from '../../features/registration/newUserSlice';

// Components 🪢
import {CoreButton} from 'components/buttons/CoreButton';

// Helpers 🤝

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

export default UserJourneyContinue;
