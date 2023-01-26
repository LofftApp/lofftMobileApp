import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';

// Components 🪢
import PaginationBar from '@Components/bars/PaginationBar';
import Chips from '@Components/buttons/Chips';
import LofftIcon from '@Components/lofftIcons/LofftIcon';
import MatchingScoreButton from '@Components/buttons/MatchingScoreButton';

// StyleSheet 🖼️
import Color from '@StyleSheets/lofftColorPallet.json';
import {fontStyles} from '@StyleSheets/fontStyles';

// Assets 🪴
import imageExample from '@Assets/images/flat-image.jpeg';

const ListViewFlatCard = ({
  navigation,
  route,
  match,
  id,
  district,
  price,
}: any) => {
  const [screen] = useState(1);
  const [save, setSave] = useState(false);

  return (
    <View style={styles.flatCardContainer}>
      <View style={{height: 244}}>
        <Image source={imageExample} style={styles.flatCardImage} />
        <View style={styles.flatCardButtonsOverlay}>
          <View style={styles.flatCardbuttonsWrap}>
            <View>
              <MatchingScoreButton size="Big" score={match} />
              <Pressable
                style={styles.flatCardSaveButton}
                onPress={() =>
                  save === false ? setSave(true) : setSave(false)
                }>
                {save === true ? (
                  <LofftIcon
                    name="heart-filled"
                    size={20}
                    color={Color.Tomato[100]}
                  />
                ) : (
                  <LofftIcon name="heart" size={20} color={Color.Tomato[100]} />
                )}
              </Pressable>
            </View>
            <PaginationBar screen={screen} totalScreens={5} />
          </View>
        </View>
      </View>
      <View style={styles.flatCardInfoWrap}>
        <View style={styles.flatCardMetadataWrap}>
          <View style={styles.apartmentLocationInfo}>
            {/* Size of WG is no in DB */}
            {/* <Text style={[fontStyles.headerSmall]}>{price} € 26 m2</Text> */}
            <Text
              style={[fontStyles.bodySmall, styles.flatCardMetadataLocation]}>
              {district}, Berlin
            </Text>
          </View>
          <Text style={[fontStyles.bodyMedium]}>
            🧘 Calm flat in the centre of {district}
          </Text>
        </View>
        <View>
          <Chips />
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('ApplyForFlatScreen')}>
          <Text>Apply</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flatCardContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  flatCardImage: {
    maxHeight: 244,
    width: '100%',
    overflow: 'hidden',
    zIndex: 1,
    borderRadius: 12,
  },

  flatCardButtonsOverlay: {
    position: 'absolute',
    zIndex: 2,
    width: '100%',
    height: 244,
    padding: 16,
  },
  flatCardbuttonsWrap: {
    flex: 1,
    justifyContent: 'space-between',
  },

  flatCardSaveButton: {
    position: 'absolute',
    right: 0,
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
