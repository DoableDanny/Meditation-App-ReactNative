import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Button,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {useIsFocused} from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
    ('');
  }, []);

  return (
    <View style={styles.screenContainer}>
      <View style={styles.buttonsContainer}>
        <View style={styles.singleButtonContainer}>
          <Button title="Guide" onPress={() => navigation.navigate('Guide')} />
        </View>
        <View style={{...styles.singleButtonContainer, borderLeftWidth: 1}}>
          <Button
            title="Settings"
            onPress={() => navigation.navigate('Settings')}
          />
        </View>
      </View>
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
              marginBottom: index === meditations.length - 1 ? 20 : 0,
              backgroundColor: item.locked
                ? 'rgb(37, 27, 113)'
                : 'rgb(59, 50, 131)',
              justifyContent: item.locked ? 'center' : null,
            }}>
            {item.locked ? (
              <Icon name="lock" size={60} style={styles.lockIcon} />
            ) : (
              <Image source={item.image} style={styles.image} />
            )}

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
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    paddingBottom: 70,
    backgroundColor: 'rgb(37, 27, 113)',
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
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(104,186,223)',
  },
  title: {
    fontSize: 20,
  },
  // locked: {
  //   fontSize: 20,
  //   color: 'rgba(255,255,255,0.6)',
  // },
  lockIcon: {
    color: '#000',
  },
  image: {
    width: 140,
    height: 60,
    marginRight: 10,
  },
});

export default HomeScreen;
