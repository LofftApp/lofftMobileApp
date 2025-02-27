import {useAppSelector} from 'reduxCore/hooks';

export const useAuth = () => {
  const isAuth = useAppSelector(state => state.auth.isAuthenticated);

  return {isAuth};
};
