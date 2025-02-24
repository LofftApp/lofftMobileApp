import {useEffect, useMemo, useState} from 'react';
import {Image} from 'react-native';

export const useLoadImages = (uris: string[] | string) => {
  const [loadingStatuses, setLoadingStatuses] = useState<boolean[]>([]);
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);
  console.log('loadingStatuses', loadingStatuses);
  console.log('allImagesLoaded', allImagesLoaded);

  const filteredUris = useMemo(() => {
    return Array.isArray(uris)
      ? uris.filter(uri => uri)
      : [uris].filter(uri => uri);
  }, [uris]);

  useEffect(() => {
    if (
      !filteredUris ||
      (Array.isArray(filteredUris) && filteredUris.length === 0)
    ) {
      setAllImagesLoaded(false);
      return;
    }

    const uriArray = Array.isArray(filteredUris)
      ? filteredUris
      : [filteredUris];

    const prefetch = async (uri: string): Promise<boolean> => {
      try {
        return await Image.prefetch(uri);
      } catch (error) {
        return false;
      }
    };

    const prefetchImages = async () => {
      const results = await Promise.all(uriArray.map(uri => prefetch(uri)));

      setLoadingStatuses(results);
      setAllImagesLoaded(results.some(success => success));
    };

    prefetchImages();
  }, [filteredUris]);

  return {
    allImagesLoaded,
    loadingStatuses,
    setLoadingStatuses,
    setAllImagesLoaded,
  };
};
