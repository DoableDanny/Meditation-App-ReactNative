import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, StatusBar, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FA5Icon from 'react-native-vector-icons/FontAwesome5';
import BackgroundTimer from 'react-native-background-timer';
import {navalQuotes} from '../functionsAndQuotes/quotes';
import {
  getData,
  storeData,
  multiSet,
} from '../functionsAndQuotes/asyncStorageFunctions.js';
import TrackPlayer from 'react-native-track-player';
import tracks from '../sounds/tracks';

// Select a random track
const randomNum = Math.floor(Math.random() * tracks.length);
const track = tracks[randomNum];

function TimerScreen({
  selectedMeditation,
  meditations,
  unlockMeditation,
  setStreak,
  setLongestStreak,
  selectedTime,
  setTotalMeditationTime,
  setTotalMeditationsCompleted,
}) {
  const [seconds, setSeconds] = useState(`02`);
  const [minutes, setMinutes] = useState(`00`); //CHANGE THIS!!
  const [timerOn, setTimerOn] = useState(true);
  const [completionText, setCompletionText] = useState('');

  let nextMeditationId = selectedMeditation.id + 1;

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
          // Play zen completion sound
          TrackPlayer.play();

          setMinutes(`00`);
          setSeconds(`00`);
          setTimerOn(false);

          setCompletionText(
            navalQuotes[Math.floor(Math.random() * navalQuotes.length)],
          );

          // Make copy of meditaitons, check if not last meditation, and unlock next one.
          let meditationsCopy = [...meditations];
          if (meditations[nextMeditationId]) {
            let nextMeditation = {...meditationsCopy[nextMeditationId]};
            nextMeditation.locked = false;
            meditationsCopy[nextMeditationId] = nextMeditation;

            // Update the current meditations completion time if it's a new record
            let currentMeditation = {...meditationsCopy[selectedMeditation.id]};
            if (selectedTime > currentMeditation.completionTime) {
              currentMeditation.completionTime = selectedTime;
              meditationsCopy[selectedMeditation.id] = currentMeditation;
            }

            unlockMeditation([...meditationsCopy]);
          } else {
            setCompletionText(
              'You completed all 60 days, I hope you gained self-understanding and peace.',
            );
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

          // Save to asyncStorage
          // multiSet(
          //   ['@meditations_completed', JSON.stringify(meditationsCopy)],
          //   [`@date_last_completed`, dateLastCompleted],
          // );
          storeData('@meditations_completed', meditationsCopy);
          storeData(`@date_last_completed`, dateLastCompleted);
        }
      }
    }, 1000);
    // Return a function in useEffect - same as componentWillUnmount
    return () => {
      BackgroundTimer.clearInterval(interval);
    };
  });

  useEffect(() => {
    // Initialise TrackPlayer on component mount
    trackPlayerInit();
    // Stop playing sound on unmount
    return () => {
      TrackPlayer.stop();
    };
  }, []);

  if (minutes == `00` && seconds == `00`) {
    var timeUp = true;
  }

  return (
    <View style={styles.timerContainer}>
      {/* <StatusBar hidden={true} /> */}

      <Text style={styles.time}>
        {minutes}:{seconds}
      </Text>
      <Text style={styles.completionText}>{completionText}</Text>
      {timeUp ? (
        <FA5Icon name="smile-beam" size={90} style={styles.meditationIcon} />
      ) : (
        <Icon name="meditation" size={90} style={styles.meditationIcon} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  timerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0e0a2e',
  },
  stop: {
    color: 'crimson',
  },
  time: {
    fontSize: 40,
    color: 'white',
  },
  completionText: {
    fontSize: 23,
    color: '#3CB371',
    textAlign: 'center',
    marginTop: 10,
    marginRight: 3,
    marginLeft: 3,
  },
  meditationIcon: {
    position: 'absolute',
    bottom: 18,
    color: '#3CB371',
  },
});

export default TimerScreen;
