import {PixelRatio, Dimensions, Platform} from 'react-native';

const {width, height} = Dimensions.get('window');

// based on iphone 5s's scale
const widthScale = width / 320;
const heightScale = height / 568;
const normalize = size => {
  const newSize = size * widthScale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};

export {normalize};
