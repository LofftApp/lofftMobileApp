import React, {useState, useCallback, useEffect} from 'react';
import {StyleSheet, FlatList, Image, Dimensions, View} from 'react-native';

// Components
import PaginationBar from '@Components/bars/PaginationBar';

const LofftHeaderPhoto = ({
  imageContainerHeight,
  images,
  activeBlur = null,
}: any) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const onViewableItemsChanged = useCallback(
    ({viewableItems, changed}: any) => {
      const index = viewableItems[0].index;
      setCurrentCardIndex(index);
    },
    [],
  );

  return (
    <View>
      <FlatList
        data={images}
        horizontal
        snapToInterval={Dimensions.get('window').width}
        decelerationRate={'fast'}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        renderItem={({item, index}) => {
          return (
            <Image
              style={[styles.imageContainer, {height: imageContainerHeight}]}
              source={{uri: item}}
              key={index + 1}
              blurRadius={activeBlur ? 65 : 0}
            />
          );
        }}
        disableIntervalMomentum
        pagingEnabled
      />
      {!activeBlur ? (
        <PaginationBar
          screen={currentCardIndex}
          totalScreens={images?.length || 3}
          marginVertical={imageContainerHeight - 20}
          onTop={true}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: Dimensions.get('window').width,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
});

export default LofftHeaderPhoto;
