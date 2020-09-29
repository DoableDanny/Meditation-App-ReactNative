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
  android: ['full_app_purchase', 'test_1', 'test_2'],
});

// Variables to check if item purchased or not
let purchaseUpdateItem;
let purchaseErrorItem;

const receipt_Storage_Key = '@full_app_purchase_receipt';

export default function useInAppPurchase() {
  const [receipt, setReceipt] = useState({
    productId: 'initial_state',
  });

  // Initiate connection to play store and cancel any failed orders still pending on google play cache
  useEffect(() => {
    (async function connectAndCancelGooglePlayFailedPurchases() {
      try {
        const result = await RNIap.initConnection();
        await RNIap.flushFailedPurchasesCachedAsPendingAndroid;
        console.log('result', result);

        // Listens for purchases and perform call back when action taken (purchase always = InAppPurchase for this app). Called early in App.js as can pend on play store.
        purchaseUpdateItem = purchaseUpdatedListener(async (purchase) => {
          const receipt = purchase.transactionReceipt;
          if (receipt) {
            try {
              // Purchase must be acknowledged or user gets refunded in few days
              const ackResult = await finishTransaction(purchase);
              console.log('ackResult: ', ackResult);
            } catch (ackErr) {
              console.log('ackErr: ', ackErr);
            }

            setAndStoreReceipt(receipt);
            console.log('useINNAPPPURCHASE.JS listerner is working', receipt);
          }
        });

        // Listen for purchase errors (error = PurchaseError)
        purchaseErrorItem = purchaseErrorListener((error) => {
          console.log('purchaseErrorListener: ', error);
          Alert.alert('purchase error: ', JSON.stringify(error));
          if (error.message == 'You already own this item.') {
            setAndStoreReceipt(
              JSON.stringify({
                productId: 'full_app_purchase',
              }),
            );
          }
        });

        // //DEV ONLY
        // await RNIap.consumeAllItemsAndroid();
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

  // Upon initial app load, check for receipt in storage, if exists then setReceipt
  useEffect(() => {
    getData(receipt_Storage_Key).then((data) => {
      if (data) {
        setReceipt(JSON.parse(data));
      }
      console.log(data);
    });
  }, []);

  // // Detects any change in receipt value then displays receipt
  // useEffect(() => {
  //   if (receipt != undefined) {
  //     Alert.alert('Receipt', receipt);
  //   }
  // }, [receipt]);

  // Get products from play store (productId is passed in for testing only)
  async function getItems() {
    try {
      const products = await RNIap.getProducts(itemSKUs);
      requestPurchase(products[0].productId);
    } catch (err) {
      Alert.alert('Check your internet connection', err.message);
    }
  }

  // // TEST
  // async function getItems(setProductList) {
  //   try {
  //     const products = await RNIap.getProducts(itemSKUs);
  //     setProductList(products);
  //   } catch (err) {
  //     Alert.alert('Check your internet connection', err.message);
  //   }
  // }

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

  //   // Show previous purchases
  // async function getAvailablePurchases() {
  //   try {
  //     console.info(
  //       'Get available purchases (non-consumable or unconsumed consumable)',
  //     );
  //     const purchases = await RNIap.getAvailablePurchases();
  //     console.info('Available purchases ::', purchases);
  //     if (purchases && purchases.length > 0) {
  //       // setAvailableItemsMessage(`Got ${purchases.length} items`);
  //       setReceipt(purchases[0].transactionReceipt);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     Alert.alert(err.message);
  //   }
  // }

  // Purchase an item
  async function requestPurchase(sku) {
    try {
      RNIap.requestPurchase(sku).then(() => console.log('Purchase successful'));
    } catch (err) {
      Alert.alert(err.code, err.message);
    }
  }

  function setAndStoreReceipt(receipt) {
    let receiptObj = JSON.parse(receipt);
    setReceipt(receiptObj);
    console.log('TYPEOF: ', typeof receiptObj);
    console.log('RECEIPTOBJ: ', receiptObj);

    storeData(receipt_Storage_Key, receiptObj);
    console.log('Receipt set and stored.');
  }

  return {
    getItems,
    // getAvailablePurchases,
    requestPurchase,
    // purchaseUpdateItem,
    // purchaseErrorItem,
    receipt,
    setReceipt,
  };
}
