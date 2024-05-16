import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

// Redux 🏗️
import {useAppSelector, useAppDispatch} from 'reduxCore/hooks';

// Components 🪢
import {CoreButton} from 'components/buttons/CoreButton';
import Chips from 'components/buttons/Chips';
import LofftIcon from 'components/lofftIcons/LofftIcon';
import MatchingScoreButton from 'components/buttons/MatchingScoreButton';

// StyleSheet 🖼️
import Color from 'styleSheets/lofftColorPallet.json';
import {fontStyles} from 'styleSheets/fontStyles';

// Assets 🪴
import noFlatImage from 'Assets/images/no-flat-image.png';
import LofftHeaderPhoto from './LofftHeaderPhoto';
import {toggleFavorite} from 'redux/adverts/advertMiddleware';

// Helpers
import {tagSorter} from 'helpers/tagSorter';

const ListViewFlatCard = ({navigation, advert, id}: any) => {
  const userProfile = useAppSelector((state: any) => state.user.user);

  const characteristicsTags = tagSorter(
    userProfile.profile.characteristics,
    advert.flat.characteristics,
  );

  const featuresTags = tagSorter(userProfile.filter, advert.flat.features);

  const dispatch = useAppDispatch();
  return (
    <View style={styles.flatCardContainer}>
      <View style={styles.flatCardButtonsOverlay}>
        <View style={styles.flatCardbuttonsWrap}>
          {advert.matchScore ? (
            <View>
              <Pressable
                // style={styles.flatCardSaveButton}
                onPress={() => {
                  dispatch(toggleFavorite(advert.id));
                }}>
                {advert.favorite ? (
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
        <LofftHeaderPhoto
          imageContainerHeight={300}
          images={advert.flat.photos}
        />
      </View>
      <View style={styles.flatCardInfoWrap}>
        <View style={styles.flatCardMetadataWrap}>
          <View style={styles.apartmentLocationInfo}>
            {/* Size of WG is not in DB - 26 m2 */}
            <Text style={[fontStyles.headerSmall]}>{advert.price} €</Text>

            <MatchingScoreButton size="Big" score={advert.matchScore} />
          </View>
          {advert.flat.district ? (
            <Text
              style={[fontStyles.bodySmall, styles.flatCardMetadataLocation]}>
              {advert.flat.district}, {advert.flat.city}
            </Text>
          ) : null}
        </View>
        <View>
          <Chips tags={featuresTags.positiveTags} features={true} />
          <Chips tags={characteristicsTags.positiveTags} features={false} />
        </View>
      </View>
      <CoreButton
        value="View flat"
        onPress={() => navigation.navigate('flatShow', {advert: advert})}
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
