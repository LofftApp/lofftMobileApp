import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

// Screen 📺
import ScreenBackButton from '@Components/coreComponents/ScreenTemplates/ScreenBackButton';

// APIs
import {findAddress} from '@Api/mapbox/findAddress';

// Components 🪢
import InputFieldText from '@Components/coreComponents/inputField/InputFieldText';
import CustomSwitch from '@Components/coreComponents/interactiveElements/CustomSwitch';
import FooterNavBarWithPagination from '@Components/bars/FooterNavBarWithPagination';

// Styles 🖼️
import {fontStyles} from '@StyleSheets/fontStyles';

// Helpers 🤝
import {navigationHelper} from '@Helpers/navigationHelper';

const LessorWhereIsFlatScreen = ({navigation}: any) => {
  const [location, setLocation] = useState('');
  const [cost, setCost] = useState('');
  const [addresses, setAddresses] = useState<any[]>([]);
  const [warmRent, setWarmRent] = useState(false);
  const [addressQuery, setAddressQuery] = useState(false);
  const [query, setQuery] = useState([]);
  const [addressDetails, setAddressDetails] = useState({
    address: null,
    district: null,
  });

  return (
    <ScreenBackButton nav={() => navigation.goBack()}>
      <View style={styles.whereContainer}>
        <Text style={fontStyles.headerDisplay}>Where is your flat?</Text>
        <InputFieldText
          type="search"
          placeholder="Address of the flat"
          value={location}
          onChangeText={async (t: React.SetStateAction<string>) => {
            setAddressQuery(true);
            setLocation(t);
            const add = await findAddress(t);
            setQuery(add);
            const addresslist = add.map((data: any) => {
              return data.address;
            });
            setAddresses(addresslist);
          }}
          dropdown={addressQuery}
          dropDownContent={addresses}
          dropDownPressAction={(value: string) => {
            const addressIndex = addresses.indexOf(value);
            setLocation(value);
            setAddressDetails(query[addressIndex]);
            setAddressQuery(false);
          }}
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
          type="currency"
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
      <FooterNavBarWithPagination
        onPress={(targetScreen: any) =>
          navigationHelper(navigation, targetScreen)
        }
        disabled={location === '' || cost === ''}
        details={{
          location: addressDetails.address,
          district: addressDetails.district,
          cost,
          warmRent,
        }}
      />
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
});

export default LessorWhereIsFlatScreen;