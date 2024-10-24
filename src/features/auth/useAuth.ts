import {useAppDispatch, useAppSelector} from 'reduxCore/hooks';
import {setAuthMessage as _setAuthMessage} from './authSlice';
import {useCallback} from 'react';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(state => state.auth.isAuthenticated);
  const authMessage = useAppSelector(state => state.auth.authMessage);

  const setAuthMessage = useCallback(
    (message: string) => {
      dispatch(_setAuthMessage(message));
    },
    [dispatch],
  );

  return {isAuth, authMessage, setAuthMessage};
};
