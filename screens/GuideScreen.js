import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

// Get yesterday's date
let today = new Date();
let yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);
yesterday = yesterday.toDateString();

function GuideScreen() {
  const [dateLastCompleted, setDateLastCompleted] = useState('');

  // Getting the local current time
  // let [hour, minute, second] = new Date()
  //   .toLocaleTimeString()
  //   .slice(0, 7)
  //   .split(':');

  // Get data stored in asyncStorage
  const getData = async (storageKey) => {
    try {
      const jsonValue = await AsyncStorage.getItem(storageKey);
      // alert(jsonValue);
      return jsonValue != null ? jsonValue : null;
    } catch (e) {
      console.log('Failed when getting data from AsyncStorage :(');
    }
  };

  getData(`@date_last_completed`).then((data) => {
    if (data != null) {
      setDateLastCompleted(data.slice(1, -1));
    }
  });

  return (
    <View style={styles.screenContainer}>
      <Text style={styles.text}>
        This app does not do the meditating for you, there are no voiceovers or
        sounds to listen to. No distractions from your own thoughts.
      </Text>
      <Text style={styles.text}>
        The aim of this app is to guide you towards self understanding and
        discovering what meditation is for yourself. To give you a useful tool
        for dealing with a busy mind in the age of information overload.
      </Text>
      <Text style={styles.text}>
        There are 60 meditations in total, 1 per day. You can choose to do 15,
        30, 45, or 60 mins. The following day is unlocked after completing the
        current day's meditation.
      </Text>
      <Text style={styles.text}>
        Complete all 60 days with 1 hour to unlock the bonus meditation series.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: '#0e0a2e',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 21,
    margin: 10,
  },
});

export default GuideScreen;
