import {useEffect} from 'react';

import {requestUserPermissionForNotifications} from 'reduxFeatures/firebaseNotifications/requestUserPermissionForNotifications';

export const useRequestUserPermissionForNotifications = () => {
  useEffect(() => {
    requestUserPermissionForNotifications();
  }, []);
};
