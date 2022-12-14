import React, {useState} from 'react';
import {View, Text, Button, StyleSheet, Pressable} from 'react-native';
import PrimaryScreen from '../../components/coreComponents/CoreScreens/PrimaryScreen';
import FilterButton from '../../components/coreComponents/buttons/FilterButton';
import Icon from 'react-native-vector-icons/Ionicons';
import {fontStyles} from '../../styles/fontStyles';
import Color from '../../styles/lofftColorPallet.json';

// Firebase
import auth from '@react-native-firebase/auth';

// Components
import InputFieldText from '../../components/coreComponents/inputField/InputFieldText';

// This list page has old icons, it will need to have new icons when added.

const FlatListScreen = () => {
  const [search, setSearch] = useState('');
  return (
    <View style={styles.pageContainer}>
      <View style={styles.searchContainer}>
        <InputFieldText
          type="search"
          onChangeText={t => setSearch(t)}
          value={search}
          placeholder="City, Neighbourhood..."
          onClear={() => setSearch('')}
          keyboardType="email-address"
          style={styles.inputField}
        />
        <FilterButton onPress={() => auth().signOut()} />
      </View>
      <View style={styles.viewToggle}>
        <Pressable style={[styles.toggleButton, styles.toggleButtonActive]}>
          <Icon name="list-outline" size={20} color={Color.Lavendar[100]} />
          <Text
            style={[
              fontStyles.bodyMedium,
              styles.toggleButtonText,
              styles.toggleButtonTextActive,
            ]}>
            List View
          </Text>
        </Pressable>
        <Pressable style={styles.toggleButton}>
          <Icon name="map-outline" size={20} />
          <Text style={[fontStyles.bodyMedium, styles.toggleButtonText]}>
            Map View
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    backgroundColor: Color.White[100],
    flex: 1,
  },
  inputField: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    marginHorizontal: 25,
    marginTop: 68, // Needs to be added to core view file, though not working when built
  },
  viewToggle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  toggleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 14,
    paddingTop: 18,
    borderBottomWidth: 1,
    justifyContent: 'center',
  },
  toggleButtonActive: {
    borderColor: Color.Lavendar[100],
  },
  toggleButtonText: {
    marginLeft: 5,
  },
  toggleButtonTextActive: {
    color: Color.Lavendar[100],
  },
});

export default FlatListScreen;
