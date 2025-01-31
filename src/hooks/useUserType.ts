import {useGetUserQuery} from 'reduxFeatures/user/userApi';

export const useUserType = () => {
  const {data: currentUser} = useGetUserQuery();
  const isLessor = currentUser?.userType === 'lessor';
  const isTenant = currentUser?.userType === 'tenant';

  return {
    isLessor,
    isTenant,
  };
};
