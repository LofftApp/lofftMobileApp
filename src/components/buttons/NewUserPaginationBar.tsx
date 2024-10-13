import React from 'react';
import PaginationBar from 'components/bars/PaginationBar';
import {useNewUserCurrentScreen} from 'reduxFeatures/registration/useNewUserCurrentScreen';
import {useNewUserDetails} from 'reduxFeatures/registration/useNewUserDetails';

const NewUserPaginationBar = () => {
  const {currentScreen} = useNewUserCurrentScreen();
  const {userJourney} = useNewUserDetails();

  return (
    <PaginationBar
      screen={Number(currentScreen) - 1}
      totalScreens={Object.keys(userJourney).length}
      marginVertical={10}
    />
  );
};

export default NewUserPaginationBar;
