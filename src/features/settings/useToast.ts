import {useDispatch} from 'react-redux';
import {ToastTypes} from './settingsSlice';
import Color from 'styleSheets/lofftColorPallet.json';
import {
  showToast as _showToast,
  hideToast as _hideToast,
} from './settingsSlice';
import {useCallback, useEffect} from 'react';
import {useAppSelector} from 'reduxCore/hooks';
type useToastProps = {
  condition?: boolean;
  message?: string;
  type?: ToastTypes;
};

export const useToast = ({condition, message, type}: useToastProps = {}) => {
  const dispatch = useDispatch();

  const {
    visible,
    message: toastMessage,
    type: toastType,
  } = useAppSelector(state => state.settings.toast);
  const toast = useAppSelector(state => state.settings.toast);
  console.log('toast', toast);

  const getStyles = (t: ToastTypes) => {
    switch (t) {
      case ToastTypes.Error:
        return {
          bg: Color.Tomato[20],
          icon: 'alert-circle',
          iconColor: Color.Tomato[100],
        };
      case ToastTypes.Success:
        return {
          bg: Color.Mint[20],
          icon: 'check-verified-02',
          iconColor: Color.Mint[100],
        };
      case ToastTypes.Warning:
        return {
          bg: Color.Gold[20],
          icon: 'info-circle',
          iconColor: Color.Gold[100],
        };
      case ToastTypes.Info:
        return {
          bg: Color.Lavendar[20],
          icon: 'help-circle',
          iconColor: Color.Lavendar[100],
        };
      default:
        return {
          bg: Color.Mint[20],
          icon: 'check-verified-02',
          iconColor: Color.Mint[100],
        };
    }
  };

  const showToast = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    ({message, type}: {message: string; type: ToastTypes}) => {
      dispatch(_showToast({message: message, type: type}));

      const timer = setTimeout(() => dispatch(_hideToast()), 5000);

      return () => clearTimeout(timer);
    },
    [dispatch],
  );

  useEffect(() => {
    if (condition && message && type) {
      showToast({message, type});
    }
  }, [condition, message, type, showToast]);

  return {
    getStyles,
    showToast,
    visible,
    message: toastMessage,
    type: toastType,
  };
};
