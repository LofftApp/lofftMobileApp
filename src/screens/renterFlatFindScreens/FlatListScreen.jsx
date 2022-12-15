import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
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
  const [screen, setScreen] = useState('list');
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss()}>
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
          <Pressable
            style={[
              styles.toggleButton,
              screen === 'list' ? styles.toggleButtonActive : null,
            ]}
            onPress={() => setScreen('list')}>
            <Icon
              name="list-outline"
              size={20}
              color={screen === 'list' ? Color.Lavendar[100] : Color.Black[50]}
            />
            <Text
              style={[
                fontStyles.bodyMedium,
                styles.toggleButtonText,
                screen === 'list' ? styles.toggleButtonTextActive : null,
              ]}>
              List View
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.toggleButton,
              screen === 'map' ? styles.toggleButtonActive : null,
            ]}
            onPress={() => setScreen('map')}>
            <Icon
              name="map-outline"
              size={20}
              color={screen === 'map' ? Color.Lavendar[100] : Color.Black[50]}
            />
            <Text
              style={[
                fontStyles.bodyMedium,
                styles.toggleButtonText,
                screen === 'map' ? styles.toggleButtonTextActive : null,
              ]}>
              Map View
            </Text>
          </Pressable>
        </View>
        <View style={styles.viewContainer}>
          {screen == 'list' ? <Text>List</Text> : <Text>Map</Text>}
        </View>
      </View>
    </TouchableWithoutFeedback>
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
  viewContainer: {
    flex: 1,
  },
});

export default FlatListScreen;
