import {useState, useEffect} from 'react';
import {Alert} from 'react-native';

import RNIap, {
  InAppPurchase,
  PurchaseError,
  acknowledgePurchaseAndroid,
  consumePurchaseAndroid,
  finishTransaction,
  purchaseErrorListener,
  purchaseUpdatedListener,
} from 'react-native-iap';

import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';

import {getData, storeData} from '../functionsAndQuotes/asyncStorageFunctions';

// Play store item Ids
const itemSKUs = Platform.select({
  android: [
    'full_app_purchase',
    'test_1',
    'test_2',
    'test_3',
    'test_4',
    'test_5',
  ],
});

// Variables to check if item purchased or not
let purchaseUpdateItem;
let purchaseErrorItem;

export default function useInAppPurchase() {
  const [receipt, setReceipt] = useState(
    JSON.stringify({
      title: 'receiptJSONPlaceholder1',
      price: '£1',
    }),
  );
  const [availableItemsMessage, setAvailableItemsMessage] = useState('');

  // Initiate connection to play store and cancel any failed orders still pending on google play cache
  useEffect(() => {
    (async function connectAndCancelGooglePlayFailedPurchases() {
      try {
        const result = await RNIap.initConnection();
        await RNIap.flushFailedPurchasesCachedAsPendingAndroid;
        console.log('result', result);

        //DEV ONLY
        const consumed = await RNIap.consumeAllItems();
        console.log('consumed all items?', consumed);
      } catch (err) {
        console.log('Connection: ', err);
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
    if (receipt != '') {
      Alert.alert('Receipt', receipt);
    }
  }, [receipt]);

  // Listens for purchases and perform call back when action taken (purchase always = InAppPurchase for this app)
  purchaseUpdateItem = purchaseUpdatedListener(async (purchase) => {
    const receipt = purchase.transactionReceipt;
    if (receipt) {
      try {
        // Purchase must be acknowledged or user gets refunded in few days
        // acknowledgePurchaseAndroid(purchase.purchaseToken);
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

  // Get products from play store (productId is passed in for testing only)
  // async function getItems(productId, setProductList) {
  //   try {
  //     const products = await RNIap.getProducts(itemSKUs);
  //     setProductList(products);
  //     buyFullAppAlert(products, productId);
  //   } catch (err) {
  //     Alert.alert('Check your internet connection', err.message);
  //   }
  // }

  // TEST
  async function getItems(setProductList) {
    try {
      const products = await RNIap.getProducts(itemSKUs);
      setProductList(products);
    } catch (err) {
      Alert.alert('Check your internet connection', err.message);
    }
  }

  // function buyFullAppAlert(products, productId) {
  //   Alert.alert(products[0].title, products[0].localizedPrice, [
  //     {
  //       text: 'Purchase',
  //       onPress: () => {
  //         crashlytics().log(`Purchase btn selected`);
  //         analytics().logEvent(`Purchase_btn_selected`);

  //         requestPurchase(products[0].productId);
  //         // requestPurchase(productId);
  //       },
  //     },
  //     {
  //       text: 'No',
  //       onPress: () => {
  //         crashlytics().log(`No purchase btn selected`);
  //         analytics().logEvent(`No_purchase_btn_selected`);
  //       },
  //     },
  //   ]);
  // }

  //   // Show available purchases
  //   async function getAvailablePurchases() {
  //     try {
  //       console.info(
  //         'Get available purchases (non-consumable or unconsumed consumable)',
  //       );
  //       const purchases = await RNIap.getAvailablePurchases();
  //       console.info('Available purchases ::', purchases);
  //       if (purchases && purchases.length > 0) {
  //         setAvailableItemsMessage(`Got ${purchases.length} items`);
  //         setReceipt(purchases[0].transactionReceipt);
  //       }
  //     } catch (err) {
  //       console.log(err);
  //       Alert.alert(err.message);
  //     }
  //   }

  // Purchase an item
  async function requestPurchase(sku) {
    try {
      RNIap.requestPurchase(sku).then(() => alert('Purchase Successful'));
    } catch (err) {
      Alert.alert(err.code, err.message);
    }
  }

  return {
    getItems,
    // getAvailablePurchases,
    requestPurchase,
    // purchaseUpdateItem,
    // purchaseErrorItem,
    receipt,
  };
}
