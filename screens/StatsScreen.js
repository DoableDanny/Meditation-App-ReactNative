import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {getData, storeData} from '../functionsAndQuotes/asyncStorageFunctions';
import HorizPurpleGrad from '../components/HorizPurpleGrad';
import TaoBonusBtn from '../components/TaoBonusBtn';
import LockedTaoMed from '../components/LockedTaoMed';
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
  setSelectedMeditation,
  setSelectedTime,
  navigation,
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
              {(totalMeditationTime / 60).toPrecision(2)}{' '}
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

          <Text style={{...styles.key, color: 'gold'}}>
            <Icon name="fire" size={30} style={styles.goldIcon} />
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
        </View>

        <View style={styles.bonusTaoWrapper}>
          <View style={styles.bonusTaoTitleWrapper}>
            <Text style={{...styles.key, color: 'gold'}}>
              Bonus Tao Meditations{' '}
              <Icon name="yin-yang" size={28} style={{color: 'gold'}} /> :
            </Text>
          </View>
          {meditations[60].locked == false ? (
            <TaoBonusBtn
              taoMeditation={meditations[60]}
              icon="fire"
              num="7"
              onPress={() => {
                crashlytics().log('Tao 1 pressed');
                setSelectedTime(60);
                setSelectedMeditation(meditations[60]);
                navigation.navigate('Meditation');
              }}
            />
          ) : (
            <LockedTaoMed icon="fire" num="7" />
          )}
          {meditations[61].locked == false ? (
            <TaoBonusBtn
              taoMeditation={meditations[61]}
              icon="fire"
              num="14"
              onPress={() => {
                crashlytics().log('Tao 2 pressed');
                setSelectedTime(75);
                setSelectedMeditation(meditations[61]);
                navigation.navigate('Meditation');
              }}
            />
          ) : (
            <LockedTaoMed icon="fire" num="14" />
          )}
          {meditations[62].locked == false ? (
            <TaoBonusBtn
              taoMeditation={meditations[62]}
              icon="fire"
              num="30"
              onPress={() => {
                crashlytics().log('Tao 3 pressed');
                setSelectedTime(90);
                setSelectedMeditation(meditations[62]);
                navigation.navigate('Meditation');
              }}
            />
          ) : (
            <LockedTaoMed icon="fire" num="30" />
          )}
          {meditations[63].locked == false ? (
            <TaoBonusBtn
              taoMeditation={meditations[63]}
              icon="star"
              num="100"
              onPress={() => {
                crashlytics().log('Tao 4 pressed');
                setSelectedTime(105);
                setSelectedMeditation(meditations[63]);
                navigation.navigate('Meditation');
              }}
            />
          ) : (
            <LockedTaoMed icon="star" num="100" />
          )}
          {meditations[64].locked == false ? (
            <TaoBonusBtn
              taoMeditation={meditations[64]}
              icon="star"
              num="180"
              onPress={() => {
                crashlytics().log('Tao 5 pressed');
                setSelectedTime(120);
                setSelectedMeditation(meditations[64]);
                navigation.navigate('Meditation');
              }}
            />
          ) : (
            <LockedTaoMed icon="star" num="180" />
          )}
          {/* {meditations[59].completionTime > 0 ? (
            <Text style={styles.award}>NAVAL PEACE PRIZE</Text>
          ) : null}
          {totalStars == 195 ? (
            <Text style={styles.award}>ZEN MASTER</Text>
          ) : null} */}
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
    marginBottom: 8,
  },
  key: {
    color: '#BBD8F0',
    fontSize: 22,
    textAlign: 'center',
    margin: 7,
  },
  value: {
    color: 'rgba(255,255,255,0.95)',

    fontSize: 22,
  },
  bonusTaoWrapper: {
    marginTop: 24,
    // backgroundColor: '#171049',
    justifyContent: 'center',
  },
  bonusTaoTitleWrapper: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    // borderTopWidth: 2,
  },
  lockedTaoWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  lockIcon: {},
  iconWrapper: {
    alignItems: 'center',
    marginTop: 48,
    marginBottom: 16,
  },
  lockedRequirement: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 20,
  },
  rowAndCenter: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  goldIcon: {
    color: 'gold',
  },
  bottomIcon: {
    color: '#2775B4',
  },
});

export default StatsScreen;
