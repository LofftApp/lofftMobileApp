import React, {useState, useCallback} from 'react';
import {StyleSheet, FlatList, Image, View} from 'react-native';

// Components 🪢
import PaginationBar from 'components/bars/PaginationBar';
import {NoFlatImage} from 'assets';

// Types 🏷
import type {ImageCarrousselProps} from './types';
import type {OnViewableItemsChangedParams} from './types';
import {size} from 'react-native-responsive-sizes';

const ImageCarroussel = ({
  imageContainerHeight,
  imageContainerWidth,
  images,
  activeBlur = false,
  pagination = false,
  snapToInterval,
  marginHorizontal = 10,
}: ImageCarrousselProps) => {
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
          snapToInterval={snapToInterval}
          decelerationRate="normal"
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={onViewableItemsChanged}
          renderItem={({item, index}) => {
            return (
              <Image
                style={[
                  styles.imageContainer,
                  {height: imageContainerHeight},
                  {width: imageContainerWidth},
                  {marginHorizontal: size(marginHorizontal)},
                ]}
                source={{uri: item}}
                key={index + 1}
                blurRadius={activeBlur ? 65 : 0}
              />
            );
          }}
          // disableIntervalMomentum={disabledIntervalMomentum}
          // pagingEnabled={pagingEnabled}
        />
      ) : (
        <Image
          style={[
            styles.imageContainer,
            {height: imageContainerHeight},
            {width: imageContainerWidth},
          ]}
          source={NoFlatImage}
          blurRadius={activeBlur ? 65 : 0}
        />
      )}
      {!activeBlur && pagination && (
        <PaginationBar
          screen={currentCardIndex}
          totalScreens={images?.length}
          marginVertical={imageContainerHeight - 10}
          onTop
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    resizeMode: 'cover',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    borderRadius: 12,
  },
});

export default ImageCarroussel;
