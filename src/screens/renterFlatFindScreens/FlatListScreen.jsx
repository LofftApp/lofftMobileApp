import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet} from 'react-native';
import PrimaryScreen from '../../components/coreComponents/CoreScreens/PrimaryScreen';
import FilterButton from '../../components/coreComponents/buttons/FilterButton';

// Components
import InputFieldText from '../../components/coreComponents/inputField/InputFieldText';

// This list page has old icons, it will need to have new icons when added.

const FlatListScreen = () => {
  const [search, setSearch] = useState('');
  return (
    <View>
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
        <FilterButton />
      </View>
      {/* <Button title="Sign out" onPress={() => auth().signOut()} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  inputField: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    marginHorizontal: 25,
    marginTop: 68, // Needs to be added to core view file, though not working when built
  },
});

export default FlatListScreen;
