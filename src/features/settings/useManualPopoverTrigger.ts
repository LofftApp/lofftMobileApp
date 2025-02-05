import {useState, useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {useAppSelector} from 'reduxCore/hooks';
import {
  resetPopoverForKey,
  showPopoverForKey,
} from 'reduxFeatures/settings/settingsSlice';

export const useManualPopoverTrigger = (key: string) => {
  const dispatch = useDispatch();

  const hasShownPopover = useAppSelector(
    state => state.settings.popovers?.[key] || false,
  );

  const [showPopover, setShowPopover] = useState(false);

  const triggerPopover = useCallback(() => {
    if (!hasShownPopover) {
      setShowPopover(true);
      dispatch(showPopoverForKey(key));
    }
  }, [hasShownPopover, dispatch, key]);

  const resetPopover = useCallback(() => {
    setShowPopover(false);
    dispatch(resetPopoverForKey(key));
  }, [dispatch, key]);

  return {
    showPopover,
    setShowPopover,
    triggerPopover,
    resetPopover,
    hasShownPopover,
  };
};
