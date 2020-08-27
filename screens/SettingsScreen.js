import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  storeData,
  removeMultipleItems,
} from '../functionsAndQuotes/asyncStorageFunctions';
import {removeValue} from '../functionsAndQuotes/asyncStorageFunctions';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';

function SettingsScreen({
  meditations,
  resetFully,
  resetCompletionTimes,
  unlockMeditation,
  setStreak,
  setLongestStreak,
  setTotalMeditationTime,
  setTotalMeditationsCompleted,
  setTotalStars,
}) {
  const [dateLastCompleted, setDateLastCompleted] = useState('-');
  const [averageSessionTime, setAverageSessionTime] = useState(0);

  useEffect(() => {
    crashlytics().log('SettingsScreen mounted');
  }, []);

  const warningAlert = (messageObject) => {
    Alert.alert(
      'You Absolutely Sure?',
      `This will permanently delete your ${messageObject}.`,
      [
        {
          text: 'Yes',
          onPress: () => {
            crashlytics().log(`Yes pressed to delete ${messageObject}`);
            analytics().logEvent(`Deleted_${messageObject}`);
            switch (messageObject) {
              case `meditation_progress`:
                deleteMeditationsProgress(messageObject);
                break;
              case `stars`:
                removeStarsFromMeditations();
                break;
              case `stats_data`:
                resetStats(messageObject);
                break;
            }
          },
          style: 'destructive',
        },
        {text: 'No', onPress: () => console.log('No pressed')},
      ],
    );
  };

  // This function is called from warningAlert so can update meditationState
  const deleteMeditationsProgress = (messageObject) => {
    // removeValue(`@meditations_completed`, messageObject);
    removeMultipleItems([
      `@meditations_completed`,
      `@total_stars`,
      `@tao_series`,
    ]).then(() =>
      Alert.alert('Success', `Your ${messageObject} was deleted successfully`),
    );

    // reset times and re lock all but one. So reset fully.
    // let meditationsCopy = [...meditations];
    // meditationsCopy.forEach((med) => {
    //   med.id == 0 ? (med.locked = false) : (med.locked = true);
    //   med.completionTime = 0;
    // });
    // unlockMeditation(meditationsCopy);
    // Reset meditations to initial state.
    resetFully();
    setTotalStars(0);
  };

  // Resets all users stats to default values
  const resetStats = async (messageObject) => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      let filteredKeys = keys
        .filter((item) => item != '@meditations_completed')
        .filter((item2) => item2 != '@total_stars');
      await AsyncStorage.multiRemove(filteredKeys);
      Alert.alert('Success', `Your ${messageObject} was deleted successfully`);
      setTotalMeditationTime(0);
      setTotalMeditationsCompleted(0);
      setAverageSessionTime(0);
      setStreak(0);
      setLongestStreak(0);
      setDateLastCompleted('-');
    } catch (error) {
      console.error(error);
      crashlytics().recordError(error);
    }
  };

  const removeStarsFromMeditations = () => {
    // let meditationsCopy = [...meditations];
    // meditationsCopy.forEach((med) => {
    //   med.completionTime = 0;
    // });
    // Resetting completion times to 0 removes all stars
    resetCompletionTimes();
    setTotalStars(0);
    // unlockMeditation(meditationsCopy);
    // storeData('@meditations_completed', meditationsCopy);
    removeValue(`@total_stars`, 'stars record');
  };

  {
    /* For Testing */
  }
  // const unlock59And64 = () => {
  //   let medCopy = [...meditations];
  //   medCopy[0].locked = false;
  //   medCopy[0].id = 0;
  //   medCopy[58].locked = false;
  //   medCopy[63].locked = false;
  //   console.log(medCopy[1]);
  //   storeData('@meditations_completed', medCopy);
  //   unlockMeditation(medCopy);
  // };

  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={purpleGrad}
      style={styles.screenContainer}>
      <ScrollView>
        <View style={{...styles.textAndButtonWrapper, marginTop: 32}}>
          <TouchableOpacity
            onPress={() => {
              crashlytics().log('Delete stars button pressed');
              warningAlert('stars');
            }}
            style={styles.deleteButton}>
            <Text style={styles.buttonText}>DELETE STARS</Text>
          </TouchableOpacity>
          <Text style={styles.description}>
            Resets all stars to 0. All unlocked meditations will remain.
          </Text>
        </View>

        <View style={styles.textAndButtonWrapper}>
          <TouchableOpacity
            onPress={() => {
              warningAlert('stats_data');
              crashlytics().log('Reset stats button pressed');
            }}
            style={styles.deleteButton}>
            <Text style={styles.buttonText}>RESET STATS</Text>
          </TouchableOpacity>
          <Text style={styles.description}>
            Resets all stats to 0. Stars and unlocked meditations will remain.
          </Text>
        </View>

        <View style={styles.textAndButtonWrapper}>
          <TouchableOpacity
            onPress={() => {
              warningAlert('meditation_progress');
              crashlytics().log('Re-lock meditations button pressed');
            }}
            style={styles.deleteButton}>
            <Text style={styles.buttonText}>RE-LOCK MEDITATIONS</Text>
          </TouchableOpacity>
          <Text style={styles.description}>
            All meditations but day one will be locked. Your stars will also be
            deleted.
          </Text>
        </View>
        {/* For Testing */}
        {/* <View style={styles.textAndButtonWrapper}>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => unlock59And64()}>
          <Text style={styles.buttonText}>Unlock 59 and 64</Text>
        </TouchableOpacity>
      </View> */}
        <View style={{alignItems: 'center'}}>
          <Icon
            name="settings-outline"
            size={90}
            style={styles.meditationIcon}
          />
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const purpleGrad = ['#2F2198', '#271C7E', '#1F1663'];

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  textAndButtonWrapper: {
    margin: 16,
  },
  deleteButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#FF5353',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  description: {
    color: 'white',
    marginTop: 8,
    fontSize: 18,
    textAlign: 'center',
  },
  meditationIcon: {
    color: '#2775B4',
    marginTop: 48,
  },
});

export default SettingsScreen;
