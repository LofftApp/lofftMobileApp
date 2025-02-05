import {useState, useEffect, useCallback} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// For popover manual trigger, do not use pass a condition. For automatic trigger, pass a condition.
export const usePopoverDisplayFirstTime = (
  key: string,
  condition?: boolean,
) => {
  const [hasCheckedStorage, setHasCheckedStorage] = useState(false);
  const [hasShownPopover, setHasShownPopover] = useState(false);
  const [showPopover, setShowPopover] = useState(false);

  //  Function to trigger the popover and persist the state.
  const triggerPopover = useCallback(async () => {
    setShowPopover(true);
    setHasShownPopover(true);
    try {
      await AsyncStorage.setItem(key, 'true');
    } catch (error) {
      console.error('Error saving popover state:', error);
    }
  }, [key]);

  //Function to manually reset the popover
  const resetPopover = async () => {
    setShowPopover(false);
    setHasShownPopover(false);
    try {
      await AsyncStorage.removeItem(key);
      console.log('Popover state reset');
    } catch (error) {
      console.error('Error resetting popover state:', error);
    }
  };

  // Load state from AsyncStorage
  useEffect(() => {
    const checkPopoverState = async () => {
      try {
        const stored = await AsyncStorage.getItem(key);
        if (stored === 'true') {
          setHasShownPopover(true);
        }
      } catch (error) {
        console.error('Error reading popover state from AsyncStorage:', error);
      } finally {
        setHasCheckedStorage(true);
      }
    };

    checkPopoverState();
  }, [key]);

  // Trigger popover only if condition is met and it hasn't been shown before (for automatic trigger)
  useEffect(() => {
    if (hasCheckedStorage && condition && !hasShownPopover) {
      triggerPopover();
    }
  }, [hasCheckedStorage, condition, hasShownPopover, key, triggerPopover]);

  return {
    showPopover,
    setShowPopover,
    triggerPopover,
    resetPopover,
    hasShownPopover,
  };
};
