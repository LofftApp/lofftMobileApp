import React, {useState, useRef} from 'react';
import {View, StyleSheet, FlatList, StatusBar, ViewToken} from 'react-native';
import MapboxGL from '@rnmapbox/maps';

//Hooks 🪝
import {useAdvertsWithCoordinates} from 'hooks/useAdvertsWithCoordinates';

// Components 🪢
import MapViewFlatCard from 'components/cards/MapViewFlatCard';
import MapMarker from 'components/Maps/MapMarker';
import NotFoundComponent from 'components/LoadingAndNotFound/NotFoundComponent';
import LoadingComponent from 'components/LoadingAndNotFound/LoadingComponent';

// Redux 🧠
import { useSelector } from 'react-redux';

// Types 🏷️
import {Advert} from 'reduxFeatures/adverts/types';
import {AdvertWithCoordinates} from './types';
import { RootState } from 'reduxCore/store';


const AdvertMap = ({adverts}: {adverts: Advert[]}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const {mapboxAdverts, isLoading, error} = useAdvertsWithCoordinates(adverts);

  const onViewRef = useRef(({viewableItems}: {viewableItems: ViewToken[]}) => {
    setSelectedIndex(Number(viewableItems[0].index));
  });

  const coordinateViewConverter = (coordinates: number[]) => {
    if (coordinates) {
      return [coordinates[0], coordinates[1] - 0.001];
    }
    return [0, 0];
  };

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (error) {
    return <NotFoundComponent message={error} />;
  }

  if (adverts?.length === 0) {
    return <NotFoundComponent message="No flats found in this area" />;
  }

  const mapBoxStyle = isDarkMode ? 'mapbox://styles/mapbox/dark-v11' : 'mapbox://styles/jhibbs89/clc15o5dl003514rzws3xk8hd';

  return (
    <>
      <View style={styles.container}>
        <MapboxGL.MapView
          style={styles.map}
          styleURL={mapBoxStyle}>
          <MapboxGL.Camera
            zoomLevel={15}
            centerCoordinate={coordinateViewConverter(
              mapboxAdverts[selectedIndex]?.coordinates,
            )}
            animationMode={'easeTo'}
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
              renderItem={({item}) => (
                <MapViewFlatCard advert={item} key={item.id} />
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
