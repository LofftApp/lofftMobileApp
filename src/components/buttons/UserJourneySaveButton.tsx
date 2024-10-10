import React from 'react';
import {useDispatch} from 'react-redux';
import {saveUserDetails} from '../../features/registration/newUserSlice';

// Components 🪢
import {CoreButton} from 'components/buttons/CoreButton';

const UserJourneySaveButton = ({onPress, value}: any) => {
  const dispatch = useDispatch();
  return (
    <CoreButton
      value={value}
      onPress={() => {
        onPress();
        dispatch(saveUserDetails());
      }}
    />
  );
};

export default UserJourneySaveButton;
