import {useAppDispatch, useAppSelector} from 'reduxCore/hooks';
import {
  setUserType as _setUserType,
  setNewUserDetails as _setNewUserDetails,
  NewUserLessorDetails,
  NewUserRenterDetails,
} from './newUserSlice';

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

  const setNewUserDetails = (
    details: Partial<NewUserLessorDetails> | Partial<NewUserRenterDetails>,
  ) => {
    dispatch(_setNewUserDetails(details));
  };

  return {
    userType,
    setUserType,
    isLessor,
    isRenter,
    userJourney,
    newUserDetails,
    setNewUserDetails,
  };
};
