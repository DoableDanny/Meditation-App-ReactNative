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

// ADD SELECTED MED EVENT

function SingleMeditationScreen({
  selectedMeditation,
  navigation,
  selectedTime,
  setSelectedTime,
}) {
  useEffect(() => {
    analytics().logEvent('Meditation_Selected_Event', {
      Meditation_Number: selectedMeditation.id + 1,
    });

    crashlytics().log('HomeScreen mounted');
  }, []);

  return (
    <ScrollView>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={['#271C7E', '#1F1663', '#171049']}
        style={styles.pageContainer}>
        <View style={styles.imgContainer}>
          <Image
            source={imageArray[selectedMeditation.id].image}
            style={styles.img}
          />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{selectedMeditation.title}</Text>
          <Text style={styles.paragraph}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            magna orci, pretium eget porta convallis, viverra in enim.
          </Text>
          <Text style={styles.paragraph}>
            Mauris id massa at magna fermentum luctus. Sed vehicula nisi vel dui
            tempor, nec pulvinar dui ultrices. Fusce velit nulla, scelerisque
            vitae urna sed, cursus finibus odio.
          </Text>
          <Text style={styles.paragraph}>
            Sed at tincidunt ligula. Aenean facilisis aliquam tortor, at pretium
            elit aliquet eget. Proin quam justo, viverra pretium tincidunt id,
            dignissim a velit.
          </Text>
          <Text style={styles.paragraph}>
            Sed at tincidunt ligula. Aenean facilisis aliquam tortor, at pretium
            elit aliquet eget. Proin quam justo, viverra pretium tincidunt id,
            dignissim a velit.
          </Text>
          <Text style={styles.paragraph}>
            Sed at tincidunt ligula. Aenean facilisis aliquam tortor, at pretium
            elit aliquet eget. Proin quam justo, viverra pretium tincidunt id,
            dignissim a velit.
          </Text>
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
              selected_Time: selectedTime,
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
      </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    backgroundColor: '#0e0a2e',
    flexDirection: 'column',
  },
  imgContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
    height: 200,
    position: 'relative',
  },
  img: {
    height: 210,
    width: Dimensions.get('window').width,
  },
  contentContainer: {
    marginLeft: 12,
    marginRight: 12,
  },
  title: {
    fontSize: 35,
    color: '#8ABCE5',
    margin: 10,
    marginTop: 16,
  },
  paragraph: {
    fontSize: 20,
    color: '#F0F7FC',
    margin: 8,
    lineHeight: 25,
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
  },
});

export default SingleMeditationScreen;
