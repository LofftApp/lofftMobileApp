import React from 'react';
import {useAppSelector} from 'reduxCore/hooks';
import PaginationBar from 'components/bars/PaginationBar';
import {useNewUserType} from 'reduxFeatures/registration/useNewUserType';

const UserJourneyPaginationBar = () => {
  const userType = useNewUserType();
  const renterJourney = useAppSelector(state => state.newUser);
  const lessorJourney = useAppSelector(state => state.newUser.lessorJourney);
  const currentScreen = useAppSelector(state => state.newUser.currentScreen);

  const userJourney = userType === 'lessor' ? lessorJourney : renterJourney;
  console.log('userJourney', renterJourney);
  return (
    <PaginationBar
      screen={Number(currentScreen) - 1}
      totalScreens={Object.keys(userJourney).length}
      marginVertical={10}
    />
  );
};

export default UserJourneyPaginationBar;
