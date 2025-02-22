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
  position?: 'top' | 'bottom';
};

export const useToast = ({
  condition,
  message,
  type,
  position,
}: useToastProps = {}) => {
  const dispatch = useDispatch();

  const {
    visible,
    message: toastMessage,
    type: toastType,
    position: toastPosition,
  } = useAppSelector(state => state.settings.toast);
  const toast = useAppSelector(state => state.settings.toast);
  console.log('toast', toast);

  const getStyles = (t: ToastTypes) => {
    switch (t) {
      case ToastTypes.Error:
        return {
          bg: Color.Tomato[20],
          icon: 'info-circle',
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
    ({
      message: _message,
      type: _type,
      position: _position,
    }: {
      message: string;
      type: ToastTypes;
      position?: 'top' | 'bottom';
    }) => {
      dispatch(
        _showToast({message: _message, type: _type, position: _position}),
      );

      const timer = setTimeout(() => dispatch(_hideToast()), 5000);

      return () => clearTimeout(timer);
    },
    [dispatch],
  );

  useEffect(() => {
    if (condition && message && type && position) {
      showToast({message, type});
    }
  }, [condition, message, type, showToast, position]);

  return {
    getStyles,
    showToast,
    visible,
    message: toastMessage,
    type: toastType,
    position: toastPosition,
    
  };
};
