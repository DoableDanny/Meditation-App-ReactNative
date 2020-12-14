import AsyncStorage from '@react-native-community/async-storage';
import {Alert} from 'react-native';
import crashlytics from '@react-native-firebase/crashlytics';

// Save an object
export const storeData = async (storageKey, obj) => {
  try {
    const jsonValue = JSON.stringify(obj);
    await AsyncStorage.setItem(storageKey, jsonValue);
  } catch (e) {
    console.log(e);
    crashlytics().recordError(e);
  }
};

// Get single item of data
export const getData = async (storageKey) => {
  try {
    const jsonValue = await AsyncStorage.getItem(storageKey);
    // alert(jsonValue);
    return jsonValue != null ? jsonValue : null;
  } catch (e) {
    console.log('Failed when getting data from AsyncStorage :(');
    crashlytics().recordError(e);
  }
};

// Delete single item of data
export const removeValue = async (storageKey, title) => {
  try {
    await AsyncStorage.removeItem(storageKey);
    storageKey != `@date_last_completed`
      ? Alert.alert('Success', `Your ${title} was deleted successfully`)
      : null;
  } catch (e) {
    console.log(e);
    crashlytics().recordError(e);

    Alert.alert('Error', 'Delete not successfull');
  }
  console.log(storageKey, title);
};

// keys e.g. [@key_1, @key_2, ... etc.]
export const removeMultipleItems = async (keys) => {
  try {
    await AsyncStorage.multiRemove(keys);
  } catch (e) {
    console.error(e);
    crashlytics().recordError(e);
  }
  console.log('MultiRemove Done');
};

export default {
  storeData,
  getData,
  removeValue,
  removeMultipleItems,
};
