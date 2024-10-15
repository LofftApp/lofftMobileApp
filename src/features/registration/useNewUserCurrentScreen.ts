import {useAppDispatch, useAppSelector} from 'reduxCore/hooks';
import {setCurrentScreen as _setCurrentScreen} from 'reduxFeatures/registration/newUserSlice';

export const useNewUserCurrentScreen = () => {
  const currentScreen = useAppSelector(state => state.newUser.currentScreen);
  const dispatch = useAppDispatch();
  const setCurrentScreen = (screen: number) => {
    dispatch(_setCurrentScreen(screen));
  };
  return {currentScreen, setCurrentScreen};
};
