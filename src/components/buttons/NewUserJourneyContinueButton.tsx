import React from 'react';

// Components 🪢
import {CoreButton} from 'components/buttons/CoreButton';
import {NewUserJourneyContinueButtonProps} from './types';

const NewUserJourneyContinueButton = ({
  onPress,
  value,
  textStyle,
  disabled,
}: NewUserJourneyContinueButtonProps) => {
  return (
    <CoreButton
      value={value}
      textStyle={textStyle}
      disabled={disabled}
      onPress={onPress}
    />
  );
};

export default NewUserJourneyContinueButton;
