import React, {useState} from 'react';

// Screens 📺
import ScreenBackButton from 'components/coreComponents/ScreenTemplates/ScreenBackButton';

// Components 🪢
import HeadlineContainer from 'components/containers/HeadlineContainer';
import SelectButton from 'components/buttons/SelectButton';

// Helper 🤝
import {navigationHelper} from 'helpers/navigationHelper';
import FooterNavBarWithPagination from 'components/bars/FooterNavBarWithPagination';
import {useNavigation} from '@react-navigation/native';

interface SelectButton {
  id: number;
  value: string;
  toggle: boolean;
}

const GenderIdentityScreen = () => {
  const navigation = useNavigation();

  const genders = [
    {value: 'Male', id: 1, toggle: false},
    {value: 'Female', id: 2, toggle: false},
    {value: 'Non-Binary', id: 3, toggle: false},
    {value: 'Another gender identity not listed', id: 4, toggle: false},
    {value: 'Prefer not to say', id: 5, toggle: false},
  ];

  const [intitalGenders, setIntitalGenders] = useState(genders);
  const [cleanGenders, setCleanGenders] = useState<SelectButton[]>([]);

  const selectGender = (id: number) => {
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

    const wash = genderTicked.filter(el => el.toggle);
    setCleanGenders(wash);
    setIntitalGenders(genderTicked);
  };

  return (
    <ScreenBackButton nav={() => navigation.goBack()}>
      <HeadlineContainer
        headlineText={'What is your gender identity?'}
        subDescription={'To create a safe place for ... '}
      />


      {intitalGenders.map((el, index) => (
        <SelectButton
          key={index + 1}
          value={el.value}
          toggle={el.toggle}
          id={el.id}
          selectGender={selectGender}
        />
      ))}
      <FooterNavBarWithPagination
        onPress={(targetScreen: any) =>
          navigationHelper(navigation, targetScreen)
        }
        disabled={cleanGenders.length === 0}
        details={{genderIdentity: cleanGenders[0]}}
      />
    </ScreenBackButton>
  );
};

export default GenderIdentityScreen;
