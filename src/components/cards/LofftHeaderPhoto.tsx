import React, {useState, useCallback} from 'react';
import {StyleSheet, FlatList, Image, Dimensions, View} from 'react-native';

// Components 🪢
import PaginationBar from 'components/bars/PaginationBar';

// Types 🏷
import type {LofftHeaderPhotoProps} from './types';

const LofftHeaderPhoto = ({
  imageContainerHeight,
  images,
  activeBlur = false,
}: LofftHeaderPhotoProps) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const onViewableItemsChanged = useCallback(
    ({viewableItems, _changed}: any) => {
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
        decelerationRate="fast"
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
      {!activeBlur && (
        <PaginationBar
          screen={currentCardIndex}
          totalScreens={images?.length}
          marginVertical={imageContainerHeight - 20}
          onTop
        />
      )}
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
