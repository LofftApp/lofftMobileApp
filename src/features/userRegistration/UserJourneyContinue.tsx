import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {setFlatDetails} from './userJourneySlice';

// Components 🪢
import {CoreButton} from '@Components/buttons/CoreButton';

// Helpers 🤝
import {getKeyByValue} from '@Helpers/getKeyByValue';

const UserJourneyContinue = ({
  onPress,
  value,
  textStyle,
  disabled,
  details,
}: any) => {
  // const userType = useSelector((state: any) => state.userDetails.userType);
  const userJourney = useSelector(
    (state: any) => state.userDetails.userJourney,
  );
  const [currentPageKey] = useState(getKeyByValue(userJourney));
  const dispatch = useDispatch();
  return (
    <CoreButton
      value={value}
      textStyle={textStyle}
      disabled={disabled}
      onPress={() => {
        onPress(userJourney[currentPageKey + 1]);
        dispatch(setFlatDetails(details));
      }}
    />
  );
};

export default UserJourneyContinue;
