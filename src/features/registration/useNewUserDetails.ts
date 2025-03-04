import {useAppDispatch, useAppSelector} from 'reduxCore/hooks';
import {
  setUserType as _setUserType,
  setNewUserDetails as _setNewUserDetails,
  resetNewUserState as _resetNewUserState,
} from './newUserSlice';
import {NewUserLessorDetails, NewUserTenantDetails} from './types';
import {useEffect, useCallback} from 'react';
import {UserType} from 'reduxFeatures/user/types';
import {useUserType} from 'reduxFeatures/user/useUserType';

export const useNewUserDetails = (edit: boolean = false) => {
  const dispatch = useAppDispatch();
  const {isLessor} = useUserType();
  const userType = useAppSelector(state => state.newUser.userType);
  const isNewUserLessor = userType === UserType.LESSOR;
  const isNewUserTenant = userType === UserType.TENANT;
  const setUserType = useCallback(
    (type: UserType.LESSOR | UserType.TENANT | '') => {
      dispatch(_setUserType(type));
    },
    [dispatch],
  );

  useEffect(() => {
    if (edit) {
      if (isLessor) {
        console.log('BECOME LESSOR');
        setUserType(UserType.LESSOR);
      } else {
        console.log('BECOME TENANT');
        setUserType(UserType.TENANT);
      }
    }
  }, [edit, isLessor, userType, setUserType]);

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

  const resetNewUserState = () => {
    dispatch(_resetNewUserState());
  };

  return {
    userType,
    setUserType,
    isNewUserLessor,
    isNewUserTenant,
    userJourney,
    newUserDetails,
    setNewUserDetails,
    resetNewUserState,
  };
};
