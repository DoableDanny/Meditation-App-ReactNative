import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Alert,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FA5Icon from 'react-native-vector-icons/FontAwesome5';
import BackgroundTimer from 'react-native-background-timer';
import KeepAwake from 'react-native-keep-awake';
import {navalQuotes} from '../functionsAndQuotes/quotes';
import {
  getData,
  storeData,
} from '../functionsAndQuotes/asyncStorageFunctions.js';
import TrackPlayer from 'react-native-track-player';
import trackPlayerInit from '../functionsAndQuotes/trackPlayerInit';
import VerticalPurpleGradBackground from '../components/VerticalPurpleGradBackground';
import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';
import useStars from '../customHooks/useStars';

function TimerScreen({
  selectedMeditation,
  meditations,
  unlockMeditation,
  updateCompletionTime,
  setStreak,
  setLongestStreak,
  selectedTime,
  totalMeditationTime,
  setTotalMeditationTime,
  totalMeditationsCompleted,
  setTotalMeditationsCompleted,
  navigation,
}) {
  const [seconds, setSeconds] = useState(`00`);
  const [minutes, setMinutes] = useState(selectedTime); //CHANGE THIS!!
  const [timerOn, setTimerOn] = useState(true);
  const [completionText, setCompletionText] = useState('');
  const [stopSound, setStopSound] = useState(false);

  const {
    convertCompletionTimeToStars,
    calculateNewStarTotal,
    awardBonusTaoMedForStars,
  } = useStars();

  // Stop playing sound on component unmount
  useEffect(() => {
    return () => {
      try {
        TrackPlayer.destroy();
      } catch (error) {
        console.log('Trackplayer Destroy Error:', error);
        crashlytics().recordError(error);
      }
    };
  }, []);

  useEffect(() => {
    try {
      KeepAwake.activate();
    } catch (error) {
      crashlytics().recordError(error);
    }
    crashlytics().log('TimerScreen mounted');
    return () => {
      try {
        KeepAwake.deactivate();
      } catch (error) {
        crashlytics().recordError(error);
      }
    };
  }, []);

  // Takes f(n) as arg - runs like componentDidMount
  useEffect(() => {
    // if (Platform.OS == 'ios') {
    //   BackgroundTimer.start();
    // }
    let interval = BackgroundTimer.setInterval(() => {
      // Stop the interval from calling itself if timer not on
      if (!timerOn) {
        BackgroundTimer.clearInterval(interval);
      }
      if (timerOn) {
        parseInt(seconds) < 11
          ? setSeconds(`0${parseInt(seconds) - 1}`)
          : setSeconds(`${parseInt(seconds) - 1}`);

        if (seconds === `00`) {
          parseInt(minutes) < 11
            ? setMinutes(`0${parseInt(minutes) - 1}`)
            : setMinutes(`${parseInt(minutes) - 1}`);
          setSeconds(`59`);
        }

        // When TIME UP, stop timer and unlock the next meditation
        if (minutes === `00` && seconds === `01`) {
          crashlytics().log('Time up');

          setMinutes(`00`);
          setSeconds(`00`);
          setTimerOn(false);

          setCompletionText(
            navalQuotes[Math.floor(Math.random() * navalQuotes.length)],
          );

          // Initialise track player then play zen completion sound
          try {
            trackPlayerInit().then(() => TrackPlayer.play());
          } catch (error) {
            console.log('Trackplayer init/play Error:', error);
            crashlytics().recordError(error);
            Alert.alert(
              'Whoops',
              'The time up sound failed to play. Check your settings to makesure that this app can run in the background. Alternatively, just leave the timer screen on.',
            );
          }

          // Make copy of meditaitons, check if not last meditation or 61st, and unlock next one.
          let nextMeditationId = selectedMeditation.id + 1;

          let meditationsCopy = [...meditations];

          let nextMeditation = {...meditationsCopy[nextMeditationId]};

          if (nextMeditationId < 59 && selectedTime >= 15) {
            unlockMeditation(nextMeditationId);
            meditationsCopy[nextMeditationId] = nextMeditation;
          } else if (selectedMeditation.id == 59) {
            setCompletionText(
              'You completed all 60 days, I hope you gained self-understanding and peace. You have been awarded the NAVAL PEACE PRIZE!',
            );
          } else if (selectedMeditation.id == 64) {
            setCompletionText(
              `Congratulations on completing the Tao Series, you have developed an extremely useful habit. I give you no more prizes, but you shouldn't have expected any!`,
            );
          }

          // update total number of stars
          if (selectedTime >= 30) {
            // Define star variables
            let prevStarValue = convertCompletionTimeToStars(
              selectedMeditation.completionTime,
            );
            let newStarValue = convertCompletionTimeToStars(selectedTime);
            let newTotalStars;

            // Check for star improvement, if yes then new star total calculated and set and stored.
            if (prevStarValue < newStarValue) {
              let starImprovement = newStarValue - prevStarValue;
              newTotalStars = calculateNewStarTotal(starImprovement);
            }

            //AWARDING TAO MEDS
            if (newTotalStars >= 100 && newTotalStars < 103) {
              awardBonusTaoMedForStars();
              unlockMeditation(63);
            }
            if (newTotalStars >= 180 && newTotalStars < 183) {
              awardBonusTaoMedForStars(180);
              unlockMeditation(64);
            }
          }

          updateCompletionTime(selectedMeditation.id, selectedTime);

          analytics().logEvent('Meditation_Completion_Event', {
            Session_Time: selectedTime,
            Total_Hours: totalMeditationTime / 60 + selectedTime / 60,
            Total_Sessions: totalMeditationsCompleted + 1,
            Meditation_Number: selectedMeditation.id + 1,
          });

          // Define today's and yesterday's date
          let today = new Date();
          let yesterday = new Date(today);
          yesterday.setDate(yesterday.getDate() - 1);
          today = today.toDateString();
          yesterday = yesterday.toDateString();

          // Update the daily streak
          let dateLastCompleted;

          // Get date last completed meditation
          getData(`@date_last_completed`).then((data) => {
            dateLastCompleted = data != null ? data.slice(1, -1) : null;

            getData(`@streak_key`).then((data) => {
              // If your last meditation was yesterday, then +1 to daily streak
              let streak;

              if (dateLastCompleted == today) {
              } else if (dateLastCompleted == yesterday) {
                streak = parseInt(data) + 1;
                setStreak(streak);
                // Save new streak
                storeData('@streak_key', streak);
              } else {
                streak = 1;
                setStreak(streak);
                storeData('@streak_key', streak);
              }
              // Get longest streak data and check if needs updating
              getData(`@longest_streak_key`).then((data) => {
                let longestStreak;

                if (data && parseInt(data) < streak) {
                  longestStreak = streak;
                  storeData(`@longest_streak_key`, longestStreak);
                  setLongestStreak(longestStreak);

                  // Streak Awards
                  switch (longestStreak) {
                    case 3:
                      Alert.alert(
                        'Three in a Row',
                        'Keep it up. You are developing a great habit!',
                      );
                      break;
                    case 7:
                      Alert.alert(
                        'Seven Days in a Row!',
                        `You have unlocked Tao Meditation I. You're doing awesome!`,
                      );
                      unlockMeditation(60);

                      break;
                    case 14:
                      Alert.alert(
                        'Two Weeks Straight!',
                        `You have unlocked Tao Meditation II. Let's keep this going!`,
                      );
                      unlockMeditation(61);

                      break;
                    case 30:
                      Alert.alert(
                        'Wow, Thirty Days Straight!',
                        `You have been awarded Tao Meditation III. You are developing a life changing habit!`,
                      );
                      unlockMeditation(62);
                      break;
                  }
                } else if (data === null) {
                  longestStreak = 1;
                  storeData(`@longest_streak_key`, longestStreak);
                  setLongestStreak(longestStreak);
                }
              });
            });
          });

          // Update total meditation time user stat
          getData(`@hours_meditated`).then((data) => {
            let hours = data ? parseInt(data) + selectedTime : selectedTime;
            setTotalMeditationTime(hours);
            storeData(`@hours_meditated`, hours);

            // Update sessions completed
            getData('@sessions_completed').then((data) => {
              let total = data == null ? 1 : parseInt(data) + 1;
              setTotalMeditationsCompleted(total);
              storeData('@sessions_completed', total);
            });
          });

          dateLastCompleted = today;

          storeData(`@date_last_completed`, dateLastCompleted);
        }
      }
      // Calibrated to 980 to get 1000ms as runs slow
    }, 980);
    // Return a function in useEffect - same as componentWillUnmount
    return () => {
      BackgroundTimer.clearInterval(interval);
    };
  });

  return (
    <VerticalPurpleGradBackground style={styles.screenContainer}>
      <StatusBar hidden={true} />

      <View style={styles.stopIconAndTextPlaceholder}>
        {timerOn ? null : (
          <TouchableOpacity
            style={styles.stopIconAndTextWrapper}
            onPress={() => {
              try {
                TrackPlayer.stop();
              } catch (error) {
                console.log(error);
                crashlytics().recordError(error);
              }
              setStopSound(true);
            }}>
            <FA5Icon
              name="stop"
              size={80}
              style={{
                ...styles.stopSoundIcon,
                display: stopSound ? 'none' : 'flex',
              }}
            />
            <Text
              style={{
                ...styles.stopSoundText,
                display: stopSound ? 'none' : 'flex',
              }}>
              Stop Sound
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.timeAndCompletionTextWrapper}>
        <Text style={styles.time}>
          {minutes}:{seconds}
        </Text>
        <Text style={styles.completionText}>{completionText}</Text>
      </View>

      {timerOn ? (
        <Icon name="meditation" size={115} style={styles.meditationIcon} />
      ) : (
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            style={styles.doneBtn}
            onPress={() => {
              analytics().logEvent(`Done_Btn_Pressed`, {});
              crashlytics().log(`Done Btn`);
              navigation.navigate('Home');
            }}>
            <Text style={styles.doneText}>Done</Text>
          </TouchableOpacity>
        </View>
      )}
    </VerticalPurpleGradBackground>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  stopIconAndTextPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    width: 300,
  },
  stopIconAndTextWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  stopSoundIcon: {
    color: '#5e4ed8',
  },
  stopSoundText: {
    fontSize: 20,
    color: '#988EE6',
    textAlign: 'center',
    marginTop: 2,
  },
  timeAndCompletionTextWrapper: {
    alignItems: 'center',
  },
  time: {
    fontSize: 90,
    color: '#988EE6',
  },
  completionText: {
    fontSize: 22,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginTop: 10,
    marginRight: 3,
    marginLeft: 3,
    fontStyle: 'italic',
  },
  doneBtn: {
    paddingTop: 13,
    paddingBottom: 13,
    paddingLeft: 80,
    paddingRight: 80,
    marginBottom: 24,
    borderRadius: 10,
    backgroundColor: '#61A5DC',
  },
  doneText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 26,
    textAlign: 'center',
    fontFamily: 'Merienda-Bold',
  },
  meditationIcon: {
    color: '#8ABCE5',
  },
});

export default TimerScreen;
