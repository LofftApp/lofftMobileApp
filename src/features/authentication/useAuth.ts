import {useAppSelector} from 'reduxCore/hooks';

export const useAuth = () => {
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
  return isAuthenticated;
};
