import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

// Components 🪢
import LofftIcon from 'components/lofftIcons/LofftIcon';

// StyleSheet 🖼️
import Colors from 'styleSheets/lofftColorPallet.json';
import {fontStyles} from 'styleSheets/fontStyles';
import {AdvertWithCoordinates} from './types';

const MapMarker = ({data}: {data: AdvertWithCoordinates}) => {
  const {matchScore} = data;

  const [color] = useState((matchScore ?? 0) > 85 ? 'lavendar' : 'mint');
  return (
    <View>
      <LofftIcon
        name="union"
        color={color === 'lavendar' ? Colors.Lavendar[100] : Colors.Mint[100]}
        size={58}
      />
      <View style={styles.markerStyle}>
        <Text
          style={[
            fontStyles.headerSmall,
            {
              color:
                color === 'lavendar' ? Colors.Lavendar[100] : Colors.Mint[100],
            },
          ]}>
          {matchScore}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  markerStyle: {
    height: 35,
    width: 35,
    borderRadius: 25,
    position: 'absolute',
    marginTop: 5,
    backgroundColor: Colors.White[100],
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  text: {
    color: Colors.Lavendar[100],
  },
});

export default MapMarker;
