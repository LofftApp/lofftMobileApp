import {useGetUserQuery} from 'reduxFeatures/user/userApi';
import {UserType} from './types';

export const useUserType = () => {
  const {data: currentUser} = useGetUserQuery();
  const isLessor = currentUser?.userType === UserType.LESSOR;
  const isTenant = currentUser?.userType === UserType.TENANT;

  return {
    isLessor,
    isTenant,
  };
};
