import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Pressable, DimensionValue} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// Components 🧬
import LofftIcon from 'components/lofftIcons/LofftIcon';
import LofftHeaderPhoto from './LofftHeaderPhoto';
import {CoreButton} from 'components/buttons/CoreButton';

// Redux 🐙
import {useAppDispatch} from 'reduxCore/hooks';
import {toggleFavorite} from 'reduxFeatures/adverts/advertMiddleware';

// StyleSheet 🖼
import Color from 'styleSheets/lofftColorPallet.json';
import {fontStyles} from 'styleSheets/fontStyles';

// helpers 🧰
import {advertStatusIndex} from 'helpers/advertStatusIndex';
import {size} from 'react-native-responsive-sizes';

// Types 🏷
import type {ListFlatApplicationCardProps} from './types';

// Types
import {FavoriteScreenNavigationProp} from '../../../navigationStacks/types';

const ListFlatApplicationCard = ({
  advert,
  isLessor = false,
}: ListFlatApplicationCardProps) => {
  const {flat, status, price, id, favorite} = advert;
  const {photos, city, district} = flat;

  const [active] = useState(!['offered', 'closed'].includes(status ?? ''));
  const [renterActiveStatus] = useState([
    'Applied',
    'In review',
    'Viewing',
    'Offer',
  ]);

  const [lessorActiveStatus] = useState([
    'Received',
    'Review',
    'Viewing',
    'Offer',
  ]);

  const [currentStatusBar, setCurrentStatusBar] = useState('');
  const [activeStage, setActiveStage] = useState(0);

  const navigation = useNavigation<FavoriteScreenNavigationProp>();

  let textForStatusBar = isLessor ? lessorActiveStatus : renterActiveStatus;

  const calculateStatusBar = (currentStatusIndex: number) => {
    switch (currentStatusIndex) {
      case 1:
        setCurrentStatusBar('40');
        setActiveStage(1);
        break;
      case 2:
        setCurrentStatusBar('80');
        setActiveStage(2);
        break;
      case 3:
        setCurrentStatusBar('100');
        setActiveStage(3);
        break;
      default:
        setCurrentStatusBar('20');
        setActiveStage(0);
        break;
    }
  };

  useEffect(() => {
    const index = advertStatusIndex(status ?? '');
    calculateStatusBar(index);
  }, [status]);

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
              imageContainerHeight={size(300)}
              images={photos ?? []}
            />
          </View>
          <View style={styles.advertCardButtonsOverlay}>
            <View style={styles.advertCardbuttonsWrap}>
              {!isLessor && (
                <View>
                  <Pressable
                    style={styles.advertCardSaveButton}
                    onPress={() => {
                      // toggleFavorite error status 401 👇
                      dispatch(toggleFavorite(id ?? 0));
                    }}>
                    {favorite ? (
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
              )}
            </View>
          </View>
        </View>
      </Pressable>
      <View style={styles.metaDataContainer}>
        <View>
          <Text style={fontStyles.headerSmall}>
            {price}€ {''} {''}
          </Text>
          <Text style={[fontStyles.bodySmall, styles.flatLocation]}>
            {district}, {city}
          </Text>
        </View>
        <View>
          <Text
            style={[
              fontStyles.bodySmall,
              {color: isLessor ? Color.Black[50] : Color.Mint[100]},
            ]}>
            {isLessor ? 'Posted on 12.03.23' : 'Applied on 14.04.23'}
          </Text>
        </View>
      </View>
      {isLessor && (
        <View style={styles.timeWrapper}>
          <LofftIcon size={20} name="alarm-clock" color={Color.Tomato[100]} />
          <Text style={styles.timeWrapperText}>
            3h left to make the decision for this round!
          </Text>
        </View>
      )}
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
                width: `${currentStatusBar}%` as DimensionValue,
                backgroundColor: active ? Color.Mint[100] : Color.Tomato[100],
              },
            ]}
          />
        </View>
        <View style={styles.statusContainer}>
          {textForStatusBar.map((el, index) => (
            <Text
              style={
                el === textForStatusBar[activeStage]
                  ? styles.active
                  : styles.inactive
              }
              key={index + 1}>
              {el}
            </Text>
          ))}
        </View>
      </View>
      {isLessor && (
        <View style={styles.buttonContainer}>
          <CoreButton value="Edit listing" invert style={styles.button} />
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
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  advertCardContainer: {
    flex: 1,
    paddingBottom: size(8),
    marginBottom: size(16),
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
    padding: size(15),
  },
  advertCardSaveButton: {
    padding: size(10),
    position: 'absolute',
    right: 0,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: size(16),
    marginTop: size(10),
  },
  button: {
    flex: 1,
    maxWidth: size(183),
    height: size(48),
  },
  metaDataContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: size(8),
  },
  flatLocation: {
    color: Color.Black['50'],
    margin: 0,
  },
  progressBarOutline: {
    flex: 1,
    padding: size(6),
    borderRadius: 8,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: size(10),
  },
  active: {
    fontWeight: 'bold',
    color: Color.Black[100],
  },
  inactive: {
    color: Color.Black[50],
  },
  actualProgress: {
    padding: size(8),
    borderRadius: 8,
  },
  timeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: size(15),
    marginTop: size(7),
  },
  timeWrapperText: {
    color: Color.Tomato[100],
    marginTop: size(2),
    marginLeft: size(7),
  },
});

