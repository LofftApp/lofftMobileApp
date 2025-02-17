import {useState, useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {useAppSelector} from 'reduxCore/hooks';
import {
  resetPopoverForKey,
  showPopoverForKey,
} from 'reduxFeatures/settings/settingsSlice';
import {PopoverKeys} from './types';

export const useManualPopoverTrigger = ({
  userId: userId,
  key: key,
}: {
  userId: number;
  key: PopoverKeys;
}) => {
  const dispatch = useDispatch();

  const hasShownPopover = useAppSelector(
    state => state.settings.popovers?.[userId]?.[key] ?? false,
  );

  const allPopovers = useAppSelector(state => state.settings.popovers);
  console.log('allPopovers', allPopovers);

  const [showPopover, setShowPopover] = useState(false);

  const triggerPopover = useCallback(() => {
    if (!hasShownPopover) {
      setShowPopover(true);
      dispatch(showPopoverForKey({userId, key}));
    }
  }, [hasShownPopover, dispatch, key, userId]);

  const resetPopover = useCallback(() => {
    setShowPopover(false);
    dispatch(resetPopoverForKey({userId, key}));
  }, [dispatch, key, userId]);

  return {
    showPopover,
    setShowPopover,
    triggerPopover,
    resetPopover,
    hasShownPopover,
    allPopovers,
  };
};
