import React, {useState} from 'react';
import {useAppSelector, useAppDispatch} from 'reduxCore/hooks';
import {setDetails} from '../../features/registration/userJourneySlice';

// Components 🪢
import {CoreButton} from 'components/buttons/CoreButton';

// Helpers 🤝
import {GetKeyByValue} from 'helpers/getKeyByValue';

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
  const [currentPageKey] = useState(GetKeyByValue(userJourney));
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
