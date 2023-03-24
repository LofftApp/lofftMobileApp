import React from 'react';
import {useAppDispatch} from './../../app/hooks';
import {saveUserDetails} from './userJourneySlice';

// Components 🪢
import {CoreButton} from '@Components/buttons/CoreButton';

const UserJourneySaveButton = ({onPress, value}: any) => {
  const dispatch = useAppDispatch();
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
