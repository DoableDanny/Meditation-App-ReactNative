import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Platform,
  Alert,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FA5Icon from 'react-native-vector-icons/FontAwesome5';
import BackgroundTimer from 'react-native-background-timer';
import {navalQuotes} from '../functionsAndQuotes/quotes';
import {
  getData,
  storeData,
} from '../functionsAndQuotes/asyncStorageFunctions.js';
import TrackPlayer from 'react-native-track-player';
import tracks from '../sounds/tracks';
import VerticalPurpleGradBackground from '../components/VerticalPurpleGradBackground';
import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';

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
  setTotalStars,
  navigation,
}) {
  const [seconds, setSeconds] = useState(`01`);
  const [minutes, setMinutes] = useState(`00`); //CHANGE THIS!!
  const [timerOn, setTimerOn] = useState(true);
  const [completionText, setCompletionText] = useState('');
  const [stopSound, setStopSound] = useState(false);

  // Select a random track
  const randomNum = Math.floor(Math.random() * tracks.length);
  const track = tracks[randomNum];

  // Function that sets up the track player when called (time up)
  const trackPlayerInit = async () => {
    // Takes under 1 sec
    await TrackPlayer.setupPlayer();
    // Adding background controls. stopWithApp kills sound if app closes. These remote controls have eventListeners in service.js file.
    TrackPlayer.updateOptions({
      stopWithApp: false,
      capabilities: [
        // TrackPlayer.CAPABILITY_PLAY,
        // TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_STOP,
      ],
      compactCapabilities: [
        TrackPlayer.CAPABILITY_STOP,
        // TrackPlayer.CAPABILITY_PLAY,
        // TrackPlayer.CAPABILITY_PAUSE,
      ],
    });
    await TrackPlayer.add(track);
  };

  // Stop playing sound on component unmount
  useEffect(() => {
    return () => {
      try {
        TrackPlayer.destroy();
        console.log('Trackplayer destroyed successfully');
      } catch (error) {
        console.log('Trackplayer Destroy Error:', error);
        crashlytics().recordError(error);
      }
    };
  }, []);

  useEffect(() => {
    crashlytics().log('TimerScreen mounted');
  }, []);

  // Takes f(n) as arg - runs like componentDidMount
  useEffect(() => {
    if (Platform.OS == 'ios') {
      BackgroundTimer.start();
    }
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
              'The time up sound failed to play. Check your settings to makesure that this app can run in the background.',
            );
          }

          // Make copy of meditaitons, check if not last meditation or 61st, and unlock next one.
          let nextMeditationId = selectedMeditation.id + 1;

          let meditationsCopy = [...meditations];
          let currentMeditation = {...meditationsCopy[selectedMeditation.id]};
          let nextMeditation = {...meditationsCopy[nextMeditationId]};

          if (nextMeditationId != 60 && currentMeditation.id != 64) {
            // nextMeditation.locked = false;
            unlockMeditation(nextMeditationId);
            meditationsCopy[nextMeditationId] = nextMeditation;
          } else if (currentMeditation.id == 59) {
            setCompletionText(
              'You completed all 60 days, I hope you gained self-understanding and peace. You have been awarded the NAVAL PEACE PRIZE!',
            );
          } else if (currentMeditation.id == 64) {
            setCompletionText(
              'Congratulations on completing the Tao Series, ZEN MASTER!',
            );
          }

          // update total number of stars
          if (selectedTime > 15) {
            getData(`@total_stars`)
              .then((data) => {
                console.log('stars', data);
                let stars = data == null ? 0 : parseInt(data);
                let starsObj = {
                  starGain: 0,
                };

                // check for time improvement and add correct amount of stars
                let prevCompletionTime = currentMeditation.completionTime;
                let timeImprovement = selectedTime - prevCompletionTime;
                console.log(prevCompletionTime, timeImprovement);
                switch (timeImprovement) {
                  case 15:
                    starsObj.starGain = prevCompletionTime == 0 ? 0 : 1;
                    storeData(`@total_stars`, stars + starsObj.starGain);
                    break;
                  case 30:
                    starsObj.starGain = prevCompletionTime == 0 ? 1 : 2;
                    storeData(`@total_stars`, stars + starsObj.starGain);
                    break;
                  case 45:
                    starsObj.starGain = prevCompletionTime == 0 ? 2 : 3;
                    storeData(`@total_stars`, stars + starsObj.starGain);
                    break;
                  case 60:
                    starsObj.starGain = 3;
                    storeData(`@total_stars`, stars + starsObj.starGain);
                    break;
                }
                setTotalStars(stars + starsObj.starGain);
                console.log('stars', stars, starsObj.starGain);

                // If users total stars >= 180 => Bonus series!
                if (stars + starsObj.starGain >= 180) {
                  getData(`@tao_series`).then((data) => {
                    if (data == null) {
                      Alert.alert(
                        `CONGRATULATIONS!`,
                        `Your outstanding efforts deserve a reward: The Tao Bonus Meditation Series!`,
                      );
                      storeData(`@tao_series`, true);
                      meditationsCopy.forEach((med) => (med.locked = false));
                      storeData(`@meditations_completed`, meditationsCopy);
                    }
                  });
                }
              })
              .then(() =>
                updateCompletionTime(selectedMeditation.id, selectedTime),
              );
          } else {
            updateCompletionTime(selectedMeditation.id, selectedTime);
          }

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
              if (dateLastCompleted == yesterday) {
                streak = data != null ? parseInt(data) + 1 : 1;
                setStreak(streak);
                // Save new streak
                storeData('@streak_key', streak);
              } else if (data === null) {
                streak = 1;
                setStreak(streak);
                storeData('@streak_key', streak);
              }
              // Get longest streak data and check if needs updating
              getData(`@longest_streak_key`).then((data) => {
                let longestStreak;

                //// For testing awards////
                // data = '2';
                // streak = 3;

                if (data && parseInt(data) < streak) {
                  longestStreak = streak;
                  storeData(`@longest_streak_key`, longestStreak);
                  setLongestStreak(longestStreak);

                  // Streak Awards
                  switch (longestStreak) {
                    case 3:
                      Alert.alert(
                        'Three in a Row!',
                        'You have been given The Turkey award. Keep rolling!',
                      );
                      break;
                    case 7:
                      Alert.alert(
                        'Seven Days in a Row!',
                        'You have been awarded The Se7ev Award.',
                      );
                      break;
                    case 14:
                      Alert.alert(
                        'Two Weeks Straight!',
                        'You have been awarded The Fortnight Award. Keep going!',
                      );
                      break;
                    case 30:
                      Alert.alert(
                        'Wow, Thirty Days straight!',
                        `You have been awarded The Stoic Mind. You are developing a life changing habit!`,
                      );
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

          // @meditations_completed is the big 65 item array.
          storeData(`@date_last_completed`, dateLastCompleted);
        }
      }
    }, 1000);
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

const purpleGrad = ['#2F2198', '#271C7E', '#1F1663'];

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
    // color: '#8ABCE5',
  },
  stopSoundText: {
    fontSize: 22,
    color: '#5e4ed8',
    // color: '#8ABCE5',

    textAlign: 'center',
    marginTop: 2,
  },
  timeAndCompletionTextWrapper: {
    alignItems: 'center',
  },
  time: {
    fontSize: 58,
    color: '#5e4ed8',
  },
  completionText: {
    fontSize: 23,
    color: '#F0F7FC',
    textAlign: 'center',
    marginTop: 10,
    marginRight: 3,
    marginLeft: 3,
    fontStyle: 'italic',
  },
  doneBtn: {
    paddingTop: 13,
    paddingBottom: 13,
    paddingLeft: 110,
    paddingRight: 110,
    marginBottom: 24,
    borderRadius: 10,
    backgroundColor: '#8ABCE5',
  },
  doneText: {
    // color: 'rgba(0,0,0,0.9)',
    color: '#fff',
    fontSize: 26,
    textAlign: 'center',
    fontFamily: 'Merienda-Bold',
  },
  meditationIcon: {
    color: '#8ABCE5',
  },
});

export default TimerScreen;
