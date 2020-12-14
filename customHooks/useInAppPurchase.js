import {useState, useEffect} from 'react';
import {Alert} from 'react-native';

import RNIap, {
  finishTransaction,
  purchaseErrorListener,
  purchaseUpdatedListener,
} from 'react-native-iap';

import {getData, storeData} from '../functionsAndQuotes/asyncStorageFunctions';

// Play store item Ids
const itemSKUs = Platform.select({
  android: ['full_app_purchase'],
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

  // Get products from play store
  async function getItems() {
    try {
      const products = await RNIap.getProducts(itemSKUs);
      requestPurchase(products[0].productId);
    } catch (err) {
      Alert.alert('Check your internet connection', err.message);
    }
  }

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
    requestPurchase,
    receipt,
    setReceipt,
  };
}
