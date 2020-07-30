import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

function SettingsScreen({meditations, unlockMeditation, setStreak}) {
  // Delete all saved data
  let meditationsCopy;
  const clearStorage = (meditations, unlockMeditation) => {
    Alert.alert(
      'You Absolutely Sure?',
      'This will permanently delete all your progress.',
      [
        {
          text: 'Yes',
          onPress: async () => {
            try {
              await AsyncStorage.clear();
              meditationsCopy = [...meditations];
              meditationsCopy.forEach((med) => {
                med.id == 0 ? (med.locked = false) : (med.locked = true);
              });
              Alert.alert('Success', 'Your progress was deleted successfully.');
              unlockMeditation(meditationsCopy);
              setStreak(0);
            } catch (e) {
              alert('Failed to clear the async storage.');
            }
          },
          style: 'destructive',
        },
        {text: 'No', onPress: () => console.log('No pressed')},
      ],
    );
  };

  return (
    <View style={styles.screenContainer}>
      <Text style={styles.text}>
        Permanently delete all of your saved progress.
      </Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => clearStorage(meditations, unlockMeditation)}>
        <Text style={styles.buttonText}>PERMANENTLY DELETE</Text>
      </TouchableOpacity>
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
  },
  buttonText: {
    color: '#fff',
    fontSize: 22,
    textAlign: 'center',
  },
});

export default SettingsScreen;
