import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {getData, storeData} from '../functionsAndQuotes/asyncStorageFunctions';

function StatsScreen({
  unlockMeditation,
  streak,
  setStreak,
  longestStreak,
  setLongestStreak,
  totalMeditationTime,
  setTotalMeditationTime,
  totalMeditationsCompleted,
  setTotalMeditationsCompleted,
  totalStars,
  setTotalStars,
}) {
  const [dateLastCompleted, setDateLastCompleted] = useState('-');
  const [averageSessionTime, setAverageSessionTime] = useState(0);

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
      data
        ? setDateLastCompleted(data.slice(1, -1))
        : setDateLastCompleted('-');
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
      data != null
        ? setTotalMeditationTime(parseInt(data))
        : setTotalMeditationTime(0);
    });
    getData(`@sessions_completed`).then((data) => {
      data != null
        ? setTotalMeditationsCompleted(parseInt(data))
        : setTotalMeditationsCompleted(0);
    });
    getData(`@total_stars`).then((data) => {
      data != null ? setTotalStars(data) : setTotalStars(0);
    });

    // Calc averageSession time in minutes
    if (totalMeditationTime && totalMeditationsCompleted) {
      setAverageSessionTime(
        (totalMeditationTime / totalMeditationsCompleted).toPrecision(2),
      );
    }
  }, []);

  return (
    <View style={styles.screenContainer}>
      <Text style={{...styles.key, color: 'gold'}}>
        <Icon name="star" size={25} style={{color: 'gold'}} />
        Stars: <Text style={styles.value}>{totalStars} / 195</Text>
      </Text>

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
            {averageSessionTime ? averageSessionTime : 0} mins
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

      <IonIcon
        name="stats-chart-outline"
        size={70}
        style={styles.meditationIcon}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: '#0e0a2e',
    flex: 1,
    paddingTop: 35,
  },
  key: {
    color: 'rgb(104,186,223)',
    fontSize: 22,
    textAlign: 'center',
    margin: 7,
  },
  value: {
    color: '#fff',
  },
  meditationIcon: {
    position: 'absolute',
    bottom: 30,
    left: 0.43 * Dimensions.get('window').width,
    color: '#3CB371',
  },
});

export default StatsScreen;
