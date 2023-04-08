import React, {useEffect, useState, useCallback, useRef, useMemo} from 'react';

import {View, StyleSheet, FlatList, StatusBar} from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import {MAPBOX_API_KEY} from '@env';

// Redux 🏗️
import {useAppSelector} from '@ReduxCore/hooks';

// Components 🪢
import MapViewFlatCard from '@Components/cards/MapViewFlatCard';
import MapMarker from './MapMarker';

const FlatMap = () => {
  const adverts = useAppSelector((state: any) => state.adverts.adverts);
  const [selectedIndex, setSelectedIndex] = useState(0);
  // States

  const [mapboxAdverts, setMapboxAdverts] = useState<any[]>([]);

  // API
  useEffect(() => {
    const geoCoding = async (adverts: any) => {
      let formatedCordinates = await Promise.all(
        adverts.map(async (el: any, index: number) => {
          const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${el.flat.address}.json?access_token=${MAPBOX_API_KEY}`;
          const response = await fetch(endpoint);
          const data = await response.json();
          interface flatState {
            address: string | null;
            matchP: number | null;
            price: number | null;
            images: any | null;
            district: string | null;
            id: number | null;
            flatId: number | null;
            likedUsers: any | null;
            tagLine: string | null;
          }

          const flatObject: flatState = {
            address: data.features[0].geometry.coordinates,
            price: el.price,
            matchP: el?.matchP,
            images: el.images,
            district: el.district,
            id: index,
            flatId: el.flatId,
            likedUsers: el.likedUsers,
            tagLine: el.tagLine,
          };

          return flatObject;
        }),
      );
      setMapboxAdverts(formatedCordinates);
    };
    geoCoding(adverts);
  }, [adverts]);

  const setActiveLocation = (index: number) => {
    // ! Made -1 to match the index of the flatlist, this should fix it though was a bit of a hack
    setSelectedIndex(index - 1);
  };

  const onViewRef = React.useRef((viewableItems: any) => {
    setActiveLocation(Number(viewableItems.viewableItems[0].key));
  });

  const coordinateViewConverter = (coordinates: any) => {
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
              mapboxAdverts[selectedIndex]?.address,
            )}
            animationMode="flyTo"
          />
          {mapboxAdverts.map((el: any, index: number) => (
            <MapboxGL.MarkerView
              key={index + 1}
              coordinate={[el.address[0], el.address[1]]}>
              <MapMarker data={el} />
            </MapboxGL.MarkerView>
          ))}
        </MapboxGL.MapView>
        <View style={styles.scrollContainer}>
          {mapboxAdverts !== null ? (
            <FlatList
              data={adverts}
              disableIntervalMomentum={true}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onViewableItemsChanged={onViewRef.current}
              renderItem={({item, index}) => (
                <MapViewFlatCard
                  flatId={item.id}
                  price={item.price}
                  match={item.matchScore}
                  key={index + 1}
                  district={item.flat.district}
                  city={item.flat.city}
                  images={item.flat.photos}
                  tagline={item.flat.tagline}
                  id={item.id}
                  favorite={item.favorite}
                />
              )}
            />
          ) : null}
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

export default FlatMap;
