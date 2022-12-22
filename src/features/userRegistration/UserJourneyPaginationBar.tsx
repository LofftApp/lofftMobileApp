import React from 'react';
import {useSelector} from 'react-redux';
import {setUserType} from './userJourneySlice';
import PaginationBar from '@Components/bars/PaginationBar';

const UserJourneyPaginationBar = () => {
  // const count = useSelector(state => state.counter.value);
  const activeScreen = useSelector(
    (state: any) => state.userDetails.activeScreen,
  );
  const userJourney = useSelector(
    (state: any) => state.userDetails.userJourney,
  );
  return (
    <PaginationBar
      screen={activeScreen}
      totalScreens={Object.keys(userJourney).length}
    />
  );
};

export default UserJourneyPaginationBar;
