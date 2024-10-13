import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Save an item to AsyncStorage (Create or Update)
 * @param {string} key - The key under which the value is stored
 * @param {any} value - The value to store (should be JSON-stringifiable)
 */
export const storeItem = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    console.log(`Stored item with key: ${key}`);
  } catch (error) {
    console.error(`Error storing item with key ${key}:`, error);
  }
};

/**
 * Retrieve an item from AsyncStorage
 * @param {string} key - The key of the value to retrieve
 * @returns {any|null} - The retrieved value or null if it doesn't exist
 */
export const getItem = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error(`Error retrieving item with key ${key}:`, error);
    return null;
  }
};

/**
 * Update an existing item in AsyncStorage
 * @param {string} key - The key of the value to update
 * @param {any} newValue - The new value to merge with the existing one
 */
export const updateItem = async (key, newValue) => {
  try {
    const existingValue = await getItem(key);
    const updatedValue = { ...existingValue, ...newValue }; // Merge old and new values
    await storeItem(key, updatedValue);
    console.log(`Updated item with key: ${key}`);
  } catch (error) {
    console.error(`Error updating item with key ${key}:`, error);
  }
};

/**
 * Remove an item from AsyncStorage
 * @param {string} key - The key of the value to remove
 */
export const removeItem = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log(`Removed item with key: ${key}`);
  } catch (error) {
    console.error(`Error removing item with key ${key}:`, error);
  }
};

export const clearAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log('AsyncStorage successfully cleared!');
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    }
  };
