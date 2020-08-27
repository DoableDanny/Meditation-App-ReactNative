import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import FA5Icon from 'react-native-vector-icons/FontAwesome5';
import {getData, storeData} from '../functionsAndQuotes/asyncStorageFunctions';
import HorizPurpleGrad from '../components/HorizPurpleGrad';
import crashlytics from '@react-native-firebase/crashlytics';
import {ScrollView} from 'react-native-gesture-handler';

function StatsScreen({
  meditations,
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

  useEffect(() => {
    crashlytics().log('StatsScreen mounted');
  }, []);

  // Get all the AsyncStor data and update the UI upon component mount
  useEffect(() => {
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

        if (dataMinutes && dataSessionsCompleted) {
          setAverageSessionTime(
            (dataMinutes / dataSessionsCompleted).toPrecision(2),
          );
        }
      });
    });

    getData(`@total_stars`).then((data) => {
      data != null ? setTotalStars(data) : setTotalStars(0);
    });
  }, []);

  const purpleGrad = ['#2F2198', '#271C7E', '#1F1663'];

  return (
    <HorizPurpleGrad colors={purpleGrad}>
      <ScrollView>
        <View style={styles.allStatsWrapper}>
          <Text
            style={{
              ...styles.key,
              color: 'gold',
              marginTop: 32,
              marginBottom: 25,
            }}>
            <Icon name="star" size={28} style={{color: 'gold'}} />
            Stars: <Text style={styles.value}>{totalStars} / 195</Text>
          </Text>

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
          <Text style={{...styles.key, marginBottom: 28}}>
            Average Session:{' '}
            <Text style={styles.value}>
              {averageSessionTime ? averageSessionTime : 0} mins
            </Text>
          </Text>

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
            Last Meditation:{' '}
            <Text style={styles.value}>{dateLastCompleted}</Text>
          </Text>

          <View style={styles.awardsWrapper}>
            <View style={styles.rowAndCenter}>
              <IonIcon
                name="md-trophy-sharp"
                size={28}
                style={{color: 'gold'}}
              />
              <Text style={{...styles.key, color: 'gold'}}>Awards:</Text>
            </View>
            {longestStreak >= 3 ? (
              <View style={styles.rowAndCenter}>
                <Icon name="bowling" size={25} style={styles.awardIcon} />
                <Text style={styles.value}>Turkey</Text>
              </View>
            ) : null}
            {longestStreak >= 7 ? (
              <View style={styles.rowAndCenter}>
                <Icon
                  name="numeric-7-box-multiple"
                  size={25}
                  style={styles.awardIcon}
                />
                <Text style={styles.value}>Se7en</Text>
              </View>
            ) : null}
            {longestStreak >= 14 ? (
              <View style={styles.rowAndCenter}>
                <Icon name="shield-sun" size={25} style={styles.awardIcon} />
                <Text style={styles.value}>Fortnight</Text>
              </View>
            ) : null}
            {longestStreak >= 30 ? (
              <View style={styles.rowAndCenter}>
                <FA5Icon name="brain" size={25} style={styles.awardIcon} />
                <Text style={styles.value}>The Stoic Mind</Text>
              </View>
            ) : null}

            {meditations[59].completionTime > 0 ? (
              <Text style={styles.award}>NAVAL PEACE PRIZE</Text>
            ) : null}
            {totalStars == 195 ? (
              <Text style={styles.award}>ZEN MASTER</Text>
            ) : null}
          </View>
        </View>

        <View style={styles.iconWrapper}>
          <IonIcon
            name="stats-chart-outline"
            size={70}
            style={styles.bottomIcon}
          />
        </View>
      </ScrollView>
    </HorizPurpleGrad>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  allStatsWrapper: {
    alignSelf: 'center',
    alignItems: 'flex-start',
  },
  key: {
    color: '#BBD8F0',
    fontSize: 22,
    textAlign: 'center',
    margin: 7,
  },
  value: {
    color: '#fff',
    fontSize: 22,
  },
  awardsWrapper: {
    marginTop: 24,
    alignSelf: 'center',
  },
  award: {
    color: 'gold',
    fontSize: 22,
    zIndex: 1,
  },
  iconWrapper: {
    alignItems: 'center',
    marginTop: 48,
    marginBottom: 16,
  },
  rowAndCenter: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  awardIcon: {
    color: 'rgba(255,255,255,0.9)',
    marginRight: 2,
  },
  bottomIcon: {
    color: '#2775B4',
  },
});

export default StatsScreen;
