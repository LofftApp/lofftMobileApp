import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

// Screen 📺
import ScreenBackButton from '@Components/coreComponents/ScreenTemplates/ScreenBackButton';

// Components 🪢
import InputFieldText from '@Components/coreComponents/inputField/InputFieldText';
import CustomSwitch from '@Components/coreComponents/interactiveElements/CustomSwitch';
import PaginationBar from '@Components/bars/PaginationBar';
// import {CoreButton} from '@Components/buttons/CoreButton';
import UserJourneyContinue from '@Redux/userRegistration/UserJourneyContinue';

// Styles 🖼️
import {fontStyles} from '@StyleSheets/fontStyles';

const WhereIsFlatScreen = ({navigation}: any) => {
  const [location, setLocation] = useState('');
  const [cost, setCost] = useState('');
  const [warmRent, setWarmRent] = useState(false);

  return (
    <ScreenBackButton nav={() => navigation.goBack()}>
      <View style={styles.whereContainer}>
        <Text style={fontStyles.headerDisplay}>Where is your flat?</Text>
        <InputFieldText
          type="search"
          placeholder="Address of the flat"
          value={location}
          onChangeText={(t: React.SetStateAction<string>) => setLocation(t)}
          onClear={() => setLocation('')}
        />
      </View>
      <View style={styles.howMuchContainer}>
        <Text style={fontStyles.headerDisplay}>
          How much is the monthly rent?
        </Text>
        <InputFieldText
          value={cost}
          onChangeText={(t: React.SetStateAction<string>) => setCost(t)}
          keyboardType="numeric"
        />
        <View style={styles.toggleContainer}>
          <CustomSwitch
            value={warmRent}
            onValueChange={() => setWarmRent(!warmRent)}
          />
          <Text style={[fontStyles.bodyMedium, styles.warmRentText]}>
            This is warm rent
          </Text>
        </View>
      </View>
      <View style={styles.footerContainer}>
        <PaginationBar screen={0} totalScreens={5} />
        <UserJourneyContinue
          value="Continue"
          textStyle={[fontStyles.headerSmall, {color: 'white'}]}
          onPress={() => navigation.navigate('FlatLengthAvailableScreen')}
          details={{location, cost, warmRent}}
        />
      </View>
    </ScreenBackButton>
  );
};

const styles = StyleSheet.create({
  whereContainer: {
    marginTop: 82.5,
  },
  howMuchContainer: {
    marginTop: 64,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  warmRentText: {
    marginLeft: 8,
  },
  footerContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    marginTop: 35,
    marginBottom: 10,
    paddingVertical: 10,
  },
});

export default WhereIsFlatScreen;
