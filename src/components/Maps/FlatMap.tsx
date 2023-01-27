import React, {useEffect, useState, useCallback, useRef, useMemo} from 'react';

import {View, StyleSheet, FlatList, StatusBar} from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import {MAPBOX_API_KEY} from '@env';

// Components 🪢
import MapViewFlatCard from '@Components/cards/MapViewFlatCard';
import MapMarker from './MapMarker';
import LofftIcon from '@Components/lofftIcons/LofftIcon';

MapboxGL.setAccessToken(MAPBOX_API_KEY);

const FlatMap = ({route, navigation, flats}: any) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [currentAdress, setCurrentAddress] = useState([]);

  // States

  const [mapboxFlats, setmapboxFlats] = useState<any[]>([]);

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
          };
          flatObject.address = data.features[0].geometry.coordinates;
          flatObject.price = el.price;
          flatObject.matchP = el?.matchP;
          flatObject.images = el.images;
          flatObject.district = el.district;
          flatObject.id = el.id;

          return flatObject;
        }),
      );
      setmapboxFlats(formatedCordinates);
    };

    geoCoding(flats);
  }, [flats]);

  const onViewableItemsChanged = useCallback(
    ({viewableItems, changed}: any) => {
      const index = viewableItems[0].index;
      setCurrentCardIndex(index);
    },
    [],
  );

  // console.log('this should be working', typeof mapboxFlats[currentCardIndex]);

  // console.log('These are the flats', mapboxFlats);

  // console.log(mapboxFlats.length);

  // console.log(mapboxFlats[currentCardIndex]);

  // console.log(
  //   mapboxFlats.length > 0
  //     ? mapboxFlats[currentCardIndex].price
  //     : 'Items not loaded yet',
  // );
  // mapboxFlats.length > 0
  //   ? setCurrentAddress(mapboxFlats[currentCardIndex].address)
  //   : null;

  return (
    <>
      <View style={styles.container}>
        <MapboxGL.MapView
          style={styles.map}
          styleURL={'mapbox://styles/jhibbs89/clc15o5dl003514rzws3xk8hd'}>
          <MapboxGL.Camera
            zoomLevel={10}
            centerCoordinate={[13.404954, 52.520008]}
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
              // onViewableItemsChanged={onViewableItemsChanged}
              renderItem={({item, index}) => (
                <MapViewFlatCard
                  price={item.price}
                  match={item.matchP}
                  key={index + 1}
                  district={item.district}
                  images={item.images}
                  id={item.id}
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
  flatCard: {
    width: 300,
    height: 200,
    elevation: 2,
    backgroundColor: 'white',
    marginHorizontal: 10,
    marginVertical: 40,
    borderRadius: 12,
  },
  flatcard: {
    height: 200,
    width: 200,
    borderRadius: 12,
    backgroundColor: 'white',
    zIndex: 10000,
    marginHorizontal: 20,
  },
});

export default FlatMap;
