import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Button,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {removeValue} from '../functionsAndQuotes/asyncStorageFunctions';

function SettingsScreen({
  meditations,
  unlockMeditation,
  setStreak,
  setLongestStreak,
}) {
  // Delete all saved data
  // let meditationsCopy;
  // const clearStorage = (meditations, unlockMeditation) => {
  //   Alert.alert(
  //     'You Absolutely Sure?',
  //     'This will permanently delete all your progress.',
  //     [
  //       {
  //         text: 'Yes',
  //         onPress: async () => {
  //           try {
  //             await AsyncStorage.clear();
  //             meditationsCopy = [...meditations];
  //             meditationsCopy.forEach((med) => {
  //               med.id == 0 ? (med.locked = false) : (med.locked = true);
  //             });
  //             Alert.alert('Success', 'Your progress was deleted successfully.');
  //             unlockMeditation(meditationsCopy);
  //             setStreak(0);
  //             setLongestStreak(0);
  //           } catch (e) {
  //             alert('Failed to clear the async storage.');
  //           }
  //         },
  //         style: 'destructive',
  //       },
  //       {text: 'No', onPress: () => console.log('No pressed')},
  //     ],
  //   );
  // };

  // This function is called from alertAndDelete so can update meditationState
  const deleteMeditationsProgress = (messageFocus) => {
    removeValue(`@meditations_completed`, messageFocus);
    let meditationsCopy = [...meditations];
    meditationsCopy.forEach((med) => {
      med.id == 0 ? (med.locked = false) : (med.locked = true);
    });
    unlockMeditation(meditationsCopy);
  };

  const alertAndDelete = (setState, streakKey, title) => {
    let messageFocus = title;
    Alert.alert(
      'You Absolutely Sure?',
      `This will permanently delete your ${messageFocus}.`,
      [
        {
          text: 'Yes',
          onPress: () => {
            if (streakKey == `@meditations_completed`) {
              deleteMeditationsProgress(messageFocus);
            } else {
              removeValue(streakKey, messageFocus);
              setState(0);
            }
            streakKey == `@streak_key`
              ? removeValue(`@date_last_completed`)
              : null;
          },
          style: 'destructive',
        },
        {text: 'No', onPress: () => console.log('No pressed')},
      ],
    );
  };

  return (
    <View style={styles.screenContainer}>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => {
          alertAndDelete(setStreak, `@streak_key`, 'day streak');
        }}>
        <Text style={styles.buttonText}>Delete Streak</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() =>
          alertAndDelete(
            setLongestStreak,
            `@longest_streak_key`,
            'longest streak',
          )
        }>
        <Text style={styles.buttonText}>Delete Longest Streak</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() =>
          alertAndDelete(
            setStreak,
            `@meditations_completed`,
            'meditation progress',
          )
        }>
        <Text style={styles.buttonText}>Delete Meditation Progress</Text>
      </TouchableOpacity>
      {/* <Button
        title="Delete Streak"
        onPress={() => {
          alertAndDelete(setStreak, `@streak_key`, 'day streak');
        }}></Button>
      <Button
        title="Delete Longest Streak"
        onPress={() =>
          alertAndDelete(
            setLongestStreak,
            `@longest_streak_key`,
            'longest streak',
          )
        }></Button>
      <Button
        title="Delete All Meditation Progress"
        onPress={() =>
          alertAndDelete(
            setStreak,
            `@meditations_completed`,
            'meditation progress',
          )
        }></Button> */}

      {/* <Text style={styles.text}>
        Permanently delete all of your saved progress.
      </Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => clearStorage(meditations, unlockMeditation)}>
        <Text style={styles.buttonText}>PERMANENTLY DELETE</Text>
      </TouchableOpacity> */}
    </View>
  );
}

{
  /* <Button
            title="Settings"
            onPress={() => clearStorage(meditations, unlockMeditation)}
          /> */
}

const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: 'rgb(37, 27, 113)',
    flex: 1,
    padding: 10,
  },
  text: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 8,
  },
  deleteButton: {
    backgroundColor: 'black',
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderColor: 'crimson',
    padding: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 22,
    textAlign: 'center',
  },
});

export default SettingsScreen;
