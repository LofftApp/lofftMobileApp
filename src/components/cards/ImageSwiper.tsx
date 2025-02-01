import React, {useState, useCallback} from 'react';
import {StyleSheet, FlatList, Image, View, Pressable} from 'react-native';

// Components 🪢
import PaginationBar from 'components/bars/PaginationBar';
import {NoFlatImage} from 'assets';

//Helpers
import {size} from 'react-native-responsive-sizes';

// Types 🏷
import type {ImageSwiperProps} from './types';
import type {OnViewableItemsChangedParams} from './types';
import ImageEditButton from 'components/buttons/ImageEditButton';
import {useNavigation} from '@react-navigation/native';
import {SettingsScreenNavigationProp} from 'navigationStacks/types';

const ImageSwiper = ({
  imageContainerHeight,
  imageContainerWidth,
  images,
  activeBlur = false,
  pagination = false,
  snapToInterval,
  marginHorizontal = 10,
  editButton = false,
}: ImageSwiperProps) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const onViewableItemsChanged = useCallback(
    ({viewableItems}: OnViewableItemsChangedParams) => {
      const index = viewableItems[0].index ?? 0;
      setCurrentCardIndex(index);
    },
    [],
  );
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const handlePress = () => {
    navigation.navigate('EditAdvertScreen');
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
        renderItem={({item, index}) => {
          return (
            <Pressable onPress={handlePress}>
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
              {editButton && <ImageEditButton right={10} />}
            </Pressable>
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
  imageContainer: {
    position: 'relative',
    resizeMode: 'cover',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    borderRadius: 12,
  },
});

export default ImageSwiper;
