import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import {imageArray} from '../imageArray';
import LinearGradient from 'react-native-linear-gradient';
import RangeSlider from 'rn-range-slider';

import VerticalPurpleGradBackground from '../components/VerticalPurpleGradBackground';
import H from '../components/H';
import P from '../components/P';
import TimeSelectBtn from '../components/TimeSelectBtn';

import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';

function SingleMeditationScreen({
  selectedMeditation,
  navigation,
  selectedTime,
  setSelectedTime,
}) {
  const meditationNumber = selectedMeditation.id + 1;

  useEffect(() => {
    analytics().logEvent('Meditation_Selected_Event', {
      Meditation_Number: meditationNumber,
    });

    crashlytics().log('SingleMeditationScreen mounted');
  }, []);

  const medEssays = [
    require('../meditations/1'),
    require('../meditations/2'),
    require('../meditations/3'),
    require('../meditations/4'),
    require('../meditations/5'),
    require('../meditations/6'),
    require('../meditations/7'),
    require('../meditations/8'),
    require('../meditations/9'),
    require('../meditations/10'),
    require('../meditations/11'),
    require('../meditations/12'),
    require('../meditations/13'),
    require('../meditations/14'),
    require('../meditations/15'),
    require('../meditations/16'),
    require('../meditations/17'),
    require('../meditations/18'),
    require('../meditations/19'),
    require('../meditations/20'),
    require('../meditations/21'),
    require('../meditations/22'),
    require('../meditations/23'),
    require('../meditations/24'),
    require('../meditations/25'),
    require('../meditations/26'),
    require('../meditations/27'),
    require('../meditations/28'),
    require('../meditations/29'),
    require('../meditations/30'),
    require('../meditations/31'),
    require('../meditations/32'),
    require('../meditations/33'),
    require('../meditations/34'),
    require('../meditations/35'),
    require('../meditations/36'),
    require('../meditations/37'),
    require('../meditations/38'),
    require('../meditations/39'),
    require('../meditations/40'),
    require('../meditations/41'),
    require('../meditations/42'),
    require('../meditations/43'),
    require('../meditations/44'),
    require('../meditations/45'),
    require('../meditations/46'),
    require('../meditations/47'),
    require('../meditations/48'),
    require('../meditations/49'),
    require('../meditations/50'),
    require('../meditations/51'),
    require('../meditations/52'),
    require('../meditations/53'),
    require('../meditations/54'),
    require('../meditations/55'),
    require('../meditations/56'),
    require('../meditations/57'),
    require('../meditations/58'),
    require('../meditations/59'),
    require('../meditations/60'),
    require('../meditations/61'),
    require('../meditations/62'),
    require('../meditations/63'),
    require('../meditations/64'),
    require('../meditations/65'),
  ];

  const selectedMedEssay = medEssays[selectedMeditation.id].default;

  const timeoptionsRow1 = [15, 20, 25, 30, 35];
  const timeoptionsRow2 = [40, 45, 50, 55, 60];
  const timeoptionsRow3 = [65, 70, 75, 80, 85];

  return (
    <VerticalPurpleGradBackground style={{flex: 1}}>
      <ScrollView>
        <View style={styles.imgContainer}>
          <Image
            source={imageArray[selectedMeditation.id].image}
            style={styles.img}
          />
        </View>
        <View style={styles.contentContainer}>
          <H>{selectedMeditation.title}</H>
          <Text style={styles.quoteText}>{selectedMedEssay.quote.text}</Text>
          <Text style={styles.quoteAuthor}>
            - {selectedMedEssay.quote.author}
          </Text>

          {selectedMedEssay.paragraphs.map((par) => {
            return <P key={Math.random()}>{par}</P>;
          })}
        </View>

        {selectedMeditation.id < 60 ? (
          <View style={{marginTop: 16}}>
            <View style={styles.timeBtnsContainer}>
              <TimeSelectBtn
                title="15"
                onPress={() => {
                  setSelectedTime(15);
                  crashlytics().log('15 mins pressed');
                }}
                selectedTime={selectedTime}
                extraStyles={{
                  borderTopLeftRadius: 7,
                  borderBottomLeftRadius: 7,
                }}
              />

              <TimeSelectBtn
                title="20"
                onPress={() => {
                  setSelectedTime(20);
                  crashlytics().log('20 mins pressed');
                }}
                selectedTime={selectedTime}
              />

              <TimeSelectBtn
                title="25"
                onPress={() => {
                  setSelectedTime(25);
                  crashlytics().log('25 mins pressed');
                }}
                selectedTime={selectedTime}
              />
              <TimeSelectBtn
                title="30"
                onPress={() => {
                  setSelectedTime(30);
                  crashlytics().log('30 mins pressed');
                }}
                selectedTime={selectedTime}
              />

              <TimeSelectBtn
                title="35"
                onPress={() => {
                  setSelectedTime(35);
                  crashlytics().log('35 mins pressed');
                }}
                selectedTime={selectedTime}
                extraStyles={{
                  borderTopRightRadius: 7,
                  borderBottomRightRadius: 7,
                }}
              />
            </View>
            <View style={styles.timeBtnsContainer}>
              <TimeSelectBtn
                title="45"
                onPress={() => {
                  setSelectedTime(45);
                  crashlytics().log('45 mins pressed');
                }}
                selectedTime={selectedTime}
                extraStyles={{
                  borderTopLeftRadius: 7,
                  borderBottomLeftRadius: 7,
                }}
              />

              <TimeSelectBtn
                title="60"
                onPress={() => {
                  setSelectedTime(60);
                  crashlytics().log('60 mins pressed');
                }}
                selectedTime={selectedTime}
              />
              <TimeSelectBtn
                title="75"
                onPress={() => {
                  setSelectedTime(75);
                  crashlytics().log('75 mins pressed');
                }}
                selectedTime={selectedTime}
              />

              <TimeSelectBtn
                title="90"
                onPress={() => {
                  setSelectedTime(90);
                  crashlytics().log('90 mins pressed');
                }}
                selectedTime={selectedTime}
              />

              <TimeSelectBtn
                title="105"
                onPress={() => {
                  setSelectedTime(105);
                  crashlytics().log('105 mins pressed');
                }}
                selectedTime={selectedTime}
                extraStyles={{
                  borderTopRightRadius: 7,
                  borderBottomRightRadius: 7,
                }}
              />
            </View>
          </View>
        ) : (
          <Text style={styles.taoTime}>{selectedTime} mins...</Text>
        )}

        {/* <View style={styles.rangeSliderWrapper}>
          {selectedMeditation.id < 60 ? (
            <RangeSlider
              style={{width: 0.85 * Dimensions.get('window').width, height: 80}}
              gravity={'center'}
              min={5}
              max={120}
              step={5}
              initialLowValue={selectedTime}
              selectionColor="#3df"
              blankColor="#f618"
              rangeEnabled={false}
              lineWidth={6}
              thumbRadius={22}
              thumbBorderWidth={1}
              labelPadding={8}
              textSize={18}
              labelBorderWidth={1}
              labelTailHeight={10}
              labelGapHeight={6}
              onValueChanged={(low, high, fromUser) => {
                setSelectedTime(low);
              }}
            />
          ) : (
            <Text style={styles.taoTime}>{selectedTime} mins...</Text>
          )}
        </View>

        <Text style={styles.timeText}>{selectedTime} mins...</Text> */}

        <TouchableOpacity
          onPress={() => {
            analytics().logEvent('Begin_Meditation_Event', {
              Selected_Time: selectedTime,
              Meditation_Number: selectedMeditation.id + 1,
            });
            crashlytics().log('Begin pressed');
            navigation.navigate('Timer');
          }}
          style={styles.beginBtn}>
          <Text style={styles.begin}>BEGIN</Text>
        </TouchableOpacity>
      </ScrollView>
    </VerticalPurpleGradBackground>
  );
}

