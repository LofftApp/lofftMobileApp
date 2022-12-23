import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';

// Screens 📺
import ScreenBackButton from '@Components/coreComponents/ScreenTemplates/ScreenBackButton';

// Components 🪢
import HeadlineContainer from '@Components/containers/HeadlineContainer';
import UserJourneyPaginationBar from '@Redux/userRegistration/UserJourneyPaginationBar';
import SelectButton from '@Components/buttons/SelectButton';
import UserJourneyContinue from '@Redux/userRegistration/UserJourneyContinue';

// Styles 🖼️

// Helper 🤝
import {navigationHelper} from '@Helpers/navigationHelper';

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
  const [cleanGenders, setCleanGenders] = useState<any[]>([]);

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
            <UserJourneyPaginationBar />
          </View>

          <UserJourneyContinue
            value="Continue"
            disabled={cleanGenders.length === 0}
            onPress={(targetScreen: any) =>
              navigationHelper(navigation, targetScreen)
            }
            details={{genderIdentity: cleanGenders[0]}}
          />
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
