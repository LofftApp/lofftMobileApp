import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';

// Styles
import Color from '@StyleSheets/lofftColorPallet.json';
import {fontStyles} from '@StyleSheets/fontStyles';

// Components
import {CoreButton} from '@Components/buttons/CoreButton';

// Assets 🪴
import LofftIcon from '@Components/lofftIcons/LofftIcon';

const StatusBar = ({landlord = false, currentApplicationStatus}: any) => {
  const [hascollaped, setHasCollapsed] = useState(true);
  const screenheight = Dimensions.get('window').height;
  const [screen] = useState(1);
  const [save, setSave] = useState(false);
  const [rentorActiveStatus, setRentorActiveStatus] = useState([
    {
      header: 'Applied',
      subText:
        'The landlord has up to 48 hrs after the ad has expired to review your application',
      icon: 'file- check',
    },
    // {
    //   header: 'Opened',
    //   subText:
    //     'Landlord has opened your application. You’ll know the first-round decision in 48 hrs',
    //   icon: 'eye',
    // },
    {
      header: 'In Review',
      subText:
        'You’ll be notified if you’ve made it to the shortlist in 48 hrs ',
      icon: 'user-check',
    },
    {
      header: 'Schedule flat viewing',
      subText: 'You can now message the landlord and organise a flat viewing',
      icon: 'calendar',
    },
    {
      header: 'Offer!',
      subText: 'Congratulations, you made it!',
      icon: 'rocket',
    },
  ]);

  const [landlordActiveStatus, setLandlordActiveStatus] = useState([
    {
      header: 'Recived applications',
      subText:
        'You can decide within 48 hours to narrow down to up to 100 applicants. To ensure a fair selection, here you can only see essential information about the applicants.',
      buttonText: 'See applications',
      icon: 'file-check',
    },
    {
      header: 'ShortList',
      subText:
        'Here you have full access to selected applicants’ profile. You have 48 hours to select up to 20 applicants to chat with, schedule an interview, and/or flat viewing.',
      buttonText: 'See profiles',
      icon: 'eye',
    },
    {
      header: 'Schedule flat viewing',
      subText:
        'You can now message the selected applicants and organise an interview/flat viewing. You have up to 14 days to make the final offer.',
      buttonText: 'Go to chat 💭',
      icon: 'user-check',
    },
    {
      header: 'Offer!',
      subText: 'Congratulations, you just made somebody’s day a great day!',
      buttonText: 'Finalize it',
      icon: 'rocket',
    },
  ]);

  const [currentFlatStatusIndex, setFlatStatusIndex] = useState(
    currentApplicationStatus,
  );
  const [currentStatusBar, setStatusBar] = useState('');

  const [renterIcons, setRenterIcons] = useState([
    'file-check',
    // 'eye',
    'user-check',
    'calendar',
    'rocket',
  ]);

  let landlordProgressTextContainerHeight = null;

  if (currentApplicationStatus === 3) {
    landlordProgressTextContainerHeight = '100%';
  } else {
    landlordProgressTextContainerHeight = '92%';
  }

  const renterIconsCreated = renterIcons.map((el, index) => {
    return (
      <LofftIcon
        key={index + 1}
        name={el}
        size={28}
        color={
          currentApplicationStatus === index || currentApplicationStatus > index
            ? Color.White[100]
            : Color.Mint[50]
        }
      />
    );
  });

  const renterStatusActions = rentorActiveStatus.map((el, index) => {
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
          {el.header}
        </Text>
        <Text style={[fontStyles.bodySmall, Color.Black[50]]}>
          {el.subText}
        </Text>

        {currentApplicationStatus === index && index === 2 ? (
          <View style={styles.rentorActionButton}>
            <Text style={(fontStyles.bodyMedium, {color: Color.White[100]})}>
              Go to Chat 💭
            </Text>
          </View>
        ) : null}
      </View>
    );
  });

  const landLordIconsCreated = landlordActiveStatus.map((el, index) => {
    return (
      <LofftIcon
        key={index + 1}
        name={el.icon}
        size={28}
        color={
          currentApplicationStatus === index || currentApplicationStatus > index
            ? Color.White[100]
            : Color.Lavendar[50]
        }
      />
    );
  });

  const landLordStatusActions = landlordActiveStatus.map((el, index) => {
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
          {el.header}
        </Text>
        <Text style={[fontStyles.bodySmall, Color.Black[50]]}>
          {el.subText}
        </Text>

        {currentApplicationStatus === index ? (
          <View style={styles.landlordActionButton}>
            <Text style={(fontStyles.bodyMedium, {color: Color.White[100]})}>
              {el.buttonText}
            </Text>
          </View>
        ) : null}
      </View>
    );
  });

  const calculateStatusBar = currentStatusIndex => {
    let status = null;

    switch (currentStatusIndex) {
      case 1:
        status = '50';
        break;
      case 2:
        status = '75';
        break;
      case 3:
        status = '100';
        break;
      default:
        status = '25';
        break;
    }
    setStatusBar(status);
  };

  useEffect(() => {
    calculateStatusBar(currentApplicationStatus);
  });

  return (
    <View style={[styles.maincontainer]}>
      <View
        style={[
          styles.progressContainer,
          {maxHeight: landlord ? screenheight / 1.7 : screenheight / 2},
        ]}>
        <View
          style={[
            styles.progressBarOutline,
            {backgroundColor: landlord ? Color.Lavendar[10] : Color.Mint[10]},
          ]}>
          <View style={styles.iconsPosition}>
            {landlord ? landLordIconsCreated : renterIconsCreated}
          </View>
          <View
            style={[
              styles.progressBar,
              {
                height: `${currentStatusBar}%`,
                backgroundColor: landlord
                  ? Color.Lavendar[100]
                  : Color.Mint[100],
              },
            ]}
          />
        </View>
        <View
          style={[
            styles.progressTextContainer,
            {height: landlord ? landlordProgressTextContainerHeight : '98%'},
          ]}>
          {landlord ? landLordStatusActions : renterStatusActions}
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
    width: '80%',
    justifyContent: 'space-around',
  },
  landlordActionButton: {
    backgroundColor: Color.Lavendar[100],
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
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

export default StatusBar;
