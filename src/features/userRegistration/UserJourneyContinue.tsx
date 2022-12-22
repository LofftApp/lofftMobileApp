import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {setFlatDetails} from './userJourneySlice';
import {CoreButton} from '@Components/buttons/CoreButton';

const UserJourneyContinue = ({
  onPress,
  value,
  textStyle,
  disabled,
  details,
}: any) => {
  const userType = useSelector((state: any) => state.userDetails.userType);
  const activeScreen = useSelector(
    (state: any) => state.userDetails.activeScreen,
  );
  const userJourney = useSelector(
    (state: any) => state.userDetails.userJourney,
  );
  // console.log(userJourney[activeScreen + 1]);
  const dispatch = useDispatch();
  return (
    <CoreButton
      value={value}
      textStyle={textStyle}
      disabled={disabled}
      onPress={() => {
        onPress(userJourney[activeScreen + 1].screenName);
        dispatch(setFlatDetails(details));
      }}
    />
  );
};

export default UserJourneyContinue;
