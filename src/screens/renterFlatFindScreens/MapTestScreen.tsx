import React, {useState, useEffect} from 'react';

import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Animated,
  Dimensions,
} from 'react-native';

import MapboxGL from '@rnmapbox/maps';
import {MAPBOX_API_KEY} from '@env';

MapboxGL.setAccessToken(MAPBOX_API_KEY);

const {width} = Dimensions.get('window');

const CARD_WIDTH = width * 0.7;

const MapTestScreen = () => {
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

  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);

  useEffect(() => {
    mapAnimation.addListener((value) => {

    })
  })

  console.log(mapboxFlats)

  return (
    <View style={styles.bigBoi}>
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
            <>
      <Animated.ScrollView
        horizontal
        style={styles.scrollView}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={1}
        pagingEnabled={true}
        snapToAlignment="center"
        snapToInterval={CARD_WIDTH - 300}
        >

        {flats.map((el, index) => {
          return (
            <View style={styles.flatcard} key={index + 1}>
              <Text style={{padding: 10}}>{el.name}</Text>
              <Text style={{padding: 10}}>{el.icon}</Text>
            </View>
          );
        })}
      </Animated.ScrollView>
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  bigBoi: {
    flex: 1,
    position: 'relative',
    zIndex: 1,
    backgroundColor: 'lightblue',
  },
  container: {
    zIndex: 1000000,
  },
  scrollView: {
    zIndex: 1000000,
    minWidth: '100%',
    bottom: 20,
    position: 'absolute',
  },
  flatcard: {
    height: 200,
    width: CARD_WIDTH,
    borderRadius: 12,
    backgroundColor: 'white',
    zIndex: 10000,
    marginHorizontal: 20,
  },

  map: {
    minWidth: '100%',
    minHeight: '100%',
    zIndex: 1,
  },
});

export default MapTestScreen;
