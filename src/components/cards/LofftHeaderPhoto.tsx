import React, {useState, useCallback} from 'react';
import {StyleSheet, FlatList, Image, Dimensions} from 'react-native';

// Components
import PaginationBar from '@Components/bars/PaginationBar';

const LofftHeaderPhoto = ({imageContainerHeight, images}: any) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const onViewableItemsChanged = useCallback(
    ({viewableItems, changed}: any) => {
      const index = viewableItems[0].index;
      setCurrentCardIndex(index);
    },
    [],
  );

  return (
    <>
      <FlatList
        data={images}
        horizontal
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        renderItem={({item, index}) => (
          <Image
            style={[styles.imageContainer, {height: imageContainerHeight}]}
            source={{uri: item}}
            key={index + 1}
          />
        )}
        disableIntervalMomentum
        pagingEnabled
      />
      <PaginationBar
        screen={currentCardIndex}
        totalScreens={images.length}
        marginVertical={imageContainerHeight - 20}
        onTop={true}
      />
    </>
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
