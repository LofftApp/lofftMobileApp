import {useAppDispatch, useAppSelector} from 'reduxCore/hooks';
import {setAppLanguage as _setAppLanguage} from './settingsSlice';
export const useAppLanguage = () => {
  const dispatch = useAppDispatch();
  const appLanguage = useAppSelector(state => state.settings.appLanguage);

  const setAppLanguage = (language: 'EN' | 'DE') => {
    dispatch(_setAppLanguage(language));
  };
  return {appLanguage, setAppLanguage};
};
