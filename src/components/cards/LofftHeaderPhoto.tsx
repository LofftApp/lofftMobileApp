import React, {useState, useCallback} from 'react';
import {StyleSheet, FlatList, Image, Dimensions} from 'react-native';

// Components
import PaginationBar from '@Components/bars/PaginationBar';

// sample Images
/* Src needs to be pulled from DB eventually */
import flatOneB from '@Assets/images/2.png';
import flatOneC from '@Assets/images/3.png';
import flatOneD from '@Assets/images/4.png';
import flatOneE from '@Assets/images/5.png';

const LofftHeaderPhoto = ({imageContainerHeight}) => {
  const [images, setImages] = useState([
    flatOneB,
    flatOneD,
    flatOneC,
    flatOneE,
  ]);

  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const onViewableItemsChanged = useCallback(({viewableItems, changed}) => {
    const index = viewableItems[0].index;
    setCurrentCardIndex(index);
  }, []);

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
            source={item}
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
