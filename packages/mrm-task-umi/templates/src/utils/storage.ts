export enum Keys {
  User = 'USER',
}

export const getItem = <T extends any>(key: Keys): T | null => {
  try {
    const value = window.localStorage.getItem(key);
    if (value) {
      return JSON.parse(value).data;
    }
  } catch {}

  return null;
};

export const setItem = (key: Keys, value: any): void => {
  window.localStorage.setItem(
    key,
    JSON.stringify({
      data: value,
    }),
  );
};

export const removeItem = (key: Keys): void => {
  window.localStorage.removeItem(key);
};

export const clear = (): void => {
  window.localStorage.clear();
};

export default {
  getItem,
  setItem,
  removeItem,
  clear,
  Keys,
};
