import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {setFlatDetails} from './userJourneySlice';
import {CoreButton} from '@Components/buttons/CoreButton';

const UserJourneyContinue = ({value, textStyle, onPress, details}: any) => {
  const userType = useSelector((state: any) => state.userDetails.userType);
  const dispatch = useDispatch();
  return (
    <CoreButton
      value={value}
      textStyle={textStyle}
      onPress={() => {
        onPress();
        dispatch(setFlatDetails(details));
      }}
    />
  );
};

export default UserJourneyContinue;
