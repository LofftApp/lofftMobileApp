import React, {useEffect, useState} from 'react';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Animated,
} from 'react-native';

import MapboxGL from '@rnmapbox/maps';
import {MAPBOX_API_KEY} from '@env';

MapboxGL.setAccessToken(MAPBOX_API_KEY);


const FlatMap = ({route, navigation}: any) => {
  // States
  const [flats] = useState([
    {
      address: 'Suarezstr 20, Berlin',
      icon: '🐿',
      price: 600,
      match: 88,
      name: 'Flash Boyz',
      district: 'Mitte',
      id: 1,
    },
    {
      address: 'Rudi Duschke Str 2, Berlin',
      icon: '🦄',
      price: 900,
      match: 92,
      name: 'Unicorns',
      district: 'Xberg',
      id: 2,
    },
    {
      address: 'Schlegelstr 14, Berlin',
      icon: '🐝',
      price: 900,
      match: 92,
      name: 'Unicorns',
      district: 'Xberg',
      id: 3,
    },

    {
      address: 'Wilsnackerstr 13, Berlin',
      icon: '⚛️',
      price: 900,
      match: 92,
      name: 'Reactive Gang',
      district: 'Moabit',
      id: 3,
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
            icon: null,
            price: null,
            match: null,
            name: null,
            district: null,
            id: null,
          };
          flatObject.address = data.features[0].geometry.coordinates;
          flatObject.icon = el.icon;
          flatObject.price = el.price;
          flatObject.match = el.match;
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

  return (
    <>
    {/* <Animated.ScrollView

        horizontal
        style={styles.scrollView}>
        {flats.map((el, index) => (
          <View style={styles.flatCard} key={index + 1}>
            <Text>{el.name}</Text>
          </View>
        ))}
      </Animated.ScrollView> */}
    <View style={styles.page}>

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
              <View
                style={{
                  height: 30,
                  width: 30,
                  backgroundColor: 'yellow',
                  borderRadius: 50,
                  borderColor: '#fff',
                  borderWidth: 3,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text>{el.icon}</Text>
              </View>
            </MapboxGL.MarkerView>
          ))}


        </MapboxGL.MapView>


      </View>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  page: {
    minHeight: '100%',
    minWidth: '100%',

  },
  container: {
    minWidth: '100%',
    minHeight: '100%',

  },
  map: {
    minWidth: '100%',
    minHeight: '100%',
    zIndex: 1,
  },
  scrollView: {
    bottom: 200,
    marginBottom: 15,
    zIndex: 10000000,
    left: 0,
    right: 0,
    paddingVertical: 10,
    borderColor: 'red',
    borderWidth: 2,
    position: 'absolute',
    flex:1,
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
});

export default FlatMap;
