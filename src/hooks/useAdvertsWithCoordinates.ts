import { MAPBOX_API_KEY } from '@env';
import {AdvertWithCoordinates} from 'components/Maps/types';
import {useEffect, useState} from 'react';
import {Advert} from 'reduxFeatures/adverts/types';

export const useAdvertsWithCoordinates = (adverts: Advert[]) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [mapboxAdverts, setMapboxAdverts] = useState<AdvertWithCoordinates[]>(
    [],
  );

  useEffect(() => {
    const geoCoding = async () => {
      setError('');
      try {
        const advertsWithCoordinates = await Promise.all(
          adverts.map(async (el: Advert, i: number) => {
            const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${el.flat.address}.json?access_token=${MAPBOX_API_KEY}`;
            const response = await fetch(endpoint);
            if (!response.ok) {
              throw new Error(`Failed to fetch data for advert at index ${i}`);
            }
            const data = await response.json();

            const flatObject = {
              ...el,
              coordinates: data.features[0].geometry.coordinates,
            };

            return flatObject;
          }),
        );
        setMapboxAdverts(advertsWithCoordinates);
      } catch (err) {
        console.error(err);
        setError('Failed to get map coordinates');
      } finally {
        setIsLoading(false);
      }
    };
    geoCoding();
  }, [adverts]);

  return {mapboxAdverts, isLoading, error};
};
