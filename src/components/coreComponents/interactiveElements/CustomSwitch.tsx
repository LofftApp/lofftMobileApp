import React from 'react';
import {Switch} from 'react-native';
import Color from 'styleSheets/lofftColorPallet.json';

const CustomSwitch = ({
  value,
  onValueChange,
}: {
  value: boolean;
  onValueChange: () => void;
}) => {
  return (
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{false: Color.Black[30], true: Color.Lavendar[30]}}
      thumbColor={value ? Color.Lavendar[100] : Color.Black[50]}
    />
  );
};

export default CustomSwitch;
