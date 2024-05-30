import React, {useEffect, useState, useRef} from 'react';

import {View, StyleSheet, FlatList, StatusBar, ViewToken} from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import {MAPBOX_API_KEY} from '@env';

// Redux 🏗️
import {useAppSelector} from 'reduxCore/hooks';

// Components 🪢
import MapViewFlatCard from 'components/cards/MapViewFlatCard';
import MapMarker from 'components/Maps/MapMarker';

// Types 🏷️
import {Advert, AdvertState} from 'reduxFeatures/adverts/types';
import {AdvertWithCoordinates} from './types';

const AdvertMap = () => {
  const adverts = useAppSelector(
    // States
    (state: {adverts: AdvertState}) => state.adverts.adverts,
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mapboxAdverts, setMapboxAdverts] = useState<AdvertWithCoordinates[]>(
    [],
  );

  // API
  useEffect(() => {
    const geoCoding = async () => {
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
      } catch (error) {
        console.error(error);
      }
    };
    geoCoding();
  }, [adverts]);

  const onViewRef = useRef(({viewableItems}: {viewableItems: ViewToken[]}) => {
    setSelectedIndex(Number(viewableItems[0].index));
  });

  const coordinateViewConverter = (coordinates: number[]) => {
    if (coordinates) {
      return [coordinates[0], coordinates[1] - 0.001];
    }
    return [0, 0];
  };

  return (
    <>
      <View style={styles.container}>
        <MapboxGL.MapView
          style={styles.map}
          styleURL={'mapbox://styles/jhibbs89/clc15o5dl003514rzws3xk8hd'}>
          <MapboxGL.Camera
            zoomLevel={15}
            centerCoordinate={coordinateViewConverter(
              mapboxAdverts[selectedIndex]?.coordinates,
            )}
            animationMode="flyTo"
          />
          {mapboxAdverts.map((el: AdvertWithCoordinates, index: number) => (
            <MapboxGL.MarkerView
              key={index}
              coordinate={[el.coordinates[0], el.coordinates[1]]}>
              <MapMarker data={el} />
            </MapboxGL.MarkerView>
          ))}
        </MapboxGL.MapView>
        <View style={styles.scrollContainer}>
          {mapboxAdverts && (
            <FlatList
              data={adverts}
              disableIntervalMomentum={true}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onViewableItemsChanged={onViewRef.current}
              renderItem={({item, index}) => (
                <MapViewFlatCard advert={item} key={index} id={item.id} />
              )}
            />
          )}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    width: '100%',
    bottom: 0,
    position: 'absolute',
    zIndex: 2,
    paddingTop: StatusBar.currentHeight,
    marginBottom: 16,
  },
  map: {
    minWidth: '100%',
    minHeight: '100%',
    zIndex: 1,
  },
});

export default AdvertMap;
