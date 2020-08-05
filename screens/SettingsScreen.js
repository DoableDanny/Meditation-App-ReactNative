import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {getData, storeData} from '../functionsAndQuotes/asyncStorageFunctions';
import {removeValue} from '../functionsAndQuotes/asyncStorageFunctions';
import AsyncStorage from '@react-native-community/async-storage';

function SettingsScreen({
  meditations,
  unlockMeditation,
  streak,
  setStreak,
  longestStreak,
  setLongestStreak,
  totalMeditationTime,
  setTotalMeditationTime,
  totalMeditationsCompleted,
  setTotalMeditationsCompleted,
}) {
  const [dateLastCompleted, setDateLastCompleted] = useState('');

  const resetStats = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      let filteredKeys = keys.filter(
        (item) => item != '@meditations_completed',
      );
      await AsyncStorage.multiRemove(filteredKeys);
    } catch (error) {
      console.error('Error clearing up app data.');
    }
  };

  // Define today's and yesterday's date
  let today = new Date();
  let yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  today = today.toDateString();
  yesterday = yesterday.toDateString();

  // Get all the AsyncStor data and update the UI upon component mount
  useEffect(() => {
    getData(`@meditations_completed`).then((data) =>
      data != null ? unlockMeditation(JSON.parse(data)) : null,
    );
    getData(`@streak_key`).then((data) => {
      data != null ? setStreak(parseInt(data)) : setStreak(0);
    });
    getData(`@longest_streak_key`).then((data) => {
      data != null ? setLongestStreak(parseInt(data)) : setLongestStreak(0);
    });
    getData(`@date_last_completed`).then((data) => {
      data ? setDateLastCompleted(data.slice(1, -1)) : setDateLastCompleted('');
      if (data != null) {
        if (data.slice(1, -1) == today || data.slice(1, -1) == yesterday) {
          return;
        } else {
          setStreak(0);
          storeData('@streak_key', 0);
        }
      }
    });

    getData(`@hours_meditated`).then((data) => {
      console.log(data, 'hi');
      data != null
        ? setTotalMeditationTime(parseInt(data))
        : setTotalMeditationTime(0);
    });
    getData(`@sessions_completed`).then((data) => {
      data != null
        ? setTotalMeditationsCompleted(parseInt(data))
        : setTotalMeditationsCompleted(0);
    });
  }, []);

  // This function is called from alertAndDelete so can update meditationState
  const deleteMeditationsProgress = (messageFocus) => {
    removeValue(`@meditations_completed`, messageFocus);
    let meditationsCopy = [...meditations];
    meditationsCopy.forEach((med) => {
      med.id == 0 ? (med.locked = false) : (med.locked = true);
    });
    unlockMeditation(meditationsCopy);
  };

  const alertAndDelete = (setState, streakKey, title) => {
    let messageFocus = title;
    Alert.alert(
      'You Absolutely Sure?',
      `This will permanently delete your ${messageFocus}.`,
      [
        {
          text: 'Yes',
          onPress: () => {
            if (streakKey == `@meditations_completed`) {
              deleteMeditationsProgress(messageFocus);
            } else {
              removeValue(streakKey, messageFocus);
              setState(0);
            }
            streakKey == `@streak_key`
              ? removeValue(`@date_last_completed`)
              : null;
          },
          style: 'destructive',
        },
        {text: 'No', onPress: () => console.log('No pressed')},
      ],
    );
  };

  let averageSession = (
    totalMeditationTime / totalMeditationsCompleted
  ).toPrecision(2);

  return (
    <View style={styles.screenContainer}>
      <View style={{margin: 25}}>
        <Text style={styles.key}>
          Hours Meditated:{' '}
          <Text style={styles.value}>
            {totalMeditationTime / 60}{' '}
            {totalMeditationTime == 1 ? 'hour' : 'hours'}
          </Text>
        </Text>
        <Text style={styles.key}>
          Sessions:{' '}
          <Text style={styles.value}>{totalMeditationsCompleted} </Text>
        </Text>
        <Text style={styles.key}>
          Average Session:{' '}
          <Text style={styles.value}>
            {averageSession ? averageSession : 0} mins
          </Text>
        </Text>
      </View>
      <Text style={styles.key}>
        Streak:{' '}
        <Text style={styles.value}>
          {streak} {streak == 1 ? 'day' : 'days'}
        </Text>
      </Text>
      <Text style={styles.key}>
        Longest Streak:{' '}
        <Text style={styles.value}>
          {' '}
          {longestStreak} {longestStreak == 1 ? 'day' : 'days'}
        </Text>
      </Text>

      <Text style={styles.key}>
        Last Meditation: <Text style={styles.value}>{dateLastCompleted}</Text>
      </Text>
      {/* <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => {
          alertAndDelete(setStreak, `@streak_key`, 'day streak');
        }}>
        <Text style={styles.buttonText}>Delete Streak</Text>
      </TouchableOpacity> */}
      {/* <TouchableOpacity
        style={styles.deleteButton}
        onPress={() =>
          alertAndDelete(
            setLongestStreak,
            `@longest_streak_key`,
            'longest streak',
          )
        }>
        <Text style={styles.buttonText}>Delete Longest Streak</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() =>
          alertAndDelete(
            setStreak,
            `@meditations_completed`,
            'meditation progress',
          )
        }>
        <Text style={styles.buttonText}>Delete Meditation Progress</Text>
      </TouchableOpacity> */}

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => resetStats()}>
        <Text style={styles.buttonText}>RESET STATS</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() =>
          alertAndDelete(
            setStreak,
            `@meditations_completed`,
            'meditation progress',
          )
        }>
        <Text style={styles.buttonText}>RE-LOCK MEDITATIONS</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: '#0e0a2e',
    flex: 1,
    padding: 10,
  },
  key: {
    color: 'rgb(104,186,223)',
    fontSize: 22,
    textAlign: 'center',
    margin: 8,
  },
  value: {
    color: '#fff',
  },
  text: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 8,
  },
  deleteButton: {
    backgroundColor: 'black',
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderColor: 'crimson',
    padding: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 22,
    textAlign: 'center',
  },
});

export default SettingsScreen;
