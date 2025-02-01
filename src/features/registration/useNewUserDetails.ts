import {useAppDispatch, useAppSelector} from 'reduxCore/hooks';
import {
  setUserType as _setUserType,
  setNewUserDetails as _setNewUserDetails,
} from './newUserSlice';
import {NewUserLessorDetails, NewUserTenantDetails} from './types';

export const useNewUserDetails = (isLessor: boolean) => {
  const dispatch = useAppDispatch();
  const userType = useAppSelector(state => state.newUser.userType);
  const isNewUserLessor = userType === 'lessor';
  const isNewUserTenant = userType === 'tenant';
  const setUserType = (type: 'lessor' | 'tenant' | '') => {
    dispatch(_setUserType(type));
  };
  const userJourney = useAppSelector(state =>
    isNewUserLessor || isLessor
      ? state.newUser.lessorJourney
      : state.newUser.tenantJourney,
  );

  const newUserDetails = useAppSelector(state =>
    isNewUserLessor || isLessor
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
    isNewUserLessor,
    isNewUserTenant,
    userJourney,
    newUserDetails,
    setNewUserDetails,
  };
};
