import {useAppDispatch, useAppSelector} from 'reduxCore/hooks';
import {setUserType as _setUserType} from './newUserSlice';

export const useNewUserDetails = () => {
  const dispatch = useAppDispatch();
  const userType = useAppSelector(state => state.newUser.userType);
  const isLessor = userType === 'lessor';
  const isRenter = userType === 'renter';
  const setUserType = (type: string) => {
    dispatch(_setUserType(type));
  };
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
    setUserType,
    isLessor,
    isRenter,
    userJourney,
    newUserDetails,
  };
};
