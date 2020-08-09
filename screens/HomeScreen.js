import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import {useIsFocused} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {getData} from '../functionsAndQuotes/asyncStorageFunctions';
import {imageArray} from '../imageArray';

function HomeScreen({
  navigation,
  meditations,
  unlockMeditation,
  updateSelectedMeditation,
  taoSeries,
  setTaoSeries,
}) {
  // True if we're on this screen, false if not (I'm using this to re-render homescreen)
  const isFocused = useIsFocused();

  useEffect(() => {
    getData(`@meditations_completed`).then((data) =>
      data != null ? unlockMeditation(JSON.parse(data)) : null,
    );
    getData(`@tao_series`).then((data) =>
      data != null ? setTaoSeries(data) : null,
    );
  }, []);

  // console.log('tao: ', taoSeries);

  // Check the users completionTime for each meditation and award corresponding stars
  const renderStars = (item) => {
    switch (item.completionTime) {
      case 30:
        return (
          <View style={{justifyContent: 'flex-start', height: 75}}>
            <Icon name="star" size={25} style={{color: 'gold'}} />
          </View>
        );
      case 45:
        return (
          <View style={{justifyContent: 'flex-start', height: 75}}>
            <Icon name="star" size={25} style={{color: 'gold'}} />
            <Icon name="star" size={25} style={{color: 'gold'}} />
          </View>
        );
      case 60:
        return (
          <View style={{}}>
            <Icon
              name="star"
              size={25}
              style={{
                color: 'gold',
              }}
            />
            <Icon name="star" size={25} style={{color: 'gold'}} />
            <Icon name="star" size={25} style={{color: 'gold'}} />
          </View>
        );
    }
  };

  return (
    <View style={styles.screenContainer}>
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
              justifyContent: item.locked ? 'center' : null,
            }}>
            <View style={{position: 'relative'}}>
              {item.locked ? (
                <Icon name="lock" size={60} style={styles.lockIcon} />
              ) : (
                <Image source={imageArray[index].image} style={styles.image} />
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
            {renderStars(item)}
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
        <TouchableOpacity
          style={styles.optionBtn}
          onPress={() => navigation.navigate('Stats')}>
          <Text style={styles.begin}>STATS</Text>
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
    width: 0.33333333 * Dimensions.get('window').width,
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
