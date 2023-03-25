import React, {useEffect, useState, useCallback, useRef, useMemo} from 'react';

import {View, StyleSheet, FlatList, StatusBar} from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import {MAPBOX_API_KEY} from '@env';

// Redux 🏗️
import {useAppSelector} from '@ReduxCore/hooks';

// Components 🪢
import MapViewFlatCard from '@Components/cards/MapViewFlatCard';
import MapMarker from './MapMarker';

MapboxGL.setAccessToken(MAPBOX_API_KEY);

const FlatMap = () => {
  const flats = useAppSelector((state: any) => state.flats.allFlats);
  const [activeAddress, setActiveAddress] = useState();
  const [selectedIndex, setSelectedIndex] = useState(0);
  // States

  const [mapboxFlats, setMapboxFlats] = useState<any[]>([]);

  // API
  useEffect(() => {
    const geoCoding = async (flats: any) => {
      let formatedCordinates = await Promise.all(
        flats.map(async (el: any) => {
          const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${el.address}.json?access_token=${MAPBOX_API_KEY}`;
          const response = await fetch(endpoint);
          const data = await response.json();

          let flatObject = {
            address: null,
            matchP: null,
            price: null,
            images: null,
            district: null,
            id: null,
            flatId: null,
            likedUsers: null,
          };
          flatObject.address = data.features[0].geometry.coordinates;
          flatObject.price = el.price;
          flatObject.matchP = el?.matchP;
          flatObject.images = el.images;
          flatObject.district = el.district;
          flatObject.id = el.id;
          flatObject.flatId = el.flatId;
          flatObject.likedUsers = el.likedUsers;

          return flatObject;
        }),
      );
      setMapboxFlats(formatedCordinates);
    };
    setActiveAddress(mapboxFlats[0]);
    geoCoding(flats);
  }, [flats]);

  const setActiveLocation = (index: number) => {
    setSelectedIndex(index);
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
              mapboxFlats[selectedIndex]?.address,
            )}
            animationMode="flyTo"
          />
          {mapboxFlats.map((el: any, index: number) => (
            <MapboxGL.MarkerView
              key={index + 1}
              coordinate={[el.address[0], el.address[1]]}>
              <MapMarker data={el} />
            </MapboxGL.MarkerView>
          ))}
        </MapboxGL.MapView>
        <View style={styles.scrollContainer}>
          {mapboxFlats !== null ? (
            <FlatList
              data={flats}
              disableIntervalMomentum={true}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onViewableItemsChanged={onViewRef.current}
              renderItem={({item, index}) => (
                <MapViewFlatCard
                  flatId={item.flatId}
                  price={item.price}
                  match={item.matchP}
                  key={index + 1}
                  district={item.district}
                  images={item.images}
                  id={item.id}
                  likedUsers={item.likedUsers}
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
