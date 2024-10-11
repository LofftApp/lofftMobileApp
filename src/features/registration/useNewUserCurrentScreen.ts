import {useAppSelector} from 'reduxCore/hooks';

export const useNewUserCurrentScreen = () => {
  const currentScreen = useAppSelector(state => state.newUser.currentScreen);
  return currentScreen;
};
