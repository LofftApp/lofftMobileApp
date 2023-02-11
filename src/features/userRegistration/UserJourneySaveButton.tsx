import React from 'react';
import {useDispatch} from 'react-redux';
import {saveUserDetails} from './userJourneySlice';

// Components 🪢
import {CoreButton} from '@Components/buttons/CoreButton';

const UserJourneySaveButton = ({value}: any) => {
  const dispatch = useDispatch();
  return (
    <CoreButton
      value={value}
      onPress={() => {
        // onPress();
        dispatch(saveUserDetails());
      }}
    />
  );
};

export default UserJourneySaveButton;
