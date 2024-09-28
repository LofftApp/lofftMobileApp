import React, {useState} from 'react';

import {
  Text,
  View,
  StyleSheet,
  Animated,
  Easing,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from 'react-native';

// import userProfiles from 'Assets/mockTempData/userProfiles.json';
import ApplicantsCardAdvanced from 'components/cards/ApplicantCardAdvanced';

import {useNavigation} from '@react-navigation/native';

// Components 🪢
import FilterButton from 'components/buttons/FilterButton';
import BackButton from 'components/buttons/BackButton';
import {CoreButton} from 'components/buttons/CoreButton';

const seeProfilesApplicantsScreen = ({navigation}) => {
  const [userProfilesJson, setUserProfilesJson] = useState(userProfiles.users);
  const [maxSelect, setMaxSelected] = useState(5);
  const [finalRound, setFinalRound] = useState([]);
  const windowHeight = Dimensions.get('window').height;
  // const [buttonFeed, setButtonFeed] = useState({width: '90%', position: 'absolute', bottom: 10});
  // const [initalButtonStyle, setintialButtonStyle] = useState({ width: '90%', position: 'absolute', bottom: 10 })

  const selectProfile = id => {
    // const feedingStyle = { width: '92%', position: 'absolute', bottom: 10, height: '8%' };

    const updatedProfiles = userProfilesJson.map(el => {
      if (el.id === id) {
        return {
          ...el,
          selected: !el.selected,
        };
      } else {
        return el;
      }
    });

    setUserProfilesJson(updatedProfiles);

    const selectedProfilesOnly = updatedProfiles.filter(el => el.selected);

    setFinalRound(selectedProfilesOnly);
    // setButtonFeed(style);

    // setTimeout(() => {
    //   setButtonFeed({ width: '90%', position: 'absolute', bottom: 10, })
    // }, 200);

    // Animated.timing(height, {
    //   toValue: 1,
    //   duration: 500,
    //   easing: Easing.linear,
    //   useNativeDriver: false  // <-- neccessary
    // }).start(() => {
    //   Animated.timing(opacity, {
    //     toValue: 1,
    //     duration: 500,
    //     easing: Easing.linear,
    //     useNativeDriver: false  // <-- neccessary
    //   }).start();
    // });
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <BackButton
        style={styles.backButtonOptions}
        title="Applicants"
        onPress={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <SafeAreaView style={styles.safeareaview}>
          <ScrollView bounces={true} contentContainerStyle={styles.scrollView}>
            {userProfilesJson.map((el, index) => (
              <ApplicantsCardAdvanced
                key={index + 1}
                name={el.name}
                match={el.match}
                image={el.image}
                id={el.id}
                selectProfile={selectProfile}
                currentSelectedNums={finalRound.length}
                maxSelect={maxSelect}
                index={index}
                userProfilesJsonLength={userProfilesJson.length}
                navigation={navigation}
              />
            ))}
          </ScrollView>
        </SafeAreaView>
        <CoreButton
          value={`Selected ${finalRound.length}/${maxSelect}`}
          style={{width: '90%', position: 'absolute', bottom: 10}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative',
    alignItems: 'center',
    width: '100%',
  },
  backButtonOptions: {
    marginTop: 30,
    marginHorizontal: 10,
  },
  safeareaview: {
    width: '100%',
    position: 'relative',
  },
  scrollView: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 130,
    marginTop: 10,
  },
});

export default seeProfilesApplicantsScreen;
