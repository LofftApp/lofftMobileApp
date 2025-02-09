import React, {useState, useCallback} from 'react';
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

//Helpers
import {size} from 'react-native-responsive-sizes';

// Types 🏷
import type {ImageSwiperProps} from '../cards/types';
import type {OnViewableItemsChangedParams} from '../cards/types';
import ImageEditButton from 'components/buttons/ImageEditButton';
import LofftIcon from 'components/lofftIcons/LofftIcon';
import Color from 'styleSheets/lofftColorPallet.json';
import {NoFlatImage} from 'assets';
import LoadingButtonIcon from 'components/LoadingAndNotFound/LoadingButtonIcon';

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
  isLoading,
  selectedIndex,
}: ImageSwiperProps) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const onViewableItemsChanged = useCallback(
    ({viewableItems}: OnViewableItemsChangedParams) => {
      const index = viewableItems[0]?.index ?? 0;
      setCurrentCardIndex(index);
    },
    [],
  );

  const handleDeleteImage = (fileName: string) => {
    if (deleteImage) {
      deleteImage(fileName);
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
          const source = deleteImage ? item.uri : item;
          const isSelected = selectedIndex === index;

          return (
            <>
              {deleteImage && (
                <Pressable
                  style={styles.closeButton}
                  onPress={() => handleDeleteImage(item.fileName)}>
                  <LofftIcon name="x-close" size={14} color="white" />
                </Pressable>
              )}

              <Pressable
                onPress={() => handlePress(index)}
                style={[styles.pressContainer]}>
                {isLoading && (
                  <View style={styles.loadingContainer}>
                    <LoadingButtonIcon size="small" />
                  </View>
                )}
                {item.uri || item ? (
                  <Animated.Image
                    style={[
                      styles.imageContainer,
                      {height: imageContainerHeight},
                      {width: imageContainerWidth},
                      {marginHorizontal: size(marginHorizontal)},
                      isSelected && styles.selectedImage,
                    ]}
                    source={{uri: source}}
                    key={index + 1}
                    blurRadius={activeBlur || isLoading ? 30 : 0}
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
                    blurRadius={activeBlur || isLoading ? 65 : 0}
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
