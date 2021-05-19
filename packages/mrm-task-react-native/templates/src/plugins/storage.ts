import AsyncStorage from '@react-native-community/async-storage';

export const getItem = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value) {
      return JSON.parse(value).data;
    } else {
      return null;
    }
  } catch {
    console.warn(`读取 AsyncStorage 数据失败: ${key}`);
  }
};

export const setItem = async (key: string, value: any) => {
  try {
    value = JSON.stringify({
      data: value,
    });
    await AsyncStorage.setItem(key, value);
  } catch {
    console.warn(`写入 AsyncStorage 数据失败: ${key}`);
  }
};

export const removeItem = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch {
    console.warn(`删除 AsyncStorage 数据失败: ${key}`);
  }
};

export const clear = async () => {
  const keys = await AsyncStorage.getAllKeys();
  for (const key of keys) {
    try {
      AsyncStorage.removeItem(key);
    } catch {
      console.warn(`删除 AsyncStorage 数据失败: ${key}`);
    }
  }
};

export const getAllKeys = async () => {
  let keys = [];
  try {
    keys = await AsyncStorage.getAllKeys();
  } catch {
    console.warn('读取 AsyncStorage allKeys 失败');
  }
  return keys;
};

export default {
  getItem,
  setItem,
  removeItem,
  clear,
  getAllKeys,
};
