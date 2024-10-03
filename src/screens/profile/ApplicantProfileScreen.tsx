/* React Stuff */
import React, {useState} from 'react';
import {Text, View, StyleSheet, ScrollView, Pressable} from 'react-native';

/* Redux ß*/
import {useSeeApplicationsByAdvertIdQuery} from 'reduxFeatures/adverts/advertApi';
import {useGetSpecificUserQuery} from 'reduxFeatures/user/userApi';
import {useAppDispatch, useAppSelector} from 'reduxCore/hooks';
import {toggleRound2} from 'reduxFeatures/applications/applicationSlice';

/* Components */
import LofftHeaderPhoto from 'components/cards/LofftHeaderPhoto';
import HighlightButtons from 'components/containers/HighlightButtons';
import LofftIcon from 'components/lofftIcons/LofftIcon';
import Chips from 'components/buttons/Chips';
import {CoreButton} from 'components/buttons/CoreButton';
import LoadingComponent from 'components/LoadingAndError/LoadingComponent';
import ErrorComponent from 'components/LoadingAndError/ErrorComponent';
import Collapsible from 'react-native-collapsible';

/* Helpers */
import {matchMaker} from 'helpers/matchMaker';
import {capitalize} from 'helpers/capitalize';
import {size} from 'react-native-responsive-sizes';
import {tagSorter} from 'helpers/tagSorter';
import {truncateTextAtWord} from 'helpers/truncateTextAtWord';

/* Styles */
import {fontStyles} from 'styleSheets/fontStyles';
import Color from 'styleSheets/lofftColorPallet.json';
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';

// Types
import type {ApplicantProfileScreenProps} from './types';

const images = [
  'https://www.friendsoffriends.com/app/uploads/andreas-kokkino-david-daniels/Freunde-von-Freunden_Andreas-Kokkino-4524.jpg.webp',
  'https://www.friendsoffriends.com/app/uploads/andreas-kokkino-david-daniels/Freunde-von-Freunden_Andreas-Kokkino-4286.jpg.webp',
  'https://www.friendsoffriends.com/app/uploads/andreas-kokkino-david-daniels/Freunde-von-Freunden_Andreas-Kokkino-4203.jpg.webp',
  'https://www.friendsoffriends.com/app/uploads/andreas-kokkino-david-daniels/Freunde-von-Freunden_Andreas-Kokkino-3849.jpg.webp',
];

