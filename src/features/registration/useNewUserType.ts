import {useAppSelector} from 'reduxCore/hooks';

export const useNewUserType = () => {
  const userType = useAppSelector(state => state.newUser.userType);
  return userType;
};
