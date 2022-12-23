import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {setUserType} from './userJourneySlice';
import IconButton from '@Components/buttons/IconButton';

const UserJourneyButton = ({text, icon, style, onPress, type}: any) => {
  const userType = useSelector((state: any) => state.userDetails.userType);
  const dispatch = useDispatch();
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
