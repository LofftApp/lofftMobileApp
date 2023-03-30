import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Pressable, Image} from 'react-native';

// Components 🪢
import PaginationBar from '@Components/bars/PaginationBar';
import LofftIcon from '@Components/lofftIcons/LofftIcon';

// StyleSheet 🖼️
import Color from '@StyleSheets/lofftColorPallet.json';
import {fontStyles} from '@StyleSheets/fontStyles';

// Assets 🪴
import noFlatImage from '@Assets/images/no-flat-image.png';

const ListFlatApplicationCard = ({
  navigation,
  match,
  flatId,
  district,
  price,
  images,
  likedUsers,
  active,
  address,
  description,
  fromDate,
  untilDate,
}: any) => {
  const [screen] = useState(1);
  const [save, setSave] = useState(false);
  const [activeStatus, setActiveStatus] = useState([
    'Applied',
    'In review',
    'Flat viewing',
    'Offer',
  ]);

  const [currentFlatStatusIndex, setFlatStatusIndex] = useState(2);
  const [currentStatusBar, setStatusBar] = useState('');

  useEffect(() => {
    if (likedUsers && likedUsers.includes(auth()?.currentUser?.uid)) {
      setSave(true);
    }
  }, []);

  const calculateStatusBar = currentStatusIndex => {
    let status = null;

    switch (currentStatusIndex) {
      case 1:
        status = '40';
        break;
      case 2:
        status = '80';
        break;
      case 3:
        status = '100';
        break;
      default:
        status = '20';
        break;
    }
    setStatusBar(status);
  };

  useEffect(() => {
    calculateStatusBar(currentFlatStatusIndex);
  });

  return (
    <View style={styles.flatCardContainer}>
      <Pressable
        onPress={() =>
          navigation.navigate('applicationshow', {
            images: images,
            active: active,
            currentApplicationStatus: currentFlatStatusIndex,
            flatId: flatId,
            address: address,
            description: description,
            fromDate: fromDate,
            untilDate: untilDate,
            price: price,
          })
        }>
        <View>
          <Image
            // ! Currently only chooses the first image this will need to be enhanced with the swiped function and all images in a flatlist.
            source={
              images ? {uri: images[0], width: 200, height: 300} : noFlatImage
            }
            style={styles.flatCardImage}
          />
          <View style={styles.flatCardButtonsOverlay}>
            <View style={styles.flatCardbuttonsWrap}>
              {match ? (
                <View>
                  <Pressable
                    style={styles.flatCardSaveButton}
                    onPress={() => {
                      setSave(!save);
                      saveFlatToUserLikes({flatId, add: save});
                    }}>
                    {save === true ? (
                      <LofftIcon
                        name="heart-filled"
                        size={25}
                        color={Color.Tomato[100]}
                      />
                    ) : (
                      <LofftIcon
                        name="heart"
                        size={25}
                        color={Color.Tomato[100]}
                      />
                    )}
                  </Pressable>
                </View>
              ) : (
                <View />
              )}

              <PaginationBar screen={screen} totalScreens={5} />
            </View>
          </View>
        </View>
      </Pressable>
      <View style={styles.metaDataContainer}>
        <View>
          <Text style={fontStyles.headerSmall}>
            {price}€ {''} {''} 26 m2
          </Text>
          <Text style={{color: '#8E8E8E'}}>{district}, Berlin </Text>
        </View>
        <View>
          <Text style={[fontStyles.bodySmall, {color: Color.Mint[100]}]}>
            Applied on 14.04.23
          </Text>
        </View>
      </View>
      <View style={styles.progressBarContainer}>
        <View
          style={[
            styles.progressBarOutline,
            {backgroundColor: active ? Color.Mint[10] : Color.Tomato[10]},
          ]}>
          <View
            style={[
              styles.actualProgress,
              {
                width: `${currentStatusBar}%`,
                backgroundColor: active ? Color.Mint[100] : Color.Tomato[100],
              },
            ]}
          />
        </View>
        <View style={styles.statusContainer}>
          {activeStatus.map((el, index) => (
            <Text
              style={
                index === currentFlatStatusIndex
                  ? styles.active
                  : styles.inactive
              }
              key={index + 1}>
              {el}
            </Text>
          ))}
        </View>
      </View>
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
    height: '100%',
    padding: 16,
  },
  flatCardbuttonsWrap: {
    flex: 1,
    justifyContent: 'space-between',
  },

  flatCardSaveButton: {
    padding: 10,
    position: 'absolute',
    right: 0,
  },
  metaDataContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  progressBarOutline: {
    flex: 1,
    padding: 6,
    borderRadius: 8,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  active: {
    fontWeight: 'bold',
    color: Color.Black[100],
  },
  inactive: {
    color: Color.Black[50],
  },
  actualProgress: {
    padding: 8,
    borderRadius: 8,
  },
});

export default ListFlatApplicationCard;
