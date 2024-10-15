import React, {useState} from 'react';
import {useAppSelector} from 'reduxCore/hooks';
import PaginationBar from 'components/bars/PaginationBar';
import {GetKeyByValue} from 'helpers/getKeyByValue';

const UserJourneyPaginationBar = () => {
  const userJourney = useAppSelector(
    (state: any) => state.userDetails.userJourney,
  );
  const [activeScreen] = useState(GetKeyByValue(userJourney));

  return (
    <PaginationBar
      screen={activeScreen}
      totalScreens={Object.keys(userJourney).length}
      marginVertical={10} // Added marginVertical prop, as it was missing
    />
  );
};

export default UserJourneyPaginationBar;
