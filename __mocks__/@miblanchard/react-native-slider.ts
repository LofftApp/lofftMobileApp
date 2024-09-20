// __mocks__/@miblanchard/react-native-slider.ts
import React from 'react';

// Mock Slider with functionality for events
export const Slider = jest.fn(props => {
  const {onValueChange, value} = props;

  // Simulate calling `onValueChange` when value changes
  React.useEffect(() => {
    if (onValueChange) {
      onValueChange(value);
    }
  }, [value, onValueChange]);

  // Use React.createElement instead of JSX
  return React.createElement('div', props, 'Mocked Slider');
});
