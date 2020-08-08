import AsyncStorage from '@react-native-community/async-storage';
import {Alert} from 'react-native';

// Save single item
export const storeData = async (storageKey, meditationsCopy) => {
  try {
    const jsonValue = JSON.stringify(meditationsCopy);
    await AsyncStorage.setItem(storageKey, jsonValue);
  } catch (e) {
    console.log(e);
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
    Alert.alert('Error', 'Delete not successfull');
  }
  console.log(storageKey, title);
};

// Save multiple items ...args should be ([key1, value1], [key2, value2]...) if values are objects then JSON.stringify them first.
// export const multiSet = async (...keyValuePairs) => {
//   try {
//     await AsyncStorage.multiSet(...keyValuePairs);
//   } catch (e) {
//     alert('Failed to store items');
//   }
//   console.log('Done');
// };

// Get multiple data items. keys = ("@key_one", "@key_two")
// export const getMultiple = async (...keys) => {
//   let values;
//   try {
//     values = await AsyncStorage.multiGet([...keys]);
//   } catch (e) {
//     alert(e);
//   }
//   console.log(values);
// };

// keys e.g. [@key_1, @key_2, ... etc.]
export const removeMultipleItems = async (keys) => {
  try {
    await AsyncStorage.multiRemove(keys);
  } catch (e) {
    console.error(e);
  }
  console.log('MultiRemove Done');
};

export default {
  storeData,
  getData,
  removeValue,
  removeMultipleItems,
};
