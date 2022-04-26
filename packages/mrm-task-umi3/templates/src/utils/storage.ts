export enum Keys {
  User = 'USER',
}

type Options = {
  expiredAt?: number;
};

function getItem<T = unknown>(key: Keys): T;
function getItem(key: Keys) {
  try {
    const value = window.localStorage.getItem(key);
    if (value) {
      const { data, options } = JSON.parse(value);
      if (options && options.expiredAt < Date.now()) {
        window.localStorage.removeItem(key);
      } else {
        return data;
      }
    }
  } catch {}

  return null;
}

function setItem(key: Keys, value: any, options: Options = {}): void {
  window.localStorage.setItem(
    key,
    JSON.stringify({
      data: value,
      options,
    }),
  );
}

function removeItem(key: Keys): void {
  window.localStorage.removeItem(key);
}

function clear(): void {
  window.localStorage.clear();
}

export default {
  Keys,
  getItem,
  setItem,
  removeItem,
  clear,
};
