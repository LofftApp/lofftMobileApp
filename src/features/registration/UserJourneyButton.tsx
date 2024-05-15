import React from 'react';
import {useAppSelector, useAppDispatch} from '@ReduxCore/hooks';
import {setUserType} from './userJourneySlice';
import IconButton from 'components/buttons/IconButton';

const UserJourneyButton = ({text, icon, style, onPress, type}: any) => {
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
