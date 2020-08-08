import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import {
  storeData,
  removeMultipleItems,
} from '../functionsAndQuotes/asyncStorageFunctions';
import {removeValue} from '../functionsAndQuotes/asyncStorageFunctions';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';

function SettingsScreen({
  meditations,
  unlockMeditation,
  setStreak,
  setLongestStreak,
  setTotalMeditationTime,
  setTotalMeditationsCompleted,
  setTotalStars,
}) {
  const [dateLastCompleted, setDateLastCompleted] = useState('-');
  const [averageSessionTime, setAverageSessionTime] = useState(0);

  const warningAlert = (messageObject) => {
    Alert.alert(
      'You Absolutely Sure?',
      `This will permanently delete your ${messageObject}.`,
      [
        {
          text: 'Yes',
          onPress: () => {
            switch (messageObject) {
              case `meditation progress`:
                deleteMeditationsProgress(messageObject);
                break;
              case `stars`:
                removeStarsFromMeditations();
                break;
              case `stats data`:
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
    removeMultipleItems([`@meditations_completed`, `@total_stars`]).then(() =>
      Alert.alert('Success', `Your ${messageObject} was deleted successfully`),
    );

    let meditationsCopy = [...meditations];
    meditationsCopy.forEach((med) => {
      med.id == 0 ? (med.locked = false) : (med.locked = true);
      med.completionTime = 0;
    });
    unlockMeditation(meditationsCopy);
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
    }
  };

  const removeStarsFromMeditations = (messageObject) => {
    let meditationsCopy = [...meditations];
    meditationsCopy.forEach((med) => {
      med.completionTime = 0;
    });
    console.log(meditationsCopy);
    setTotalStars(0);
    unlockMeditation(meditationsCopy);
    storeData('@meditations_completed', meditationsCopy);
    removeValue(`@total_stars`, 'stars record');
  };

  return (
    <View style={styles.screenContainer}>
      <View style={styles.textAndButtonWrapper}>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => warningAlert('stars')}>
          <Text style={styles.buttonText}>DELETE STARS</Text>
        </TouchableOpacity>
        <Text style={styles.description}>Resets all stars to 0.</Text>
      </View>

      <View style={styles.textAndButtonWrapper}>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => warningAlert('stats data')}>
          <Text style={styles.buttonText}>RESET STATS</Text>
        </TouchableOpacity>
        <Text style={styles.description}>
          Resets all stats to 0. Stars and unlocked meditations will remain.
        </Text>
      </View>

      <View style={styles.textAndButtonWrapper}>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => warningAlert('meditation progress')}>
          <Text style={styles.buttonText}>RE-LOCK MEDITATIONS</Text>
        </TouchableOpacity>
        <Text style={styles.description}>
          All meditations but day one will be locked. Your stars will also be
          deleted.
        </Text>
      </View>

      <Icon name="settings-outline" size={90} style={styles.meditationIcon} />
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: '#0e0a2e',
    flex: 1,
    padding: 10,
  },
  textAndButtonWrapper: {
    margin: 20,
  },
  description: {
    color: 'white',
    marginTop: 8,
    fontSize: 19,
    textAlign: 'center',
  },
  deleteButton: {
    backgroundColor: 'black',
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderColor: 'crimson',
    padding: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 22,
    textAlign: 'center',
  },
  meditationIcon: {
    position: 'absolute',
    bottom: 30,
    left: 0.4 * Dimensions.get('window').width,
    color: '#3CB371',
  },
});

export default SettingsScreen;
