import React, {useState, useCallback} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

// Redux 🏗️
import {useAppSelector, useAppDispatch} from '@ReduxCore/hooks';
// import {saveFlatsToFavorites} from '@Redux/user/usersSlice';

// Components 🪢
import {CoreButton} from '@Components/buttons/CoreButton';
import Chips from '@Components/buttons/Chips';
import LofftIcon from '@Components/lofftIcons/LofftIcon';
import MatchingScoreButton from '@Components/buttons/MatchingScoreButton';
import HighlightedButtons from '@Components/containers/HighlightButtons';

// StyleSheet 🖼️
import Color from '@StyleSheets/lofftColorPallet.json';
import {fontStyles} from '@StyleSheets/fontStyles';

// Assets 🪴
import noFlatImage from '@Assets/images/no-flat-image.png';
import LofftHeaderPhoto from './LofftHeaderPhoto';
import {toggleFavorite} from '@Redux/adverts/advertMiddleware';

const ListViewFlatCard = ({
  id,
  matchScore,
  district,
  price,
  images,
  navigation,
  favorite,
}: any) => {
  const [screen] = useState(1);
  const userType = useAppSelector((state: any) => state.user.userType);
  let save = false;

  if (userType === 'renter') {
    // save = useAppSelector(state => state.user.savedFlats.includes(flatId));
  }
  const dispatch = useAppDispatch();
  return (
    <View style={styles.flatCardContainer}>
      <View style={styles.flatCardButtonsOverlay}>
        <View style={styles.flatCardbuttonsWrap}>
          {/* Match score checks if from lessor, if true then its renter */}
          {matchScore ? (
            <View>
              <Pressable
                // style={styles.flatCardSaveButton}
                onPress={() => {
                  dispatch(toggleFavorite(id));
                }}>
                {favorite ? (
                  <LofftIcon
                    name="heart-filled"
                    size={25}
                    color={Color.Tomato[100]}
                  />
                ) : (
                  <LofftIcon name="heart" size={25} color={Color.Tomato[100]} />
                )}
              </Pressable>
            </View>
          ) : null}
          {/* <HighlightedButtons navigation={navigation} id={flatId} goBack={false}  />  For refactoring above 👆*/}
        </View>
      </View>
      <View style={styles.flatCardImage}>
        <LofftHeaderPhoto imageContainerHeight={300} images={images} />
      </View>
      <View style={styles.flatCardInfoWrap}>
        <View style={styles.flatCardMetadataWrap}>
          <View style={styles.apartmentLocationInfo}>
            {/* Size of WG is not in DB - 26 m2 */}
            <Text style={[fontStyles.headerSmall]}>{price} €</Text>

            <MatchingScoreButton size="Big" score={matchScore} />
          </View>
          {district ? (
            <Text
              style={[fontStyles.bodySmall, styles.flatCardMetadataLocation]}>
              {district}, Berlin
            </Text>
          ) : null}
        </View>
        <View>
          <Chips />
        </View>
      </View>
      <CoreButton
        value="View flat"
        onPress={() => navigation.navigate('flatShow', {id})}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flatCardContainer: {
    marginBottom: 16,
  },
  flatCardImage: {
    width: '100%',
    overflow: 'hidden',
    zIndex: 1,
    borderRadius: 12,
  },
  flatCardButtonsOverlay: {
    position: 'absolute',
    zIndex: 2,
    width: '100%',
  },
  flatCardbuttonsWrap: {
    flex: 1,
    alignItems: 'flex-end',
    padding: 15,
  },
  flatCardInfoWrap: {
    padding: 8,
  },
  flatCardMetadataWrap: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  apartmentLocationInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flatCardMetadataLocation: {
    color: Color.Black[50],
  },
});

export default ListViewFlatCard;
