import {Dimensions} from 'react-native';

export const widthCalculator = (width: number) => {
  const refWidth = 414;
  const deviceWidth = Dimensions.get('window').width;
  return (width * deviceWidth) / refWidth;
};

export const heightCalculator = (height: number) => {
  const refHeight = 1147;
  const deviceHeight = Dimensions.get('window').height;
  return (height * deviceHeight) / refHeight;
};
