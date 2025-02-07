import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useAppSelector} from 'reduxCore/hooks';
import {showPopoverForKey} from 'reduxFeatures/settings/settingsSlice';

export const useAutoPopoverTrigger = ({
  userId,
  key,
  condition,
}: {
  userId: number;
  key: string;
  condition: boolean;
}) => {
  const dispatch = useDispatch();

  const hasShownPopover = useAppSelector(
    state => state.settings.popovers[userId]?.[key] ?? false,
  );

  const [showPopover, setShowPopover] = useState(false);

  useEffect(() => {
    if (condition && !hasShownPopover) {
      setShowPopover(true);
      dispatch(showPopoverForKey({userId, key}));
    }
  }, [condition, hasShownPopover, dispatch, userId, key]);

  return {showPopover, setShowPopover};
};
