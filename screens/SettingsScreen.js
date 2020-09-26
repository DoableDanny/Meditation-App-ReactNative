import React, {useState, useEffect} from 'react';
import {View, ScrollView, Text, StyleSheet, Alert} from 'react-native';
import {
  getData,
  removeMultipleItems,
} from '../functionsAndQuotes/asyncStorageFunctions';
import {removeValue} from '../functionsAndQuotes/asyncStorageFunctions';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import HorizPurpleGrad from '../components/HorizPurpleGrad';
import DeleteBtn from '../components/DeleteBtn';
import AppPurchaseTest from '../components/appPurchaseTest';

import useInAppPurchase from '../customHooks/useInAppPurchase';

import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';
import {TouchableOpacity} from 'react-native-gesture-handler';

function SettingsScreen({
  resetFully,
  resetCompletionTimes,
  setStreak,
  setLongestStreak,
  setTotalMeditationTime,
  setTotalMeditationsCompleted,
  setTotalStars,
  receipt,
  setReceipt,
}) {
  const [dateLastCompleted, setDateLastCompleted] = useState('-');
  const [averageSessionTime, setAverageSessionTime] = useState(0);

  const [productId, setProductId] = useState('Danny, press somet!');
  const [productList, setProductList] = useState([
    {
      title: 'placeholder1',
      productId: 'pid1',
      price: '$$1',
    },
    {
      title: 'placeholder2',
      productId: 'pid2',
      price: '$$2',
    },
    {
      title: 'placeholder3',
      productId: 'pid3',
      price: '$$3',
    },
  ]);

  // InAppPurchase functions from custom hook
  const {getItems, requestPurchase} = useInAppPurchase(setReceipt);

  useEffect(() => {
    crashlytics().log('SettingsScreen mounted');
  }, []);

  // useEffect(() => {
  //   const receiptStorageKey = '@full_app_purchase_receipt';
  //   getData(receiptStorageKey).then((jsonValue) => {
  //     console.log('JSONvalue: ', jsonValue);
  //     if (jsonValue) {
  //       setReceipt(jsonValue);
  //     }
  //   });
  // }, []);

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
    // Resetting completion times to 0 removes all stars
    resetCompletionTimes();
    setTotalStars(0);

    removeValue(`@total_stars`, 'stars record');
  };

  const purpleGrad = ['#2F2198', '#271C7E', '#1F1663'];

  return (
    <HorizPurpleGrad colors={purpleGrad}>
      <ScrollView>
        {/* <AppPurchaseTest productId={productId} setProductId={setProductId} /> */}

        {productList.map((product) => (
          <TouchableOpacity
            style={{marginBottom: 30, backgroundColor: 'blue'}}
            onPress={() => {
              setProductId(product.productId);
            }}>
            <Text style={styles.description}>{product.title}</Text>
            <Text style={styles.description}>{product.productId}</Text>
            <Text style={styles.description}>{product.price}</Text>
          </TouchableOpacity>
        ))}

        <Text style={{...styles.description, marginBottom: 20}}>
          {productId}
        </Text>

        <DeleteBtn
          title="Get Items"
          onPress={() => {
            // crashlytics().log('Full App Access button pressed');
            getItems(setProductList);
          }}
        />

        <View style={{marginTop: 32}}>
          <DeleteBtn
            title="Request Purchase"
            onPress={() => {
              // crashlytics().log('Full App Access button pressed');
              requestPurchase(productId);
            }}
          />
        </View>

        <Text style={{...styles.description, marginTop: 20}}>
          ProductId from receipt: {receipt ? JSON.parse(receipt).productId : ''}
        </Text>

        <View style={{...styles.textAndButtonWrapper, marginTop: 32}}>
          <DeleteBtn
            title="Full App Access"
            onPress={() => {
              crashlytics().log('Full App Access button pressed');
              getItems(productId, setProductList);
            }}
          />
          <Text style={styles.description}>
            The first 7 meditations are free. To gain full access to the rest,
            please purchase the full app.
          </Text>
        </View>

        <View style={styles.textAndButtonWrapper}>
          <DeleteBtn
            title="DELETE STARS"
            onPress={() => {
              crashlytics().log('Delete stars button pressed');
              warningAlert('stars');
            }}
          />
          <Text style={styles.description}>
            Resets all stars to 0. All unlocked meditations will remain.
          </Text>
        </View>

        <View style={styles.textAndButtonWrapper}>
          <DeleteBtn
            title="RESET STATS"
            onPress={() => {
              crashlytics().log('Reset stats button pressed');
              warningAlert('stats_data');
            }}
          />
          <Text style={styles.description}>
            Resets all stats to 0. Stars and unlocked meditations will remain.
          </Text>
        </View>

        <View style={styles.textAndButtonWrapper}>
          <DeleteBtn
            title="RE-LOCK MEDITATIONS"
            onPress={() => {
              crashlytics().log('Re-lock meditations button pressed');
              warningAlert('meditation_progress');
            }}
          />
          <Text style={styles.description}>
            All meditations but day one will be locked. Your stars will also be
            deleted.
          </Text>
        </View>

        <View style={{alignItems: 'center'}}>
          <Icon name="settings-outline" size={90} style={styles.settingsIcon} />
        </View>
      </ScrollView>
    </HorizPurpleGrad>
  );
}

const styles = StyleSheet.create({
  textAndButtonWrapper: {
    margin: 16,
  },
  description: {
    color: 'white',
    marginTop: 8,
    fontSize: 18,
    textAlign: 'center',
  },
  settingsIcon: {
    color: '#2775B4',
    marginTop: 48,
  },
});

export default SettingsScreen;
