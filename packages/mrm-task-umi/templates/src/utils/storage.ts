export enum Keys {
  User = 'USER',
}

type Options = {
  expiredAt?: number;
};

export const getItem = <T extends any>(key: Keys): T | null => {
  try {
    const value = window.localStorage.getItem(key);
    if (value) {
      const { data, options } = JSON.parse(value);
      if (options?.expiredAt < Date.now()) {
        removeItem(key);
        return null;
      }
      return data;
    }
  } catch {}

  return null;
};

export const setItem = (key: Keys, value: any, options: Options = {}): void => {
  window.localStorage.setItem(
    key,
    JSON.stringify({
      data: value,
      options,
    }),
  );
};

export const removeItem = (key: Keys): void => {
  window.localStorage.removeItem(key);
};

export const clear = (): void => {
  window.localStorage.clear();
};
