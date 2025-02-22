import React, {useState, useCallback, useMemo} from 'react';
import {useLoadImages} from 'hooks/useLoadImages';
import {
  StyleSheet,
  FlatList,
  Image,
  View,
  Pressable,
  Animated,
} from 'react-native';

// Components 🪢
import PaginationBar from 'components/bars/PaginationBar';
import LoadingButtonIcon from 'components/LoadingAndNotFound/LoadingButtonIcon';
import {NoFlatImage} from 'assets';
import ImageEditButton from 'components/buttons/ImageEditButton';

// Styles 🖼️
import Color from 'styleSheets/lofftColorPallet.json';
import LofftIcon from 'components/lofftIcons/LofftIcon';

//Helpers
import {size} from 'react-native-responsive-sizes';

// Types 🏷
import type {ImageSwiperProps} from '../cards/types';
import type {OnViewableItemsChangedParams} from '../cards/types';

const ImageSwiper = ({
  imageContainerHeight,
  imageContainerWidth,
  images,
  activeBlur = false,
  pagination = false,
  snapToInterval,
  marginHorizontal = 10,
  editButton = false,
  deleteImage,
  onPress,
  selectedIndex,
}: ImageSwiperProps) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const imagesUri = useMemo(() => images.map(image => image.uri), [images]);

  const {loadingStatuses} = useLoadImages(imagesUri);

  const onViewableItemsChanged = useCallback(
    ({viewableItems}: OnViewableItemsChangedParams) => {
      const index = viewableItems[0]?.index ?? 0;
      setCurrentCardIndex(index);
    },
    [],
  );

  const handleDeleteImage = (uri: string) => {
    if (deleteImage) {
      deleteImage(uri);
    }
  };

  const handlePress = (index: number) => {
    if (onPress?.(index)) {
      onPress?.(index);
    }
  };

  return (
    <View>
      <FlatList
        data={images}
        horizontal
        snapToInterval={snapToInterval}
        decelerationRate="normal"
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        contentContainerStyle={{paddingVertical: size(5)}}
        renderItem={({item, index}) => {
          const isSelected = selectedIndex === index;

          return (
            <>
              {deleteImage && (
                <Pressable
                  style={styles.closeButton}
                  onPress={() => handleDeleteImage(item.uri)}>
                  <LofftIcon name="x-close" size={14} color="white" />
                </Pressable>
              )}

              <Pressable
                onPress={() => handlePress(index)}
                style={[styles.pressContainer]}>
                {!loadingStatuses[index] && (
                  <View style={styles.loadingContainer}>
                    <LoadingButtonIcon size="small" />
                  </View>
                )}
                {item.uri ? (
                  <Animated.Image
                    style={[
                      styles.imageContainer,
                      {height: imageContainerHeight},
                      {width: imageContainerWidth},
                      {marginHorizontal: size(marginHorizontal)},
                      isSelected && styles.selectedImage,
                    ]}
                    source={{uri: item.uri}}
                    loadingIndicatorSource={NoFlatImage}
                    key={index + 1}
                    blurRadius={activeBlur || !loadingStatuses[index] ? 30 : 0}
                  />
                ) : (
                  <Image
                    style={[
                      styles.imageContainer,
                      {height: imageContainerHeight},
                      {width: imageContainerWidth},
                      {marginHorizontal: size(marginHorizontal)},
                    ]}
                    source={NoFlatImage}
                    blurRadius={activeBlur || !loadingStatuses[index] ? 65 : 0}
                  />
                )}
                {editButton && <ImageEditButton right={10} />}
              </Pressable>
            </>
          );
        }}
      />

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
  pressContainer: {
    position: 'relative',
    alignItems: 'center',
  },
  imageContainer: {
    position: 'relative',
    resizeMode: 'cover',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    borderRadius: 12,
  },

  closeButton: {
    position: 'absolute',
    right: size(3),
    top: size(0),
    zIndex: 5,
    marginTop: size(-5),
    width: size(25),
    height: size(25),
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.Tomato['100'],
  },

  loadingContainer: {
    position: 'absolute',
    top: '40%',
    zIndex: 1,
  },

  selectedImage: {
    borderWidth: 4,
    borderRadius: 12,
    borderColor: Color.Lavendar[100],
  },
});

export default ImageSwiper;
