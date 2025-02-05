import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'reduxCore/hooks';
import { showPopoverForKey } from 'reduxFeatures/settings/settingsSlice';

export const useAutoPopoverTrigger = (key: string, condition: boolean) => {
  const dispatch = useDispatch();

  // Get popover state from Redux
  const hasShownPopover = useAppSelector(state => state.settings.popovers?.[key] || false);

  // Local state to control UI visibility
  const [showPopover, setShowPopover] = useState(false);

  // Effect to trigger popover when the condition is met
  useEffect(() => {
    if (condition && !hasShownPopover) {
      setShowPopover(true);
      dispatch(showPopoverForKey(key));
    }
  }, [condition, hasShownPopover, dispatch, key]);

  return { showPopover, setShowPopover };
};
