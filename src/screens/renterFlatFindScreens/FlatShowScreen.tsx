/* eslint-disable react-native/no-inline-styles */
import React, {useState, useCallback} from 'react';
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
  Modal,
} from 'react-native';

import Color from '@StyleSheets/lofftColorPallet.json';
import IconButton from '@Components/buttons/IconButton';
import LofftIcon from '@Components/lofftIcons/LofftIcon';
import {CrossIcon} from '../../assets';

// Redux 🏗️
import {useSelector} from 'react-redux';

// Components
import HighlightedButtons from '@Components/containers/HighlithgtedButtons';
import PaginationBar from '@Components/bars/PaginationBar';
import LofftHeaderPhoto from '@Components/cards/LofftHeaderPhoto';
import ScreenImage from '@Assets/images/Illustration.png';
import {fontStyles} from '@StyleSheets/fontStyles';
import {CoreButton} from '@Components/buttons/CoreButton';
import Chips from '@Components/buttons/Chips';

// Styles

const FlatShowScreen = ({route, navigation, i}: any) => {
  const [flatIndex] = useState(route.params.i);
  const flat = useSelector((state: any) => state.flats.allFlats[flatIndex]);

  const [description, setDescription] = useState(flat.description);

  /* Params are being passed classicly via the route helper instead of  */
  const {price, match} = route.params;

  //This is a placeholder for the CompleteProfileStep
  const [completeProfile, setCompleteProfile] = useState(false);

  //Modal
  const [modalOpen, setModalOpen] = useState(false);

  const [descriptionExpanded, setDescriptionExpansion] = useState(false);

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

  return (
    <View style={styles.pageContainer}>
      {/* Added flatindex to ID, please confirm what is needed there @AdamTomczyk or @DonJuanKim */}
      <HighlightedButtons navigation={navigation} id={flatIndex} />
      <LofftHeaderPhoto imageContainerHeight={300} images={flat.images} />
      <SafeAreaView>
        <ScrollView style={styles.scrollView}>
          <View style={styles.centralizerContainer}>
            <View style={styles.matchContainer}>
              <View>
                <Text style={fontStyles.headerLarge}>🌟</Text>
              </View>
              <View>
                <Text style={fontStyles.headerSmall}>
                  {flat?.matchP}% match with your lifestyles
                  {'\n'}& flat expectations
                </Text>
              </View>
            </View>
            <View style={styles.infoContainer}>
              <Text style={{color: Color.Black[80]}}>{flat?.address}</Text>
              <Text style={[fontStyles.headerSmall, {paddingTop: 20}]}>
                🧘 Calm flat in the centre of Moabit
              </Text>
              <View style={styles.LegendContainer}>
                <View style={styles.firstRowLegendContainer}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <LofftIcon
                      name="banke-note"
                      size={22}
                      color={Color.Black[30]}
                    />
                    <Text
                      style={[
                        fontStyles.headerSmall,
                        {marginLeft: 10, marginRight: 100},
                      ]}>
                      {flat?.price}€
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <LofftIcon name="ruler" size={22} color={Color.Black[30]} />
                    <Text style={[fontStyles.headerSmall, {marginLeft: 10}]}>
                      26m2
                    </Text>
                  </View>
                </View>
                <View style={styles.secondRowLegendContainer}>
                  <LofftIcon
                    name="calendar"
                    size={22}
                    color={Color.Black[30]}
                  />
                  <Text style={[fontStyles.headerSmall, {marginLeft: 10}]}>
                    From: {flat.fromDate}{' '}
                    {flat.untilDate ? `- ${flat.untilDate}` : null}
                  </Text>
                </View>
              </View>
              <View style={{marginTop: 10}}>
                <Text style={{color: Color.Black[80]}}>
                  {description.substring(
                    0,
                    `${descriptionExpanded ? description.length : 200}`,
                  )}
                </Text>
                {description.length > 200 ? (
                  <CoreButton
                    value={descriptionExpanded ? 'Read Less' : 'Read More'}
                    style={{
                      backgroundColor: 'white',
                      borderWidth: 2,
                      marginTop: 14,
                      height: 40,
                    }}
                    textStyle={[
                      fontStyles.headerSmall,
                      {color: Color.Lavendar[100]},
                    ]}
                    disabled={false}
                    onPress={() => expander()}
                  />
                ) : null}
              </View>
              {/* ! Build logic to match the values common with the user */}
              <Text style={[fontStyles.headerSmall, {marginTop: 20}]}>
                Match with you
              </Text>
              <View style={{marginTop: 10}}>
                <Chips />
              </View>

              <Text style={[fontStyles.headerSmall, {marginTop: 20}]}>
                Other
              </Text>
              <View style={{marginTop: 10}}>
                <Chips />
              </View>

              <View>
                <Text
                  style={[
                    fontStyles.bodySmall,
                    {
                      textAlign: 'center',
                      color: Color.Mint[100],
                      marginTop: 20,
                    },
                  ]}>
                  Application closing in 1d 8h
                </Text>
              </View>
              <View>
                {completeProfile ? (
                  <CoreButton
                    value="Apply"
                    style={{
                      borderWidth: 2,
                      marginTop: 14,
                      height: 45,
                      marginBottom: 30,
                    }}
                    disabled={false}
                    onPress={() =>
                      navigation.navigate(
                        completeProfile
                          ? 'applyforflat'
                          : 'completeProfileScreen',
                      )
                    }
                  />
                ) : (
                  <CoreButton
                    value="Apply"
                    style={{
                      borderWidth: 2,
                      marginTop: 14,
                      height: 45,
                      marginBottom: 30,
                    }}
                    disabled={false}
                    //add on press functionality => display: none everything but image, add blurRadius={65} to image
                    onPress={() => setModalOpen(true)}
                  />
                )}
              </View>
              <Modal
                visible={modalOpen}
                animationType="slide"
                transparent={true}>
                <View style={styles.modalContainer}>
                  <View style={styles.completeProfileContainer}>
                    <View style={styles.headerContainer}>
                      <Text style={fontStyles.headerMedium}>
                        Your application profile isn't complete
                      </Text>
                      <CrossIcon
                        style={{
                          marginTop: 16,
                          marginRight: 14,
                        }}
                        onPress={() => setModalOpen(false)}
                      />
                    </View>
                    <View>
                      <Image source={ScreenImage} />
                    </View>
                    <View>
                      <Text style={fontStyles.bodyMedium}>
                        To apply for this flat, please go to the profile section
                        and complete your application. This takes only 5
                        minutes!
                      </Text>
                    </View>
                    <CoreButton
                      value="Complete my profile now"
                      style={{
                        borderWidth: 2,
                        marginTop: 14,
                        height: 45,
                        width: '100%',
                      }}
                      disabled={false}
                    />
                    <CoreButton
                      value="Do it later"
                      style={{
                        borderWidth: 2,
                        marginTop: 5,
                        height: 45,
                        width: '100%',
                      }}
                      disabled={false}
                      invert={true}
                      onPress={() => setModalOpen(false)}
                    />
                  </View>
                </View>
              </Modal>
              {/* Continue codeing from here !!!! */}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    height: '61%',
    paddingBottom: 100,
  },
  pageContainer: {
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
    height: '60%',
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
});

export default FlatShowScreen;