export default ListFlatApplicationCard;

// import React, {useState, useCallback} from 'react';
// import {View, Text, StyleSheet, Pressable} from 'react-native';

// // Redux 🏗️
// import {useAppSelector, useAppDispatch} from 'reduxCore/hooks';

// // Components 🪢
// import {CoreButton} from 'components/buttons/CoreButton';
// import Chips from 'components/buttons/Chips';

// // StyleSheet 🖼️
// import Color from 'styleSheets/lofftColorPallet.json';
// import {fontStyles} from 'styleSheets/fontStyles';
// import Collapsible from 'react-native-collapsible';
// import CheckBox from 'components/coreComponents/interactiveElements/CheckBox';

// // Assets 🪴
// import LofftIcon from 'components/lofftIcons/LofftIcon';

// const ApplicantsCard = ({}: any) => {
//   const [activateBox, setActiveBox] = useState(false);
//   const [hasCollapsed, setHasCollapsed] = useState(true);

//   return (
//     <View style={styles.mainContainer}>
//       <View style={styles.insideContainer}>
//         <CheckBox
//           value={activateBox}
//           onPress={() => {
//             setActiveBox(!activateBox);
//           }}
//         />
//         <Pressable
//           onPress={() => setHasCollapsed(!hasCollapsed)}
//           style={styles.iconCollapser}>
//           <View style={styles.closedCardWrapper}>
//             <View style={styles.textContainer}>
//               <Text style={fontStyles.headerMedium}>J.</Text>
//               <Text style={[fontStyles.bodyMedium, styles.matchText]}>
//                 (96%match)
//               </Text>
//             </View>
//             {hasCollapsed ? (
//               <LofftIcon
//                 name="chevron-down"
//                 size={24}
//                 style={styles.iconColor}
//               />
//             ) : (
//               <LofftIcon name="chevron-up" size={24} style={styles.iconColor} />
//             )}
//           </View>
//         </Pressable>
//       </View>
//       <Collapsible collapsed={hasCollapsed}>
//         <View style={styles.collapisbleContainer}>
//           <Text style={fontStyles.headerSmall}>Match with you</Text>
//           {/* <Chips /> */}
//           <Text>Hello</Text>
//           <Text style={[fontStyles.headerSmall, styles.otherText]}>Other</Text>
//           {/* <Chips /> */}
//         </View>
//       </Collapsible>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   mainContainer: {
//     marginVertical: 8,
//     backgroundColor: Color.Lavendar[5],
//     flex: 1,
//     width: '100%',
//     paddingHorizontal: 16,
//     borderRadius: 8,
//   },
//   insideContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     width: '100%',
//     justifyContent: 'space-between',
//   },
//   collapisbleContainer: {
//     backgroundColor: Color.Lavendar[5],
//     paddingBottom: 12,
//   },
//   closedCardWrapper: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingVertical: 16,
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     width: '87%',
//   },
//   textContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   matchText: {
//     color: Color.Mint[100],
//     paddingHorizontal: 8,
//   },
//   otherText: {
//     paddingTop: 10,
//   },
//   iconCollapser: {
//     paddingHorizontal: 16,
//   },
//   iconColor: {
//     color: Color.Blue[100],
//   },
// });

// export default ApplicantsCard;
