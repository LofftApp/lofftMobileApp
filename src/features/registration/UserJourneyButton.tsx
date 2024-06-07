import React from 'react';
import {useAppSelector, useAppDispatch} from 'reduxCore/hooks';
import {setUserType} from './userJourneySlice';
import IconButton from 'components/buttons/IconButton';

type UserButton = {
  text: string;
  icon: string;
  style: any;
  onPress: () => void;
  type: string;
};

const UserJourneyButton = ({text, icon, style, onPress, type}: UserButton) => {
  const userType = useAppSelector((state: any) => state.userDetails.userType);
  const dispatch = useAppDispatch();
  return (
    <IconButton
      text={text}
      icon={icon}
      style={style}
      onPress={() => {
        onPress();
        dispatch(setUserType(type));
      }}
    />
  );
};

export default UserJourneyButton;
