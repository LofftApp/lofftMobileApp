/* eslint-disable react-native/no-inline-styles */
import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from 'react-native';

import Color from '@StyleSheets/lofftColorPallet.json';
import IconButton from '@Components/buttons/IconButton';
import LofftIcon from '@Components/lofftIcons/LofftIcon';

// Redux 🏗️
import {useAppSelector, useAppDispatch} from '@ReduxCore/hooks';
import {saveFlatsToFavorites} from '@Redux/user/usersSlice';

// Components
import HighlightedButtons from '@Components/containers/HighlightButtons';
import PaginationBar from '@Components/bars/PaginationBar';
import LofftHeaderPhoto from '@Components/cards/LofftHeaderPhoto';
import CompleteProfileImage from '@Assets/images/Illustration.png';
import {fontStyles} from '@StyleSheets/fontStyles';
import {CoreButton} from '@Components/buttons/CoreButton';
import Chips from '@Components/buttons/Chips';
import FlatInfoContainer from '@Components/containers/FlatInfoContainer';
import CompleteProfilePopUpModal from '@Components/modals/CompleteProfilePopUpModal';

// Styles

const FlatShowScreen = ({route, navigation}: any) => {
  const [flatIndex] = useState(route.params.i);
  const userType = useAppSelector((state: any) => state.user.userType);
  let save = false;
  const flat = useAppSelector((state: any) => state.flats.allFlats[flatIndex]);
  const [description, setDescription] = useState(flat.description);
  const dispatch = useAppDispatch();
  if (userType === 'renter') {
    save = useAppSelector(state => state.user.savedFlats.includes(flat.flatId));
  }

  /* Params are being passed classicly via the route helper instead of  */
  const {price, match} = route.params;

  //This is a placeholder for the CompleteProfileStep
  const [completeProfile, setCompleteProfile] = useState(false);

  //Placeholder for if Out of Tokens
  const [outOfTokens, setOutOfTokens] = useState(true);

  //Modal
  const [descriptionExpanded, setDescriptionExpansion] = useState(false);
  const [blurActivated, setBlurActivated] = useState(false);
  const expander = () => {
    setDescriptionExpansion(!descriptionExpanded);
  };

  const [matches, setMatches] = useState([
    '🚉',
    '🏳️‍🌈',
    '🎉',
    '👩🏽‍🍳',
    '🥦',
    '🗺',
    '🚭',
    '🌱',
  ]);

  const profileNotDoneObject = {
    header: "Your application profile isn't complete",
    description:
      'To apply for this flat, please go to the profile section and complete your application. This takes only 5 minutes!',
    icon: CompleteProfileImage,
  };
  const outOfTokensObject = {
    header: 'Why are tokens limited?',
    description:
      "We're passionate about fair flat searches! Each user can have up to 10 active applications at a time, but withdrawing one is easy. Relax and wait for the post owner to notify you of the result within 48 hours. Let's make finding your dream flat an equal opportunity for all!",
    icon: CompleteProfileImage,
  };

  const pullData = (data: any) => {
    setBlurActivated(data);
  };

  return (
    <View style={styles.pageContainer}>
      {/* Added flatindex to ID, please confirm what is needed there @AdamTomczyk or @DonJuanKim */}
      {!blurActivated ? (
        <HighlightedButtons
          navigation={navigation}
          save={save}
          onPressHeart={() =>
            dispatch(saveFlatsToFavorites({flatId: flat.flatId, add: !save}))
          }
        />
      ) : null}
      <LofftHeaderPhoto
        imageContainerHeight={300}
        images={flat.images}
        activeBlur={blurActivated}
      />
      <SafeAreaView
        style={{backgroundColor: Color.White[100], alignItems: 'center'}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}>
          <FlatInfoContainer
            address={flat.address}
            description={flat.description}
            untilDate={flat.untilDate}
            fromDate={flat.fromDate}
            flatId={flat.flatId}
            price={flat.price}
            district={flat.district}
            navigation={navigation}
            button={true}
          />
          {/* <View>
                {completeProfile && !outOfTokens ? (
                  <CoreButton
                    value="Apply"
                    style={styles.applyCoreButton}
                    disabled={false}
                    onPress={() => navigation.navigate('applyforflat')}
                  />
                ) : (
                  <CoreButton
                    value="Apply"
                    style={styles.applyCoreButton}
                    disabled={false}
                    onPress={() => pullData(true)}
                  />
                )}
              </View> */}
          <CompleteProfilePopUpModal
            openModal={blurActivated}
            pullData={pullData}
            profileNotDoneObject={
              completeProfile && outOfTokens
                ? outOfTokensObject
                : profileNotDoneObject
            }
          />
          {/* Continue coding from here !!!! */}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    height: '65%',
    paddingBottom: 10,
    width: '90%',
  },
  pageContainer: {
    flex: 1,
    backgroundColor: Color.White[100],
  },
  imageContainer: {
    height: 300,
    width: Dimensions.get('window').width,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  centralizerContainer: {
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  matchContainer: {
    width: '90%',
    backgroundColor: Color.Mint[10],
    marginVertical: 10,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    alignItems: 'center',
  },
  infoContainer: {
    width: '90%',
    marginTop: 15,
  },
  LegendContainer: {
    width: '90%',
    marginTop: 10,
  },
  firstRowLegendContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  secondRowLegendContainer: {
    flexDirection: 'row',
  },

  line: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'black',
  },
  modalContainer: {
    height: '64%',
    marginTop: 'auto',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  completeProfileContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  headerContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  applyCoreButton: {
    borderWidth: 2,
    marginTop: 14,
    height: 45,
    marginBottom: 30,
  },
});

export default FlatShowScreen;
