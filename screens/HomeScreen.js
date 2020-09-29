import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import useStars from '../customHooks/useStars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {imageArray} from '../imageArray';
// import renderStars from '../functionsAndQuotes/renderStars';
import HomeNavBtn from '../components/HomeNavBtn';
import LinearGradient from 'react-native-linear-gradient';
import crashlytics from '@react-native-firebase/crashlytics';

function HomeScreen({navigation, meditations, setSelectedMeditation, receipt}) {
  // True if we're on this screen, false if not (I'm using this to re-render homescreen)
  const isFocused = useIsFocused();
  const {renderStars} = useStars();

  useEffect(() => {
    crashlytics().log('HomeScreen mounted');
  }, []);

  return (
    <View style={styles.screenContainer}>
      <View style={{width: 160}}></View>
      <FlatList
        data={meditations}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedMeditation(item);
              if (item.id < 7 && !item.locked) {
                navigation.navigate('Meditation');
              } else if (
                !item.locked &&
                receipt.productId === 'full_app_purchase'
              ) {
                navigation.navigate('Meditation');
              } else if (item.id == 7 && !item.locked) {
                Alert.alert(
                  'Please Purchase the Full App',
                  "To continue progressing, please purchase the full app from 'SETTINGS'.",
                );
              }

              // item.locked ? null : navigation.navigate('Meditation');
              crashlytics().log(`Meditation ${item.id + 1} was selected`);
            }}>
            {item.id < 60 ? (
              !item.locked ? (
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
                  colors={purpleGrad}
                  style={{
                    ...styles.listItem,
                    borderBottomWidth: index === meditations.length - 1 ? 0 : 1,
                    borderTopWidth: index === 0 ? 18 : 10,
                    marginBottom: index == 59 ? 60 : 0,
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
                    {renderStars(item.completionTime)}
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
                    marginBottom: index == 59 ? 60 : 0,
                    justifyContent: 'center',
                  }}>
                  <Icon name="lock" size={45} style={styles.lockIcon} />
                </LinearGradient>
              )
            ) : null}
          </TouchableOpacity>
        )}
      />

      <View style={styles.optionBtnsContainer}>
        <HomeNavBtn
          label="GUIDE"
          onPress={() => {
            navigation.navigate('Guide');
            crashlytics().log('Guide button pressed');
          }}
        />
        <HomeNavBtn
          label="SETTINGS"
          onPress={() => {
            navigation.navigate('Settings');
            crashlytics().log('Settings button pressed');
          }}
        />
        <HomeNavBtn
          label="STATS"
          onPress={() => {
            navigation.navigate('Stats');
            crashlytics().log('Stats button pressed');
          }}
        />
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
    fontSize: 18,
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
});

export default HomeScreen;
