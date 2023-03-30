import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';

// Components 🪢
import {HiFive} from '@Assets';
import {ApplyForFlatScreenBackground} from '@Assets';
import {CoreButton} from '@Components/buttons/CoreButton';
import {fontStyles} from '@StyleSheets/fontStyles';

// StyleSheets 🖼️
import Color from '@StyleSheets/lofftColorPallet.json';

// Assets

const ConfirmationScreenComponent = ({navigation, pageData}: any) => {
  return (
    <>
      <ApplyForFlatScreenBackground style={styles.backgroundImage} />
      <View style={styles.itemsWrap}>
        {pageData.icon ? <Image source={pageData.icon} /> : <HiFive />}
        <Text style={[fontStyles.headerSmall, styles.hack]}>
          {pageData.header}
        </Text>
        <Text style={[fontStyles.bodyMedium, styles.hack]}>
          {pageData.description1}
        </Text>
        {pageData.description2 ? (
          <Text style={[fontStyles.bodyMedium, styles.hack, styles.tomatoText]}>
            {pageData.description2}
          </Text>
        ) : null}
        <View style={styles.buttonsWrap}>
          <CoreButton
            style={styles.buttonStyle}
            value={pageData.button1}
            onPress={() => navigation.navigate('alerts')}
          />
          <CoreButton
            style={styles.buttonStyle}
            invert={true}
            value={pageData.button2}
            onPress={() => navigation.navigate('flatOverview')}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  itemsWrap: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    top: 50,
    zIndex: -1,
    left: -20,
  },
  hack: {
    textAlign: 'center',
    marginTop: 24,
  },
  buttonsWrap: {
    marginTop: 48,
    width: '100%',
  },
  buttonStyle: {
    width: '100%',
    marginBottom: 10,
  },
  tomatoText: {
    color: Color.Tomato[100],
  },
});

export default ConfirmationScreenComponent;
