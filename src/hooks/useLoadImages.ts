import {useEffect, useMemo, useState, useRef} from 'react';
import {Image} from 'react-native';

export const useLoadImages = (uris: string[]) => {
  const [loadingStatuses, setLoadingStatuses] = useState<boolean[]>([]);
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);

  // Store previous URIs to prevent unnecessary re-renders
  const previousUrisRef = useRef<string[]>([]);

  const filteredUris = useMemo(() => {
    return Array.isArray(uris)
      ? uris.filter(uri => uri)
      : [uris].filter(uri => uri);
  }, [uris]);

  useEffect(() => {
    if (!filteredUris.length) {
      setAllImagesLoaded(false);
      setLoadingStatuses([]);
      return;
    }

    if (
      JSON.stringify(filteredUris) === JSON.stringify(previousUrisRef.current)
    ) {
      return;
    }
    previousUrisRef.current = filteredUris;

    const prefetch = async (uri: string): Promise<boolean> => {
      try {
        return await Image.prefetch(uri);
      } catch (error) {
        return false;
      }
    };

    const prefetchImages = async () => {
      const results = await Promise.all(filteredUris.map(uri => prefetch(uri)));

      setLoadingStatuses(results);
      setAllImagesLoaded(results.every(success => success));
    };

    prefetchImages();
  }, [filteredUris]);

  return {
    allImagesLoaded,
    loadingStatuses,
  };
};
