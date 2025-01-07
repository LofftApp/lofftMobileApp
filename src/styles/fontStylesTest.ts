// Import necessary modules
import { StyleSheet } from 'react-native';
import Color from './lofftColorPalletTest.json'; // Import color palette JSON
import { fontSize, size } from 'react-native-responsive-sizes';

// Font family definitions
const InterBlack = 'Inter-Black';
const InterBold = 'Inter-Bold';
const InterSemiBold = 'Inter-SemiBold';
const InterMedium = 'Inter-Medium';
const InterRegular = 'InterV';

// Function to create styles dynamically based on the theme
export const createFontStyles = (isDarkMode:boolean) => {
  const colors = isDarkMode ? Color.Dark : Color.Light;

  return StyleSheet.create({
    headerDisplay: {
      fontFamily: InterBlack,
      color: colors.Black[100],
      letterSpacing: 0.2,
      fontSize: fontSize(32),
      lineHeight: size(54),
    },
    headerLarge: {
      fontFamily: InterBold,
      color: colors.Black[100],
      letterSpacing: 0.2,
      fontSize: fontSize(28),
    },
    headerMedium: {
      fontFamily: InterSemiBold,
      color: colors.Black[100],
      fontSize: fontSize(22),
    },
    headerSmall: {
      fontFamily: InterSemiBold,
      color: colors.Black[100],
      fontSize: fontSize(18),
      lineHeight: size(32),
    },
    headerExtraSmall: {
      fontFamily: InterSemiBold,
      color: colors.Black[100],
      fontSize: fontSize(16),
    },
    bodyLarge: {
      fontFamily: InterMedium,
      color: colors.Black[100],
      fontSize: fontSize(22),
      lineHeight: size(32),
    },
    bodyMedium: {
      fontFamily: InterMedium,
      color: colors.Black[100],
      fontSize: fontSize(16),
      lineHeight: size(28),
    },
    bodySmall: {
      fontFamily: InterRegular,
      color: colors.Black[100],
      fontSize: fontSize(14),
      lineHeight: size(24),
    },
    bodyExtraSmall: {
      fontFamily: InterRegular,
      color: colors.Black[100],
      fontSize: fontSize(12),
      lineHeight: size(20),
    },
  });
};
