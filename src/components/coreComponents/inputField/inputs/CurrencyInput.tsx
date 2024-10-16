import React from 'react';
import {View, TextInput} from 'react-native';

// Components 🖼️
import LofftIcon from 'components/lofftIcons/LofftIcon';

// Styles 🖼️
import {fontStyles} from 'styleSheets/fontStyles';
import {styles} from './styleSheet';
import Color from 'styleSheets/lofftColorPallet.json';

const CurrencyInput = ({
  placeholder = 'Text',
  onChangeText,
  onFocus = null,
  onBlur = null,
  value,
}: any) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={fontStyles.bodyMedium}
        onBlur={onBlur}
        onFocus={onFocus}
        placeholder={placeholder}
      />
      <LofftIcon name={'currency-euro'} size={20} color={Color.Black[30]} />
    </View>
  );
};

export default CurrencyInput;
