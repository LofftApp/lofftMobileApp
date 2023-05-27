import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Pressable, Image} from 'react-native';

// Components 🪢
import LofftIcon from '@Components/lofftIcons/LofftIcon';
import LofftHeaderPhoto from './LofftHeaderPhoto';

// Redux 🏗️
import {useAppDispatch} from '@ReduxCore/hooks';
import {toggleFavorite} from '@Redux/adverts/advertMiddleware';

// StyleSheet 🖼️
import Color from '@StyleSheets/lofftColorPallet.json';
import {fontStyles} from '@StyleSheets/fontStyles';

// Assets 🪴
import noFlatImage from '@Assets/images/no-flat-image.png';
import {CoreButton} from '@Components/buttons/CoreButton';

const ListFlatApplicationCard = ({
  id,
  navigation,
  advert,
  posted = null,
  isLessor = false,
}: any) => {
  const [active] = useState(!['offered', 'closed'].includes(advert.status));
  const [renterActiveStatus] = useState([
    'Applied',
    'In review',
    'Viewing',
    'Offer',
  ]);

  const [lessorActiveStatus] = useState([
    'Open',
    'Applicantions',
    'Viewing',
    'Offer',
  ]);

  let textForStatusBar = isLessor ? lessorActiveStatus : renterActiveStatus;

  const [currentStatusBar, setStatusBar] = useState('');

  const calculateStatusBar = (currentStatusIndex: number) => {
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
    calculateStatusBar(advert.status);
  });
  const dispatch = useAppDispatch();
  return (
    <View style={styles.advertCardContainer}>
      <Pressable
        onPress={() =>
          navigation.navigate('applicationshow', {
            advert,
          })
        }>
        <View>
          <View style={styles.advertCardImage}>
            <LofftHeaderPhoto
              imageContainerHeight={300}
              images={advert.flat.photos}
            />
          </View>
          <View style={styles.advertCardButtonsOverlay}>
            <View style={styles.advertCardbuttonsWrap}>
              {advert.matchP ? (
                <View>
                  <Pressable
                    // style={styles.advertCardSaveButton}
                    onPress={() => {
                      dispatch(toggleFavorite(id));
                    }}>
                    {advert.favorite ? (
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
              ) : null}
            </View>
          </View>
        </View>
      </Pressable>
      <View style={styles.metaDataContainer}>
        <View>
          <Text style={fontStyles.headerSmall}>
            {advert.price}€ {''} {''} 26 m2
          </Text>
          <Text style={{color: '#8E8E8E', marginTop: 3}}>
            {advert.district}, {advert.city}
          </Text>
        </View>
        <View>
          <Text
            style={[
              fontStyles.bodySmall,
              {color: posted ? Color.Black[50] : Color.Mint[100]},
            ]}>
            {posted ? 'Posted on 12.03.23' : 'Applied on 14.04.23'}
          </Text>
        </View>
      </View>
      {isLessor ? (
        <View style={styles.timeWrapper}>
          <LofftIcon size={20} name={'alarm-clock'} color={Color.Tomato[100]} />
          <Text style={{color: Color.Tomato[100], marginTop: 2, marginLeft: 7}}>
            3h left to make the decision for this round!
          </Text>
        </View>
      ) : null}
      <View>
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
          {textForStatusBar.map((el, index) => (
            <Text
              style={
                ['offered', 'closed'].includes(advert.status)
                  ? styles.inactive
                  : styles.active
              }
              key={index + 1}>
              {el}
            </Text>
          ))}
        </View>
      </View>
      {isLessor ? (
        <View style={styles.buttonContainer}>
          <CoreButton
            value="Edit listing"
            invert={true}
            style={styles.button}
          />
          <CoreButton
            value="See applicants"
            style={styles.button}
            onPress={() =>
              navigation.navigate('applicationshow', {
                advert: advert,
                active: active,
              })
            }
          />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  advertCardContainer: {
    flex: 1,
    paddingBottom: 8,
    marginBottom: 16,
  },
  advertCardImage: {
    width: '100%',
    overflow: 'hidden',
    zIndex: 1,
    borderRadius: 12,
  },
  advertCardButtonsOverlay: {
    position: 'absolute',
    zIndex: 2,
    width: '100%',
  },
  advertCardbuttonsWrap: {
    flex: 1,
    alignItems: 'flex-end',
    padding: 15,
  },
  advertCardSaveButton: {
    padding: 10,
    position: 'absolute',
    right: 0,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
    marginTop: 10,
  },
  button: {
    flex: 1,
    maxWidth: 183,
    height: 48,
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
  timeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 7,
  },
});

export default ListFlatApplicationCard;
