import { useAppSelector } from 'reduxCore/hooks';

export const useIsAuth = () => {
  const isAuthenticated = useAppSelector((state) => state.authentication.isAuthenticated);
  return isAuthenticated;
};
