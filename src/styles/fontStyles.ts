import {StyleSheet} from 'react-native';
import color from './lofftColorPallet.json';
import {fontSize, size} from 'react-native-responsive-sizes';

const InterBlack = 'Inter-Black';
const InterBold = 'Inter-Bold';
const InterSemiBold = 'Inter-SemiBold';
const InterMedium = 'Inter-Medium';
const InterRegular = 'InterV';

export const fontStyles = StyleSheet.create({
  headerDisplay: {
    fontFamily: InterBlack,
    color: color.Black[100],
    letterSpacing: 0.2,
    fontSize: fontSize(32),
    lineHeight: size(52),
  },
  headerLarge: {
    fontFamily: InterBold,
    color: color.Black[100],
    letterSpacing: 0.2,
    fontSize: fontSize(28),
    // lineHeight: 32,
  },
  headerMedium: {
    fontFamily: InterSemiBold,
    color: color.Black[100],
    fontSize: fontSize(22),
    // lineHeight: 28,
  },
  headerSmall: {
    fontFamily: InterSemiBold,
    color: color.Black[100],
    fontSize: fontSize(18),
    lineHeight: size(32),
  },
  headerExtraSmall: {
    fontFamily: InterSemiBold,
    color: color.Black[100],
    fontSize: fontSize(16),
    // lineHeight: size(20),
  },
  bodyLarge: {
    fontFamily: InterMedium,
    color: color.Black[100],
    fontSize: fontSize(22),
    lineHeight: size(32),
  },
  bodyMedium: {
    fontFamily: InterMedium,
    color: color.Black[100],
    fontSize: fontSize(16),
    lineHeight: size(28),
  },
  bodySmall: {
    fontFamily: InterRegular,
    color: color.Black[100],
    fontSize: fontSize(14),
    lineHeight: size(24),
  },
  bodyExtraSmall: {
    fontFamily: InterRegular,
    color: color.Black[100],
    fontSize: fontSize(12),
    lineHeight: size(20),
  },
});
