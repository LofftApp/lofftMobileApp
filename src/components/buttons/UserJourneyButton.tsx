import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from 'reduxCore/hooks';
import {setUserType} from '../../features/registration/userJourneySlice';
import IconButton from 'components/buttons/IconButton';

type UserButton = {
  text: string;
  icon: string;
  style?: any;
  onPress: () => void;
  type: 'lessor' | 'renter';
};

const UserJourneyButton = ({
  text,
  icon,
  style,
  onPress,
  isActive,
}: UserButton) => {
  const handleOnPress = () => {
    onPress();
  };
  return (
    <IconButton
      animation
      text={text}
      icon={icon}
      style={style}
      onPress={handleOnPress}
      isActive={isActive}
    />
  );
};

export default UserJourneyButton;
