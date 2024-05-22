import {StyleSheet} from 'react-native';
import color from './lofftColorPallet.json';
import { width, height, size, fontSize } from "react-native-responsive-sizes";

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
    lineHeight: 48,
  },
  headerLarge: {
    fontFamily: InterBold,
    color: color.Black[100],
    letterSpacing: 0.2,
    fontSize: fontSize(28),
    lineHeight: 32,
  },
  headerMedium: {
    fontFamily: InterSemiBold,
    color: color.Black[100],
    fontSize: fontSize(22),
    lineHeight: 28,
  },
  headerSmall: {
    fontFamily: InterSemiBold,
    color: color.Black[100],
    fontSize: fontSize(18),
    lineHeight: 22,
  },
  bodyLarge: {
    fontFamily: InterMedium,
    color: color.Black[100],
    fontSize: fontSize(22),
  },
  bodyMedium: {
    fontFamily: InterMedium,
    color: color.Black[100],
    fontSize: fontSize(16),
  },
  bodySmall: {
    fontFamily: InterRegular,
    color: color.Black[100],
    fontSize: fontSize(14),
  },
});
