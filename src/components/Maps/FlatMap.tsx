import React, {useEffect, useState, useCallback} from 'react';

import {View, Text, StyleSheet, FlatList, StatusBar, Dimensions} from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import {MAPBOX_API_KEY} from '@env';

// Components 🪢
import MapViewFlatCard from '@Components/cards/MapViewFlatCard';
import MapMarker from './MapMarker';
import LofftIcon from '@Components/lofftIcons/LofftIcon';

MapboxGL.setAccessToken(MAPBOX_API_KEY);



const FlatMap = ({route, navigation}: any) => {

  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  // States
  const [flats] = useState([
    {
      address: 'Suarezstr 20, Berlin',
      matchP: 64,
      price: 600,
      district: 'Mitte',
      id: 1,
    },
    {
      address: 'Rudi Duschke Str 2, Berlin',
      matchP: 82,
      price: 920,
      district: 'Xberg',
      id: 2,
    },
    {
      address: 'Schlegelstr 14, Berlin',
      matchP: 91,
      price: 950,
      district: 'Xberg',
      id: 3,
    },

    {
      address: 'Wilsnackerstr 13, Berlin',
      matchP: 78,
      price: 400,
      district: 'Moabit',
      id: 4,
    },
  ]);

  const [mapboxFlats, setmapboxFlats] = useState<String[]>([]);
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
            name: null,
            district: null,
            id: null,
          };
          flatObject.address = data.features[0].geometry.coordinates;
          flatObject.price = el.price;
          flatObject.matchP = el.matchP;
          flatObject.name = el.name;
          flatObject.district = el.district;
          flatObject.id = el.id;

          return flatObject;
        }),
      );
      setmapboxFlats(formatedCordinates);
    };

    geoCoding(flats);
  }, []);

  const onViewableItemsChanged = useCallback(({ viewableItems, changed }) => {
    const index = viewableItems[0]["index"]
    setCurrentCardIndex(index)
  }, []);


  console.log(mapboxFlats[currentCardIndex])
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
          <FlatList
            data={flats}
            horizontal
            showsHorizontalScrollIndicator={false}
            onViewableItemsChanged={onViewableItemsChanged}
            renderItem={({item, index}) => <MapViewFlatCard price={item.price}/>}
          />
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
