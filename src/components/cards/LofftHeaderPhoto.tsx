import React, {useState, useCallback} from 'react';
import {StyleSheet, FlatList, Image, Dimensions, View} from 'react-native';

// Components 🪢
import PaginationBar from 'components/bars/PaginationBar';
import {NoFlatImage} from 'assets';

// Types 🏷
import type {LofftHeaderPhotoProps} from './types';
import type {OnViewableItemsChangedParams} from './types';

const LofftHeaderPhoto = ({
  imageContainerHeight,
  images,
  activeBlur = false,
}: LofftHeaderPhotoProps) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const onViewableItemsChanged = useCallback(
    ({viewableItems}: OnViewableItemsChangedParams) => {
      const index = viewableItems[0].index ?? 0;
      setCurrentCardIndex(index);
    },
    [],
  );

  const hasImages = images && images.length > 0;

  return (
    <View>
      {hasImages ? (
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
      ) : (
        <Image
          style={[styles.imageContainer, {height: imageContainerHeight}]}
          source={NoFlatImage}
          blurRadius={activeBlur ? 65 : 0}
        />
      )}
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
