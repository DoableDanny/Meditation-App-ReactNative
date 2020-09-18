import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import {removeMultipleItems} from '../functionsAndQuotes/asyncStorageFunctions';
import {removeValue} from '../functionsAndQuotes/asyncStorageFunctions';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import HorizPurpleGrad from '../components/HorizPurpleGrad';
import DeleteBtn from '../components/DeleteBtn';

import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';

import RNIap, {
  InAppPurchase,
  PurchaseError,
  acknowledgePurchaseAndroid,
  consumePurchaseAndroid,
  finishTransaction,
  purchaseErrorListener,
  purchaseUpdatedListener,
} from 'react-native-iap';

// Play store item Ids
const itemSKUs = Platform.select({
  android: ['full_app_purchase'],
});

// Variables to check if item purchased or not
let purchaseUpdateItem;
let purchaseErrorItem;

function SettingsScreen({
  resetFully,
  resetCompletionTimes,
  setStreak,
  setLongestStreak,
  setTotalMeditationTime,
  setTotalMeditationsCompleted,
  setTotalStars,
}) {
  const [dateLastCompleted, setDateLastCompleted] = useState('-');
  const [averageSessionTime, setAverageSessionTime] = useState(0);

  // For play store
  const [productList, setProductList] = useState([]);
  const [receipt, setReceipt] = useState('');
  const [availableItemsMessage, setAvailableItemsMessage] = useState('');

  // Initiate connection to play store and cancel any failed orders still pending on google play cache
  useEffect(() => {
    (async function connectAndCancelGooglePlayFailedPurchases() {
      try {
        const result = await RNIap.initConnection();
        await RNIap.flushFailedPurchasesCachedAsPendingAndroid;
        console.log('result', result);
      } catch (err) {
        console.log(err);
      }
    })();

    // componentWillUnmount
    return () => {
      if (purchaseUpdateItem) {
        purchaseUpdateItem.remove();
        purchaseUpdateItem = null;
      }
      if (purchaseErrorItem) {
        purchaseErrorItem.remove();
        purchaseErrorItem = null;
      }
      RNIap.endConnection();
    };
  }, []);

  // Detects any change in receipt value then displays receipt
  useEffect(() => {
    Alert.alert('Receipt', receipt);
  }, [receipt]);

  // Listen for purchases and perform call back when action taken (purchase always = InAppPurchase for this app)
  purchaseUpdateItem = purchaseUpdatedListener(async (purchase) => {
    const receipt = purchase.transactionReceipt;
    if (receipt) {
      try {
        // Purchase must be acknowledged or user gets refunded in few days
        acknowledgePurchaseAndroid(purchase.purchaseToken);
        const ackResult = await finishTransaction(purchase);
        console.log('ackResult: ', ackResult);
      } catch (ackErr) {
        console.log('ackErr: ', ackErr);
      }
      setReceipt(receipt);
    }
  });

  // Listen for purchase errors (error = PurchaseError)
  purchaseErrorItem = purchaseErrorListener((error) => {
    console.log('purchaseErrorListener: ', error);
    Alert.alert('purchase error: ', JSON.stringify(error));
  });

  // Get products from play store
  const getItems = async () => {
    try {
      const products = await RNIap.getProducts(itemSKUs);
      console.log('Products: ', products);
    } catch (err) {
      console.log(err);
    }
  };

  // Show available purchases
  const getAvailablePurchases = async () => {
    try {
      console.info(
        'Get available purchases (non-consumable or unconsumed consumable)',
      );
      const purchases = await RNIap.getAvailablePurchases();
      console.info('Available purchases ::', purchases);
      if (purchases && purchases.length > 0) {
        setAvailableItemsMessage(`Got ${purchases.length} items`);
        setReceipt(purchases[0].transactionReceipt);
      }
    } catch (err) {
      console.log(err);
      Alert.alert(err.message);
    }
  };

  // Purchase an item
  const requestPurchase = async (sku) => {
    try {
      RNIap.requestPurchase(sku);
    } catch (err) {
      console.warn(err.code, err.message);
    }
  };

  useEffect(() => {
    crashlytics().log('SettingsScreen mounted');
  }, []);

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
        <View style={{...styles.textAndButtonWrapper, marginTop: 32}}>
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
