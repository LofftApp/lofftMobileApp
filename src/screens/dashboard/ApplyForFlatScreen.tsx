import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

import Color from '@StyleSheets/lofftColorPallet.json';
import {fontStyles} from '@StyleSheets/fontStyles';
import ScreenBackButton from '@Components/coreComponents/ScreenTemplates/ScreenBackButton';
import {ApplyForFlatScreenBackground} from '@Assets';
import {HiFive} from '@Assets';
import {CoreButton} from '@Components/buttons/CoreButton';

const ApplyForFlatScreen = ({navigation}: any) => {
  return (
    <ScreenBackButton nav={() => navigation.goBack()}>
      <ApplyForFlatScreenBackground style={styles.backgroundImage} />
      <View style={styles.itemsWrap}>
        <HiFive />
        <Text style={[fontStyles.headerSmall, styles.hack]}>
          You’ve applied for this Lofft. {'\n'} The owner has maximum 48 hours
          to get back to you!
        </Text>
        <Text style={[fontStyles.bodyMedium, styles.hack]}>
          ⚡️ Remaining tokens : 5
        </Text>
        <View style={styles.buttonsWrap}>
          <CoreButton
            style={styles.buttonStyle}
            value={'See all applications'}
            onPress={() => navigation.navigate('alerts')}
          />
          <CoreButton
            style={styles.buttonStyle}
            invert={true}
            value={'Back to search'}
            onPress={() => navigation.navigate('flatOverview')}
          />
        </View>
      </View>
    </ScreenBackButton>
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
});

export default ApplyForFlatScreen;
