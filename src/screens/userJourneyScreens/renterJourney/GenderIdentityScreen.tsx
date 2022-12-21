import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';

// Screens 📺
import ScreenBackButton from '@Screens/ScreenBackButton';

// Components 🪢
import HeadlineContainer from '@Components/containers/HeadlineContainer';
import PaginationBar from '@Components/bars/PaginationBar';
import SelectButton from '@Components/buttons/SelectButton';
import {CoreButton} from '@Components/buttons/CoreButton';

// Styles 🖼️
import {fontStyles} from '@StyleSheets/fontStyles';
import Color from '@StyleSheets/lofftColorPallet.json';

const GenderIdentityScreen = ({navigation, route}: any) => {
  const genders = [
    {value: 'Male', id: 1, toggle: false},
    {value: 'Female', id: 2, toggle: false},
    {value: 'Non-Binary', id: 3, toggle: false},
    {value: 'Another gender identity not listed', id: 4, toggle: false},
    {value: 'Prefer not to say', id: 5, toggle: false},
  ];

  const selectedTagsFromScreenOne = route.params.selectedTagsFromScreenOne;
  const [screen, setScreen] = useState(1);
  const [intitalGenders, setIntitalGenders] = useState(genders);
  const [cleanGenders, setCleanGenders] = useState([]);

  console.log(cleanGenders);

  const selectGender = (id: any) => {
    const genderTicked = intitalGenders.map(el => {
      if (el.id === id) {
        return {
          ...el,
          toggle: !el.toggle,
        };
      } else {
        return {
          ...el,
          toggle: false,
        };
      }
    });

    const wash: any = genderTicked.filter(el => el.toggle);
    setCleanGenders(wash);
    setIntitalGenders(genderTicked);
  };

  return (
    <ScreenBackButton nav={() => navigation.goBack()}>
      <HeadlineContainer
        headlineText={'What is your gender identity?'}
        subDescription={'To create a safe place for ... '}
      />

      <View>
        {intitalGenders.map((el, index) => (
          <SelectButton
            key={index + 1}
            value={el.value}
            toggle={el.toggle}
            id={el.id}
            selectGender={selectGender}
          />
        ))}

        <View style={styles.buttonContainer}>
          <View style={styles.paginationContainer}>
            <PaginationBar screen={screen} totalScreens={6} />
          </View>

          {cleanGenders.length >= 1 ? (
            <CoreButton
              value="Continue"
              style={{backgroundColor: Color.Lavendar[100]}}
              textStyle={[fontStyles.headerSmall, {color: 'white'}]}
              disabled={false}
              onPress={() => {
                navigation.navigate('SelectCityScreen', {
                  selectedTagsFromScreenOne: selectedTagsFromScreenOne,
                  selectedTagsFromScreenTwo: cleanGenders[0]['value'],
                });
              }}
            />
          ) : (
            <CoreButton
              value="Continue"
              style={{backgroundColor: '#BBBBBB', borderWidth: 0}}
              textStyle={[fontStyles.headerSmall, {color: 'white'}]}
              disabled={true}
              onPress={() => {
                navigation.navigate('', {});
              }}
            />
          )}
        </View>
      </View>
    </ScreenBackButton>
  );
};

const styles = StyleSheet.create({
  selectd: {
    color: 'blue',
  },
  buttonContainer: {},
  paginationContainer: {
    marginTop: 7,
    marginBottom: 57,
  },
});

export default GenderIdentityScreen;
