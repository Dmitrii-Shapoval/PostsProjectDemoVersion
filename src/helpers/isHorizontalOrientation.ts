import {Dimensions} from 'react-native';

export const isHorizontalOrientation = (): boolean => {
  const {height, width} = Dimensions.get('window');
  return height < width;
};
