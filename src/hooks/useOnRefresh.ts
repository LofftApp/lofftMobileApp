import {useCallback, useState} from 'react';

export const useOnRefresh = (refetch: () => void) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, [refetch]);

  return {refreshing, setRefreshing, onRefresh};
};
