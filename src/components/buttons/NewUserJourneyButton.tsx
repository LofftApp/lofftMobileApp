import React from 'react';
import IconButton from 'components/buttons/IconButton';
import {NewUserJourneyButtonProps} from './types';

const NewUserJourneyButton = ({
  text,
  icon,
  style,
  onPress,
  isActive,
}: NewUserJourneyButtonProps) => {
  const handleOnPress = () => {
    onPress();
  };
  return (
    <IconButton
      animation
      text={text}
      icon={icon}
      style={style}
      onPress={handleOnPress}
      isActive={isActive}
    />
  );
};

export default NewUserJourneyButton;
