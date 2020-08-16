import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {getData, storeData} from '../functionsAndQuotes/asyncStorageFunctions';
import LinearGradient from 'react-native-linear-gradient';

function StatsScreen({
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
      var dataMinutes = data != null ? data : 0;
      setTotalMeditationTime(parseInt(dataMinutes));

      getData(`@sessions_completed`).then((data) => {
        var dataSessionsCompleted = data != null ? data : 0;
        setTotalMeditationsCompleted(parseInt(dataSessionsCompleted));

        setAverageSessionTime(
          (dataMinutes / dataSessionsCompleted).toPrecision(2),
        );
      });
    });

    getData(`@total_stars`).then((data) => {
      data != null ? setTotalStars(data) : setTotalStars(0);
    });

    // Calc averageSession time in minutes
    // if (totalMeditationTime && totalMeditationsCompleted) {
    //   setAverageSessionTime(
    //     (totalMeditationTime / totalMeditationsCompleted).toPrecision(2),
    //   );
    // }
  }, []);

  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={['#271C7E', '#1F1663', '#171049']}
      style={styles.screenContainer}>
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

      <View style={{alignItems: 'center', marginTop: 20}}>
        <IonIcon name="md-trophy-sharp" size={30} style={{color: 'gold'}} />
        {totalStars == 195 ? (
          <Text style={styles.award}>ZEN MASTER</Text>
        ) : null}
        {meditations[59].completionTime > 0 ? (
          <Text style={styles.award}>NAVAL PEACE PRIZE</Text>
        ) : null}
      </View>
      <View style={styles.iconWrapper}>
        <IonIcon
          name="stats-chart-outline"
          size={70}
          style={styles.meditationIcon}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    paddingTop: 35,
  },
  key: {
    color: '#BBD8F0',
    fontSize: 22,
    textAlign: 'center',
    margin: 7,
  },
  value: {
    color: '#fff',
  },
  award: {
    color: 'gold',
    fontSize: 22,
    zIndex: 1,
  },
  iconWrapper: {
    alignItems: 'center',
    position: 'relative',
    flex: 1,
  },
  meditationIcon: {
    position: 'absolute',
    bottom: 20,
    // left: 0.43 * Dimensions.get('window').width,
    color: '#2775B4',
  },
});

export default StatsScreen;
