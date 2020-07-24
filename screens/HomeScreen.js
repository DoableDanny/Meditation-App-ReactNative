import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Button,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {useIsFocused} from '@react-navigation/native';

// Get data stored in asyncStorage
const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@meditations_completed');
    // alert(jsonValue);
    return jsonValue != null ? jsonValue : null;
  } catch (e) {
    console.log('Failed when getting data from AsyncStorage :(');
  }
};

// Delete all saved data
let meditationsCopy;
const clearStorage = async (meditations, unlockMeditation) => {
  try {
    await AsyncStorage.clear();
    meditationsCopy = [...meditations];
    meditationsCopy.forEach((med) => {
      med.id == 0 ? (med.locked = false) : (med.locked = true);
    });
    alert('Storage successfully cleared!');
    unlockMeditation(meditationsCopy);
  } catch (e) {
    alert('Failed to clear the async storage.');
  }
};

function HomeScreen({
  navigation,
  meditations,
  unlockMeditation,
  updateSelectedMeditation,
}) {
  // True if we're on this screen, false if not (I'm using this to re-render homescreen)
  const isFocused = useIsFocused();

  useEffect(() => {
    getData().then((data) =>
      data != null ? unlockMeditation(JSON.parse(data)) : null,
    );
  }, []);

  return (
    <View style={styles.screenContainer}>
      <Button title="Guide" onPress={() => navigation.navigate('Guide')} />
      <Button
        title="Clear all Saved Data"
        onPress={() => clearStorage(meditations, unlockMeditation)}
      />
      <FlatList
        data={meditations}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() => {
              updateSelectedMeditation(item);
              item.locked ? null : navigation.navigate('Meditation');
            }}
            style={{
              ...styles.listItem,
              borderBottomWidth: index === meditations.length - 1 ? 0 : 1,
              backgroundColor: item.locked
                ? 'rgb(37, 27, 113)'
                : 'rgb(59, 50, 131)',
            }}>
            <Image source={item.image} style={styles.image} />

            {item.locked ? null : (
              <Text
                style={{
                  ...styles.title,
                  color: item.locked ? 'black' : 'white',
                }}>
                {item.title}{' '}
              </Text>
            )}
            {item.locked ? <Text style={styles.locked}>LOCKED</Text> : null}
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    paddingBottom: 50,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(104,186,223)',
  },
  title: {
    fontSize: 20,
  },
  locked: {
    fontSize: 20,
    color: 'rgba(255,255,255,0.6)',
  },
  image: {
    width: 140,
    height: 60,
    marginRight: 10,
  },
});

export default HomeScreen;
