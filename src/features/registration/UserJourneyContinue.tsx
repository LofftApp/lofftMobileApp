import React, {useState} from 'react';
import {useAppSelector, useAppDispatch} from '@ReduxCore/hooks';
import {setDetails} from './userJourneySlice';

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
  const userJourney = useAppSelector(
    (state: any) => state.userDetails.userJourney,
  );
  const [currentPageKey] = useState(getKeyByValue(userJourney));
  const dispatch = useAppDispatch();
  return (
    <CoreButton
      value={value}
      textStyle={textStyle}
      disabled={disabled}
      onPress={() => {
        onPress(userJourney[currentPageKey + 1]);
        dispatch(setDetails(details));
      }}
    />
  );
};

export default UserJourneyContinue;
