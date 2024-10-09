import React, {useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';

// Screens 📺
import ScreenBackButton from 'components/coreComponents/ScreenTemplates/ScreenBackButton';

// Components 🪢
import HeadlineContainer from 'components/containers/HeadlineContainer';
import SelectionButton from 'components/buttons/SelectionButton';
import FooterNavBarWithPagination from 'components/bars/FooterNavBarWithPagination';

// Data 💿
import flatPreferences from 'components/componentData/flatPreferences.json';

// Helper 🤝
import {navigationHelper} from 'helpers/navigationHelper';
import {useNavigation} from '@react-navigation/native';
import {size} from 'react-native-responsive-sizes';

// Types 🧩
import {FlatFeature} from './types';

const FlatFeaturesScreen = ({route}: any) => {
  const navigation = useNavigation();
  const headerText = route.params.headerText;
  const subHeaderText = route.params.subText;
  const preferences = flatPreferences;

  const [intitalpreferencesArray, seIintitalPreferencesArray] =
    useState(preferences);
  const [selectedTrack, setselectedTrack] = useState<FlatFeature[]>([]);

  const selectFn = (id: number) => {
    const targets = [];

    const preSeleted = intitalpreferencesArray.map(element => {
      if (element.id === id) {
        targets.push(element);
        return {
          ...element,
          toggle: !element.toggle,
        };
      } else {
        return element;
      }
    });

    const wash = preSeleted.filter(el => el.toggle);

    setselectedTrack(wash);
    seIintitalPreferencesArray(preSeleted);
  };

  const emojiElements = intitalpreferencesArray.map((emojiElement, index) => {
    return (
      <SelectionButton
        key={index + 1}
        id={emojiElement.id}
        emojiIcon={emojiElement.emoji}
        value={emojiElement.value}
        toggle={emojiElement.toggle}
        selectFn={selectFn}
      />
    );
  });

  return (
    <ScreenBackButton nav={() => navigation.goBack()}>
      <HeadlineContainer
        headlineText={headerText}
        subDescription={subHeaderText}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.emojiContainer}>{emojiElements}</View>
      </ScrollView>
      <FooterNavBarWithPagination
        onPress={(targetScreen: any) =>
          navigationHelper(navigation, targetScreen)
        }
        details={{flatFeatures: selectedTrack}}
      />
    </ScreenBackButton>
  );
};

const styles = StyleSheet.create({
  emojiContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: size(150),
  },
});

export default FlatFeaturesScreen;
