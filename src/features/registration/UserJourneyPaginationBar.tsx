import React, {useState} from 'react';
import {useAppSelector} from '@ReduxCore/hooks';
import PaginationBar from '@Components/bars/PaginationBar';
import {getKeyByValue} from '@Helpers/getKeyByValue';

const UserJourneyPaginationBar = () => {
  const userJourney = useAppSelector(
    (state: any) => state.userDetails.userJourney,
  );
  const [activeScreen] = useState(getKeyByValue(userJourney));

  return (
    <PaginationBar
      screen={activeScreen}
      totalScreens={Object.keys(userJourney).length}
    />
  );
};

export default UserJourneyPaginationBar;
