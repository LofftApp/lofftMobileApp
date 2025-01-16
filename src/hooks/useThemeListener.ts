import { Appearance } from 'react-native';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setTheme } from 'reduxFeatures/themes/themeActions';

const useThemeListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      dispatch(setTheme(colorScheme === 'dark'));
    });

    return () => subscription.remove(); // Cleanup on component unmount
  }, [dispatch]);
};

export default useThemeListener;
