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
        This is not your usual meditation app. This app does not do the
        meditating for you, there are no voiceovers or sounds to listen to. No
        distractions from your own thoughts.
      </Text>
      <Text style={styles.text}>
        The aim of this app is to guide you towards self understanding and to
        discover what meditation is for yourself.
      </Text>
      <Text style={styles.text}>
        There are 60 meditations in total, 1 per day. Each one lasts an hour.
        The following day is unlocked after completing the current day's full
        hour.
      </Text>
      <Text style={styles.text}>
        Nobody else knows what they are doing either. So you may as well follow
        your own path.
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
    fontSize: 18,
    margin: 10,
  },
});

export default GuideScreen;
