/* React Stuff */
import React, {useState} from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';

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
import LoadingComponent from 'components/LoadingAndNotFound/LoadingComponent';
import NotFoundComponent from 'components/LoadingAndNotFound/NotFoundComponent';
import Collapsible from 'react-native-collapsible';
import SeeMoreButton from 'components/buttons/SeeMoreButton';

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
    state.applications.applicationsRound2.find(app => app.id === applicationId),
  );
  const {data: user, isLoading, error} = useGetSpecificUserQuery(applicantId);
  console.log('user Data in applicant user screen', user);

  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const [matchExpand, setMatchExpand] = useState(false);
  const [otherExpand, setOtherExpand] = useState(false);

  if (!advert || !user) {
    return null;
  }

  const featuresTags = tagSorter(
    user.filter ?? [],
    advert?.flat.features ?? [],
  );

  const positiveFeaturesTags = featuresTags.positiveTags;
  const negativeFeaturesTags = featuresTags.negativeTags;

  const charTags = tagSorter(
    user.profile.characteristics ?? [],
    advert.flat.characteristics,
  );
  const positiveCharTags = charTags.positiveTags;
  const negativeCharTags = charTags.negativeTags;

  // const positiveFeaturesTags = matchMaker(
  //   user.filter ?? [],
  //   advert?.flat.features ?? [],
  // )[0];
  // const negativeFeaturesTags = matchMaker(
  //   user.filter ?? [],
  //   advert?.flat.features ?? [],
  // )[1];

  // const positiveCharTags = matchMaker(
  //   user.profile.characteristics ?? [],
  //   advert.flat.characteristics,
  // )[0];
  // const negativeCharTags = matchMaker(
  //   user.profile.characteristics ?? [],
  //   advert.flat.characteristics,
  // )[1];

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
    user.profile.description,
    maxDescriptionLength,
  );
  const hiddenDescription = user.profile.description.slice(
    truncatedDescription.length,
  );
  const isTruncated =
    user.profile.description?.length > truncatedDescription.length;

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (error) {
    return <NotFoundComponent message="We could not find the applicant" />;
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
            <Text style={fontStyles.headerMedium}>
              {user.profile.firstName} {user.profile.lastName}
            </Text>
            <Text style={[fontStyles.bodyExtraSmall, {color: Color.Black[80]}]}>
              {user.profile.age} years old
            </Text>
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

            {user.profile?.description &&
              user.profile?.description.length > maxDescriptionLength && (
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

            <SeeMoreButton
              collapsed={matchExpand}
              toggleExpand={toggleMatchExpand}
            />
          </View>

          <View style={styles.matchWithYouContainer}>
            <Chips
              tags={positiveFeaturesTags}
              features={true}
              emoji
              expand={matchExpand}
            />
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
            <SeeMoreButton
              collapsed={otherExpand}
              toggleExpand={toggleOtherExpand}
            />
          </View>

          <View style={styles.matchWithYouContainer}>
            <Chips
              tags={negativeFeaturesTags}
              features={true}
              emoji
              expand={matchExpand}
            />
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
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
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
