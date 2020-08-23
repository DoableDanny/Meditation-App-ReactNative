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

  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      colors={purpleGrad}
      style={styles.pageContainer}>
      <ScrollView>
        <View style={styles.imgContainer}>
          <Image
            source={imageArray[selectedMeditation.id].image}
            style={styles.img}
          />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{selectedMeditation.title}</Text>
          <Text style={styles.quoteText}>{selectedMedEssay.quote.text}</Text>
          <Text style={styles.quoteAuthor}>
            - {selectedMedEssay.quote.author}
          </Text>

          {console.log(selectedMedEssay.paragraphs.length)}
          {selectedMedEssay.paragraphs.map((p) => {
            return (
              <Text style={styles.paragraph} key={Math.random()}>
                {p}
              </Text>
            );
          })}
        </View>

        <View style={styles.timeBtnsContainer}>
          <TouchableOpacity
            onPress={() => {
              setSelectedTime(15);
              crashlytics().log('15 mins pressed');
            }}
            style={{
              ...styles.timeBtn,
              backgroundColor: selectedTime == 15 ? '#8ABCE5' : '#4192D5',
              borderTopLeftRadius: 7,
              borderBottomLeftRadius: 7,
            }}>
            <Text style={styles.timeText}>15</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSelectedTime(30);
              crashlytics().log('30 mins pressed');
            }}
            style={{
              ...styles.timeBtn,
              backgroundColor: selectedTime == 30 ? '#8ABCE5' : '#4192D5',
            }}>
            <Text style={styles.timeText}>30</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSelectedTime(45);
              crashlytics().log('45 mins pressed');
            }}
            style={{
              ...styles.timeBtn,
              backgroundColor: selectedTime == 45 ? '#8ABCE5' : '#4192D5',
            }}>
            <Text style={styles.timeText}>45</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSelectedTime(60);
              crashlytics().log('60 mins pressed');
            }}
            style={{
              ...styles.timeBtn,
              backgroundColor: selectedTime == 60 ? '#8ABCE5' : '#4192D5',
              borderTopRightRadius: 7,
              borderBottomRightRadius: 7,
            }}>
            <Text style={styles.timeText}>60</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => {
            analytics().logEvent('Begin_Meditation_Event', {
              Selected_Time: selectedTime,
              Meditation_Number: selectedMeditation.id + 1,
            });
            crashlytics().log('Begin pressed');
            navigation.navigate('Timer');
          }}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#8ABCE5', '#7BB4E2', '#8ABCE5']}
            style={styles.beginBtn}>
            <Text style={styles.begin}>BEGIN</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const purpleGrad = ['#2F2198', '#271C7E', '#1F1663'];

const styles = StyleSheet.create({
  pageContainer: {
    flexDirection: 'column',
    flex: 1,
  },
  imgContainer: {
    alignItems: 'center',
    backgroundColor: '#8ABCE5',
  },
  img: {
    width: Dimensions.get('window').width,
    height: 210,
  },
  contentContainer: {
    marginLeft: 12,
    marginRight: 12,
  },
  title: {
    fontSize: 30,
    color: '#8ABCE5',
    marginTop: 24,
    marginBottom: 24,
    fontFamily: 'Merienda-Bold',
  },
  quoteText: {
    fontSize: 21,
    color: '#D0F6ED',
    lineHeight: 25,
    marginBottom: 4,
    fontStyle: 'italic',
  },
  quoteAuthor: {
    fontSize: 21,
    color: '#D0F6ED',
    lineHeight: 25,
    marginBottom: 24,
    alignSelf: 'flex-end',
    fontStyle: 'italic',
  },
  paragraph: {
    fontSize: 21,
    color: '#F0F7FC',
    lineHeight: 25,
    marginBottom: 16,
  },
  timeBtnsContainer: {
    flexDirection: 'row',
    margin: 16,
  },
  timeBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: 10,
    borderRightWidth: 0.6,
  },
  timeText: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Merienda-Regular',
  },
  beginBtn: {
    height: 55,
    margin: 8,
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
