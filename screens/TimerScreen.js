import React, {useState, useEffect} from 'react';
import {
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
import LinearGradient from 'react-native-linear-gradient';
import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';

function TimerScreen({
  selectedMeditation,
  meditations,
  unlockMeditation,
  setStreak,
  setLongestStreak,
  selectedTime,
  totalMeditationTime,
  setTotalMeditationTime,
  totalMeditationsCompleted,
  setTotalMeditationsCompleted,
  setTotalStars,
  setTaoSeries,
}) {
  const [seconds, setSeconds] = useState(`03`);
  const [minutes, setMinutes] = useState(`00`); //CHANGE THIS!!
  const [timerOn, setTimerOn] = useState(true);
  const [completionText, setCompletionText] = useState('');
  const [stopSound, setStopSound] = useState(false);

  // Select a random track
  const randomNum = Math.floor(Math.random() * tracks.length);
  const track = tracks[randomNum];

  // Function that sets up the track player
  const trackPlayerInit = async () => {
    // Takes under 1 sec
    await TrackPlayer.setupPlayer();
    // Adding background controls. stopWithApp kills sound if app closes. These remote controls have eventListeners in service.js file.
    TrackPlayer.updateOptions({
      stopWithApp: false,
      capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_STOP,
      ],
      compactCapabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
      ],
    });
    await TrackPlayer.add(track);
  };

  useEffect(() => {
    // Initialise TrackPlayer on component mount
    trackPlayerInit();
    // Stop playing sound on unmount
    return () => {
      TrackPlayer.stop();
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

          // Play zen completion sound
          TrackPlayer.play();

          setMinutes(`00`);
          setSeconds(`00`);
          setTimerOn(false);

          setCompletionText(
            navalQuotes[Math.floor(Math.random() * navalQuotes.length)],
          );

          // Make copy of meditaitons, check if not last meditation or 61st, and unlock next one.
          let nextMeditationId = selectedMeditation.id + 1;
          let meditationsCopy = [...meditations];
          let currentMeditation = {...meditationsCopy[selectedMeditation.id]};
          let nextMeditation = {...meditationsCopy[nextMeditationId]};

          if (nextMeditationId != 60 && currentMeditation.id != 64) {
            nextMeditation.locked = false;
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

                // If users total stars >= 180 => Bonus series!S
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
                      setTaoSeries(true);
                    }
                  });
                }
              })
              .then(() => updateCompletionTime());
          } else {
            updateCompletionTime();
          }

          console.log('Analytics line b4');
          analytics().logEvent('Meditation_Completion_Event', {
            Session_Time: selectedTime,
            Total_Hours: totalMeditationTime / 60 + selectedTime / 60,
            Total_Sessions: totalMeditationsCompleted + 1,
            Meditation_Number: selectedMeditation.id + 1,
          });

          function updateCompletionTime() {
            console.log('updateCompletionTime');
            if (selectedTime > currentMeditation.completionTime) {
              currentMeditation.completionTime = selectedTime;
              meditationsCopy[selectedMeditation.id] = currentMeditation;
              console.log('IF RAN updateCompletionTime');
            }
            storeData('@meditations_completed', meditationsCopy);
            unlockMeditation([...meditationsCopy]);
          }

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
              if (dateLastCompleted == yesterday) {
                var streak = data != null ? parseInt(data) + 1 : 1;
                setStreak(streak);
                // Save new streak
                storeData('@streak_key', streak);
              } else if (data === null) {
                let streak = 1;
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
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      colors={purpleGrad}
      style={styles.timerContainer}>
      <StatusBar hidden={true} />

      {timerOn ? null : (
        <TouchableOpacity
          style={styles.stopIconAndTextWrapper}
          onPress={() => {
            TrackPlayer.stop();
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

      <Text style={styles.time}>
        {minutes}:{seconds}
      </Text>
      <Text style={styles.completionText}>{completionText}</Text>
      {timerOn ? (
        <Icon name="meditation" size={90} style={styles.meditationIcon} />
      ) : (
        <FA5Icon name="smile-beam" size={90} style={styles.meditationIcon} />
      )}
    </LinearGradient>
  );
}

const purpleGrad = ['#2F2198', '#271C7E', '#1F1663'];

const styles = StyleSheet.create({
  timerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0e0a2e',
  },
  stopIconAndTextWrapper: {
    position: 'absolute',
    top: 30,
    alignItems: 'center',
  },
  stopSoundIcon: {
    color: '#5e4ed8',
  },
  stopSoundText: {
    fontSize: 20,
    color: '#5e4ed8',
    textAlign: 'center',
    marginTop: 2,
  },
  time: {
    fontSize: 40,
    color: '#5e4ed8',
  },
  completionText: {
    fontSize: 23,
    color: '#F0F7FC',
    textAlign: 'center',
    marginTop: 10,
    marginRight: 3,
    marginLeft: 3,
  },
  meditationIcon: {
    position: 'absolute',
    bottom: 18,
    color: '#8ABCE5',
  },
});

export default TimerScreen;
