import React from 'react';
import {Switch} from 'react-native';

// StyleSheet 🖼️
import Color from '@StyleSheets/lofftColorPallet.json';

const CustomSwitch = ({value, onValueChange}: any) => {
  return (
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{false: Color.Lavendar[30], true: Color.Lavendar[50]}}
      thumbColor={Color.Lavendar[100]}
    />
  );
};

export default CustomSwitch;
