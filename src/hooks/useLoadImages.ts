import {useEffect, useState} from 'react';
import {Image} from 'react-native';

export const useLoadImages = (uris: string[], retryCount = 2) => {
  const [loadingStatuses, setLoadingStatuses] = useState<boolean[]>([]);
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);

  useEffect(() => {
    if (!uris || uris.length === 0) {
      setAllImagesLoaded(false);
      return;
    }

    const uriArray = Array.isArray(uris) ? uris : [uris];

    const prefetchWithRetry = async (
      uri: string,
      attempts = 0,
    ): Promise<boolean> => {
      try {
        return await Image.prefetch(uri);
      } catch (error) {
        if (attempts < retryCount) {
          return prefetchWithRetry(uri, attempts + 1);
        }
        return false;
      }
    };

    const prefetchImages = async () => {
      const results = await Promise.all(
        uriArray.map(uri => prefetchWithRetry(uri)),
      );

      setLoadingStatuses(results);
      setAllImagesLoaded(results.some(success => success));
    };

    prefetchImages();
  }, [uris, retryCount]);

  return {
    allImagesLoaded,
    loadingStatuses,
    setLoadingStatuses,
    setAllImagesLoaded,
  };
};
