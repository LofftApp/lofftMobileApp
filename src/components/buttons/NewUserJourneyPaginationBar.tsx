import React from 'react';
import {useAppSelector} from 'reduxCore/hooks';
import PaginationBar from 'components/bars/PaginationBar';
import {useNewUserType} from 'reduxFeatures/registration/useNewUserType';
import {useNewUserCurrentScreen} from 'reduxFeatures/registration/useNewUserCurrentScreen';

const NewUserPaginationBar = () => {
  const userType = useNewUserType();
  const renterJourney = useAppSelector(state => state.newUser.renterJourney);
  const lessorJourney = useAppSelector(state => state.newUser.lessorJourney);
  const currentScreen = useNewUserCurrentScreen();

  const userJourney = userType === 'lessor' ? lessorJourney : renterJourney;

  return (
    <PaginationBar
      screen={Number(currentScreen) - 1}
      totalScreens={Object.keys(userJourney).length}
      marginVertical={10}
    />
  );
};

export default NewUserPaginationBar;
