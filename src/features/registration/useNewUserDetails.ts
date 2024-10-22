import {useAppDispatch, useAppSelector} from 'reduxCore/hooks';
import {
  setUserType as _setUserType,
  setNewUserDetails as _setNewUserDetails,
  NewUserLessorDetails,
  NewUserTenantDetails,
} from './newUserSlice';

export const useNewUserDetails = () => {
  const dispatch = useAppDispatch();
  const userType = useAppSelector(state => state.newUser.userType);
  const isLessor = userType === 'lessor';
  const isTenant = userType === 'tenant';
  const setUserType = (type: 'lessor' | 'tenant' | '') => {
    dispatch(_setUserType(type));
  };
  const userJourney = useAppSelector(state =>
    isLessor ? state.newUser.lessorJourney : state.newUser.tenantJourney,
  );

  const newUserDetails = useAppSelector(state =>
    isLessor
      ? state.newUser.newUserDetails.lessor
      : state.newUser.newUserDetails.tenant,
  );

  const setNewUserDetails = (
    details: Partial<NewUserLessorDetails> | Partial<NewUserTenantDetails>,
  ) => {
    dispatch(_setNewUserDetails(details));
  };

  return {
    userType,
    setUserType,
    isLessor,
    isTenant,
    userJourney,
    newUserDetails,
    setNewUserDetails,
  };
};