const ApplicantProfileScreen = ({route}: ApplicantProfileScreenProps) => {
  const {advertId, applicantId, applicationId} = route.params;

  const {data: advert} = useSeeApplicationsByAdvertIdQuery(advertId);
  // console.log('Advert Data in applicant profile screen', advert);
  const dispatch = useAppDispatch();
  const application = useAppSelector(state =>
    state.applications.applications.find(app => app.id === applicationId),
  );
  const {
    data: profile,
    isLoading,
    error,
  } = useGetSpecificUserQuery(applicantId);
  console.log(
    'Profile Data in applicant profile screen',
    profile?.profileDetails.description,
  );

  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const [matchExpand, setMatchExpand] = useState(false);
  const [otherExpand, setOtherExpand] = useState(false);

  if (!advert || !profile) {
    return null;
  }

  const charTags = tagSorter(
    profile.profileCharacteristics,
    advert.flat.characteristics,
  );

  const positiveCharTags = charTags.positiveTags;
  const negativeCharTags = charTags.negativeTags;

  // const matches = matchMaker(flatChars, profileChars)[0];
  // const noMatches = matchMaker(flatChars, profileChars)[1];

  const selectApplication = (id: number) => {
    dispatch(toggleRound2(id));
  };

  const toggleMatchExpand = () => {
    setMatchExpand(prev => !prev);
  };
  const toggleDescriptionExpand = () => {
    setDescriptionExpanded(prev => !prev);
  };

  const toggleOtherExpand = () => {
    setOtherExpand(prev => !prev);
  };

  const maxDescriptionLength = 250;
  const truncatedDescription = truncateTextAtWord(
    profile.profileDetails.description,
    maxDescriptionLength,
  );
  const hiddenDescription = profile.profileDetails.description.slice(
    truncatedDescription.length,
  );
  const isTruncated =
    profile.profileDetails.description.length > truncatedDescription.length;

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (error) {
    return <ErrorComponent message="We could not find the applicant" />;
  }

  return (
    <View style={CoreStyleSheet.showContainer}>
      <View>
        <LofftHeaderPhoto images={images} imageContainerHeight={size(350)} />
        <HighlightButtons heartPresent={false} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={CoreStyleSheet.screenContainer}>
          <View style={styles.nameAgeContainer}>
            <Text style={fontStyles.headerMedium}>{capitalize('john')}</Text>
            <Text style={{color: Color.Black[80]}}>28 years old</Text>
          </View>

          <View style={styles.timeContainer}>
            <LofftIcon name="calendar" size={25} color={Color.Black[30]} />
            <Text style={[fontStyles.headerSmall, styles.calendarText]}>
              From: 25/12/22 - unlimited
            </Text>
          </View>

          <View style={styles.languageContainer}>
            <LofftIcon name="translate" size={25} color={Color.Black[30]} />
            <Text style={[fontStyles.headerSmall, styles.translateText]}>
              English, German, Arabic
            </Text>
          </View>

          <View style={styles.descriptionContainer}>
            <Text style={{color: Color.Black[80]}}>
              {truncatedDescription}
              {!descriptionExpanded && isTruncated && '...'}
            </Text>

            {isTruncated && (
              <Collapsible collapsed={!descriptionExpanded} duration={300}>
                <Text style={{color: Color.Black[80]}}>
                  {hiddenDescription}
                </Text>
              </Collapsible>
            )}

            {profile.profileDetails.description &&
              profile.profileDetails.description.length >
                maxDescriptionLength && (
                <CoreButton
                  value={descriptionExpanded ? 'Read Less' : 'Read More'}
                  style={styles.readMoreButton}
                  textStyle={[
                    fontStyles.headerSmall,
                    {color: Color.Lavendar[100]},
                  ]}
                  invert
                  disabled={false}
                  onPress={toggleDescriptionExpand}
                />
              )}
          </View>

          {/* Match with you */}
          <View style={styles.chipsContainer}>
            <Text style={fontStyles.headerSmall}>Match with you</Text>

            <Pressable
              onPress={toggleMatchExpand}
              style={styles.seeMoreContainer}>
              <Text style={[fontStyles.bodySmall, styles.seeMore]}>
                {matchExpand ? 'See less' : 'See more'}
              </Text>
              {matchExpand ? (
                <>
                  <LofftIcon
                    name="chevron-up"
                    size={25}
                    color={Color.Blue[100]}
                  />
                </>
              ) : (
                <>
                  <LofftIcon
                    name="chevron-down"
                    size={25}
                    color={Color.Blue[100]}
                  />
                </>
              )}
            </Pressable>
          </View>

          <View style={styles.matchWithYouContainer}>
            <Chips
              tags={positiveCharTags}
              features={false}
              emoji
              expand={matchExpand}
            />
          </View>

          {/* Other */}
          <View style={styles.chipsContainer}>
            <Text style={fontStyles.headerSmall}>Other</Text>
            <Pressable
              onPress={toggleOtherExpand}
              style={styles.seeMoreContainer}>
              <Text style={[fontStyles.bodySmall, styles.seeMore]}>
                {otherExpand ? 'See less' : 'See more'}
              </Text>
              {otherExpand ? (
                <>
                  <LofftIcon
                    name="chevron-up"
                    size={25}
                    color={Color.Blue[100]}
                  />
                </>
              ) : (
                <>
                  <LofftIcon
                    name="chevron-down"
                    size={25}
                    color={Color.Blue[100]}
                  />
                </>
              )}
            </Pressable>
          </View>

          <View style={styles.matchWithYouContainer}>
            <Chips
              tags={negativeCharTags}
              features={false}
              emoji
              expand={otherExpand}
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.centerButtonContainer}>
        <CoreButton
          value={application?.round2 ? 'Selected !' : '+ Add to selection'}
          style={[
            styles.selectedButton,
            application?.round2 && styles.selected,
          ]}
          onPress={() => selectApplication(applicationId)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  nameAgeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: size(10),
    paddingTop: size(10),
  },
  languageContainer: {
    paddingBottom: size(20),
    flexDirection: 'row',
  },
  centerButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    paddingTop: size(20),
    paddingBottom: size(10),
  },
  descriptionContainer: {
    paddingHorizontal: size(10),
  },
  descriptionText: {
    color: Color.Black[80],
  },
  chipsContainer: {
    marginTop: size(23),
    marginBottom: size(5),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  matchWithYouContainer: {
    marginTop: size(10),
  },
  seeMoreContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  seeMore: {
    color: Color.Blue[100],
    alignSelf: 'flex-end',
    marginRight: size(10),
    marginBottom: size(10),
  },
  selectedButton: {
    width: '94%',
    margin: 0,
  },
  selected: {
    backgroundColor: Color.Mint[100],
    borderColor: Color.Mint[100],
  },
  calendarText: {color: Color.Black[100], paddingLeft: size(10)},
  translateText: {color: Color.Black[100], paddingLeft: size(10)},

  readMoreButton: {
    marginTop: size(20),
  },
});

export default ApplicantProfileScreen;
