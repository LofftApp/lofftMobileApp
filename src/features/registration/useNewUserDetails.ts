import {useAppSelector} from 'reduxCore/hooks';

export const useNewUserDetails = () => {
  const userType = useAppSelector(state => state.newUser.userType);
  const isLessor = userType === 'lessor';
  const isRenter = userType === 'renter';
  const userJourney = useAppSelector(state =>
    isLessor ? state.newUser.lessorJourney : state.newUser.renterJourney,
  );
  const newUserDetails = useAppSelector(state =>
    isLessor
      ? state.newUser.newUserDetails.lessor
      : state.newUser.newUserDetails.renter,
  );

  return {
    userType,
    isLessor,
    isRenter,
    userJourney,
    newUserDetails,
  };
};
