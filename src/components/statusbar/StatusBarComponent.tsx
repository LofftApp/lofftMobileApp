import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';

// Styles
import Color from '@StyleSheets/lofftColorPallet.json';
import {fontStyles} from '@StyleSheets/fontStyles';

// Components
import {CoreButton} from '@Components/buttons/CoreButton';

// Assets 🪴
import LofftIcon from '@Components/lofftIcons/LofftIcon';
import statusBarText from '@Assets/coreText/statusBarText.json';

const StatusBarComponent = ({currentApplicationStatus, advert}: any) => {
  //   // const [hascollaped, setHasCollapsed] = useState(true);
  const screenheight = Dimensions.get('window').height;
  //   // const [screen] = useState(1);
  //   // const [save, setSave] = useState(false);

  //   // const [currentFlatStatusIndex, setFlatStatusIndex] = useState(
  //   //   currentApplicationStatus,
  //   // );
  const [currentStatusBar, setStatusBar] = useState('');

  //   const [renterIcons, setRenterIcons] = useState([
  //     'file-check',
  //     // 'eye',
  //     'user-check',
  //     'calendar',
  //     'rocket',
  //   ]);

  //   let landlordProgressTextContainerHeight = null;

  //   if (currentApplicationStatus === 3) {
  //     landlordProgressTextContainerHeight = '100%';
  //   } else {
  //     landlordProgressTextContainerHeight = '92%';
  //   }

  //   const renterIconsCreated = renterIcons.map((el, index) => {
  //     return (
  //       <LofftIcon
  //         key={index + 1}
  //         name={el}
  //         size={28}
  //         color={
  //           currentApplicationStatus === index || currentApplicationStatus > index
  //             ? Color.White[100]
  //             : Color.Mint[50]
  //         }
  //       />
  //     );
  //   });

  //   const renterStatusActions = rentorActiveStatus.map((el, index) => {
  //     return (
  //       <View key={index + 1}>
  //         <Text
  //           style={[
  //             fontStyles.headerSmall,
  //             {
  //               marginTop: 15,
  //               color:
  //                 currentApplicationStatus === index ||
  //                 currentApplicationStatus > index
  //                   ? Color.Black[100]
  //                   : Color.Black[50],
  //             },
  //           ]}>
  //           {el.header}
  //         </Text>
  //         <Text style={[fontStyles.bodySmall]}>{el.subText}</Text>

  //         {currentApplicationStatus === index && index === 2 ? (
  //           <View style={styles.rentorActionButton}>
  //             <Text style={(fontStyles.bodyMedium, {color: Color.White[100]})}>
  //               Go to Chat 💭
  //             </Text>
  //           </View>
  //         ) : null}
  //       </View>
  //     );
  //   });

  const iconsCreated = statusBarText[advert.lessor ? 'lessor' : 'renter'].map(
    (key: any, index: number) => {
      return (
        <LofftIcon
          key={index + 1}
          name={key.icon}
          size={28}
          color={
            currentApplicationStatus === index ||
            currentApplicationStatus > index
              ? Color.White[100]
              : Color.Lavendar[50]
          }
        />
      );
    },
  );

  const statusText = statusBarText[advert.lessor ? 'lessor' : 'renter'].map(
    (key: any, index: number) => {
      return (
        <View key={index + 1}>
          <Text
            style={[
              fontStyles.headerSmall,
              {
                marginTop: 15,
                color:
                  currentApplicationStatus === index ||
                  currentApplicationStatus > index
                    ? Color.Black[100]
                    : Color.Black[50],
              },
            ]}>
            {key.header}
          </Text>
          <Text style={[fontStyles.bodySmall]}>{key.subText}</Text>

          {currentApplicationStatus === index ? (
            <View style={styles.landlordActionButton}>
              <Text style={(fontStyles.bodyMedium, {color: Color.White[100]})}>
                {key.buttonText}
              </Text>
            </View>
          ) : null}
        </View>
      );
    },
  );

  //   const calculateStatusBar = currentStatusIndex => {
  //     let status = null;

  //     switch (currentStatusIndex) {
  //       case 1:
  //         status = '50';
  //         break;
  //       case 2:
  //         status = '75';
  //         break;
  //       case 3:
  //         status = '100';
  //         break;
  //       default:
  //         status = '25';
  //         break;
  //     }
  //     setStatusBar(status);
  //   };

  //   useEffect(() => {
  //     calculateStatusBar(currentApplicationStatus);
  //   });

  return (
    <View style={[styles.maincontainer]}>
      <View
        style={[
          styles.progressContainer,
          {maxHeight: advert.lessor ? screenheight / 1.7 : screenheight / 2},
        ]}>
        <View
          style={[
            styles.progressBarOutline,
            {
              backgroundColor: advert.lessor
                ? Color.Lavendar[10]
                : Color.Mint[10],
            },
          ]}>
          <View style={styles.iconsPosition}>{iconsCreated}</View>
          <View
            style={[
              styles.progressBar,
              {
                height: `${currentStatusBar}%`,
                backgroundColor: advert.lessor
                  ? Color.Lavendar[100]
                  : Color.Mint[100],
              },
            ]}
          />
        </View>
        <View
          style={[
            styles.progressTextContainer,
            {height: advert.lessor ? '95%' : '98%'},
          ]}>
          {statusText}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  maincontainer: {
    width: '90%',
    paddingTop: 30,
    paddingBottom: 20,
  },
  progressContainer: {
    flexDirection: 'row',
    maxHeight: '50%',
    /* 🤖 This one effects the layout of the progress bar look and text */
    justifyContent: 'space-between',
  },
  progressBarOutline: {
    height: '100%',
    width: '15%',
    borderRadius: 28,
    alignItems: 'center',
  },
  iconsPosition: {
    position: 'absolute',
    zIndex: 400,
    height: '100%',
    justifyContent: 'space-around',
  },
  progressBar: {
    width: '100%',
    backgroundColor: Color.Mint[100],
    borderRadius: 30,
  },
  progressTextContainer: {
    width: '85%',
    marginLeft: 15,
    justifyContent: 'space-around',
  },
  landlordActionButton: {
    backgroundColor: Color.Lavendar[100],
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    padding: 7,
    marginTop: 10,
    borderRadius: 12,
  },
  rentorActionButton: {
    backgroundColor: Color.Mint[100],
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
    padding: 7,
    marginTop: 10,
    borderRadius: 12,
  },
});

export default StatusBarComponent;
