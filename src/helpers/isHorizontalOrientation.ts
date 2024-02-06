import {Dimensions} from 'react-native';

export const isHorizontalOrientation = () => {
  const {height, width} = Dimensions.get('window');
  return height < width;
};
