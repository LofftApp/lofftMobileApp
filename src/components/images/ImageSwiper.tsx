import React, {useState, useCallback, useMemo} from 'react';
import {useLoadImages} from 'hooks/useLoadImages';
import {StyleSheet, FlatList, Image, View, Pressable} from 'react-native';

// Components 🪢
import PaginationBar from 'components/bars/PaginationBar';
import LoadingButtonIcon from 'components/LoadingAndNotFound/LoadingButtonIcon';
import {NoAvatarImage, NoFlatImage} from 'assets';
import ImageEditButton from 'components/buttons/ImageEditButton';

// Styles 🖼️
import Color from 'styleSheets/lofftColorPallet.json';
import LofftIcon from 'components/lofftIcons/LofftIcon';

//Helpers
import {size} from 'react-native-responsive-sizes';

// Types 🏷
import type {ImageSwiperProps} from '../cards/types';
import type {OnViewableItemsChangedParams} from '../cards/types';
import {ImageType} from 'reduxFeatures/imageHandling/types';

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
  imageType,
  placeholder,
}: ImageSwiperProps) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const imagesUri = useMemo(() => images.map(image => image.uri), [images]);

  const {loadingStatuses} = useLoadImages(imagesUri);

  const paddedImages = useMemo(() => {
    if (!placeholder) {
      return images;
    }
    const numberOfPlaceholders = placeholder - images.length;
    if (numberOfPlaceholders > 0) {
      const placeholders = Array.from({length: numberOfPlaceholders}, () => ({
        uri: null,
      }));
      return [...images, ...placeholders];
    }
    return images;
  }, [images, placeholder]);

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
        data={paddedImages}
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
                  onPress={() => handleDeleteImage(item.uri as string)}>
                  <LofftIcon name="x-close" size={14} color="white" />
                </Pressable>
              )}

              {item.uri ? (
                <Pressable
                  onPress={() => handlePress(index)}
                  style={[styles.pressContainer]}>
                  <>
                    {!loadingStatuses[index] && (
                      <View style={styles.loadingContainer}>
                        <LoadingButtonIcon size="small" />
                      </View>
                    )}
                    <Image
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
                      blurRadius={
                        activeBlur || !loadingStatuses[index] ? 30 : 0
                      }
                    />
                    {editButton && <ImageEditButton right={10} />}
                  </>
                </Pressable>
              ) : (
                <>
                  <Image
                    style={[
                      styles.placeholder,
                      {height: imageContainerHeight},
                      {width: imageContainerWidth},
                      {marginHorizontal: size(marginHorizontal)},
                    ]}
                    source={
                      imageType === ImageType.Flat ? NoFlatImage : NoAvatarImage
                    }
                    blurRadius={activeBlur ? 65 : 0}
                  />
                </>
              )}
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

  placeholder: {
    borderWidth: 2,
    backgroundColor: Color.BlackOpacity[10],
    borderColor: Color.Black[30],
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.7,
  },
});

export default ImageSwiper;
