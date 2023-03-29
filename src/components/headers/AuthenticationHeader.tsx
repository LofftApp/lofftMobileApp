import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

// StyleSheets 🖼️
import Color from '@StyleSheets/lofftColorPallet.json';

// Assets 🛠️
import {SignInBackground} from '../../assets';
import {HiFive} from '../../assets';

const AuthenticationHeader = () => {
  const [originalWidth] = useState(414);
  const [originalHeight] = useState(896);
  const [aspectRatio] = useState(originalWidth / originalHeight);
  const windowWidth = Dimensions.get('window').width;
  return (
    <>
      <View style={styles.imageWrap}>
        {/* <HiFive style={styles.image} /> */}
        <View
          style={(styles.backgroundWrapper, {width: windowWidth, aspectRatio})}>
          <SignInBackground
            height={'100%'}
            width={'100%'}
            viewBox={`0 0 ${originalWidth} ${originalHeight}`}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  imageWrap: {
    zIndex: 1,
    flex: 1,
    alignItems: 'center',
  },
  backgroundWrapper: {
    overflow: 'hidden',
  },
  backgroundImage: {
    zIndex: 2,
    borderWidth: 1,
    borderColor: 'blue',
  },
});

export default AuthenticationHeader;
