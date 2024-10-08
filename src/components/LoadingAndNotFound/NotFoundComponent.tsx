import {useNavigation} from '@react-navigation/native';
import BackButton from 'components/buttons/BackButton';
import {CoreButton} from 'components/buttons/CoreButton';
import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {size} from 'react-native-responsive-sizes';
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';
import {fontStyles} from 'styleSheets/fontStyles';

type NotFoundComponentProps = {
  message: string;
  backButton?: boolean;
};

function NotFoundComponent({message, backButton}: NotFoundComponentProps) {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={CoreStyleSheet.safeAreaViewShowContainer}>
      {backButton && <BackButton onPress={navigation.goBack} />}
      <View style={styles.ErrorContainer}>
        <Text style={fontStyles.headerSmall}>{message}</Text>
        {backButton && (
          <CoreButton value="Go back" onPress={navigation.goBack} />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  ErrorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: size(16),
    gap: size(16),
  },
});

export default NotFoundComponent;
