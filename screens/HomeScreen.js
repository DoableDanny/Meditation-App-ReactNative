import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import {useIsFocused} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {imageArray} from '../imageArray';
import LinearGradient from 'react-native-linear-gradient';
import crashlytics from '@react-native-firebase/crashlytics';

function HomeScreen({navigation, meditations, updateSelectedMeditation}) {
  // True if we're on this screen, false if not (I'm using this to re-render homescreen)
  const isFocused = useIsFocused();

  useEffect(() => {
    crashlytics().log('HomeScreen mounted');
  }, []);

  // Check the users completionTime for each meditation and award corresponding stars
  const renderStars = (item) => {
    switch (item.completionTime) {
      case 15:
        return (
          <View style={{flexDirection: 'row'}}>
            <Icon name="star-outline" size={24} style={{color: 'gold'}} />
            <Icon name="star-outline" size={24} style={{color: 'gold'}} />
            <Icon name="star-outline" size={24} style={{color: 'gold'}} />
          </View>
        );
      case 30:
        return (
          <View style={{flexDirection: 'row'}}>
            <Icon name="star" size={24} style={{color: 'gold'}} />
            <Icon name="star-outline" size={24} style={{color: 'gold'}} />
            <Icon name="star-outline" size={24} style={{color: 'gold'}} />
          </View>
        );
      case 45:
        return (
          <View style={{flexDirection: 'row'}}>
            <Icon name="star" size={24} style={{color: 'gold'}} />
            <Icon name="star" size={24} style={{color: 'gold'}} />
            <Icon name="star-outline" size={24} style={{color: 'gold'}} />
          </View>
        );
      case 60:
        return (
          <View style={{flexDirection: 'row'}}>
            <Icon
              name="star"
              size={24}
              style={{
                color: 'gold',
              }}
            />
            <Icon name="star" size={24} style={{color: 'gold'}} />
            <Icon name="star" size={24} style={{color: 'gold'}} />
          </View>
        );
    }
  };

  return (
    <View style={styles.screenContainer}>
      <View style={{width: 160}}></View>
      <FlatList
        data={meditations}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() => {
              updateSelectedMeditation(item);
              item.locked ? null : navigation.navigate('Meditation');
              crashlytics().log(`Meditation ${item.id + 1} was selected`);
            }}>
            {!item.locked ? (
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                colors={purpleGrad}
                style={{
                  ...styles.listItem,
                  borderBottomWidth: index === meditations.length - 1 ? 0 : 1,
                  borderTopWidth: index === 0 ? 18 : 10,
                  marginBottom: index === meditations.length - 1 ? 60 : 0,
                }}>
                <View style={styles.imageAndNumberWrapper}>
                  <View style={styles.imageOverlay}>
                    <Image
                      source={imageArray[index].image}
                      style={styles.image}
                    />
                  </View>

                  <View style={styles.numberWrapper}>
                    <Text style={styles.number}>{index + 1}</Text>
                  </View>
                </View>
                <View style={styles.starsAndTitleWrapper}>
                  <Text style={styles.title}>{item.title} </Text>
                  {renderStars(item)}
                </View>
              </LinearGradient>
            ) : (
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={purpleGrad}
                style={{
                  ...styles.listItem,
                  borderBottomWidth: index === meditations.length - 1 ? 0 : 1,
                  marginBottom: index === meditations.length - 1 ? 60 : 0,
                  justifyContent: 'center',
                }}>
                <Icon name="lock" size={45} style={styles.lockIcon} />
              </LinearGradient>
            )}
          </TouchableOpacity>
        )}
      />

      <View style={styles.optionBtnsContainer}>
        <TouchableOpacity
          style={styles.optionButtonTouchableOp}
          onPress={() => {
            navigation.navigate('Guide');
            crashlytics().log('Guide button pressed');
          }}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#6DABDF', '#5EA3DC', '#4F9BD8']}
            style={styles.optionBtn}>
            <Text style={styles.optionBtnText}>GUIDE</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionButtonTouchableOp}
          onPress={() => {
            navigation.navigate('Settings');
            crashlytics().log('Settings button pressed');
          }}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#6DABDF', '#5EA3DC', '#4F9BD8']}
            style={styles.optionBtn}>
            <Text style={styles.optionBtnText}>SETTINGS</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionButtonTouchableOp}
          onPress={() => {
            navigation.navigate('Stats');
            crashlytics().log('Stats button pressed');
          }}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#6DABDF', '#5EA3DC', '#4F9BD8']}
            style={styles.optionBtn}>
            <Text style={styles.optionBtnText}>STATS</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const darkPurple = '#171049';
const purpleGrad = ['#2F2198', '#271C7E', '#1F1663'];

const styles = StyleSheet.create({
  screenContainer: {
    paddingBottom: 0,
    backgroundColor: darkPurple,
  },
  listItem: {
    flexDirection: 'row',
    padding: 15,
    borderColor: darkPurple,
    borderWidth: 10,
    borderRadius: 25,
    minHeight: 120,
    alignItems: 'center',
  },
  starsAndTitleWrapper: {
    flex: 1,
    marginLeft: 30,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    color: '#D3E6F5',
    fontFamily: 'Merienda-Regular',
  },
  lockIcon: {
    color: 'rgba(0,0,0,0.85)',
  },
  imageAndNumberWrapper: {
    position: 'relative',
    width: 150,
    height: 80,
  },
  image: {
    width: 150,
    height: 80,
    borderRadius: 15,
  },
  imageOverlay: {
    opacity: 0.75,
    borderRadius: 15,
    backgroundColor: '#00009f',
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
  number: {color: 'white', fontSize: 35, fontFamily: 'Merienda-Regular'},

  optionBtnsContainer: {
    backgroundColor: '#22277a',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
  },
  optionButtonTouchableOp: {
    flex: 1,
  },
  optionBtn: {
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionBtnText: {
    color: 'white',
    fontSize: 15,
  },
});

export default HomeScreen;
