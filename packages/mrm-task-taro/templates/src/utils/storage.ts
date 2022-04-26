import Taro from '@tarojs/taro';

export enum Keys {
  User = 'USER',
}

export const getItem = <T = any>(key: Keys): T => {
  return Taro.getStorageSync<T>(key);
};

export const setItem = (key: Keys, value: any): void => {
  Taro.setStorageSync(key, value);
};

export const removeItem = (key: Keys): void => {
  Taro.removeStorageSync(key);
};

export const clear = (): void => {
  Taro.clearStorageSync();
};

export default {
  Keys,
  getItem,
  setItem,
  removeItem,
  clear,
};
