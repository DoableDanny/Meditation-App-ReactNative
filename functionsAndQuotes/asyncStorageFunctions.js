import AsyncStorage from '@react-native-community/async-storage';
import {Alert} from 'react-native';

export const storeData = async (storageKey, meditationsCopy) => {
  try {
    const jsonValue = JSON.stringify(meditationsCopy);
    await AsyncStorage.setItem(storageKey, jsonValue);
  } catch (e) {
    console.log(e);
  }
};

export const getData = async (storageKey) => {
  try {
    const jsonValue = await AsyncStorage.getItem(storageKey);
    // alert(jsonValue);
    return jsonValue != null ? jsonValue : null;
  } catch (e) {
    console.log('Failed when getting data from AsyncStorage :(');
  }
};

export const removeValue = async (storageKey, title) => {
  try {
    await AsyncStorage.removeItem(storageKey);
    storageKey != `@date_last_completed`
      ? Alert.alert('Success', `Your ${title} was deleted successfully`)
      : null;
  } catch (e) {
    console.log(e);
    Alert.alert('Error', 'Delete not successfull');
  }
  console.log(storageKey, title);
};

export default {
  storeData,
  getData,
  removeValue,
};
