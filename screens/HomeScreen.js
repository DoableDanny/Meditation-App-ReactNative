import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Button,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import {useIsFocused} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {getData, storeData} from '../functionsAndQuotes/asyncStorageFunctions';

function HomeScreen({
  navigation,
  meditations,
  unlockMeditation,
  updateSelectedMeditation,
  streak,
  setStreak,
  longestStreak,
  setLongestStreak,
}) {
  // True if we're on this screen, false if not (I'm using this to re-render homescreen)
  const isFocused = useIsFocused();

  // Define today's and yesterday's date
  let today = new Date();
  let yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  today = today.toDateString();
  yesterday = yesterday.toDateString();

  useEffect(() => {
    getData(`@meditations_completed`).then((data) =>
      data != null ? unlockMeditation(JSON.parse(data)) : null,
    );
    getData(`@streak_key`).then((data) => {
      data != null ? setStreak(parseInt(data)) : setStreak(0);
    });
    getData(`@longest_streak_key`).then((data) => {
      data != null ? setLongestStreak(parseInt(data)) : setLongestStreak(0);
    });
    getData(`@date_last_completed`).then((data) => {
      if (data != null) {
        if (data.slice(1, -1) == today || data.slice(1, -1) == yesterday) {
          return;
        } else {
          setStreak(0);
          storeData('@streak_key', 0);
        }
      }
    });
  }, []);

  return (
    <View style={styles.screenContainer}>
      {/* <View style={styles.buttonsContainer}>
        <View style={styles.singleButtonContainer}>
          <Button title="Guide" onPress={() => navigation.navigate('Guide')} />
        </View>
        <View style={{...styles.singleButtonContainer, borderLeftWidth: 1}}>
          <Button
            title="Settings"
            onPress={() => navigation.navigate('Settings')}
          />
        </View>
      </View> */}
      {/* <View style={styles.streakContainer}>
        <Text style={styles.streakText}>
          Streak: {streak} {streak == 1 ? 'day' : 'days'}
        </Text>
        <Text style={styles.streakText}>
          Longest: {longestStreak} {longestStreak == 1 ? 'day' : 'days'}
        </Text>
      </View> */}

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
              borderTopWidth: index === 0 ? 18 : 12,
              marginBottom: index === meditations.length - 1 ? 60 : 0,
              // backgroundColor: item.locked
              //   ? 'rgb(37, 27, 113)'
              //   : 'rgb(59, 50, 131)',
              justifyContent: item.locked ? 'center' : null,
            }}>
            <View style={{position: 'relative'}}>
              {item.locked ? (
                <Icon name="lock" size={60} style={styles.lockIcon} />
              ) : (
                <Image source={item.image} style={styles.image} />
              )}
              <View style={styles.numberWrapper}>
                {item.locked ? null : (
                  <Text style={styles.number}>{index + 1}</Text>
                )}
              </View>
            </View>

            {item.locked ? null : (
              <Text
                style={{
                  ...styles.title,
                  color: item.locked ? 'black' : 'white',
                }}>
                {item.title}{' '}
              </Text>
            )}
          </TouchableOpacity>
        )}
      />
      <View style={styles.optionBtnsContainer}>
        <TouchableOpacity
          style={styles.optionBtn}
          onPress={() => navigation.navigate('Guide')}>
          <Text style={styles.begin}>GUIDE</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionBtn}
          onPress={() => navigation.navigate('Settings')}>
          <Text style={styles.begin}>SETTINGS</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const darkPurple = '#0e0a2e';
const styles = StyleSheet.create({
  screenContainer: {
    paddingBottom: 0,
    backgroundColor: darkPurple,
  },
  streakContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  streakText: {
    color: 'rgb(104,186,223)',
    fontSize: 20,
    padding: 2,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  singleButtonContainer: {
    flex: 1,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    // borderBottomWidth: 1,
    // borderBottomColor: 'rgb(104,186,223)',
    borderColor: darkPurple,
    borderWidth: 12,
    borderRadius: 20,
    backgroundColor: '#1f1a47',
  },
  title: {
    fontSize: 20,
    marginLeft: 40,
    flex: 1,
  },
  lockIcon: {
    color: '#000',
  },
  image: {
    width: 150,
    height: 75,
    borderRadius: 10,
  },
  numberWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  number: {color: 'white', fontSize: 40},
  optionBtnsContainer: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'red',
    width: Dimensions.get('window').width,
    flexDirection: 'row',
  },
  optionBtn: {
    backgroundColor: '#5376cf',
    height: 45,
    width: 0.5 * Dimensions.get('window').width,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  begin: {
    color: 'white',
    fontSize: 15,
  },
});

export default HomeScreen;
