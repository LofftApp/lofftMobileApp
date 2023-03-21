import React, { useState, useCallback } from 'react';
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

// Components
import HighlightedButtons from '@Components/containers/HighlithgtedButtons';
import PaginationBar from '@Components/bars/PaginationBar';
import LofftHeaderPhoto from '@Components/cards/LofftHeaderPhoto';
import { fontStyles } from '@StyleSheets/fontStyles';
import { CoreButton } from '@Components/buttons/CoreButton';
import Chips from '@Components/buttons/Chips';

// Styles

const FlatShowScreen = ({ route, navigation, }: any) => {
  const [description, setDescription] = useState(
    `This near 1,100 sq.ft. apartment has been maintained in great condition and is divided by a generous entertaining space on one floor, and its private bedroom and bathroom quarters on the second level.${'\n'}${'\n'}On entering this maisonette via its very own front door, you are struck by its breathtakingly bright, airy, and modern open-plan kitchen / dining and living room layout, its floor to ceiling windows that drench the room with natural light, and all the while benefiting from the glistering and serene canalside waters.The next level has two large double bedrooms, currently serving as a principal en-suite and the other room as a spacious home office (with a separate family bathroom).`,
  );

  /* Params are being passed classicly via the route helper instead of  */
  const {price, match} = route.params;

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
      <HighlightedButtons navigation={navigation} />
      <LofftHeaderPhoto imageContainerHeight={300} />
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.centralizerContainer}>
            <View style={styles.matchContainer}>
              <View>
                <Text style={fontStyles.headerLarge}>🌟</Text>
              </View>
              <View>
                <Text style={fontStyles.headerSmall}>
                  96% match with your lifestyles
                  {'\n'}& flat expectations
                </Text>
              </View>
            </View>
            <View style={styles.infoContainer}>
              <Text style={{ color: Color.Black[80] }}>
                Wilsnackerstr. 13, Berlin, 10559
              </Text>
              <Text style={[fontStyles.headerSmall, { paddingTop: 20 }]}>
                🧘 Calm flat in the centre of Moabit
              </Text>
              <View style={styles.LegendContainer}>
                <View style={styles.firstRowLegendContainer}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <LofftIcon
                      name="banke-note"
                      size={22}
                      color={Color.Black[30]}
                    />
                    <Text
                      style={[
                        fontStyles.headerSmall,
                        { marginLeft: 10, marginRight: 100 },
                      ]}>
                      860€
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <LofftIcon name="ruler" size={22} color={Color.Black[30]} />
                    <Text style={[fontStyles.headerSmall, { marginLeft: 10 }]}>
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
                  <Text style={[fontStyles.headerSmall, { marginLeft: 10 }]}>
                    From: 25/12/22 - unlimited
                  </Text>
                </View>
              </View>
              <View style={{ marginTop: 10 }}>
                <Text style={{ color: Color.Black[80] }}>
                  {description.substring(
                    0,
                    `${descriptionExpanded ? description.length : 200}`,
                  )}
                </Text>
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
                    { color: Color.Lavendar[100] },
                  ]}
                  disabled={false}
                  onPress={() => expander()}
                />
              </View>
              <Text style={[fontStyles.headerSmall, { marginTop: 20 }]}>
                Match with you
              </Text>
              <View style={{ marginTop: 10 }}>
                <Chips />
              </View>

              <Text style={[fontStyles.headerSmall, { marginTop: 20 }]}>
                Other
              </Text>
              <View style={{ marginTop: 10 }}>
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

                <CoreButton
                  value="Apply"
                  style={{
                    borderWidth: 2,
                    marginTop: 14,
                    height: 45,
                    marginBottom: 30,
                  }}
                  disabled={false}
                  onPress={() => navigation.navigate('applyforflat')}
                />
              </View>

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
});

export default FlatShowScreen;
