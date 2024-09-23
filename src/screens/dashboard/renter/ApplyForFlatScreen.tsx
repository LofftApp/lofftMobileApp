import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// Styles
import {fontStyles} from 'styleSheets/fontStyles';

//Components
import ScreenBackButton from 'components/coreComponents/ScreenTemplates/ScreenBackButton';
import {CoreButton} from 'components/buttons/CoreButton';
import {ApplyForFlatScreenBackground, HiFive} from 'assets';

// Types 🏷️
import {useAppSelector} from 'reduxCore/hooks';
import {SearchScreenNavigationProp} from '../../../../navigationStacks/types';

const ApplyForFlatScreen = () => {
  const navigation = useNavigation<SearchScreenNavigationProp>();
  const credits = useAppSelector(state => state.user.user.credits);

  return (
    <ScreenBackButton nav={() => navigation.goBack()}>
      <ApplyForFlatScreenBackground style={styles.backgroundImage} />
      <View style={styles.itemsWrap}>
        <HiFive />
        <Text style={[fontStyles.headerSmall, styles.hack]}>
          You’ve applied for this Lofft. {'\n'} The owner has maximum 48 hours
          to get back to you!
        </Text>
        <Text style={[fontStyles.bodyMedium, styles.hack]}>
          ⚡️ Remaining tokens : {credits}
        </Text>
        <View style={styles.buttonsWrap}>
          <CoreButton
            style={styles.buttonStyle}
            value={'See all applications'}
            onPress={() => navigation.navigate('favorite')}
          />
          <CoreButton
            style={styles.buttonStyle}
            invert={true}
            value={'Back to search'}
            onPress={() => navigation.navigate('flatOverview')}
          />
        </View>
      </View>
    </ScreenBackButton>
  );
};

const styles = StyleSheet.create({
  itemsWrap: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    top: 50,
    zIndex: -1,
    left: -20,
  },
  hack: {
    textAlign: 'center',
    marginTop: 24,
  },
  buttonsWrap: {
    marginTop: 48,
    width: '100%',
  },
  buttonStyle: {
    width: '100%',
    marginBottom: 10,
  },
});

export default ApplyForFlatScreen;