const styles = StyleSheet.create({
  imgContainer: {
    alignItems: 'center',
    backgroundColor: '#100B33',
  },
  img: {
    width: Dimensions.get('window').width,
    height: 225,
  },
  contentContainer: {
    marginLeft: 16,
    marginRight: 16,
  },
  quoteText: {
    fontSize: 21,
    color: '#ABCFED',
    lineHeight: 25,
    marginBottom: 4,
    fontStyle: 'italic',
  },
  quoteAuthor: {
    fontSize: 21,
    color: '#ABCFED',
    lineHeight: 25,
    marginBottom: 24,
    alignSelf: 'flex-end',
  },
  timeBtnsContainer: {
    flexDirection: 'row',
    marginRight: 16,
    marginLeft: 16,
    margin: 4,
  },
  rangeSliderWrapper: {
    alignItems: 'center',
    marginBottom: 32,
  },
  timeText: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Merienda-Regular',
    textAlign: 'center',
  },
  taoTime: {
    textAlign: 'center',
    color: '#fff',
    fontFamily: 'Merienda-Regular',
    fontSize: 22,
  },
  beginBtn: {
    backgroundColor: '#65A7DD',
    height: 55,
    margin: 16,
    marginTop: 24,
    marginBottom: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  begin: {
    color: 'white',
    fontSize: 25,
    fontFamily: 'Merienda-Bold',
  },
});

export default SingleMeditationScreen;
