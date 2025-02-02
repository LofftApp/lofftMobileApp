import {useAppDispatch, useAppSelector} from 'reduxCore/hooks';
import {
  setUserType as _setUserType,
  setNewUserDetails as _setNewUserDetails,
  resetNewUserState as _resetNewUserState,
} from './newUserSlice';
import {NewUserLessorDetails, NewUserTenantDetails} from './types';
import {useEffect, useCallback} from 'react';

export const useNewUserDetails = (isLessor: boolean, edit: boolean = false) => {
  const dispatch = useAppDispatch();
  const userType = useAppSelector(state => state.newUser.userType);
  const isNewUserLessor = userType === 'lessor';
  const isNewUserTenant = userType === 'tenant';
  const setUserType = useCallback(
    (type: 'lessor' | 'tenant' | '') => {
      dispatch(_setUserType(type));
    },
    [dispatch],
  );

  useEffect(() => {
    if (edit) {
      if (isLessor) {
        console.log('BECOME LESSOR');
        setUserType('lessor');
      } else {
        console.log('BECOME TENANT');
        setUserType('tenant');
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

  console.log('edit in hook', edit);
  console.log('isLessor in hook', isLessor);
  console.log('isNewUserLessor in hook', isNewUserLessor);
  console.log('user type in hook', userType);
  console.log('newUserDetails in hook', newUserDetails);
  console.log('userJourney in hook', userJourney);

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
